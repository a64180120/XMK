
import Vue from 'vue'

export function testUpload(param){
    return Vue.prototype.formAxios('GBK/PaymentMstApi/PostAddfj',param)
}
// 支付单送审附件
export function PostUploadFile(param){
    return Vue.prototype.formAxios('GBK/PaymentMstApi/PostUploadFile',param)
}