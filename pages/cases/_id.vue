<template>
	<section class="case-main">
		<!-- 面包屑部分 -->
		<BreadCrumbs :list="titles"></BreadCrumbs>
		<!-- 面包屑部分结束 -->
		<div class="mod-block">
      <div class="article">
        <h3 class="title">{{detail.case_name}}</h3>
        <div class="case-detail">
          <div class="line">
            <span class="label">作者</span>
            <span class="value">{{detail.author}}</span>
          </div>
          <div class="line" v-if="companyList.length>0">
            <span class="label">作者单位</span>
            <span class="value">{{filterCompany(detail.upload_company_id)}}</span>
          </div>
          <div class="line">
            <span class="label">指导者</span>
            <span class="value">{{detail.director_name}}</span>
          </div>
          <div class="line">
            <span class="label">译者</span>
            <span class="value">{{detail.translator_name}}</span>
          </div>
          <div class="line">
            <span class="label">案例语种</span>
            <span class="value">{{detail.language}}</span>
          </div>
          <div class="line">
            <span class="label">适用对象</span>
            <span class="value">{{detail.applicable_object}}</span>
          </div>
          <div class="line">
            <span class="label">适用课程</span>
            <span class="value">{{detail.applicable_courses}}</span>
          </div>
          <div class="line">
            <span class="label">中文关键词</span>
            <span  lass="value">{{detail.chinese_keyword}}</span>
          </div>
          <div class="line">
            <span class="label">英文关键词</span>
            <span class="value">{{detail.english_keyword}}</span>
          </div>
          <div class="line">
            <span class="label">中文摘要</span>
            <p class="value">{{detail.summary}}</p>
          </div>
          <div class="line">
            <span class="label">英文摘要</span>
            <p class="value">{{detail.english_summary}}</p>
          </div>
          <div class="view-link">
            <span class="view-content" @click="viewContent(1)">查看全文</span>
            <span class="view-desc" @click="viewContent(2)">查看说明文档</span>
            <span class="view-desc" @click="download">下载</span>
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
          <li v-if="detail.cat_id">
            <i class="el-icon-menu"></i>
            <span class="val">{{filterCate(detail.cat_id)}}</span>
            <span class="label">分类</span>
          </li>
        </ul>
      </div>
      <div class="comment">
        <textarea class="comment-input" placeholder="写下你的评论..." v-model="content"></textarea>
        <div class="send-btn">
          <reCaptcha :sitekey="sitekey" id="g-recaptcha" ref="gRecaptcha" @getValidateCode='getValidateCode' v-model="check"></reCaptcha>
          <el-button 
            type="primary" round
            :disabled="content.length<1 || !check"
            :loading="formLoading"
            @click="submit">
            发布
          </el-button>
        </div>
        <h3 class="comment-title">
          <div>
            <span>精彩评论</span>
            <span class="num">{{total}}</span>
          </div>
        </h3>
        <div class="comment-list">
          <div class="comm-item" v-for="(item, index) in list" :key="index">
            <img src="~/assets/images/personal/head-pic.png" class="avater">
            <div class="comment-content">
              <span class="user-name">{{item.author_name}}</span>
              <div class="time">{{item.create_time}}</div>
              <div class="content">{{item.content}}</div>
            </div>
          </div>
        </div>
        <el-pagination
          v-if="list>10"
          style="text-align: center; margin: 30px 0"
          layout="total, prev, pager, next"
          :page-size="params.page_size"
          :current-page="params.page_no"
          @current-change="handleCurrentChange"
          :total="total">
        </el-pagination>
      </div>
    </div>
	</section>
</template>

<script>
  import axios from 'axios'
  import reCaptcha from '../login/reCaptcha'
  import BreadCrumbs from '~/components/common/breadCrumbs'
  import { Loading } from 'element-ui'
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
        sitekey: '6LeOsOQZAAAAAEgZzkD2ZE6kuR0vOFE8F2KqZB4x',
        detail: '',
        catList: [],
        formLoading: false,
        list: [],
        total: 0,
        params: {
          "case_id": '',
          "page_no": 1,
          "page_size": 10
        },
        content: '',
        check: '',
        companyList: [],
			}
    },
		components: {
      BreadCrumbs,
      reCaptcha
    },
    head() {
      return {
        // script: [
        //   {
        //     type: 'text/javascript',
        //     src:'https://recaptcha.net/recaptcha/api.js?onload=ReCaptchaLoaded&render=explicit',
        //     body: true
        //   }
        // ]
      }
    },
		async asyncData ({params,query,store}){
			// let id = params.id;
      //评论列表
      // let companyData = await axios.get(`${process.env.BASE_URL}/api/menu?type=2`);

      // return {
      //   companyList: companyData.data.data,
      // }
    },
    methods: {
      getValidateCode(value) {
        this.check = value
      },
      filterCate (val) {
        let cate = this.$store.state.cateData.data.filter(item => item.id==val )
        return cate[0].menu_name
      },
      filterCompany (val) {
        let cate = this.companyList.filter(item => item.id==val )
        return cate[0].menu_name
      },
      submit () {
        if (!this.$store.state.userInfo.Name) {
          this.$message.warning('请登录后进行操作!')
          return
        }
        this.formLoading = true
        let params = {
          case_id: this.params.case_id,
          check: this.check,
          content: this.content
        }
        this.$ajax.get('/api/comment/add', params).then( res => {
          this.formLoading = false
          if (res.code === 0) {
            this.$message.success("发布成功");
            this.check = ''
            this.$refs.gRecaptcha.reset()
            this.content = ''
            this.getData()
          }
        }).catch(() =>{
          this.check = ''
          this.$refs.gRecaptcha.reset()
        })
      },
      handleCurrentChange(val){
        this.params.page_no = val
        this.getData()
      },
      getData () {
        this.$ajax.get('/api/comment/case_comment', this.params).then( res => {
          this.formLoading = false
          if (res && res.code === 0) {
            this.list = res.data.list || []
            this.total = res.data.page.total
          }
        })
      },
      viewContent (type) {
        const loading = Loading.service({ fullscreen: true });
        this.$ajax.get('/api/case/read',{
          type: type,
          case_id: this.params.case_id
        }).then(res => {
          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loading.close()
          })
          if (res) {
            this.total = res.data
            const newurl = this.$router.resolve({
              path: '/viewcase',
              query: {
                _t: this.total,
                type: type,
                case_id: this.params.case_id
              }
            })
            window.open(newurl.href,'_blank')
          }
          // this.$router.push({
          //   path: '/viewcase',
          //   query: {
          //     _t: this.total,
          //     type: type,
          //     case_id: this.params.case_id
          //   }
          // })
        })
      },
      download () {
        let url = this.$store.state.basicUrl+'/api/case/download?case_id='+this.params.case_id
        window.open(url, "_blank");
      }
    },
		async mounted (){
      let companyData = await this.$ajax.get('/api/menu', {type: 2})
      this.companyList = companyData.data
      this.detail = JSON.parse(sessionStorage.getItem('caseDetail'))
      this.params.case_id = this.detail.id
      this.getData()
		}
	}
</script>
<style>
.case-main .rc-anchor{
  box-shadow:none;
}
.case-main .rc-anchor-light.rc-anchor-normal{
  border: 0;
}
.case-main .rc-anchor-light{
  background: transparent;
}
#g-recaptcha {
  width: 304px;
  float: left;
  margin-top: 15px;
  transform:scale(0.77);
  -webkit-transform:scale(0.77);
  transform-origin:0 0;
  -webkit-transform-origin:0 0;
  position: relative;
}
/* #g-recaptcha::after {
  content: '';
  width: 109px;
  height: 70px;
  background: #f9f9f9;
  position: absolute;
  right: 3px;
  top: 2px;
} */
</style>
<style type="text/css" scoped>
  .case-main .mod-block{
    overflow: hidden;
  }
  .article{
    float: left;
    width: 900px;
    background-color: #fff;
    padding: 28px;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .title{
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 30px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
  .case-detail .view-link{
    text-align: center;
    margin-top: 40px;
  }
  .view-link>span{
    display: inline-block;
    padding: 5px 15px;
    border: 1px solid #136fe1;
    color: #136fe1;
    border-radius: 30px;
    margin-right: 10px;
    cursor: pointer;
  }
  .case-detail>div{
    margin-top: 15px;
    font-size: 15px;
    color: #404040;
  }
  .case-intro{
    border-radius: 4px;
    padding: 20px 16px;
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
    color: #8590a6;
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
  .send-btn{
    overflow: hidden;
  }
  .send-btn .el-button{
    margin-top: 16px;
    float: right;
  }
  .line{
    display: flex;
    line-height: 26px;
  }
  .line .label{
    width: 100px;
    color: #767676;
    font-size: 14px;
  }
  .line .value{
    flex: 1;
    font-size: 15px;
  }
</style>