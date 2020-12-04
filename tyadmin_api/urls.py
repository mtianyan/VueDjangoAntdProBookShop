from django.urls import re_path, include, path
from rest_framework.routers import DefaultRouter

from tyadmin_api_cli.adapters.django_celery_beat_ty_admin import PeriodicTask_task
from tyadmin_api.views import LoginView, CurrentUserView, CaptchaView, UserSendCaptchaView, DashBoardView, UploadView, MenuView, \
    UserChangePasswordView, UserListChangePasswordView, UserLogoutView
from tyadmin_api.views import TyAdminSysLogViewSet, TyAdminEmailVerifyRecordViewSet

router = DefaultRouter(trailing_slash=False)
router.register('ty_admin_sys_log', TyAdminSysLogViewSet)
router.register('ty_admin_email_verify_record', TyAdminEmailVerifyRecordViewSet)

urlpatterns = [
    re_path('^', include(router.urls)),
    path('login/account', LoginView.as_view(), name='user_login'),
    path('currentUser', CurrentUserView.as_view(), name='user_current_user'),
    path('logout', UserLogoutView.as_view(), name='logout'),
    path('captcha-generate', CaptchaView.as_view(), name='captcha'),
    path('sendEmailCaptcha', UserSendCaptchaView.as_view(), name='user_send_captcha'),
    path('captcha', include('captcha.urls')),
    path('upload', UploadView.as_view(), name="rich_upload"),
    path('sys/menu', MenuView.as_view(), name="sys_menu"),
    path('dashboard', DashBoardView.as_view(), name="dashboard"),
    path('change_password', UserChangePasswordView.as_view(), name="change_password"),
    path('list_change_password', UserListChangePasswordView.as_view(), name="list_change_password"),
    path('adapters/periodic_task/task', PeriodicTask_task.as_view(), name="adapters/periodic_task/task"),
    path('', include('tyadmin_api.auto_url'))
]
