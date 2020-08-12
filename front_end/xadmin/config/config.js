// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  outputPath: `../templates/admin/`,
  publicPath: REACT_APP_ENV === 'dev' ? '/' : '/static/madmin/',
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
          component: './UserLogin',
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
          routes: [
            {
              path: '/xadmin/',
              redirect: '/xadmin/index',
            },
            {
              name: '首页',
              path: '/xadmin/index',
              icon: 'smile',
              component: './DashBoard',
            },
            {
              name: '所在城市',
              icon: 'smile',
              path: '/xadmin/city/list',
              component: './CityList',
            },
            {
              name: '机构信息',
              icon: 'smile',
              path: '/xadmin/org/list',
              component: './OrgList',
            },
            {
              name: '机构讲师',
              icon: 'smile',
              path: '/xadmin/teacher/list',
              component: './TeacherList',
            },
            {
              name: '课程信息',
              icon: 'user',
              path: '/xadmin/course/list',
              component: './CourseList',
            },
            {
              name: '章节信息',
              icon: 'user',
              path: '/xadmin/lesson/list',
              component: './LessonList',
            },
            {
              name: '视频信息',
              icon: 'user',
              path: '/xadmin/video/list',
              component: './VideoList',
            },
            {
              name: '课程资源',
              icon: 'user',
              path: '/xadmin/resource/list',
              component: './ResourceList',
            },
            {
              name: '课程评论',
              icon: 'user',
              path: '/xadmin/comment/list',
              component: './CommentList',
            },
            {
              name: '用户信息',
              icon: 'user',
              path: '/xadmin/users/list',
              component: './UserList',
            },
            {
              path: '/xadmin/code/list',
              name: '用户验证',
              icon: 'ApartmentOutlined',
              component: './CodeList', // authority: ['system:department'],
            },
            {
              path: '/xadmin/users/course',
              name: '用户课程',
              icon: 'ApartmentOutlined',
              component: './UserCourseList', // authority: ['system:department'],
            },
            {
              path: '/xadmin/users/fav',
              name: '用户收藏',
              icon: 'ApartmentOutlined',
              component: './UserFav', // authority: ['system:department'],
            },
            {
              path: '/xadmin/users/message',
              name: '用户消息',
              icon: 'ApartmentOutlined',
              component: './UserMessage', // authority: ['system:department'],
            },
            {
              path: '/xadmin/users/ask',
              name: '用户咨询',
              icon: 'ApartmentOutlined',
              component: './UserAskList', // authority: ['system:department'],
            },
            {
              path: '/xadmin/banner/ask',
              name: '首页轮播',
              icon: 'ApartmentOutlined',
              component: './BannerList', // authority: ['system:department'],
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
