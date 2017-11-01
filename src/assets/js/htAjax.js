import axios from 'axios'
class htAjax {
  constructor () {
    this.instance = axios.create()
    this.instanceGlobal = this.instance.defaults
    this.instance.interceptors.response.use(res => {
      if (res.config.midwares) {
        let midleware = Object.values(res.config.midwares).map(item => {
          return item(res)
        })
        return Promise.all(midleware).then(res => {
          return res[midleware.length - 1]
        }).catch(error => {
          return Promise.reject(error)
        })
      } else {
        return res
      }
    }, function (error) {
      return Promise.reject(error)
    })
  }
  request (config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
  get (url, config = {}) {
    config.url = url
    config.method = 'get'
    return this.request(config)
  }
  post (url, data, config = {}) {
    config.url = url
    config.data = data
    config.method = 'post'
    return this.request(config)
  }
  put (url, data, config = {}) {
    config.url = url
    config.data = data
    config.method = 'put'
    return this.request(config)
  }
  delete (url, data, config = {}) {
    config.url = url
    config.data = data
    config.method = 'delete'
    return this.request(config)
  }
}
export default htAjax
