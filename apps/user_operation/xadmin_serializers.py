from rest_framework import serializers

from user_operation.models import UserFav, UserAddress, UserLeavingMessage


class UserFavSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFav
        fields = "__all__"


class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = "__all__"


class UserLeavingMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLeavingMessage
        fields = "__all__"
