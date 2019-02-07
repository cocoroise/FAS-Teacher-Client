export default [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/', component: './index/index', title: '首页' },
      { path: '/select', component: './index/select', title: '开启考勤记录' },
      { path: '/attendance', component: './attendance/index', title: '考勤信息' },
      { path: '/info', component: './info/index', title: '个人信息' },
      { path: '/info/edit', component: './info/edit', title: '修改个人信息' },
      { path: '/info/login', component: './info/login', title: '教师登陆' },
      {
        path: '/exception',
        component: '../layouts/ExceptionLayout',
        routes: [
          { path: '/exception/403', title: '无权限', component: './exception/403' },
          { path: '/exception/500', title: '服务器出错了', component: './exception/500' },
        ],
      },
      { component: '404', title: '页面没找到' },
    ],
  },
];
