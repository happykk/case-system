<template>
  <section class="publish-step2">
    <div class="form-item">
      <div class="label require-label">案例正文</div>
      <el-upload
        ref="upload"
        accept=".pdf"
        action=""
        :with-credentials="true"
        :http-request="httpRequestText"
        :on-remove="handleRemoveText"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <div slot="tip" class="el-upload__tip" style="display: inline-block;margin-left: 20px">请上传pdf格式文件,文件大小不能超过20Mb</div>
      </el-upload>
    </div>
    <div class="form-item">
      <div class="label require-label">使用说明</div>
      <el-upload
        ref="uploadDesc"
        accept=".pdf"
        action=""
        :with-credentials="true"
        :http-request="httpRequestDesc"
        :on-remove="handleRemoveDesc"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <div slot="tip" class="el-upload__tip" style="display: inline-block;margin-left: 20px">请上传pdf格式文件,文件大小不能超过20Mb</div>
      </el-upload>
    </div>
    <div class="footer">
      <el-button type="primary" @click="submit" :loading="loading">下一步</el-button>
    </div>
  </section>
</template>
<script>
import axios from 'axios'
import {getCookieInClient} from '../../utils/assist'
export default {
  data (){
    return{
      type: '',
      formEntity: {
        text_pdf: '',
        desc_pdf: ''
      },
      formData: new FormData(),
      loading: false
    }
  },
  methods: {
    httpRequestText (param) {
      this.formEntity.text_pdf = param.file.name
      this.formData.append('text_pdf',param.file)
    },
    httpRequestDesc (param) {
      this.formEntity.desc_pdf = param.file.name
      this.formData.append('desc_pdf',param.file)
    },
    handleRemoveText (file, fileList) {
      this.formData.delete('text_pdf')
    },
    handleRemoveDesc (file, fileList) {
      this.formData.delete('desc_pdf')
    },
    submit () {
      this.loading = true;
      this.$refs.upload.submit()
      this.$refs.uploadDesc.submit()
      if (this.formEntity.text_pdf.length<1) {
        this.$message.warning('请添加案例正文')
        return
      } else if (this.formEntity.desc_pdf.length<1) {
        this.$message.warning('请添加使用说明')
        return
      }
      let url
      if (this.$route.query.id) {
        url = `${this.$store.state.basicUrl}/api/case/update`
        this.formData.append('case_id', this.$route.query.id)
      } else {
        url = `${this.$store.state.basicUrl}/api/case/case_upload`
      }
      axios.post(url, this.formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        this.loading = false
        this.formData.delete('text_pdf')
        this.formData.delete('desc_pdf')
        this.formData.delete('case_id')
        if (res.data && res.data.code === 0) {
          this.$emit('stepChange', 3)
        }
      })
    },
  },
  mounted () {
    let _xsrfList = getCookieInClient('_xsrf')
    let xsrf = window.atob(_xsrfList.split('|')[0])
    this.formData.append('key', sessionStorage.getItem('caseKey'))
    this.formData.append('_xsrf', xsrf)
  }
}
</script>
<style scoped>
.publish-step2{
  margin-top: 20px;
}
.form-item{
  display: flex;
  margin-bottom: 20px;
}
.form-item .el-input{
  width: 400px;
}
.form-item .label{
  width: 120px;
  text-align: left;
}
.form-item .tips{
  margin-left: 40px;
  font-size: 12px;
  color: #999;
  margin-top: 12px;
}
.require-label:before {
  content: "*";
  color: #ff4949;
  margin-right: 4px;
  position: relative;
  top: 3px;
}
.footer{
  text-align: center;
}
</style>