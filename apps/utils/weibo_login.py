# encoding: utf-8
__author__ = 'mtianyan'
__date__ = '2018/3/15 0015 14:46'


def get_auth_url():
    """
    client_id	必填	string	申请应用时分配的AppKey。
    redirect_uri	必填	string	授权回调地址，站外应用需与设置的回调地址一致。
    """
    weibo_auth_url = "https://api.weibo.com/oauth2/authorize"
    redirect_uri = "http://115.159.122.64:8000/complete/weibo/"
    client_id = "4117332009"
    auth_url = weibo_auth_url + "?client_id={client_id}&redirect_uri={re_url}".format(client_id=client_id,
                                                                                      re_url=redirect_uri)

    print(auth_url)


def get_access_token(code):
    access_token_url = "https://api.weibo.com/oauth2/access_token"
    import requests
    re_dict = requests.post(access_token_url, data={
        "client_id": "4117332009",
        "client_secret": "9c21c82d76ec8c5af4e4a87e3d30b6fa",
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": "http://115.159.122.64:8000/complete/weibo/",

    })
    pass


def get_user_info(access_token):
    user_url = "https://api.weibo.com/2/users/show.json"
    uid = "2891750194"
    get_url = user_url + "?access_token={at}&uid={uid}".format(at=access_token, uid=uid)
    print(get_url)


if __name__ == "__main__":
    # get_auth_url()
    # get_access_token("a12b5e0bf45652eb6a5abf05746e6b4f")
    get_user_info("2.00K1UhJDnIudUEb2f6abe202qqzEQC")
