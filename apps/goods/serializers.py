# encoding: utf-8
__author__ = 'mtianyan'
__date__ = '2018/2/14 0014 16:44'

from goods.models import Goods, GoodsCategory
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GoodsCategory
        fields = "__all__"


class GoodsSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Goods
        # fields = ('category', 'goods_sn', 'name', 'click_num', 'sold_num', 'market_price')
        fields = "__all__"