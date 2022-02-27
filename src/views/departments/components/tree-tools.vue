<template>
  <el-row type="flex" align="middle" style="width: 100%">
    <el-col>{{ treeNode.name }}</el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="handleClickItem">
            <span>
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { deleteDepartmentsById } from '@/api/departments'

export default {
  name: 'TreeTools',
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClickItem(type) {
      if (type === 'add') {
        console.log('add')
      } else if (type === 'edit') {
        console.log('edit')
      } else {
        this.$confirm('确定要删除该组织部门吗')
          .then(value => {
            return deleteDepartmentsById(this.treeNode.id)
          }).then(value => {
            this.$emit('onDelete')
            this.$message.success('删除部门成功')
          })
      }
    }
  }
}
</script>

<style scoped>

</style>
