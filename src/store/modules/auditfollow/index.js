import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  auditfollow:false,
  openfollow:false
}

const mutations= {
  setAuditfollow(state,data){
    state.auditfollow = data
    // console.log('+++++++++',data)
  },
  setOpenfollow(state,data){
    state.openfollow = data
  }

};

export default {
  state,
  mutations
}
