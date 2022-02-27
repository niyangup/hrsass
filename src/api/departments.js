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
