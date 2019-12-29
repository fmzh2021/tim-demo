/**
 * 实现v-message指令，用于信息模板转换
 */
const message = {
  bind(el, binding) {
    el.innerHTML = window.FormatMessage && window.FormatMessage.format(binding.value)
  }
}

const install = function(Vue) {
  Vue.directive('message', message)
}

if (window.Vue) {
  window['message'] = message
  window.Vue.use(install)
}

message.install = install
export default message
