import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getUserinfo() {
  return request.post('/sys/profile')
}

export function getUserAvatarById(id) {
  return request.get(`/sys/user/${id}`)
}

export function logout() {
}
