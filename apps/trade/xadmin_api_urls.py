from trade import xadmin_api_views
from django.urls import re_path, include, path
from rest_framework.routers import DefaultRouter
    
router = DefaultRouter(trailing_slash=False)

router.register('shopping_cart/?', xadmin_api_views.ShoppingCartViewSet)
    
router.register('order_info/?', xadmin_api_views.OrderInfoViewSet)
    
router.register('order_goods/?', xadmin_api_views.OrderGoodsViewSet)
    
urlpatterns = [
    re_path('^', include(router.urls)),
]