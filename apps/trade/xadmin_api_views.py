from rest_framework import viewsets
    
from trade.models import ShoppingCart, OrderInfo, OrderGoods
from trade.xadmin_serializers import ShoppingCartSerializer, OrderInfoSerializer, OrderGoodsSerializer
    

class ShoppingCartViewSet(viewsets.ModelViewSet):
    serializer_class = ShoppingCartSerializer
    queryset = ShoppingCart.objects.all()


class OrderInfoViewSet(viewsets.ModelViewSet):
    serializer_class = OrderInfoSerializer
    queryset = OrderInfo.objects.all()


class OrderGoodsViewSet(viewsets.ModelViewSet):
    serializer_class = OrderGoodsSerializer
    queryset = OrderGoods.objects.all()
