<template>
  <section class="view-case-content">
    <div class="content">
      <img :src="$store.state.basicUrl+'/api/case/image?page_no='+page_no+'&type='+type+'&case_id='+case_id" >
    </div>
    <div class="btn">
      <span class="total">共<b>{{total}}</b>页</span>
      <i class="el-icon-caret-top" @click="pagePrev"></i>
      <i class="el-icon-caret-bottom" @click="pageNext"></i>
      <i class="el-icon-download" @click="download"></i>
    </div>
  </section>
</template>
<script>
// import VueRecaptcha from 'vue-recaptcha';
export default {
  // 下面的两种方式都可以；layout属性其实是将这个vue页面跟布局vue进行关联的属性，layout的值为layout文件夹下所对应布局的名字
  // layout: 'custom_layout',
  layout: function (context) {
    return "login";
  },
  data (){
    return{
      case_id: '',
      type: '',
      total: 0,
      page_no: 1,
      imgUrl: ''
    }
  },
  methods: {
    pagePrev () {
      if (this.page_no > 1) {
        this.page_no--
      }
      this.getData()
    },
    pageNext () {
      if (this.page_no < this.total) {
        this.page_no++
      }
      this.getData()
    },
    getData () {
      let num = Math.ceil(Math.random() * 100);
      this.imgUrl = `${this.$store.state.basicUrl}/api/case/image?page_no=${this.page_no}+'&type=${this.type}&case_id=${this.case_id}${num}`
    },
    download () {
      let url = this.$store.state.basicUrl+'/api/case/download?case_id='+this.case_id
      window.open(url, "_blank");
    }
  },
  mounted () {
    this.total = this.$route.query._t
    this.case_id = this.$route.query.case_id
    this.type = this.$route.query.type
    // this.$ajax.get('/api/case/read',{
    //   case_id: this.case_id,
    //   type: this.type
    // }).then(res => {
    //   this.total = res.data
    // })
  }
};
</script>
<style scoped>
.view-case-content{
  width: 100%;
  min-height: 100vh;
  background: #333;
}
.content{
  width: 1000px;
  margin: 0 auto;
}
.content img{
  width: 100%;
}
.btn{
  position: fixed;
  right: 100px;
  top: 50%;
  transform: translateY(-50%);
}
.btn i{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  line-height: 40px;
  text-align: center;
  background: #fff;
  color: #333;
  font-size: 28px;
  display: block;
  margin-bottom: 10px;
  cursor: pointer;
}
.total{
  color: #fff;
  font-size: 12px;
  margin-bottom: 10px;
  display: inline-block;
}
</style>
