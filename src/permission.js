import router from '@/router'
import Store from '@/store'
import 'nprogress/nprogress.css'
import nprogress from 'nprogress'

const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  nprogress.start()
  if (Store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!Store.getters.userId) {
        await Store.dispatch('user/getUserinfo')
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
  nprogress.done()
})
