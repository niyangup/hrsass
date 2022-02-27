import Layout from '@/layout'
import attendances from '@/views/attendances'

export default {
  path: '/attendances',
  // name: 'attendances',
  component: Layout,
  children: [{
    path: '',
    component: attendances,
    meta: {
      title: '考勤',
      icon: 'skill'
    }
  }]
}
