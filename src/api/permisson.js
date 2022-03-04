import request from '@/utils/request'

export function getPermissionList(params) {
  return request({
    url: '/sys/permission',
    params
  })
}

export function addPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}

export function updatePermission(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'put',
    data
  })
}

export function delPermission(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'delete'
  })
}

export function getPermissionDetail(id) {
  return request({
    url: `/sys/permission/${id}`
  })
}

