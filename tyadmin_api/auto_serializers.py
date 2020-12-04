from rest_framework import serializers
from django.contrib.auth.models import Permission, Group
from django.contrib.contenttypes.models import ContentType
from users.models import UserProfile, VerifyCode
from goods.models import GoodsCategory, GoodsCategoryBrand, Goods, GoodsImage, Banner, IndexAd, HotSearchWords
from trade.models import ShoppingCart, OrderInfo, OrderGoods
from user_operation.models import UserFav, UserAddress, UserLeavingMessage


class ContentTypeListSerializer(serializers.ModelSerializer):
    

    key = serializers.CharField(source="pk")
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = ContentType
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class ContentTypeCreateUpdateSerializer(serializers.ModelSerializer):
    
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = ContentType
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class VerifyCodeListSerializer(serializers.ModelSerializer):
    

    key = serializers.CharField(source="pk")
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = VerifyCode
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class VerifyCodeCreateUpdateSerializer(serializers.ModelSerializer):
    
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = VerifyCode
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class HotSearchWordsListSerializer(serializers.ModelSerializer):
    

    key = serializers.CharField(source="pk")
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = HotSearchWords
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class HotSearchWordsCreateUpdateSerializer(serializers.ModelSerializer):
    
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = HotSearchWords
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class PermissionListSerializer(serializers.ModelSerializer):
    

    class ContentTypeSerializer(serializers.ModelSerializer):
        ty_options_display_txt = serializers.SerializerMethodField()
        class Meta:
            model = ContentType
            fields = "__all__"
        @staticmethod
        def get_ty_options_display_txt(obj):
            return str(obj)
    content_type = ContentTypeSerializer()
    key = serializers.CharField(source="pk")
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = Permission
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class PermissionCreateUpdateSerializer(serializers.ModelSerializer):
    
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = Permission
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class GroupListSerializer(serializers.ModelSerializer):
    

    class PermissionSerializer(serializers.ModelSerializer):
        ty_options_display_txt = serializers.SerializerMethodField()
        class Meta:
            model = Permission
            fields = "__all__"
        @staticmethod
        def get_ty_options_display_txt(obj):
            return str(obj)
    permissions = PermissionSerializer(many=True)
    key = serializers.CharField(source="pk")
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = Group
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class GroupCreateUpdateSerializer(serializers.ModelSerializer):
    
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = Group
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class UserProfileListSerializer(serializers.ModelSerializer):
    

    class GroupSerializer(serializers.ModelSerializer):
        ty_options_display_txt = serializers.SerializerMethodField()
        class Meta:
            model = Group
            fields = "__all__"
        @staticmethod
        def get_ty_options_display_txt(obj):
            return str(obj)
    groups = GroupSerializer(many=True)
    class PermissionSerializer(serializers.ModelSerializer):
        ty_options_display_txt = serializers.SerializerMethodField()
        class Meta:
            model = Permission
            fields = "__all__"
        @staticmethod
        def get_ty_options_display_txt(obj):
            return str(obj)
    user_permissions = PermissionSerializer(many=True)
    key = serializers.CharField(source="pk")
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class UserProfileCreateUpdateSerializer(serializers.ModelSerializer):
    
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class GoodsCategoryListSerializer(serializers.ModelSerializer):
    

    class GoodsCategorySelfSerializer(serializers.ModelSerializer):
        ty_options_display_txt = serializers.SerializerMethodField()

        class Meta:
            model = GoodsCategory
            fields = "__all__"

        @staticmethod
        def get_ty_options_display_txt(obj):
            return str(obj)
    parent_category = GoodsCategorySelfSerializer()
    key = serializers.CharField(source="pk")
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = GoodsCategory
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class GoodsCategoryCreateUpdateSerializer(serializers.ModelSerializer):
    
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = GoodsCategory
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class GoodsCategoryBrandListSerializer(serializers.ModelSerializer):
    

    class GoodsCategorySerializer(serializers.ModelSerializer):
        ty_options_display_txt = serializers.SerializerMethodField()
        class Meta:
            model = GoodsCategory
            fields = "__all__"
        @staticmethod
        def get_ty_options_display_txt(obj):
            return str(obj)
    category = GoodsCategorySerializer()
    key = serializers.CharField(source="pk")
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = GoodsCategoryBrand
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class GoodsCategoryBrandCreateUpdateSerializer(serializers.ModelSerializer):
    
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = GoodsCategoryBrand
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class GoodsListSerializer(serializers.ModelSerializer):
    

    class GoodsCategorySerializer(serializers.ModelSerializer):
        ty_options_display_txt = serializers.SerializerMethodField()
        class Meta:
            model = GoodsCategory
            fields = "__all__"
        @staticmethod
        def get_ty_options_display_txt(obj):
            return str(obj)
    category = GoodsCategorySerializer()
    key = serializers.CharField(source="pk")
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = Goods
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class GoodsCreateUpdateSerializer(serializers.ModelSerializer):
    
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = Goods
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class GoodsImageListSerializer(serializers.ModelSerializer):
    

    class GoodsSerializer(serializers.ModelSerializer):
        ty_options_display_txt = serializers.SerializerMethodField()
        class Meta:
            model = Goods
            fields = "__all__"
        @staticmethod
        def get_ty_options_display_txt(obj):
            return str(obj)
    goods = GoodsSerializer()
    key = serializers.CharField(source="pk")
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = GoodsImage
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class GoodsImageCreateUpdateSerializer(serializers.ModelSerializer):
    
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = GoodsImage
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class BannerListSerializer(serializers.ModelSerializer):
    

    class GoodsSerializer(serializers.ModelSerializer):
        ty_options_display_txt = serializers.SerializerMethodField()
        class Meta:
            model = Goods
            fields = "__all__"
        @staticmethod
        def get_ty_options_display_txt(obj):
            return str(obj)
    goods = GoodsSerializer()
    key = serializers.CharField(source="pk")
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = Banner
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class BannerCreateUpdateSerializer(serializers.ModelSerializer):
    
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = Banner
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class IndexAdListSerializer(serializers.ModelSerializer):
    

    class GoodsCategorySerializer(serializers.ModelSerializer):
        ty_options_display_txt = serializers.SerializerMethodField()
        class Meta:
            model = GoodsCategory
            fields = "__all__"
        @staticmethod
        def get_ty_options_display_txt(obj):
            return str(obj)
    category = GoodsCategorySerializer()
    class GoodsSerializer(serializers.ModelSerializer):
        ty_options_display_txt = serializers.SerializerMethodField()
        class Meta:
            model = Goods
            fields = "__all__"
        @staticmethod
        def get_ty_options_display_txt(obj):
            return str(obj)
    goods = GoodsSerializer()
    key = serializers.CharField(source="pk")
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = IndexAd
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class IndexAdCreateUpdateSerializer(serializers.ModelSerializer):
    
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = IndexAd
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class ShoppingCartListSerializer(serializers.ModelSerializer):
    

    class UserProfileSerializer(serializers.ModelSerializer):
        ty_options_display_txt = serializers.SerializerMethodField()
        class Meta:
            model = UserProfile
            fields = "__all__"
        @staticmethod
        def get_ty_options_display_txt(obj):
            return str(obj)
    user = UserProfileSerializer()
    class GoodsSerializer(serializers.ModelSerializer):
        ty_options_display_txt = serializers.SerializerMethodField()
        class Meta:
            model = Goods
            fields = "__all__"
        @staticmethod
        def get_ty_options_display_txt(obj):
            return str(obj)
    goods = GoodsSerializer()
    key = serializers.CharField(source="pk")
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = ShoppingCart
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class ShoppingCartCreateUpdateSerializer(serializers.ModelSerializer):
    
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = ShoppingCart
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class OrderInfoListSerializer(serializers.ModelSerializer):
    

    class UserProfileSerializer(serializers.ModelSerializer):
        ty_options_display_txt = serializers.SerializerMethodField()
        class Meta:
            model = UserProfile
            fields = "__all__"
        @staticmethod
        def get_ty_options_display_txt(obj):
            return str(obj)
    user = UserProfileSerializer()
    key = serializers.CharField(source="pk")
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = OrderInfo
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class OrderInfoCreateUpdateSerializer(serializers.ModelSerializer):
    
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = OrderInfo
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class OrderGoodsListSerializer(serializers.ModelSerializer):
    

    class OrderInfoSerializer(serializers.ModelSerializer):
        ty_options_display_txt = serializers.SerializerMethodField()
        class Meta:
            model = OrderInfo
            fields = "__all__"
        @staticmethod
        def get_ty_options_display_txt(obj):
            return str(obj)
    order = OrderInfoSerializer()
    class GoodsSerializer(serializers.ModelSerializer):
        ty_options_display_txt = serializers.SerializerMethodField()
        class Meta:
            model = Goods
            fields = "__all__"
        @staticmethod
        def get_ty_options_display_txt(obj):
            return str(obj)
    goods = GoodsSerializer()
    key = serializers.CharField(source="pk")
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = OrderGoods
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class OrderGoodsCreateUpdateSerializer(serializers.ModelSerializer):
    
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = OrderGoods
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class UserFavListSerializer(serializers.ModelSerializer):
    

    class UserProfileSerializer(serializers.ModelSerializer):
        ty_options_display_txt = serializers.SerializerMethodField()
        class Meta:
            model = UserProfile
            fields = "__all__"
        @staticmethod
        def get_ty_options_display_txt(obj):
            return str(obj)
    user = UserProfileSerializer()
    class GoodsSerializer(serializers.ModelSerializer):
        ty_options_display_txt = serializers.SerializerMethodField()
        class Meta:
            model = Goods
            fields = "__all__"
        @staticmethod
        def get_ty_options_display_txt(obj):
            return str(obj)
    goods = GoodsSerializer()
    key = serializers.CharField(source="pk")
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = UserFav
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class UserFavCreateUpdateSerializer(serializers.ModelSerializer):
    
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = UserFav
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class UserAddressListSerializer(serializers.ModelSerializer):
    

    class UserProfileSerializer(serializers.ModelSerializer):
        ty_options_display_txt = serializers.SerializerMethodField()
        class Meta:
            model = UserProfile
            fields = "__all__"
        @staticmethod
        def get_ty_options_display_txt(obj):
            return str(obj)
    user = UserProfileSerializer()
    key = serializers.CharField(source="pk")
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = UserAddress
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class UserAddressCreateUpdateSerializer(serializers.ModelSerializer):
    
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = UserAddress
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class UserLeavingMessageListSerializer(serializers.ModelSerializer):
    

    class UserProfileSerializer(serializers.ModelSerializer):
        ty_options_display_txt = serializers.SerializerMethodField()
        class Meta:
            model = UserProfile
            fields = "__all__"
        @staticmethod
        def get_ty_options_display_txt(obj):
            return str(obj)
    user = UserProfileSerializer()
    key = serializers.CharField(source="pk")
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = UserLeavingMessage
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)


class UserLeavingMessageCreateUpdateSerializer(serializers.ModelSerializer):
    
    ty_options_display_txt = serializers.SerializerMethodField()

    class Meta:
        model = UserLeavingMessage
        fields = "__all__"

    @staticmethod
    def get_ty_options_display_txt(obj):
        return str(obj)
