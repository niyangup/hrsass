import Layout from '@/layout'
import emplouees from '@/views/emplouees'
import Detail from '@/views/emplouees/detail'

export default {
  path: '/employees',
  // name: 'employees',
  component: Layout,
  children: [{
    path: '',
    component: emplouees,
    meta: {
      title: '员工管理',
      icon: 'people'
    }
  }, {
    path: 'detail/:id',
    component: Detail,
    meta: {
      title: '员工详情'
    },
    hidden: true
  }]

}
