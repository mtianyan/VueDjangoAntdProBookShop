[
    {
        name: 'Home',
        path: '/xadmin/index',
        icon: 'dashboard',
        component: './TyAdminBuiltIn/DashBoard'
    },
    {
        path: '/xadmin/',
        redirect: '/xadmin/index',
    },
    {
        name: '认证和授权',
        icon: 'BarsOutlined',
        path: '/xadmin/auth',
        routes:
        [
            {
                name: '权限',
                path: '/xadmin/auth/permission',
                component: './AutoGenPage/PermissionList',
            },
            {
                name: '组',
                path: '/xadmin/auth/group',
                component: './AutoGenPage/GroupList',
            }
        ]
    },
    {
        name: '用户管理',
        icon: 'BarsOutlined',
        path: '/xadmin/users',
        routes:
        [
            {
                name: '用户信息',
                path: '/xadmin/users/user_profile',
                component: './AutoGenPage/UserProfileList',
            },
            {
                name: '短信验证',
                path: '/xadmin/users/verify_code',
                component: './AutoGenPage/VerifyCodeList',
            }
        ]
    },
    {
        name: '商品管理',
        icon: 'BarsOutlined',
        path: '/xadmin/goods',
        routes:
        [
            {
                name: '商品类别',
                path: '/xadmin/goods/goods_category',
                component: './AutoGenPage/GoodsCategoryList',
            },
            {
                name: '宣传品牌',
                path: '/xadmin/goods/goods_category_brand',
                component: './AutoGenPage/GoodsCategoryBrandList',
            },
            {
                name: '商品信息',
                path: '/xadmin/goods/goods',
                component: './AutoGenPage/GoodsList',
            },
            {
                name: '商品轮播',
                path: '/xadmin/goods/goods_image',
                component: './AutoGenPage/GoodsImageList',
            },
            {
                name: '首页轮播',
                path: '/xadmin/goods/banner',
                component: './AutoGenPage/BannerList',
            },
            {
                name: '首页广告',
                path: '/xadmin/goods/index_ad',
                component: './AutoGenPage/IndexAdList',
            },
            {
                name: '热搜排行',
                path: '/xadmin/goods/hot_search_words',
                component: './AutoGenPage/HotSearchWordsList',
            }
        ]
    },
    {
        name: '交易管理',
        icon: 'BarsOutlined',
        path: '/xadmin/trade',
        routes:
        [
            {
                name: '购物车喵',
                path: '/xadmin/trade/shopping_cart',
                component: './AutoGenPage/ShoppingCartList',
            },
            {
                name: '订单信息',
                path: '/xadmin/trade/order_info',
                component: './AutoGenPage/OrderInfoList',
            },
            {
                name: '订单商品',
                path: '/xadmin/trade/order_goods',
                component: './AutoGenPage/OrderGoodsList',
            }
        ]
    },
    {
        name: '操作管理',
        icon: 'BarsOutlined',
        path: '/xadmin/user_operation',
        routes:
        [
            {
                name: '用户收藏',
                path: '/xadmin/user_operation/user_fav',
                component: './AutoGenPage/UserFavList',
            },
            {
                name: '收货地址',
                path: '/xadmin/user_operation/user_address',
                component: './AutoGenPage/UserAddressList',
            },
            {
                name: '用户留言',
                path: '/xadmin/user_operation/user_leaving_message',
                component: './AutoGenPage/UserLeavingMessageList',
            }
        ]
    },
    {
        name: 'TyadminBuiltin',
        icon: 'VideoCamera',
        path: '/xadmin/sys',
        routes:
        [
            {
                name: 'TyAdminLog',
                icon: 'smile',
                path: '/xadmin/sys/ty_admin_sys_log',
                component: './TyAdminBuiltIn/TyAdminSysLogList'
            },
            {
                name: 'TyAdminVerify',
                icon: 'smile',
                path: '/xadmin/sys/ty_admin_email_verify_record',
                component: './TyAdminBuiltIn/TyAdminEmailVerifyRecordList'
            }
        ]
    },
    {
        name: 'passwordModify',
        path: '/xadmin/account/change_password',
        hideInMenu: true,
        icon: 'dashboard',
        component: './TyAdminBuiltIn/ChangePassword',
    },
    {
        component: './404',
    },
]
