from django.contrib.auth import get_user_model
from rest_framework import serializers

from tyadmin_api.models import TyAdminSysLog, TyAdminEmailVerifyRecord

user = get_user_model()


class TyAdminSysLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = TyAdminSysLog
        fields = "__all__"


class TyAdminEmailVerifyRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = TyAdminEmailVerifyRecord
        fields = "__all__"


class SysUserChangePasswordSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField()
    new_password = serializers.CharField()
    re_password = serializers.CharField()

    class Meta:
        model = user
        fields = ('old_password', 'new_password', 're_password')

    def validate_old_password(self, value):
        if not self.instance.check_password(value):
            raise serializers.ValidationError('旧密码错误，请确认后重试')
        return value

    def validate(self, data):
        if data['new_password'] != data['re_password']:
            raise serializers.ValidationError('两次密码不匹配')
        return data

    def save(self, **kwargs):
        self.instance.set_password(self.validated_data['new_password'])
        self.instance.save()
        return self.instance
