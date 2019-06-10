
import Vue from 'vue'

export function GetSysSetList(param){
    return Vue.prototype.getAxios('GQT/QTSysSetApi/GetSysSetList',param)
}

export function dictionarySave(param){
    return Vue.prototype.postAxios('GQT/QTSysSetApi/PostSave',param)
}



export function PostSavePayPsd(param){  //设置支付口令
    return Vue.prototype.postAxios('GQT/QTSysSetApi/PostSavePayPsd',param)
}