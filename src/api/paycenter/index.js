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

/*
Orgid：组织id
BType：单据类型（"001":资金拨付单,"002":支付单）
*/
// 获取审批流程列表
export function getAppvalProc(param) {
  return Vue.prototype.getAxios('GGK/GAppvalProc/GetAppvalProc', param)
}

/*
RefbillPhid：单据id
ProcPhid：审批流程id
FBilltype：单据类型（"001":资金拨付单,"002":支付单）
*/
// 获取审批记录
export function getAppvalRecord(param) {
  return Vue.prototype.getAxios('GGK/GAppvalRecord/GetAppvalRecord', param)
}

/*
RefbillPhid: '10', （单据主键）
FBilltype: '002', （单据类型）
ProcPhid: '1',  （流程主键）
PostPhid: '1',  （岗位主键）
NextOperators: ['1'], （下个岗位操作员主键集合）
FSeq: '', （序号）
FSendDate: '', （送审时间）
FApproval: '1', （审批状态）
FOpinion: 'FFFF', （备注）
*/
// 送审
export function postAddAppvalRecord(param) {
  return Vue.prototype.postAxios('GBK/GAppvalRecord/PostAddAppvalRecord', param)
}
