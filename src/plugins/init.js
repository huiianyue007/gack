import Vue from 'vue'
import store from 'store'
import global from '@/config/global'
import * as filter from '@/config/filters'
import elementUI from 'element-ui'
import echarts from 'echarts'
import HtAjax from 'assets/js/htAjax'
import 'plugins/globalComponents'
import config from '@/config'
import htVuexStorage from 'assets/js/htVuexStorage'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import router from '@/router'
// import BaiduMap from 'vue-baidu-map'
// import { map, getCurrentPosition } from 'assets/js/map'
import qs from 'qs'
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '09f2533b848278d21de10ba78280e50e',
  plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor', 'Geolocation', 'Geocoder', 'MarkerClusterer']
});
Vue.mixin(global)
Vue.use(elementUI)
Vue.prototype.$echarts = echarts
const htAjax = new HtAjax()
const htAjaxGlobal = htAjax.instanceGlobal
const tkAjax = new HtAjax()
const tkAjaxGlobal = tkAjax.instanceGlobal
Vue.prototype.$htAjax = htAjax
Vue.prototype.$htAjaxGlobal = htAjaxGlobal
Vue.prototype.$tkAjax = tkAjax
Vue.prototype.$tkAjaxGlobal = tkAjaxGlobal
Vue.prototype.$qs = qs
Vue.prototype.$config = config
for (let name in filter) {
  Vue.filter(name, filter[name])
}
Vue.use(VueAwesomeSwiper)
// Vue.use(BaiduMap, {
//   /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
//   ak: 'gxyx1HZFGWDf6ogXwRQYi5jmTKop0TiQ'
// })
htVuexStorage.init(config.storageKeys, config.sessionKeys, store, storage => {
  store.commit('initForm', storage)
})
htAjaxGlobal.midwares = [res => {
  return new Promise((resolve, reject) => {
    if (res.data.status == 99) {
      router.push('/login/0')
      reject(res)
    } else {
      resolve(res)
    }
  })
}, res => {
  return new Promise((resolve, reject) => {
    if (res.data.success || res.data.status == 'SUCCESS') {
      resolve(res)
    } else {
      reject(res)
    }
  })
}, res => {
  return new Promise((resolve, reject) => {
    if (res.data.data && res.data.data.key === 'error') {
      reject(res)
    } else {
      resolve(res)
    }
  })
}]
if (store.state.sessionid) {
  htAjaxGlobal.headers = {
    'Authorization': `Bearer ${store.state.sessionid}`
  }
}
// map('gxyx1HZFGWDf6ogXwRQYi5jmTKop0TiQ').then(function (BMap) {
//   return getCurrentPosition(BMap)
// }).then(async function (position) {
//   let user = null
//   if (store.state.userid) {
//     user = await store.dispatch('findById', store.state.userid.id)
//   }
//   return htAjax.get(`${config.activity}/guoanmaker/operator/2app/getOpenCity2App?cityName=${position.address.city}&username=${user ? user.username : ''}&landType=1`)
// }).then(function ({ data }) {
//   store.commit('setLocalPosition', data.data)
// }).catch(() => {
//   store.dispatch('findById', store.state.userid.id)
// })
if (store.state.userid) {
  store.dispatch('findById', store.state.userid.id).then(() => {
    _czc.push(["_setCustomVar","是否登录","已登录",72000]);
  }).catch(() => {

  })
}
