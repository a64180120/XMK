
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
export function PostAddProc(param){  //新增
    return Vue.prototype.postAxios('GSP/GAppvalProc/PostAddProc',param)
}

export function PostUpdateProc(param){//修改
    return Vue.prototype.postAxios('GSP/GAppvalProc/PostUpdateProc',param)
}
export function GetProcList(param){//获取列表
    return Vue.prototype.getAxios('GSP/GAppvalProc/GetProcList',param)
}


export function GetProcDetail(param){ //获取详情
    return Vue.prototype.getAxios('GSP/GAppvalProc/GetProcDetail',param)
}


export function GetAppvalPostList(param){ //获取岗位人员列表
    return Vue.prototype.getAxios('GSP/GAppvalPost/GetAppvalPostList',param)
}

export function PostDeleteProcs(param){  //删除
    return Vue.prototype.postAxios('GSP/GAppvalProc/PostDeleteProcs',param)
}

export function PostUpdateProcOrganize(param){  //更新启用组织
    return Vue.prototype.postAxios('GSP/GAppvalProc/PostUpdateProcOrganize',param)
}


