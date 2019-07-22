import Session from "@/utils/session";
import Vue from 'vue'

//状态
const state = {
  navactive: {
    url: '/setting/audit',
    index: 0
  }
};



//操作state(同步)
const mutations = {

  //修改年度
  setNavIndex (state, data) {
    state.navactive = data
  }
};

//执行一些方法(异步)
const actions = {

};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
