// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import './assets/css/base.scss'
import './assets/css/table.scss'
import router from './router'
import store from './store'
import filter from './filter'
import directive from './directive'
import 'babel-polyfill'
import ajax from './utils/ajax'
import axios from './utils/axios_new'
import xmMessage from "@/components/message"

Vue.config.productionTip = false

//完整引入element-ui
Vue.use(ElementUI)
Vue.use(ajax);
Vue.use(xmMessage)
// 注册组件到Vue
Vue.prototype.$axios = axios

// 注入到根实例中
/* eslint-disable no-new */
new Vue({
  axios,
  router,
  store,
  filter,
  directive,
  render: h => h(App)
}).$mount('#app')
