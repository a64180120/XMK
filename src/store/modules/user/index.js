import Session from "@/utils/session";
import Vue from 'vue'

//状态
const state = {
    //签名
    token: "",
    //用户id
    userid: "488181024000001",
    //用户code
    usercode:'9999',
    //用户名称
    username: "",
    //组织列表
    orglist:[],
    //当前选中组织
    orgid:'', //id
    orgcode:'', //编码
    orgname:'',//名称
    /*当前选中部门*/
    bmid:'',
    bmcode:'',
    bmname:'',
    year:'',//年份
    appinfo:{},//ajax登录信息
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
    //ajax的appinfo信息
    setAppinfo(state,data){

        state.appinfo=data;
        state.userid=data.UserId;
    },
    //组织用户的缓存信息
    setLoginInfo(state,data){
        state.userid=data.User.PhId,
        state.usercode=data.User.UserNo,
        state.username=data.User.UserName,
        state.orgid=data.Org.PhId,
        state.orgcode=data.Org.OCode,
        state.orgname=data.Org.OName
    },
    //组织列表
    setOrglist(state,data){
        state.orglist=data;
    },
    //修改当前组织
    setOrganize(state,data){
        state.orgid=data.PhId;
        state.orgcode=data.OCode;
        state.orgname=data.OName;

    },
  //修改当前部门
  setBm(state,data){
    state.bmid=data.PhId;
    state.bmcode=data.OCode;
    state.bmname=data.OName;

  },
    //修改年度
    setYear(state,data){
        state.year=data
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
