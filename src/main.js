import Vue from 'vue'
import App from './App'
import router from './router'
import store from 'store'
import 'plugins/init'
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  },
  watch: {
    '$route' () {
      if(_czc) {
        var location = window.location
        var content_url = location.pathname + location.hash
        var referer_url = '/'
        _czc.push(['_trackPageview', content_url, referer_url])
      }
    },
  }
})