import Session from "@/utils/session";
import Vue from 'vue'

//状态
const state = {
    //签名
    token: "",
    //用户id
    userid: "",
    //用户名称
    username: "",
    //组织列表
    orglist:[]
};

//计算获取取新数据
const getters = {
    getToken: function (state) {
        return state.token
    }
};

//操作state(同步)
const mutations = {
    //token
    setToken: (state, data) => {
        if (data) {
            state.token = data.token;
            //缓存token信息
            Session.setToken(data);
        } else {
            //删除缓存信息
            state.token='';
            Session.removeToken();
        }
    },
    //组织列表
    setOrglist(state,data){
        state.orglist=data;
    }
};

//执行一些方法(异步)
const actions = {
    // 获取Token
    getToken({ commit, state }) {
        return new Promise((resolve, reject) => {

            // Vue.prototype.getAxios('/Token/GetToken',{ sysno:'N3App'},true)
            // .then(res => {
            //     if (res.Status === "success") {
            //         //缓存token信息
            //         var response=res.Data;
            //         var object = {
            //             token: response.SignToken,
            //             year:response.Year,
            //             account:response.Account,
            //         };
            //         //用户信息缓存
            //         commit("setToken", object);
            //     }
            //     resolve(res);
            // }).catch(error =>{
            //     console.log(error)
            //     reject(error)
            // });
        });
    },
    // 退出
    logout({state, commit,dispatch }) {

        return new Promise(resolve => {
            //清除缓存
            commit("setToken", "");

            //修改登录状态
            //若需要在全局命名空间内分发 action 或提交 mutation，将 { root: true } 作为第三参数传给 dispatch 或 commit 即可
            dispatch('actionIsLogin',false,{root: true})

            resolve();
        });
    },

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
