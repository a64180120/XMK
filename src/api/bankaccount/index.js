import Vue from 'vue'

export function BankAccountList(param){
    return new Promise((resolve,reject)=>{
        Vue.prototype.getAxios('GQT/BankAccountApi/GetBankAccountList',param).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
    
}

export function BankAccountSave(param){
    return new Promise((resolve,reject)=>{
        Vue.prototype.postAxios('GQT/BankAccountApi/PostSave',param).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
    
}