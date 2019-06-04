
import Vue from 'vue'

export function PostAddProcType(param){
    return Vue.prototype.postAxios('GSP/GAppvalProc/PostAddProcType',param)
}

export function GetProcTypes(param){
    return Vue.prototype.getAxios('GSP/GAppvalProc/GetProcTypes',param)
}

export function PostUpdateProcType(param){
    return Vue.prototype.postAxios('GSP/GAppvalProc/PostUpdateProcType',param)
}

export function PostDeleteProcType(param){
    return Vue.prototype.postAxios('GSP/GAppvalProc/PostDeleteProcType',param)
}
