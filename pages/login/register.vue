<template>
  <section class="login-container">
    <div class="login-box">
      <h2>注册</h2>
      <el-form :rules="formRules" :model="editInfo" ref="dynamicValidateForm" label-width="100px">
        <el-form-item prop="name" label="姓名">
          <el-input v-model="editInfo.name" autocomplete="off" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item prop="job_num" label="工号/学号">
          <el-input v-model="editInfo.job_num" autocomplete="off" placeholder="请输入工号/学号"></el-input>
        </el-form-item>
        <el-form-item prop="college_id" label="学校">
          <el-select v-model="editInfo.college_id" placeholder="请选择学校">
            <el-option v-for="(item, index) in colleges" :key="index" :label="item.menu_name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="role_id" label="身份">
           <el-radio-group v-model="editInfo.role_id" size="medium">
            <el-radio-button label="0">学生</el-radio-button>
            <el-radio-button label="1">老师</el-radio-button>
            <el-radio-button label="2">企业人员</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="phone" label="电话">
          <el-input v-model="editInfo.phone" autocomplete="off" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item prop="wechat" label="微信">
          <el-input v-model="editInfo.wechat" autocomplete="off" placeholder="请输入微信号"></el-input>
        </el-form-item>
        <el-form-item prop="new_password" label="密码">
          <el-input type="password" v-model="editInfo.new_password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" label="确认密码">
          <el-input type="password" v-model="editInfo.checkPass" autocomplete="off" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="mail" label="邮箱">
          <el-input v-model="editInfo.mail" placeholder="请输入新邮箱"></el-input>
        </el-form-item>
        <el-form-item prop='check' v-if="editInfo.mail">
          <reCaptcha ref="gRecaptcha" :sitekey="sitekey" @getValidateCode='getValidateCode' v-model="editInfo.check"></reCaptcha>
        </el-form-item>
        <el-form-item prop="code" label="邮箱验证码" v-if="editInfo.mail">
          <el-col :span="13">
          <el-input v-model="editInfo.code" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col style="text-align: center;" :span="2">-</el-col>
          <el-col :span="8">
            <el-button v-show="show" @click="sendCode">获取验证码</el-button>
            <el-button v-show="!show" disabled style="width: 102px;box-sizing: border-box;">{{count}} s</el-button>
          </el-col>
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
import md5 from 'js-md5'
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
      } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(value)) {
        callback(new Error('长度必须为8~16位，且由数字、字母、_组成'));
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
        name: '',
        new_password: '',
        checkPass: '',
        name: '',
        job_num: '',
        college_id: '',
        phone: '',
        wechat: '',
        role_id: ''
      },
      formRules: {
        mail: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        code: [
          { required: true, message: "请输入邮箱验证码",trigger: "blur"}
        ],
        new_password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        name: [
          { required: true, message: "请输入真实姓名",trigger: "blur"}
        ],
        job_num: [
          { required: true, message: "请输入工号或学号",trigger: "blur"}
        ],
        college_id: [
          { required: true, message: "请选择学校",trigger: "blur"}
        ],
        phone: [
          { required: true, message: "请输入联系方式",trigger: "blur"},
          { pattern: /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/, message: '请输入正确的手机号' }
        ],
        wechat: [
          { required: true, message: "请输入微信号",trigger: "blur"}
        ],
        role_id: [
          { required: true, message: "请选择身份",trigger: "blur"}
        ],
      },
      sitekey: '6LeOsOQZAAAAAEgZzkD2ZE6kuR0vOFE8F2KqZB4x',
      show: true,
      count: '',
      timer: null,
      colleges: []
    }
  },
  components: {
    reCaptcha
  },
  head () {
    return {
      title: '注册'
    }
  },
  methods: {
    cancel () {
      this.$router.go(-1)
    },
    updateInfo(){
      this.$refs['dynamicValidateForm'].validate((valid) => {
        if (valid) {
          let {mail, name, job_num, college_id, phone, new_password, wechat, role_id, code} = this.editInfo
          let params = {
            name,
            mail,
            job_num,
            college_id,
            phone,
            wechat,
            role_id,
            code,
            pass_word: md5(new_password),
          }
          console.log(new_password)
          this.$ajax.get('/api/register', params).then((res) => {
            if (res.code === 0) {
              this.$message.success('注册成功，即将跳转到登录页！')
              setTimeout(()=>{
                this.$router.push('/login')
              }, 1500)
            }
          })
        }
      })
      
    },
    sendCode () {
      if (!this.editInfo.check) {
        this.$message.warning('请进行人机验证！')
        return
      }
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
    this.$ajax.get('/api/menu', {type: 2}).then(res => {
      this.colleges = res.data
    })
  }
}
</script>

<style scoped>
.login-box{
  width: 550px;
  padding: 20px 100px 20px 50px;
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
.el-form .el-select{
  width: 100%;
}
</style>