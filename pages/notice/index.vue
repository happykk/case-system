<template>
	<section class="container">
		<!-- 面包屑部分 -->
    <BreadCrumbs :list="titles"></BreadCrumbs>
		<!-- 面包屑部分结束 -->
    <div class="news-main">
      <ul class="recom-info-content">
        <li class="recom-info-list" v-for="(list) in recomInfo" :key="list.id">
          <nuxt-link target="_blank" class="recom-info-title" :to="{name: 'news-newsView-id',params:{id:list.id}}">
            <i></i>
            <h2>{{list.title}}</h2>
            <span class="recom-info-times">{{list.update_time.split(' ')[0]}}</span>
          </nuxt-link>
        </li>
      </ul>
      <el-pagination
        background
        style="text-align: center;"
        layout="prev, pager, next"
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
            title: '通知公告',
            link: '/notice'
          },
        ],
        formData: {
          type: 2,
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
		    title:'通知公告'
		  }
		},
		async asyncData(context){
			//推荐资讯
        let recomData = await context.app.$ajax.get(`/api/article/list?type=2&page_no=1&page_size=3`);
        return {
          recomInfo: recomData.data.list,
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
      handleCurrentChange(val){
        this.getData()
      },
      getData(){
        axios(`${process.env.BASE_URL}/api/article/list`,{
          params: this.formData
        }).then( (res) => {
          this.recomInfo = this.recomInfo.concat(res.data)
        })
      }
    }
	}
	
</script>

<style scoped>
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