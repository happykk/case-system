<template>
  <div class="xiaobu-step3">
    <section>
      <div class="mod-toolbar">
        <el-row class="img">
          <img src="../../assets/images/success.png" />
          <div>案例上传成功，等待审核！</div>
        </el-row>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  components: {
  },
  data () {
    return {
      id: ''
    }
  },
  methods: {
    toList: function () {
      this.$router.push({ path: '/commodity-center/xiaobu/list'})
    }
  },
  mounted () {
    // this.id = Store.publishGoodsId
  }
}
</script>
<style scoped>
.mod-toolbar {
  background-color: #ffffff;
  padding: 25px;
  margin-top: 10px;
  border-radius: 10px;
}
.img {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}
.success {
  font-size: 24px;
  color: #333333;
  text-align: center;
  margin-bottom: 20px;
}
.edit {
  font-size: 16px;
  color: #333333;
  text-align: center;
  margin-top: 70px;
}
.other {
  text-align: center;
  margin-bottom: 10px;
  font-size: 20px;
}
.tips {
  text-align: center;
  font-size: 16px;
  color: #666666;
  p {
    padding-top: 10px;
  }
}
.link {
  padding: 10px 0;
  color: #3dc8f6;
  cursor: pointer;
}
</style>