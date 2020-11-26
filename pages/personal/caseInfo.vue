<template>
  <section>
    <div class="personal-main">
      <div class="left-menu">
        <div class="card-media personal-card">
          <div class="avatar-container-80 z-center">
            <img src="~/assets/images/personal/head-pic.png" >
          </div>
          <div class="presonal-info">
            <span class="author-name">{{userInfo.Name}}</span>
          </div>
          <div class="position-info">
            <span>{{userInfo.RoleId?'老师':'学生'}}&nbsp;| {{userInfo.CompanyName}}</span>
          </div>
        </div>
        <div class="personal-menu">
          <ul class="menu-list">
            <li v-for="(item, index) in tabs"
              :key="index"
              class="menu-list-default"
              :class="{'current': currentTab===index}">
              <nuxt-link :to="item.link">
                <i></i><span>{{item.name}}</span>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="manage-entry">
          <img src="~/assets/images/personal/manage-ad.png" >
        </div>
      </div>
      <div class="right-content">
        <div class="bg-box-radius">
          <div class="case-list">
            <div class="case-item" v-for="(item, index) in caseData.list" :key="index">
              <h3 @click="toDetail(item)">{{item.case_name}}</h3>
              <div class="case-desc">{{item.summary}}</div>
              <div class="case-info">
                <span>作者: {{item.author}}</span>
                <span>作者单位：{{item.author_company}}</span>
                <span>入库时间: {{item.create_time.split(' ')[0]}}</span>
              </div>
            </div>
          </div>
          <div class="empty" v-if="caseData.list.length<1">
            <img src="../../assets/images/empty.png" alt="">
            <p>暂时没有数据~</p>
          </div>
          <el-pagination
            background
            style="text-align: center; margin: 30px 0"
            layout="prev, pager, next"
            :page-size="searchForm.page_no"
            @current-change="handleCurrentChange"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import {getCookieInClient} from '../../utils/assist'
export default {
  data (){
    return{
      currentTab: 3,
      tabs: [
        {name: '账号安全', link: '/personal'},
        {name: '我的案例', link: '/personal/myCase'},
        {name: '上传案例', link: '/personal/creatCase'},
        {name: '案例审核', link: '/personal/caseInfo'}
      ],
      userInfo: '',
      total: 0,
      searchForm: {
        page_no: 1,
        page_size: 10
      },
    }
  },
  components: {
    
  },
  head () {
    return {
      title: '个人中心'
    }
  },
  async asyncData(context){
    let recomData = await context.app.$ajax.get('/api/case/check_case_list?page_no=1&page_size=10')
    return {
      caseData: recomData.data
    }
  },
  methods: {
    handleCurrentChange(val){
      this.getData()
    },
    getData(){
      this.$ajax.get(`/api/case/check_case_list`, this.searchForm).then( (res) => {
        this.caseData.list = this.caseData.list.concat(res.data.list || [])
      })
    },
    toDetail (row) {
      sessionStorage.setItem('caseDetail', JSON.stringify(row))
      this.$router.push({path: `/personal/${row.id}`})
    }
  },
  mounted () {
    // let xsrf
    // if (getCookieInClient('_xsrf')) {
    //   let _xsrfList = getCookieInClient('_xsrf')
    //   xsrf = window.atob(_xsrfList.split('|')[0])
    // }
    this.$ajax.get('/api/user/info').then((res) => {
      this.userInfo = res.data
      // sessionStorage.setItem('user', res.data.Name)
    })
  }
}
</script>

<style scoped>
  .personal-main {
    overflow:  hidden;
    width:  1200px;
    height:  auto;
    margin:  20px auto 0;
    overflow: hidden;
  }
  .left-menu{
    float: left;
    width: 210px;
  }
  .personal-card{
    text-align: center;
    margin-bottom: 10px;
    padding: 30px 0 20px;
  }
  .avatar {
    margin: 0 auto;
  }
  .avatar img{
    border-radius: 50%;
    display: block;
  }
  .personal-card, .personal-menu{
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
  }
  .personal-card .presonal-info{
    margin: 16px 0 0;
  }
  .personal-card .presonal-info .author-name{
    font-size: 16px;
    font-weight: 600;
  }
  .personal-card .position-info{
    margin-bottom: 10px;
  }
  .personal-card .position-info span{
    font-size: 12px;
    color: #bbb;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .personal-menu .menu-list li {
    background: #fff;
    position: relative;
    cursor: pointer;
  }
  .personal-menu .menu-list li:hover{
    background: #136fe1;
    color: #fff;
  }
  .personal-menu .menu-list .menu-list-default.current i {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 10px;
    width: 3px;
    height: 32px;
    background: #136fe1;
    vertical-align: middle;
  }
  .personal-menu span {
    display: block;
    color: #333;
    height: 52px;
    line-height: 52px;
    padding: 0 30px;
    position: relative;
  }
  .manage-entry{
    margin-top: 10px;
  }
  .manage-entry img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    display: block;
  }
  .right-content{
    margin-left: 230px;
  }
  .bg-box-radius {
    border-radius: 4px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    background: #fff;
  }
  .empty{
    padding: 40px 0;
    text-align: center;
  }
  .empty img{
    width: 280px;
    height: 165px;
    vertical-align: middle;
  }
  .empty p{
    color: #666;
    margin: 26px 0 16px;
  }
  .case-list{
    background: #fff;
    border-radius: 8px;
    padding: 10px 20px 20px;
  }
  .case-item{
    padding: 10px 0;
    border-bottom: 1px solid #DCDFE6;
  }
  .case-item h3{
    cursor: pointer;
    font-size: 18px;
    color: #121212;
    margin-bottom: 6px;
  }
  .case-item h3:hover{
    color: #136fe1;
  }
  .case-desc{
    font-size: 15px;
    color: #121212;
    display: -webkit-box;
    /* autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .case-info{
    color: #bcbcbc;
    font-size: 12px;
    margin-top: 6px;
  }
  .case-info span{
    margin-right: 15px;
  }
  
</style>