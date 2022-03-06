import VueI18n from 'vue-i18n'
import Vue from 'vue'
import Cookies from 'js-cookie'
import elementZH from 'element-ui/lib/locale/lang/zh-CN'
import elementEN from 'element-ui/lib/locale/lang/en'

Vue.use(VueI18n)

export default new VueI18n({
  locale: Cookies.get('language') || 'zh',
  messages: {
    zh: {
      ...elementZH
    },
    en: {
      ...elementEN
    }
  }
})
