from xadmin_api import auto_views
from django.urls import re_path, include, path
from rest_framework.routers import DefaultRouter

router = DefaultRouter(trailing_slash=False)

router.register('user_profile/?', auto_views.UserProfileViewSet)

router.register('verify_code/?', auto_views.VerifyCodeViewSet)

router.register('goods_category/?', auto_views.GoodsCategoryViewSet)

router.register('goods_category_brand/?', auto_views.GoodsCategoryBrandViewSet)

router.register('goods/?', auto_views.GoodsViewSet)

router.register('goods_image/?', auto_views.GoodsImageViewSet)

router.register('banner/?', auto_views.BannerViewSet)

router.register('index_ad/?', auto_views.IndexAdViewSet)

router.register('hot_search_words/?', auto_views.HotSearchWordsViewSet)

router.register('shopping_cart/?', auto_views.ShoppingCartViewSet)

router.register('order_info/?', auto_views.OrderInfoViewSet)

router.register('order_goods/?', auto_views.OrderGoodsViewSet)

router.register('user_fav/?', auto_views.UserFavViewSet)

router.register('user_address/?', auto_views.UserAddressViewSet)

router.register('user_leaving_message/?', auto_views.UserLeavingMessageViewSet)

router.register('version_control/?', auto_views.VersionControlViewSet)

urlpatterns = [
    re_path('^', include(router.urls)),
]
