
from rest_framework import viewsets
from xadmin_api.custom import XadminViewSet
from users.models import UserProfile, VerifyCode
from goods.models import GoodsCategory, GoodsCategoryBrand, Goods, GoodsImage, Banner, IndexAd, HotSearchWords
from trade.models import ShoppingCart, OrderInfo, OrderGoods
from user_operation.models import UserFav, UserAddress, UserLeavingMessage
from replace.models import VersionControl

from xadmin_api.auto_serializers import UserProfileSerializer, VerifyCodeSerializer, GoodsCategorySerializer, GoodsCategoryBrandSerializer, GoodsSerializer, GoodsImageSerializer, BannerSerializer, IndexAdSerializer, HotSearchWordsSerializer, ShoppingCartSerializer, OrderInfoSerializer, OrderGoodsSerializer, UserFavSerializer, UserAddressSerializer, UserLeavingMessageSerializer, VersionControlSerializer
from xadmin_api.auto_filters import UserProfileFilter, VerifyCodeFilter, GoodsCategoryFilter, GoodsCategoryBrandFilter, GoodsFilter, GoodsImageFilter, BannerFilter, IndexAdFilter, HotSearchWordsFilter, ShoppingCartFilter, OrderInfoFilter, OrderGoodsFilter, UserFavFilter, UserAddressFilter, UserLeavingMessageFilter, VersionControlFilter


class UserProfileViewSet(XadminViewSet):
        serializer_class = UserProfileSerializer
        queryset = UserProfile.objects.all()
        filter_class = UserProfileFilter
        search_fields = ["password","username","first_name","last_name","name","gender","mobile","email"]
    

class VerifyCodeViewSet(XadminViewSet):
        serializer_class = VerifyCodeSerializer
        queryset = VerifyCode.objects.all()
        filter_class = VerifyCodeFilter
        search_fields = ["code","mobile"]
    

class GoodsCategoryViewSet(XadminViewSet):
        serializer_class = GoodsCategorySerializer
        queryset = GoodsCategory.objects.all()
        filter_class = GoodsCategoryFilter
        search_fields = ["name","code"]
    

class GoodsCategoryBrandViewSet(XadminViewSet):
        serializer_class = GoodsCategoryBrandSerializer
        queryset = GoodsCategoryBrand.objects.all()
        filter_class = GoodsCategoryBrandFilter
        search_fields = ["name"]
    

class GoodsViewSet(XadminViewSet):
        serializer_class = GoodsSerializer
        queryset = Goods.objects.all()
        filter_class = GoodsFilter
        search_fields = ["goods_sn","name"]
    

class GoodsImageViewSet(XadminViewSet):
        serializer_class = GoodsImageSerializer
        queryset = GoodsImage.objects.all()
        filter_class = GoodsImageFilter
        search_fields = []
    

class BannerViewSet(XadminViewSet):
        serializer_class = BannerSerializer
        queryset = Banner.objects.all()
        filter_class = BannerFilter
        search_fields = []
    

class IndexAdViewSet(XadminViewSet):
        serializer_class = IndexAdSerializer
        queryset = IndexAd.objects.all()
        filter_class = IndexAdFilter
        search_fields = []
    

class HotSearchWordsViewSet(XadminViewSet):
        serializer_class = HotSearchWordsSerializer
        queryset = HotSearchWords.objects.all()
        filter_class = HotSearchWordsFilter
        search_fields = ["keywords"]
    

class ShoppingCartViewSet(XadminViewSet):
        serializer_class = ShoppingCartSerializer
        queryset = ShoppingCart.objects.all()
        filter_class = ShoppingCartFilter
        search_fields = []
    

class OrderInfoViewSet(XadminViewSet):
        serializer_class = OrderInfoSerializer
        queryset = OrderInfo.objects.all()
        filter_class = OrderInfoFilter
        search_fields = ["order_sn","nonce_str","trade_no","pay_status","pay_type","post_script","address","signer_name","singer_mobile"]
    

class OrderGoodsViewSet(XadminViewSet):
        serializer_class = OrderGoodsSerializer
        queryset = OrderGoods.objects.all()
        filter_class = OrderGoodsFilter
        search_fields = []
    

class UserFavViewSet(XadminViewSet):
        serializer_class = UserFavSerializer
        queryset = UserFav.objects.all()
        filter_class = UserFavFilter
        search_fields = []
    

class UserAddressViewSet(XadminViewSet):
        serializer_class = UserAddressSerializer
        queryset = UserAddress.objects.all()
        filter_class = UserAddressFilter
        search_fields = ["province","city","district","address","signer_name","signer_mobile"]
    

class UserLeavingMessageViewSet(XadminViewSet):
        serializer_class = UserLeavingMessageSerializer
        queryset = UserLeavingMessage.objects.all()
        filter_class = UserLeavingMessageFilter
        search_fields = ["subject"]
    

class VersionControlViewSet(XadminViewSet):
        serializer_class = VersionControlSerializer
        queryset = VersionControl.objects.all()
        filter_class = VersionControlFilter
        search_fields = ["version_code"]
    