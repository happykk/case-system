import Vue from 'vue'
import axios from 'axios'
import querystring from 'querystring'
import { Message } from "element-ui";
// axios.defaults.withCredentials = true
axios.defaults.baseURL='https://www.hnuaccounting.com'
var ajaxFun = function (type, url, data) {
  data = data || {}
  if (type === 'post') {
    data = querystring.stringify(data)
  }
  if (type === 'get') {
    data = {
      params: data
    }
  }
  return axios[type](url, data).then((rs) => {
    return rs.data
  })
}
var ajax = {
  get: (url, data) => ajaxFun('get', url, data),
  post: (url, data) => ajaxFun('post', url, data),
  jsonp: (url, data) => ajaxFun('jsonp', url, data)
}
var interceptors = {
  request: {
    use: function (callback, errorCallback) {
      axios.interceptors.request.use(config => {
        return callback(config)
      }, error => {
        return errorCallback(error)
      })
    }
  },
  response: {
    use: function (callback, errorCallback) {
      axios.interceptors.response.use(config => {
        return callback(config)
      }, error => {
        return errorCallback(error)
      })
    }
  }
}
interceptors.response.use(response => {
    // 避免取对象报错
    if (response.data.data === null) {
      response.data.data = false
    }
    if ((!response.data || response.data.code === undefined) && response.data.indexOf('DOCTYPE html') < 0) {
      Message.error('接口格式错误')
      return Promise.resolve(false)
    } else if (response.data) {
        // 10003  10004 10005  转跳登录页
        // 10013 转跳修改密码页
      if (response.data.code === 10003 || response.data.code === 10004 || response.data.code === 10005) {
        $nuxt.$router.push({
          path: "/login"
        })
        return Promise.resolve(false)
      } else if (response.data.code === 10013) {
        $nuxt.$router.push({
          path: '/login/upDatePass',
          query: {
            type: 1
          }
        })
        return Promise.resolve(false)
      } else if (Number(response.data.code) !== 0) {
        if (response.data.msg && response.data.msg.length !== 0) {
          Message.error(response.data.msg)
        } else {
          Message.error('接口异常')
        }
        return Promise.resolve(false)
      }
    }
    return Promise.resolve(response)
  },
  err => {
    if (err.message.includes('timeout')) {
      Message.error('请求超时')
    } else {
      Message.error('接口错误')
    }
    Promise.resolve(false)
  }
)

export default ({ app, store, redirect }, inject) => {
  inject('ajax', ajax)
}

// export default ({ app, store, redirect }) => {
//   // The server-side needs a full url to works
//   // if (process.SERVER_BUILD) {
//   //   axios.defaults.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
//   // }
//   // interceptors request
//   axios.interceptors.request.use(config => {
//     if (typeof document === 'object') {
//       let token = getCookieInClient('token')
//       if (token) {
//         config.headers.Authorization = token;
//       }
//     }
//     return config;
//   }, err => {
//     return Promise.reject(err);
//   });

//   axios.interceptors.response.use(response => {
//     if (response.data.code === 401) {
//       redirect('/login')
//     }
//     return response;
//   }, function (error) {
//     return Promise.reject(error);
//   });
// }


// 在context中使用
// asyncData(context) {
//   context.app.$ajax.post('url', {}).then((data) => {
//     console.log("data", data);
//   }).catch((err) => {
//     console.log("err", err.response.data);
//   })
// }

// 在vue实例this中使用
// this.$ajax.post('login_URL', {}).then((data) => {
//   console.log(data)
// })