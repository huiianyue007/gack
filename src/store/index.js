import 'es6-promise/auto'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  count: 1,
  userid: '',
  business: '',
  orderid: '',
  stateOrder: '',
  roomServer: '2',
  stateId: '',
  stateId2: '' ,
  comId: '',
  position: null,
  adminleftnavnum: "1", //管理后台左侧导航
  isProvider: '',
  userInfo: null,
  addressList: [],
  compile: '',//空间编辑
  homePage: null,
  sessionid: '',
  appoint: null,
  firstLogin: 0,
}

//改变状态  缪
const mutations = {
  setFirstLogin (state, opt) {
    state.firstLogin = opt
  },
  increment(state) {
    state.count++
  },
  setUserId(state, opt) {
    state.userid = opt
  },
  setAddress(state, opt) {
    state.addressList = opt
  },
  setAppoint (state, opt) {
    state.appoint = opt
  },
  addAddress(state, opt) {
    state.addressList.push(opt)
  },
  setLocalPosition (state, opt) {
    state.position = opt
  },
  removeAddress(state, opt) {
    if (!state.addressList.length) return
    state.addressList.splice(opt, 1)
  },
  setUserInfo(state, opt) {
    state.userInfo = opt
  },
  orderState(state, opt) {
    state.stateOrder = opt
  },
  setSessionId (state, opt) {
    state.sessionid = opt
  },
  isRoomServer(state, opt) {
    state.roomServer = opt
  },
  setHomePage (state, opt) {
    state.homePage = opt
  },
  initStore (state, opt) {
    for (let name in opt) {
      state[name] = opt[name]
    }
  },
  businessInfo(state, opt) {
    state.business = opt
  },
  activitycompile(state,opt){
    state.compile = opt
  }
}

//过滤
const getters = {
  /* count(state) {
   return state.count += 100;
   }*/
}

//异步改变状态

const actions = {
  findById({ commit }, opt) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$htAjax.post('https://apitest.gack.citic:8081/guoanmaker/personal/user/findById', {}, {
        params: {
          userid: opt
        }
      }).then(({ data }) => {
        commit('setUserInfo', data.data)
        resolve(data.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
export default new Vuex.Store({
  state, mutations, getters, actions
})
