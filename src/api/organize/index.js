import Vue from 'vue'
export function organizeTree(param){
    return new Promise((resolve,reject)=>{
        Vue.prototype.getAxios('/GQT/CorrespondenceSettingsApi/GetOrgTree',param).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}