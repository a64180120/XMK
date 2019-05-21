import xmMessage from "./message.vue"
 
const message={
    install:function(Vue){
        Vue.component('xmMessage',xmMessage)
    }
}
export default message