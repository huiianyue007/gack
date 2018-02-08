<template>
  <div class="page twelve_page">
    <div class="first">
      <div class="oh text-center receive_content">
        <img src="../assets/images/gack/Received.png" @click = 'receive' alt="" class="receive">
      </div>
      <div class="qr" :class = "{bottom: scrollTop > 250}">
        <img src="~@/assets/images/gack/qr1.png" alt="" />
      </div>
      <!--<div class="ratio zhiyin" @click = 'dialogTableVisible = true'>-->
        <!--<div class="li_padding"></div>-->
      <!--</div>-->
    </div>
    <!--<div class="qiandao text-center" @click = 'qiandao' :class = "{top: scrollTop > 250}">-->
      <!--<img src="~@/assets/images/gack/qiandao.png" alt="">-->
    <!--</div>-->
    <div class="container">
      <!--<ul class="oh card coupon">-->
        <!--<li class="ratio fl" :class = '{"coupon_active": item.flag}' v-for = '(item, index) in coupon' :style = '{background: `url(${item.imgSrc}) top center/100% no-repeat`}'>-->
          <!--<div class="li_padding"></div>-->
          <!--<div class="rat_content" @click = 'getCoupon(item, index)'></div>-->
          <!--<div class="coupon_shadow" v-if = 'item.flag' @click = '$message.error("您已领取过优惠券")'></div>-->
          <!--<div class="coupon_shadow" v-if = 'item.timeFlag' :style="{background: `url(${item.shadowImgSrc}) rgba(0, 0, 0, .5) no-repeat center center/contain`}" @click = '$message.success("敬请期待")'></div>-->
        <!--</li>-->
      <!--</ul>-->
      <div class="text-center card_title">
        <img src="~@/assets/images/gack/timeLimit.png">
      </div>
      <div class="oh card twelve">
        <div class="swiper_icon prev" @click = 'prev'></div>
        <div class="swiper_icon next" @click = 'next'></div>
        <div class="list" v-if='list '>
          <div class="li_content" v-if='list.length <=4 '>
            <div class="fl cursor text-center li" :class='{active: activeIndex==index, ending: item.state == 2} ' v-for='(item, index) in list ' :style='{width: (100 / list.length) + "%"} ' @click='selectContent(item, index) '>
              <div class="time">{{ item.time }}</div>
            </div>
          </div>
          <div class="text-center time_down">
            {{ list[activeIndex].timeDown }}
          </div>
          <swiper :options="swiperOption" ref='mySwiper' class='li_content li_swiper ' v-if='list.length> 4'>
            <swiper-slide v-for="(item, index) in list" :key='index' @click.native="selectContent(item, index)" class="cursor text-center li" :class='{active: activeIndex == index}'>
              <div class="time">{{ item.time }}</div>
              <div class="li_title">{{ item.title }}</div>
              <div class="bottom" v-if='activeIndex == index'>{{ item.timeDown }}</div>
            </swiper-slide>
          </swiper>
        </div>
        <swiper :options="swiperContentOption" ref='myContentSwiper' class='content  card'>
          <swiper-slide  class = 'li_con'  :key='index' v-for='(item, index) in content' @click.native='routeTo(item)'>
            <div class="ratio logo" :style='{background:`url(${item.commodity_smallimage})  no-repeat center center/cover`}'>
              <div class="li_padding"></div>
              <div class="ratio_content">
              </div>
            </div>
            <div class="con_content">
              <div class="content_title text-hidden">{{item.commodityName}}</div>
              <!--<div class="text-hidden content_subhead">{{item.businessName}}</div>-->
              <div class="oh content_price">{{ state != '2'? '抢购价': ''}} <span class="price">￥{{ state != '2'? item.skPrice: item.commodFinalPrice }}</span><span class="fr old" v-if='state!= "2"'>原价 ￥{{ item.commodFinalPrice }}</span></div>
              <div class="bottom">
                {{ state == '2' ? '库存': '剩余'}} {{item.skNum }}
              </div>
              <div class="text-center">
                <el-button  :plain="item.skNum == 0" type = 'primary' >{{ state | getStatus(item.skNum) }}</el-button>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="text-center card_title">
        <img src="~@/assets/images/gack/business.png">
      </div>
      <ul class="oh card business" id='business'>
        <li class="ratio fl" v-for='item in Commodity.business'>
          <div class="li_padding"></div>
          <div class="rat_content">
            <div class = 'a' @click=openTo(item)>
              <div class="li_con" :style='{background: `#fff url(${item.imgSrc}) no-repeat center center/cover`}'></div>
              <div class="li_bottom ratio">
                <div class="li_padding"></div>
                <div class="rat_content">
                  <img src="../assets/images/gack/decorate.png" class = 'decorate' alt="">
                  <div class="text-hidden title">{{item.title}}</div>
                  <div class="li_price">
                    <span class="price">￥{{item.price}}</span>
                    <div class="fr button">立即购买</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </li>
      </ul>
      <div class="text-center card_title">
        <img src="~@/assets/images/gack/finance.png">
      </div>
      <ul class="oh card business" id='finance'>
        <li class="ratio fl" v-for='item in Commodity.finance'>
          <div class="li_padding"></div>
          <div class="rat_content">
            <div class = 'a' @click=openTo(item)>
              <div class="li_con" :style='{background: `#fff url(${item.imgSrc}) no-repeat center center/cover`}'></div>
              <div class="li_bottom ratio">
                <div class="li_padding"></div>
                <div class="rat_content">
                  <img src="../assets/images/gack/decorate.png" class = 'decorate' alt="">
                  <div class="text-hidden title">{{ item.title }}</div>
                  <div class="li_price">
                    <span class="price">￥{{item.price}}</span>
                    <div class="fr button">立即购买</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="text-center card_title">
        <img src="~@/assets/images/gack/technology.png">
      </div>
      <ul class="oh card business" id='technology'>
        <li class="ratio fl" v-for='item in Commodity.technology'>
          <div class="li_padding"></div>
          <div class="rat_content">
            <div class = 'a' @click=openTo(item)>
              <div class="li_con" :style='{background: `#fff url(${item.imgSrc}) no-repeat center center/cover`}'></div>
              <div class="li_bottom ratio">
                <div class="li_padding"></div>
                <div class="rat_content">
                  <img src="../assets/images/gack/decorate.png" class = 'decorate' alt="">
                  <div class="text-hidden title">{{item.title}}</div>
                  <div class="li_price">
                    <span class="price">￥{{item.price}}</span>
                    <div class="fr button">立即购买</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="text-center card_title">
        <img src="~@/assets/images/gack/brand.png">
      </div>
      <ul class="oh card business" id='brand'>
        <li class="ratio fl" v-for='item in Commodity.brand'>
          <div class="li_padding"></div>
          <div class="rat_content">
            <div class = 'a' @click=openTo(item)>
              <div class="li_con" :style='{background: `#fff url(${item.imgSrc}) no-repeat center center/cover`}'></div>
              <div class="li_bottom ratio">
                <div class="li_padding"></div>
                <div class="rat_content">
                  <img src="../assets/images/gack/decorate.png" class = 'decorate' alt="">
                  <div class="text-hidden grid-5 title">{{item.title}}</div>
                  <div class="li_price">
                    <span class="price">￥{{ item.price }}</span>
                    <div class="fr button">立即购买</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
     <div class="text-center card_title">
        <img src="~@/assets/images/gack/yearEnd.png">
      </div>
      <ul class="oh card business" id='space'>
        <li class="ratio fl" v-for='item in Commodity.yearEnd'>
          <div class="li_padding"></div>
          <div class="rat_content">
            <div class = 'a' @click=openTo(item)>
              <div class="li_con" :style='{background: `#fff url(${item.imgSrc}) no-repeat center center/cover`}'></div>
              <div class="li_bottom ratio">
                <div class="li_padding"></div>
                <div class="rat_content">
                  <img src="../assets/images/gack/decorate.png" class = 'decorate' alt="">
                  <div class="text-hidden title">{{ item.title }}</div>
                  <div class="li_price">
                    <span class="price">￥{{ item.price }}</span>
                    <div class="fr button">立即购买</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="shadow" v-if = 'dialogCouponVisible' @click.self = 'dialogCouponVisible= false'>
        <div class="coupon_shadow" :class = '{received: received}' @click.self = 'dialogCouponVisible= false'>
          <div class="text-center receive_coupon" v-if = '!received'>
            <img src="../assets/images/gack/receiveCoupon.png" alt="" @click = 'submit'>
          </div>
        </div>
      </div>
      <el-dialog
        :visible.sync="dialogVisible"
        size="tiny">
        <span>请登录后领取优惠券！</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="register">注册</el-button>
    <el-button type="primary" @click="login">现在登陆</el-button>
  </span>
      </el-dialog>
      <!--<el-dialog :visible.sync="dialogTableVisible" @click = 'dialogTableVisible = false' size = 'small'>-->
        <!--<zhiyin></zhiyin>-->
      <!--</el-dialog>-->

    </div>
  </div>
</template>
<script>
//  import zhiyin from 'components/zhiyin'
  import Commodity from 'assets/js/commodity'
  import coupon from 'assets/js/coupon'
  export default {
    data() {
      let self = this
      return {
        scrollTop: 0,
        Commodity,
        dialogTableVisible: false,
        dialogCouponVisible: false,
        event: null,
        coupon,
        logo: null,
        time: 0,
        received: false,
        activeIndex: 0,
        activityId: '',
        now: new Date().getTime(),
        content: [],
        swiperOption: {
          pagination: null,
          slidesPerView: 4,
          spaceBetween: 0,
          initialSlide: self.activeIndex
        },
        swiperContentOption: {
          pagination: null,
          slidesPerView: 3,
          spaceBetween: 10
        },
        dialogVisible: false,
        timer: null
      }
    },
    filters: {
      getStatus(opt, val) {
        if (val == 0) {
          return '已抢购完'
        } else if(opt == '0') {
          return '立即抢购'
        } else if(opt == '1') {
          return '即将抢购'
        } else {
          return '立即查看'
        }
      }
    },
//    components: {
//      zhiyin
//    },
    watch: {
     '$route' () {
       this.initCoupon()
     }
    },
//  deactivated () {
//    if (window.history && window.history.pushState) {
//      $(window).off('popstate', this.back);
//    }
//  },
    activated () {
     window.addEventListener('scroll', () => {
      this.scrollTop = $('body').scrollTop() || $('html').scrollTop()
     })
//      if (window.history && window.history.pushState) {
//        window.history.pushState(null, null, window.location.href)
//        $(window).on('popstate', this.back);
//      }
//      window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
//      window.history.forward(1);
      this.initCoupon().then(() => {
        this.coupon.forEach(item => {
          if (item.flag) {
            this.received = true
          }
        })
      }).catch(error => {
        console.log(error)
      })
      this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/eventDetails/selectSecckillEventDetails`).then(({data}) => {
       this.activityId = data.data
       return this.$tkAjax.post(`${this.$config.activity}/guoanmaker/operator/Secckill/selectSecckillByActivityId`, {}, {
          params: {
            activityId: data.data
          }
        })
      }).then(({ data }) => {
        this.event = data.data
        this.now = new Date(data.data.dateTime).getTime()
        if (this.timer) {
          window.clearInterval(this.timer)
        }
        this.timer = window.setInterval(() => {
          this.now += 1000
        }, 1000)
        let timeDistance = null
        let flag = false
        this.event.secckillMoveList.forEach((item, index) => {
          if(item.skStartTime <= this.now && item.skEndTime >= this.now) {
            this.time = item.skStartTime
            this.activeIndex = index
            flag = true
          } else if(!flag) {
            if(!timeDistance || timeDistance > Math.abs(this.now - item.skStartTime)) {
              timeDistance = Math.abs(this.now - item.skStartTime)
              this.time = item.skStartTime
              this.activeIndex = index
            }
          }
        })
        this.$nextTick(() => {
          if(this.$refs.mySwiper) {
            this.$refs.mySwiper.swiper.slideTo(this.activeIndex)
          }
        })
        this.initContent()
      }).catch(() => {
      })
    },
    computed: {
      state() {
        return this.list[this.activeIndex].state
      },
      list() {
        if(this.event) {
          return this.event.secckillMoveList.map((item, index) => {
            let date = new Date(item.skStartTime)
            item.time = date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
            if(item.skStartTime <= this.now && item.skEndTime >= this.now) {
              item.state = '0'
              item.timeDown = `距离本场结束： ${this.getTime(item.skEndTime)}`
            } else if(item.skStartTime > this.now) {
              item.state = '1'
              item.timeDown = `距离开始: ${this.getTime(item.skStartTime)}`
            } else if(item.skEndTime < this.now) {
              item.timeDown = '本场结束'
              item.state = '2'
            }
            return item
          })
        }
      }
    },
    methods: {
      register () {
        this.dialogVisible = false
        this.$router.push('/register/0')
      },
      login () {
        this.dialogVisible = false
        this.$router.push('/login/0')
      },
//   back () {
//     window.location.replace('https://apiqa.gack.citic:8443/#/')
//   },
      submit () {
        this.initCoupon().then(() => {
          this.coupon.forEach(item => {
            this.getCoupon(item)
          })
        }).catch(error => {
          console.log(error)
        })
      },
      initCoupon () {
        return new Promise((resolve, reject) => {
          this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/orderform/getUser1212Coupons`, {}, {
            params: {
              userid: this.$store.state.userid ? this.$store.state.userid.id : ''
            }
          }).then(({ data }) => {
            let commodityList = data.data.result
            this.coupon = this.coupon.map(item => {
              let flag = false
              if (item.limitTime && new Date(item.limitTime).getTime() > this.now) {
                this.$set(item, 'timeFlag', true)
              }
              commodityList.forEach(it => {
                if (it == item.id) {
                  flag = true
                }
              })
              this.$set(item, 'flag', flag)
              return item
            })
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
//    qiandao () {
//      _dgt.push(['trackEvent', 'signin',['d_signin'], ['签到']]);
//      if (this.$store.state.userid) {
//        window.location.href = 'https://apiqa.gack.citic:8443/eggFrenzy/index.html?userid=' + this.$store.state.userid.id
//      } else {
//        window.location.href = 'https://apiqa.gack.citic:8443/eggFrenzy/index.html'
//      }
//
//    },
      openTo (item) {
        _czc.push(["_trackEvent", '商品', '查看', item.title]);
        _dgt.push(['trackEvent', 'countSecond',['d_秒杀商品id'], [item.title]]);
        this.$router.push(`/serde/${item.id}/1`)
      },
      getCoupon (item) {
        this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/campaign/saveInvoice`, {}, {
          params: {
            userid: this.$store.state.userid.id,
            cid: item.id
          }
        }).then(({ data }) => {
//          if (!item.flag) {
//            this.initCoupon()
//          }
          if (data.data == 1) {
            return Promise.resolve()
          } else {
            return Promise.reject(-1)
          }
        }).then(() => {
          return this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/orderform/receiveUserCoupon`, {}, {
            params: {
              couponid: item.id,
              userid: this.$store.state.userid.id
            }
          })
        }).then(res => {
          this.$set(item, 'flag', true)
          this.received = true
          this.$message({
            message: res.data.data.value,
            type: 'success'
          })
          this.dialogCouponVisible = false
        }).catch(error => {
          this.dialogCouponVisible = false
          if (error == -1) {
            this.$message.error('您已领取过优惠券')
          } else {
            this.$message.error('领取失败')
          }
        })

      },
      receive () {
        if (!this.$store.state.userid) {
          this.dialogVisible = true
          return false
        }
       this.dialogCouponVisible =  true
      },
      initContent() {
        this.content = []
        this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/Secckill/selectSecckillByDate`, {}, {
          params: {
            activityId: this.activityId,
            skStartTime: Math.floor(this.time / 1000)
          }
        }).then(({
          data
        }) => {
          this.content = data.data
        })
      },
      prev () {
        this.$refs.myContentSwiper.swiper.slidePrev()
      },
      next () {
        this.$refs.myContentSwiper.swiper.slideNext()
      },
      selectContent(item, index) {
        this.activeIndex = index
        this.time = item.skStartTime
        this.initContent()
      },
      getTime(time) {
        time = Math.floor(Math.abs((this.now - time) / 1000))
        if (Math.floor(time / 3600 /24) > 0) {
          time = Math.floor(time / 3600 /24) + '天' + (Math.floor((time / 3600) % 24) < 10 ? '0' + Math.floor((time / 3600) % 24) : Math.floor((time / 3600) % 24)) + '时' + (Math.floor((time / 60) % 60) < 10 ? '0' + Math.floor((time / 60) % 60) : Math.floor((time / 60) % 60)) +
            '分'
        } else {
          time = (Math.floor((time / 3600) % 24) < 10 ? '0' + Math.floor((time / 3600) % 24) : Math.floor((time / 3600) % 24)) + ':' + (Math.floor((time / 60) % 60) < 10 ? '0' + Math.floor((time / 60) % 60) : Math.floor((time / 60) % 60)) +
            ':' + (Math.floor(time % 60) < 10 ? '0' + Math.floor(time % 60) : Math.floor(time % 60))
        }
        return time
      },
      routeTo(item) {
        _czc.push(["_trackEvent", '商品', '查看', item.commodityName]);
        _dgt.push(['trackEvent', 'countSecond',['d_秒杀商品id'], [item.commodityName]]);
        this.$router.push({
          path: `/serde/${item.commodId}/1`,
          query: {
            secckillId: item.id
          }
        })
      }
    },
  }
</script>
<style scoped>
  @keyframes moveImg {
    0% {
      transform: scale(1) rotate(0);
    }

    70%,
    73% {
      transform: scale(0.9) rotate(0deg)
    }

    77%,
    83%,
    90%,
    97% {
      transform: scale(1.15) rotate(10deg)
    }

    80%,
    87%,
    93% {
      transform: scale(1.15) rotate(-10deg)
    }

    100% {
      transform: scale(1) rotate(0)
    }
  }
  .page {
    background: url('~@/assets/images/gack/bg.jpg') top center/cover no-repeat;
    position: relative;
    overflow:hidden;
  }
  .grid-5 {
    width: 80%;
  }
  .twelve {
    overflow: hidden;
    background: url('../assets/images/gack/twelve.png') no-repeat center center/cover;
    box-sizing: border-box;
    padding: 50px 140px 20px;
    position:relative;
    width: 1011px;
    margin: 0 auto;
  }
  .swiper_icon{
    position:absolute;
    width: 30px;
    height: 80px;
    top: 50%;
    margin-top: -40px;
  }
  .coupon_shadow{
    background: url('../assets/images/gack/coupon.png') no-repeat center center/contain;
    width:600px;
    height: 473px;
    position:fixed;
    top: 116px;
    left: 50%;
    margin-left: -300px;
  }
  .coupon_shadow.received{
    background: url('../assets/images/gack/receivedCoupon.png') no-repeat center center/contain;
  }
  .next{
    background: url('../assets/images/gack/next.png') no-repeat center center/cover;
    right: 10px;
  }
  .prev{
    background: url('../assets/images/gack/prev.png') no-repeat center center/cover;
    left:10px;
  }
  .twelve .button{
    background: #7324B1;
    color: #fff;
    border-radius: 50px;
    margin:0 auto;
    width: 50%;
    line-height: 36px;
    text-align:center;
  }
  .twelve .button.disable {
    background: #ccc;
    color: #333;
  }
  .qiandao{
    position:fixed;
    top: 230px;
    left: 10px;
    width: 150px;
    cursor: pointer;
    animation: moveImg 1.5s both infinite;
    z-index: 12;

  }
  .qiandao.top{
    top: 20px;
  }
  .list {
    position: relative;
    overflow: hidden;
    border:0 solid transparent;
  }

  .li_content {
    position: absolute;
    width: 100%;
    height: 100%
  }
  .time_down{
    margin: 40px 0 10px;
  }
  .list .li {
    color: #DE2127;
    border: 1px solid #DE2127;
    box-sizing: border-box;
    line-height: 30px;
  }
  .list .li.ending {
    border: 1px solid #DE2127;
    color: #999;
  }
  .list .li.active {
    background: #DE2127;
    border: 1px solid transparent;
    color: #FAFAFA;
  }
  .list .li .time {
    font-size: 24px;
  }

  .list .li .li_title {
    margin: 15px 0 10px;
    font-size: 18px;
  }
  .list .li.active .li_title{
    margin: 15px 0 5px;
  }
  .list .li .bottom {
    background: #F5A623;
    line-height: 1.5em;
    padding: 6px 0;
  }

  .content {
    margin: 0 auto 100px;
    padding: 0px 8px;
  }

  .twelve .li_con {
    background: #fff;
    box-sizing: border-box;
  }

  .li_con .bottom {
    width: 100%;
  }

  .li_swiper {
    height: auto
  }

  .li_con .logo {
    width: 100%;
    padding-bottom: 0;
  }

  .li_con .logo .li_padding {
    padding-bottom: 100%;
  }

  .li_con .con_content {
    margin: 0 10px;
  }
  .price_logo{
    width: 50px;
  }
  .content_title {
    font-size: 18px;
    color: #4A4A4A;
    margin: 10px 0;
  }
  .price {
    color: red;
    font-size: 18px;
  }
  .li_price {margin: 5px 10px;}
  .li_price .button{
    background:#DE2127;
    color: #fff;
    font-size: 14px;
    padding: 3px .5em;
  }
  .old {
    text-decoration: line-through;
    color: #C5C5C5;
    font-size: 12px;
  }

  .content_subhead {
    font-size: 12px;
    color: #9B9B9B;
  }

  .first {
    width: 100%;
    padding-bottom: 5%;
  }
  .first .receive_content{
    padding-top: 30%;
    padding-bottom: 20px;
  }
  .first .receive{
    transform: scale(1);
    width: 400px;
    transition: all linear .5s;
    cursor: pointer;
  }

  .first .receive:hover{
    transform: scale(1.3);
    transition: all linear .5s;
  }
  .card {
    margin-bottom: .625rem;
  }

  .card_title {
    margin: 20px 0;
  }

  .card_title img {
    width: 40%;
  }

  .ratio {
    position: relative;
  }

  .ratio .li_padding {
    width: 100%;
  }

  .ratio .rat_content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .card li {
    position: relative;
    cursor: pointer;
    width: calc(25% - 9px);
    margin-left: 12px;
    margin-bottom: 12px;
    box-sizing: border-box;
  }

  .card li .a {
    color: inherit;
    display: block;
    height: 100%;
  }
  .card li:first-child{
    margin-left: 0;
  }
  .twelve .card li:nth-child(4n + 1){
    margin-left: 0;
  }

  .coupon {
    margin-top: 55px;
    width: 100%;
  }
  .decorate{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .coupon li {
    color: #fff;
    position: relative;
    width: calc(33% - 9px);
  }
  .coupon li .li_padding {
    padding-bottom: 60%;
  }

  .coupon li:nth-child(4) {
    margin-left: 0;
  }

  .zhiyin {
    cursor: pointer;
    width: 7%;
    position: fixed;
    top: 20%;
    right: 0;
    background: url('~@/assets/images/gack/zhiyin.png') no-repeat center center/100%;
  }

  .zhiyin .li_padding {
    padding-bottom: 140%;
  }
  .coupon li {
    position:relative;
  }
  .coupon li:nth-child(n+4) {
    margin-top: 15px;
  }

  #cnzz_stat_icon_1268460331 {
    display: none;
  }
  .coupon li .li_con {
    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 44% auto 7%;
  }

  .coupon li .li_con .li_padding {
    padding-bottom: 31%;
  }

  .coupon li .li_con .desc {
    margin-left: .3125rem;
    font-size: 12px
  }

  .coupon li .li_con .desc .li_desc {
    font-size: 8px
  }
  .coupon .coupon_shadow{
    background: url('~assets/images/gack/Receive.png') rgba(0, 0, 0, .5) no-repeat center center/contain;
    position:absolute;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
  }
  .coupon_shadow .receive_coupon {
    width: 100%;
    margin-top: 50%;
  }
  .coupon_shadow .receive_coupon img{
    width: 200px;
  }
  .business li {
    /*border: 5px solid #7D3469;*/
    /*background: url(~@/assets/images/gack/sp.png) top center/contain no-repeat;*/
  }

  .business li .a {
    position: relative;
    padding: 0;
  }

  .business li .li_padding {
    padding-bottom: 120%;
  }

  .business li .li_con {
    height: 75%;
    font-size: 12px;
  }

  .business li .rat_content {
    width: 100%;
  }

  .business li .li_bottom {
    background: #fff;
    position: absolute;
    bottom: 0px;
    left: 0;
    padding: 3px;
    box-sizing: content-box;
    z-index: 2;
    width: 98%;
    font-size: 12px;
  }
  .business li .li_bottom .title{
    font-size: 16px;
    font-weight:normal;
  }
  .business li .li_bottom .rat_content {
    padding: 8px 4px 4px 4px;
    box-sizing: border-box;
  }

  .business li .li_bottom .li_padding {
    padding-bottom: 30%;
  }

  .business li .li_bottom {
    line-height: 1.2em;
    font-size: 12px;
  }

  .remaining {
    color: #fff;
    font-size: 18px;
    line-height: 2em;
    margin: 10px 0;
  }

  .box1 {
    margin: 0 auto;
    display: none
  }

  .business li .li_bottom .price span {
    font-size: 14px;
    font-stretch: ultra-condensed;
  }

  .qr {
    width: 11%;
    padding: 4px;
    box-sizing: content-box;
    position: fixed;
    bottom: 30px;
    text-align: center;
    left: 1%;
    z-index: 12;
    background: url('../assets/images/gack/qr.png') no-repeat center center/cover;
    border-radius: 3px;
  }
  .qr.bottom{
    bottom: 250px;
  }
  .qr img {
    width: 100%;
  }

  @media screen and (min-width: 768px) {
    .card_title {
      margin: 55px 0;
    }
    .coupon li .li_con .title {
      font-size: 32px;
    }
    .coupon li .li_con .desc {
      font-size: 18px;
    }
    .text-primary{
      color: red;
    }
    .coupon li .li_con .desc .li_desc {
      font-size: 14px;
    }
    .business li .li_con {
      font-size: 24px;
    }
    .business li .li_bottom {
      font-size: 18px;
    }
    .business li .li_bottom {
      line-height: 1.8em;
      font-size: 14px;
    }
  }

  @media screen and (min-width: 1024px) {
    .page {
      background: url('~@/assets/images/gack/bg.jpg') top center/cover no-repeat;
    }
    .coupon li .li_con .title {
      font-size: 48px;
    }
    .coupon li .li_con .desc {
      font-size: 24px;
    }
    .coupon li .li_con .desc .li_desc {
      font-size: 14px;
    }
    .box1 {
      display: block;
    }
    .business li .li_bottom {
      font-size: 14px;
      line-height: 1.8em;
    }
  }
.twelve_page .container{
  width: 75%;
}
  @media screen and (min-width: 778px)and (max-width: 1024px) {
    .container {
      width: 768px;
    }
  }

  @media screen and (min-width: 1296px) {
    .business li .li_bottom {
      font-size: 14px;
    }
  }

  @media screen and (min-width: 1448px) {
    .container {
      width: 1296px
    }
    .business li .li_bottom {
      font-size: 16px;
    }
  }

  .clear {
    clear: both;
  }
  /* 大转盘样式 */

  .banner {
    display: block;
    width: 50%;
    margin: 0 auto 20px;
  }

  .banner .turnplate {
    display: block;
    width: 100%;
    position: relative;
  }

  .banner .turnplate canvas.item {
    width: 100%;
  }

  .banner .turnplate img.pointer {
    position: absolute;
    width: 26.5%;
    height: 36.5%;
    left: 36.6%;
    top: 26%;
  }

  .shadow {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    position: fixed;
    /*display: none;*/
    top: 0;
    z-index: 12;
    left: 0;
  }

  .shadow .content {
    background: #fff;
    width: 400px;
    height: 200px;
    margin: 100px auto;
    position: relative;
    padding: 15px;
    font-size: 14px;
    box-shadow: 1px 1px 1px #fff;
  }

  .shadow .content .bottom {
    position: absolute;
    width: 100%;
    bottom: 10px;
  }

  .shadow .content .bottom .button {
    font-size: 24px;
    padding: .3em .5em;
    border-radius: 5px;
    color: #fff;
    background: #009F95;
    cursor: pointer;
    display: inline-block;
  }

  .zhiyin_content {
    display: none;
    color: #fff;
    cursor: pointer;
    border: 3px solid #ff0;
    border-radius: 15px;
    padding: 20px;
    width: 960px;
    margin: 0 auto;
    overflow: hidden;
  }

  .zhiyin_content .title {
    font-size: 36px;
    font-weight: bolder;
    margin-bottom: 15px;
  }
  .zhiyin_content .zhiyin_img {
    background: url('~@/assets/images/gack/pc-xingshou.png') no-repeat center center/cover;
    width: 2000px;
    padding-bottom: 24%;
  }
</style>
