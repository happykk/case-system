<template>
  <section>
    <!-- 面包屑部分 -->
    <div id="bread-nav">
      <div class="brand-nav-box clearfix">
        <div class="brand-nav-content">
          <div class="brand-nav-title"><span>当前位置:</span></div>
          <div class="brand-nav-list">
            <ul>
              <li><nuxt-link target="_blank" to="/">首页</nuxt-link></li>
              <li>></li>
              <li class="brand-nav-products"><nuxt-link target="_blank" to="/news">个人中心</nuxt-link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 面包屑部分结束 -->
    <div class="personal-main">
      <div class="left-menu">
        <div class="card-media personal-card">
          <div class="avatar-container-80 z-center">
            <img src="~/assets/images/personal/head-pic.png" >
          </div>
          <div class="presonal-info">
            <span class="author-name">肥佳ss</span>
          </div>
          <div class="position-info">
            <span>北京&nbsp;| 网页设计师</span>
          </div>
        </div>
        <div class="personal-menu">
          <ul class="menu-list">
            <li class="menu-list-default current">
              <i></i><span>账号安全</span></li>
            <li class="menu-list-default ">
              <i></i><span>我的收藏</span></li>
            <li class="menu-list-default ">
              <i></i><span>我的团体</span></li>
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
              <span class="account-title">用户名</span><span class="account-tips-text"><span>肥佳ss</span>
                </span>
                <a href="#" class="btn-default-main">修改</a>
            </p>
            <p>
              <span class="account-title">邮箱帐号</span><span class="account-tips-text"><span>1149116001@qq.com</span></span>
              <a href="#" class="btn-default-main">绑定</a>
            </p>
            <p>
              <span class="account-title">登录密码</span><span class="account-tips-text two-line-txt">密码要求至少包含字母，符号或数字中的两项且长度超过8位，建议您经常修改密码，以保证帐号更加安全。</span>
              <a href="#" id="modifysafepwd" class="btn-default-main">修改</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
	/*面包屑部分*/
  div#bread-nav {
    width:  100%;
    height:  auto;
  }
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
    line-height: 70px;
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
  .brand-nav-list ul li a {
    display:  block;
    width:  100%;
    height:  100%;
    color: #858585;
  }
  .brand-nav-list ul li:last-child a {
    color: #22202b;
  }
  .brand-nav-list ul li a:hover {
    color: #22202b;
  }
  /*面包屑部分结束*/
  .personal-main {
    overflow:  hidden;
    width:  1200px;
    height:  auto;
    margin:  0 auto;
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
    display: inline-block;
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
    display: inline-block;
    vertical-align: middle;
    *vertical-align: auto;
    zoom: 1;
    *display: inline;
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
  </style>