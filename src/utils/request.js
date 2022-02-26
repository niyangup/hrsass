import axios from 'axios'
import { Message } from 'element-ui'
import Store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(request => {
  if (Store.getters.token) {
    request.headers['Authorization'] = `Bearer ${Store.getters.token}`
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
  Message.error(error.message)
  return Promise.reject(error)
})

export default service
