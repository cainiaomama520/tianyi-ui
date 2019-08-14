import babelpolyfill from 'babel-polyfill'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/style.css'
import './styles/creative.scss'
import './styles/common.css'
import VueRouter from 'vue-router'
import store from './store'
// import '@/permission'
import routes from './routes'
import 'font-awesome/css/font-awesome.min.css'
import copyPlan from './components/copyPlan.vue'
import './components/index'
import creativePublicActions from './utils/creativePublicAction.js'
Vue.use(creativePublicActions);
// Vue.use(copyPlan)
Vue.component('copy-plan', copyPlan) //初始化组件

// 初始化创意弹窗
import showCreat from './components/showCreat.vue'
Vue.use(showCreat)
Vue.component('show-creat', showCreat) //初始化组件
Vue.use(ElementUI)
Vue.use(VueRouter)
var moment = require('moment')
moment().format('LL')
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    removeToken('token')
  }
  //   let user = sessionStorage.getItem('user');
  let token = getToken('token')

  if (!token && to.path != '/login') {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
