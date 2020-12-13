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
            <td v-if="detail.cat_id">{{filterCate(detail.cat_id)}}</td>
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
            <td>{{detail.upload_name}}</td>
          </tr>
          <tr v-if="companyList.length>0">
            <th>上传者单位：</th>
            <td v-if="detail.upload_company_id">{{filterCompany(detail.upload_company_id)}}</td>
          </tr>
          <tr>
            <th>案例入库时间：</th>
            <td>{{detail.create_time}}</td>
          </tr>
           <tr>
            <th>查看全文：</th>
            <td><span @click="viewContent(1)">查看</span></td>
          </tr>
          <tr>
            <th>查看案例使用说明：</th>
            <td><span @click="viewContent(2)">查看</span></td>
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
        <div class="comment">
          <p>评语</p>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入评语"
            v-model="dialogForm.comment">
          </el-input>
        </div>
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
						title: '待审案例',
						link: '/personal/caseInfo'
					},
					{
						title: '案例信息',
						link: ''
					}
        ],
        detail: '',
        catList: [],
        companyList: [],
        dialogVisible: false,
        formLoading: false,
        dialogForm: {
          operating: '',
          id: '',
          comment: ''
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
      filterCate (val) {
        let cate = this.catList.filter(item => item.id==val )
        return cate[0].menu_name
      },
      filterCompany (val) {
        let cate = this.companyList.filter(item => item.id==val )
        return cate[0].menu_name
      },
      showDialog () {
        this.dialogVisible = true
        this.dialogForm.id = this.detail.id
      },
      submit () {
        this.formLoading = true
        this.$ajax.get('/api/case/check_case', this.dialogForm).then( res => {
          this.formLoading = false
          if (res && res.code === 0) {
            this.$message.success("操作成功");
            this.dialogVisible = false
            setTimeout(()=>{
              this.$router.go(-1)
            },1000)
          }
        })
      },
      viewContent (type) {
        const loading = Loading.service({ fullscreen: true });
        this.$ajax.get('/api/case/read',{
          type: type,
          case_id: this.params.case_id
        }).then(res => {
          if (res) {
            this.total = res.data
            this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
              loading.close();
            });
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
        })
      }
    },
		async mounted (){
      let companyData = await this.$ajax.get('/api/menu', {type: 2})
      let cateData = await this.$ajax.get('/api/menu', {type: 3})
      this.companyList = companyData.data
      this.catList = cateData.data
      this.detail = JSON.parse(sessionStorage.getItem('caseDetail'))
		}
	}
</script>

<style type="text/css" scoped>
	/*面包屑部分*/
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
  .case-detail .infotable td span{
    cursor: pointer;
  }
  .detail-foot{
    width: 800px;
    text-align: center;
    margin: 20px 0 20px 20px;
  }
  .comment{
    margin-top: 20px;
    padding: 0 50px 0 20px;
  }
  .comment p{
    text-align: left;
    margin-bottom: 5px;
  }
</style>