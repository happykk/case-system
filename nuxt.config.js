const axios = require('axios');
// const env = require('./env')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '湖南省研究生会计专业案例库',
    meta: [
      { name: 'renderer', content: 'webkit'},
      { name: 'force-rendering', content: 'webkit'},
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=Edge,chrome=1'},
      { name: 'baidu-site-verification', content: 'mREHhDF8nW'},

      /*以上是设置双核浏览器默认状态下使用极速模式打开*/
      { charset: 'utf-8' },
      { hid: 'description', name: 'description', content: '卫诗理'},
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' },

      /*新增搜狗、神马、360 */
      { name: '360-site-verification', content: '850970beabd63bd397272b6dd73a1aba' },
      { name: 'sogou_site_verification', content: 'y3fi8ttkxP' },
      { name: 'shenma-site-verification', content: '15230d9dfb2e66bfecf2408862f2462c_1537497601' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      // {src: 'http://api.map.baidu.com/api?v=2.0&ak=MDdqxkqhQzfdBzfu2tfGiidGbHgTfGrB'}
    ]
  },
  css:['~assets/css/reset.css'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  /*
	** 使用npm run generate打包静态页面修改相对路径需使用，使用npm run build打包或者npm run dev启动不需要配置这个
	*/
	// router: {
	//     base: './'
	// },
  build: {
    babel: {
      "plugins": [
        [
          "component",
          {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
          }
        ]
      ]
    },
    /**
     * 将查看源代码中的css采用外部引入方式
     */
    extractCSS: {
      allChunks: true
    },
    vender: ['axios'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  //设置缓存
  cache: true,
  //禁止预加载效果
  performance: {
    prefetch: false
  },
  modules: [
    // 'nuxt-robots-module',
    '@nuxtjs/sitemap',
  ],
  //添加robots.txt文件，可以使用插件方法也可以直接在static文件夹中放入robots.txt都可以访问到
  // 'nuxt-robots-module': {
  //   UserAgent: '*',
  //   Disallow: '/',
  //   Sitemap: 'http://www.visney.cn/sitemap.xml'
  // },
  plugins: ["@/plugins/element-ui", '@/plugins/axios', {src:'@/plugins/storeCache',ssr: false}],
  env: {
    BASE_URL: process.env.BASE_URL,
    NODE_ENV: process.env.NODE_ENV
  }
}
