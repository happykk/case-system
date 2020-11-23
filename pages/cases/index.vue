<template>
  <section>
    <!-- 面包屑部分 -->
    <BreadCrumbs :list="titles"></BreadCrumbs>
    <!-- 面包屑部分结束 -->
    <div class="mod-block case-main">
      <div class="search-block">
        <el-form :inline="true" :model="searchForm" label-position="right" label-width="120px">
          <el-form-item label="案例名称">
            <el-input v-model="searchForm.case_name" placeholder=""></el-input>
          </el-form-item>
          <el-form-item prop="cat_id" label="案例分类">
            <el-select v-model="searchForm.cat_id" placeholder="请选择">
              <el-option
                v-for="item in catList"
                :key="item.id"
                :label="item.menu_name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="searchForm.author" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="作者单位">
            <el-input v-model="searchForm.author_company" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="中文关键词">
            <el-input v-model="searchForm.chinese_keyword" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="英文关键词">
            <el-input v-model="searchForm.english_keyword" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="适用课程">
            <el-input v-model="searchForm.applicable_courses" placeholder=""></el-input>
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
        <h3>{{item.case_name}}</h3>
        <span>{{item.summary}}</span>
        <div class="case-info">
          <span>作者: {{item.author}}</span>
          <span>作者单位：{{item.author_company}}</span>
          <span>类型: {{item.summary}}</span>
          <span class="fr">入库时间: {{item.create_time.split(' ')[0]}}</span>
        </div>
      </div>
      <div class="empty" v-if="recomData.list.length<1">
        <img src="../../assets/images/empty.png" alt="">
        <p>暂时没有数据~</p>
      </div>
      <el-pagination
        background
        style="text-align: center; margin: 30px 0"
        layout="prev, pager, next"
        :page-size="searchForm.page_no"
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
          page_size: 10
        },
        total: 0,
        catList: []
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
      let recomData = await context.app.$ajax.get('/api/case/list?page_no=1&page_size=10&cat_id=0')
      return {
        recomData: recomData.data
      }
    },
    methods: {
      getTxt (str,index,num1=136,num2=42){
        var txt = str.replace(/<\/?.+?>/g,"").replace(/&nbsp;/ig,"").replace(/(^\s+)|(\s+$)/g,"").replace(/\s/g,''); 
        if (index == 0) {
          //截取指定字数末尾显示省略号
          txt = txt.length < num1 ? txt : txt.substring(0,num1).concat('...');
        } else {
          txt = txt.length < num2 ? txt : txt.substring(0,num2).concat('...');
        }
        return txt;
      },
      getTime(time){
        var time = time.slice(5, 10);
        return time;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getCateList () {
        this.$ajax.get('/api/menu', {type: 3}).then( res => {
          this.catList = res.data
        })
      },
      handleCurrentChange(val){
        this.getData()
      },
      search () {
        this.recomData.list = []
        this.getData()
      },
      getData(){
        let cat_id = this.searchForm.cat_id || 0
        let params = Object.assign({},this.searchForm, {cat_id: cat_id})
        this.$ajax.get(`/api/case/list`, params).then( (res) => {
          this.recomData.list = this.recomData.list.concat(res.data.list || [])
        })
      }
    },
    mounted () {
      this.getCateList()
      this.total = this.recomData.page.total
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
.case-item h3{
  font-size: 20px;
  color: #7e8c8d;
  margin-bottom: 6px;
}
.case-desc{
  font-size: 14px;
  color: #333;
  padding: 15px 0;
  display: -webkit-box;
  /* autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.case-info{
  color: #bcbcbc;
  font-size: 12px;
  margin-top: 6px;
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