<template>
	<div class="banner">
    <el-carousel
      trigger="click"
      height="600px"
      :indicator-position="indicatorStatus"
      :interval="5000"
    >
      <el-carousel-item
        v-for="(item, index) in bannerData"
        :key="index"
        :style="`background: url(http://81.71.142.158/static/image/${item.img}) no-repeat center`"
      ></el-carousel-item>
    </el-carousel>
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
				indicatorStatus: 'inside'
			}
		},
		created (){
		},
		methods: {
    }
	}
</script>

<style scoped>
.banner{
  margin-top: -40px;
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
</style>