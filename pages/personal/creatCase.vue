<template>
  <section class="personal-main">
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
        <div class="creat-case">
          <el-steps :active="stepIndex" finish-status="success">
            <el-step title="填写基本信息"></el-step>
            <el-step title="上传资料"></el-step>
            <el-step title="发布成功"></el-step>
          </el-steps>
          <component :is="step" @stepChange="stepChange"></component>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
// import {getCookieInClient} from '../../utils/assist'
import step1 from '../../components/case/publish-step1'
import step2 from '../../components/case/publish-step2'
import step3 from '../../components/case/publish-step3'
export default {
  data (){
    return{
      stepIndex: 1,
      step: 'step1',
      currentTab: 2,
      tabs: [
        {name: '账号安全', link: '/personal'},
        {name: '我的案例', link: '/personal/myCase'},
        {name: '上传案例', link: '/personal/creatCase'},
        {name: '案例审核', link: '/personal/caseInfo'}
      ],
      userInfo: ''
    }
  },
  components: {
    step1,
    step2,
    step3,
  },
  methods: {
    stepChange (index) {
      this.stepIndex = index
      this.step = 'step' + index
    }
  },
  created () {
    // let index = sessionStorage.getItem('xiaobuStepIndex') || 1
    // index = Number(index)
    // if (index) {
    //   this.stepIndex = index
    //   this.step = 'step' + index
    // }
    if (!this.$store.state.userInfo.Name) {
      this.$ajax.get('/api/user/info').then((res) => {
        this.userInfo = res.data
        if (this.userInfo.Check) {
          this.tabs.push({name: '案例审核', link: '/personal/caseInfo'})
        }
        this.$store.commit('setUserInfo', this.userInfo)
      })
    } else {
      this.userInfo = this.$store.state.userInfo
    }
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
.creat-case{
  padding: 40px;
}
.step-box{
  margin-bottom: 20px;
}
</style>