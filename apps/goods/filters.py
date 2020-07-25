# -*- coding:utf-8 _*-
from django.db.models import Q

__author__ = 'mtianyan'
__date__ = '2018/03/03 00:44'

from django_filters import rest_framework as filters
from goods.models import Goods
from django.utils.translation import ugettext_lazy as _


class GoodsFilter(filters.FilterSet):
    """
    商品的过滤类
    """
    # 指定字段以及字段上的行为，在shop_price上大于等于
    pricemin = filters.NumberFilter(field_name="shop_price", lookup_expr='gte', help_text=_('大于等于本店价格'))
    pricemax = filters.NumberFilter(field_name="shop_price", lookup_expr='lte', help_text=_('小于等于本店价格'))
    # 行为: 名称中包含某字符，且字符不区分大小写
    # name = filters.CharFilter(name="name" ,lookup_expr="icontains")
    top_category = filters.NumberFilter(field_name="category", method='top_category_filter')

    def top_category_filter(self, queryset, name, value):
        # 不管当前点击的是一级目录二级目录还是三级目录。
        return queryset.filter(Q(category_id=value) | Q(category__parent_category_id=value) | Q(
            category__parent_category__parent_category_id=value))

    class Meta:
        model = Goods
        fields = ['pricemin', 'pricemax', 'name', 'is_hot', 'is_new']
