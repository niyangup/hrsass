import Layout from '@/layout'
import settings from '@/views/settings'

export default {
  path: '/settings',
  // name: 'settings',
  component: Layout,
  children: [{
    path: '',
    component: settings,
    meta: {
      title: '设置',
      icon: 'setting'
    }
  }]

}
