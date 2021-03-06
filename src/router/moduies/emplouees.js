import Layout from '@/layout'
import emplouees from '@/views/emplouees'
import Detail from '@/views/emplouees/detail'
import Print from '@/views/emplouees/print'

export default {
  path: '/employees',
  name: 'employees',
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
  }, {
    path: 'print/:id',
    component: Print,
    meta: {
      title: '员工打印'
    },
    hidden: true
  }
  ]
}
