from django.urls import re_path, include, path
from rest_framework.routers import DefaultRouter

from xadmin_api.views import LoginView, CurrentUserView, CaptchaView, UserSendCaptchaView, DashBoardView, UploadView
from xadmin_api.views import TyAdminSysLogViewSet, TyAdminEmailVerifyRecordViewSet

router = DefaultRouter(trailing_slash=False)
router.register('ty_admin_sys_log/?', TyAdminSysLogViewSet)

router.register('ty_admin_email_verify_record/?', TyAdminEmailVerifyRecordViewSet)
urlpatterns = [
    re_path('^', include(router.urls)),
    path('login/account', LoginView.as_view(), name='user_login'),
    path('currentUser', CurrentUserView.as_view(), name='user_current_user'),
    path('captcha-generate', CaptchaView.as_view(), name='captcha'),
    path('sendEmailCaptcha', UserSendCaptchaView.as_view(), name='user_send_captcha'),
    path('fake_chart_data', DashBoardView.as_view(), name='dashboard'),
    path('captcha', include('captcha.urls')),
    path('upload', UploadView.as_view(), name="rich_upload"),
    path('', include('xadmin_api.auto_url'))
]
