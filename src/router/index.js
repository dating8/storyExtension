import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'views/recommend/index'
import Detail from 'views/recommend/detail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/index',
      component: Recommend,
      meta: { keepAlive: true }
    },
    {
      path: '/detail/:id',
      component: Detail,
      meta: { keepAlive: true }
    }
  ]
})
