import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import TreeTable from 'vue-table-with-tree-grid'
import Breadcrumb from "components/common/breadcrumb/Breadcrumb"
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 打入富文本样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(VueQuillEditor)

Vue.component('tree-table',TreeTable)
// 将面包屑注册为全局组件
Vue.component('breadcrumb',Breadcrumb)
// 定义全局过滤器
Vue.filter('dataFormat',function(originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2,'0')
  const d = (dt.getDate() + '').padStart(2,'0')
  const hh = (dt.getHours() + '').padStart(2,'0')
  const mm = (dt.getMinutes() + '').padStart(2,'0')
  const ss = (dt.getSeconds() + '').padStart(2,'0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
