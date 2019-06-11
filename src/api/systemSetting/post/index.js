
import Vue from 'vue'

export function GetAppvalPostOpersList(param){
    return Vue.prototype.getAxios('GSP/GAppvalPost/GetAppvalPostOpersList',param)
}

export function GetAppvalPostOpers(param){
    return Vue.prototype.getAxios('GSP/GAppvalPost/GetAppvalPostOpers',param)
}

export function PostAdd(param){
    return Vue.prototype.postAxios('GSP/GAppvalPost/PostAdd',param)
}

export function PostUpdate(param){
    return Vue.prototype.postAxios('GSP/GAppvalPost/PostUpdate',param)
}
export function PostDelete(param){
    return Vue.prototype.postAxios('GSP/GAppvalPost/PostDelete',param)
}
//获取组织
export function GetAllChildTree(param){
    return Vue.prototype.getAxios('GQT/CorrespondenceSettingsApi/GetAllChildTree',param)
}

//获取操作员
export function getUserByOrg(param){
    return Vue.prototype.getAxios('GQT/CorrespondenceSettingsApi/getUserByOrg',param)
}
