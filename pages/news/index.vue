<template>
	<section class="container">
		<!-- <NewsBanner></NewsBanner> -->
		<!-- 面包屑部分 -->
		
		<!-- 面包屑部分结束 -->
    <div class="news-main">
      <div class="recom-info-content">
        <BreadCrumbs :list="titles" class="breadCrumbs"></BreadCrumbs>
        <ul>
          <li class="recom-info-list" v-for="(list) in recomInfo.list" :key="list.id">
            <div class="recom-info-title">
              <nuxt-link target="_blank" :to="{name: 'news-newsView-id',query:{id:list.id}}"><h2>{{list.title}}</h2></nuxt-link>
            </div>
            <div class="recom-info-box">
              <div class="recom-info-img">
                <nuxt-link target="_blank" :to="{name: 'news-newsView-id',query:{id:list.id}}">
                  <img :src="'https://www.hnuaccounting.com/static/image/'+list.img">
                </nuxt-link>
                <div class="recom-info-times" v-if="list.update_time">
                  <span><font class="dd" id="dd-1">{{list.update_time.split(' ')[0].split('-')[2]}}</font></span>
                  <font class="ym" id="ym-1">{{list.update_time.split(' ')[0].split('-')[0]}}-{{list.update_time.split(' ')[0].split('-')[1]}}</font>
                </div>
              </div>
              <div class="recom-info-right">
                <div class="recom-info-deesc" >{{list.desc}}</div>
              </div>
            </div>
          </li>
        </ul>
        <el-pagination
          background
          style="text-align: center;"
          layout="total, prev, pager, next"
          :page-size="formData.page_size"
          :current-page="formData.page_no"
          @current-change="handleCurrentChange"
          :total="total">
        </el-pagination>
      </div>
      <div class="recom-info-content-right">
        <div class="mod hot-news">
          <h2 class="mod-title">
            <span class="iconwraper"><i class="el-icon-picture"></i></span>
            <span class="text">精彩新闻</span>
            <span class="more">更多 ›</span>
          </h2>
          <el-carousel
            class="hot-news-list"
            trigger="click"
            indicator-position="outside"
            height="180px"
            :autoplay="false">
            <el-carousel-item v-for="item in newNes" :key="item.id">
              <nuxt-link target="_blank" :to="{name: 'news-newsView-id',params:{id:item.id}}">
                <img :src="'https://www.hnuaccounting.com/static/image/'+item.img" alt="">
                <div class="h-n-item">
                  {{item.title}}
                </div>
              </nuxt-link>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="mod">
          <h2 class="mod-title">
            <span class="iconwraper"><i class="el-icon-picture"></i></span>
            <span class="text">最新资讯</span>
            <span class="more">更多 ›</span>
          </h2>
          <ul class="new-news-list">
            <li v-for="item in hotNews" :key="item.id">
              <img :src="'https://www.hnuaccounting.com/static/image/'+item.img" alt="">
              <div>
                <nuxt-link target="_blank" :to="{name: 'news-newsView-id',params:{id:item.id}}">{{item.title}}</nuxt-link>
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
        ],
        formData: {
          type: 1,
          page_no: 1,
          page_size: 10
        },
        total: 0
      }
		},
		components: {
			BreadCrumbs
		},
		head () {
		  return {
		    title:'新闻中心',
		    meta: [
		      {name:'keywords',hid: 'keywords',content:`新闻中心`},
		      {name:'description',hid:'description',content:`新闻中心`}
		    ]
		  }
		},
		async asyncData(context){
			//推荐资讯
      let recomData = await context.app.$ajax.get('/api/article/list?type=1&page_no=1&page_size=10')
      let hotDatas = await context.app.$ajax.get('/api/article/hot')
      let newDatas = await context.app.$ajax.get('/api/article/new')
      return {
        recomInfo: recomData.data,
        hotNews: hotDatas.data,
        newNes: newDatas.data
      }
    },
    methods: {
      handleCurrentChange(val){
        this.formData.page_no = val
        this.getData()
      },
      getData(){
        this.$ajax.get(`/api/article/list`,this.formData).then((res) => {
          this.recomInfo.list = res.data.list
        })
      }
    },
    mounted () {
      this.total = this.recomInfo.page.total
    }
	}
	
</script>
<style >
.hot-news-list .el-carousel__indicator.is-active button{
  background-color: #136fe1;
}
</style>
<style scoped>
  /* 推荐资讯部分 */
    .breadCrumbs{
      border-bottom: 3px solid #136fe1;
      padding: 22px 0 4px;
    }
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
    .new-news-list{
      overflow: hidden;
    }
    .new-news-list li {
      width: 135px;
      float: left;
      margin: 20px 10px 0px 0;
    }
    .new-news-list li img{
      height: 84px;
      width: 100%;
      object-fit: cover;
    }
    .new-news-list li a{
      margin-top: 10px;
      display: -webkit-box;
      /* autoprefixer: off */
      -webkit-box-orient: vertical;
      /* autoprefixer: on */
      -webkit-line-clamp: 2;
      overflow: hidden;

    }
    .new-news-list li a:hover{
      color: #136fe1;
    }
    .new-news-list li:nth-of-type(2n){
      margin-right: 0;
      margin-left: 10px;
    }
    .hot-news{
      margin-bottom: 20px;
    }
    .hot-news-list {
      margin-top: 20px;
      position: relative;
    }
    .hot-news-list img{
      width: 290px;
      height: 180px;
      object-fit: cover;
    }
    .hot-news-list .h-n-item{
      font-size: 13px;
      line-height: 20px;
      color: #fff;
      background: rgba(0,0,0, .5);
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 0;
      width: 100%;
      padding: 4px 15px;
      display: -webkit-box;
      /* autoprefixer: off */
      -webkit-box-orient: vertical;
      /* autoprefixer: on */
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    
	/* 推荐资讯部分结束 */
</style>