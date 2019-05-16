import Vue from 'vue'
import Vuex from 'vuex'
import vuexModules from './modules'  //组件 state
import createPersistedState  from 'vuex-persistedstate'

Vue.use(Vuex)


const state = {
  //登录状态的
  isLogin: false,
}

//计算获取取新数据
const getters = {
  getIsLogin: (state)=> {
    return state.isLogin
  }
}

//操作state(同步)
const mutations = {
  //登录状态
  setIsLogin(state,data) {
    state.isLogin = data
  }
}

//执行一些方法(异步)
const actions = {
  actionIsLogin({ commit },data) {
    commit('setIsLogin',data)
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: vuexModules,
  plugins: [createPersistedState({ 
    storage: window.sessionStorage 
  })] 
})
export default store