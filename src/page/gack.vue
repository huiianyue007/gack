<template>
  <page>
    <div class="header">
      <div class="container content">
        <div class="fl">
          <span>客服热线 ：400-851-8585</span>
          <div class="inline-block icon sj"></div>
          <div class="inline-block icon wx">
            <img src="../assets/gack/ewm_u155.png" alt="">
          </div>
        </div>
        <div class="fr">
          <router-link to='/login/0' v-if='!user'>登录</router-link>
          <router-link to='/user' replace v-else> {{ user.username }} </router-link>
          <span>|</span>
          <router-link to='/register/0' v-if='!user'>注册</router-link>
          <span class='login_out' v-else @click='loginOut'>退出</span>
          <span>|</span>
          <router-link :to='{path: "/user/message", query: {title: "我的消息"}}'>消息</router-link>
          <span>|</span>
          <router-link to='/login/1' v-if='!user'>我要成为服务商</router-link>
          <span v-if='!user'>|</span>
          <router-link :to='{path: "/user/order", query: {title: "订单中心"}}'>订单中心</router-link>
          <span>|</span>
          <router-link to='/middle' v-if='user && !user.isProvider' ref = 'user'>我要成为服务商</router-link>
          <router-link to='/backhome' v-if='user && user.isProvider'>商户中心</router-link>
          <span v-if='user'>|</span>
          <router-link to='/help'>帮助中心</router-link>
        </div>
      </div>
    </div>
    <div class="head">
      <div class="head_in">
        <div class="logo">
          <img src="../assets/gack/pt_logo.png" alt="">
          <div class="select" >
            <el-row>
              <el-col :span = '12'><span>当前位置</span></el-col>
              <el-col :span = '12'>
                <el-select v-model='address.inCity.name' @visible-change = 'selectChange'>
                  <el-option v-for="(item, key) in address.openCity" :key = "key" :value = 'item.cityName'>
                    {{ item.cityName }}
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="sy_search" ref = 'search'>
          <div class="search">
            <input type="text" v-model = 'keywords' @keyup.enter = 'search'>
            <div class="search_btn" @click = 'search' id = 'search'></div>
          </div>
          <div class="search_key">
            <p v-if = 'homePage'>
              <strong>猜你喜欢：</strong>
              <router-link v-for = '(item, key) in homePage.hots' tag = 'span' :to = '{path: "/spacelist", query: {keywords: item.word,code:address.inCity.code}}' :key = 'key'>{{ item.word }}</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
    </div>
    <div class="connav" :class='{active: $route.path !== "/" || flag}' ref = 'nav'>
      <div class="connav_in">
        <ul>
          <li v-for='(nav,index) in navs' @mouseenter="enter(index)" @mouseleave="leave(nav)" @mouseover ='over(nav, index)'>
            <router-link :to='nav.url' exact v-if='nav.url && index !== 5 && index !== 4'>{{nav.title}}</router-link>
            <span v-else>{{ nav.title }}</span>
            <div class="space_list">
              <el-collapse-transition>
                <div v-if="nav.flag && index === 5 && spaceFlag && activeIndex == index">
                  <router-link tag = 'div' class="transition-box" v-for = '(item, key) in navData ' :key = 'key' :to = '{path: "/spacelist", query: {title: item.operatorServerClass.serverName}}'>{{ item.operatorServerClass.serverName }}</router-link>
                </div>
              </el-collapse-transition>
              <el-collapse-transition>
                <div v-if="nav.flag && index === 4 && spaceFlag && activeIndex == index">
                  <div class="transition-box" @click = 'routerTo("jinrong")'>推荐标的</div>
                  <div class="transition-box" @click = 'routerTo("tuijian")'>金融大咖</div>
                </div>
              </el-collapse-transition>
              <el-collapse-transition>
                <div v-if="nav.flag && index === 3 && spaceFlag && activeIndex == index">
                  <div class="transition-box"> 暂未开通，敬请期待</div>
                </div>
              </el-collapse-transition>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <nav-list v-if = 'flag && !selectFlag && navData.length' :index = 'activeIndex' :navData='navData' @changTab = 'change' @mouseleave.native = 'changeTab' :title = 'title' ref = 'navList'></nav-list>
    <keep-alive>
      <router-view :key="$route.fullPath"></router-view>
    </keep-alive>
    <customer></customer>
    <v-footer v-if='(/user/ig).test($route.path)' slot = 'footer'></v-footer>
    <my-footer v-else slot = 'footer'></my-footer>
    <div class="yindao" v-if = 'firstLogin && user'>
      <img src="~assets/gack/Group 23.png" alt="" @click = 'close'  class="close">
      <div class="first_img text-right" v-if = 'firstLogin == 1'>
        <div :style = 'styleWrap' class = 'step_img'>
          <img src="~assets/gack/step1.png"  alt="">
          <img src="~assets/gack/Group 30 Copy.png" class = 'step'  @click = '$store.commit("setFirstLogin", 2)'alt="">
        </div>
      </div>
      <div class="first_img text-right" v-if = 'firstLogin == 2'>
        <div :style = 'styleWrap' class = 'step_img'>
          <img src="~assets/gack/step2.png"  alt="">
          <img src="~assets/gack/Group 29 Copy.png" class = 'step step_one'  @click = '$store.commit("setFirstLogin", 3)'alt="">
        </div>
      </div>
      <div class="first_img text-center" v-if = 'firstLogin == 3'>
        <div :style = 'styleWrap' class = 'step_img' ref = 'stepTwo'>
          <img src="~assets/gack/step3.png"alt="" class = 'step_content'>
          <img src="~assets/gack/Group 31 Copy.png" class = 'step step_tow'  @click = '$store.commit("setFirstLogin", 0)'alt="">
        </div>
      </div>
    </div>
  </page>
</template>
<script>
  import myFooter from 'components/Footer'
  import vFooter from 'components/FooterNew'
  import myHeader from 'components/header'
  import navList from 'components/navList'
  import customer from 'components/customer'
//  import { map, getCurrentPosition } from 'assets/js/map'
  import { lazyAMapApiLoaderInstance } from 'vue-amap'
  import Vue from 'vue'
  import store from 'store'
  export default {
    async beforeRouteEnter (from, to, next) {
      await lazyAMapApiLoaderInstance.load()
      if (!AMap.CANVAS) {
        return next(vm => {
          vm.$router.go(0)
        })
      }
      let mapObj = new AMap.Map('iCenter')
      new Promise(resolve => {
        mapObj.plugin('AMap.Geolocation', function () {
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
            convert: true,
            showButton: true,
            buttonPosition: 'LB',
            buttonOffset: new AMap.Pixel(10, 20),
            showMarker: true,
            showCircle: true,
            panToLocation: true,
            zoomToAccuracy: true
          })
          mapObj.addControl(geolocation)
          geolocation.getCityInfo((status, result) => {
            if (status === 'complete') {
              resolve(result.city)
            } else {
              resolve('北京市')
            }
          })
        })
      }).then(async data => {
        let user = store.state.userInfo
        let session = store.state.userid
        if (!user && session) {
          await store.dispatch('findById', session.id)
        }
        return Vue.prototype.$htAjax.get(`https://apitest.gack.citic:8083/guoanmaker/operator/2app/getOpenCity2App?cityName=${data}&username=${user ? user.username : ''}&landType=1`)
      }).then(({ data }) => {
        store.commit('setLocalPosition', data.data)
        return Vue.prototype.$htAjax.post(`https://apitest.gack.citic:8083/guoanmaker/operator/PCoficial/getAllPc`, {}, {
          params: {
            cityId: data.data.inCity.code
          }
        })
      }).then(({ data }) => {
        store.commit('setHomePage', data.data)
      }).catch(() => {
      })
      next()
    },
    name: 'gack',
    data () {
      return {
        script: null,
        isProvider: false,
        spaceFlag: false,
        activeIndex: 0,
        script: null,
        // 是否审核
        keywords: '',
        regsType: 1,
        title: '首页',
        navs: [{
          title: '首页',
          url: '/',
          flag: false
        }, {
          title: '企业服务',
          flag: false
        }, {
          title: '知识产权服务',
          flag: false
        }, {
          title: '培训课程服务',
          flag: false
        }, {
          title: '投融资服务',
          flag: false
        }, {
          title: '办公空间服务',
          flag: false
        }, {
          title: '线下活动',
          flag: false,
          url: '/activity'
        }, {
          title: '创客动态',
          url: '/aboutus/1',
          flag: false
        }, {
          title: '关于我们',
          url: '/about',
          flag: false
        }, {
          title: '付费阅读',
          url: '/aboutus/2',
          flag: false
        }],
        flag: false,
        navData: [],
        styleWrap: null,
        selectFlag: false
      }
    },
    watch: {
      'address.inCity.name' (val) {
        let address = null
        this.address.openCity.forEach(item => {
          if (item.cityName === val) {
            address = item
            this.init(item.cityId)
          }
        })
        this.address.inCity.name = address.cityName
        this.address.inCity.code = address.cityId
        this.address.inCity.provinceId = address.provinceId
        this.address.inCity.provinceCode = address.provinceId
      },
      firstLogin (val) {
        if (val && this.user) {
          this.initYinDao()
        }
      }
    },
    mounted () {
      if (!this.script) {
        this.script = document.createElement('script')
        this.script.src = 'https://webchat.7moor.com/javascripts/7moorInit.js?accessId=97686210-8bc8-11e7-b98f-29761d1f4801&autoShow=true'
        this.script.async = 'async'
      }
      document.head.appendChild(this.script)
      if (document.getElementById('chatBtn')) {
        document.getElementById('chatBtn').style.display = 'block'
        document.getElementById('chatBtn').addEventListener('click', () => {
          _czc.push(["_trackEvent",'咨询客服','咨询']);
        })
      }
      if (this.firstLogin && this.user) {
        this.initYinDao()
      }
    },
    computed: {
      firstLogin () {
        return this.$store.state.firstLogin
      },
      LoginType() {
        if(this.user) {
          return 1
        } else {
          return 0
        }
      },
      homePage () {
        return this.$store.state.homePage
      }
    },
    components: {
      myFooter,
      myHeader,
      navList,
      vFooter,
      customer
    },
    beforeDestroy () {
      if (this.script) {
        document.head.removeChild(this.script)
      }
      document.getElementById('chatBtn').style.display = 'none'
    },
    methods: {
      selectChange (opt) {
        this.selectFlag = opt
      },
      close () {
        this.$store.commit('setFirstLogin', 0)
      },
      initYinDao () {
        if (this.firstLogin == 1) {
          this.styleWrap = {
            width: this.$refs.user.$el.offsetWidth + 20 + 'px',
            height: '28px',
            top: this.$refs.user.$el.offsetTop - 5 + 'px',
            left: this.$refs.user.$el.offsetLeft - 10 + 'px'
          }
        } else if (this.firstLogin == 2) {
          this.styleWrap = {
            width: this.$refs.search.offsetWidth + 20 + 'px',
            height: this.$refs.search.offsetHeight + 20 + 'px',
            top: this.$refs.search.offsetTop - 5 + 'px',
            left: this.$refs.search.offsetLeft - 10 + 'px'
          }
        } else if (this.firstLogin == 3) {
          this.$nextTick(() => {
            this.styleWrap = {
              top: this.$refs.nav.offsetTop - 20 + 'px',
              left: (window.innerWidth - 1190) / 2 + 'px'
            }
          })
        }
      },
      search () {
         if (!this.keywords) return false
        _czc.push(["_trackEvent",'搜索关键字','搜索', this.keywords]);
          this.$router.push({
          path: '/spacelist',
          query: {
            keywords: this.keywords,
            code: this.address.inCity.code
          }
        })
      },
      init (cityId) {
        this.$htAjax.post('https://apitest.gack.citic:8083/guoanmaker/operator/PCoficial/getAllPc', {}, {
          params: {
            cityId: cityId
          }
        }).then(({ data }) => {
          this.$store.commit('setHomePage', data.data)
        }).catch(error => {
          console.log(error)
        })
      },
      changeTab () {
        this.flag = false
      },
      routerTo (opt) {
        this.$router.push({
          path: '/service',
          query: {
            id0: opt,
            serverName0: opt !== 'tuijian' ? '推荐标的' : '金融大咖',
            type0: 3
          }
        })
      },
      change (opt) {
        let firstServerType = null,secondServerType = null,threeServerType = null
        Object.entries(opt).forEach(item => {
          if (item[0] == 'firstIndex') {
            firstServerType = this.navData[item[1]]
          } else if (item[0] == 'secondIndex') {
            secondServerType = firstServerType.serverClasTwo[item[1]]
          } else if (item[0] == 'threeIndex') {
            threeServerType = {
              serverClasThree: secondServerType.serverClasThree[item[1]]
            }
          }
        })
        let serverQuery = {}
        Object.entries(Object.assign(firstServerType, secondServerType, threeServerType)).filter(item => {
          return item[1] && !Array.isArray(item[1])
        }).forEach((item, index) => {
          serverQuery['id' + index] = item[1].id
          serverQuery['type' + index] = item[1].serverType
          serverQuery['serverName' + index] = item[1].serverName
        })
        this.flag = false
        if (this.activeIndex === 5) {
          return false
        }
        this.$router.push({
          path: '/service',
          query: serverQuery
        })
      },
      enter(index) {
        this.isActive = true
        if(index === 1) {
          this.isDisplays = true
        } else {
          this.isDisplays = false
        }
      },
      leave(opt) {
        this.spaceFlag = false
        this.$set(opt, 'flag', false)
        this.isActive = false
      },
      over (opt, index) {
        if (this.spaceFlag && this.homePage) {
          return false
        }
        this.navData = []
        this.activeIndex = index
        if (index === 4) {
          this.flag = false
          this.$set(opt, 'flag', true)
          this.spaceFlag = true
          return false
        }
        this.spaceFlag = false
        if(!opt.url) {
          if (index != 4) {
            this.title = opt.title
            if (index == 1) {
              this.navData = this.homePage.appsBusinessService
            } else if (index == 2) {
              this.navData = this.homePage.appsknowledgeService
            } else if (index == 3) {
              this.navData = this.homePage.appstrainService
            } else if (index == 5) {
              this.navData = this.homePage.appsspaceService
            }
            if (this.activeIndex === 3 || this.activeIndex === 5) {
              this.$set(opt, 'flag', true)
              this.flag = false
              this.spaceFlag = true
            } else {
              this.spaceFlag = false
              this.flag = true
            }
          }
        } else {
          this.flag = false
        }
      },
      loginOut() {
        this.$confirm('确认退出系统？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '成功退出系统!'
          })
          this.$router.push('/')
          this.siginOut()
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '退出系统失败!'
          })
        })
      },
      siginOut() {
        return new Promise((resolve, reject) => {
          this.$htAjax.post('https://apitest.gack.citic:8081/guoanmaker/personal/user/signOut').then(res => {
            _czc.push(["_deleteCustomVar","是否登录"]);
            this.$store.commit('setUserInfo', null)
            this.$store.commit('setUserId', null)
            this.$store.commit('setSessionId', null)
            window.localStorage.removeItem('password')
            resolve(res)
          }).catch(() => {
            reject()
          })
        })
      },
      // 注册
      register(o) {
        this.$router.push('/register/' + o)
      },
      login(o) {
        this.$router.push('/login/' + o)
      },
      // 后台商家中心
      sellerMe() {
        this.$router.push('/middle')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*gack_top*/
  .header {
    background: #f9f9f9;
    height: 35px;
    line-height: 32px;
    font-size: 12px;
    border-bottom: 1px solid #e2e2e2;
  }

  .header .fl span {
    margin-right: 25px;
  }

  .header .fr .login_out {
    cursor: pointer;
  }

  .header .fr span {
    cursor: pointer;
    margin: 0 10px;
  }

  .header .icon {
    width: 25px;
    height: 25px;
    vertical-align: middle;
    border-radius: 50%;
    background-position: center;
    background-repeat: no-repeat;
    transition: all linear .2s;
  }

  .header .icon.wx {
    margin-left: 15px;
    position: relative;
    background-image: url(~@/assets/gack/wx_icon.png);
  }

  .header .icon.wx:hover {
    background-image: url(~@/assets/gack/wx_icon1.png);
  }

  .header .icon.wx img {
    max-width: 137px;
    height: 171px;
    opacity: 0;
    display: none;
    position: absolute;
    top: 35px;
    z-index: 13;
    left: 0;
    transition: opacity linear .2s;
  }

  .header .icon.wx:hover img {
    display: block;
    opacity: 1;
    transition: opacity linear .2s;
  }

  .header .icon.sj {
    background-image: url(~@/assets/gack/sj_icon.png);
    background-size: 13px 18px;
  }

  .header .icon.sj:hover {
    transition: all linear .2s;
    background-image: url(~@/assets/gack/sj_icon1.png);
  }
  .gack {
    width: 100%;
    min-width: 1200px;
    height: auto;
    margin: 0 auto;
    padding: 0;
    overflow: hidden;
    background: #fff;
  }

  .gack_top {
    width: 100%;
    height: 35px;
    line-height: 34px;
    background: #F9F9F9;
    border-bottom: 1px solid #e2e2e2;
  }

  .gack_rop {
    float: left;
  }

  .top_in {
    width: 1200px;
    height: 35px;
    margin: 0 auto;
    font-size: 12px;
    color: #333;
  }

  .top_in .left {
    float: left;
    width: auto;
    height: auto;
    overflow: hidden;
  }

  .top_in .left span {
    float: left;
  }

  .phone_img {
    display: inline-block;
    width: 18px;
    height: 18px;
    margin: 8px;
    margin-left: 30px;
    background: url(../assets/gack/dh.png) no-repeat 0 0;
    background-size: 16px 16px;
  }

  .top_in .left:hover .phone_img {
    background: url(../assets/gack/dh1.png) no-repeat 0 0;
    background-size: 16px 16px;
  }

  .top_in .right {
    float: right;
    height: 15px;
    margin: 10px 0;
    line-height: 15px;
  }

  .top_in .gack_list {
    float: left;
    padding: 0 15px;
    cursor: pointer;
    border-right: 1px solid #999;
  }

  .top_in .gack_list:last-of-type {
    border: 0;
  }

  .top_in .gack_list:hover {
    color: #D7000F;
  }

  .ph_img {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url(../assets/gack/sj_icon.png) no-repeat 0 0;
    background-size: auto 16px;
  }

  .gack_list:nth-of-type(3):hover .ph_img {
    background: url(../assets/gack/sj_icon1.png) no-repeat 0 0;
    background-size: auto 16px;
  }

  .wei_img {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url(../assets/gack/wx_icon.png) no-repeat 0 0;
    background-size: 16px 16px;
  }

  .gack_list:nth-of-type(4):hover .wei_img {
    background: url(../assets/gack/wx_icon1.png) no-repeat 0 0;
    background-size: auto 16px;
  }

  .gack_list b {
    float: left;
    font-weight: 400;
  }
  /*head*/

  .head {
    width: 100%;
    overflow: hidden;
  }

  .head_in {
    width: 1200px;
    height: 100%;
    margin: 20px auto 0;
  }

  .head_in .logo {
    float: left;
    width: 210px;
    text-align: right;
    margin-right: 150px;
  }

  .head_in .logo .select {
    margin: 5px 0;
    display: inline-block;
  }

  .head_in .logo .select span {
    margin-right: 10px;
    line-height:36px;
  }

  .head_in .sy_search {
    float: left;
    width: 592px;
    height: 60px;
  }

  .head_in .sy_search .search {
    width: 592px;
    overflow: hidden;
    background: #fff;
    margin-bottom: 5px;
  }

  .head_in .sy_search .search input {
    border: 2px solid #333333;
    height: 35px;
    outline: none;
    padding: 0 10px 0;
    width: 536px;
    box-sizing: border-box;
    vertical-align: middle;
    font-size: 14px;
    font-family: "微软雅黑";
    float: left;
    line-height: 34px;
  }

  .head_in .sy_search .search_btn {
    float: left;
    width: 56px;
    height: 35px;
    background: url(../assets/gack/fw_ss.png) no-repeat;
    cursor: pointer;
  }

  .search_key {
    font-size: 14px;
    color: #9B9B9B;
    width: 100%;
    height: 20px;
    overflow: hidden;
  }

  .search_key p {
    font-size: 14px;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 20px;
  }

  .search_key p span {
    margin-right: 10px;
    color: #333;
    cursor: pointer
  }

  .search_key p span:hover {
    color: #ff0000;
  }

  .sy_fbxq {
    width: 144px;
    height: 35px;
    line-height: 32px;
    color: #fff;
    font-size: 15px;
    text-align: center;
    background: #ff5051;
    float: left;
    margin-left: 20px;
    cursor: pointer;
  }
  /*connav*/

  .connav {
    width: 100%;
    height: 40px;
    margin-top: 20px;
    line-height: 40px;
    position: relative;
    z-index: 12;
  }

  .active {
    z-index: 11;
    box-shadow: rgb(220, 220, 220) 0px 3px 5px!important;
  }

  .connav_in {
    width: 1200px;
    height: 40px;
    margin: 0 auto;
  }
  .connav_in .space_list{
    margin: 16px 0 0 -33px;
    background: #fff;
    position:absolute;
    width: 160px;
    text-align:center;
  }
  .connav_in .space_list .transition-box{
    padding: 10px 0;
  }
  .tips {
    position: absolute;
    left: 0;
    display: none;
    top: 40px;
    box-sizing: border-box;
    padding-top: 20px;
    height: 325px;
    width: 100%;
    background: #fff;
    z-index: 9999;
  }

  .tips_list {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    background: #fff;
    padding-left: 30px;
    box-sizing: border-box;
  }

  .tips_left,
  .tips_center {
    float: left;
    width: auto;
    overflow: hidden;
    height: auto;
    font-size: 14px;
    line-height: 36px;
    border-right: 1px rgba(255, 255, 255, 0.3) solid;
  }

  .tips_left li,
  .tips_center li {
    height: 36px;
    position: relative;
    padding: 0 40px 0 12px;
    cursor: pointer;
  }

  .tips_center ul {
    width: auto;
    display: none;
    height: auto;
    overflow: hidden;
  }

  .tips_center li {
    padding: 0 40px 0 15px;
    text-align: right;
  }

  .tips_center .displays,
  .tips_right .displays {
    display: block;
  }

  .displayTips {
    display: block;
  }

  .tips_left li:after,
  .tips_center li:after {
    content: '';
    width: 6px;
    height: 12px;
    background: url(../assets/gack/xy.png) no-repeat;
    background-size: 6px 12px;
    position: absolute;
    right: 15px;
    top: 13px;
  }
  /*.tips_left li:hover:after,.tips_center li:hover:after{
   background: url(../assets/gack/xy1.png) no-repeat;
    background-size: 6px 12px;
  }*/

  .tips_left .current:after,
  .tips_center .current:after {
    background: url(../assets/gack/xy1.png) no-repeat;
    background-size: 6px 12px;
  }
  /*.tips_left li:hover,.tips_center li:hover,.tips_right ul li:hover{
    background: #D7000F;
    color: #fff;
  }*/

  .tips_right ul li:hover {
    background: #D7000F;
    color: #fff;
  }

  .tips_left .current,
  .tips_center .current,
  .tips_right .current {
    background: #D7000F;
    color: #fff;
  }

  .tips_right {
    float: left;
    width: 660px;
    overflow: hidden;
    height: auto;
    font-size: 14px;
    line-height: 36px;
  }

  .tips_right ul {
    width: 100%;
    display: none;
    overflow: hidden;
    height: auto;
  }

  .tips_right ul li {
    width: 300px;
    float: left;
    height: 34px;
    cursor: pointer;
    line-height: 34px;
    padding: 0 20px;
    box-sizing: border-box;
    background: #f1f1f1;
    margin: 0 10px;
    margin-bottom: 10px;
  }

  .tp_infor {
    float: right;
  }

  .tp_infor li {
    cursor: pointer;
  }

  .connav_in ul {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding-left: 70px;
  }

  .connav_in ul li,
  .connav_in ul li .el-dropdown {
    width: auto;
    height: 40px;
    float: left;
    color: #333;
    font-size: 15px;
    cursor: pointer;
    padding-right: 40px;
  }

  .el-dropdown-menu {
    text-align: center;
    margin: 0;
    box-shadow: none;
    width: 160px;
    border: none;
  }

  .connav_in ul li:hover,
  .connav_in ul li:hover .el-dropdown {
    color: #c81523;
    font-weight: 600;
  }
  /*bananer*/

  .bananer {
    width: 100%;
    height: auto;
    background: #fff;
  }

  .el-carousel__item .ban_img {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin: 0;
  }

  .ban_img img {
    width: 100%;
    display: block;
  }
  /*企业发展历程*/

  .company_tree {
    width: 100%;
    min-width: 1200px;
    background: #F3F3F3;
    overflow: hidden;
    padding: 50px 0;
  }

  .company_tree .bt {
    width: 100%;
    height: auto;
    overflow: hidden;
  }

  .company_tree .bt_in {
    width: 281px;
    height: 57px;
    background: url(../assets/gack/fzlc.png) no-repeat;
    margin: 0 auto;
    text-align: center;
    line-height: 54px;
    font-size: 30px;
    color: #333333;
    margin-bottom: 44px;
  }

  .fz_cont {
    width: 1004px;
    margin: 0 auto;
    overflow: hidden;
  }

  .fz_cont .fz_lc {
    width: 100%;
    height: auto;
    margin-bottom: 40px;
  }

  .fz_cont .fz_lc ul {
    width: 100%;
    height: auto;
    overflow: hidden;
  }

  .fz_cont .fz_lc ul li {
    width: auto;
    float: left;
    margin-right: 19px;
    cursor: pointer;
    height: 260px;
  }

  .fz_cont .fz_lc .num {
    width: 185px;
    height: 64px;
    background: url(../assets/gack/tree_1.png) no-repeat;
    text-align: center;
    line-height: 64px;
    font-size: 20px;
    color: #fff;
  }

  .fz_cont .fz_lc li:nth-of-type(2) .num {
    background: url(../assets/gack/tree_2.png) no-repeat;
  }

  .fz_cont .fz_lc li:nth-of-type(3) .num {
    background: url(../assets/gack/tree_3.png) no-repeat;
  }

  .fz_cont .fz_lc li:nth-of-type(4) .num {
    background: url(../assets/gack/tree_4.png) no-repeat;
  }

  .fz_cont .fz_lc li:nth-of-type(5) .num {
    background: url(../assets/gack/tree_5.png) no-repeat;
  }

  .fz_cont .fz_lc ul li:last-of-type {
    margin-right: 0;
  }

  .fz_cont li .line {
    width: 2px;
    height: 30px;
    background: #B0B0B0;
    margin: 0 auto;
    -webkit-transition: all 0.1s linear;
    -o-transition: all 0.1s linear;
    -moz-transition: all 0.1s linear;
    transition: all 0.1s linear;
  }

  .fz_cont .fz_lc .icon {
    width: 64px;
    height: 64px;
    margin: 0 auto;
  }

  .fz_cont .fz_lc li:nth-of-type(1) .icon {
    background: url(../assets/gack/cbq.png) no-repeat;
  }

  .fz_cont .fz_lc ul li:nth-of-type(1) .hoticon {
    background: url(../assets/gack/cbq_1.png) no-repeat;
  }

  .fz_cont .fz_lc ul li:nth-of-type(1) .hotline {
    height: 60px;
    background: rgb(247, 1, 0);
  }

  .fz_cont .fz_lc ul li:nth-of-type(2) .icon {
    background: url(../assets/gack/zq.png) no-repeat;
  }

  .fz_cont .fz_lc ul li:nth-of-type(2) .hoticon {
    background: url(../assets/gack/zq_1.png) no-repeat;
  }

  .fz_cont .fz_lc ul li:nth-of-type(2) .hotline {
    height: 60px;
    background: rgb(245, 161, 0);
  }

  .fz_cont .fz_lc li:nth-of-type(3) .icon {
    background: url(../assets/gack/fzq.png) no-repeat;
  }

  .fz_cont .fz_lc ul li:nth-of-type(3) .hoticon {
    background: url(../assets/gack/fzq_1.png) no-repeat;
  }

  .fz_cont .fz_lc ul li:nth-of-type(3) .hotline {
    height: 60px;
    background: rgb(255, 109, 0);
  }

  .fz_cont .fz_lc li:nth-of-type(4) .icon {
    background: url(../assets/gack/tzq.png) no-repeat;
  }

  .fz_cont .fz_lc ul li:nth-of-type(4) .hoticon {
    background: url(../assets/gack/tzq_1.png) no-repeat;
  }

  .fz_cont .fz_lc ul li:nth-of-type(4) .hotline {
    height: 60px;
    background: rgb(153, 173, 0);
  }

  .fz_cont .fz_lc li:nth-of-type(5) .icon {
    background: url(../assets/gack/csq.png) no-repeat;
  }

  .fz_cont .fz_lc ul li:nth-of-type(5) .hoticon {
    background: url(../assets/gack/csq_1.png) no-repeat;
  }

  .fz_cont .fz_lc ul li:nth-of-type(5) .hotline {
    height: 60px;
    background: rgb(233, 31, 121);
  }

  .fz_cont .fz_lc .qi {
    margin-top: 20px;
  }

  .fz_cont .fz_lc .qi .cont {
    padding: 12px 8px;
    width: 185px;
    box-sizing: border-box;
    font-size: 14px;
    color: #878787;
    text-align: center;
    line-height: 28px;
    letter-spacing: 1px;
  }

  .fz_cont .clear {
    clear: both;
  }

  .fz_lb {
    width: 1004px;
    height: 224px;
    overflow: hidden;
    border: 1px solid #F6A200;
    box-sizing: border-box;
  }

  .fz_lb .realtive {
    position: absolute;
    width: 1004px;
    height: 136px;
  }

  .fz_lb .realtive img {
    width: 11px;
    height: 21px;
  }

  .fz_lb .realtive .next,
  .fz_lb .realtive .prev {
    position: absolute;
    z-index: 1;
    top: calc(50% - 10px);
  }

  .fz_lb .realtive .next {
    right: 15px;
  }

  .fz_lb .realtive .prev {
    left: 15px;
  }

  .fz_lb .swiper-container {
    width: 936px;
    overflow: hidden;
  }

  .fz_lb p {
    font-size: 16px;
    color: #F6A200;
    padding: 20px 0 20px 45px;
  }

  .swiper-slide {
    width: auto;
    margin: 0 10px;
    height: 136px;
  }

  .swiper-slide:hover .shadow {
    display: none;
    transition: all linear .2s;
  }

  .shadow {
    transition: all linear .2s;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .6);
  }

  .shadow .text {
    position: absolute;
    top: 43px;
    width: 100%;
    left: 0;
    text-align: center;
  }

  .shadow .text .mc {
    color: #fff;
  }

  .shadow .text .price {
    color: #f07630;
    margin-top: 12px;
  }

  .fz_lb img {
    width: 136px;
    height: 136px;
  }

  .card {
    width: 100%;
    min-width: 1200px;
    background: #fff;
    overflow: hidden;
    padding: 60px 0 50px;
  }

  .card .card_title {
    width: 319px;
    height: 51px;
    background: url(~@/assets/gack/kjfc.png) no-repeat;
    margin: 0 auto;
    text-align: center;
    line-height: 51px;
    font-size: 30px;
    color: #333333;
  }

  .card p {
    text-align: center;
    font-size: 18px;
    color: #A5A5A5;
    margin-top: 10px;
  }

  .card .card_container {
    margin: 40px auto 0;
  }

  .card .card_container li {
    margin-right: 30px;
    position: relative;
    cursor: pointer;
  }

  .card .card_container li:last-child {
    margin-right: 0;
  }

  .card .card_container li img {
    width: 376px;
    height: 376px;
  }

  .card .card_container li .bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #fff;
    background: #000;
    line-height: 58px;
    text-align: center;
    opacity: 1;
    transition: all linear .5s;
  }

  .card .card_container li .shadow {
    transition: all linear .5s;
    opacity: 0;
  }

  .card .card_container li:hover .bottom {
    opacity: 0;
    transition: all linear .5s;
  }

  .card .card_container li:hover .shadow {
    transition: all linear .5s;
    opacity: 1;
  }

  .card li h2 {
    font-size: 18px;
    color: #fff;
    text-align: center;
    font-weight: normal;
    margin: 60px 0 40px;
  }

  .card li h2:before {
    content: '';
    width: 6px;
    height: 6px;
    background: #00DDE5;
    display: inline-block;
    vertical-align: middle;
    margin: 0 10px 4px 0;
  }

  .card li p {
    width: 255px;
    font-size: 14px;
    color: #fff;
    margin: 0 auto;
    line-height: 26px;
    letter-spacing: 1px;
  }
  .yindao {
    position:absolute;
    top:0;
    width:0;
    width: 100%;
    height: 100%;
    z-index: 13;
    background: rgba(0, 0, 0, .5);
  }
  .yindao .close{
    position:absolute;
    top:30px;
    right: 30px;
    z-index: 13;
  }
  .step_img{
    position: absolute;
  }
  .first_img{
    position:absolute;
    width: 100%;
    min-width: 1200px;
  }
  .step {
    max-width: 300px;
    position: absolute;
    left: -70%;
  }
  .step_one{
    left: 460px;
  }
  .step_tow{
    left: auto;
    right: 30px;
  }
  .step_content {
    max-width: none;
  }
  .space_list{
    font-size: 14px;
    font-weight: normal;
    color: #333;
  }
  .space_list .transition-box:hover{
    color:#c81523;
  }
</style>
