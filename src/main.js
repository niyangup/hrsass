import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import i18n from './lang'
import '@/icons'
import '@/permission'

import * as directives from './directives'
import Components from '@/components'
import * as filters from './filters'
import Print from 'vue-print-nb'

for (const key in directives) {
  Vue.directive(key, directives[key])
}
for (const key in filters) {
  Vue.filter(key, filters[key])
}

Vue.use(Print)
Vue.use(Components)
Vue.use(ElementUI, {
  i18n: (key, value) => {
    return i18n.t(key, value)
  }
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
