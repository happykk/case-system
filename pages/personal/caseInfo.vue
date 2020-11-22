<template>
  <section>
    <div class="account-num-box">
    </div>
    <div class="empty">
      <img src="../../assets/images/empty.png" alt="">
      <p>你还没有上传案例</p>
      <el-button type="primary" @click="toCreatCase">新建案例</el-button>
    </div>
  </section>
</template>
<script>
export default {
  data (){
    return{
      
    }
  },
  methods: {
    toCreatCase () {
      
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
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
</style>