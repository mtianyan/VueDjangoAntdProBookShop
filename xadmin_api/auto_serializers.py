
from rest_framework import serializers
from users.models import UserProfile, VerifyCode
from goods.models import GoodsCategory, GoodsCategoryBrand, Goods, GoodsImage, Banner, IndexAd, HotSearchWords
from trade.models import ShoppingCart, OrderInfo, OrderGoods
from user_operation.models import UserFav, UserAddress, UserLeavingMessage
from replace.models import VersionControl


class UserProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserProfile
        fields = "__all__"
    
class VerifyCodeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = VerifyCode
        fields = "__all__"
    
class GoodsCategorySerializer(serializers.ModelSerializer):
    parent_category_text = serializers.CharField(source="parent_category.name", read_only=True)

    class Meta:
        model = GoodsCategory
        fields = "__all__"
    
class GoodsCategoryBrandSerializer(serializers.ModelSerializer):
    category_text = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = GoodsCategoryBrand
        fields = "__all__"
    
class GoodsSerializer(serializers.ModelSerializer):
    category_text = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Goods
        fields = "__all__"
    
class GoodsImageSerializer(serializers.ModelSerializer):
    goods_text = serializers.CharField(source="goods.name", read_only=True)

    class Meta:
        model = GoodsImage
        fields = "__all__"
    
class BannerSerializer(serializers.ModelSerializer):
    goods_text = serializers.CharField(source="goods.name", read_only=True)

    class Meta:
        model = Banner
        fields = "__all__"
    
class IndexAdSerializer(serializers.ModelSerializer):
    category_text = serializers.CharField(source="category.name", read_only=True)
    goods_text = serializers.CharField(source="goods.name", read_only=True)

    class Meta:
        model = IndexAd
        fields = "__all__"
    
class HotSearchWordsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = HotSearchWords
        fields = "__all__"
    
class ShoppingCartSerializer(serializers.ModelSerializer):
    user_text = serializers.CharField(source="user.username", read_only=True)
    goods_text = serializers.CharField(source="goods.name", read_only=True)

    class Meta:
        model = ShoppingCart
        fields = "__all__"
    
class OrderInfoSerializer(serializers.ModelSerializer):
    user_text = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = OrderInfo
        fields = "__all__"
    
class OrderGoodsSerializer(serializers.ModelSerializer):
    order_text = serializers.CharField(source="order.order_sn", read_only=True)
    goods_text = serializers.CharField(source="goods.name", read_only=True)

    class Meta:
        model = OrderGoods
        fields = "__all__"
    
class UserFavSerializer(serializers.ModelSerializer):
    user_text = serializers.CharField(source="user.username", read_only=True)
    goods_text = serializers.CharField(source="goods.name", read_only=True)

    class Meta:
        model = UserFav
        fields = "__all__"
    
class UserAddressSerializer(serializers.ModelSerializer):
    user_text = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = UserAddress
        fields = "__all__"
    
class UserLeavingMessageSerializer(serializers.ModelSerializer):
    user_text = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = UserLeavingMessage
        fields = "__all__"
    
class VersionControlSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = VersionControl
        fields = "__all__"
    