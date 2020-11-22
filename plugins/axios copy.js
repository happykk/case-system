import Vue from 'vue'
import axios from 'axios'
import querystring from 'querystring'
import { Message } from "element-ui";
// axios.defaults.withCredentials = true
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
        // return Promise.reject(error)
        return errorCallback(error)
      })
    }
  },
  response: {
    use: function (callback, errorCallback) {
      axios.interceptors.response.use(config => {
        return callback(config)
      }, error => {
        // return Promise.reject(error)
        return errorCallback(error)
      })
    }
  }
}
interceptors.response.use(
  response => {
    // 避免取对象报错
    if (response.data.data === null) {
      response.data.data = false
    }
    if ((!response.data || response.data.code === undefined) && response.data.indexOf('DOCTYPE html') < 0) {
      Message.error('接口格式错误')
      return Promise.resolve(false)
    } else if (response.data) {
      if (response.data.code === 100000) {
        store.dispatch("fedLogout").then(() => {
          Message.error("验证失败,请重新登录");
          router.push({
            path: "/login"
          });
        });
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
var setOpt = function (opt) {
  Object.assign(axios.defaults, opt)
}
export default ({ app }, inject) => {
  inject('ajax', ajax)
}
// 在context中使用
// asyncData(context) {
//   context.app.$request.post('url', {}).then((data) => {
//     console.log("data", data);
//   }).catch((err) => {
//     console.log("err", err.response.data);
//   })
// }

// 在vue实例this中使用
// this.$request.post('login_URL', {}).then((data) => {
//   console.log(data)
// })
// export {
//   ajax,
//   axios,
//   interceptors,
//   setOpt
// }