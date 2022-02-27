<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <el-row type="flex" align="middle" style="height: 40px;">
          <el-col>中国村开心快乐哈哈哈哈哈公司</el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <el-col>负责人</el-col>
              <el-col>
                <el-dropdown>
                  <span>
                    操作<i class="el-icon-arrow-down el-icon--right"/>
                  </span>

                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Departments'
}
</script>

<style scoped lang="scss">

.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}

</style>
