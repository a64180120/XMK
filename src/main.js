// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import './assets/css/base.scss'
import './assets/css/table.scss'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import filter from './filter'
import directive from './directive'
import 'babel-polyfill'
import ajax from './utils/ajax'
import axios from './utils/axios_new'
// import xmMessage from '@/components/message'
import MessageBox from './components/messageDialog'
import '@/assets/css/font/index.less'
import Print from '@/plugins/printJS/print' //打印
Vue.config.productionTip = false

//完整引入element-ui
Vue.use(ElementUI)
Vue.use(ajax)
// Vue.use(xmMessage)
Vue.use(MessageBox)
// 注册组件到Vue
Vue.prototype.$axios = axios
// 注册打印
Vue.use(Print)

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
