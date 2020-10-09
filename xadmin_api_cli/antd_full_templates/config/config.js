// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
    hash: true,
    antd: {},
    outputPath: `../templates/TyAdmin/`,
    publicPath: REACT_APP_ENV === 'dev' ? '/' : '/static/TyAdmin/',
    dva: {
        hmr: true,
    },
    locale: {
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        antd: true,
        baseNavigator: true,
    },
    dynamicImport: {
        loading: '@/components/PageLoading/index',
    },
    targets: {
        ie: 11,
    },
    // umi routes: https://umijs.org/docs/routing
    routes: [{
            path: '/xadmin/login',
            component: '../layouts/UserLayout',
            routes: [{
                name: 'login',
                path: '/xadmin/login',
                component: './TyAdminBuiltIn/UserLogin',
            }, ],
        },
        {
            path: '/xadmin/',
            component: '../layouts/SecurityLayout',
            routes: [{
                    path: '/xadmin/',
                    component: '../layouts/BasicLayout',
                    authority: ['admin', 'user'],
                    routes: [{
                            name: '首页',
                            path: '/xadmin/index',
                            icon: 'dashboard',
                            component: './TyAdminBuiltIn/DashBoard',
                        },
                        {
                            path: '/xadmin/',
                            redirect: '/xadmin/index',
                        },
                        {
                            name: 'Tyadmin内置',
                            icon: 'VideoCamera',
                            path: '/xadmin/sys',
                            routes: [{
                                name: 'TyAdmin日志',
                                icon: 'smile',
                                path: '/xadmin/sys/ty_admin_sys_log',
                                component: './TyAdminBuiltIn/TyAdminSysLogList',
                            }, {
                                name: 'TyAdmin验证',
                                icon: 'smile',
                                path: '/xadmin/sys/ty_admin_email_verify_record',
                                component: './TyAdminBuiltIn/TyAdminEmailVerifyRecordList',
                            }],
                        },
                        {
                            component: './404',
                        },
                    ],
                },
                {
                    component: './404',
                },
            ],
        },
        {
            component: './404',
        },
    ],
    // Theme for antd: https://ant.design/docs/react/customize-theme-cn
    theme: {
        // ...darkTheme,
        'primary-color': defaultSettings.primaryColor,
    },
    // @ts-ignore
    title: false,
    ignoreMomentLocale: true,
    proxy: proxy[REACT_APP_ENV || 'dev'],
    manifest: {
        basePath: '/',
    },
});