<template>
  <section class="login-container">
    <div class="login-box">
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input placeholder="请输入邮箱" v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop='check'>
          <reCaptcha :sitekey="sitekey" @getValidateCode='getValidateCode' v-model="loginForm.check"></reCaptcha>
         <!-- <vue-recaptcha :sitekey="sitekey" :loadRecaptchaScript="true"></vue-recaptcha> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button >注册</el-button>
          <span class="forget" @click="toUpdatePass">忘记密码？</span>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>
<script>
import axios from 'axios'
import reCaptcha from './reCaptcha'
import {getCookieInClient} from '../../utils/assist'
import md5 from 'js-md5'
// import VueRecaptcha from 'vue-recaptcha';
export default {
  // 下面的两种方式都可以；layout属性其实是将这个vue页面跟布局vue进行关联的属性，layout的值为layout文件夹下所对应布局的名字
  // layout: 'custom_layout',
  layout: function (context) {
    return "login";
  },
  components: { reCaptcha },
  data (){
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    var checkCode = (rule, value, callback) => {
      if (value == false) {
        callback(new Error('请进行人机验证'));
      } else {
        callback();
      }
    };
    return{
      loginForm: {
        username: '',
        password: '',
        check: ''
      },
      sitekey: '6LeOsOQZAAAAAEgZzkD2ZE6kuR0vOFE8F2KqZB4x',
      rules: {
        username: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        check: [
          { validator: checkCode, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    getValidateCode(value) {
      this.loginForm.check = value
    },
    submitForm () {
      this.$refs.loginForm.validate((valid) => {
        let password = md5(this.loginForm.password)
        console.log(this.loginForm.password)
        let params = Object.assign({}, this.loginForm, {password: password})
        if (valid) {
          this.$ajax.post(`/api/login`, params).then((data) => {
            if (data) {
              this.$router.push('/personal')
            }
          })
        }
      })
    },
    toUpdatePass () {
      this.$router.push({
        path: '/login/upDatePass',
        query: {
          type: 1
        }
      })
    }
  },
  mounted () {
  }
};
</script>
<style scoped>
.login-container{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  background: url(https://img.alicdn.com/tfs/TB1Xfrcaq61gK0jSZFlXXXDKFXa-5158-3434.jpg?x-oss-process=image/resize,w_2048) center center no-repeat fixed;
}
.login-box{
  width: 350px;
  padding: 20px;
  margin: auto;
  margin-top: 150px;
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: rgba(255,255,255, 0.85);
}
.el-form{
  margin-top: 50px;
}
.el-form .el-input__inner{
  background-color: transparent;
  color: rgba(0, 0, 0, 0.87);
}
.forget{
  cursor: pointer;
  float: right;
  font-size: 12px;
  color: #136fe1;
}
</style>
