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
          <div class="account-num-box">
            <p class="first-line">
              <span class="account-title">电话</span>
              <span class="account-tips-text">
                <span>{{userInfo.Phone}}</span>
              </span>
              <a href="#" class="btn-default-main" @click.prevent="showDialog('phone')">修改</a>
            </p>
            <p class="first-line">
              <span class="account-title">微信</span>
              <span class="account-tips-text">
                <span>{{userInfo.Wechat}}</span>
              </span>
              <a href="#" class="btn-default-main" @click.prevent="showDialog('wechat')">修改</a>
            </p>
            <p>
              <span class="account-title">邮箱帐号</span>
              <span class="account-tips-text">
                <span>{{userInfo.Mail}}</span>
              </span>
              <a href="#" class="btn-default-main" @click.prevent="showDialog('mail')">修改</a>
            </p>
            <p>
              <span class="account-title">登录密码</span>
              <span class="account-tips-text two-line-txt">密码要求至少包含字母，符号或数字中的两项且长度超过8位，建议您经常修改密码，以保证帐号更加安全。</span>
              <a href="#" class="btn-default-main" @click.prevent="toUpdatePass">修改</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="修改信息" :visible.sync="dialogVisible" width="450px" :before-close="closeDialog">
      <el-form class="form-box" :model="editInfo" :rules="formRules" ref="dynamicValidateForm">
        <el-form-item prop="phone" v-if="type=='phone'">
          <el-input v-model="editInfo.phone" placeholder="请输入新手机号"></el-input>
        </el-form-item>
        <el-form-item prop="wechat" v-if="type=='wechat'">
          <el-input v-model="editInfo.wechat" placeholder="请输入新微信号"></el-input>
        </el-form-item>
        <el-form-item prop="mail" v-if="type=='mail'">
          <el-input v-model="editInfo.mail" placeholder="请输入新邮箱"></el-input>
        </el-form-item>
        <el-form-item prop='check' v-if="editInfo.mail">
          <reCaptcha :sitekey="sitekey" @getValidateCode='getValidateCode' v-model="editInfo.check"></reCaptcha>
        </el-form-item>
        <el-form-item prop="code" v-if="type=='mail'">
          <el-col :span="14">
            <el-input v-model="editInfo.code" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col style="text-align: center;" :span="2">-</el-col>
          <el-col :span="8">
            <el-button v-show="show" @click="sendCode">获取验证码</el-button>
            <el-button v-show="!show" disabled>{{count}} s</el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="updateInfo">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import {getCookieInClient} from '../../utils/assist'
import reCaptcha from '../login/reCaptcha'
export default {
  data (){
    var validatePhone = (rule, value, callback) => {
      if (!value || value.trim() == '') {
        return callback()
      }
      if (!(/^1[3456789]\d{9}$/g.test(value))) {
        return callback(new Error('请输入正确的手机号'))
      }
      return callback()
    };
    var checkCode = (rule, value, callback) => {
      if (value == false) {
        callback(new Error('请进行人机验证'));
      } else {
        callback();
      }
    };
    return{
      currentTab: 0,
      tabs: [
        {name: '账号安全', link: '/personal'},
        {name: '我的案例', link: '/personal/myCase'},
        {name: '上传案例', link: '/personal/creatCase'}
      ],
      userInfo: {
        Name: '',
        RoleId: '',
        CompanyName: ''
      },
      dialogVisible: false,
      type: '',
      editInfo: {
        phone: '',
        wechat: '',
        mail: '',
        code: '',
        check: ''
      },
      formRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur"},
          { validator: validatePhone, trigger: 'blur'}
        ],
        wechat: [
          { required: true, message: "请输入微信号",trigger: "blur"}
        ],
        mail: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        code: [
          { required: true, message: "请输入邮箱验证码",trigger: "blur"}
        ],
        check: [
          { validator: checkCode, trigger: 'change' }
        ]
      },
      sitekey: '6LeOsOQZAAAAAEgZzkD2ZE6kuR0vOFE8F2KqZB4x',
      show: true,
      count: '',
      timer: null,
    }
  },
  components: {
    reCaptcha
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
    closeDialog () {
      this.$refs['dynamicValidateForm'].resetFields()
      this.dialogVisible = false
    },
    showDialog (key) {
      this.dialogVisible = true
      this.type = key
    },
    updateInfo(){
      this.$refs['dynamicValidateForm'].validate((valid) => {
        if (valid) {
          let {phone, wechat, mail, code} = this.editInfo
          let params = {
            key: this.type,
            word: phone || wechat || mail,
          }
          if (this.type === 'mail') {
            params.code = code
          }
          this.$ajax.get('/api/user/update', params).then((res) => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              setTimeout(()=>{
                this.$router.push('/login')
              },1000)
            }
          })
        }
      })
      
    },
    sendCode () {
      if (this.editInfo.mail && this.editInfo.check) {
        this.$ajax.get('/api/send_mail_check',{
          mail: this.editInfo.mail,
          check: this.editInfo.check
        }).then(res => {
          this. getCode()
        })
      }
    },
    toUpdatePass () {
      this.$router.push('/login/upDatePass')
    },
    getCode(){
     const TIME_COUNT = 60;
     if (!this.timer) {
       this.count = TIME_COUNT;
       this.show = false;
       this.timer = setInterval(() => {
       if (this.count > 0 && this.count <= TIME_COUNT) {
         this.count--;
        } else {
         this.show = true;
         clearInterval(this.timer);
         this.timer = null;
        }
       }, 1000)
      }
    },
    getValidateCode(value) {
      this.editInfo.check = value
    }
  },
  created () {
    // let xsrf
    // if (getCookieInClient('_xsrf')) {
    //   let _xsrfList = getCookieInClient('_xsrf')
    //   xsrf = window.atob(_xsrfList.split('|')[0])
    // }
    this.$ajax.get('/api/user/info').then((res) => {
      this.userInfo = res.data
      if (this.userInfo.Check) {
        this.tabs.push({name: '案例审核', link: '/personal/caseInfo'})
      }
      this.$store.commit('setUserInfo', this.userInfo)
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