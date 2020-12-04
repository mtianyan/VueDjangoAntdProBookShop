import django
from django.contrib.auth.hashers import make_password
from django.shortcuts import render
from django.views import View
from rest_framework.views import APIView

from tyadmin_api_cli.contants import SYS_LABELS
from tyadmin_api.custom import XadminViewSet, custom_exception_handler
from tyadmin_api.filters import TyAdminSysLogFilter, TyAdminEmailVerifyRecordFilter
from tyadmin_api.models import TyAdminSysLog, TyAdminEmailVerifyRecord
from tyadmin_api.serializers import TyAdminSysLogSerializer, TyAdminEmailVerifyRecordSerializer, SysUserChangePasswordSerializer


class TyAdminSysLogViewSet(XadminViewSet):
    serializer_class = TyAdminSysLogSerializer
    queryset = TyAdminSysLog.objects.all()
    filter_class = TyAdminSysLogFilter
    search_fields = ["ip_addr", "action_flag", "log_type", "user_name"]


class TyAdminEmailVerifyRecordViewSet(XadminViewSet):
    serializer_class = TyAdminEmailVerifyRecordSerializer
    queryset = TyAdminEmailVerifyRecord.objects.all()
    filter_class = TyAdminEmailVerifyRecordFilter
    search_fields = ["code", "email", "send_type"]


import datetime
import json
import os

from captcha.helpers import captcha_image_url
from captcha.models import CaptchaStore
from django.conf import settings
from django.contrib.auth import login, authenticate, get_user_model, logout
from django.http import JsonResponse
from rest_framework import views, status, serializers
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from tyadmin_api.custom import MtyCustomExecView

from tyadmin_api.utils import send_email, save_uploaded_file, gen_file_name, log_save


class RichUploadSerializer(serializers.Serializer):
    file = serializers.FileField()

    def create(self, validated_data):
        file = validated_data["file"]
        prefix = validated_data["ty_admin_prefix"]
        file_name = gen_file_name(file.name)
        dest_path = os.path.join(settings.MEDIA_ROOT, file_name)
        save_uploaded_file(file, dest_path)
        return {"image_url": f"{prefix}{file_name}"}

    def update(self, instance, validated_data):
        return JsonResponse({
            "none_fields_errors": "暂不允许更新"
        }, status=status.HTTP_400_BAD_REQUEST)


SysUser = get_user_model()


class MenuView(views.APIView):
    def get(self, request, *args, **kwargs):
        data_json = os.path.join(settings.BASE_DIR, 'tyadmin_api/menu.json')
        with open(data_json, encoding='utf-8') as fr:
            content = fr.read()
        import demjson
        content = demjson.decode(content)
        print(json.dumps(content, ensure_ascii=False))
        return JsonResponse({
            "data": content
        })


class DashBoardView(views.APIView):
    def get(self, request, *args, **kwargs):
        gen_label = SYS_LABELS + settings.TY_ADMIN_CONFIG["GEN_APPS"]
        count_dict = {}
        for one in django.apps.apps.get_models():
            app_label = one._meta.app_label
            if app_label in gen_label:
                model_ver_name = one._meta.verbose_name_raw
                one_num = one.objects.all().count()
                count_dict[model_ver_name] = one_num
        return JsonResponse({
            "data": count_dict
        })


class LoginView(MtyCustomExecView):
    permission_classes = ()

    def post(self, request, *args, **kwargs):
        if request.data["type"] == "account":
            pic_captcha = request.data["pic_captcha"]
            key = request.data["key"]
            try:
                captcha = CaptchaStore.objects.get(challenge=pic_captcha.upper(), hashkey=key)
                captcha.delete()
            except CaptchaStore.DoesNotExist:
                raise ValidationError({"pic_captcha": ["验证码不正确"]})
            user = authenticate(request, username=request.data["userName"], password=request.data["password"])
            log_save(user=request.user.username, request=self.request, flag="登录",
                     message=f'{request.user.username}登录成功',
                     log_type="login")
            if user is not None:
                login(request, user)
                return JsonResponse({
                    "status": 'ok',
                    "type": "account",
                    "currentAuthority": ""
                })
            else:
                raise ValidationError({"password": ["密码错误"]})


class UserSendCaptchaView(MtyCustomExecView):

    def get(self, request, *args, **kwargs):
        email = request.query_params["email"]
        try:
            SysUser.objects.get(email=email)
        except SysUser.DoesNotExist:
            raise ValidationError({"email": ["该邮箱不存在"]})
        send_email(email)
        response = {"status": "ok"}
        return JsonResponse(response)


class CaptchaView(views.APIView):
    permission_classes = ()

    def get(self, request, *args, **kwargs):
        new_key = CaptchaStore.pick()
        response = {
            'key': new_key,
            'image_url': request.build_absolute_uri(location=captcha_image_url(new_key)),
        }
        return Response(response)


class CurrentUserView(MtyCustomExecView):

    def get(self, request, *args, **kwargs):
        if request.user:
            try:
                return JsonResponse({"id": request.user.id, "name": request.user.username, "email": request.user.email,
                                     "avatar": "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"})
            except AttributeError:
                return JsonResponse({
                    "errors": "暂未登录"
                }, status=status.HTTP_200_OK)
        else:
            return JsonResponse({
                "errors": "暂未登录"
            }, status=status.HTTP_200_OK)


class UserLogoutView(MtyCustomExecView):
    """注销视图类"""

    def get(self, request):
        # django自带的logout
        logout(request)
        return JsonResponse({
            "status": 'ok'
        })


class UploadView(MtyCustomExecView):

    def post(self, request, *args, **kwargs):
        rich_ser = RichUploadSerializer(data=request.data)
        rich_ser.is_valid(raise_exception=True)
        rich_ser.validated_data["ty_admin_prefix"] = request._request.scheme + "://" + self.request.META['HTTP_HOST'] + settings.MEDIA_URL
        res = rich_ser.create(validated_data=rich_ser.validated_data)
        return Response(res)


class AdminIndexView(View):
    # 直接调用get方法免去判断
    def get(self, request):
        # render就是渲染html返回用户
        # render三变量: request 模板名称 一个字典写明传给前端的值
        return render(request, "TyAdmin/index.html")


class UserChangePasswordView(MtyCustomExecView):
    permission_classes = ()
    """
    用户修改密码
    """
    serializer_class = SysUserChangePasswordSerializer

    def get_exception_handler(self):
        return custom_exception_handler

    def get_object(self):
        return self.request.user

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(instance=self.get_object(),
                                           data=request.data,
                                           context=dict(request=request))
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(dict(code=200, detail='修改成功'))


class UserListChangePasswordView(MtyCustomExecView):

    def post(self, request, *args, **kwargs):
        current_username = self.request.data["username"]
        change_password = self.request.data["password"]
        change_re_password = self.request.data["re_password"]
        if change_password != change_re_password:
            raise ValidationError({"password": ["两次密码不可以不一致"]})
        try:
            cur_user = SysUser.objects.get(username=current_username)
            password = make_password(change_re_password)
            cur_user.password = password
            cur_user.save()
            log_save(user=request.user.username, request=self.request, flag="修改", message=f'用户: {cur_user.username}密码被修改', log_type="user")
        except SysUser.DoesNotExist:
            raise ValidationError({"username": ["用户名不存在"]})
        ret_info = {
            "retcode": 200,
            "retmsg": "Save Success"
        }
        res = {
            'retInfos': ret_info,
        }
        return JsonResponse(res)
