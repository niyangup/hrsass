<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template v-slot:after>
          <el-button type="primary" size="small">添加权限</el-button>
        </template>
      </page-tools>

      <el-table border :data="list" row-key="id">
        <el-table-column align="left" label="名称" prop="name"/>
        <el-table-column align="center" label="标识" prop="code"/>
        <el-table-column align="center" label="描述" prop="description"/>
        <el-table-column align="center" label="操作">
          <template v-slot="{row}">
            <el-button type="text" v-if="row.type===1">添加</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permisson'
import { transListToTreeData } from '@/utils'

export default {
  name: 'Permission',
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      this.list = transListToTreeData(await getPermissionList(), '0')
    }
  }
}
</script>

<style scoped>

</style>
