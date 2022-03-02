<template>
  <div class="dashboard-container">
    <div v-loading="loading" class="app-container">
      <page-tools :show-before="true">

        <template v-slot:before>
          <span>共{{ page.total }}条记录</span>
        </template>

        <template v-slot:after>
          <el-button size="small" type="success" @click="$router.push('/import')">excel导入</el-button>
          <el-button size="small" type="danger" @click="exportData">excel导出</el-button>
          <el-button size="small" type="primary" @click="showDialog=true">新增员工</el-button>
        </template>

      </page-tools>

      <el-card>
        <el-table border :data="list">
          <el-table-column type="index" label="序号" sortable=""/>
          <el-table-column label="姓名" prop="username" sortable=""/>
          <el-table-column label="工号" prop="workNumber" sortable=""/>
          <el-table-column label="聘用形式" :formatter="formatEmployment" sortable="" prop="formOfEmployment"/>
          <el-table-column label="部门" sortable="" prop="departmentName"/>
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template v-slot="{row}">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template v-slot="{row:{enableState}}">
              <el-switch :value="enableState===1"/>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template v-slot="{row}">
              <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination
            layout="prev, pager, next"
            :current-page="page.page"
            :page-size="page.size"
            :total="page.total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
      <add-emplouees :show-dialog.sync="showDialog"/>
    </div>
  </div>
</template>

<script>
import { delEmployee, getEmployeeList } from '@/api/employees'
import Employees from '@/api/constant/employees'
import AddEmplouees from '@/views/emplouees/add-emplouees'
import { formatDate } from '@/filters'

export default {
  name: 'Emplouees',
  components: { AddEmplouees },
  data() {
    return {
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0
      },
      loading: false,
      showDialog: false
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      this.loading = true
      const { total, rows } = await getEmployeeList(this.page)
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    changePage(newPage) {
      this.page.page = newPage
      this.getEmployeeList()
    },
    formatEmployment(row, column, cellValue, index) {
      const type = Employees.hireType.find(value => value.id === cellValue)
      return type ? type.value : '未知'
    },
    async del(id) {
      try {
        await this.$confirm('确定删除该员工吗')
        await delEmployee(id)
        this.$message.success('删除员工成功')
        await this.getEmployeeList()
      } catch (e) {
        console.log(e)
      }
    },
    exportData: async function() {
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }

      const { rows } = await getEmployeeList({ page: 1, size: this.page.total })
      const data = this.formatJson(headers, rows)
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data: data,
          filename: '员工工资表'
        })
      })
    },
    formatJson(headers, rows) {
      // 首先遍历数组
      // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
      return rows.map(item => {
        return Object.keys(headers).map(key => {
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            return formatDate(item[headers[key]]) // 返回格式化之前的时间
          } else if (headers[key] === 'formOfEmployment') {
            const en = Employees.hireType.find(obj => obj.id === item[headers[key]])
            return en ? en.value : '未知'
          }
          return item[headers[key]]
        }) // => ["张三", "13811"，"2018","1", "2018", "10002"]
      })
    }
  }
}
</script>

<style scoped>

</style>
