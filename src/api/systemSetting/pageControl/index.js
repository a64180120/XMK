
import Vue from 'vue'


//获取页面控制数据
export function GetAllWorkFlows (param) {
  return Vue.prototype.getAxios('GQT/QTSysSetApi/GetAllWorkFlows', param)
}


//获取页面控制数据
export function UpdateSetWorkFlowForOrgs (param) {
  return Vue.prototype.postAxios('GQT/QTSysSetApi/UpdateSetWorkFlowForOrgs', param)
}