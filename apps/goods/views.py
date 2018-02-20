from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView
from goods.serializers import GoodsSerializer
from .models import Goods
from rest_framework import mixins
from rest_framework import generics
from rest_framework import viewsets


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
class GoodsListViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    """
    商品列表页
    """
    queryset = Goods.objects.all()
    serializer_class = GoodsSerializer
    pagination_class = GoodsPagination


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

