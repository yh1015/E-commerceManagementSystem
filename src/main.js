import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import TreeTable from 'vue-table-with-tree-grid'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.component('tree-table',TreeTable)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
