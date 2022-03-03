<template>
  <div>
    <el-upload
      :class="{disabled:fileComputed}"
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="onPreview"
      :file-list="fileList"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :before-upload="beforeUpload"
      :http-request="handleUpload"
    >
      <i class="el-icon-plus"/>
    </el-upload>
    <el-dialog :visible.sync="showDialog" title="图片预览">
      <img :src="imgUrl" alt="" style="width: 100%">
    </el-dialog>

    <el-progress :percentage="progress" style="width: 180px" v-if="showProgress"/>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'

export default {
  name: 'ImageUpload',
  data() {
    return {
      showProgress: false,
      showDialog: false,
      imgUrl: '',
      fileList: [],
      progress: 0
    }
  },
  computed: {
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    onPreview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    handleRemove(file, fileList) {
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    handleChange(file, fileList) {
      this.fileList = fileList.map(item => item)
    },
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (types.includes(file.type)) {
        const maxSize = 5 * 1024 * 1024
        if (file.size > maxSize) {
          this.$message.error('图片大小最大不能超过5M')
          return false
        }
      } else {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      this.showProgress = true
      return true
    },
    handleUpload(p) {
      if (p.file) {
        const cos = new COS({
          SecretId: 'AKIDVqxoOioeDVWHlyuaz7xXqse9OM3SbT4O',
          SecretKey: '5sOecKllVyA5j7E4ex0lFSP5TbT4ORCh'
        })
        cos.putObject({
          Bucket: 'niyangup-1259036576', /* 填入您自己的存储桶，必须字段 */
          Region: 'ap-nanjing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
          Key: p.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
          StorageClass: 'STANDARD',
          Body: p.file, // 上传文件对象
          onProgress: (progressData) => {
            this.progress = progressData.percent * 100
          }
        }, (err, data) => {
          this.showProgress = false
          this.progress = 0
          if (!err && data.statusCode === 200) {
            this.fileList = this.fileList.map(item => {
              if (item.uid === p.file.uid) {
                item.url = `http://${data.Location}`
                item.upload = true
              }
              return item
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped>

/deep/ .disabled .el-upload--picture-card {
  display: none;
}

</style>
