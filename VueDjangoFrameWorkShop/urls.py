"""VueDjangoFrameWorkShop URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.views.static import serve

from replace.views import IndexView
from rest_framework.documentation import include_docs_urls

import xadmin
from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
# from VueDjangoFrameWorkShop.settings import MEDIA_ROOT
from goods.views import GoodsListViewSet, CategoryViewset, BannerViewset, IndexCategoryViewset, HotSearchsViewset
from trade.views import ShoppingCartViewset, OrderViewset, AlipayView
from user_operation.views import UserFavViewset, LeavingMessageViewset, AddressViewset
from users.views import SmsCodeViewset, UserViewset
# from goods.views import GoodsListView,
# from goods.views_base import GoodsListView
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from rest_framework_jwt.views import obtain_jwt_token

# goods_list = GoodsListViewSet.as_view({
#     'get': 'list',
# })
router = DefaultRouter()

# 配置goods的url,这个basename是干啥的
router.register(r'goods', GoodsListViewSet, base_name="goods")

# 配置Category的url
router.register(r'categories', CategoryViewset, base_name="categories")

# 配置codes的url
router.register(r'code', SmsCodeViewset, base_name="code")

# 配置users的url
router.register(r'users', UserViewset, base_name="users")

# 配置用户收藏的url
router.register(r'userfavs', UserFavViewset, base_name="userfavs")

# 配置用户留言的url
router.register(r'messages', LeavingMessageViewset, base_name="messages")

# 收货地址
router.register(r'address', AddressViewset, base_name="address")

# 购物车
router.register(r'shopcarts', ShoppingCartViewset, base_name="shopcarts")

# 订单相关url
router.register(r'orders', OrderViewset, base_name="orders")

# 首页banner轮播图url
router.register(r'banners', BannerViewset, base_name="banners")

# 首页系列商品展示url
router.register(r'indexgoods', IndexCategoryViewset, base_name="indexgoods")

# 热搜词
router.register(r'hotsearchs', HotSearchsViewset, base_name="hotsearchs")

# from VueDjangoFrameWorkShop.settings import STATIC_ROOT
from django.views.generic.base import RedirectView
from users.views import favicon_view

urlpatterns = [
    path('xadmin_api/goods', include('goods.xadmin_api_urls')),
    path('xadmin_api/trade', include('trade.xadmin_api_urls')),
    path('xadmin_api/user_operation', include('user_operation.xadmin_api_urls')),
    path('xadmin_api/users', include('users.xadmin_api_urls')),

    # path('admin/', admin.site.urls),
    path('admin/', xadmin.site.urls),
    # 处理图片显示的url,使用Django自带serve,传入参数告诉它去哪个路径找，我们有配置好的路径MEDIAROOT
    # re_path('media/(?P<path>.*)', serve, {"document_root": MEDIA_ROOT}),
    # 富文本相关url
    path('ueditor/', include('DjangoUeditor.urls')),

    # 商品列表页
    # path('goods/', GoodsListView.as_view(),name="goods-list"),
    # path('goods/', goods_list,name="goods-list"),

    # router的path路径
    re_path('^', include(router.urls)),
    # 自动化文档,1.11版本中注意此处前往不要加$符号
    path('docs/', include_docs_urls(title='mtianyan超市文档')),
    # 调试登录
    path('api-auth/', include('rest_framework.urls')),

    # drf自带的token授权登录,获取token需要向该地址post数据
    path('api-token-auth/', views.obtain_auth_token),

    # jwt的token认证
    path('login/', obtain_jwt_token),

    # 支付宝支付相关接口
    path('alipay/return/', AlipayView.as_view()),

    # 首页
    path('index/', IndexView.as_view(), name="index"),

    # re_path('static/(?P<path>.*)', serve, {"document_root": STATIC_ROOT}),

    # 第三方登录
    path('', include('social_django.urls', namespace='social')),

    path('favicon.ico', favicon_view),

    path('api/xadmin/v1/', include('xadmin_api.urls')),
]
