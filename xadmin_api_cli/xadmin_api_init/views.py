import django
from django.shortcuts import render
from django.views import View

from xadmin_api.custom import XadminViewSet
from xadmin_api.filters import TyAdminSysLogFilter, TyAdminEmailVerifyRecordFilter
from xadmin_api.models import TyAdminSysLog, TyAdminEmailVerifyRecord
from xadmin_api.serializers import TyAdminSysLogSerializer, TyAdminEmailVerifyRecordSerializer


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
from django.contrib.auth import login, authenticate, get_user_model
from django.http import JsonResponse
from rest_framework import views, status, serializers
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from xadmin_api.custom import MtyCustomExecView

from xadmin_api.utils import send_email, save_uploaded_file, gen_file_name, log_save


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


class DashBoardView(views.APIView):
    def get(self, request, *args, **kwargs):
        data_json = os.path.join(settings.BASE_DIR, 'xadmin_api/dashboard.json')
        with open(data_json) as fr:
            content = fr.read()
        return JsonResponse(json.loads(content))


class MenuView(views.APIView):
    def get(self, request, *args, **kwargs):
        data_json = os.path.join(settings.BASE_DIR, 'xadmin_api/menu.json')
        with open(data_json) as fr:
            content = fr.read()
        import demjson
        content = demjson.decode(content)
        print(json.dumps(content, ensure_ascii=False))
        return JsonResponse({
            "data": content
        })


class DashBoardView(views.APIView):
    def get(self, request, *args, **kwargs):
        sys_label = ['admin', 'auth', 'contenttypes', 'sessions', 'captcha', 'xadmin', 'xadmin_api', 'authtoken', 'social_django']
        count_dict = {}
        for one in django.apps.apps.get_models():
            app_label = one._meta.app_label
            if app_label not in sys_label:
                model_ver_name = one._meta.verbose_name
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
