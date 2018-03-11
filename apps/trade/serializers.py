# encoding: utf-8
from goods.models import Goods
from goods.serializers import GoodsSerializer
from rest_framework import serializers
from trade.models import ShoppingCart

__author__ = 'mtianyan'
__date__ = '2018/3/11 0011 16:19'


class ShopCartDetailSerializer(serializers.ModelSerializer):
    # 一条购物车关系记录对应的只有一个goods。
    goods = GoodsSerializer(many=False, read_only=True)

    class Meta:
        model = ShoppingCart
        fields = ("goods", "nums")


class ShopCartSerializer(serializers.Serializer):
    # 使用Serializer本身最好, 因为它是灵活性最高的。
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
    nums = serializers.IntegerField(required=True, label="数量", min_value=1,
                                    error_messages={
                                        "min_value": "商品数量不能小于一",
                                        "required": "请选择购买数量"
                                    })
    goods = serializers.PrimaryKeyRelatedField(required=True, queryset=Goods.objects.all())

    def create(self, validated_data):
        user = self.context["request"].user
        nums = validated_data["nums"]
        goods = validated_data["goods"]

        existed = ShoppingCart.objects.filter(user=user, goods=goods)

        if existed:
            existed = existed[0]
            existed.nums += nums
            existed.save()
        else:
            existed = ShoppingCart.objects.create(**validated_data)

        return existed

    def update(self, instance, validated_data):
        # 修改商品数量
        instance.nums = validated_data["nums"]
        instance.save()
        return instance

# class OrderGoodsSerialzier(serializers.ModelSerializer):
#     goods = GoodsSerializer(many=False)
#     class Meta:
#         model = OrderGoods
#         fields = "__all__"
