<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools :tree-node="company" :is-root="true" @onAdd="addDept"/>
        <el-tree :data="departs" :props="defaultProps">
          <tree-tools slot-scope="{data}" :tree-node="data" @onAdd="addDept" @onDelete="getDepartments"/>
        </el-tree>
      </el-card>
    </div>
    <add-dept :is-show="isShow" :tree-node="node"/>
  </div>
</template>

<script>
import TreeTools from '@/views/departments/components/tree-tools'
import { getDepartments } from '@/api/departments'
import { transListToTreeData } from '@/utils'
import AddDept from '@/views/departments/components/add-dept'

export default {
  name: 'Departments',
  components: {
    AddDept,
    TreeTools
  },

  data() {
    return {
      departs: [{ name: '总裁办', manager: '1', children: [{ name: '董事会', manager: '2' }] },
        { name: '行政部', manager: '3' }, { name: '人事部', manager: '4' }],

      defaultProps: {
        label: 'name'
      },
      company: { name: '中国村开心快乐哈哈哈哈哈公司', manager: '负责人', id: '' },
      isShow: false,
      node: null
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      this.departs = transListToTreeData(result.depts, '')
    },
    addDept(node) {
      this.isShow = true
      this.node = node
    }
  }
}
</script>

<style scoped lang="scss">

.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}

</style>
