// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import './assets/css/base.scss'

import router from './router'
import store from './store'
import filter from './filter'
import directive from './directive'
import 'babel-polyfill'
import axios from './utils/ajax.js'

Vue.config.productionTip = false

//完整引入element-ui
Vue.use(ElementUI)
Vue.use(axios);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  filter,
  directive,
  render: h => h(App)
}).$mount('#app')