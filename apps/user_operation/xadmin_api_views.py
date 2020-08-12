from rest_framework import viewsets
    
from user_operation.models import UserFav, UserAddress, UserLeavingMessage
from user_operation.xadmin_serializers import UserFavSerializer, UserAddressSerializer, UserLeavingMessageSerializer
    

class UserFavViewSet(viewsets.ModelViewSet):
    serializer_class = UserFavSerializer
    queryset = UserFav.objects.all()


class UserAddressViewSet(viewsets.ModelViewSet):
    serializer_class = UserAddressSerializer
    queryset = UserAddress.objects.all()


class UserLeavingMessageViewSet(viewsets.ModelViewSet):
    serializer_class = UserLeavingMessageSerializer
    queryset = UserLeavingMessage.objects.all()
