from django.shortcuts import render

# Create your views here.
from rest_framework.authentication import TokenAuthentication

from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from goods.filters import GoodsFilter
from goods.serializers import GoodsSerializer, CategorySerializer, BannerSerializer, IndexCategorySerializer, \
    HotWordsSerializer
from .models import Goods, GoodsCategory, Banner, HotSearchWords
from rest_framework import mixins
from rest_framework import generics
from rest_framework import viewsets
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_extensions.cache.mixins import CacheResponseMixin
# 设置登录与未登录限速
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle

# 商品列表分页类


class GoodsPagination(PageNumberPagination):
    page_size = 12
    # 向后台要多少条
    page_size_query_param = 'page_size'
    # 定制多少页的参数
    page_query_param = "page"
    max_page_size = 100


# class GoodsListView(mixins.ListModelMixin, generics.GenericAPIView):
# class GoodsListView(ListAPIView):
# class GoodsListView(mixins.ListModelMixin, viewsets.GenericViewSet):
class GoodsListViewSet(CacheResponseMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """
    商品列表页，分页，搜索，过滤，排序,取某一个具体商品的详情
    """

    # queryset是一个属性
    # good_viewset.queryset就可以访问到
    # 函数就必须调用good_viewset.get_queryset()函数
    # 如果有了下面的get_queryset。那么上面的这个就不需要了。
    # queryset = Goods.objects.all()

    throttle_classes = (UserRateThrottle, AnonRateThrottle)
    serializer_class = GoodsSerializer
    pagination_class = GoodsPagination
    queryset = Goods.objects.all()

    # 设置列表页的单独auth认证也就是不认证
    # authentication_classes = (TokenAuthentication,)

    # 设置三大常用过滤器之DjangoFilterBackend, SearchFilter
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    # 设置排序
    ordering_fields = ('sold_num', 'shop_price')
    # 设置filter的类为我们自定义的类
    filter_class = GoodsFilter

    # 设置我们的search字段
    search_fields = ('name', 'goods_brief', 'goods_desc')

    # 设置我们需要进行过滤的字段
    # filter_fields = ('name', 'shop_price')

    # def get_queryset(self):
    #     # 价格大于100的
    #     price_min = self.request.query_params.get('price_min', 0)
    #     if price_min:
    #         self.queryset = Goods.objects.filter(shop_price__gt=int(price_min)).order_by('-add_time')
    #     return self.queryset
# class GoodsListView(APIView):
#     """
#     列出所有商品
#     """
#     def get(self, request, format=None):
#         goods = Goods.objects.all()[:10]
#         # 因为前面的是一个列表，加many=True
#         goods_json = GoodsSerializer(goods, many=True)
#         return Response(goods_json.data)

    # def post(self, request, format=None):
    #     serializer = GoodsSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 商品点击数+1

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.click_num += 1
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class CategoryViewset(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """
    list:
        商品分类列表数据
    retrieve:
        获取商品分类详情
    """
    queryset = GoodsCategory.objects.filter(category_type=1)
    serializer_class = CategorySerializer


class BannerViewset(mixins.ListModelMixin, viewsets.GenericViewSet):
    """
    获取轮播图列表
    """
    queryset = Banner.objects.all().order_by("index")
    serializer_class = BannerSerializer


class IndexCategoryViewset(mixins.ListModelMixin, viewsets.GenericViewSet):
    """
    首页商品分类数据
    """
    queryset = GoodsCategory.objects.filter(is_tab=True, name__in=["文学类"])
    serializer_class = IndexCategorySerializer


class HotSearchsViewset(mixins.ListModelMixin, viewsets.GenericViewSet):
    """
    获取热搜词列表
    """
    queryset = HotSearchWords.objects.all().order_by("-index")
    serializer_class = HotWordsSerializer
