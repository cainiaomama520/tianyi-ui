import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const constantRouterMap = [{
  path: '/login',
  component: () => import('../views/Login'),
  hidden: true
},
{
  path: "/admin",
  component: () => import("@/views/Home.vue"),
  meta: {
    title: "菜单"
  }
}
]
let router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
export default router
