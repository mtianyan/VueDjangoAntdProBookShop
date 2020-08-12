from users import xadmin_api_views
from django.urls import re_path, include, path
from rest_framework.routers import DefaultRouter
    
router = DefaultRouter(trailing_slash=False)

router.register('user_profile/?', xadmin_api_views.UserProfileViewSet)
    
router.register('verify_code/?', xadmin_api_views.VerifyCodeViewSet)
    
urlpatterns = [
    re_path('^', include(router.urls)),
]