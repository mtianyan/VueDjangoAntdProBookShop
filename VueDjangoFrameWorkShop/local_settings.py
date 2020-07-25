# encoding: utf-8
__author__ = 'mtianyan'
__date__ = '2018/3/12 0012 21:53'

# 云片网设置
APIKEY = 'd6c4ddbf50ab36611d2f52041a0b949e'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'book_shop',
        'USER': 'root',
        'PASSWORD': 'mtianyanroot',
        'HOST': 'mysql',
        "OPTIONS": {"init_command": "SET default_storage_engine=INNODB;"}
    }
}

QINIU_ACCESS_KEY = 'h_r41Eu27LsUkO5lS99TLxWjwJg9CXA_Pz2dZ5k8'
QINIU_SECRET_KEY = 'xp2UcNU0AGMYhMHCkaZKdnJUqSuq1EPqPaNPuf7Q'
QINIU_BUCKET_NAME = ' vueshopstatic'
QINIU_BUCKET_DOMAIN = 'vueshopstatic.mtianyan.cn'
QINIU_SECURE_URL = 0

DEFAULT_FILE_STORAGE = 'qiniustorage.backends.QiniuMediaStorage'
STATICFILES_STORAGE  = 'qiniustorage.backends.QiniuStaticStorage'