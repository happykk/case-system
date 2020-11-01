<template>
	<section class="container">
		<!-- <NewsBanner></NewsBanner> -->
		<!-- 面包屑部分 -->
		<BreadCrumbs :list="titles"></BreadCrumbs>
		<!-- 面包屑部分结束 -->
    <div class="news-main">
      <div class="recom-info-content">
        <ul>
          <li class="recom-info-list" v-for="(list) in recomInfo" :key="list.articleId">
            <div class="recom-info-title">
              <nuxt-link target="_blank" :to="{name: 'news-newsView-id',params:{id:list.articleId},query: {category: list.articleCategoryId}}"><h2>{{list.articleName}}</h2></nuxt-link>
            </div>
            <div class="recom-info-box">
              <div class="recom-info-img">
                <nuxt-link target="_blank" :to="{name: 'news-newsView-id',params:{id:list.articleId},query: {category: list.articleCategoryId}}">
                  <img :src="list.articleImg.articleImgSrc" :alt="list.articleImg.articleImgAlt">
                </nuxt-link>
                <div class="recom-info-times">
                  <span><font class="dd" id="dd-1">13</font></span>
                  <font class="ym" id="ym-1">2020.10</font>
                  <!-- <p>{{list.articleAddTime}}</p> -->
                </div>
              </div>
              <div class="recom-info-right">
                <div class="recom-info-deesc" >{{list.articleText}}</div>
              </div>
            </div>
          </li>
        </ul>
        <el-pagination
          background
          style="text-align: center;"
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
      <div class="recom-info-content-right">
        <div class="mod">
          <h2 class="mod-title">
            <span class="iconwraper"><i class="el-icon-picture"></i></span>
            <span class="text">精彩新闻</span>
            <span class="more">更多 ›</span>
          </h2>
          <ul class="hot-news-list">
            <li v-for="item in recomInfo" :key="item.articleId">
              <img :src="item.articleImg.articleImgSrc" alt="">
              <div>
                <nuxt-link target="_blank" :to="{name: 'news-newsView-id',params:{id:item.articleId},query: {category: item.articleCategoryId}}">{{item.articleName}}</nuxt-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
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
            title: '新闻资讯',
            link: '/news'
          },
        ]
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
			}
	    }
	}
	
</script>

<style scoped>
	/* 推荐资讯部分 */
		.news-main {
      width:  1200px;
      height:  auto;
      margin:  0 auto;
      padding-bottom: 50px;
      overflow: hidden;
		}
		.recom-info-content {
      width: 800px;
      float: left;
		}
		.recom-info-content ul {
      overflow:  hidden;
      margin-bottom: 50px;
		}
    .recom-info-content ul li{
      padding: 6px 0 33px;
      border-bottom: 1px solid #ccc;
		}
    .recom-info-title {
      font-size:  18px;
      line-height:  40px;
      margin: 18px 0;
		}
		.recom-info-title a h2{
		    display:  block;
		    overflow:  hidden;
		    width:  100%;
		    height:  100%;
			  font-weight: normal;
		    text-overflow:  ellipsis;
		    white-space:  nowrap;
		}
		.recom-info-title a:hover{
			text-decoration: underline;
		}
    .recom-info-box{
      display: flex;
    }
    .recom-info-right{
      flex: 1;
    }
		.recom-info-img {
      width: 234px;
      height: 144px;
      margin-right: 25px;
      cursor:  pointer;
      position: relative;
		}
    .recom-info-times {
      position: absolute;
      width: 50px;
      height: 50px;
      bottom: 10px;
      left: 10px;
      font-size: 12px;
      background-color: #f4930a;
      background: rgba(244,147,10,0.8);
      filter: alpha(opacity=80)\9;
      color: #fff;
      text-align: center;
      padding-top: 5px;
		}
    .recom-info-times span {
      font-size: 24px;
      line-height: 24px;
      display: block;
    }
    .recom-info-times span .dd{
      font-weight: 700;
    }
		.recom-info-img img {
      object-fit: cover;
      width:  100%;
      height:  100%;
      -webkit-transition: all 0.5s ease;
      -o-transition: all 0.5s ease;
      transition: all 0.5s ease;
		}
		.recom-info-img img:hover {
		    -webkit-transform: scale(1.2);
			-ms-transform: scale(1.2);
			-o-transform: scale(1.2);
			transform: scale(1.2);
		}
		.recom-info-deesc {
      overflow:  hidden;
      width:  100%;
      height: 40px;
      padding:  0 9px;
      color:  #858585;
      font-size: 14px;
      line-height:  20px;
      text-align:  left;
      box-sizing:  border-box;
		}
		.recom-info-more {
      overflow:  hidden;
      width: 103px;
      height: 40px;
      margin: 28px auto 0;
      border: 3px solid #000;
      font-size: 14px;
      line-height: 40px;
      text-align: center;
      -webkit-transition: all 0.5s ease;
      -o-transition: all 0.5s ease;
      transition: all 0.5s ease;
		}
		.recom-info-more:hover{
			-webkit-transform: translateY(-5px);
			-ms-transform: translateY(-5px);
			-o-transform: translateY(-5px);
			transform: translateY(-5px);
		}
		.recom-info-more a {
      display: block;
      width: 100%;
      height: 100%;
      color: #22202b;
      font-weight: bold;
      -webkit-transition: all 0.5s ease;
      -o-transition: all 0.5s ease;
      transition: all 0.5s ease;
		}
		.recom-info-more:hover a {
      background:  #22202b;
      color: #feeabd;
		}
    .recom-info-content-right{
      float: left;
      width: 290px;
      margin: 35px 0 0 50px;
    }
    .mod-title{
      display: flex;
      align-items: center;
      color: #136fe1;
      padding-bottom: 20px;
      border-bottom: 2px solid #d6d6d6;
    }
    .mod-title .iconwraper{
      background: #136fe1;
      color: #fff;
      height: 36px;
      line-height: 36px;
      width: 36px;
      display: inline-block;
      text-align: center;
      font-size: 18px;
      margin-right: 15px;
    }
    .mod-title .text{
      flex: 1;
      font-size: 18px;
    }
    .mod-title .more{
      color: #999;
      font-size: 12px;
    }
    .hot-news-list{
      overflow: hidden;
    }
    .hot-news-list li {
      width: 135px;
      float: left;
      margin: 20px 10px 0px 0;
    }
    .hot-news-list li img{
      height: 84px;
      width: 100%;
      object-fit: cover;
    }
    .hot-news-list li a{
      display: block;
      margin-top: 10px;
    }
    .hot-news-list li a:hover{
      color: #136fe1;
    }
    .hot-news-list li:nth-of-type(2n){
      margin-right: 0;
      margin-left: 10px;
    }
	/* 推荐资讯部分结束 */
</style>