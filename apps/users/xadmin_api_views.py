from rest_framework import viewsets

from users.models import UserProfile, VerifyCode
from users.xadmin_serializers import UserProfileSerializer, VerifyCodeSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()


class VerifyCodeViewSet(viewsets.ModelViewSet):
    serializer_class = VerifyCodeSerializer
    queryset = VerifyCode.objects.all()
