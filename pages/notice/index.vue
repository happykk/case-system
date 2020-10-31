<template>
	<section class="container">
		<!-- 面包屑部分 -->
		<div id="bread-nav">
			<div class="brand-nav-box clearfix">
				<div class="brand-nav-content">
					<div class="brand-nav-title"><span>当前位置:</span></div>
					<div class="brand-nav-list">
						<ul>
							<li><nuxt-link target="_blank" to="/">首页</nuxt-link></li>
							<li>></li>
							<li><nuxt-link target="_blank" to="/news">通知公告</nuxt-link></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!-- 面包屑部分结束 -->
    <div class="news-main">
      <ul class="recom-info-content">
        <li class="recom-info-list" v-for="(list) in recomInfo" :key="list.articleId">
          <nuxt-link target="_blank" class="recom-info-title" :to="{name: 'news-newsView-id',params:{id:list.articleId},query: {category: list.articleCategoryId}}">
            <i></i>
            <h2>{{list.articleName}}</h2>
            <span class="recom-info-times">{{list.articleAddTime.split(' ')[0]}}</span>
          </nuxt-link>
        </li>
      </ul>
      <el-pagination
        background
        style="text-align: center;"
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
	</section>
</template>

<script>
	import axios from 'axios'
	import NewsBanner from '~/components/news/NewsBanner'
	
	export default {
		data (){
			return{}
		},
		components: {
			NewsBanner
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
			}
	    }
	}
	
</script>

<style scoped>
	/*面包屑部分*/
  div#bread-nav {
    width:  100%;
    height:  auto;
  }
  .brand-nav-box {
    width:  1200px;
    margin:  0 auto;
    color:  #858585;
    font-size: 14px;
    text-align:  left;
    line-height: 70px;
    border-bottom: 3px solid #136fe1;
  }
  .brand-nav-content{
    float: left;
  }
  .brand-nav-title {
    float:  left;
  }
  .brand-nav-list {
    float:  left;
    overflow:  hidden;
  }
  .brand-nav-list ul {
    overflow: hidden;
  }
  .brand-nav-list ul li {
    float:  left;
    padding: 0 5px;
  }
  .brand-nav-list ul li a {
    display:  block;
    width:  100%;
    height:  100%;
    color: #858585;
  }
  .brand-nav-list ul li:last-child a {
    color: #22202b;
  }
  .brand-nav-list ul li a:hover {
    color: #22202b;
  }
	/*面包屑部分结束*/
  .news-main {
    width:  1200px;
    height:  auto;
    margin:  0 auto;
    padding-bottom: 50px;
    overflow: hidden;
  }
  .recom-info-content {
    overflow:  hidden;
    margin-bottom: 50px;
    padding: 0 30px;
  }
  .recom-info-content li{
    margin-top: 20px;
    font-size: 16px;
    color: #414141;
  }
  .recom-info-title:hover{
    text-decoration: underline;
  }
  .recom-info-title{
    display: flex;
    align-items: center;
  }
  .recom-info-content i{
    background-color: #136fe1;
    margin: 0 15px 0 0;
    width: 4px;
    height: 4px;
    border-radius: 50%;
  }
  .recom-info-title h2{
    flex: 1;
    overflow:  hidden;
    font-weight: normal;
    text-overflow:  ellipsis;
    white-space:  nowrap;
  }
  .recom-info-title span{
    width: 100px;
    font-size: 13px;
  }
</style>