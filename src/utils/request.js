import axios from 'axios'
import { Message } from 'element-ui'
import Store from '@/store'
import { getTimeStamp } from '@/utils/auth'
import Router from '@/router'

const timeOut = 1000 * 60 * 60
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(request => {
  if (Store.getters.token) {
    if (checkTimeStamp()) {
      Store.dispatch('user/logout').then(null)
      Router.push('/login')
      return Promise.reject(new Error('token失效'))
    } else {
      request.headers['Authorization'] = `Bearer ${Store.getters.token}`
    }
  }
  return request
}, error => {
  return Promise.reject(error)
})
service.interceptors.response.use(response => {
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  if (error && error.response && error.response.data && error.response.data.code === 10002) {
    Store.dispatch('user/logout').then(null)
    Router.push('/login')
  } else {
    Message.error(error.message)
  }

  return Promise.reject(error)
})

function checkTimeStamp() {
  const now = Date.now()
  const endTime = now - timeOut
  return endTime > getTimeStamp()
}

export default service
