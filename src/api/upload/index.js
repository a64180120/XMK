
import Vue from 'vue'

export function testUpload(param){
    return Vue.prototype.formAxios('/PVoucherMst/PostUploadFile',param)

}
