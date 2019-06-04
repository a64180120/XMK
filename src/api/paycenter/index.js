import Vue from 'vue'
// 支付单详情
export function getPayment(param) {
  return Vue.prototype.getAxios('GGK/GKPaymentMstApi/GetPayment4Zjbf', param)
}

// 支付单保存
export function savePayList(param) {
  return Vue.prototype.postAxios('GGK/GKPaymentMstApi/PostUpdate', param)
}

// 刷新并获取支付单支付状态
export function postRefreshPaymentState(param) {
  return Vue.prototype.postAxios(
    'GGK/GKPaymentMstApi/PostRefreshPaymentState',
    param
  )
}

// 获取预算科目
export function getBudgetAccountsList(param) {
  return Vue.prototype.getAxios(
    'GQT/BudgetAccountsApi/GetBudgetAccountsList',
    param
  )
}

// 支付单单笔支付
export function postSubmitPayment(param) {
  return Vue.prototype.postAxios('GGK/GKPaymentMstApi/PostSubmitPayment', param)
}

/*
TypeCode: 操作员id,
TypeName: 操作员名称,
Orgid: 所属组织id,
Orgcode: 所属组织代码
*/
// 获取支付口令状态
export function postPayPsd(param) {
  return Vue.prototype.postAxios('GQT/QTSysSetApi/PostPayPsd', param)
}

/*
TypeCode: 操作员id,
TypeName: 操作员名称,
Orgid: 所属组织id,
Orgcode: 所属组织代码
Value: 新的支付口令;
Isactive: 是否启用 0|启用 1|停用
*/
// 设置支付口令
export function postSavePayPsd(param) {
  return Vue.prototype.postAxios('GQT/QTSysSetApi/PostSavePayPsd', param)
}

/*
TypeCode: 操作员id,
Value: 支付口令;
*/
// 判断支付口令是否正确
export function postJudgePayPsd(param) {
  return Vue.prototype.postAxios('GQT/QTSysSetApi/PostJudgePayPsd', param)
}
