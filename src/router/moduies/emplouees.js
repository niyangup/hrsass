import Layout from '@/layout'
import emplouees from '@/views/emplouees'

export default {
  path: '/employees',
  // name: 'employees',
  component: Layout,
  children: [{
    path: '',
    component: emplouees,
    meta: {
      title: '员工管理'
    }
  }]

}
