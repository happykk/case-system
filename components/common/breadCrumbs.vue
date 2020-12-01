<template>
  <div id="bread-nav">
    <div class="brand-nav-box clearfix">
      <div class="brand-nav-content">
        <div class="brand-nav-title"><span>当前位置:</span></div>
        <div class="brand-nav-list">
          <ul>
            <li v-for="(item, index) in list" :key="index">
              <nuxt-link :to="item.link">{{item.title}}</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BreadCrumbs',
  props:{
    list: {
      type: Array
    }
  },
  data() {
    return{
      
    }
  },
  mounted (){
  }
}
</script>
<style>
  #bread-nav{
    position: relative;
  }
  #bread-nav .brand-nav-content{
    float: left;
  }
  .brand-nav-box {
    width:  1200px;
    margin:  0 auto;
    color:  #858585;
    font-size: 14px;
    text-align:  left;
    /* padding-bottom: 10px; */
    margin-top: 20px;
    /* border-bottom: 2px solid #136fe1; */
  }
  .brand-nav-content{
    float: left;
  }
  .brand-nav-title {
    float:  left;
  }
  .brand-nav-list {
    float:  left;
    overflow:  hidden;
  }
  .brand-nav-list ul {
    overflow: hidden;
  }
  .brand-nav-list ul li {
    float:  left;
    padding: 0 5px;
  }
  .brand-nav-list ul li::after{
    content: '/';
    margin-left: 8px;
    width: 20px;
    color: #858585;
  }
  .brand-nav-list ul li a {
    color: #858585;
  }
  .brand-nav-list ul li:last-child::after{
    display: none;
  }
  .brand-nav-list ul li:last-child a {
    color: #22202b;
  }
  .brand-nav-list ul li a:hover {
    color: #22202b;
  }
</style>