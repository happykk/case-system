<template>
	<section class="case-detail">
		<!-- 面包屑部分 -->
		<BreadCrumbs :list="titles"></BreadCrumbs>
		<!-- 面包屑部分结束 -->
		<div class="mod-block">
      <table cellspacing="2" cellpadding="0" class="infotable">
        <tbody>
          <tr>
            <th>案例名称：</th>
            <td>{{detail.case_name}}</td>
          </tr>
          <tr>
            <th>分类：</th>
            <td>{{detail.cat_id}}</td>
          </tr>
          <tr>
            <th>案例作者：</th>
            <td>{{detail.author}}</td>
          </tr>
          <tr>
            <th>作者单位：</th>
            <td>{{detail.author_company}}</td>
          </tr>
          <tr>
            <th>指导者：</th>
            <td>{{detail.director_name}}</td>
          </tr>
          <tr>
            <th>译者：</th>
            <td>{{detail.translator_name}}</td>
          </tr>
          <tr>
            <th>案例语种：</th>
            <td>{{detail.language}}</td>
          </tr>
          <tr>
            <th>中文关键词：</th>
            <td>{{detail.chinese_keyword}}</td>
          </tr>
          <tr>
            <th>英文关键词：</th>
            <td>{{detail.english_keyword}}</td>
          </tr>
          <tr>
            <th>中文摘要：</th>
            <td>{{detail.summary}}</td>
          </tr>
          <tr>
            <th>英文摘要： </th>
            <td>{{detail.english_summary}}</td>
          </tr>
          <tr>
            <th>适用对象： </th>
            <td>{{detail.applicable_object}}</td>
          </tr>
          <tr>
            <th>适用课程：</th>
            <td>{{detail.applicable_courses}}</td>
          </tr>
          <tr>
            <th>上传者：</th>
            <td>{{detail.applicable_object}}</td>
          </tr>
          <tr>
            <th>上传者单位：</th>
            <td>{{detail.upload_company_id}}</td>
          </tr>
          <tr>
            <th>案例入库时间：</th>
            <td>{{detail.create_time}}</td>
          </tr>
           <tr>
            <th>查看全文：</th>
            <td><a href="" target="_blank">查看</a></td>
          </tr>
          <tr>
            <th>查看案例使用说明：</th>
            <td><a href="" target="_blank">查看</a></td>
          </tr>
        </tbody>
      </table>
      <div class="detail-foot">
        <!-- <el-button type="primary">查看全文</el-button>
        <el-button type="primary" plain>案例使用说明</el-button> -->
        <el-button type="primary" @click="showDialog">案例审核</el-button>
      </div>
    </div>
    <el-dialog
      title="案例审核"
      :visible.sync="dialogVisible"
      width="30%"
      center
      >
      <div style="text-align: center;">
        <el-radio v-model="dialogForm.operating" label="1" border>审核通过</el-radio>
        <el-radio v-model="dialogForm.operating" label="2" border>审核不通过</el-radio>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit" :loading="formLoading">确 定</el-button>
      </span>
    </el-dialog>
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
  .mod-block{
    background: #fff;
    overflow: hidden;
  }
  .case-detail .infotable{
    margin: 30px 0 30px 30px;
    width: 800px;
    border-collapse: separate;
  }
  .case-detail .infotable tr{
    height: 36px;
  }
  .case-detail .infotable th{
    width: 220px;
    background: #EBEBEB;
  }
  .case-detail .infotable td{
    background: #f4f5f9;
    padding-left: 10px;
  }
  .detail-foot{
    width: 800px;
    text-align: center;
    margin: 20px 0 20px 20px;
  }
</style>