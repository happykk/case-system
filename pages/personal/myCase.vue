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
        <div class="tab-box">
          <span
            v-for="(item, index) in tablist"
            :key="index"
            :class="[ {'active': current==index}]"
            @click="setTab(item,index)"
          >{{item}}</span>
        </div>
        <div class="bg-box-radius">
          <div class="case-list">
            <div class="case-item" v-for="(item, index) in caseData" :key="index">
              <h3 @click="toCaseDetail(item)">{{item.case_name}}</h3>
              <div class="case-desc">{{item.summary}}</div>
              <div class="case-info">
                <span>作者: {{item.author}}</span>
                <span>作者单位：{{item.author_company}}</span>
                <span class="fr" v-if="item.create_time">入库时间: {{item.create_time.split(' ')[0]}}</span>
              </div>
            </div>
          </div>
          <div class="empty" v-if="caseData.length<1">
            <img src="../../assets/images/empty.png" alt="">
            <p>{{current===0?'你还没有上传案例':'没有任何数据~'}}</p>
            <el-button type="primary" @click="toCreatCase" v-if="current===0">新建案例</el-button>
          </div>
          <el-pagination
            v-if="caseData.length>0"
            background
            style="text-align: center; margin: 30px 0"
            layout="prev, pager, next"
            :page-size="searchForm.page_size"
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
      currentTab: 1,
      tabs: [
        {name: '账号安全', link: '/personal'},
        {name: '我的案例', link: '/personal/myCase'},
        {name: '上传案例', link: '/personal/creatCase'},
        {name: '案例审核', link: '/personal/caseInfo'}
      ],
      tablist: ['已通过','未通过','审核中'],
      userInfo: '',
      current: 0,
      total: 0,
      searchForm: {
        page_no: 1,
        page_size: 10
      },
      caseData: []
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
    // let recomData = await context.app.$ajax.get('/api/case/my_case?page_no=1&page_size=10')
    // return {
    //   caseData: recomData.data,
    //   total: recomData.data.page.total
    // }
  },
  methods: {
    setTab (val,index) {
      if (index === this.current) return
      this.current = index
      this.searchForm.page_no = 1
      this.caseData = []
      this.getData()
    },
    toCaseDetail (row) {
      if (this.current === 0){
        sessionStorage.setItem('caseDetail', JSON.stringify(row))
        this.$router.push({path: `/cases/${row.id}`})
      } else {
        this.$router.push({path: '/personal/creatCase',query: {id: row.id}})
      }
    },
    toCreatCase () {
      this.$router.push('/personal/creatCase')
    },
    handleCurrentChange(val){
      this.searchForm.page_no = val
      this.getData()
    },
    getData(){
      let params = Object.assign({}, this.searchForm)
      if (this.current === 1) {
        params.logic_check = 2
      } else if(this.current === 2) {
        params.logic_check = 0
      } else {
        params.logic_check = 1
      }
      this.$ajax.get('/api/case/my_case', params).then( (res) => {
        if (res) {
          this.caseData = res.data.list || []
          this.total = res.data.page.total
        }
      })
    }
  },
  mounted () {
    // this.total = this.caseData.page.total
    // let xsrf
    // if (getCookieInClient('_xsrf')) {
    //   let _xsrfList = getCookieInClient('_xsrf')
    //   xsrf = window.atob(_xsrfList.split('|')[0])
    // }
    if (!this.$store.state.userInfo.Name) {
      this.$ajax.get('/api/user/info').then((res) => {
        if (res) {
          this.userInfo = res.data
          if (this.userInfo.Check) {
            this.tabs.push({name: '案例审核', link: '/personal/caseInfo'})
          }
          this.$store.commit('setUserInfo', this.userInfo)
        }
      })
    } else {
      this.userInfo = this.$store.state.userInfo
    }
    this.getData()
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
    overflow: hidden;
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
    font-size: 20px;
    color: #7e8c8d;
    margin-bottom: 6px;
    cursor: pointer;
  }
  .case-item h3:hover{
    color: #136fe1;
  }
  .case-desc{
    font-size: 14px;
    color: #333;
    padding: 15px 0;
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
  .tab-box{
    height: 65px;
    font-size: 14px;
    color: #999;
    padding: 0 30px;
    position: relative;
    border-radius: 4px;
    background: #fff;
    margin-bottom: 20px;
  }
  .tab-box span{
    display: inline-block;
    line-height: 64px;
    margin-right: 50px;
    cursor: pointer;
  }
  .tab-box .active {
    color: #444;
    border-bottom: 2px solid #444;
  }
</style>