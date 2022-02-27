import Layout from '@/layout'
import permission from '@/views/permission'

export default {
  path: '/permission',
  // name: 'permission',
  component: Layout,
  children: [{
    path: '',
    component: permission,
    meta: {
      title: '权限',
      icon: 'lock'
    }
  }]

}
