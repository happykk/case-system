<template>
	<header class="v-header">
		<div id="index-header" :class="headFixed == true ? 'fixedTop' : ''">
			<div class="index-header-box">
        <div class="i-h-top">
          <div class="t-m-login">
            <i class="el-icon-user-solid"></i>
            <router-link to="/login" v-if="!$store.state.userInfo.Name">请登录</router-link>
            <div class="dropdown" v-else>
              <span @click="showPopMenu">{{$store.state.userInfo.Name}}</span>
              <div class="dropdown-content" :class="{'show': isShowPopMenu}">
                <span @click="toPersonal">我的账户</span>
                <span @click="loginOut">注销</span>
              </div>
            </div>
          </div>
        </div>
        <div class="i-h-logo">
          <div class="logo fl">
            <router-link to="/" class="logo-box">
              <img src="~/assets/images/index/logo.png" alt="湖南省研究生会计专业案例库">
              <div>
                <h1>湖南省研究生会计专业案例库</h1>
                <span>HUNAN GRADUATE ACCOUNTING PROFESSIONAL CASE LIBRARY</span>
              </div>
            </router-link>
          </div>
          <div class="fr search-box">
            <el-input placeholder="请输入案例关键字" v-model="searchVal" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
            </el-input>
          </div>
        </div>
				<div class="i-h-nav">
          <div class="center">
            <router-link
              :to="item.link"
              v-for="(item, index) in menuLists"
              :key="index"
              :class="{'active': activeIndex === index}"
              @click.native="changeIndex(index)"
            >{{ item.title }}</router-link>
          </div>	
				</div>
			</div>
		</div>
	</header>
</template>

<script>
	import { mapState } from 'vuex'

	export default{
		name: 'VHeader',
		data (){
			return {
				headFixed:false,
				maxClientWidth: 980,
        isShowCode: false,
        menuLists: [
          {
            title: '网站首页',
            link: '/'
          },
          {
            title: '案例库',
            link: '/cases'
          },
          {
            title: '新闻资讯',
            link: '/news'
          },
          {
            title: '通知公告',
            link: '/notice'
          },
          {
            title: '帮助中心',
            link: '/service/1'
          }
        ],
        activeIndex: 0,
        searchVal: '',
        isShowPopMenu: false
			}
		},
		computed: {
			...mapState(['headProdNav','headNewsNav','headJobNav'])
    },
    watch: {
      '$route' (val) {
        this.menuLists.map((item, index) => {
          if (val.path.indexOf(item.link) !== -1) {
            this.activeIndex = index
          }
        })
      }
    },
		mounted (){
		},
		methods: {
			changeIndex (index) {
        this.activeIndex = index
      },
      showPopMenu () {
        this.isShowPopMenu = !this.isShowPopMenu
      },
      toPersonal () {
        this.isShowPopMenu = false
        this.$router.push('/personal')
      },
      loginOut () {
        this.isShowPopMenu = false
        this.$ajax.get('/api/login_out').then(res => {
          this.$store.commit('setUserInfo', {})
          location. reload()
        })
      },
      search () {
        this.$router.push({
          path: 'cases',
          query: {
            keyword: this.searchVal
          }
        })
      }
		}
	}
</script>

<style scoped>
	#index-header {
    width:  100%;
    position: relative;
    z-index: 10;
	}
	.fixedTop{
    position:  fixed;
    top: -100px;
    left: 0;
	}
  .i-h-top{
    background: #f5f5f5;
    padding: 5px;
  }
	.t-m-login{
    margin: 0 auto;
    text-align: right;
    width: 1200px;
    color: #333;
  }
  .t-m-login i{
    margin-right: 5px;
  }
  .i-h-logo {
    padding: 10px 0;
    color: #333;
    position: relative;
    overflow: hidden;
    width: 1200px;
    margin: 0 auto;
  }
  .logo a {
    display: block;
    height: 100%;
  }
  .logo img{
    margin-right: 5px;
  }
  .logo .logo-box{
    display: flex;
  }
  .logo .logo-box h1{
    font-size: 28px;
  }
  .logo .logo-box span{
    font-size: 12px;
  }
  .search-box {
    margin-top: 7px;
    width: 400px;
    background-color: #ffffff;
    border: solid 2px #136fe1;
  }
  
  .i-h-nav {
    height: 40px;
    background-color: #136fe1;
    box-shadow: 0 4px 4px 0 rgba(19, 59, 40, 0.25);
  }
  .i-h-nav.home{
    background-color:rgba(46,46,48,.5);
  }
  .i-h-nav .center {
    width: 1200px;
    margin: 0 auto;
  }
  .i-h-nav .center a {
    display: inline-block;
    height: 100%;
    line-height: 40px;
    padding: 0 35px;
    color: #fff;
    font-size: 18px;
    margin: 0 11px;
  }
  .i-h-nav .center a:hover,
  .i-h-nav .center a.active {
    background-color: #136fe1;
    color: #fff;
  }
  .dropdown {
    position: relative;
    display: inline-block;
  }
  .dropdown-content {
    border-radius: 4px;
    position: absolute;
    background-color: #fff;
    width: 92px;
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    top: 25px;
    right: -24px;
    padding: 12px 16px;
    z-index: 999;
    display: none;
  }
  .dropdown-content.show{
    display: block;
  }
  .dropdown span{
    cursor: pointer;
  }
  .dropdown-content span{
    display: block;
    text-align: left;
    font-size: 15px;
    line-height: 1.5;
    padding-top: 6px;
    white-space: nowrap;
    letter-spacing: 0.00938em;
    padding-bottom: 6px;
  }
</style>
<style>
.search-box .el-input__inner{
  border: 0 none;
}
.search-box .el-input-group__append {
  background-color: #136fe1;
  color: #fff;
  border-radius: 0;
  border: 0 none;
}

</style>