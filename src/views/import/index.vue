<template>
  <upload-excel :on-success="success"/>
</template>

<script>
import UploadExcel from '@/components/UploadExcel'
import { importEmployee } from '@/api/employees'

export default {
  name: 'Import',
  components: {
    UploadExcel
  },
  methods: {
    async success({ header, results }) {
      const data = Array.from(results).map(item => {
        return {
          timeOfEntry: new Date(this.formatDate(item['入职日期'], '/')),
          mobile: item['手机号'],
          username: item['姓名'],
          correctionTime: new Date(this.formatDate(item['转正日期'], '/')),
          workNumber: item['工号']
        }
      })
      debugger
      await importEmployee(data)
      this.$message.success('导入excel成功')
      this.$router.back()
    },
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style scoped>

</style>
