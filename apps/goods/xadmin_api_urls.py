from goods import xadmin_api_views
from django.urls import re_path, include, path
from rest_framework.routers import DefaultRouter
    
router = DefaultRouter(trailing_slash=False)

router.register('goods_category/?', xadmin_api_views.GoodsCategoryViewSet)
    
router.register('goods_category_brand/?', xadmin_api_views.GoodsCategoryBrandViewSet)
    
router.register('goods/?', xadmin_api_views.GoodsViewSet)
    
router.register('goods_image/?', xadmin_api_views.GoodsImageViewSet)
    
router.register('banner/?', xadmin_api_views.BannerViewSet)
    
router.register('index_ad/?', xadmin_api_views.IndexAdViewSet)
    
router.register('hot_search_words/?', xadmin_api_views.HotSearchWordsViewSet)
    
urlpatterns = [
    re_path('^', include(router.urls)),
]