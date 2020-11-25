<template>
	<section class="case-main">
		<!-- 面包屑部分 -->
		<BreadCrumbs :list="titles"></BreadCrumbs>
		<!-- 面包屑部分结束 -->
		<div class="mod-block">
      <div class="article">
        <h3 class="title">{{detail.case_name}}</h3>
        <div class="case-detail">
          <div><span>【指导者】</span>{{detail.director_name}}</div>
          <div><span>【译者】</span>{{detail.translator_name}}</div>
          <div><span>【上传者】</span>{{detail.applicable_object}}</div>
          <div><span>【上传者单位】</span>{{detail.upload_company_id}}</div>
          <div><span>【案例语种】</span>{{detail.language}}</div>
          <div><span>【适用对象】</span>{{detail.applicable_object}}</div>
          <div><span>【适用课程】</span>{{detail.applicable_courses}}</div>
          <div><span>【中文关键词】</span>{{detail.chinese_keyword}}</div>
          <div><span>【英文关键词】</span>{{detail.english_keyword}}</div>
          <div>
            <span>【中文摘要】</span>
            <p>{{detail.summary}}</p>
          </div>
          <div>
            <span>【英文摘要】</span>
            <p>{{detail.english_summary}}</p>
          </div>
        </div>
      </div>
      <div class="case-intro">
        <h2>案例简介</h2>
        <ul class="intro-block">
          <li>
            <i class="el-icon-user-solid"></i>
            <span class="val">{{detail.author}}</span>
            <span class="label">案例作者</span>
          </li>
          <li>
            <i class="el-icon-school"></i>
            <span class="val">{{detail.author_company}}</span>
            <span class="label">作者单位</span>
          </li>
          <li v-if="detail.create_time">
            <i class="el-icon-time"></i>
            <span class="val">{{detail.create_time.split(' ')[0]}}</span>
            <span class="label">入库时间</span>
          </li>
          <li>
            <i class="el-icon-menu"></i>
            <span class="val">{{detail.cat_id}}</span>
            <span class="label">分类</span>
          </li>
        </ul>
      </div>
      <div class="comment">
        <textarea class="comment-input" placeholder="写下你的评论..."></textarea>
        <h3 class="comment-title">
          <div>
            <span>精彩评论</span>
            <span class="num">3</span>
          </div>
        </h3>
        <div class="comment-list">
          <div class="comm-item">
            <img src="~/assets/images/personal/head-pic.png" class="avater">
            <div class="comment-content">
              <span class="user-name">爱笑的架构师</span>
              <div class="time">2020-11-25 10:30</div>
              <div class="content">话说这条是广告</div>
            </div>
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
						title: '案例库',
						link: '/cases'
					},
					{
						title: '案例信息',
						link: ''
					}
        ],
        detail: '',
        catList: [],
        dialogVisible: false,
        formLoading: false,
        dialogForm: {
          operating: '',
          id: ''
        }
			}
    },
    filters: {
      catFilters (val) {

      }
    },
		components: {
			BreadCrumbs
		},
		async asyncData ({params,query,store}){
			// let id = params.id;
      // //详情数据
      // let articleData = await axios.get(`${process.env.BASE_URL}/api/article/text?id=${id}`);

      // return {
      //   articleData: articleData.data.data,
      // }
    },
    methods: {
      getCateList () {
        this.$ajax.get('/api/menu', {type: 3}).then( res => {
          this.catList = res.data
        })
      },
      showDialog () {
        this.dialogVisible = true
        this.dialogForm.id = this.detail.id
      },
      submit () {
        this.formLoading = true
        this.$ajax.get('/api/case/check_case', this.dialogForm).then( res => {
          this.formLoading = false
          if (res.code === 0) {
            this.$message.success("操作成功");
            this.dialogVisible = false
            setTimeout(()=>{
              this.$router.go(-1)
            },1000)
          }
        })
      }
    },
		mounted (){
      this.detail = JSON.parse(sessionStorage.getItem('caseDetail'))
      this.getCateList()
		}
	}
</script>

<style type="text/css" scoped>
	/*面包屑部分*/
  div#bread-nav {
    width:  100%;
    height:  auto;
  }
  #bread-nav{
    position: relative;
  }
  #bread-nav .brand-nav-content{
    float: left;
  }
  .brand-nav-box {
    width:  1200px;
    margin:  0 auto;
    color:  #858585;
    font-size: 14px;
    text-align:  left;
    line-height: 70px;
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
  .case-main .mod-block{
    overflow: hidden;
    padding: 20px 0;
  }
  .article{
    float: left;
    width: 900px;
    background-color: #fff;
    padding: 32px;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .title{
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 15px;
  }
  .case-detail>div{
    margin-top: 15px;
    font-size: 15px;
    color: #404040;
  }
  .case-detail span{
    font-size: 14px;
    font-weight: 600;
    margin-right: 10px;
    color: #333;
  }
  .case-detail p{
    margin-top: 5px;
    line-height: 24px;
  }
  .case-intro{
    border-radius: 4px;
    padding: 16px;
    float: right;
    width: 280px;
    background: #fff;
    margin-bottom: 20px;
  }
  .case-intro h2{
    line-height: 48px;
    font-size: 16px;
    text-align: center;
    border-bottom: 1px solid #eee;
    margin: 0 10px;
  }
  .case-intro .intro-block li{
    float: left;
    width: 50%;
    height: 110px;
    text-align: center;
  }
  .case-intro .intro-block li i{
    display: block;
    font-size: 24px;
    color: #136fe1;
    margin: 25px auto 10px auto;
  }
  .case-intro .intro-block li .val{
    display: block;
    font-size: 16px;
    color: #333;
    overflow: hidden;
    height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .case-intro .intro-block li .label{
    margin-top: 2px;
    display: block;
    color: #999;
  }
  .comment{
    width: 900px;
    margin-top: 20px;
    padding: 32px;
    clear: both;
    background-color: #fff;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .comment-input{
    padding: 12px 16px;
    width: 100%;
    height: 90px;
    font-size: 13px;
    border: 1px solid #eee;
    border-radius: 4px;
    background-color: #fafafa;
    resize: none;
    display: inline-block;
    vertical-align: top;
    outline-style: none;
  }
  .comment-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-left: 12px;
    border-left: 4px solid #136fe1;
    font-size: 18px;
    font-weight: 500;
    height: 20px;
    line-height: 20px;
    margin-top: 36px;
  }
  .comment-title .num {
    margin-left: 6px;
    font-size: 14px;
    font-weight: normal;
  }
  .comment-list{
    margin-top: 30px;
  }
  .comm-item {
    display: flex;
  }
  .comm-item .avater{
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
  .comment-content{
    padding-bottom: 10px;
    border-bottom: 1px solid #f1f1f1;
    margin-left: 10px;
    flex: 1 1 auto;
  }
  .comment-content .user-name{
    font-size: 15px;
    font-weight: 500;
  }
  .comment-content .time{
    margin-top: 2px;
    font-size: 12px;
    color: #969696;
  }
  .comment-content .content{
    margin-top: 10px;
    font-size: 16px;
    line-height: 1.5;
    word-break: break-word;
  }
</style>