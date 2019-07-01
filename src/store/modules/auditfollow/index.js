import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  auditfollow:false
}

const mutations= {
  setAuditfollow(state,data){
    state.auditfollow = data
  }
};

export default {
  state,
  mutations
}
