<template>
  <el-dialog :visible="isShow" :title="title" @close="closeDialog">
    <el-form ref="deptForm" label-width="120px" :model="formData" :rules="rules">

      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width: 80%" placeholder="1-50个字符"/>
      </el-form-item>

      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width: 80%" placeholder="1-50个字符"/>
      </el-form-item>

      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username"/>
        </el-select>
      </el-form-item>

      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width: 80%" placeholder="1-300个字符" type="textarea" :rows="3"/>
      </el-form-item>

    </el-form>
    <template v-slot:footer>
      <el-button size="small" @click="closeDialog">取消</el-button>
      <el-button size="small" type="primary" @click="handleSubmit">确定</el-button>
    </template>

  </el-dialog>

</template>>

<script>
import { addDept, getDepartDetail, getDepartments, updateDepartments } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'

export default {
  name: 'AddDept',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    const checkDeptName = async(r, v, callback) => {
      let exist = false
      const { depts } = await getDepartments()
      if (this.formData.id) {
        exist = depts.filter(item => item.id !== this.formData.id && item.pid === this.treeNode.pid).some(item => item.name === v)
      } else {
        exist = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === v)
      }
      exist ? callback(new Error(`同级部门下已经存在${v}了`)) : callback()
    }

    const checkDeptCode = async(r, v, callback) => {
      const { depts } = await getDepartments()
      let exist = false
      if (this.formData.id) {
        exist = depts.some(item => item.id !== this.formData.id && item.code === v && v)
      } else {
        exist = depts.some(item => item.code === v && v)
      }
      exist ? callback(new Error(`有部门下已经存在${v}了`)) : callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 50, message: '长度为1-50个123' },
          { trigger: 'blur', validator: checkDeptName }
        ],
        code: [{ required: true, message: '请输入部门编码', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 50, message: '长度为1-50个' },
          { trigger: 'blur', validator: checkDeptCode }
        ],
        manager: [{ required: true, message: '请输入负责人', trigger: 'blur' }],
        introduce: [{ required: true, message: '请输入介绍', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 50, message: '长度为1-300个' }]
      },
      peoples: []
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑部门' : '新增子部门'
    }
  },
  methods: {
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
    },
    closeDialog() {
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      this.$refs.deptForm.resetFields()
      this.$emit('update:isShow', false)
    },
    handleSubmit() {
      this.$refs.deptForm.validate(async(isSuccess) => {
        if (isSuccess) {
          if (this.formData.id) {
            await updateDepartments(this.formData)
          } else {
            await addDept({ ...this.formData, pid: this.treeNode.id })
          }
          this.$emit('onAdd')
          this.closeDialog()
        }
      })
    },
    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id)
    }
  }
}
</script>

<style scoped>

</style>
