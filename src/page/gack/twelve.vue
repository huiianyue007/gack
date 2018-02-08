<template>
  <page class = 'page'>
    <v-header slot = 'header'></v-header>
    <div class="logo" :style = 'logo'></div>
    <div class="oh list" v-if = 'list'>
      <div class="li_content" v-if = 'list.length <= 4'>
        <div class="fl cursor text-center li"  :class = '{active: activeIndex == index}' v-for = '(item, index) in list' :style = '{width: (100 / list.length) + "%"}' @click = 'selectContent(item, index)'>
          <div class="time">{{ item.time }}</div>
          <div class="li_title">{{ item.title }}</div>
          <div class="bottom" v-if = 'activeIndex == index'>{{ item.timeDown }}</div>
        </div>
      </div>
      <swiper :options="swiperOption" ref = 'mySwiper' class = 'li_content li_swiper' v-if = 'list.length > 4'>
        <swiper-slide v-for="(item, index) in list" :key = 'index' @click.native = "selectContent(item, index)" class="cursor text-center li"  :class = '{active: activeIndex == index}'>
          <div class="time">{{ item.time }}</div>
          <div class="li_title">{{ item.title }}</div>
          <div class="bottom" v-if = 'activeIndex == index'>{{ item.timeDown }}</div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="container oh content">
      <div class="fl li_con" v-for = 'item in content' @click = 'routeTo(item)'>
        <img :src="item.commodity_smallimage" alt="" class="fl logo">
        <div class="fl con_content">
          <div class="content_title">{{item.commodityName}}</div>
          <div class="content_subhead">{{item.businessName}}</div>
          <div class="content_price">{{ state != '2' ? '抢购价': ''}} <span class="price">￥{{ state != '2' ? item.skPrice: item.commodFinalPrice }}</span> <span class="old" v-if = 'state!= "2"'>原价 {{ item.commodFinalPrice }}</span></div>
          <div class="bottom">
            {{ state != '0' ? '剩余': '库存'}} {{ item.skNum }} <el-button type="primary" size = 'small' class = 'fr'>{{ state | getStatus }}</el-button>
          </div>
        </div>
      </div>
    </div>
    <v-footer slot = 'footer'></v-footer>
  </page>
</template>
<script>
  import vHeader from 'components/header'
  import vFooter from 'components/Footer'
  import store from 'store'
  import { lazyAMapApiLoaderInstance } from 'vue-amap'
  import Vue from 'vue'
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
        if (!user && session && store.state.autoLogin) {
          await store.dispatch('findById', session.id).catch(() => {})
        }
        return Vue.prototype.$htAjax.get(`${this.$config.activity}/guoanmaker/operator/2app/getOpenCity2App?cityName=${data}&username=${user ? user.username : ''}&landType=1`)
      }).then(({ data }) => {
        store.commit('setLocalPosition', data.data)
        return Vue.prototype.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/PCoficial/getAllPc`, {}, {
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
    data () {
      return {
        event: null,
        logo: null,
        time: 0,
        activeIndex: 0,
        now: new Date().getTime(),
        content: [],
        swiperOption: {
          pagination: null,
          slidesPerView: 4,
          spaceBetween: 0
        },
      }
    },
    filters: {
      getStatus (opt) {
        if (opt == '0') {
          return '立即抢购'
        } else if (opt == '1') {
          return '即将抢购'
        } else {
          return '立即查看'
        }
      }
    },
    mounted () {
      window.setInterval(() => {
        this.now+= 1000
      }, 1000)
      this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/Secckill/selectSecckillByActivityId`, {}, {
        params: {
          activityId: this.$route.query.id
        }
      }).then(({ data }) => {
        this.event = data.data
        this.logo = {
          background: `url("${this.event.eventPicUrl}") #E73833 no-repeat center center/contain`
        }
        let timeDistance = null
        let flag = false
        this.event.secckillMoveList.forEach((item, index) => {
          if (item.skStartTime <= this.now && item.skEndTime >= this.now) {
            this.time = item.skStartTime
            this.activeIndex = index
            flag = true
          } else if (!flag) {
            if (!timeDistance || timeDistance > Math.abs(this.now - item.skStartTime)) {
              timeDistance = Math.abs(this.now - item.skStartTime)
              this.time = item.skStartTime
              this.activeIndex = index
            }
          }
        })
        this.initContent()
      })
    },
    computed:{
      state () {
        return this.list[this.activeIndex].state
      },
      list () {
        if (this.event) {
          return this.event.secckillMoveList.map((item, index) => {
            let date =  new Date(item.skStartTime)
            item.time = date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
            if (item.skStartTime <= this.now && item.skEndTime >= this.now) {
              item.title = '正在抢购'
              item.state = '0'
              item.timeDown = `距离本场结束： ${this.getTime(item.skEndTime)}`
            } else if (item.skStartTime > this.now) {
              item.title = '即将开始'
              item.state = '1'
              item.timeDown = `距离开始: ${this.getTime(item.skStartTime)}`
            } else if (item.skEndTime < this.now) {
              item.title = '已结束'
              item.timeDown = '本场结束'
              item.state = '2'
            }
            return item
          })
        }
      }
    },
    methods: {
      initContent () {
        this.content = []
        this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/Secckill/selectSecckillByDate`, {}, {
          params: {
            activityId: this.$route.query.id,
            skStartTime: Math.floor(this.time / 1000)
          }
        }).then(({ data }) => {
          this.content = data.data
        })
      },
      selectContent(item, index) {
        this.activeIndex = index
        this.time = item.skStartTime
        this.initContent()
      },
      getTime(time) {
        time = Math.floor(Math.abs((this.now - time) / 1000))
        time = (Math.floor((time / 3600) % 24) < 10 ? '0' + Math.floor((time / 3600) % 24) : Math.floor((time / 3600) % 24)) + ':' + (Math.floor((time / 60) % 60) < 10 ? '0' + Math.floor((time / 60) % 60) : Math.floor((time / 60) % 60)) +
          ':' + (Math.floor(time % 60) < 10 ? '0' + Math.floor(time % 60) : Math.floor(time % 60))
        return time
      },
      routeTo (item) {
        this.$router.push({
          path: `/serde/${item.commodId}/1`,
          query: {
            secckillId: item.id
          }
        })
      }
    },
    components: {
      vHeader, vFooter
    }
  }
</script>
<style scoped>
  .page{
    background: #eee;
  }
  .logo{
    padding-bottom: 26%;
  }
  .list{
    padding-bottom: 9%;
    position: relative;
  }
  .li_content{
    position: absolute;
    width:100%;
    height: 100%
  }
  .list .li{
    background: #FDAD9A;
    color: #4A4A4A;
    padding-top:27px;
  }
  .list .li.active {
    background: #DB3712;
    color: #FAFAFA;
    padding-top:10px;
  }
  .list .li .time{
    font-size: 24px;
  }
  .list .li .li_title{
    margin: 15px 0 10px;
    font-size: 18px;
  }
  .list .li .bottom{
    background: #F5A623;
    line-height:1.5em;
    padding:6px 0;
  }
  .content{
    margin:20px auto 100px;
  }
  .li_con{
    width: calc(50% - 10px);
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
    margin: 5px;
  }
  .li_con .bottom{
    width: 100%;
  }
  .li_swiper {
    height: auto
  }
  .li_con .logo{
    width: 200px;
    height: 200px;
    padding-bottom: 0;
  }
  .li_con .con_content {
    width: calc(100% - 210px);
    margin-left: 10px;
  }
  .content_title {
    font-size: 24px;
    color:#4A4A4A;
    margin: 10px 0;
  }
  .price{
    font-size: 20px;
    color: red;
  }
  .old{
    text-decoration: line-through;
    color: #C5C5C5;
    margin-left:15px;
    font-size: 12px;
  }
  .content_subhead{
    font-size: 12px;
    color: #9B9B9B;
    margin: 20px 0 30px;
  }
  .content_price{
    margin: 20px 0 30px;
  }
</style>
