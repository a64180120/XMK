import Vue from 'vue'
import VueRouter from 'vue-router'
import staticRoute from "@/router/staticRoute"
import store from "../store"
import session from "@/utils/session";



Vue.use(VueRouter)

const vuerouters = new VueRouter({
  mode: 'hash',
  routes: staticRoute
});

// 路由跳转前验证(全局守卫)
vuerouters.beforeEach((to, from, next) => {
  next();
});

vuerouters.afterEach(() => {

});

export default vuerouters;
