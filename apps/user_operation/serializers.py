# encoding: utf-8
from rest_framework.validators import UniqueTogetherValidator

__author__ = 'mtianyan'
__date__ = '2018/3/10 0010 09:54'
from rest_framework import serializers
from user_operation.models import UserFav


class UserFavSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    class Meta:
        model = UserFav

        # 使用validate方式实现唯一联合
        validators = [
            UniqueTogetherValidator(
                queryset=UserFav.objects.all(),
                fields=('user', 'goods'),
                message="已经收藏"
            )
        ]

        fields = ("user", "goods", "id")
