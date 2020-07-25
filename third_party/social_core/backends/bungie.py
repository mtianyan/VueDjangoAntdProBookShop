"""
Bungie OAuth2 backend
"""
from social_core.backends.oauth import BaseOAuth2
from django.conf import settings


class BungieOAuth2(BaseOAuth2):
    name = 'bungie'
    ID_KEY = 'membership_id'
    AUTHORIZATION_URL = 'https://www.bungie.net/en/oauth/authorize/'
    ACCESS_TOKEN_URL = 'https://www.bungie.net/platform/app/oauth/token/'
    REFRESH_TOKEN_URL = 'https://www.bungie.net/platform/app/oauth/token/'
    ACCESS_TOKEN_METHOD = 'POST'
    REDIRECT_STATE = False
    EXTRA_DATA = [
        ('refresh_token', 'refresh_token', True),
        ('access_token', 'access_token', True),
        ('expires_in', 'expires'),
        ('membership_id', 'membership_id'),
        ('refresh_expires_in', 'refresh_expires_in')
    ]

    def auth_html(self):
        """Abstract Method Inclusion"""
        pass

    def auth_headers(self):
        """Adds X-API-KEY and Origin"""
        return {'X-API-KEY': settings.SOCIAL_AUTH_BUNGIE_API_KEY,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Origin': settings.SOCIAL_AUTH_BUNGIE_ORIGIN,
                'Accept': 'application/json'
                }

    def make_bungie_request(self, url, access_token, kwargs):
        """Helper function to get username data keyed off displayName"""
        print('ENTERING MAKE BUNGIE REQUEST')
        headers = self.auth_headers()
        print(repr(headers))
        auth_header = {'Authorization': 'Bearer ' + access_token}
        headers.update(auth_header)
        import requests as python_requests
        r = python_requests.get(url, headers=headers)
        this_json = r.json()
        return this_json

    def auth_complete(self, *args, **kwargs):
        """Completes login process, must return user instance"""
        self.process_error(self.data)
        state = self.validate_state()
        response = self.request_access_token(
            self.access_token_url(),
            data=self.auth_complete_params(state),
            headers=self.auth_headers(),
            auth=self.auth_complete_credentials(),
            method=self.ACCESS_TOKEN_METHOD
        )
        self.process_error(response)
        return self.do_auth(response['access_token'], response=response, *args, **kwargs)

    def do_auth(self, access_token, *args, **kwargs):
        """Finish the auth process once the access_token was retrieved"""
        data = self.user_data(access_token, *args, **kwargs)
        response = kwargs.get('response') or {}
        response.update(data or {})
        if 'access_token' not in response:
            response['Response']['access_token']['value'] = access_token
        kwargs.update({'response': response, 'backend': self})
        return self.strategy.authenticate(*args, **kwargs)

    def user_data(self, access_token, *args, **kwargs):
        """Grab user profile information from Bunige"""
        membership_id = kwargs['response']['membership_id']
        url = 'https://www.bungie.net/Platform/User/GetBungieNetUser/'
        this_json = self.make_bungie_request(url, access_token, kwargs)
        username = this_json['Response']['user']['displayName']
        return {'username': username, 'uid': membership_id}

    def get_user_details(self, response, *args, **kwargs):
        """Return user details from Bungie account"""
        username = response['username']
        uid = response['uid']
        bnId = response['bnId']
        return {
            'first_name': username,
            'username': username,
            'uid': uid,
        }
