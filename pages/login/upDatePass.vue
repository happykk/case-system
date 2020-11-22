<template>
  <section class="login-container">
    <div class="login-box">
      <h2>为您的账号重置密码</h2>
      <el-form :rules="formRules" :model="editInfo" ref="dynamicValidateForm">
        <el-form-item prop="mail">
          <el-input v-model="editInfo.mail" placeholder="请输入新邮箱"></el-input>
        </el-form-item>
        <el-form-item prop='check' v-if="editInfo.mail">
          <reCaptcha :sitekey="sitekey" @getValidateCode='getValidateCode' v-model="editInfo.check"></reCaptcha>
        </el-form-item>
        <el-form-item prop="code">
          <el-col :span="14">
          <el-input v-model="editInfo.code" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col style="text-align: center;" :span="2">-</el-col>
          <el-col :span="8">
            <el-button v-show="show" @click="sendCode">获取验证码</el-button>
            <el-button v-show="!show" disabled>{{count}} s</el-button>
          </el-col>
        </el-form-item>
        <el-form-item prop="old_password" v-if="type!=1">
          <el-input type="password" v-model="editInfo.old_password" autocomplete="off" placeholder="请输入原始密码"></el-input>
        </el-form-item>
        <el-form-item prop="new_password">
          <el-input type="password" v-model="editInfo.new_password" autocomplete="off" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="editInfo.checkPass" autocomplete="off" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="updateInfo">提交</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>
<script>
import reCaptcha from '../login/reCaptcha'
export default {
  layout: function (context) {
    return "login";
  },
  data (){
    var checkCode = (rule, value, callback) => {
      if (value == false) {
        callback(new Error('请进行人机验证'));
      } else {
        callback();
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.editInfo.checkPass !== '') {
          this.$refs.dynamicValidateForm.validateField('checkPass');
        }
        callback();
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.editInfo.new_password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return{
      userInfo: '',
      dialogVisible: false,
      type: 2,
      editInfo: {
        mail: '',
        code: '',
        check: '',
        old_password: '',
        new_password: '',
        checkPass: ''
      },
      formRules: {
        mail: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        code: [
          { required: true, message: "请输入邮箱验证码",trigger: "blur"}
        ],
        check: [
          { validator: checkCode, trigger: 'change' }
        ],
        new_password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      sitekey: '6LeOsOQZAAAAAEgZzkD2ZE6kuR0vOFE8F2KqZB4x',
      show: true,
      count: '',
      timer: null
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
  methods: {
    cancel () {
      this.$router.go(-1)
    },
    updateInfo(){
      this.$refs['dynamicValidateForm'].validate((valid) => {
        if (valid) {
          let {old_password, new_password, code} = this.editInfo
          let params = {
            old_password,
            new_password,
            code
          }
          this.$ajax.get('/api/user/change_pwd', params).then((res) => {
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
  mounted () {
    
  }
}
</script>

<style scoped>
.login-box{
  width: 350px;
  padding: 20px;
  margin: auto;
  margin-top: 100px;
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: rgba(255,255,255, 0.85);
}
h2{
  font-size: 18px;
  font-weight: 700;
}
.el-form{
  margin-top: 30px;
}
.el-form .el-input__inner{
  background-color: transparent;
  color: rgba(0, 0, 0, 0.87);
}
</style>