
from rest_framework import viewsets
from tyadmin_api.custom import XadminViewSet
from django.contrib.auth.models import Permission, Group
from django.contrib.contenttypes.models import ContentType
from users.models import UserProfile, VerifyCode
from goods.models import GoodsCategory, GoodsCategoryBrand, Goods, GoodsImage, Banner, IndexAd, HotSearchWords
from trade.models import ShoppingCart, OrderInfo, OrderGoods
from user_operation.models import UserFav, UserAddress, UserLeavingMessage

from tyadmin_api.auto_serializers import PermissionListSerializer, GroupListSerializer, ContentTypeListSerializer, UserProfileListSerializer, VerifyCodeListSerializer, GoodsCategoryListSerializer, GoodsCategoryBrandListSerializer, GoodsListSerializer, GoodsImageListSerializer, BannerListSerializer, IndexAdListSerializer, HotSearchWordsListSerializer, ShoppingCartListSerializer, OrderInfoListSerializer, OrderGoodsListSerializer, UserFavListSerializer, UserAddressListSerializer, UserLeavingMessageListSerializer
from tyadmin_api.auto_serializers import PermissionCreateUpdateSerializer, GroupCreateUpdateSerializer, ContentTypeCreateUpdateSerializer, UserProfileCreateUpdateSerializer, VerifyCodeCreateUpdateSerializer, GoodsCategoryCreateUpdateSerializer, GoodsCategoryBrandCreateUpdateSerializer, GoodsCreateUpdateSerializer, GoodsImageCreateUpdateSerializer, BannerCreateUpdateSerializer, IndexAdCreateUpdateSerializer, HotSearchWordsCreateUpdateSerializer, ShoppingCartCreateUpdateSerializer, OrderInfoCreateUpdateSerializer, OrderGoodsCreateUpdateSerializer, UserFavCreateUpdateSerializer, UserAddressCreateUpdateSerializer, UserLeavingMessageCreateUpdateSerializer
from tyadmin_api.auto_filters import PermissionFilter, GroupFilter, ContentTypeFilter, UserProfileFilter, VerifyCodeFilter, GoodsCategoryFilter, GoodsCategoryBrandFilter, GoodsFilter, GoodsImageFilter, BannerFilter, IndexAdFilter, HotSearchWordsFilter, ShoppingCartFilter, OrderInfoFilter, OrderGoodsFilter, UserFavFilter, UserAddressFilter, UserLeavingMessageFilter

    
class PermissionViewSet(XadminViewSet):
    serializer_class = PermissionListSerializer
    queryset = Permission.objects.all().order_by('-pk')
    filter_class = PermissionFilter
    search_fields = ["name","codename"]

    def get_serializer_class(self):
        if self.action == "list":
            return PermissionListSerializer
        else:
            return PermissionCreateUpdateSerializer

    
class GroupViewSet(XadminViewSet):
    serializer_class = GroupListSerializer
    queryset = Group.objects.all().order_by('-pk')
    filter_class = GroupFilter
    search_fields = ["name"]

    def get_serializer_class(self):
        if self.action == "list":
            return GroupListSerializer
        else:
            return GroupCreateUpdateSerializer

    
class ContentTypeViewSet(XadminViewSet):
    serializer_class = ContentTypeListSerializer
    queryset = ContentType.objects.all().order_by('-pk')
    filter_class = ContentTypeFilter
    search_fields = ["app_label","model"]

    def get_serializer_class(self):
        if self.action == "list":
            return ContentTypeListSerializer
        else:
            return ContentTypeCreateUpdateSerializer

    
class UserProfileViewSet(XadminViewSet):
    serializer_class = UserProfileListSerializer
    queryset = UserProfile.objects.all().order_by('-pk')
    filter_class = UserProfileFilter
    search_fields = ["password","username","first_name","last_name","name","gender","mobile","email"]

    def get_serializer_class(self):
        if self.action == "list":
            return UserProfileListSerializer
        else:
            return UserProfileCreateUpdateSerializer

    
class VerifyCodeViewSet(XadminViewSet):
    serializer_class = VerifyCodeListSerializer
    queryset = VerifyCode.objects.all().order_by('-pk')
    filter_class = VerifyCodeFilter
    search_fields = ["code","mobile"]

    def get_serializer_class(self):
        if self.action == "list":
            return VerifyCodeListSerializer
        else:
            return VerifyCodeCreateUpdateSerializer

    
class GoodsCategoryViewSet(XadminViewSet):
    serializer_class = GoodsCategoryListSerializer
    queryset = GoodsCategory.objects.all().order_by('-pk')
    filter_class = GoodsCategoryFilter
    search_fields = ["name","code"]

    def get_serializer_class(self):
        if self.action == "list":
            return GoodsCategoryListSerializer
        else:
            return GoodsCategoryCreateUpdateSerializer

    
class GoodsCategoryBrandViewSet(XadminViewSet):
    serializer_class = GoodsCategoryBrandListSerializer
    queryset = GoodsCategoryBrand.objects.all().order_by('-pk')
    filter_class = GoodsCategoryBrandFilter
    search_fields = ["name"]

    def get_serializer_class(self):
        if self.action == "list":
            return GoodsCategoryBrandListSerializer
        else:
            return GoodsCategoryBrandCreateUpdateSerializer

    
class GoodsViewSet(XadminViewSet):
    serializer_class = GoodsListSerializer
    queryset = Goods.objects.all().order_by('-pk')
    filter_class = GoodsFilter
    search_fields = ["goods_sn","name"]

    def get_serializer_class(self):
        if self.action == "list":
            return GoodsListSerializer
        else:
            return GoodsCreateUpdateSerializer

    
class GoodsImageViewSet(XadminViewSet):
    serializer_class = GoodsImageListSerializer
    queryset = GoodsImage.objects.all().order_by('-pk')
    filter_class = GoodsImageFilter
    search_fields = []

    def get_serializer_class(self):
        if self.action == "list":
            return GoodsImageListSerializer
        else:
            return GoodsImageCreateUpdateSerializer

    
class BannerViewSet(XadminViewSet):
    serializer_class = BannerListSerializer
    queryset = Banner.objects.all().order_by('-pk')
    filter_class = BannerFilter
    search_fields = []

    def get_serializer_class(self):
        if self.action == "list":
            return BannerListSerializer
        else:
            return BannerCreateUpdateSerializer

    
class IndexAdViewSet(XadminViewSet):
    serializer_class = IndexAdListSerializer
    queryset = IndexAd.objects.all().order_by('-pk')
    filter_class = IndexAdFilter
    search_fields = []

    def get_serializer_class(self):
        if self.action == "list":
            return IndexAdListSerializer
        else:
            return IndexAdCreateUpdateSerializer

    
class HotSearchWordsViewSet(XadminViewSet):
    serializer_class = HotSearchWordsListSerializer
    queryset = HotSearchWords.objects.all().order_by('-pk')
    filter_class = HotSearchWordsFilter
    search_fields = ["keywords"]

    def get_serializer_class(self):
        if self.action == "list":
            return HotSearchWordsListSerializer
        else:
            return HotSearchWordsCreateUpdateSerializer

    
class ShoppingCartViewSet(XadminViewSet):
    serializer_class = ShoppingCartListSerializer
    queryset = ShoppingCart.objects.all().order_by('-pk')
    filter_class = ShoppingCartFilter
    search_fields = []

    def get_serializer_class(self):
        if self.action == "list":
            return ShoppingCartListSerializer
        else:
            return ShoppingCartCreateUpdateSerializer

    
class OrderInfoViewSet(XadminViewSet):
    serializer_class = OrderInfoListSerializer
    queryset = OrderInfo.objects.all().order_by('-pk')
    filter_class = OrderInfoFilter
    search_fields = ["order_sn","nonce_str","trade_no","pay_status","pay_type","post_script","address","signer_name","singer_mobile"]

    def get_serializer_class(self):
        if self.action == "list":
            return OrderInfoListSerializer
        else:
            return OrderInfoCreateUpdateSerializer

    
class OrderGoodsViewSet(XadminViewSet):
    serializer_class = OrderGoodsListSerializer
    queryset = OrderGoods.objects.all().order_by('-pk')
    filter_class = OrderGoodsFilter
    search_fields = []

    def get_serializer_class(self):
        if self.action == "list":
            return OrderGoodsListSerializer
        else:
            return OrderGoodsCreateUpdateSerializer

    
class UserFavViewSet(XadminViewSet):
    serializer_class = UserFavListSerializer
    queryset = UserFav.objects.all().order_by('-pk')
    filter_class = UserFavFilter
    search_fields = []

    def get_serializer_class(self):
        if self.action == "list":
            return UserFavListSerializer
        else:
            return UserFavCreateUpdateSerializer

    
class UserAddressViewSet(XadminViewSet):
    serializer_class = UserAddressListSerializer
    queryset = UserAddress.objects.all().order_by('-pk')
    filter_class = UserAddressFilter
    search_fields = ["province","city","district","address","signer_name","signer_mobile"]

    def get_serializer_class(self):
        if self.action == "list":
            return UserAddressListSerializer
        else:
            return UserAddressCreateUpdateSerializer

    
class UserLeavingMessageViewSet(XadminViewSet):
    serializer_class = UserLeavingMessageListSerializer
    queryset = UserLeavingMessage.objects.all().order_by('-pk')
    filter_class = UserLeavingMessageFilter
    search_fields = ["subject"]

    def get_serializer_class(self):
        if self.action == "list":
            return UserLeavingMessageListSerializer
        else:
            return UserLeavingMessageCreateUpdateSerializer
