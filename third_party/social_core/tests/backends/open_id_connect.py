# -*- coding: utf-8 -*-
from calendar import timegm

import os
import sys
import json
import datetime
import unittest2

try:
    from jwkest.jwk import RSAKey, KEYS
    from jwkest.jws import JWS
    from jwkest.jwt import b64encode_item

    NO_JWKEST = False
except ImportError:
    NO_JWKEST = True

from httpretty import HTTPretty

sys.path.insert(0, '..')

from ...exceptions import AuthTokenError


class OpenIdConnectTestMixin(object):
    """
    Mixin to test OpenID Connect consumers. Inheriting classes should also
    inherit OAuth2Test.
    """
    client_key = 'a-key'
    client_secret = 'a-secret-key'
    issuer = None  # id_token issuer
    openid_config_body = None
    key = None

    def setUp(self):
        super(OpenIdConnectTestMixin, self).setUp()
        test_root = os.path.dirname(os.path.dirname(__file__))
        self.key = RSAKey(kid='testkey').load(os.path.join(test_root, 'testkey.pem'))
        HTTPretty.register_uri(HTTPretty.GET,
                               self.backend.OIDC_ENDPOINT + '/.well-known/openid-configuration',
                               status=200,
                               body=self.openid_config_body
                               )
        oidc_config = json.loads(self.openid_config_body)

        def jwks(_request, _uri, headers):
            ks = KEYS()
            ks.add(self.key.serialize())
            return 200, headers, ks.dump_jwks()

        HTTPretty.register_uri(HTTPretty.GET,
                               oidc_config.get('jwks_uri'),
                               status=200,
                               body=jwks)

    def extra_settings(self):
        settings = super(OpenIdConnectTestMixin, self).extra_settings()
        settings.update({
            'SOCIAL_AUTH_{0}_KEY'.format(self.name): self.client_key,
            'SOCIAL_AUTH_{0}_SECRET'.format(self.name): self.client_secret,
            'SOCIAL_AUTH_{0}_ID_TOKEN_DECRYPTION_KEY'.format(self.name):
                self.client_secret
        })
        return settings

    def access_token_body(self, request, _url, headers):
        """
        Get the nonce from the request parameters, add it to the id_token, and
        return the complete response.
        """
        nonce = self.backend.data['nonce'].encode('utf-8')
        body = self.prepare_access_token_body(nonce=nonce)
        return 200, headers, body

    def get_id_token(self, client_key=None, expiration_datetime=None,
                     issue_datetime=None, nonce=None, issuer=None):
        """
        Return the id_token to be added to the access token body.
        """
        return {
            'iss': issuer,
            'nonce': nonce,
            'aud': client_key,
            'azp': client_key,
            'exp': expiration_datetime,
            'iat': issue_datetime,
            'sub': '1234'
        }

    def prepare_access_token_body(self, client_key=None, tamper_message=False,
                                  expiration_datetime=None,
                                  issue_datetime=None, nonce=None,
                                  issuer=None):
        """
        Prepares a provider access token response. Arguments:

        client_id       -- (str) OAuth ID for the client that requested
                                 authentication.
        expiration_time -- (datetime) Date and time after which the response
                                      should be considered invalid.
        """

        body = {'access_token': 'foobar', 'token_type': 'bearer'}
        client_key = client_key or self.client_key
        now = datetime.datetime.utcnow()
        expiration_datetime = expiration_datetime or \
                              (now + datetime.timedelta(seconds=30))
        issue_datetime = issue_datetime or now
        nonce = nonce or 'a-nonce'
        issuer = issuer or self.issuer
        id_token = self.get_id_token(
            client_key, timegm(expiration_datetime.utctimetuple()),
            timegm(issue_datetime.utctimetuple()), nonce, issuer)

        body['id_token'] = JWS(id_token, jwk=self.key, alg='RS256').sign_compact()
        if tamper_message:
            header, msg, sig = body['id_token'].split('.')
            id_token['sub'] = '1235'
            msg = b64encode_item(id_token).decode('utf-8')
            body['id_token'] = '.'.join([header, msg, sig])

        return json.dumps(body)

    def authtoken_raised(self, expected_message, **access_token_kwargs):
        self.access_token_body = self.prepare_access_token_body(
            **access_token_kwargs
        )
        with self.assertRaisesRegexp(AuthTokenError, expected_message):
            self.do_login()

    @unittest2.skipIf(NO_JWKEST, 'No Jwkest installed')
    def test_invalid_signature(self):
        self.authtoken_raised(
            'Token error: Signature verification failed',
            tamper_message=True
        )

    @unittest2.skipIf(NO_JWKEST, 'No Jwkest installed')
    def test_expired_signature(self):
        expiration_datetime = datetime.datetime.utcnow() - \
                              datetime.timedelta(seconds=30)
        self.authtoken_raised('Token error: Signature has expired',
                              expiration_datetime=expiration_datetime)

    @unittest2.skipIf(NO_JWKEST, 'No Jwkest installed')
    def test_invalid_issuer(self):
        self.authtoken_raised('Token error: Invalid issuer',
                              issuer='someone-else')

    @unittest2.skipIf(NO_JWKEST, 'No Jwkest installed')
    def test_invalid_audience(self):
        self.authtoken_raised('Token error: Invalid audience',
                              client_key='someone-else')

    @unittest2.skipIf(NO_JWKEST, 'No Jwkest installed')
    def test_invalid_issue_time(self):
        expiration_datetime = datetime.datetime.utcnow() - \
                              datetime.timedelta(hours=1)
        self.authtoken_raised('Token error: Incorrect id_token: iat',
                              issue_datetime=expiration_datetime)

    @unittest2.skipIf(NO_JWKEST, 'No Jwkest installed')
    def test_invalid_nonce(self):
        self.authtoken_raised(
            'Token error: Incorrect id_token: nonce',
            nonce='something-wrong'
        )
