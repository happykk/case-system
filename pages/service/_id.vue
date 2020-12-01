<template>
	<div id="news-view">
		<div class="news-view-box">
			<BreadCrumbs :list="titles" class="breadCrumbs"></BreadCrumbs>
			<div class="news-view-details-wrap">
				<div class="news-view-title-box">
					<h2 class="article-title">{{title}}</h2>
          <p class="article-date">
            发布日期：{{articleData.update_time.split(' ')[0]}}
          </p>
				</div>
				<div class="news-view-details" v-html="articleData.content">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import BreadCrumbs from '~/components/common/breadCrumbs'

	export default {
		data (){
			return {
				titles: [
					{
						title: '网站首页',
						link: '/'
					},
					{
						title: '详情',
						link: ''
					}
				],
				title: ''
			}
		},
		components: {
			BreadCrumbs
		},
		async asyncData ({params,query,store}){
			let id = params.id;
	    	//详情数据
	    	let articleData = await axios.get(`${process.env.BASE_URL}/api/menu_ad?type=${id}`);
	    	
	    	return {
	    		articleData: articleData.data.data,
	    	}
		},
		mounted (){
	      switch(this.$route.params.id) {
			//   1:注册帮助; 2:Q&A; 3:上传帮助; 4:使用说明;
			case '1': this.title = '注册帮助';break
			case '2': this.title = '问答';break
			case '3': this.title = '上传帮助';break
			case '4': this.title = '使用说明';break
		  }
		}
	}
</script>

<style type="text/css" scoped>
	
	/*News Views details start*/
		.news-view-box {
      overflow:  hidden;
      width:  1200px;
      height:  auto;
			margin:  30px auto 0;
			box-shadow: 0px 0px 43px rgba(141,142,142,0.17);
			-webkit-box-shadow: 0 0 43px rgba(141,142,142,0.17);
			-moz-box-shadow: 0 0 43px rgba(141,142,142,0.17);
			overflow: hidden;
			background: #fff;
			border-radius: 4px;
		}
		.breadCrumbs{
			border-bottom: 1px solid #e4e4e4;
      padding: 0 0 10px;
      margin: 0 20px;
    }
		.news-view-title-box {
      margin-top: 36px;
      line-height: 28px;
      font-family: "é»‘ä½“";
      font-size: 24px;
      font-weight: bold;
      color: #000000;
      text-align: center;
		}

		.article-title {
      margin-top: 36px;
      line-height: 28px;
      font-family: "é»‘ä½“";
      font-size: 24px;
      font-weight: bold;
      color: #000000;
      text-align: center;
  }

		.news-view-info {
      display:  flex;
      overflow:  hidden;
      width:  100%;
      height: 50px;
      justify-content:  center;
      align-items:  center;
      color:  #858585;
      font-size:  14px;
      text-align:  center;
      line-height: 50px;
		}

		.news-view-info div {
      margin: 0 6px;
		}

		.news-view-details {
      width: 100%;
      height:  auto;
      font-size:  16px;
      text-align:  left;
      line-height:  36px;
      padding-bottom: 100px;
      margin: 0 auto;
      width: 1000px;
      overflow: hidden;
    }
    .article-date {
      margin-top: 11px;
      margin-bottom: 10px;
      font-weight: 400;
      font-size: 14px;
      color: #737373;
      text-align: center;
    }
</style>