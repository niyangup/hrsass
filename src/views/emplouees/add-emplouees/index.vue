<template>

  <el-dialog :visible="showDialog" title="新增员工" @close="onCancel">
    <el-form ref="add" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width: 50%" placeholder="请输入姓名"/>
      </el-form-item>

      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width: 50%" placeholder="请输入手机号"/>
      </el-form-item>

      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width: 50%" placeholder="请选择入职时间"/>
      </el-form-item>

      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width: 50%" placeholder="请输入聘用形式">
          <el-option v-for="item in employEnum" :key="item.id" :value="item.id" :label="item.value"/>
        </el-select>
      </el-form-item>

      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width: 50%" placeholder="请输入工号"/>
      </el-form-item>

      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model="formData.departmentName"
          style="width: 50%"
          placeholder="请选择部门"
          @focus="fetchDepts"
        />
        <el-tree
          v-if="showTree"
          v-loading="loading"
          :data="treeData"
          :props="{label:'name'}"
          :default-expand-all="true"
          @node-click="selectNode"
        />
      </el-form-item>

      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 50%"
          placeholder="请选择转正时间"
        />
      </el-form-item>

    </el-form>
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-button size="small" @click="onCancel">取消</el-button>
        <el-button size="small" type="primary" @click="onConfirm">确定</el-button>
      </el-row>
    </template>
  </el-dialog>

</template>

<script>

import { getDepartments } from '@/api/departments'
import { transListToTreeData } from '@/utils'
import Employees from '@/api/constant/employees'
import { addEmployee } from '@/api/employees'

export default {
  name: 'AddEmployees',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, {
          min: 1, max: 4, message: '用户姓名为1-4位'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
        }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      treeData: [],
      showTree: false,
      loading: false,
      employEnum: Employees.hireType
    }
  },
  methods: {
    async fetchDepts() {
      this.showTree = true
      this.loading = true
      const { depts } = await getDepartments()
      this.treeData = transListToTreeData(depts, '')
      this.loading = false
    },
    selectNode(node) {
      this.formData.departmentName = node.name
      this.showTree = false
    },
    onCancel() {
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.add.resetFields()
      this.$emit('update:showDialog', false)
    },
    async onConfirm() {
      try {
        console.log(this.$parent)
        await this.$refs.add.validate()
        await addEmployee(this.formData)
        this.$parent.getEmployeeList()
        this.$parent.showDialog = false
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
