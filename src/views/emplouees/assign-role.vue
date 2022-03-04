<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="onCancel">

    <template>
      <el-checkbox-group v-model="roleIds">
        <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
    </template>

    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-button size="small" @click="onCancel">取消</el-button>
        <el-button size="small" type="primary" @click="onConfirm">确定</el-button>
      </el-row>
    </template>
  </el-dialog>
</template>
<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'

export default {
  name: 'AssignRole',
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      roleIds: []
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows } = await getRoleList({ page: 1, pageSize: 20 })
      this.list = rows
    },
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      this.roleIds = roleIds
    },
    onCancel() {
      this.roleIds = []
      this.$emit('update:showRoleDialog', false)
    },
    async onConfirm() {
      await assignRoles({ id: this.userId, roleIds: this.roleIds })
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>

<style scoped>

</style>
