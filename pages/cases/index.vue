<template>
  <section>
    <!-- 面包屑部分 -->
    <BreadCrumbs :list="titles"></BreadCrumbs>
    <!-- 面包屑部分结束 -->
    <div class="mod-block case-main">
      <div class="search-block">
        <el-form :inline="true" :model="searchForm" label-position="right" label-width="120px" ref="searchForm">
          <el-form-item label="案例名称" prop="case_name">
            <el-input v-model="searchForm.case_name" placeholder=""></el-input>
          </el-form-item>
          <el-form-item prop="cat_id" label="案例分类">
            <el-select v-model="searchForm.cat_id" placeholder="请选择">
              <el-option
                v-for="item in $store.state.cateData.data"
                :key="item.id"
                :label="item.menu_name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model="searchForm.author" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="作者单位" prop="author_company">
            <el-input v-model="searchForm.author_company" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="中文关键词" prop="chinese_keyword">
            <el-input v-model="searchForm.chinese_keyword" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="英文关键词" prop="english_keyword">
            <el-input v-model="searchForm.english_keyword" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="适用课程" prop="applicable_courses">
            <el-input v-model="searchForm.applicable_courses" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="入库时间" prop="creatTime">
            <el-date-picker
              v-model="searchForm.creatTime"
              type="daterange"
              value-format="timestamp"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="resetForm('searchForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="mod-block case-list">
      <div class="case-item" v-for="(item, index) in recomData.list" :key="index">
        <h3 @click="toDetail(item)">{{item.case_name}}</h3>
        <div class="case-desc">
          <p>{{item.summary}}</p>
        </div>
        <div class="case-info">
          <span>作者: {{item.author}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span>作者单位：{{item.author_company}}</span>
          <span class="fr" style="color: #999;">入库时间: {{item.create_time.split(' ')[0]}}</span>
        </div>
      </div>
      <div class="empty" v-if="recomData.list.length<1">
        <img src="../../assets/images/empty.png" alt="">
        <p>暂时没有数据~</p>
      </div>
      <el-pagination
        background
        style="text-align: center; margin: 30px 0"
        layout="total, prev, pager, next"
        :page-size="searchForm.page_size"
        :current-page="searchForm.page_no"
        @current-change="handleCurrentChange"
        :total="total">
      </el-pagination>
    </div>
    
  </section>
</template>
<script>
	import axios from 'axios'
	import BreadCrumbs from '~/components/common/breadCrumbs'
	
	export default {
		data (){
			return{
        titles: [
          {
            title: '网站首页',
            link: '/'
          },
          {
            title: '案例库',
            link: '/cases'
          },
        ],
        searchForm: {
          case_name: '',
          cat_id: '',
          author: '',
          author_company: '',
          chinese_keyword: '',
          english_keyword: '',
          applicable_courses: '',
          page_no: 1,
          page_size: 10,
          creatTime: ''
        },
        total: 0
      }
		},
		components: {
			BreadCrumbs
		},
		head () {
		  return {
		    title:'案例',
		    meta: [
		      {name:'keywords',hid: 'keywords',content:`案例`},
		      {name:'description',hid:'description',content:`案例`}
		    ]
		  }
		},
		async asyncData(context){
      let recomData = await context.app.$ajax.get(`/api/case/list?page_no=1&page_size=10&cat_id=0&begin_time=0&end_time=0&case_name=${context.query.keyword||''}`)
      return {
        recomData: recomData.data
      }
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleCurrentChange(val){
        this.searchForm.page_no = val
        this.getData()
      },
      search () {
        this.recomData.list = []
        this.total = 0
        this.getData()
      },
      getData(){
        let cat_id = this.searchForm.cat_id || 0
        let params = Object.assign({},this.searchForm, {cat_id: cat_id})
        params.begin_time = params.creatTime[0] || 0
        params.end_time = params.creatTime[1] || 0
        delete params.creatTime
        this.$ajax.get(`/api/case/list`, params).then( (res) => {
          if(res){
            this.recomData.list = res.data.list || []
          }
        })
      },
      toDetail (row) {
        sessionStorage.setItem('caseDetail', JSON.stringify(row))
        this.$router.push({path: `/cases/${row.id}`})
      }
    },
    mounted () {
      this.total = this.recomData.page.total
      if (this.$route.query.keyword) {
        this.searchForm.case_name = this.$route.query.keyword
      }
      this.searchForm.page_no = this.recomData.page.page_no
    }
  }
</script>

<style scoped>
.el-select{
  width: 202px;
}
.search-block{
  background: #fff;
  border-radius: 8px;
  padding: 30px 0px 10px;
}
.case-list{
  background: #fff;
  border-radius: 8px;
  padding: 10px 20px 20px;
  margin-top: 20px;
}
.case-item{
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid #e5e5e5;
}
.case-item h3{
  font-size: 20px;
  color: #333;
  margin-bottom: 6px;
  cursor: pointer;
}
.case-item h3:hover{
  color: #136fe1;
}
.case-desc{
  font-size: 13px;
  color: #999;
  padding: 10px;
  background: #f9f9f9;
}
.case-desc p{
  line-height: 24px;
  display: -webkit-box;
  /* autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.case-info{
  color: #666;
  font-size: 13px;
  margin-top: 10px;
}
.case-info span{
  margin-right: 15px;
}
.empty{
  padding: 40px 0;
  text-align: center;
}
.empty img{
  width: 280px;
  height: 165px;
  vertical-align: middle;
}
.empty p{
  color: #666;
  margin: 26px 0 16px;
}
</style>