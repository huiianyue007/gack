<template>
  <page>
    <div class="header">
      <div class="container content">
        <div class="fl">
          <city-select class="inline-block city"></city-select>
          <div class="inline-block cursor icon">
            手机浏览
            <img src="../assets/images/gack/ewm_u155.png" alt="">
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
          <router-link to='/middle' v-if='user && !user.isProvider' ref='user'>我要成为服务商</router-link>
          <router-link to='/backhome' v-if='user && user.isProvider'>商户中心</router-link>
          <span v-if='user'>|</span>
          <router-link to='/help'>帮助中心</router-link>
        </div>
      </div>
    </div>
    <div class="head">
      <div class="head_in">
        <router-link tag = 'div' to = "/" class="logo">
          <img src="../assets/images/gack/pt_logo.png" alt="">
        </router-link>
        <div class="sy_search" ref='search'>
          <div class="search">
            <input type="text" v-model='keywords' @keyup.enter='search' :placeholder="homePage && homePage.hot ? homePage.hot.word : ''">
            <div class="search_btn" @click='search' id='search'></div>
          </div>
          <div class="search_key">
            <p v-if='homePage'>
              <strong>猜你喜欢：</strong>
              <router-link v-for='(item, key) in homePage.hots' tag='span' :to='{path: "/spacelist", query: {keywords: item.word,code:address.inCity.code}}' :key='key'>{{ item.word }}</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
    </div>
    <div class="connav" :class='{active: $route.path !== "/"}' ref='nav'>
      <div class="connav_in">
        <ul :class="{service: $route.path =='/'}">
          <li v-for='(nav,index) in navs' v-if='$route.path !=="/" || index!== 0' :class='{"active_li": activeIndex == index}' :key='index' @mouseenter="enter(index)" @mouseleave="leave(nav)" @mouseover.self='over(nav, index)'>
            <span @click='opentoRoute(nav, index)' v-if='nav.url'>{{nav.title}}</span>
            <span v-else>{{ nav.title }}</span>
            <div class="space_list" v-if='$route.path == "/" && (index == 3 || index == 2 || index == 4)'>
              <el-collapse-transition v-if="index == 3">
                <div v-if="spaceFlag && homePage && activeSpaceIndex == 3">
                  <div class="transition-box" v-for='(item, key) in homePage.appsspaceService ' :key='key' @click = 'spaceRouteTo (item)'>{{ item.operatorServerClass.serverName }}</div>
                </div>
              </el-collapse-transition>
              <el-collapse-transition v-if='index === 2'>
                <div v-if="spaceFlag && activeSpaceIndex == 2">
                  <div class="transition-box" v-for='(item, key) in homePage.financingServiceNewVOs' :key='key' @click='routerTo(key, index)'>{{ item.operatorFinancingServiceNew.financingName }}</div>
                  <!--<div class="transition-box" @click = 'routerTo("jinrong")'>推荐标的</div>-->
                  <!--<div class="transition-box" @click = 'routerTo("tuijian")'>金融大咖</div>-->
                </div>
              </el-collapse-transition>
              <!--<el-collapse-transition v-if='index === 4'>-->
                <!--<div v-if="spaceFlag && activeSpaceIndex == 4 && homePage.appcollaborateService">-->
                  <!--<div class="transition-box" @click='change(homePage.appcollaborateService[0], 0, index)' v-for='(item, index) in homePage.appcollaborateService[0].serverClasTwo'>{{ item.operatorSerTwo.serverName}}</div>-->
                <!--</div>-->
              <!--</el-collapse-transition>-->
            </div>
            <nav-list v-if='index == 1 && $route.path == "/" && navData.length' :navData='navData' @changTab='change' @mouseleave.native='changeTab' :title='title' ref='navList'></nav-list>
            <el-collapse-transition class="space_list" v-if="$route.path !== '/'" mode='out-in'>
              <nav-data-list :navData="routeNavData" v-if='activeSpaceIndex == index && (index == 1 || index == 2 || index == 3) && isActive' @changeRouteTab='change' @clickRouteTab='clickRoute'></nav-data-list>
            </el-collapse-transition>
          </li>
        </ul>
      </div>
    </div>
    <router-view :key="$route.fullPath"></router-view>
    <customer></customer>
    <v-footer v-if='(/user/ig).test($route.path)' slot='footer'></v-footer>
    <my-footer v-else slot='footer'></my-footer>
    <div class="yindao" v-if='firstLogin && user'>
      <img src="~assets/images/gack/Group 23.png" alt="" @click='close' class="close">
      <div class="first_img text-right" v-if='firstLogin == 1'>
        <div :style='styleWrap' class='step_img'>
          <img src="~assets/images/gack/step1.png" alt="">
          <img src="~assets/images/gack/Group 30 Copy.png" class='step' @click='$store.commit("setFirstLogin", 2)' alt="">
        </div>
      </div>
      <div class="first_img text-right" v-if='firstLogin == 2'>
        <div :style='styleWrap' class='step_img'>
          <img src="~assets/images/gack/step2.png" alt="">
          <img src="~assets/images/gack/Group 29 Copy.png" class='step step_one' @click='$store.commit("setFirstLogin", 3)' alt="">
        </div>
      </div>
      <div class="first_img text-center" v-if='firstLogin == 3'>
        <div :style='styleWrap' class='step_img' ref='stepTwo'>
          <img src="~assets/images/gack/step3.png" alt="" class='step_content'>
          <img src="~assets/images/gack/Group 31 Copy.png" class='step step_tow' @click='$store.commit("setFirstLogin", 0)' alt="">
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
  import citySelect from 'components/citySelect'
  //  import { map, getCurrentPosition } from 'assets/js/map'
  import { lazyAMapApiLoaderInstance } from 'vue-amap'
  import Vue from 'vue'
  import store from 'store'
  import config from '@/config'
  import navDataList from 'components/navDataList'
  export default {
    async beforeRouteEnter(from, to, next) {
      if (store.state.homePage) {
        next()
        return false
      }
      await lazyAMapApiLoaderInstance.load()
      if(!AMap.CANVAS) {
        return next(vm => {
          vm.$router.go(0)
        })
      }
      let mapObj = new AMap.Map('iCenter')
      let data = await new Promise(resolve => {
        mapObj.plugin('AMap.Geolocation', function() {
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
            if(status === 'complete') {
              resolve(result.city)
            } else {
              resolve('北京市')
            }
          })
        })
      })
      let user = store.state.userInfo
      let session = store.state.userid
      if(!user && session) {
        await store.dispatch('findById', session.id).catch(() => {})
      }
      let ad = encodeURI(data)
      let res = await Vue.prototype.$htAjax.get(`${config.activity}/guoanmaker/operator/2app/getOpenCity2App?cityName=${ad}&username=${user ? user.username : ''}&landType=1`)
      store.commit('setLocalPosition', res.data.data)
      let res1 = await Vue.prototype.$htAjax.post(`${config.activity}/guoanmaker/operator/PCoficial/getAllPc`, {}, {
        params: {
          cityId: res.data.data.inCity.code
        }
      })
      res1.data.data.appsBusinessService = res1.data.data.appsBusinessService.concat(res1.data.data.appsknowledgeService)
      store.commit('setHomePage', res1.data.data)
      next()
    },
    name: 'gack',
    data() {
      return {
        script: null,
        isProvider: false,
        routeNavData: [],
        spaceFlag: false,
        activeIndex: 1,
        selectIndex: 0,
        activeSpaceIndex: 0,
        activeNavFlag: false,
        // 是否审核
        keywords: '',
        regsType: 1,
        title: '首页',
        navs: [{
          title: '首页',
          url: '/',
        }, {
          title: '企业服务',
        }, {
          title: '金融服务',
          arr: [{
            title: '推荐标的'
          }, {
            title: '金融大咖'
          }]
        }, {
          title: '办公租赁',
        }, {
          title: '线下活动',
          url: '/activity'
        }, {
          title: '合同模版',
          url: '/contract'
        }, {
          title: '商标专利查询',
          url: '/trademark/1',
        }, {
          title: '创客动态',
          url: '/aboutus/1',
        }, {
          title: '关于我们',
          url: '/about',
        }, {
          title: '付费阅读',
          url: '/aboutus/2'
        }],
        styleWrap: null,
        isActive: false
      }
    },
    watch: {
      firstLogin(val) {
        if(val && this.user) {
          this.initYinDao()
        }
      }
    },
    mounted() {
      this.activeIndex = this.navs.findIndex(item => {
        return item.url == this.$route.path
      })
      if (this.$route.path == '/service') {
        this.activeIndex = 1
      }
      if (this.$route.path == '/finance') {
        this.activeIndex = 2
      }
      if (this.$route.path == '/spacelist') {
        this.activeIndex = 3
      }
      if (this.$route.path == '/service' && this.$route.query.type == 'appcollaborateService') {
        this.activeIndex = 4
      }
      if(this.firstLogin && this.user) {
        this.initYinDao()
      }
    },
    computed: {
      firstLogin() {
        return this.$store.state.firstLogin
      },
      LoginType() {
        if(this.user) {
          return 1
        } else {
          return 0
        }
      },
      homePage() {
        return this.$store.state.homePage
      },
      navData() {
        if(this.homePage) {
          return this.homePage.appsBusinessService.map(item => {
            item.serverName = item.operatorServerClass.serverName
            item.type = 'appsBusinessService'
            return item
          })
        } else {
          return []
        }
      }
    },
    components: {
      myFooter,
      myHeader,
      navList,
      vFooter,
      customer,
      citySelect,
      navDataList
    },
    methods: {
      spaceRouteTo (opt) {
        this.activeIndex = 3
        this.$router.push({path: "/spacelist", query: {title: opt.operatorServerClass.serverName}})
      },
      opentoRoute(nav, index) {
        if (index == 7) {
          this.$store.commit('setTradeNum', true)
        }
        this.activeIndex = index
        this.$router.push(nav.url)
      },
      clickRoute(opt, index) {
        this.routerTo(index)
      },
      close() {
        this.$store.commit('setFirstLogin', 0)
      },
      clickTo(opt) {
        this.$store.commit('setTradeNum', true)
        this.$router.push(`/trademark/${opt}`)
      },
      initYinDao() {
        if(this.firstLogin == 1) {
          this.styleWrap = {
            width: this.$refs.user.$el.offsetWidth + 20 + 'px',
            height: '28px',
            top: this.$refs.user.$el.offsetTop - 5 + 'px',
            left: this.$refs.user.$el.offsetLeft - 10 + 'px'
          }
        } else if(this.firstLogin == 2) {
          this.styleWrap = {
            width: this.$refs.search.offsetWidth + 20 + 'px',
            height: this.$refs.search.offsetHeight + 20 + 'px',
            top: this.$refs.search.offsetTop - 5 + 'px',
            left: this.$refs.search.offsetLeft - 10 + 'px'
          }
        } else if(this.firstLogin == 3) {
          this.$nextTick(() => {
            this.styleWrap = {
              top: this.$refs.nav.offsetTop - 20 + 'px',
              left: (window.innerWidth - 1190) / 2 + 'px'
            }
          })
        }
      },
      search() {
        this.keywords = this.keywords.replace(/ /g, '')
        if(!this.keywords) return false
        _czc.push(["_trackEvent", '搜索关键字', '搜索', this.keywords]);
        this.$router.push({
          path: '/spacelist',
          query: {
            keywords: this.keywords,
            code: this.address.inCity.code
          }
        })
      },
      changeTab() {},
      routerTo(opt, index) {
        this.activeIndex = this.selectIndex
        if(opt == 0) {
          this.$router.push({
            path: '/service',
            query: {
              id0: 'tuijian',
              serverName0: '金融大咖',
              type0: 3
            }
          })
        } else if(opt == 1) {
          this.$router.push('/finance')
        }

      },
      change(opt, key, index) {
        this.activeIndex = this.selectIndex
        if(opt.type == 'space') {
          this.$router.push({
            path: "/spacelist",
            query: {
              key: key,
              index: index
            }
          })
        } else {
          this.$router.push({
            path: '/service',
            query: {
              key: key,
              index: index,
              type: opt.type || 'appcollaborateService'
            }
          })
        }
      },
      enter(index) {
        this.isActive = true
        this.selectIndex = index
        if(index === 1) {
          this.isDisplays = true
        } else {
          this.isDisplays = false
        }
      },
      leave(opt) {
        this.spaceFlag = false
        this.isActive = false
      },
      over(opt, index) {
        this.spaceFlag = false
        this.activeSpaceIndex = index
        if(!opt.url && this.homePage) {
          this.title = opt.title
          if(index == 3 || index == 2 || index == 4) {
            this.spaceFlag = true
          }
        }
        if(this.$route.path !== "/" && this.homePage) {
          this.isActive = true
          if(index == 1) {
            this.routeNavData = this.homePage.appsBusinessService.map(item => {
              item.serverName = item.operatorServerClass.serverName
              item.type = 'appsBusinessService'
              return item
            })
          } else if(index == 2) {
            this.routeNavData = this.homePage.financingServiceNewVOs.map(item => {
              item.serverName = item.operatorFinancingServiceNew.financingName
              return item
            })
          } else if(index == 3) {
            this.routeNavData = this.homePage.appsspaceService.map(item => {
              item.serverName = item.operatorServerClass.serverName
              item.type = 'space'
              return item
            })
          } else if(index == 4) {
            if(Array.isArray(this.homePage.appcollaborateService)) {
              this.routeNavData = this.homePage.appcollaborateService.map(item => {
                item.serverName = item.operatorServerClass.serverName
                item.type = 'appcollaborateService'
                return item
              })
            } else {
              this.routeNavData = []
            }
          }
        }
      },
      loginOut() {
        this.$confirm('确认退出系统？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/')
          this.siginOut()
        }).catch(() => {})
      },
      siginOut() {
        return new Promise((resolve, reject) => {
          this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/user/signOut`).then(res => {
            _czc.push(["_deleteCustomVar", "是否登录"]);
            this.$message({
              type: 'success',
              message: '成功退出系统!'
            })
            this.$store.commit('setUserInfo', null)
            this.$store.commit('setUserId', null)
            this.$store.commit('setSessionId', null)
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
    background: #363636;
    height: 35px;
    line-height: 32px;
    color: #fff;
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

  .header .icon,
  .header .city {
    vertical-align: middle;
    background-position: center;
    background-repeat: no-repeat;
    transition: all linear .2s;
  }

  .header .icon {
    margin-left: 15px;
    position: relative;
  }

  .header .icon img {
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

  .header .icon:hover img {
    display: block;
    opacity: 1;
    transition: opacity linear .2s;
  }

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
    line-height: 36px;
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
    background: url(../assets/images/gack/fw_ss.png) no-repeat;
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
    text-align: left;
    margin: 0 auto;
  }

  .connav_in .space_list {
    background: #fff;
    position: absolute;
    left: 0;
    text-align: center;
    color: #666;
    width: 100%;
  }

  .connav_in .space_list .transition-box {
    padding: 10px 0;
  }

  .connav_in .space_list .transition-box:hover {
    color: #ff0000;
  }

  .connav_in ul {
    display: inline-block;
    height: 40px;
    box-sizing: border-box;
  }

  .connav_in ul li,
  .connav_in ul li .el-dropdown {
    width: auto;
    height: 40px;
    float: left;
    color: #333;
    font-size: 14px;
    cursor: pointer;
    padding: 0 23px;
  }

  .connav_in .service li:nth-child(1) {
    width: 230px;
    padding: 0;
    color: #fff;
  }
  .connav_in .service li:nth-child(1) span {
    display: inline-block;
    width: 100%;
    padding: 8px 10px;
    box-sizing: border-box;
    background: #363636;
    color: #fff;
    font-size: 18px;
    text-align: center;
  }

  .connav_in .service li {
    padding: 0 23px;
    position: relative;
  }
  .connav_in ul li:hover,
  .connav_in ul li .transition-box:hover  {
    color: #c81523;
    font-weight: 600;
  }
  .connav_in .service li:nth-child(1):hover{
    font-weight: normal;
  }
  .connav_in ul li.active_li {
    color: #c81523;
    font-weight: 600;
  }

  .connav_in ul li.active_li>>>.nav_box {
    color: #666;
    font-weight: normal;
  }

  .connav_in ul li:hover>>>.nav_box {
    color: #666;
    font-weight: normal;
  }
</style>
