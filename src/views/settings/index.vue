<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户管理" name="first">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="showDialog=true">新增角色</el-button>

            <el-table style="width: 100%;margin-top: 20px" border :data="list">
              <el-table-column align="center" type="index" label="序号" width="120"/>
              <el-table-column align="center" prop="name" label="姓名" width="240"/>
              <el-table-column align="center" prop="description" label="地址"/>
              <el-table-column align="center" prop="option" label="操作">
                <template v-slot="{row}">
                  <el-button type="success" size="small" @click="assignPerm(row.id)">分配权限</el-button>
                  <el-button type="primary" size="small" @click="editRole(row.id)">编辑</el-button>
                  <el-button type="danger" size="small" @click="delRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-row type="flex" justify="end">
              <el-pagination
                layout="prev, pager, next"
                :current-page="page.page"
                :total="page.total"
                :page-size="page.pagesSize"
                style="margin-top: 20px"
                @current-change="changPage"
              />
            </el-row>

          </el-tab-pane>
          <el-tab-pane label="配置管理" name="second">
            <el-alert
              title="对公司名称,公司地址,营业执照,公司地区的更新,将使得公司资料被重新审核,请谨慎修改"
              type="info"
              :closable="false"
              :show-icon="true"
            />
            <el-form style="margin-top: 40px">
              <el-form-item label-width="120px" label="企业名称">
                <el-input value="中国村开心快乐哈哈哈哈哈公司" disabled style="width: 400px"/>
              </el-form-item>
              <el-form-item label-width="120px" label="公司地址">
                <el-input value="中国村" disabled style="width: 400px"/>
              </el-form-item>
              <el-form-item label="电话" label-width="120px">
                <el-input value="10086" disabled style="width: 400px"/>
              </el-form-item>
              <el-form-item label="邮箱" label-width="120px">
                <el-input value="10086@163.com" disabled style="width: 400px"/>
              </el-form-item>
              <el-form-item label="备注" label-width="120px">
                <el-input value="备注备注" type="textarea" :row="3" disabled style="width: 400px"/>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>

      <el-dialog title="编辑部门" :visible="showDialog" @close="onCancel">
        <el-form ref="roleForm" :model="roleForm" :rules="rules">
          <el-form-item label="角色名称" label-width="120px" prop="name">
            <el-input v-model="roleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" label-width="120px">
            <el-input v-model="roleForm.description"></el-input>
          </el-form-item>
        </el-form>
        <el-row justify="center" type="flex">
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onConfirm">确定</el-button>
        </el-row>

      </el-dialog>

      <el-dialog title="分配权限" :visible="showPermDialog" @close="btnPermCancel">
        <el-tree
          ref="permTree"
          :data="permData"
          :props="defaultProps"
          :show-checkbox="true"
          :check-strictly="true"
          :default-expand-all="true"
          :default-checked-keys="selectCheck"
          node-key="id"
        />
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" @click="btnPermCancel">取消</el-button>
            <el-button type="primary" size="small" @click="btnPermOK">确定</el-button>
          </el-col>
        </el-row>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import { addRole, assignPerm, deleteRole, getCompanyInfo, getRoleDetail, getRoleList, updateRole } from '@/api/setting'
import { mapGetters } from 'vuex'
import { transListToTreeData } from '@/utils'
import { getPermissionList } from '@/api/permisson'

export default {
  name: 'Settings',
  data() {
    return {
      activeName: 'first',
      list: [],
      page: {
        page: 1,
        pagesSize: 10,
        total: 0
      },
      formData: {},
      showDialog: false,
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      },
      showPermDialog: false,
      defaultProps: {
        label: 'name'
      },
      permData: [],
      selectCheck: [],
      roleId: null
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      this.list = rows
      this.page.total = total
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    },
    changPage(newPage) {
      this.page.page = newPage
      this.getRoleList()
    },
    async delRole(id) {
      try {
        await this.$confirm('确认删除该角色吗?')
        await deleteRole(id)
        await this.getRoleList()
        this.$message.success('删除成功')
      } catch (e) {
        console.error(e)
      }
    },
    async editRole(id) {
      this.roleForm = await getRoleDetail(id)

      this.showDialog = true
    },
    async onConfirm() {
      try {
        await this.$refs.roleForm.validate()
        if (this.roleForm.id) {
          await updateRole(this.roleForm)
        } else {
          await addRole(this.roleForm)
        }
        await this.getRoleList()
        this.$message.success('操作成功')
        this.showDialog = false
      } catch (e) {
        console.log('校验失败', e)
      }
    },
    onCancel() {
      this.roleForm = {
        name: '',
        description: ''
      }
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },
    async assignPerm(id) {
      this.permData = transListToTreeData(await getPermissionList(), '0') // 转化list到树形数据
      this.roleId = id
      const { permIds } = await getRoleDetail(id) // permIds是当前角色所拥有的权限点数据
      this.selectCheck = permIds // 将当前角色所拥有的权限id赋值
      this.showPermDialog = true
    },
    async btnPermOK() {
      await assignPerm({ permIds: this.$refs.permTree.getCheckedKeys(), id: this.roleId })
      this.$message.success('分配权限成功')
      this.showPermDialog = false
    },
    btnPermCancel() {
      this.selectCheck = [] // 重置数据
      this.showPermDialog = false
    }
  }
}
</script>

<style scoped>

</style>
