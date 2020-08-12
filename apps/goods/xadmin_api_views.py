from rest_framework import viewsets
    
from goods.models import GoodsCategory, GoodsCategoryBrand, Goods, GoodsImage, Banner, IndexAd, HotSearchWords
from goods.xadmin_serializers import GoodsCategorySerializer, GoodsCategoryBrandSerializer, GoodsSerializer, GoodsImageSerializer, BannerSerializer, IndexAdSerializer, HotSearchWordsSerializer
    

class GoodsCategoryViewSet(viewsets.ModelViewSet):
    serializer_class = GoodsCategorySerializer
    queryset = GoodsCategory.objects.all()


class GoodsCategoryBrandViewSet(viewsets.ModelViewSet):
    serializer_class = GoodsCategoryBrandSerializer
    queryset = GoodsCategoryBrand.objects.all()


class GoodsViewSet(viewsets.ModelViewSet):
    serializer_class = GoodsSerializer
    queryset = Goods.objects.all()


class GoodsImageViewSet(viewsets.ModelViewSet):
    serializer_class = GoodsImageSerializer
    queryset = GoodsImage.objects.all()


class BannerViewSet(viewsets.ModelViewSet):
    serializer_class = BannerSerializer
    queryset = Banner.objects.all()


class IndexAdViewSet(viewsets.ModelViewSet):
    serializer_class = IndexAdSerializer
    queryset = IndexAd.objects.all()


class HotSearchWordsViewSet(viewsets.ModelViewSet):
    serializer_class = HotSearchWordsSerializer
    queryset = HotSearchWords.objects.all()
