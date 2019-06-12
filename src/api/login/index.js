
import Vue from 'vue'

export function GetLogininfo(param){
    return Vue.prototype.getAxios('GQT/CorrespondenceSettingsApi/GetLogininfo',param)
    
    
}
