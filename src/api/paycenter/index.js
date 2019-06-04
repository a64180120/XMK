import Vue from 'vue'
// 支付单详情
export function getPayment(param) {
  return Vue.prototype.getAxios('GGK/GKPaymentMstApi/GetPayment4Zjbf', param)
}

// 支付单保存
export function savePayList(param) {
  return Vue.prototype.postAxios('GGK/GKPaymentMstApi/PostUpdate', param)
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
