import Layout from '@/layout'
import Approvals from '@/views/approvals'

export default {
  path: '/approvals',
  // name: 'approvals',
  component: Layout,
  children: [{
    path: '',
    component: Approvals,
    meta: {
      title: '审批',
      icon: 'tree-table'
    }
  }]
}
