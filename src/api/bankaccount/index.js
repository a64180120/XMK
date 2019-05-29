import Vue from 'vue'

export function BankAccountList(param){
    console.log('bank',Vue.prototype.getAxios)
    Vue.prototype.getAxios('GQT/BankAccountApi/GetBankAccountList',param).then(res=>{
        resolve(res)
    }).catch(err=>{
        reject(err)
    })
}