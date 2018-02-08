<template>
  <div class="page-container">
    <div class="container">
      <div class="back" @click = 'back'>
        < 返回上一页
      </div>
      <div class="message" v-if = 'order'>
        <div class="title">联系人信息</div>
        <div class="desc">联系人姓名: {{ order.contactPerson }}</div>
        <div class="desc">联系电话: {{ order.contactNumber}}</div>
        <div class="desc">需求描述: {{ order.requirementDescription}}</div>
      </div>
      <router-link tag = 'div' class="message invoice" v-if = 'this.order && this.order.orderStatus == "13" && this.order.invoiceState !== "1"' :to = '{
        path: "/user/myinvoice",
        query: {
          title: "我的发票"
        }
      }'>
        <div class="title">
          发票信息
        </div>
        <div v-if = 'invoice'>
          <p>发票名称: {{ invoice.invoiceName }} <span class="tip">{{ invoice.invoiceType== "0" ? "普通增值税发票" : "专用增值税发票"}}</span></p>
          <p>纳税人识别号: {{ invoice.taxNumber }}</p>
        </div>
        <el-button type = 'primary' v-else>添加发票信息</el-button>
      </router-link>
      <div class="message invoice" v-if = 'this.order && this.order.orderStatus == "13" && this.order.invoiceState === "1"'>
        <div class="title">
          发票信息
        </div>
        <div v-if = 'OrderInvoice'>
          <p>发票名称: {{ OrderInvoice.invoiceName }} <span class="tip">{{ OrderInvoice.invoiceType== "0" ? "普通增值税发票" : "专用增值税发票"}}</span></p>
          <p>姓名: {{ OrderInvoice.name }}</p>
          <p>邮寄地址:  {{ OrderInvoice.postalAddress }}</p>
          <p>电话: {{ OrderInvoice.postalTelephone }}</p>
        </div>
      </div>
      <router-link tag = 'div' class="message invoice" v-if = 'this.order && this.order.orderStatus == "13" && this.order.invoiceState !== "1"' :to = '{
        path: "/user/address",
        query: {
          title: "地址管理"
        }
      }'>
        <div class="title">
          地址信息
        </div>
        <div v-if = 'address'>
          <p>姓名:  {{ address.name }}</p>
          <p>邮寄地址:  {{ address.address }}</p>
          <p>电话: {{ address.telephone }}</p>
        </div>
        <el-button type = 'primary' v-else>添加地址信息信息</el-button>
      </router-link>
      <div class="message" v-if = 'order'>
        <div class="title">
          订单详细信息
        </div>
        <div class="desc">订单编号：{{order.orderNumber}}</div>
        <div class="desc">创建时间：{{order.placeOrderTime | time}}</div>
        <div class="desc" v-if = "order.defrayTime">付款时间：{{order.defrayTime | time}}</div>
        <div class="desc" v-if = "order.complete">交易完成时间：{{ order.complete }}</div>
        <div class="title li_title">
          订单内容
        </div>
        <el-table :data = 'orderData'>
          <el-table-column label = '商品' :width = '400'>
            <template slot-scope = 'scope'>
              <el-row :gutter = '12'>
                <el-col :span = '10'>
                  <box-img class = 'img' :bgImg = 'scope.row.commodity_smallimage'>
                  </box-img>
                </el-col>
                <el-col :span = '14'>
                  <div class="title message_title">{{ scope.row.commodityName }}</div>
                  <div class="subhead">{{ scope.row.businessName }}</div>
                  <div class="subhead">{{ scope.row.serverPlace || "全国" }}</div>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column label = '单价' prop = 'realPrice'></el-table-column>
          <el-table-column label = '优惠券' prop = 'preferentialMoney'></el-table-column>
          <el-table-column label = '数量' prop = 'quantity'></el-table-column>
          <el-table-column label = '订单状态'>
            <template slot-scope = 'scope'>
              <span class="text-red">{{ scope.row.orderStatus | status }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="subhead shut" v-if = 'order.orderStatus == 7 || order.orderStatus == 15'>
          关闭原因: {{order.closeType | close(order.spikeid)}}
        </div>
        <div class="subhead shut" v-if = 'order.orderStatus == 8 || order.orderStatus == 9 || order.orderStatus == 10 || order.orderStatus == 11 || order.orderStatus == 5'>
          退款描述: {{order.orderStatus | desc}}
        </div>
        <div class="submit">
          <div class="fl li">
            <div class="title" v-if = '(this.order.spikePrice && this.order.spikeid) || totalPrice'>订单总价: <span class="price">￥{{this.order.spikePrice && this.order.spikeid ? this.order.spikePrice : this.order.realPrice}}</span></div>
          </div>
          <div class="fr text-right li" >
            <el-button v-if = 'order.orderStatus == "1"' @click.native.stop = '$router.push("/submit-order/" + order.id + "/order")'>去支付</el-button>
            <el-button v-if = 'order.orderStatus == "1" || order.orderStatus == "2" || order.orderStatus == "14"'  @click.native.stop = 'cancelOrder'>取消订单</el-button>
            <el-button v-if = 'order.orderStatus =="3"' type="danger" @click.stop = 'concat'>联系商户</el-button>
            <el-button v-if = 'order.orderStatus == "7" || order.orderStatus == "8"'  @click.stop = '$router.push(`/serde/${order.commodityid}/1`)'>再次购买</el-button>
            <el-button v-if = 'order.orderStatus == "9" || order.orderStatus == "15"' @click = 'concat'>联系国安</el-button>
            <el-button v-if = 'order.orderStatus =="4"' @click.native.stop = 'confirmOrder'>确认完成</el-button>
            <el-button @click.native.stop = 'submit' v-if = 'order.orderStatus =="3" || order.orderStatus =="4" '>我要退款</el-button>
            <el-button v-if = '(order.orderStatus == "13" || order.orderStatus =="6") && this.order.invoiceState !== "1" &&　!this.order.invoiceState' @click.stop =  '$router.push({path: `/user/invoice/${order.id}`, query: {title: "我的发票"}})'>开发票</el-button>
            <el-button v-if = 'order.orderStatus =="6"' @click.native.stop = '$router.push(`/evaluate/${order.id}`)'>评价</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="请填写退款原因"
      :visible.sync="dialogVisible"
      size="tiny">
      <el-button :type = 'refundsReason == "我不想买了" ? "primary": ""' class = 'block order_button' @click.native = 'selectRefund("我不想买了")'>我不想买了</el-button>
      <el-button :type = 'refundsReason == "商品买多了,买重复了" ? "primary": ""' class = 'block order_button' @click.native = 'selectRefund("商品买多了,买重复了")'>商品买多了,买重复了</el-button>
      <el-button :type = 'refundsReason == "卖家缺货" ? "primary": ""' class = 'block order_button'  @click.native = 'selectRefund("卖家缺货")'>卖家缺货</el-button>
      <el-form :data = 'refundData' label-width = '80px' class = 'form' :model = 'refundData' :rules = 'rules' label-position="left" ref = 'refundForm'>
        <el-form-item label="详情描述">
          <el-input type="textarea" v-model = 'refundData.desc'></el-input>
        </el-form-item>
        <el-form-item label="退款金额" prop = 'amount'>
          <el-input type="input" v-model.number = 'refundData.amount' size = 'small'></el-input>
        </el-form-item>
      </el-form>
      <div class="text-center">
        <el-button type = 'primary' @click = 'refund'>我要退款</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import store from 'store'
  const checkAmount = function (rule, value, callback) {
    if (!value) {
      return callback(new Error('退款金额不能为空'));
    }
    if ((typeof value).toLowerCase() !== 'number') {
      return callback(new Error('请输入数字值'));
    } else {
      if (value <= 0) {
        return callback(new Error('退款金额必须大于0'));
      } else {
        callback();
      }
    }
  }
  export default {
    name: 'order-list',
    async beforeRouteEnter (from, to, next) {
      if (store.state.userid) {
        if (!store.state.userInfo) {
          await store.dispatch('findById', store.state.userid.id).catch(() => {
            next('/login/0')
          })
          next()
        } else {
          next()
        }
      } else {
        next('/login/0')
      }
    },
    filters: {
      desc (opt) {
        if (opt == '5') {
          return '您已发起退款，等待服务商处理'
        } else if (opt == '9') {
          return '商家已拒绝退款,请联系国安'
        } else if (opt == '10') {
          return '服务商接受退款并向财务发起退款，等待财务平台处理'
        } else if (opt == '11') {
          return '您已发起关闭订单，等待财务平台退款'
        } else if (opt == '8') {
          return '退款已完成'
        }
      },
      close (opt, val) {
        if (opt == '1' && val) {
          return '十分钟未付款自动关闭'
        } if (opt == '2' && val) {
          return '十分钟未接单自动关闭'
        } else if (opt == '1') {
          return '二十四小时未付款自动关闭'
        } if (opt == '2') {
          return '二十四小时未接单自动关闭'
        } else if (opt == '3') {
          return '用户关闭'
        } else if (opt == '4') {
          return '运营商关闭'
        } else  if (opt == '5') {
          return '服务商关闭'
        }
      }
    },
    data: () => ({
      order: null,
      refundsReason: '',
      refundData: {
        desc: '',
        amount: 0
      },
      rules: {
        amount: [{ validator: checkAmount, trigger: 'blur' }]
      },
      dialogVisible: false,
      orderData: [],
      OrderInvoice: null
    }),
    created () {
      this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/orderform/findByid`, {}, {
        params: {
          id: this.query.id
        }
      }).then(({ data }) => {
        this.order = data.data
        this.order.orderStatus = eval(this.order.orderStatus)
        this.order.preferentialMoney = (this.order.returnPreferentialMoney || 0) + (this.order.preferentialMoney || 0)
        this.orderData.push(this.order)
        if (data.data.invoiceState == '1') {
          return Promise.resolve(data.data)
        }
      }).then( data => {
        this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/invoice/getOrderInvoice`, {}, {
          params: {
            orderid: this.query.id
          }
        }).then(({ data }) => {
          this.OrderInvoice = data.data
        })
      } ).catch(error => {
        console.log(error)
      })
    },
    computed: {
      query () {
        return this.$route.query
      },
      totalPrice () {
        if (this.order) {
          return parseInt((this.order.realPrice - (this.order.preferentialMoney ? this.order.preferentialMoney : 0) - (this.order.returnPreferentialMoney ? this.order.returnPreferentialMoney : 0)) * 100)  / 100
        }
      },
      address () {
        return this.$store.state.userInfo.addresses.filter(item => {
          return item.isdefault === '1'
        })[0]
      },
      invoice () {
        return this.$store.state.userInfo.invoices.filter(item => {
          return item.isdefault === '1'
        })[0]
      }
    },
    methods: {
      back () {
        if (this.$route.query.type == '1') {
          this.$router.push(`/serde/${this.order.commodityid}/1`)
        } else {
          this.$router.go(-1)
        }
      },
      confirmOrder () {
        this.$confirm('是否确认完成订单','', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/orderform/confirmOrder`, {}, {
            params: {
              id: this.order.id
            }
          }).then(({ data }) => {
            if (data.data.key === 'success') {
              this.$message({
                type: 'success',
                message: data.data.value
              })
              this.order.orderStauts = 6
            } else {
              return Promise.reject(data)
            }
          }).catch(error => {
            this.$message.error(error.data.value)
          })
        })
      },
      setOrder (opt) {
        return new Promise((resolve, reject) => {
          this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/orderform/closeOrder`, {}, {
            params: opt
          }).then(res => {
            resolve(res)
          }).catch(error => {
            reject(error)
          })
        })
      },
      submit (opt) {
        if (this.order.orderStatus == '3' || this.order.orderStatus == '4') {
          this.dialogVisible = true
        }
      },
      selectRefund (opt) {
        this.refundsReason = opt
      },
      refund () {
        this.$refs.refundForm.validate(valid => {
          if (valid) {
            if (!this.refundsReason) {
              this.$message.error('请选择退款原因')
              return false
            }
            this.$confirm('对服务不满意','', {
              confirmButtonText: '联系服务商',
              cancelButtonText: '已联系，继续退款',
              type: 'warning'
            }).then(() => {
              this.dialogVisible = false
              this.concat(this.refundOrder)
            }).catch(() => {
              this.refundMoney()
              this.dialogVisible = false
            })
          }
        })
      },
      concat () {
        this.$alert(`服务商电话 ${this.order.licensPhone}`, '联系商户', {
          confirmButtonText: '确定'
        });
      },
      refundMoney () {
        this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/orderform/initiateRefunds`, {}, {
          params: {
            refundsReason: this.refundsReason,
            id: this.order.id,
            amount: this.refundData.amount
          }
        }).then(({data}) => {
          if (data.data.key === 'error') {
            return Promise.reject(data)
          } else {
            this.$message({
              type: 'success',
              message: data.data.value
            })
            this.order.orderStatus = '5'
          }
        }).catch(error => {
          this.$message.error(error.data.data.value)
        })
      },
      cancelOrder () {
        this.$confirm('是否取消订单','', {
          confirmButtonText: '取消订单',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.setOrder({
            id: this.order.id,
            closeType: '3'
          }).then(res => {
            if (this.order.orderStatus == '2') {
              this.$set(this.order, 'orderStatus', '5')
            } else {
              this.$set(this.order, 'orderStatus', '7')
            }
          }).catch(() => {
            this.$message.error('订单取消失败')
          })
        }).catch(() => {
        })
      }
    }
  }
</script>
<style scoped>
  .back{
    color: #ff0000;
    line-height:50px;
    font-size:14px;
    cursor: pointer;
  }
  .message{
    background:#fff;
    margin:10px 0;
    padding: 15px 20px;
    box-sizing: border-box;
  }
  .message .message_title {
    margin-top: 20px;
  }
  .message .li_title {
    margin-top:15px;
  }
  .message img{
    max-width: 100%;
  }
  .message .title {
    margin-bottom: 10px;
  }
  .message .title:before{
    content: '';
    display:inline-block;
    background:#f00;
    vertical-align: middle;
    margin-right: 10px;
    height: 2em;
    width:6px;
  }
  .message .desc{
    text-indent: 2em;
    overflow:hidden;
    line-height:2em;
  }
  .submit{
    border-top: 1px solid #efefef;
    padding-top: 15px;
    overflow: hidden;
  }
  .submit .price{
    color: #f67;
  }
  .submit .title{
    margin-bottom: 0;
  }
  .submit .li {
    width: 50%;
  }
  .message .title{
    font-size: 16px;
  }
  .order_button{
    margin-top: 15px;
  }
  .form {
    margin-top: 20px;
  }
  .invoice p {
    padding-left: 20px;
    line-height: 2em;
  }
  .tip{
    line-height: 2em;
    color: #fff;
    border-radius: 5px;
    padding: 0 2em;
    margin-left: 15px;
    background:#f67;
  }
  .shut{
    line-height: 2em;
    margin: 15px 0;
  }
  .text-red{
    color:#f67;
  }
  .message .img{
    width:84px;
    margin: 10px 0;
  }
  .submit .title:before,.el-table .title:before{
    display: none;
  }
</style>
