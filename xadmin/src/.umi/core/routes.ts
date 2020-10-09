// @ts-nocheck
import { ApplyPluginsType, dynamic } from '/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/xadmin/login",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/src/layouts/UserLayout'), loading: require('@/components/PageLoading/index').default}),
    "routes": [
      {
        "name": "login",
        "path": "/xadmin/login",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TyAdminBuiltIn__UserLogin' */'/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/src/pages/TyAdminBuiltIn/UserLogin'), loading: require('@/components/PageLoading/index').default}),
        "exact": true
      }
    ]
  },
  {
    "path": "/xadmin/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__SecurityLayout' */'/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/src/layouts/SecurityLayout'), loading: require('@/components/PageLoading/index').default}),
    "routes": [
      {
        "path": "/xadmin/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/src/layouts/BasicLayout'), loading: require('@/components/PageLoading/index').default}),
        "authority": [
          "admin",
          "user"
        ],
        "routes": [
          {
            "name": "首页",
            "path": "/xadmin/index",
            "icon": "dashboard",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TyAdminBuiltIn__DashBoard' */'/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/src/pages/TyAdminBuiltIn/DashBoard'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "path": "/xadmin/",
            "redirect": "/xadmin/index",
            "exact": true
          },
          {
            "name": "用户信息",
            "icon": "smile",
            "path": "/xadmin/user_profile",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AutoGenPage__UserProfileList' */'/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/src/pages/AutoGenPage/UserProfileList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "短信验证",
            "icon": "smile",
            "path": "/xadmin/verify_code",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AutoGenPage__VerifyCodeList' */'/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/src/pages/AutoGenPage/VerifyCodeList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "商品类别",
            "icon": "smile",
            "path": "/xadmin/goods_category",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AutoGenPage__GoodsCategoryList' */'/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/src/pages/AutoGenPage/GoodsCategoryList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "宣传品牌",
            "icon": "smile",
            "path": "/xadmin/goods_category_brand",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AutoGenPage__GoodsCategoryBrandList' */'/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/src/pages/AutoGenPage/GoodsCategoryBrandList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "商品信息",
            "icon": "smile",
            "path": "/xadmin/goods",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AutoGenPage__GoodsList' */'/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/src/pages/AutoGenPage/GoodsList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "商品轮播",
            "icon": "smile",
            "path": "/xadmin/goods_image",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AutoGenPage__GoodsImageList' */'/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/src/pages/AutoGenPage/GoodsImageList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "首页轮播",
            "icon": "smile",
            "path": "/xadmin/banner",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AutoGenPage__BannerList' */'/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/src/pages/AutoGenPage/BannerList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "首页广告",
            "icon": "smile",
            "path": "/xadmin/index_ad",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AutoGenPage__IndexAdList' */'/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/src/pages/AutoGenPage/IndexAdList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "热搜排行",
            "icon": "smile",
            "path": "/xadmin/hot_search_words",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AutoGenPage__HotSearchWordsList' */'/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/src/pages/AutoGenPage/HotSearchWordsList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "购物车喵",
            "icon": "smile",
            "path": "/xadmin/shopping_cart",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AutoGenPage__ShoppingCartList' */'/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/src/pages/AutoGenPage/ShoppingCartList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "订单信息",
            "icon": "smile",
            "path": "/xadmin/order_info",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AutoGenPage__OrderInfoList' */'/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/src/pages/AutoGenPage/OrderInfoList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "订单商品",
            "icon": "smile",
            "path": "/xadmin/order_goods",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AutoGenPage__OrderGoodsList' */'/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/src/pages/AutoGenPage/OrderGoodsList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "用户收藏",
            "icon": "smile",
            "path": "/xadmin/user_fav",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AutoGenPage__UserFavList' */'/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/src/pages/AutoGenPage/UserFavList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "收货地址",
            "icon": "smile",
            "path": "/xadmin/user_address",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AutoGenPage__UserAddressList' */'/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/src/pages/AutoGenPage/UserAddressList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "用户留言",
            "icon": "smile",
            "path": "/xadmin/user_leaving_message",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AutoGenPage__UserLeavingMessageList' */'/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/src/pages/AutoGenPage/UserLeavingMessageList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "版本信息",
            "icon": "smile",
            "path": "/xadmin/version_control",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__AutoGenPage__VersionControlList' */'/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/src/pages/AutoGenPage/VersionControlList'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          },
          {
            "name": "Tyadmin内置",
            "icon": "VideoCamera",
            "path": "/xadmin/sys",
            "routes": [
              {
                "name": "TyAdmin日志",
                "icon": "smile",
                "path": "/xadmin/sys/ty_admin_sys_log",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TyAdminBuiltIn__TyAdminSysLogList' */'/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/src/pages/TyAdminBuiltIn/TyAdminSysLogList'), loading: require('@/components/PageLoading/index').default}),
                "exact": true
              },
              {
                "name": "TyAdmin验证",
                "icon": "smile",
                "path": "/xadmin/sys/ty_admin_email_verify_record",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TyAdminBuiltIn__TyAdminEmailVerifyRecordList' */'/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/src/pages/TyAdminBuiltIn/TyAdminEmailVerifyRecordList'), loading: require('@/components/PageLoading/index').default}),
                "exact": true
              }
            ]
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/src/pages/404'), loading: require('@/components/PageLoading/index').default}),
            "exact": true
          }
        ]
      },
      {
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/src/pages/404'), loading: require('@/components/PageLoading/index').default}),
        "exact": true
      }
    ]
  },
  {
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/xadmin/src/pages/404'), loading: require('@/components/PageLoading/index').default}),
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
