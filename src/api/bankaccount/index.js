import Vue from 'vue'

export function BankAccountList(param){
    return  Vue.prototype.getAxios('GQT/BankAccountApi/GetBankAccountList',param)
}

export function BankAccountSave(param){
    return Vue.prototype.postAxios('GQT/BankAccountApi/PostSave',param)   
}

export function BankAccountDelete(param){
    return Vue.prototype.postAxios('/GQT/BankAccountApi/PostDelete',param)
}