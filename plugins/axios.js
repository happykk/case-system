import axios from 'axios'
import querystring from 'querystring'
axios.defaults.withCredentials = true
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
  // if (type === 'jsonp') {
  //   let hyphen = (url.indexOf('?') > -1 ? '&' : '?')
  //   return axios({url: url + hyphen + querystring.encode(data), adapter: jsonpAdapter}).then((rs) => {
  //     return rs.data
  //   })
  // } else {
    return axios[type](url, data).then((rs) => {
      return rs.data
    })
  // }
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