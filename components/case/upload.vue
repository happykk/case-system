<template>
  <section>
    <el-form ref="popForm" :model="popForm">
      <el-form-item>
        <el-upload ref="upload"
          :action="'/api/case/case_upload'"
          :data="uploadOpt"
          :auto-upload="false"
          :on-change="onChange"
          :on-remove="onRemove"
          :on-success="onSuccess"
          :on-error="onError"
          accept=".pdf,.PDF"
          :with-credentials="true">
          <el-input slot="trigger" class="input-area" v-model="popForm.uploadName" placeholder="点击选择文件"></el-input>
        </el-upload>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
export default {
  data () {
    return {
      importTips: false,
      error_key: '',
      fileList: [],
      popForm: {
        uploadName: '',
        uploadSize: ''
      },
      uploadOpt: {}
    }
  },
  mounted () { },
  methods: {
    onSuccess (response, file, fileList) {
      this.$refs.upload.uploadFiles.splice(0, 1)
      if (response.error === 0) {
        let data = response.data
        this.$message({
          message: '上传成功！',
          type: 'success'
        })
        this.$emit('uploadSuccess', data)
        this.uploadErrorMsg = ''
      } else {
        this.uploadErrorMsg = response.msg
      }
      this.errorMsg = ''
    },
    onError (file, fileList) {
      this.errorMsg = file.name + '上传失败!'
    },
    onChange (file, fileList) {
      if (fileList.length > 1) {
        this.errorMsg = ''
        this.$refs.upload.uploadFiles.splice(0, 1)
      }
      this.popForm.uploadName = file.name
      this.popForm.uploadSize = file.size
      this.fileList = fileList
      this.$emit('handleChange', file)
    },
    onRemove (file, fileList) {
      this.fileList = fileList
    },
    validate () {
      if (this.fileList.length === 0) {
        this.errorMsg = '请选择一个上传文件!'
        return false
      }
      if (!/\.xlsx|xls$/.test(this.popForm.uploadName)) {
        this.errorMsg = '文件后缀名必须为.xlsx或.xls'
        return false
      }
      if (this.popForm.uploadSize > 20 * 1024 * 1024) {
        this.errorMsg = '文件大小不能超过20Mb!'
        return false
      }
      this.errorMsg = ''
      return true
    },
    onSubmit () {
      this.$refs['popForm'].validate((valid) => {
        if (valid && this.validate()) {
          this.$refs.upload.submit()
        }
      })
    }
  }
}
</script>
<style>

</style>
