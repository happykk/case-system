<template>
  <section class="container">
      <!-- banner -->
      <VBanner :bannerData="bannerData"></VBanner>
      <div class="top-content">
        <div class="news">
          <div class="header-title">
            <span class="fl">新闻资讯</span>
            <nuxt-link to="news" class="fr">MORE ></nuxt-link>
          </div>
          <div class="lists">
            <div v-for="(item, index) in reviewArr" :key="index" :class="{'special': index==0}">
              <!-- <nuxt-link target="_blank" 
                :to="{name: 'news-newsView-id',params:{id:item.articleId},query: {category: item.articleCategoryId}}">
                <h2>{{item.title}}</h2>
              </nuxt-link> -->
              <div class="list">
                <img :src="item.poster">
                <div class="list-msg">
                  <div class="list-title ellipsis">
                    {{ item.title }}
                    <span v-if="index>0" class="fr time">{{item.time}}</span>
                  </div>
                  <div class="list-info">
                    <p>{{item.brief}}</p>
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
              <router-link to="professors" class="fr">MORE ></router-link>
            </div>
            <ul class="notice-lists">
              <li class="" v-for="(item,index) in noticeList" :key="index">{{item}}</li>
            </ul>
          </div>
          <div class="quick-entry">
            <div>
              <img src="~/assets/images/index/icon-register.png" alt="">
              <span>注册帮助</span>
            </div>
            <div>
              <img src="~/assets/images/index/icon-uploade.png" alt="">
              <span>上传案例帮助</span>
            </div>
            <div>
              <img src="~/assets/images/index/icon-qa.png" alt="">
              <span>问答</span>
            </div>
            <div>
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
            <router-link to="news" class="fr">MORE ></router-link>
          </div>
          <div class="case-list">
            <div class="list-left">
              <div class="case-list-item" v-for="(item, index) in reviewArr" :key="index">
                <span class="index">01</span>
                <p class="ellipsis">为培养MPAccy究生发现、分析、解决问题的能力为培养MPAccy究</p>
                <span class="time">[2020-10-08]</span>
              </div>
            </div>
            <div class="list-right">
              <div class="case-list-item" v-for="(item, index) in reviewArr" :key="index">
                <span class="index">01</span>
                <p class="ellipsis">为培养MPAccy究生发现、分析、解决问题的能力为培养MPAccy究</p>
                <span class="time">[2020-10-08]</span>
              </div>
            </div>
          </div>
          <!-- <div class="loadmore" @click="loadmore">
            <span v-if="getNewsStatus">加载更多</span>
            <span v-else>
              <i class="el-icon-loading"></i> 加载中...
            </span>
          </div> -->
        </div>
      </div>
      <!-- 新闻资讯部分 -->
      <div id="index-news">
        <div class="news-content">
          <div class="news-content-top">
            <div class="news-content-top-titleC"><h2>新闻资讯</h2></div>
            <div class="news-content-top-titleE">News Center</div>
            <div class="news-content-top-description">一切资讯都是有价值的</div>
          </div>
          <div class="news-content-box">
            <div class="news-kind-container">
              <ul class="news-kind-nav">
                <li class="news-kind" v-for="(item,index) in $store.state.headNewsNav" :key="index" :class="{active:index == clickNewsIndex}" @click="getNewsList(index)">{{item.articleCategoryName}}</li>
              </ul>
              <div class="news-tab-content">
                <indexNewsListShow :indexFirstNewsList="indexFirstNewsList1" :indexNewsList="indexNewsList1" v-show="0 == clickNewsIndex"></indexNewsListShow>
                <indexNewsListShow :indexFirstNewsList="indexFirstNewsList2" :indexNewsList="indexNewsList2" v-show="1 == clickNewsIndex"></indexNewsListShow>
                <indexNewsListShow :indexFirstNewsList="indexFirstNewsList3" :indexNewsList="indexNewsList3" v-show="2 == clickNewsIndex"></indexNewsListShow>
                <indexNewsListShow :indexFirstNewsList="indexFirstNewsList4" :indexNewsList="indexNewsList4" v-show="3 == clickNewsIndex"></indexNewsListShow>
                <indexNewsListShow :indexFirstNewsList="indexFirstNewsList5" :indexNewsList="indexNewsList5" v-show="4 == clickNewsIndex"></indexNewsListShow>
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
        reviewArr: [
          {
            poster: 'http://img.visney.cn/img/nuxtPc/experice-bt/place_desc_right1.png',
            title: '关于面向有关高校开展主题案例专项征集的邀请函',
            brief: '2020年，新冠肺炎疫情突发。党中央高度重视，习近平总书记亲自部署、亲自指挥，始终把人民生命安全和身体健康摆在第一位。我们在脱贫攻坚领域取得的前所未有的成就，彰显了中国共产党领导和我国社会主义制度的政治优势',
            time: '2018-04-04'
          },
          {
            poster: 'http://img.visney.cn/img/nuxtPc/experice-bt/place_desc_right1.png',
            title: '阳山智谷EMBA总裁高级研修班 M38班课课程',
            brief: '北清智库商学院互联网导师喻旭老师为同学们带来了',
            time: '2018-04-04'
          },
          {
            poster: 'http://img.visney.cn/img/nuxtPc/experice-bt/place_desc_right1.png',
            title: '阳山智谷【金融EMBA】三月课程纪实',
            brief: '北清智库商学院互联网导师喻旭老师为同学们带来了«新零售创新战略与路径设计»，从产业的高度，用户的角…',
            time: '2018-04-04'
          }
        ],
        noticeList: ['如涵控股：“颜值”能否养成“市值”？', '贵烟·国酒香”品牌培育创新之旅：跨界融合点亮体验营品牌培育创新之旅：跨界融合点亮体验营销销...', '壹号土猪：北大猪肉大王的生意经', '华为基业长青的基石：持续创新'],
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
    async asyncData({params,store}){
      //首页head信息
      let metaData = await axios(`${store.state.wordpressAPI}/NavigationMeta/get/1`);
      //banner数据动态获取
      let banner = await axios(`${store.state.wordpressAPI}/banner/selectAllByTpye/1`);
      //首页新闻信息
      let indexFirstNewsList1 = await axios(`${store.state.wordpressAPI}/article/getRecommend/1`);
			let indexFirstNewsList2 = await axios(`${store.state.wordpressAPI}/article/getRecommend/2`);
			let indexFirstNewsList3 = await axios(`${store.state.wordpressAPI}/article/getRecommend/3`);
			let indexFirstNewsList4 = await axios(`${store.state.wordpressAPI}/article/getRecommend/4`);
			let indexFirstNewsList5 = await axios(`${store.state.wordpressAPI}/article/getRecommend/5`);

			let indexNewsList1 = await axios(`${store.state.wordpressAPI}/article/getRecommendsByCategoryId/1/9`);
			let indexNewsList2 = await axios(`${store.state.wordpressAPI}/article/getRecommendsByCategoryId/2/9`);
			let indexNewsList3 = await axios(`${store.state.wordpressAPI}/article/getRecommendsByCategoryId/3/9`);
			let indexNewsList4 = await axios(`${store.state.wordpressAPI}/article/getRecommendsByCategoryId/4/9`);
      let indexNewsList5 = await axios(`${store.state.wordpressAPI}/article/getRecommendsByCategoryId/5/9`);
      
      return {
        metaData: metaData.data,
        bannerData: banner.data,
        //首页新闻信息
        indexFirstNewsList1: indexFirstNewsList1.data,
        indexFirstNewsList2: indexFirstNewsList2.data,
        indexFirstNewsList3: indexFirstNewsList3.data,
        indexFirstNewsList4: indexFirstNewsList4.data,
        indexFirstNewsList5: indexFirstNewsList5.data,
        indexNewsList1: indexNewsList1.data,
        indexNewsList2: indexNewsList2.data,
        indexNewsList3: indexNewsList3.data,
        indexNewsList4: indexNewsList4.data,
        indexNewsList5: indexNewsList5.data,
      } 
    },
    methods: {
      tab (index){
        this.num = index;
      },
      getNewsList (index){
        this.clickNewsIndex = index;
      }

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
}
.case-list .case-list-item{
  margin-top: 15px;
  display: flex;
  align-items: center;
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
</style>
