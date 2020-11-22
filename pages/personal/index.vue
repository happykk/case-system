<template>
  <section>
    <!-- 面包屑部分 -->
    <!-- <BreadCrumbs :list="titles"></BreadCrumbs> -->
    <!-- 面包屑部分结束 -->
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
              @click="changeTab(index)"
              :key="index"
              class="menu-list-default"
              :class="{'current': currentTab===index}">
              <i></i><span>{{item}}</span>
            </li>
          </ul>
        </div>
        <div class="manage-entry">
          <img src="~/assets/images/personal/manage-ad.png" >
        </div>
      </div>
      <div class="right-content">
        <div class="bg-box-radius">
          <upDateInfo v-if="currentTab===0" :data="userInfo"></upDateInfo>
          <caseInfo v-if="currentTab===1"></caseInfo>
          <creatCase v-if="currentTab===2"></creatCase>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import {getCookieInClient} from '../../utils/assist'
import upDateInfo from './upDateInfo'
import caseInfo from './caseInfo'
import creatCase from './creatCase'
export default {
  data (){
    return{
      currentTab: 0,
      tabs: ['账号安全', '我的案例', '上传案例'],
      userInfo: {
        Name: '',
        RoleId: '',
        CompanyName: ''
      }
    }
  },
  components: {
    upDateInfo,
    caseInfo,
    creatCase
  },
  head () {
    return {
      title: '个人中心'
    }
  },
  async asyncData(context){
    // let _xsrfList = getCookieInClient('_xsrf')
    // let xsrf = window.atob(_xsrfList.split('|')[0])
    // let userData = await context.app.$ajax.get('/api/user/info')
    // return {
    //   userInfo: userData.data
    // }
  },
  methods: {
    changeTab (index) {
      this.currentTab = index
    }
  },
  mounted () {
    let _xsrfList = getCookieInClient('_xsrf')
    let xsrf = window.atob(_xsrfList.split('|')[0])
    this.$ajax.get('/api/user/info', {xsrf: xsrf}).then((res) => {
      this.userInfo = res.data
      // sessionStorage.setItem('user', res.data.Name)
    })
  }
}
</script>

<style scoped>
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
  .account-num-box {
      min-height: 400px;
    padding: 40px 80px;
  }
  .account-num-box p {
    margin-top: 28px;
    overflow: hidden;
  }
  .account-num-box p .account-title {
    width: 56px;
    text-align: right;
    margin-right: 23px;
    color: #bbbbbb;
  }
  .account-num-box p > span {
    margin-top: -4px;
    float: left;
    color: #444444;
    font-size: 14px;
    vertical-align: middle;
    *vertical-align: auto;
    zoom: 1;
    *display: inline;
  }
  .account-num-box p .account-tips-text {
    width: 380px;
    color: #666666;
  }
  .account-num-box p > a {
    vertical-align: middle;
    *vertical-align: auto;
    zoom: 1;
    width: 120px;
    height: 36px;
    line-height: 36px;
    float: right;
    font-size: 14px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin-left: 10px;
  }
  .btn-default-main {
    color: #444444;
    color: #136fe1;
    border: 1px solid #136fe1;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
  }
  .form-box{
    width: 350px;
    margin: 0 auto;
  }
  </style>