import datetime
from calendar import timegm

import six

from jwkest import JWKESTException
from jwkest.jwk import KEYS
from jwkest.jws import JWS

from .oauth import BaseOAuth2
from ..utils import cache
from ..exceptions import AuthTokenError


class OpenIdConnectAssociation(object):
    """ Use Association model to save the nonce by force."""

    def __init__(self, handle, secret='', issued=0, lifetime=0, assoc_type=''):
        self.handle = handle  # as nonce
        self.secret = secret.encode()  # not use
        self.issued = issued  # not use
        self.lifetime = lifetime  # not use
        self.assoc_type = assoc_type  # as state


class OpenIdConnectAuth(BaseOAuth2):
    """
    Base class for Open ID Connect backends.
    Currently only the code response type is supported.
    """
    # Override OIDC_ENDPOINT in your subclass to enable autoconfig of OIDC
    OIDC_ENDPOINT = None
    ID_TOKEN_MAX_AGE = 600
    DEFAULT_SCOPE = ['openid', 'profile', 'email']
    EXTRA_DATA = ['id_token', 'refresh_token', ('sub', 'id')]
    REDIRECT_STATE = False
    ACCESS_TOKEN_METHOD = 'POST'
    REVOKE_TOKEN_METHOD = 'GET'
    ID_KEY = 'sub'
    USERNAME_KEY = 'preferred_username'
    ID_TOKEN_ISSUER = ''
    ACCESS_TOKEN_URL = ''
    AUTHORIZATION_URL = ''
    REVOKE_TOKEN_URL = ''
    USERINFO_URL = ''
    JWKS_URI = ''

    def __init__(self, *args, **kwargs):
        self.id_token = None
        super(OpenIdConnectAuth, self).__init__(*args, **kwargs)

    def authorization_url(self):
        return self.AUTHORIZATION_URL or \
               self.oidc_config().get('authorization_endpoint')

    def access_token_url(self):
        return self.ACCESS_TOKEN_URL or \
               self.oidc_config().get('token_endpoint')

    def revoke_token_url(self, token, uid):
        return self.REVOKE_TOKEN_URL or \
               self.oidc_config().get('revocation_endpoint')

    def id_token_issuer(self):
        return self.ID_TOKEN_ISSUER or \
               self.oidc_config().get('issuer')

    def userinfo_url(self):
        return self.USERINFO_URL or \
               self.oidc_config().get('userinfo_endpoint')

    def jwks_uri(self):
        return self.JWKS_URI or \
               self.oidc_config().get('jwks_uri')

    @cache(ttl=86400)
    def oidc_config(self):
        return self.get_json(self.OIDC_ENDPOINT +
                             '/.well-known/openid-configuration')

    @cache(ttl=86400)
    def get_jwks_keys(self):
        keys = KEYS()
        keys.load_from_url(self.jwks_uri())

        # Add client secret as oct key so it can be used for HMAC signatures
        client_id, client_secret = self.get_key_and_secret()
        keys.add({'key': client_secret, 'kty': 'oct'})
        return keys

    def auth_params(self, state=None):
        """Return extra arguments needed on auth process."""
        params = super(OpenIdConnectAuth, self).auth_params(state)
        params['nonce'] = self.get_and_store_nonce(
            self.authorization_url(), state
        )
        return params

    def get_and_store_nonce(self, url, state):
        # Create a nonce
        nonce = self.strategy.random_string(64)
        # Store the nonce
        association = OpenIdConnectAssociation(nonce, assoc_type=state)
        self.strategy.storage.association.store(url, association)
        return nonce

    def get_nonce(self, nonce):
        try:
            return self.strategy.storage.association.get(
                server_url=self.authorization_url(),
                handle=nonce
            )[0]
        except IndexError:
            pass

    def remove_nonce(self, nonce_id):
        self.strategy.storage.association.remove([nonce_id])

    def validate_claims(self, id_token):
        if id_token['iss'] != self.id_token_issuer():
            raise AuthTokenError(self, 'Invalid issuer')

        client_id, client_secret = self.get_key_and_secret()

        if isinstance(id_token['aud'], six.string_types):
            id_token['aud'] = [id_token['aud']]

        if client_id not in id_token['aud']:
            raise AuthTokenError(self, 'Invalid audience')

        if len(id_token['aud']) > 1 and 'azp' not in id_token:
            raise AuthTokenError(self, 'Incorrect id_token: azp')

        if 'azp' in id_token and id_token['azp'] != client_id:
            raise AuthTokenError(self, 'Incorrect id_token: azp')

        utc_timestamp = timegm(datetime.datetime.utcnow().utctimetuple())
        if utc_timestamp > id_token['exp']:
            raise AuthTokenError(self, 'Signature has expired')

        if 'nbf' in id_token and utc_timestamp < id_token['nbf']:
            raise AuthTokenError(self, 'Incorrect id_token: nbf')

        # Verify the token was issued in the last 10 minutes
        iat_leeway = self.setting('ID_TOKEN_MAX_AGE', self.ID_TOKEN_MAX_AGE)
        if utc_timestamp > id_token['iat'] + iat_leeway:
            raise AuthTokenError(self, 'Incorrect id_token: iat')

        # Validate the nonce to ensure the request was not modified
        nonce = id_token.get('nonce')
        if not nonce:
            raise AuthTokenError(self, 'Incorrect id_token: nonce')

        nonce_obj = self.get_nonce(nonce)
        if nonce_obj:
            self.remove_nonce(nonce_obj.id)
        else:
            raise AuthTokenError(self, 'Incorrect id_token: nonce')

    def validate_and_return_id_token(self, jws):
        """
        Validates the id_token according to the steps at
        http://openid.net/specs/openid-connect-core-1_0.html#IDTokenValidation.
        """
        try:
            # Decode the JWT and raise an error if the sig is invalid
            id_token = JWS().verify_compact(jws.encode('utf-8'),
                                            self.get_jwks_keys())
        except JWKESTException:
            raise AuthTokenError(self, 'Signature verification failed')

        self.validate_claims(id_token)

        return id_token

    def request_access_token(self, *args, **kwargs):
        """
        Retrieve the access token. Also, validate the id_token and
        store it (temporarily).
        """
        response = self.get_json(*args, **kwargs)
        self.id_token = self.validate_and_return_id_token(response['id_token'])
        return response

    def user_data(self, access_token, *args, **kwargs):
        return self.get_json(self.userinfo_url(), headers={
            'Authorization': 'Bearer {0}'.format(access_token)
        })

    def get_user_details(self, response):
        username_key = self.setting('USERNAME_KEY', default=self.USERNAME_KEY)
        return {
            'username': response.get(username_key),
            'email': response.get('email'),
            'fullname': response.get('name'),
            'first_name': response.get('given_name'),
            'last_name': response.get('family_name'),
        }
