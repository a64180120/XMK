import Vue from 'vue'
//进度控制列表
export function PorcessList (param) {
  return Vue.prototype.getAxios('/GYS/BudgetProcessCtrl/GetBudgetProcessCtrlPorcessList', param)
}

//获取组织
export function DistinctList (param) {
  return Vue.prototype.getAxios('/GYS/BudgetProcessCtrl/GetBudgetProcessCtrlDistinctList', param)
}

//批量设置

export function ProcessCtrl (param) {
  return Vue.prototype.postAxios('/GYS/BudgetProcessCtrl/PostSaveBudgetProcessTime ', param)
}