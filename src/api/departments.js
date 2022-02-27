import request from '@/utils/request'

export function getDepartments() {
  return request.get('/company/department')
}
