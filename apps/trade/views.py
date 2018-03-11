from django.shortcuts import render

# Create your views here.
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from trade.models import ShoppingCart
from trade.serializers import ShopCartSerializer, ShopCartDetailSerializer
from utils.permissions import IsOwnerOrReadOnly


class ShoppingCartViewset(viewsets.ModelViewSet):
    """
    购物车功能
    list:
        获取购物车详情
    create：
        加入购物车
    delete：
        删除购物记录
    """
    permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)
    authentication_classes = (JSONWebTokenAuthentication, SessionAuthentication)
    serializer_class = ShopCartSerializer
    lookup_field = "goods_id"

    # def perform_create(self, serializer):
    #     shop_cart = serializer.save()
    #     goods = shop_cart.goods
    #     goods.goods_num -= shop_cart.nums
    #     goods.save()
    #
    # def perform_destroy(self, instance):
    #     goods = instance.goods
    #     goods.goods_num += instance.nums
    #     goods.save()
    #     instance.delete()

    # def perform_update(self, serializer):
    #     existed_record = ShoppingCart.objects.get(id=serializer.instance.id)
    #     existed_nums = existed_record.nums
    #     saved_record = serializer.save()
    #     nums = saved_record.nums-existed_nums
    #     goods = saved_record.goods
    #     goods.goods_num -= nums
    #     goods.save()

    def get_serializer_class(self):
        if self.action == 'list':
            return ShopCartDetailSerializer
        else:
            return ShopCartSerializer

    def get_queryset(self):
        return ShoppingCart.objects.filter(user=self.request.user)
