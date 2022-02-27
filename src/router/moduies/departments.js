import Layout from '@/layout'
import departments from '@/views/departments'

export default {
  path: '/departments',
  // name: 'departments',
  component: Layout,
  children: [{
    path: '',
    component: departments,
    meta: {
      title: 'departments'
    }
  }]

}
