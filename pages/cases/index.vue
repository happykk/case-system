<template>
  <section>
    <!-- 面包屑部分 -->
    <BreadCrumbs :list="titles"></BreadCrumbs>
    <!-- 面包屑部分结束 -->
    <div class="mod-block case-main">
      <div class="search-block">
        <el-form :inline="true" :model="searchForm" label-position="right" label-width="120px">
          <el-form-item label="关键词">
            <el-input v-model="searchForm.keywords" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="指导者">
            <el-input v-model="searchForm.director" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="案例类型">
            <el-select v-model="searchForm.type">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="案例编号">
            <el-input v-model="searchForm.number" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="searchForm.author" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="遍写方式">
            <el-select v-model="searchForm.writeType">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作者单位">
            <el-select v-model="searchForm.company">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布时间">
            <el-date-picker
              v-model="searchForm.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
            <el-button @click="resetForm('searchForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="mod-block case-list">
      <div class="case-item" v-for="(item, index) in lists" :key="index">
        <h3>财务共享提升企业核心竞争力——以TK公司为例</h3>
        <span>编号：12121</span>
        <div class="case-info">
          <span>作者：张三</span>
          <span>类型：类型一</span>
          <span>指导者：李四</span>
          <span>作者单位：湖南大学</span>
          <span class="fr">发布日期：2020-10-10</span>
        </div>
      </div>
      <el-pagination
        background
        style="text-align: center; margin: 30px 0"
        layout="prev, pager, next"
        :total="1000">
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
          keywords: '',
          director: '',
          type: '',
          number: '',
          author: '',
          writeType: '',
          company: '',
          date: ''
        },
        lists: [{},{},{}]
      }
		},
		components: {
			BreadCrumbs
		},
		head () {
		  return {
		    title:this.metaData.navigationTitle,
		    meta: [
		      {name:'keywords',hid: 'keywords',content:`${this.metaData.navigationKeyword}`},
		      {name:'description',hid:'description',content:`${this.metaData.navigationDescription}`}
		    ]
		  }
		},
		async asyncData({params,store}){
			//head信息
		    let metaData = await axios(`${store.state.wordpressAPI}/NavigationMeta/get/12`);
			//推荐资讯
        let recomData = await axios(`${store.state.wordpressAPI}/article/getArticleCenterRecommends`);
        //公司资讯
        let companyData = await axios(`${store.state.wordpressAPI}/article/getRecommendsByCategoryId/1/5`);

        //行业资讯
        let industryData = await axios(`${store.state.wordpressAPI}/article/getRecommendsByCategoryId/5/5`);
        //家具百科
        let furnitureData = await axios(`${store.state.wordpressAPI}/article/getRecommendsByCategoryId/2/5`);

        //品牌选购
        let brandData = await axios(`${store.state.wordpressAPI}/article/getRecommendsByCategoryId/3/5`);

        //装修摆放
        let decorationData = await axios(`${store.state.wordpressAPI}/article/getRecommendsByCategoryId/4/12`);
        return {
          metaData: metaData.data,
          recomInfo: recomData.data,
          companyInfo: companyData.data,
          industryInfo: industryData.data,
          furnitureInfo: furnitureData.data,
          brandInfo: brandData.data,
          decorationInfo: decorationData.data
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
      }
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
  border-bottom: 1px solid #DCDFE6;
}
.case-item h3{
  font-size: 16px;
  margin-bottom: 6px;
}
.case-info{
  color: #666;
  margin-top: 6px;
}
</style>