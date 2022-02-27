import Layout from '@/layout'
import salarys from '@/views/salarys'

export default {
  path: '/salarys',
  // name: 'salarys',
  component: Layout,
  children: [{
    path: '',
    component: salarys,
    meta: {
      title: 'salarys'
    }
  }]

}
