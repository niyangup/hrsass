<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户管理" name="first">
            <el-button type="primary" icon="el-icon-plus" size="small">新增角色</el-button>

            <el-table style="width: 100%;margin-top: 20px" border :data="list">
              <el-table-column align="center" type="index" label="序号" width="120"/>
              <el-table-column align="center" prop="name" label="姓名" width="240"/>
              <el-table-column align="center" prop="description" label="地址"/>
              <el-table-column align="center" prop="option" label="操作">
                <el-button type="success" size="small">分配权限</el-button>
                <el-button type="primary" size="small">编辑</el-button>
                <el-button type="danger" size="small">删除</el-button>
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
    </div>
  </div>
</template>

<script>
import { getCompanyInfo, getRoleList } from '@/api/setting'
import { mapGetters } from 'vuex'

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
      formData: {}
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
      this.page.total = total
      this.list = rows
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    },
    changPage(newPage) {
      this.page.page = newPage
      this.getRoleList()
    }
  }
}
</script>

<style scoped>

</style>
