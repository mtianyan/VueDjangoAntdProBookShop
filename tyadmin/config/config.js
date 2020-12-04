// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

var fs = require("fs");
const path = require('path');
const { REACT_APP_ENV } = process.env;
const auto_route = eval(fs.readFileSync(path.join(__dirname, 'routes.js')).toString());
export default defineConfig({
    hash: true,
    antd: {},
    extraBabelPlugins: [
        REACT_APP_ENV === 'dev' ? "" : 'transform-remove-console'
    ],
    outputPath: `../static/tyadmin/`,
    publicPath: REACT_APP_ENV === 'dev' ? '/' : '/static/tyadmin/',
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
    routes: [
        {
            path: '/xadmin/login',
            component: '../layouts/UserLayout',
            routes: [
                {
                    name: 'login',
                    path: '/xadmin/login',
                    component: './TyAdminBuiltIn/UserLogin',
                },
            ],
        },
        {
            path: '/xadmin/',
            component: '../layouts/SecurityLayout',
            routes: [
                {
                    path: '/xadmin/',
                    component: '../layouts/BasicLayout',
                    authority: ['admin', 'user'],
                    routes: auto_route,
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