import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import 'element-theme-chalk'
import 'element-ui/lib/theme-chalk/display.css'
import Debounce from './preventReClick.js'

// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
// 导入背景样式
import './assets/css/background.css'

import axios from 'axios'
// devServer 会从传递过来的 api url 的第一个字符进行匹配。如果你给api url 补上了 scheme 和 authority 的
// （如：http://127.0.0.10:3000/api/getData），是不匹配的，因为开头是http。所以如果我们需要使用 devServer.proxy 。
// 那就一定不能设置 axios 的 baseURL，或者把baseURL设为空字符串

//  配置请求的根路径
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.defaults.baseURL = 'http://127.0.0.1:3000'
Vue.prototype.$http = axios

Vue.config.productionTip = false

// 提交以后禁用按钮一段时间，防止重复提交 ,有问题影响用户体验
// Vue.directive('noMoreClick', {
//   inserted(el, binding) {
//     el.addEventListener('click', e => {
//       el.classList.add('is-disabled')
//       el.disabled = true
//       setTimeout(() => {
//         el.disabled = false
//         el.classList.remove('is-disabled')
//       }, 3000)
//     })
//   }
// })

export const debounce = (func, wait = 300) => {
  let timeout
  return function () {
    const context = this
    const args = arguments
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}

Vue.component('Debounce', Debounce)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
