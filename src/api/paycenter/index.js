import Vue from 'vue'
// 支付单详情
export function getPayment(param) {
  return Vue.prototype.getAxios('GGK/GKPaymentMstApi/GetPayment4Zjbf', param)
}
/*
"uid": 521180820000001,     //用户id
"orgid": 547181121000001,   //组织id
"ryear": '2019',               //年度
"infoData": {Mst,Dtls}
OLD_MST_PHID 原支付单主表phid
OLD_DTL_PHID 原支付单明细表主键
*/
// 生成新的支付单
export function postAddPayList(param) {
  return Vue.prototype.postAxios('GGK/GKPaymentMstApi/PostAdd', param)
}

// 支付单保存
export function savePayList(param) {
  return Vue.prototype.postAxios('GGK/GKPaymentMstApi/PostUpdate', param)
}
/*
uid: '631181115000001',
orgid: '547181121000001',
infoData: ids, 支付单主表phid'[481190605000001,481190605000002]'
value: 1 状态
*/
// 批量更新支付单支付状态
export function postUpdatePaymentsState(param) {
  return Vue.prototype.postAxios(
    'GGK/GKPaymentMstApi/PostUpdatePaymentsState',
    param
  )
}

// 刷新并获取支付单支付状态-单笔
export function postRefreshPaymentState(param) {
  return Vue.prototype.postAxios(
    'GGK/GKPaymentMstApi/PostRefreshPaymentState',
    param
  )
}

// 刷新并获取支付单支付状态-多笔
export function postRefreshPaymentsState(param) {
  return Vue.prototype.postAxios(
    'GGK/GKPaymentMstApi/PostRefreshPaymentsState',
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

//获得银行服务状态
export function getBankServiceState(param) {
  return Vue.prototype.getAxios(
    'GGK/GKPaymentMstApi/GetBankServiceState',
    param
  )
}

// 支付单单笔支付
export function postSubmitPayment(param) {
  return Vue.prototype.postAxios('GGK/GKPaymentMstApi/PostSubmitPayment', param)
}

// 支付多笔支付
export function postSubmitPayments(param) {
  return Vue.prototype.postAxios(
    'GGK/GKPaymentMstApi/PostSubmitPayments',
    param
  )
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
PhId：审批流程的phid
*/
// 根据审批流程id，获取第一个审批岗位的审批人
export function GetFirstStepOperator(param) {
  return Vue.prototype.getAxios('GGK/GAppvalPost/GetFirstStepOperator', param)
}

/*
PhId：审批流程的phid
*/
// 根据审批流程id，获取所有审批岗位
export function GetAllPostsAndOpersByProc(param) {
  return Vue.prototype.getAxios(
    'GSP/GAppvalRecord/GetAllPostsAndOpersByProc',
    param
  )
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
  return Vue.prototype.formAxios(
    'GSP/GAppvalRecord/PostAddAppvalRecords',
    param
  )
}

// 检查用户是否启用支付加密狗
export function PostPayUsbKeyIsActive(param) {
  return Vue.prototype.postAxios('GQT/QTSysSetApi/PostPayUsbKeyIsActive', param)
}

// 读取加密狗
import md5 from 'js-md5'
export function SearchUSB() {
  var seedCode,
    retuCode,
    usbType,
    icCardNo,
    strMsg = '',
    Status = 'error'
  if (navigator.userAgent.indexOf('Trident') == -1) {
    strMsg = '请使用IE浏览器或者360浏览器兼容模式进行支付！'
    return { Msg: strMsg, Status: Status }
  }
  //document.all("AF").run("LForm","1","");
  usbType = 0 //document.all["hd_HardWareType"].value;	//得到硬件加密方式
  if (usbType == '0') {
    seedCode = 13858029
    try {
      retuCode = document.all('USBVal').init(seedCode) //chrome不支持init方法
    } catch (e) {
      retuCode = -1
    }
    switch (retuCode) {
      case 1:
        strMsg = '加密锁驱动程序未安装'
        break
      case 2:
        strMsg = '加密锁I/O错误'
        break
      case 3:
        strMsg = '未插有加密锁'
      case 4:
        strMsg = '插有多把加密锁'
        break
      case -1:
        strMsg = '加密锁读取失败'
        break
    }
  } else {
    icCardNo = document.all('USBVal').jl(3)
    if (icCardNo == '0') {
      strMsg = document.all('USBVal').getlasterror()
    }
  }
  // retucode获取失败，strMsg保存错误信息
  if (strMsg) {
    return { Msg: strMsg, Status: Status }
  }
  // 获取userId并加密
  try {
    //document.all["hd_IsExistUSB"].value = strMsg;
    // document.all["hd_IsExistUSB"].setAttribute("value", strMsg);
    var userId = document.all('USBVal').getuid()
    //document.all["hd_UserID"].value = userId;
    //document.all["hd_UserID"].setAttribute("value", userId);
    var secCode
    //var secCode = document.all("USBVal").getcode();
    //document.all["TB_SecCode"].value = secCode;
    //document.all["TB_SecCode"].setAttribute("value",secCode);
    secCode = document.all('USBVal').getcode() //secCode好像没用
    console.log(userId)
    var md5ID = md5(userId)
    Status = 'Success'
    return { Status: Status, id: md5ID }
    console.log(userId + ', ' + secCode + ', Md5LockId=' + md5ID)
  } catch (e) {
    // secCode = 'error'
    return { Status: Status, Msg: e }
    console.log(secCode + e)
  }
  //if (secCode != "error") {
  //    document.all["TB_SecCode"].value = secCode;
  //    document.all["TB_SecCode"].setAttribute("value", secCode);
  //}
}
