// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import store from './store'
import filters from './common/filters/filters'
import 'common/stylus/index.styl'
Vue.use(VueLazyLoad, {
  loading: require('./common/image/loading.png')
})
for (let key in filters) {
  Vue.filter(key, filters[key])
}
fastclick.attach(document.body)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
