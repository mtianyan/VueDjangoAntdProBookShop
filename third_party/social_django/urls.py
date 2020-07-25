"""URLs module"""
from django.conf import settings
from django.conf.urls import url

from social_core.utils import setting_name
from . import views

# 或通过设置该参数控制
extra = getattr(settings, setting_name('TRAILING_SLASH'), True) and '/' or ''

app_name = 'social'

# http://vueshop.mtianyan.cn/complete/qq&state=1ia2l9hNrr92h1OmcetQj7mG1Gum7Gvn&response_type=code
urlpatterns = [
    # authentication / association
    url(r'^login/(?P<backend>[^/]+){0}$'.format(extra), views.auth,
        name='begin'),
    # # 单独适配qq
    url(r'^complete/(?P<backend>q{2})',views.complete,
        name='complete'),
    url(r'^complete/(?P<backend>[^/]+){0}$'.format(extra), views.complete,
        name='complete'),
    # disconnection
    url(r'^disconnect/(?P<backend>[^/]+){0}$'.format(extra), views.disconnect,
        name='disconnect'),
    url(r'^disconnect/(?P<backend>[^/]+)/(?P<association_id>\d+){0}$'
        .format(extra), views.disconnect, name='disconnect_individual'),
]
