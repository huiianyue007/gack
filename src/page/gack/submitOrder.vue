<template>
  <div class="page-container oh">
    <div class="container">
      <el-breadcrumb separator="/" class = 'breadcrumb'>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to = '{path: "/user/order", query: {title: "我的订单"}}'>我的订单</el-breadcrumb-item>
        <el-breadcrumb-item>支付订单</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="bg-white view">
        <div class="bg-white time">
          <span class = 'icon inline-block'>i</span>请付款，剩{{ countTime }}自动关闭
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
          <el-row class="coupon">
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
              <div class="price fr">- ${{ discount }}元</div>
            </el-col>
          </el-row>
          <div class="oh">
            <div class="fr total_price text-right">
              付款金额: <span class="text-red">{{ totalPrice }}元</span>
            </div>
          </div>
        </div>

      </div>
      <div class="view bg-white pay_type">
        <div class="title tipper">请选择支付方式</div>
        <div class = 'list cursor' @click = 'payType = "alipay_pc_direct"'>
          <img src="~assets/gack/selected.png"  width = '16' height = '16' v-if = 'payType === "alipay_pc_direct"' alt="" class="icon">
          <img src="~assets/gack/unselected.png" width = '16' height = '16' v-else alt="" class="icon">
          <img src="~assets/gack/alipay.png" width = '24' height = '24' alt="" class="logo">
          <span class="subhead">支付宝支付</span>
        </div>
        <div class = 'list cursor' @click = 'payType = "wx_pub_qr"'>
          <img src="~assets/gack/selected.png" width = '16' height = '16' v-if = 'payType === "wx_pub_qr"' alt="" class="icon">
          <img src="~assets/gack/unselected.png" width = '16' height = '16' v-else alt="" class="icon">
          <img src="~assets/gack/weixin.png" width = '24' height = '24' alt="" class="logo">
          <span class="subhead">微信支付</span>
        </div>
        <div class = 'list cursor' @click = 'payType = "kq"' v-if = 'totalPrice > 15'>
          <img src="~assets/gack/selected.png"  width = '16' height = '16' v-if = 'payType === "kq"' alt="" class="icon">
          <img src="~assets/gack/unselected.png" width = '16' height = '16' v-else alt="" class="icon">
          <img src="~assets/gack/kuaiqian.png" width = '24' height = '24' alt="" class="logo">
          <span class="subhead">快钱支付</span>
        </div>
      </div>
      <div class="text-center submit">
        <el-button size = 'large' @click = 'submit'>支付</el-button>
      </div>
      <el-dialog title="扫描二维码支付" :visible.sync="dialogTableVisible" @close = 'payFlag = false' :close-on-click-modal = 'false'>
        <div class="qr_code">
          <layout>
            <qrcode :val="wxImg" fgColor = '#000' bgColor = '#fff' :size = '256'></qrcode>
          </layout>
        </div>
      </el-dialog>
      <div class="form" v-html = 'alipay_code'></div>
    </div>
  </div>
</template>
<script>
  import qrcode from 'components/qrcode'
  export default {
    name: 'submit-order',
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
        payFlag: false
      }
    },
    computed: {
      payid () {
        return window.localStorage.getItem('payid')
      },
      originalId () {
        let originalId = ''
        for (let i =0; i< 31; i++) {
          originalId += '0'
        }
        return originalId + '1'
      },
      discount () {
        let discout = 0
        this.couponList.filter(item => {
          if (item.couponid === this.coupon) {
            discout = item.subamount
          }
        })
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
    deactivated () {
      this.payFlag = false
      window.localStorage.removeItem('payid')
      window.localStorage.removeItem('orderId')
      window.localStorage.removeItem('userid')
      window.localStorage.removeItem('sessionid')
    },
    activated () {
      let url = ''
      let data = {}
      if (this.$route.params.type === 'activity') {
        url = 'https://apitest.gack.citic:8083/guoanmaker/operator/activityEnlist/getActivityEnlist'
        data.Id = this.$route.params.id
      } else {
        url = 'https://apitest.gack.citic:8081/guoanmaker/personal/orderform/findByid'
        data.id = this.$route.params.id
      }
      this.$htAjax.post(url, {}, {
        params: data
      }).then(({ data }) => {
        this.order = data.data
        if (this.$route.params.type === 'activity') {
          this.countDown(this.order.buildTime)
        } else {
          this.countDown(this.order.placeOrderTime)
        }
        this.getCoupon()
      }).catch(error => {
        console.log(error)
      })
      let orderId = window.localStorage.getItem('orderId')
      if (this.payid && this.$route.params.id == orderId) {
        this.payType = 'kq'
        this.retrieve(this.payid).then(state => {
          if (state !== 1) return Promise.reject()
          if (this.$route.params.type == 'activity') {
            return this.$htAjax.post('https://apitest.gack.citic:8083/guoanmaker/operator/activityEnlist/updateEnlistPayState',{}, {
              params: {
                id: this.$route.params.id,
                streamNum: this.payid
              }
            })
          } else {
            return this.$htAjax.post('https://apitest.gack.citic:8081/guoanmaker/personal/orderform/overPay',{}, {
              params: {
                id: this.$route.params.id,
                defrayNumber: this.payid
              }
            })
          }
        }).then(() => {
          window.localStorage.removeItem('payid')
          window.localStorage.removeItem('orderId')
          window.localStorage.removeItem('userid')
          window.localStorage.removeItem('sessionid')
          this.dialogTableVisible = false
          this.$message({
            type: 'success',
            message: '支付成功'
          })
          if (this.$route.params.type == 'activity') {
            this.$router.push({
              path: `/user/appcon/${this.$route.params.id}/yuyue`,
              query: {
                title: '活动报名'
              }
            })
          } else {
            this.$router.push({
              path: '/orderlist',
              query: {
                id: this.$route.params.id
              }
            })
          }
        }).catch(error => {
          if (!error) return false
          if (error.status == 200) {
            window.localStorage.removeItem('payid')
            window.localStorage.removeItem('orderId')
            window.localStorage.removeItem('userid')
            window.localStorage.removeItem('sessionid')
            this.dialogTableVisible = false
            if (this.$route.params.type == 'activity' && error.state == 1) {
              this.$message({
                type: 'success',
                message: '支付成功'
              })
              this.$router.push({
                path: `/user/appcon/${this.$route.params.id}/yuyue`,
                query: {
                  title: '活动报名'
                }
              })
            } else {
              this.$router.push({
                path: '/orderlist',
                query: {
                  id: this.$route.params.id
                }
              })
            }
          }
        })
      }
    },
    watch: {
      user (val) {
        if (val) {
          this.getCoupon()
        }
      }
    },
    methods: {
      countDown (opt) {
        if (this.time) {
          clearInterval(this.time)
        }
        let now = new Date().getTime() - 24 * 60 * 60 * 1000
        let time = (opt - now) /1000
        this.time = setInterval(() => {
          this.countTime = `${Math.floor((time / 3600) % 24)}小时${Math.floor((time/ 60) % 60)}分${Math.floor(time % 60 )}秒`
          time--
        }, 1000)
      },
      getCoupon () {
        this.$htAjax.post('https://apitest.gack.citic:8081/guoanmaker/personal/orderform/findCoupons', {}, {
          params: {
            userid: this.user.id
          }
        }).then(({ data }) => {
          let now = new Date().getTime()
          this.couponList = data.data.filter(item => {
            return item.isUsed === '0' && (item.couponstype === '0' || (item.couponstype === '1' && now < item.endCouponstime && (item.fullamount <= this.order.realPrice || item.fullamount <= this.order.payMoney)))
          })
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
            let res = await this.$tkAjax.get(`https://pay.gack.citic/retrieve.php?pingId=${id}`).catch(error => {
            })
            state = res.data
          }
          resolve(state)
        })
      },
      submit () {
        this.alipay_code = ''
        let url = this.$route.params.type == 'activity' ? 'https://apitest.gack.citic:8083/guoanmaker/operator/activityEnlist/validateActivityEnlistCoupons' : 'https://apitest.gack.citic:8081/guoanmaker/personal/orderform/orderToCoupon'
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
          if (this.$route.params.type == 'activity') {
            return this.$htAjax.post('https://apitest.gack.citic:8083/guoanmaker/operator/activityEnlist/paymentActivityEnlist',{}, {
              params: {
                id: this.$route.params.id,
                channel: this.payType,
                back_url: window.location.href
              }
            })
          } else {
            return this.$htAjax.post('https://apitest.gack.citic:8081/guoanmaker/personal/orderform/initiatePay', {}, {
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
              window.localStorage.setItem('userid', JSON.stringify(this.$store.state.userid))
              window.localStorage.setItem('sessionid', this.$store.state.sessionid)
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
            let res = await this.$tkAjax.get(`https://pay.gack.citic/retrieve.php?pingId=${data.pay ? data.pay.id : data.id}`).catch(error => {
              console.log(error)
            })
            state = res.data
          }
          return Promise.resolve(data.pay ? data.pay.id : data.id)
        }).then(id => {
          if (this.$route.params.type == 'activity') {
            return this.$htAjax.post('https://apitest.gack.citic:8083/guoanmaker/operator/activityEnlist/updateEnlistPayState',{}, {
              params: {
                id: this.$route.params.id,
                streamNum: id
              }
            })
          } else {
            return this.$htAjax.post('https://apitest.gack.citic:8081/guoanmaker/personal/orderform/overPay',{}, {
              params: {
                id: this.$route.params.id,
                defrayNumber: id
              }
            })
          }
        }).then(() => {
          if (window.localStorage.getItem('userid') || window.localStorage.getItem('sessionid')) {
            window.localStorage.removeItem('sessionid')
            window.localStorage.removeItem('userid')
          }
          this.dialogTableVisible = false
          this.$message({
            type: 'success',
            message: '支付成功'
          })
          if (this.$route.params.type == 'activity') {
            this.$router.push({
              path: `/user/appcon/${this.$route.params.id}/yuyue`,
              query: {
                title: '活动报名'
              }
            })
          } else {
            this.$router.push({
              path: '/orderlist',
              query: {
                id: this.$route.params.id
              }
            })
          }
        }).catch(error => {
          if (error !== 'alipay_code' && error !==  'kq_code') {
            if (!this.payFlag) {
              this.$message({
                type: 'info',
                message: '操作成功'
              })
            } else {
              this.$message.error(error.data.msg || error.data.data.value)
            }
          }
        })
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
</style>
