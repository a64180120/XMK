
import { setStore, getStore, removeStore } from '@/utils/storage'

const authToken = {
    //TokenKey
    TokenKey: 'getToken',
    //用户缓存信息
    userinfo:'userinfo',

    /*******************Token************************** */
    // 获取Token
    getToken: function() {
        return  getStore({ name: this.TokenKey})
    },

    // 设置Token
    setToken: function(token){
        if(token){ removeStore({ name: this.TokenKey });}
        setStore({ name: this.TokenKey,content: token})
    },

    // 移除Token
    removeToken: function(){
        removeStore({ name: this.TokenKey })
    },

     /*******************UserInInfo 用户信息缓存************************** */

    // 获取用户缓存信息
    getUserInfoData: function() {
        return  getStore({ name: this.userinfo})
    },

    // 设置用户缓存信息
    setUserInfoData: function(data){
        if(data){ removeStore({ name: this.userinfo});}
        setStore({ name: this.userinfo,content: data})
    },

    // 移除用户缓存信息
    removeUserInfoData: function(){
        removeStore({ name: this.userinfo})
    }

}

export default authToken
