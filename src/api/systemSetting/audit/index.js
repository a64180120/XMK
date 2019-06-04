
import Vue from 'vue'
//审批类型
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


//审批流程
export function PostAddProc(param){
    return Vue.prototype.postAxios('GSP/GAppvalProc/PostAddProc',param)
}

export function GetProcList(param){
    return Vue.prototype.getAxios('GSP/GAppvalProc/GetProcList',param)
}
