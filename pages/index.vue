<template>
  <section class="container">
      <VBanner :bannerData="bannerData"></VBanner>
      <div class="top-content">
        <div class="news">
          <div class="header-title">
            <span class="fl">新闻资讯</span>
            <nuxt-link to="news" class="fr">MORE ></nuxt-link>
          </div>
          <div class="lists">
            <div v-for="(item, index) in newsData" :key="index" :class="{'special': index==0}">
              <div class="list">
                <nuxt-link target="_blank" 
                  :to="{name: 'news-newsView-id',params:{id:item.id}}">
                  <img :src="item.img ? 'http://81.71.142.158/static/image/'+item.img : defaultImg">
                </nuxt-link>
                <div class="list-msg">
                  <div class="list-title ellipsis">
                    <nuxt-link target="_blank" 
                  :to="{name: 'news-newsView-id',params:{id:item.id}}">{{ item.title }}</nuxt-link>
                    <span v-if="index>0" class="fr time">{{item.update_time.split(' ')[0]}}</span>
                  </div>
                  <div class="list-info">
                    <p>{{item.desc}}</p>
                    <!-- <nuxt-link target="_blank" 
                      :to="{name: 'news-newsView-id',params:{id:item.id}}">
                    </nuxt-link> -->
                    <a v-if="index==0" class="view-all fr" href="#">[查看全文]</a>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        <div class="top-con-right">
          <div class="notice">
            <div class="header-title">
              <span class="fl">通知公告</span>
              <router-link to="notice" class="fr">MORE ></router-link>
            </div>
            <ul class="notice-lists">
              <li v-for="(item,index) in noticeData" :key="index">
                <router-link
                  target="_blank" 
                  :to="{name: 'news-newsView-id',params:{id:item.id}}">
                    {{item.title}}
                  </router-link>
              </li>
            </ul>
          </div>
          <div class="quick-entry">
            <div @click="toDetail(1)">
              <img src="~/assets/images/index/icon-register.png" alt="">
              <span>注册帮助</span>
            </div>
            <div @click="toDetail(3)">
              <img src="~/assets/images/index/icon-uploade.png" alt="">
              <span>上传案例帮助</span>
            </div>
            <div @click="toDetail(2)">
              <img src="~/assets/images/index/icon-qa.png" alt="">
              <span>问答</span>
            </div>
            <div @click="toDetail(4)">
              <img src="~/assets/images/index/icon-desc.png" alt="">
              <span>使用说明</span>
            </div>
          </div>
        </div>
      </div>
      <div class="case-list">
        <div class="w">
          <div class="header-title">
            <span class="fl">优秀案例</span>
          </div>
          <div class="case-list">
            <div class="list-left">
              <div class="case-list-item" v-for="(item, index) in leftCaseData" :key="index" @click="toCaseDetail(item)">
                <span class="index"><template v-if="index+1<10">0</template>{{index+1}}</span>
                <p class="ellipsis">{{item.case_name}}</p>
                <span class="time">[{{item.create_time.split(' ')[0]}}]</span>
              </div>
            </div>
            <div class="list-right">
              <div class="case-list-item" v-for="(item, index) in rightCaseData" :key="index" @click="toCaseDetail(item)">
                <span class="index"><template v-if="index+2<10">0</template>{{index+2}}</span>
                <p class="ellipsis">{{item.case_name}}</p>
                <span class="time">[{{item.create_time.split(' ')[0]}}]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  </section>
</template>
<script>
  import axios from 'axios'
  import VHeader from '~/components/home/header'
  import VFooter from '~/components/home/footer'
  import VBanner from '~/components/home/banner'
  import indexNewsListShow from '~/components/common/indexNewsListShow'

  export default {
    data(){
      return {
        num:0,
        clickNewsIndex: 0,
        defaultImg: 'http://img.visney.cn/img/nuxtPc/experice-bt/place_desc_right1.png',
        reviewArr: [],
        noticeList: []
      }
    },
    components: {
      VHeader,
      VFooter,
      VBanner,
      indexNewsListShow
    },
    head () {
      return {
        title:this.metaData.navigationTitle,
        meta: [
          {name:'keywords',hid: 'keywords',content:`${this.metaData.navigationKeyword}`},
          {name:'description',hid:'description',content:`${this.metaData.navigationDescription}`}
        ]
      }
    },
    async asyncData(context){
      //首页head信息
      let metaData = {
        navigationTitle: '湖南省研究生会计专业案例库',
        navigationKeyword: '案例库,研究生,会计',
        navigationDescription: '湖南省研究生会计专业案例库'
      };
      //banner数据动态获取
      let banner = await context.app.$ajax.get('/api/rotation_chart')
      //首页通知信息
      let notice = await context.app.$ajax.get(`/api/article/list?type=2&page_no=1&page_size=6`)
      let news = await context.app.$ajax.get(`/api/article/list?type=1&page_no=1&page_size=3`)
      let cases = await context.app.$ajax.get(`/api/case/excellent`)
      let leftArr = []
      let rightArr = []
      for (let x = 0; x < cases.data.list.length; x++) {
        if (x % 2) {
          rightArr.push(cases.data.list[x])
        } else {
          leftArr.push(cases.data.list[x])
        }
      }
      return {
        metaData: metaData,
        bannerData: banner.data,
        noticeData: notice.data.list,
        newsData: news.data.list,
        leftCaseData: leftArr,
        rightCaseData: rightArr
      }
    },
    methods: {
      tab (index){
        this.num = index;
      },
      toDetail (id) {
        this.$router.push({path: `/service/${id}`})
      },
      toCaseDetail (row) {
        sessionStorage.setItem('caseDetail', JSON.stringify(row))
        this.$router.push({path: `/cases/${row.id}`})
      }
    },
    mounted () {
      // this.$ajax.get('/api/case/excellent').then( res => {
      //   for (let x = 0; x < res.data.list.length; x++) {
      //     if (x % 2) {
      //       this.rightCaseData.push(res.data.list[x])
      //     } else {
      //       this.leftCaseData.push(res.data.list[x])
      //     }
      //   }
      // })
    }
  }
</script>

<style scoped>
.container {
  width: 100%;
  height: auto;
}
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.top-content{
  width: 1200px;
  margin: 30px auto 0;
  display: flex;
  justify-content: space-between;
}
.top-content .notice {
  width: 372px;
}
.top-content .notice-lists{
  padding-left: 18px;
}
.top-content .notice-lists li{
  margin: 10px 0;
  line-height: 20px;
  color: #666666;
  list-style-type: disc;
}
.quick-entry{
  width: 372px;
  margin-top: 20px;
  border-top: 2px solid #d0d0d0;
  padding: 10px 0 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.quick-entry>div{
  width: 100px;
  text-align: center;
  margin: 10px 25px;
}
.quick-entry>div span{
  display: block;
  margin-top: 5px;
  color: #646464;
}
.news {
  width: 795px;
  padding-bottom: 30px;
}
.list{
  display: flex;
  padding: 15px 0;
  border-bottom: 1px dashed #e3e3e3;
}
.list img{
  width: 178px;
  height: 100px;
  object-fit: cover;
  margin-right: 5px;
}
.list .list-msg{
  flex: 1;
  margin-left: 10px;
}
.list .list-title{
  font-size: 16px;
  margin-bottom: 10px;
  color: #000;
}
.list .list-info{
  color: #666;
  font-size: 15px;
}
.list .list-info p{
  text-align: justify;
  line-height: 26px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  /* autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
}
.list .list-info .view-all{
  font-size: 15px;
  margin-top: 10px;
  color: #136fe1;
}
.list .list-info .time{
  color: #999;
  font-size: 14px;
}
.special img{
  width: 300px;
  height: 170px;
}
.case-list{
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
}
.case-list .list-left{
  width: 50%;
  margin-right: 20px;
}
.case-list .list-right{
  width: 50%;
}
.case-list .case-list-item{
  margin-top: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.case-list .index{
  width: 20px;
  height: 20px;
  margin-right: 8px;
  color: #fff;
  text-align: center;
  line-height: 20px;
  background-color: #b1b1b1;
}
.case-list .case-list-item:nth-child(2n) .index{
  background-color: #136fe1;
}
.case-list .case-list-item p{
  flex: 1;
  margin-right: 20px;
}
.case-list .case-list-item .time{
  width: 86px;
  color: #666;
  font-size: 13px;
  float: right;
}
.header-title {
  border-bottom: 2px solid #d0d0d0;
  padding: 5px 0 5px 25px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  position: relative;
  color: #136fe1;
}
.header-title::after{
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 121px;
  height: 3px;
  border-bottom: 3px solid #136fe1;
}
.header-title a{
  color: #136fe1;
}
/* 新闻资讯部分 */
div#index-news {
  width: 100%;
  height: auto;
  background: #f9f9fa;
}
.news-content {
  width: 1200px;
  height: auto;
  margin: 0 auto;
}

.news-content-top {
  width: 100%;
  height: auto;
  padding: 140px 0 22px;
  text-align: center;
}

.news-content-top-titleC {
  width: 100%;
  height: auto;
  font-size:  38px;
  font-family: 'Noto Serif CJK SC', 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc','STZhongsong','宋体', 'serif';
  font-weight: 900;
  color: #22202b;
  line-height: 46px;
}

.news-content-top-titleE {
  width: 100%;
  height: auto;
  font-size: 14px;
  color: #858585;
  line-height: 22px;
}

.news-content-top-description {
  width: 100%;
  height: auto;
  padding-top: 6px;
  font-size: 14px;
  color: #858585;
  line-height: 22px;
}

.news-content-box {
  overflow: hidden;
  width: 100%;
  height: auto;
  padding-bottom: 150px;
}

.news-kind-container {
  width: 100%;
  height: auto;
}

ul.news-kind-nav {
  width: 100%;
  height: auto;
  padding-top: 20px;
  text-align: center;
}

li.news-kind {
  display: inline-block;
  height: 46px;
  margin: 0 22px;
  border-bottom: 2px solid transparent;
  color: #979797;
  font-size: 14px;
  line-height: 46px;
  text-align: center;
  cursor: pointer;
  -webkit-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

li.news-kind.active, .news-kind:hover{
  color: #22202b;
  font-weight: bold;
  border-bottom: 2px solid #22202b;
}

.news-tab-content {
  overflow:  hidden;
  width:  100%;
  height:  auto;
  padding-top: 70px;
}
/* 新闻资讯部分结束 */
.recom-info-img img {
  object-fit: cover;
  width:  100%;
  height:  100%;
  -webkit-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
.recom-info-img img:hover {
    -webkit-transform: scale(1.2);
  -ms-transform: scale(1.2);
  -o-transform: scale(1.2);
  transform: scale(1.2);
}
</style>
