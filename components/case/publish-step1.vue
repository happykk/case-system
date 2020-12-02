<template>
  <section>
    <!-- <h2 class="step-title">基本信息</h2> -->
    <el-form class="form-box" :model="editInfo" :rules="formRules" :inline="true" label-width="120px" ref="dynamicValidateForm">
      <el-form-item prop="case_name" label="案例名称">
        <el-input v-model="editInfo.case_name" placeholder="请输入案例名称"></el-input>
      </el-form-item>
      <el-form-item prop="cat_id" label="案例分类">
        <el-select v-model="editInfo.cat_id" placeholder="请选择">
          <el-option
            v-for="item in catList"
            :key="item.id"
            :label="item.menu_name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="author" label="作者名称">
        <el-input v-model="editInfo.author" placeholder="请输入作者名称"></el-input>
      </el-form-item>
      <el-form-item prop="author_company" label="作者单位">
        <el-input v-model="editInfo.author_company" placeholder="请输入作者单位"></el-input>
      </el-form-item>
      <el-form-item prop="director_name" label="指导者">
        <el-input v-model="editInfo.director_name" placeholder="请输入指导者名称"></el-input>
      </el-form-item>
      <el-form-item prop="translator_name" label="译者">
        <el-input v-model="editInfo.translator_name" placeholder="请输入译者名称"></el-input>
      </el-form-item>
      <el-form-item prop="language" label="语种">
        <el-input v-model="editInfo.language" placeholder="请输入语种"></el-input>
      </el-form-item>
      <el-form-item prop="chinese_keyword" label="中文关键词">
        <el-input v-model="editInfo.chinese_keyword" placeholder="请输入中文关键词"></el-input>
      </el-form-item>
      <el-form-item prop="english_keyword" label="英文关键词">
        <el-input v-model="editInfo.english_keyword" placeholder="请输入英文关键词"></el-input>
      </el-form-item>
      <el-form-item prop="applicable_courses" label="适用课程">
        <el-input v-model="editInfo.applicable_courses" placeholder="请输入适用课程"></el-input>
      </el-form-item>
      <el-form-item prop="summary" label="摘要">
        <el-input type="textarea" :rows="4" v-model="editInfo.summary" placeholder="请输入摘要"></el-input>
      </el-form-item>
      <el-form-item prop="english_summary" label="英文摘要">
        <el-input type="textarea" :rows="4" v-model="editInfo.english_summary" placeholder="请输入英文摘要"></el-input>
      </el-form-item>
      <el-form-item prop="applicable_object" label="适用对象">
        <el-input v-model="editInfo.applicable_object" placeholder="请输入适用对象"></el-input>
      </el-form-item>
    </el-form>
    <div class="footer">
      <el-button type="primary" @click="goNext()">下一步</el-button>
    </div>
  </section>
</template>
<script>
import {getCookieInClient} from '../../utils/assist'
export default {
  data (){
    return{
      type: '',
      editInfo: {
        case_name: "",
        cat_id: "",
        author: "",
        author_company: "",
        director_name: "",
        translator_name: "",
        language: "",
        chinese_keyword: "",
        english_keyword: "",
        summary: "",
        english_summary: "",
        applicable_object: "",
        applicable_courses: ""
      },
      xsrfList: '',
      formRules: {
        case_name: [
          { required: true, message: "请输入案例名", trigger: "blur"}
        ],
        cat_id: [
          { required: true, message: "请选择分类",trigger: "change"}
        ],
        author: [
          { required: true, message: '请输入作者', trigger: 'blur' }
        ],
        author_company: [
          { required: true, message: "请输入作者单位",trigger: "blur"}
        ],
        language: [
          { required: true, message: "请输入语种",trigger: "blur"}
        ],
        chinese_keyword: [
          { required: true, message: "请输入中文关键词",trigger: "blur"}
        ],
        summary: [
          { required: true, message: "请输入摘要",trigger: "blur"}
        ],
        applicable_object: [
          { required: true, message: "请输入适用对象",trigger: "blur"}
        ],
        applicable_courses: [
          { required: true, message: "请输入适用课程",trigger: "blur"}
        ]
      },
      catList: []
    }
  },
  methods: {
    goNext () {
      this.$refs['dynamicValidateForm'].validate((valid) => {
        if (valid) {
          this.submit()
        }
      })
    },
    submit () {
      let {case_name, cat_id, author, author_company, director_name, translator_name, language, chinese_keyword, english_keyword, summary, english_summary, applicable_object, applicable_courses} = this.editInfo
      let params = {case_name, cat_id, author, author_company, director_name, translator_name, language, chinese_keyword, english_keyword, summary, english_summary, applicable_object, applicable_courses}
      params._xsrf = this.xsrf
      this.$ajax.get('/api/case/case_base', params).then((res) => {
        if (res) {
          sessionStorage.setItem('caseKey', res.data)
          this.$emit('stepChange', 2)
        }
      })
    },
    getCateList () {
      this.$ajax.get('/api/menu', {type: 3}).then( res => {
        if(res) {
          this.catList = res.data
        }
      })
    }
  },
  created () {
    this.getCateList()
    let url,params
    if (this.$route.query.id) {
      url = '/api/case/base'
      params = {
        case_id: this.$route.query.id
      }
    } else {
      url = '/api/case/create'
      params = ''
    }
    this.$ajax.get(url, params).then( res => {
      if (res) {
        this.editInfo = res.data
        this.editInfo.cat_id==0 && (this.editInfo.cat_id= '')
      }
    })
  }
}
</script>
<style scoped>
.step-title{
  color: #666;
  font-weight: 600;
  font-size: 18px;
}
.form-box{
  margin: 30px;
}
.footer{
  text-align: center;
}
.el-input, .el-textarea{
  width: 218px;
}
.el-textarea .el-textarea__inner{
  resize: none !important;
}
</style>