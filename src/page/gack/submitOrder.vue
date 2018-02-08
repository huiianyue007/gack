<template>
  <div class="page-container oh">
    <div class="container">
      <el-breadcrumb separator="/" class = 'breadcrumb'>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to = '{path: "/user/order", query: {title: "我的订单"}}'>我的订单</el-breadcrumb-item>
        <el-breadcrumb-item>支付订单</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="bg-white view" v-if = '!loadding'>
        <div class="bg-white time" v-if = 'dateTime > 0'>
          <span class = 'icon inline-block'>i</span>请付款，剩{{ countTime }}自动关闭
        </div>
        <div class="bg-white time" v-else>
          <span class = 'icon inline-block'>i</span>订单已关闭
        </div>
        <div class="title tipper">
          购买的商品
        </div>
        <div class="view_con" v-if = 'order'>
          <div class="view_title"> <span class="inline-block"></span>服务商名称： {{ order.organizer || order.companyName }}</div>
          <div class="view_con_con">
            <img :src="order.eventPicUrl || order.commodity_smallimage" v-if = 'order.commodity_smallimage || order.eventPicUrl' width = '84' height = '84' alt="">
            <div class="inline-block con">
              <div class="title">{{order.commodityName || order.eventTitle}}</div>
              <div class="subhead">单价：<span class="text-red">￥{{  order.realPrice || order.payMoney }}元</span></div>
              <div class="subhead">{{ order.eventDetailedAddress || order.serverPlace || "全国" }}</div>
            </div>
          </div>
          <el-row class="coupon" v-if = 'couponList'>
            <el-col :span = '3'>
              使用优惠券
            </el-col>
            <el-col :span = '3' :push = '1'>
              <el-select v-model = 'coupon' v-if = 'couponList.length > 1' placeholder="请选择优惠券">
                <el-option :label = 'item.couponsname' :value="item.couponid" v-for = '(item, key) in couponList' :key = 'key'>{{ item.couponsname }}</el-option>
              </el-select>
              <div class="subhead" v-else> 暂无优惠券</div>
            </el-col>
            <el-col :span = '4' :push = '10' v-if = 'discount > 0'>
              <div class="subhead fl">优惠券抵扣：</div>
              <div class="price fr">- ￥{{ discount }}元</div>
            </el-col>
          </el-row>
          <div class="oh">
            <div class="fr total_price text-right">
              付款金额: <span class="text-red">{{ totalPrice }}元</span>
            </div>
          </div>
        </div>

      </div>
      <div class="bg-white view" v-if = 'loadding'>
        加载中...
      </div>
      <div class="view bg-white pay_type">
        <div class="title tipper">请选择支付方式</div>
        <div class = 'list cursor' @click = 'payType = "alipay_pc_direct"'>
          <img src="~assets/images/gack/selected.png"  width = '16' height = '16' v-if = 'payType === "alipay_pc_direct"' alt="" class="icon">
          <img src="~assets/images/gack/unselected.png" width = '16' height = '16' v-else alt="" class="icon">
          <img src="~assets/images/gack/alipay.png" width = '24' height = '24' alt="" class="logo">
          <span class="subhead">支付宝支付</span>
        </div>
        <div class = 'list cursor' @click = 'payType = "wx_pub_qr"'>
          <img src="~assets/images/gack/selected.png" width = '16' height = '16' v-if = 'payType === "wx_pub_qr"' alt="" class="icon">
          <img src="~assets/images/gack/unselected.png" width = '16' height = '16' v-else alt="" class="icon">
          <img src="~assets/images/gack/weixin.png" width = '24' height = '24' alt="" class="logo">
          <span class="subhead">微信支付</span>
        </div>
        <div class = 'list cursor' @click = 'payType = "kq"' v-if = 'totalPrice >= 15'>
          <img src="~assets/images/gack/selected.png"  width = '16' height = '16' v-if = 'payType === "kq"' alt="" class="icon">
          <img src="~assets/images/gack/unselected.png" width = '16' height = '16' v-else alt="" class="icon">
          <img src="~assets/images/gack/kuaiqian.png" width = '24' height = '24' alt="" class="logo">
          <span class="subhead">快钱支付</span>
        </div>
        <div class = 'list cursor' v-if = 'totalPrice < 15'>
          <img src="~assets/images/gack/unselected.png" width = '16' height = '16' alt="" class="icon">
          <img src="~assets/images/gack/kuanmessage.png" width = '24' height = '24' alt="" class="logo">
          <span class="subhead">快钱支付</span>
          <img src="~assets/images/gack/tip.png"  width = '12' height = '12' alt="" class="icon">
          <span class="subhead error_message" >不支持15块钱以下支付</span>
        </div>
      </div>
      <div class="text-center submit">
        <el-button size = 'large' type = 'primary' @click = 'submit'>支付</el-button>
      </div>
      <el-dialog title="扫描二维码支付" :visible.sync="dialogTableVisible" @close = 'payFlag = false' :close-on-click-modal = 'false'>
        <div class="qr_code">
          <layout>
            <qrcode :val="wxImg" fgColor = '#000' bgColor = '#fff' :size = '256'></qrcode>
          </layout>
        </div>
      </el-dialog>
      <el-dialog title="参与抽奖" width = '375px' class="chulaiDasen" :visible.sync="prizeTableVisible" :close-on-click-modal = 'false' @close = 'backTo'>
        <div class="chulaiDasenDiv">
          <iframe :src= '`${prizeUrl}&type=1`' frameborder="0" width = '100%' height="600px"></iframe>
          <div class="chulaiDasenBottom" @click="chulaiDasenBottom"></div>
        </div>
      </el-dialog>
      <div class="form" v-html = 'alipay_code'></div>
    </div>
  </div>
</template>
<script>
  import qrcode from 'components/qrcode'
  import store from 'store'
  export default {
    name: 'submit-order',
//    beforeRouteEnter (to, from, next) {
//      if (!store.state.sessionid) {
//        let sessionid = window.localStorage.getItem('sessionid')
//        store.commit('setSessionId', sessionid)
//        next(vm => {
//          vm.$htAjaxGlobal.headers = {
//            'Authorization': `Bearer ${store.state.sessionid}`
//          }
//          let userid = JSON.parse(window.localStorage.getItem('userid'))
//          if (userid) {
//            store.commit('setUserId', userid)
//          }
//        })
//        return false
//      } else {
//        next()
//      }
//    },
    data () {
      return {
        countTime: 0,
        coupon: '',
        order: null,
        counter: 0,
        wxImg: '',
        dialogTableVisible: false,
        payType: 'wx_pub_qr',
        couponList: [],
        alipay_code: '',
        time: null,
        now: new Date().getTime(),
        payFlag: false,
        prizeTableVisible: false,
        prizeUrl: '',
        dateTime: 0,
        routerParams: '',
        payid: '',
        loadding: true
      }
    },
    computed: {
      originalId () {
        let originalId = ''
        for (let i =0; i< 31; i++) {
          originalId += '0'
        }
        return originalId + '1'
      },
      discount () {
        let discout = 0
        if (Array.isArray(this.couponList)) {
          this.couponList.filter(item => {
            if (item.couponid === this.coupon) {
              discout = item.subamount
            }
          })
        }
        return discout
      },
      totalPrice () {
        if (this.order) {
          return (this.order.realPrice || this.order.payMoney) - this.discount
        }
      }
    },
    components: {
      qrcode
    },
    beforeDestroy () {
      this.payFlag = false
      this.$store.commit('setPayType', '')
      window.localStorage.removeItem('payid')
      window.localStorage.removeItem('orderId')
//      window.localStorage.removeItem('userid')
//      window.localStorage.removeItem('sessionid')
    },
    created () {
      let url = ''
      let data = {}
      this.loadding = true
      if (this.$route.params.type === 'activity') {
        url = `${this.$config.activity}/guoanmaker/operator/activityEnlist/getActivityEnlist`
        data.Id = this.$route.params.id
      } else {
        url = `${this.$config.gack}/guoanmaker/personal/orderform/findByid`
        data.id = this.$route.params.id
      }
      this.$htAjax.post(url, {}, {
        params: data
      }).then(({ data }) => {
        this.order = data.data
        return this.$htAjax.get(`${this.$config.gack}/guoanmaker/personal/orderform/getCurrentDate`)
      }).then(({ data }) => {
        this.now = data.data
        if (this.$route.params.type === 'activity') {
          this.countDown(this.order.buildTime)
        } else {
          if (this.order.spikeid) {
            this.order.realPrice = this.order.spikePrice
          }
          this.countDown(this.order.placeOrderTime)
        }
        if (!this.order.spikeid){
          this.getCoupon()
        }
      }).catch(error => {
        console.log(error)
      })
      let orderId = window.localStorage.getItem('orderId')
      this.payid = window.localStorage.getItem('payid')
      if (this.payid && this.$route.params.id == orderId) {
        this.payType = this.$store.state.payType
        this.retrieve(this.payid).then(async state => {
          if (state !== 1) return Promise.reject()
          if (this.$route.params.type == 'activity') {
            await this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/activityEnlist/updateEnlistPayState`,{}, {
              params: {
                id: this.$route.params.id,
                streamNum: this.payid
              }
            }).catch(error => {
              return Promise.reject(error)
            })
          } else {
           this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/orderform/overPay`,{}, {
              params: {
                id: this.$route.params.id,
                defrayNumber: this.payid
              }
            }).then(() => {}).catch(() => {})
            return this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/ActiveTask/findActiveURLByInfo`, {}, {
              params: {
                provideOrderFormId: this.$route.params.id,
                taskTypeId: '8aaf0aab5f81396c015f8fecb61e007s'
              }
            })
          }
        }).then(res => {
          window.localStorage.removeItem('payid')
          window.localStorage.removeItem('orderId')
          window.localStorage.removeItem('userid')
          window.localStorage.removeItem('sessionid')
          this.dialogTableVisible = false
          this.$message({
            type: 'success',
            message: '支付成功'
          })
          if (res.data.data) {
            this.prizeTableVisible = true
            this.routerparams = '2'
            this.prizeUrl = res.data.data + '&id=' + this.$store.state.userid.id
            return false
          }
          this.backTo('1')
        }).catch(async error => {
          if (!error) return false
          if (error.status == 200) {
            window.localStorage.removeItem('payid')
            window.localStorage.removeItem('orderId')
//            window.localStorage.removeItem('userid')
//            window.localStorage.removeItem('sessionid')
            this.dialogTableVisible = false
            if (this.$route.params.type == 'activity' && error.state == 1) {
              this.$message({
                type: 'success',
                message: '支付成功'
              })
              this.$router.replace({
                path: `/user/appcon/${this.$route.params.id}/yuyue`,
                query: {
                  title: '活动报名',
                  fromtitle: '我的预约'
                }
              })
            } else {
              this.$router.replace({
                path: '/orderlist',
                query: {
                  id: this.$route.params.id,
                  type: '1'
                }
              })
            }
          }
        })
      }
    },
    watch: {
      user (val) {
        if (this.order) {
          if (val && !this.order.spikeid) {
            this.getCoupon()
          }
        }
      }
    },
    methods: {
      chulaiDasenBottom(){
        this.routerparams = '1'
        this.prizeTableVisible = false;
      },
      countDown (opt) {
        if (this.time) {
          clearInterval(this.time)
        }
        this.dateTime = (opt - this.now) /1000 + (this.order.spikeid ? 600 : 86400)
        this.loadding = false
        this.time = setInterval(() => {
          this.countTime = `${Math.floor((this.dateTime / 3600) % 24)}小时${Math.floor((this.dateTime/ 60) % 60)}分${Math.floor(this.dateTime % 60 )}秒`
          this.dateTime--
          if (this.dateTime <= 0) {
            clearInterval(this.time)
          }
        }, 1000)
      },
      getCoupon () {
        this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/orderform/findUsefulCouponsByPage`, {}, {
          params: {
            orderid: this.order.id,
            pageNumber: 0,
            pageSize: 100000,
          }
        }).then(({ data }) => {
          let now = new Date().getTime()
          this.couponList = data.data.result
          // .filter(item => {
          //   return  item.isUsed === '0' && (item.couponstype === '0' || (item.couponstype === '1' && (item.fullamount <= this.order.realPrice || item.fullamount <= this.order.payMoney)))
          // })
          this.couponList.unshift({
            couponsname: '请选择优惠券',
            subamount: 0
          })
        }).catch(error => {
          console.log(error)
        })
      },
      retrieve (id) {
        this.payFlag = true
        return new Promise(async (resolve) => {
          let state = 0
          while (state == 0 && this.payFlag) {
            let res = await this.$tkAjax.get(`${this.$config.pay}/retrieve.php?pingId=${id}`).catch(error => {
            })
            state = res.data
          }
          resolve(state)
        })
      },
      submit () {
        this.alipay_code = ''
        if (this.dateTime <=0) {
          this.$message.error('订单已关闭')
          return false
        }
        let url = this.$route.params.type == 'activity' ? `${this.$config.activity}/guoanmaker/operator/activityEnlist/validateActivityEnlistCoupons` : `${this.$config.gack}/guoanmaker/personal/orderform/orderToCoupon`
        let data = this.$route.params.type == 'activity' ? {
          id: this.$route.params.id,
          couponId: this.coupon
        } : {
          orderid: this.$route.params.id,
          couponid: this.coupon
        }
        this.$htAjax.post(url, {}, {
          params: data
        }).then(() => {
          return new Promise((resolve, reject) => {
            if (this.$route.params.type === 'activity') {
              url = `${this.$config.activity}/guoanmaker/operator/activityEnlist/getActivityEnlist`
              data.Id = this.$route.params.id
            } else {
              url = `${this.$config.gack}/guoanmaker/personal/orderform/findByid`
              data.id = this.$route.params.id
            }
            this.$htAjax.post(url, {}, {
              params: data
            }).then(({ data }) => {
              this.payFlag = true
              if (data.data.orderStatus == '1' || data.data.state == '0') {
                resolve()
              } else if (data.data.orderStatus == '2' || data.data.state == '1'){
                this.$message({
                  message: '您已经支付成功',
                  type: 'success'
                })
              }
            }).catch(error => {
              reject(error)
            })
          })
        }).then(() => {
          this.$store.commit('setPayType', this.payType)
          if (this.$route.params.type == 'activity') {
            return this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/activityEnlist/paymentActivityEnlist`,{}, {
              params: {
                id: this.$route.params.id,
                channel: this.payType,
                back_url: window.location.href
              }
            })
          } else {
            return this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/orderform/initiatePay`, {}, {
              params: {
                orderid: this.$route.params.id,
                channel: this.payType,
                backUrl: window.location.href
              }
            })
          }
        }).then(({ data }) => {
          if (this.$route.params.type == 'activity') {
            if (data.data.wx_pub_qr) {
              this.dialogTableVisible = true
              this.wxImg = data.data.wx_pub_qr
              if (this.payid) {
                window.localStorage.removeItem('payid')
                window.localStorage.removeItem('orderId')
              }
            } else if (data.data.alipay_code) {
              this.alipay_code = data.data.alipay_code
              this.$nextTick(() => {
                $('#alipaysubmit').submit()
              })
              window.localStorage.setItem('payid', data.data.id)
              window.localStorage.setItem('orderId', this.$route.params.id)
//              window.localStorage.setItem('userid', JSON.stringify(this.$store.state.userid))
//              window.localStorage.setItem('sessionid', this.$store.state.sessionid)
              if (this.payid) {
                window.localStorage.removeItem('payid')
                window.localStorage.removeItem('orderId')
              }
              return Promise.reject('alipay_code')
            } else if (data.data.kq_code) {
              this.alipay_code = data.data.kq_code
              this.$nextTick(() => {
                $('#kqPay').submit()
              })
              window.localStorage.setItem('userid', JSON.stringify(this.$store.state.userid))
              window.localStorage.setItem('sessionid', this.$store.state.sessionid)
              window.localStorage.setItem('payid', data.data.id)
              window.localStorage.setItem('orderId', this.$route.params.id)
              return Promise.reject('kq_code')
            }
          } else {
            if (data.data.result.key === 'error') {
              return Promise.reject(data.data.result.value)
            }
            if (data.data.pay.wx_pub_qr) {
              this.dialogTableVisible = true
              this.wxImg = data.data.pay.wx_pub_qr
              if (this.payid) {
                window.localStorage.removeItem('payid')
                window.localStorage.removeItem('orderId')
              }
            } else if (data.data.pay.alipay_code) {
              this.alipay_code = data.data.pay.alipay_code
              this.$nextTick(() => {
                $('#alipaysubmit').submit()
              })
              window.localStorage.setItem('payid', data.data.pay.id)
              window.localStorage.setItem('orderId', this.$route.params.id)
              window.localStorage.setItem('userid', JSON.stringify(this.$store.state.userid))
              window.localStorage.setItem('sessionid', this.$store.state.sessionid)
              if (this.payid) {
                window.localStorage.removeItem('payid')
                window.localStorage.removeItem('orderId')
              }
              return Promise.reject('alipay_code')
            } else if (data.data.pay.kq_code) {
              this.alipay_code = data.data.pay.kq_code
              this.$nextTick(() => {
                $('#kqPay').submit()
              })
              window.localStorage.setItem('userid', JSON.stringify(this.$store.state.userid))
              window.localStorage.setItem('sessionid', this.$store.state.sessionid)
              window.localStorage.setItem('payid', data.data.pay.id)
              window.localStorage.setItem('orderId', this.$route.params.id)
              return Promise.reject('kq_code')
            }
          }
          return Promise.resolve(data)
        }).then(async ({ data }) => {
          this.payFlag = true
          let state = 0
          while (state == 0 && this.payFlag) {
            let res = await this.$tkAjax.get(`${this.$config.pay}/retrieve.php?pingId=${data.pay ? data.pay.id : data.id}`).catch(error => {
              console.log(error)
            })
            state = res.data
          }
          return Promise.resolve(data.pay ? data.pay.id : data.id)
        }).then(id => {
          if (this.$route.params.type == 'activity') {
            return this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/activityEnlist/updateEnlistPayState`,{}, {
              params: {
                id: this.$route.params.id,
                streamNum: id
              }
            })
          } else {
            return this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/orderform/overPay`,{}, {
              params: {
                id: this.$route.params.id,
                defrayNumber: id
              }
            })
          }
        }).then(() => {
          if (this.$route.params.type !== 'activity') {
            return this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/ActiveTask/findActiveURLByInfo`, {}, {
              params: {
                provideOrderFormId: this.$route.params.id,
                taskTypeId: '8aaf0aab5f81396c015f8fecb61e007s'
              }
            })
          } else {
            return Promise.resolve()
          }
        }).then(res => {
          if (window.localStorage.getItem('userid') || window.localStorage.getItem('sessionid')) {
            window.localStorage.removeItem('sessionid')
            window.localStorage.removeItem('userid')
          }
          this.dialogTableVisible = false
          this.$message({
            type: 'success',
            message: '支付成功'
          })
          if (res && res.data.data) {
            this.prizeTableVisible = true
            this.routerparams = '2'
            this.prizeUrl = res.data.data + '&id=' + this.$store.state.userid.id
            return false
          }
          this.backTo()
        }).catch(error => {
          if (error !== 'alipay_code' && error !==  'kq_code') {
            if (!this.payFlag) {
              this.$message({
                type: 'success',
                message: '取消支付成功'
              })
            } else {
              this.$message.error(error.data.msg || error.data.data.value)
            }
          }
        })
      },
      backTo (opt) {
        if (this.routerparams == 1) {
          this.$router.replace({path:'/user/address',query:{'title':'地址管理', fromtitle: '地址管理'}})
          return false
        }
        if (this.$route.params.type == 'activity') {
          this.$router.replace({
            path: `/user/appcon/${this.$route.params.id}/yuyue`,
            query: {
              title: '活动报名',
              fromtitle: '我的预约'
            }
          })
        } else {
          let id = this.$route.params.id
          this.$router.replace({
            path: '/orderlist',
            query: {
              id,
              type: opt
            }
          })
        }
      }
    }
  }
</script>
<style scoped>
  .breadcrumb{
    margin: 20px 0;
  }
  .bg-white{
    background: #fff;
  }
  .view{
    padding: 20px 50px;
    box-sizing:border-box;
    margin-bottom: 30px;
  }
  .text-red{
    color: #f00;
  }
  .time{
    color: #FF4F51;
    margin-bottom:40px;
  }
  .time .icon{
    border-radius: 50%;
    border: 1px solid #FF4F51;
    width:26px;
    text-align:center;
    line-height: 26px;
    margin-right: 10px;
  }
  .title.tipper{
    border-left: 4px solid #C7000A;
    padding-left: 9px;
  }
  .view_con .view_title{
    margin-top: 20px;
    padding: 0 20px;
    line-height: 40px;
    font-size:16px;
    background: #f3f3f3;
  }
  .view_con .view_con_con{
    padding:20px;
    border: 1px solid #efefef;
    margin-bottom: 10px;
  }
  .view_con .view_con_con .con{
    vertical-align: middle;
    margin-left: 30px;
  }
  .view_con .view_con_con .con .title{
    font-size:16px;
    color:#999;
  }
  .total_price{
    font-size: 18px;
  }
  .list{
    margin:20px 0;
  }
  .list .logo{
    margin: 0 15px;
  }
  .list .error_message{
    font-size: 12px;
  }
  .coupon{
    padding: 0 20px;
    font-size: 16px;
  }
  .qr_code {
    width: 256px;
    height: 256px;
    margin: 0 auto;
    position: relative;
  }
  .chulaiDasen .chulaiDasenDiv{
    position: relative;
  }
  .chulaiDasen .chulaiDasenDiv .chulaiDasenBottom{
    position: absolute;
    bottom: 26px;
    left: 37%;
    right: 41%;
    height: 38px;
    cursor: pointer;
  }
</style>
<style>
.chulaiDasen .el-dialog{
  width: 375px;
}

</style>

