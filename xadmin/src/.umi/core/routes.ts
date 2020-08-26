// @ts-nocheck
import { ApplyPluginsType, dynamic } from '/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/xadmin/login",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/src/layouts/UserLayout'), loading: require('@/components/PageLoading/index').default}),
    "routes": [
      {
        "name": "login",
        "path": "/xadmin/login",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__UserLogin' */'/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/src/pages/UserLogin'), loading: require('@/components/PageLoading/index').default}),
        "exact": true
      }
    ]
  },
  {
    "path": "/xadmin/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__SecurityLayout' */'/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/src/layouts/SecurityLayout'), loading: require('@/components/PageLoading/index').default}),
    "routes": [
      {
        "path": "/xadmin/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/src/layouts/BasicLayout'), loading: require('@/components/PageLoading/index').default}),
        "authority": [
          "admin",
          "user"
        ],
        "routes": [
          {
            "path": "/xadmin/",
            "redirect": "/xadmin/index",
            "exact": true
          },
          {
            "name": "首页",
            "path": "/xadmin/index",
            "icon": "dashboard",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__DashBoard' */'/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/src/pages/DashBoard'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "用户信息",
            "icon": "smile",
            "path": "/xadmin/user_profile",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__UserProfileList' */'/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/src/pages/UserProfileList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "短信验证",
            "icon": "smile",
            "path": "/xadmin/verify_code",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__VerifyCodeList' */'/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/src/pages/VerifyCodeList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "商品类别",
            "icon": "smile",
            "path": "/xadmin/goods_category",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__GoodsCategoryList' */'/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/src/pages/GoodsCategoryList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "宣传品牌",
            "icon": "smile",
            "path": "/xadmin/goods_category_brand",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__GoodsCategoryBrandList' */'/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/src/pages/GoodsCategoryBrandList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "商品信息",
            "icon": "smile",
            "path": "/xadmin/goods",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__GoodsList' */'/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/src/pages/GoodsList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "商品轮播",
            "icon": "smile",
            "path": "/xadmin/goods_image",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__GoodsImageList' */'/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/src/pages/GoodsImageList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "首页轮播",
            "icon": "smile",
            "path": "/xadmin/banner",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__BannerList' */'/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/src/pages/BannerList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "首页广告",
            "icon": "smile",
            "path": "/xadmin/index_ad",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__IndexAdList' */'/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/src/pages/IndexAdList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "热搜排行",
            "icon": "smile",
            "path": "/xadmin/hot_search_words",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__HotSearchWordsList' */'/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/src/pages/HotSearchWordsList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "购物车喵",
            "icon": "smile",
            "path": "/xadmin/shopping_cart",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ShoppingCartList' */'/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/src/pages/ShoppingCartList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "订单信息",
            "icon": "smile",
            "path": "/xadmin/order_info",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__OrderInfoList' */'/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/src/pages/OrderInfoList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "订单商品",
            "icon": "smile",
            "path": "/xadmin/order_goods",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__OrderGoodsList' */'/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/src/pages/OrderGoodsList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "用户收藏",
            "icon": "smile",
            "path": "/xadmin/user_fav",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__UserFavList' */'/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/src/pages/UserFavList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "收货地址",
            "icon": "smile",
            "path": "/xadmin/user_address",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__UserAddressList' */'/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/src/pages/UserAddressList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "用户留言",
            "icon": "smile",
            "path": "/xadmin/user_leaving_message",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__UserLeavingMessageList' */'/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/src/pages/UserLeavingMessageList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "版本信息",
            "icon": "smile",
            "path": "/xadmin/version_control",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__VersionControlList' */'/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/src/pages/VersionControlList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "TyAdmin日志",
            "icon": "smile",
            "path": "/xadmin/ty_admin_sys_log",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TyAdminSysLogList' */'/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/src/pages/TyAdminSysLogList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "TyAdmin验证",
            "icon": "smile",
            "path": "/xadmin/ty_admin_email_verify_record",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TyAdminEmailVerifyRecordList' */'/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/src/pages/TyAdminEmailVerifyRecordList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/src/pages/404'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          }
        ]
      },
      {
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/src/pages/404'), loading: require('@/components/PageLoading/index').default}),
        "exact": true
      }
    ]
  },
  {
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/mtianyan/Desktop/Github/VueDjangoAntdProBookShop/xadmin/src/pages/404'), loading: require('@/components/PageLoading/index').default}),
    "exact": true
  }
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

export { routes };
