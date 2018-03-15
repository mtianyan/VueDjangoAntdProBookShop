# encoding: utf-8
__author__ = 'mtianyan'
__date__ = '2018/3/12 0012 21:53'

# 云片网设置
APIKEY = 'd6c4ddbf50ab36611d2f52041a0b949e'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'vue_shop',
        'USER': 'root',
        'PASSWORD': 'tp158917',
        'HOST': '127.0.0.1',
        "OPTIONS": {"init_command": "SET default_storage_engine=INNODB;"}
    }
}
