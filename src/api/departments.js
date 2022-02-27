import request from '@/utils/request'

export function getDepartments() {
  return request.get('/company/department')
}

export function deleteDepartmentsById(id) {
  return request.delete(`/company/department/${id}`)
}

export function addDept(data) {
  return request.post('/company/department', data)
}

export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}

export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
