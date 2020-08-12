from user_operation import xadmin_api_views
from django.urls import re_path, include, path
from rest_framework.routers import DefaultRouter
    
router = DefaultRouter(trailing_slash=False)

router.register('user_fav/?', xadmin_api_views.UserFavViewSet)
    
router.register('user_address/?', xadmin_api_views.UserAddressViewSet)
    
router.register('user_leaving_message/?', xadmin_api_views.UserLeavingMessageViewSet)
    
urlpatterns = [
    re_path('^', include(router.urls)),
]