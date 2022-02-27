<template>
  <el-dialog :visible="isShow" title="新增部门">
    <el-form label-width="120px" :model="formData" :rules="rules">

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
      <el-button size="small">取消</el-button>
      <el-button size="small" type="primary">确定</el-button>
    </template>

  </el-dialog>

</template>>

<script>
import { getDepartments } from '@/api/departments'
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
      const { depts } = await getDepartments()
      const exist = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === v)
      exist ? callback(new Error(`同级部门下已经存在${v}了`)) : callback()
    }

    const checkDeptCode = async(r, v, callback) => {
      const { depts } = await getDepartments()
      const exist = depts.some(item => item.code.toString().toUpperCase() === v.toString().toUpperCase() && v)
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
  methods: {
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
    }
  }
}
</script>

<style scoped>

</style>
