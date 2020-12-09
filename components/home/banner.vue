<template>
	<div class="banner">
    <el-carousel
      trigger="click"
      height="600px"
      :indicator-position="indicatorStatus"
      :interval="5000"
    >
      <el-carousel-item class="carouel-item"
        v-for="(item, index) in bannerData"
        :key="index"
        :style="`background: url(https://www.hnuaccounting.com/static/image/${item.img}) no-repeat center`"
      ></el-carousel-item>
    </el-carousel>
    <div class="btn-box">
      <span @click="openLink(0)" v-if="!$store.state.userInfo.Name">用户登录>></span>
      <span @click="openLink(1)" v-if="$store.state.userInfo.Name">个人中心>></span>
      <span @click="openLink(2)" v-if="$store.state.userInfo.Name">上传案例>></span>
    </div>
  </div>
</template>

<script>
	export default {
		name: 'VBanner',
		props:{
			//bannerData为对象，里面的data属性包含着图片的数组
			bannerData: {
				type:Array,
				required:true
			}
		},
		data (){
			return {
        indicatorStatus: 'inside',
        isHome: true
			}
		},
		created (){
      if(this.$route.params.tag === undefined && this.$route.fullPath === '/'){
        this.isHome = true
      }else {
        this.isHome = false
      }
		},
		methods: {
      openLink (type) {
        let paths = ['/login', '/personal', '/personal/creatCase']
        this.$router.push({path: paths[type]})
      }
    }
	}
</script>

<style scoped>
.banner{
  /* width: 1200px; */
  margin: 0 auto;
  position: relative;
}
.banner .el-carousel__button {
  opacity: 1;
  width: 12px;
  height: 12px;
  border-radius: 100%;
  background-color: #afafaf;
}
.banner .el-carousel__indicator.is-active button {
  background-image: linear-gradient(-180deg, #ffb67e 0%, #ff7f48 100%);
}
.banner .el-carousel__arrow {
  font-size: 20px;
  background-color: rgba(31, 45, 61, 0.3);
}
.btn-box {
  position: absolute;
  bottom: 60px;
  z-index: 999;
  text-align: center;
  width: 100%;
}
.btn-box span{
  display: inline-block;
  width: 160px;
  border-radius: 4px;
	height: 40px;
  border: solid 1px #136fe1;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  text-align: center;
  line-height: 40px;
  margin-right: 10px;
  background: #136fe1;
  cursor: pointer;
}
</style>