import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import http from 'vue-resource'

import MintUI from 'mint-ui'
require('mint-ui/lib/style.css');
global.MintUI = MintUI;

import Vuerify from 'vuerify'
import VuerifyConfig from './kit/vuerify-config'
import _com from './kit/common'
import usages from './kit/usages'
import config from './kit/config'

global.usages = usages;
global.config = config;
global._com = _com;

Vue.use(VueRouter);
Vue.use(http);
Vue.use(Vuerify, VuerifyConfig);
Vue.use(MintUI);

import routes from './router/routes'

const router = new VueRouter({
  // mode: 'history',
  base: __dirname,
  routes: routes
})

router.beforeEach(function (to, from, next) {
  var islogin = (localStorage.getItem('km_login') | 0);
  if (to.meta) document.title = to.meta.title || '卡盟'; //设置每个路由的标题
  if (to.meta.auth && !islogin) next('/login'); //未登录
  else next();
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})