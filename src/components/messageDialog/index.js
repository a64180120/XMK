import messageDialog from './messageDialog.vue'
const MessageBox = {}
// vue的install方法，用于定义vue插件
MessageBox.install = function(Vue, options) {
  const MessageBoxInstance = Vue.extend(messageDialog)
  let currentMsg
  const initInstance = () => {
    // 实例化vue实例
    currentMsg = new MessageBoxInstance()
    let msgBoxEl = currentMsg.$mount().$el
    document.body.appendChild(msgBoxEl)
  }
  // 在Vue的原型上添加实例方法，以全局调用
  Vue.prototype.$msgBox = {
    show(options) {
      if (!currentMsg) {
        initInstance()
      } else {
        currentMsg.$destroy()
        console.log(currentMsg.openDialog)
        clearInterval(currentMsg.interval)
        currentMsg.interval = null
        currentMsg = new MessageBoxInstance()
        currentMsg.$mount().$el
      }
      if (typeof options === 'string') {
        currentMsg.content = options
      } else if (typeof options === 'object') {
        Object.assign(currentMsg, options)
      }
      return currentMsg.showMsgBox()
    },
  }
}
export default MessageBox
