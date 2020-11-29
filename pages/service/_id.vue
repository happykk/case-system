<template>
	<section class="cotainer">
		<!-- 面包屑部分 -->
		<BreadCrumbs :list="titles"></BreadCrumbs>
		<!-- 面包屑部分结束 -->
		<!-- News View details start-->
		<div id="news-view">
			<div class="news-view-box">
				<div class="news-view-details-wrap">
					<div class="news-view-title-box">
						<div class="news-view-title"><h1>{{title}}</h1></div>
					</div>
					<div class="news-view-details" v-html="articleData.content">
					</div>
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
		div#news-view {
			display: -webkit-flex;
			display: -moz-flex;
			display: -ms-flex;
			display: -o-flex;
			display: flex;
		    width:  100%;
		    height:  auto;
		}

		.news-view-box {
		    overflow:  hidden;
		    width:  1200px;
		    height:  auto;
		    margin:  0 auto;
		}

		.news-view-title-box {
		    width:  100%;
		    height:  auto;
		    padding:  60px 0 48px;
		    border-bottom: 2px solid #d5d5d8;
		    box-sizing:  border-box;
		}

		.news-view-title {
		    overflow:  hidden;
		    width:  100%;
		    height: 68px;
		    color:  #22202b;
		    font-size:  30px;
		    line-height:  68px;
		    text-align:  center;
		}

		.news-view-title h1 {
			 font-size:  30px;
			 font-weight: normal;
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
		    overflow:  hidden;
		    width: 100%;
		    height:  auto;
		    padding: 40px 0;
		    font-size:  14px;
		    text-align:  left;
		    line-height:  20px;
		}
</style>