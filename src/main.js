import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons'
import '@/permission'

import * as directives from './directives'
import Components from '@/components'
import * as filters from './filters'

for (const key in directives) {
  Vue.directive(key, directives[key])
}
for (const key in filters) {
  Vue.filter(key, filters[key])
}

Vue.use(ElementUI, { locale })
Vue.use(Components)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
