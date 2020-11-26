<template>
	<footer class="footer">
    <div class="w">
      <div class="info fl">
        <img src="~/assets/images/index/code.png" alt="" class="code">
        <div class="info-box">
          <div class="link">
            <nuxt-link :to="item.link" v-for="(item, index) in menuLists" :key="index">{{ item.title }}</nuxt-link>
          </div>
          <div class="msg">
            <p>
              地址：湖南省长沙市岳麓区麓山南路麓山门
              <br>
              电话：400-888-8888 邮箱：murongqiaochu@live.com
              <br>
              版权所有：©2014-2019北清智库商学院 京ICP备16035884号
            </p>
          </div>
        </div>
      </div>
      <div class="friend-links fr" @click="show" ref="box">
        <span class="label">友情链接</span>
        <i class="el-icon-arrow-down fr"></i>
        <ul class="link-list" v-if="showLink">
          <li v-for="(item, index) in friendLink" :key="index" @click="toOutWeb(item.Link)">
            {{ item.CollegeName }}
          </li>
        </ul>
      </div>
    </div>
	</footer>
</template>

<style scoped>
.footer {
  background-color: #2e2e30;
  height: 200px;
  color: #fff;
  font-size: 14px;
}
.w {
  height: 100%;
  padding: 50px 0 0;  
}
a {
  display: inline-block;
  height: 14px;
  line-height: 14px;
  color: #fff;
  margin-right: 10px;
  padding-right: 10px;
  border-right: 1px solid rgba(255,255,255,.4);
  
}
.msg {
  padding-top: 10px;
}
p{
  line-height: 24px;
}
a:last-child{
  border: 0 none;
}
.info{
  display: flex;
  align-items: center;
}
.info-box{
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid rgba(255,255,255,.1);
}
.friend-links{
  width: 214px;
  height: 24px;
  color: #333;
  background-color: #ffffff;
  cursor: pointer;
}
.label{
  line-height: 24px;
  margin-left: 5px;
}
.el-icon-arrow-down{
  margin: 5px 5px 0 0;
}
.link-list{
  background-color: #ffffff;
  padding: 5px;
  width: 214px;
}
li{
  padding: 5px 0;
  border-top: 1px solid #ccc;
}

</style>

<script>
	import { mapState } from 'vuex'
	export default {
		name: 'VFooter',
		components: {},
		data () {
      return {
        menuLists: [
          {
            title: '学院简介',
            link: '/service/presales'
          },
          {
            title: '学院新闻',
            link: '/service/aftersales'
          },
          {
            title: '联系我们',
            link: '/service/contact'
          },
          {
            title: '教授与智库',
            link: '/service/questions'
          }
        ],
        showLink: false,
        friendLink: [],
        value: ''
      }
    },
    methods: {
      show () {
        this.showLink = !this.showLink
      },
      toOutWeb (url) {
        this.showLink = false
        window.open(url,"_blank");
      }
    },
		computed: {
			...mapState(['headProdNav','headNewsNav','indexLinksData'])
		},
		mounted (){
      this.$ajax.get('/api/friendly_link').then(res => {
        this.friendLink = res.data
      })
      document.addEventListener('click',(e)=>{
        if(!this.$refs.box.contains(e.target)){
          this.showLink = false;
        }
      })
		}
	}
</script>
<style scoped>
.footer{
  margin-top: 50px;
}
</style>