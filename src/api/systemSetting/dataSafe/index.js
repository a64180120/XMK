
import Vue from 'vue'

export function GetSysSetList (param) {
  return Vue.prototype.getAxios('GQT/QTSysSetApi/GetSysSetList', param)
}

export function dictionarySave (param) {
  return Vue.prototype.postAxios('GQT/QTSysSetApi/PostSave', param)
}



export function PostSavePayPsd (param) {  //设置支付口令
  return Vue.prototype.postAxios('GQT/QTSysSetApi/PostSavePayPsd', param)
}


export function PostPayPsdIsactive (param) {  //设置支付口令
  return Vue.prototype.postAxios('GQT/QTSysSetApi/PostPayPsdIsactive', param)
}

export function GetPayPsd (param) {  //获取支付口令
  return Vue.prototype.getAxios('GQT/QTSysSetApi/GetPayPsd', param)
}
//获取绩效类型数型结构
export function GetTargetTypeTree (param) {
  return Vue.prototype.getAxios('GQT/QTSysSetApi/GetTargetTypeTree', param)
}
//根据指标类型获取指标明细
export function GetPerformEvalTargets (param) {
  return Vue.prototype.getAxios('GQT/QTSysSetApi/GetPerformEvalTargets', param)
}
//保存指标种类信息
export function PostUpdateTargetType (param) {
  return Vue.prototype.postAxios('GQT/QTSysSetApi/PostUpdateTargetType', param)
}
//修改指标明细信息
export function PostUpdateTargets (param) {
  return Vue.prototype.postAxios('GQT/QTSysSetApi/PostUpdateTargets', param)
}

//获取绩效基本数据
export function GetPerformEvals (param) {
  return Vue.prototype.getAxios('GQT/QTSysSetApi/GetPerformEvals', param)
}

//保存绩效基本数据
export function UpdatePerformEvals (param) {
  return Vue.prototype.postAxios('GQT/QTSysSetApi/PostUpdatePerformEvals', param)
}