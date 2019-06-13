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

function getUserInfo(){ //获取url传参

  let index = window.location.href.indexOf('?');
  let ind= window.location.href.indexOf('#');
  let info=window.location.href.slice(index+1).slice(0,ind-index-1).split('&');
  let data={}
  for(let i of info){
    let arr= i.split('=');
    
    data[arr[0]]=arr[1];
  }      
  store.commit('user/setAppinfo',data);
}

// 路由跳转前验证(全局守卫)
vuerouters.beforeEach((to, from, next) => {
  if(from.meta=={}){  //如果是从i8那边过来的
    getUserInfo();
  }
  next();
});

vuerouters.afterEach(() => {

});

export default vuerouters;
