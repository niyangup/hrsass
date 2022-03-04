import Layout from '@/layout'
import social from '@/views/social'

export default {
  path: '/social',
  name: 'social',
  component: Layout,
  children: [{
    path: '',
    component: social,
    meta: {
      title: '社保',
      icon: 'table'
    }
  }]
}
