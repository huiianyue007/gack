<template>
  <div class="content">
    <tab-header :tabArr='tabList' @changeType='changeType'></tab-header>
    <div class="tab_content"  v-loading = 'loading'>
      <el-row class='tab_title'>
        <el-col :span='2'>商品</el-col>
        <el-col :span='4' :push='10' class='text-center'>实付款</el-col>
        <el-col :span='2' :push='10' class='text-center'>数量</el-col>
        <el-col :span='6' :push='10' class='text-center'>状态</el-col>
      </el-row>
      <el-row v-for='(item, key) in orderFilterList' :key='key' class='order_list' @click.native='routeTo(item, key)'>
        <el-row class='order_title'>
          <el-col :span='6'>订单编号 {{ item.orderNumber }}</el-col>
          <el-col :span='14'>下单时间 {{ item.placeOrderTime | time }}</el-col>
          <el-col :span='4' class='text-right'>
            <div class="status">{{ item.orderStatus | status }}</div>
          </el-col>
        </el-row>
        <el-row class='order_con'>
          <el-col :span='12'>
            <img :src="item.commodity_smallimage" alt="" class='fl logo' width='82' height='77'>
            <div class="fl order_li_con">
              <div class="text-hidden li_title">{{ item.commodityName }}</div>
              <div class="li_desc">{{ item.serverName }}</div>
            </div>
          </el-col>
          <el-col :span='4' class='text-center' style = 'min-height: 2em;'>
            <span v-if = 'item.realPrice || (item.spikeid && item.spikePrice)'>{{ item.spikeid && item.spikePrice? item.spikePrice : parseInt(((item.realPrice - (item.preferentialMoney ? item.preferentialMoney : 0) - (item.returnPreferentialMoney ? item.returnPreferentialMoney: 0)) * 100)) / 100}}元</span>
          </el-col>
          <el-col :span='2' class='text-center'>
            {{ item.quantity }}
          </el-col>
          <el-col :span='6' class='text-right'>
            <div v-if = 'item.orderType == 4' style = 'line-height: 2em;padding: 0 1em;' @click.stop = 'selectDetail(item)'>查看详情</div>
            <el-button v-if='item.orderStatus === "1"' size='small' @click.native.stop='$router.push("/submit-order/" + item.id + "/order")'>去支付</el-button>
            <el-button v-if='item.orderStatus === "1" || item.orderStatus === "2" || item.orderStatus === "14"' size='small' @click.native.stop='cancelOrder(item)'>取消订单</el-button>
            <el-button v-if='item.orderStatus === "7" || item.orderStatus === "8"' size='small' @click.native.stop='$router.push(`/serde/${item.commodityid}/1`)'>再次购买</el-button>
            <el-button v-if='item.orderStatus === "9" || item.orderStatus === "15"' @click.native.stop='concat(item)'>联系国安</el-button>
            <el-button v-if='(item.orderStatus === "13" || item.orderStatus ==="6") &&　!item.invoiceState' @click.native.stop='$router.push({path:`/user/invoice/${item.id}`, query: {title: "我的发票"}})'>开发票</el-button>
            <el-button v-if='item.orderStatus ==="6"' @click.native.stop='$router.push(`/evaluate/${item.id}`)'>评价</el-button>
            <el-row v-if='item.orderStatus ==="3" || item.orderStatus ==="4"' :gutter='12'>
              <el-col :span='12'>
                <el-button size='small' @click.native.stop='submit(item, key)'>我要退款</el-button>
              </el-col>
              <el-col :span='12'>
                <el-button size='small' v-if='item.orderStatus ==="3"' type="danger" @click.native.stop='concat(item)'>联系商户</el-button>
                <el-button size='small' v-if='item.orderStatus ==="4"' @click.native.stop='confirmOrder(item)'>确认完成</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-row>
      <!--<el-button class="block no_more" type = 'text' v-if = '!orderFilterList.length'>您现在没有{{ activeType == 'all' ? '' : activeType | status }}订单</el-button>-->
      <div class="no_data_lay" v-if='!orderFilterList.length'>
        <layout>
        </layout>
      </div>
      <el-dialog title="请填写退款原因" :visible.sync="dialogVisible" size="tiny">
        <el-button :type='refundsReason == "我不想买了" ? "primary": ""' class='block order_button' @click.native='selectRefund("我不想买了")'>我不想买了</el-button>
        <el-button :type='refundsReason == "商品买多了,买重复了" ? "primary": ""' class='block order_button' @click.native='selectRefund("商品买多了,买重复了")'>商品买多了,买重复了</el-button>
        <el-button :type='refundsReason == "卖家缺货" ? "primary": ""' class='block order_button' @click.native='selectRefund("卖家缺货")'>卖家缺货</el-button>
        <el-form :data='refundData' label-width='80px' class='form' :model='refundData' :rules='rules' label-position="left" ref='refundForm'>
          <el-form-item label="详情描述">
            <el-input type="textarea" v-model='refundData.desc'></el-input>
          </el-form-item>
          <el-form-item label="退款金额" prop='amount'>
            <el-input type="input" v-model.number='refundData.amount' size='small'></el-input>
          </el-form-item>
        </el-form>
        <div class="text-center">
          <el-button type='primary' @click='refund'>我要退款</el-button>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="dialogVisiblexvqiu" width="50%">
        <div class="text-center title">企业资料收集单</div>
        <div class="record_detail" v-if = 'record'>
          <div class = 'oh'>
            <div class="inline-block oh" style="min-width: calc(50% - 5px)">
              <span class="title">企业名称</span> <div class="inline-block" style="vertical-align:top;max-width: calc(100% - 8em);word-wrap: break-word">
                {{record.enterpriseName}}
              </div>
            </div>
            <div class="inline-block" style="min-width: calc(50% - 5px)">
              <span class="title">联系方式</span> {{record.contactNumber}}
            </div>
          </div>
          <el-row class = 'de_list'>
            <el-col :span = '12'>
              <span class="title">联系人</span><span class="word-break" style="max-width: calc(100% - 7em)"> {{record.contactPerson}}</span>
            </el-col>
            <el-col :span = '12'>
              <span class="title">职位</span> <span class="word-break" style="max-width: calc(100% - 6em)">{{record.position}}</span>
            </el-col>
          </el-row>
          <p class = 'de_list'>
            <span class="title">需求简述</span>
            <span class="word-break synopsis">
              {{record.requirementDescription}}
            </span>
          </p>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import tabHeader from 'components/tabHeader'
  export default {
    name: 'order',
    data() {
      const checkAmount = (rule, value, callback) => {
        if(!value) {
          return callback(new Error('退款金额不能为空'));
        }
        if((typeof value).toLowerCase() !== 'number') {
          return callback(new Error('请输入数字值'));
        } else {
          if(value <= 0) {
            return callback(new Error('退款金额必须大于0'));
          } else {
            callback();
          }
        }
      }
      return {
        index: 0,
        refundOrder: null,
        refundData: {
          desc: '',
          amount: 0
        },
        record: null,
        loading: true,
        dialogVisiblexvqiu: false,
        activeType: 'all',
        refundsReason: '',
        tabList: [],
        orderType: [{
          title: '全部订单',
          type: 'all'
        }, {
          title: '待沟通',
          type: '14'
        }, {
          title: '待支付',
          type: '1'
        }, {
          title: '待接单',
          type: '2'
        }, {
          title: '服务中',
          type: '3'
        }, {
          title: '待确认',
          type: '4'
        }, {
          title: '待评价',
          type: '6'
        }, {
          title: '退款处理中',
          type: '5'
        }, {
          title: '退款成功',
          type: '8'
        }, {
          title: '交易关闭',
          type: '7'
        }, {
          title: '退款处理中',
          type: '10'
        }, {
          title: '退款处理中',
          type: '11'
        }, {
          title: '已完成',
          type: '13'
        }, {
          title: '交易已关闭',
          type: '15'
        }],
        orderList: [],
        dialogVisible: false,
        orderFilterList: [],
        rules: {
          amount: [{
            validator: checkAmount,
            trigger: 'blur'
          }]
        }
      }
    },
    created() {
      this.tabList = this.orderType.filter(item => {
        return item.type == 'all' || item.type == '14' || eval(item.type) <= 7
      })
      this.loading = true
      this.activeType =  'all'
      if(!this.$store.state.userid) {
        this.$router.push('/login/0')
        return false
      }
      this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/orderform/findByProperties`, {}, {
        params: {
          userid: this.$store.state.userid.id,
          orderStatus: this.activeType === 'all' ? '' : this.activeType
        }
      }).then(({
                 data
               }) => {
        this.loading = false
        this.orderList = data.data
        this.orderFilterList = this.orderList
      }).catch(error => {
        this.loading = false
        if (error.data.status == 99) {
          return false
        }
        this.$message.error('获取用户订单失败')
      })
    },
    watch: {
      user(val) {
        if(val) {
          this.getOrder({
            userid: val.id
          })
        }
      },
      activeType(val) {
        this.getOrder({
          userid: this.$store.state.userid.id,
          orderStatus: val === 'all' ? '' : val
        })
      }
    },
    methods: {
      selectDetail (opt) {
        this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/orderform/findByid`, {}, {
          params: {
            id: opt.id
          }
        }).then(({ data }) => {
          this.dialogVisiblexvqiu = true
          this.record = data.data
        }).catch(error => {
          console.log(error)
        })
      },
      concat(opt) {
        this.$alert(`服务商电话 ${opt.licensPhone}`, '联系商户', {
          confirmButtonText: '确定'
        });
      },
      confirmOrder(opt) {
        this.$confirm('是否确认完成订单', '', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/orderform/confirmOrder`, {}, {
            params: {
              id: opt.id
            }
          }).then(({
            data
          }) => {
            if(data.data.key === 'success') {
              this.$set(opt, 'orderStatus', '6')
              this.$message({
                type: 'success',
                message: data.data.value
              })
            } else {
              return Promise.reject(data)
            }
          }).catch(error => {
            this.$message.error(error.data.value)
          })
        })
      },
      getOrder(opt) {
        this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/orderform/findByProperties`, {}, {
          params: opt
        }).then(({
          data
        }) => {
          this.orderList = data.data
          this.orderFilterList = this.orderList
        }).catch(error => {
          console.log(error)
          this.$message.error('获取用户订单失败')
        })
      },
      cancelOrder(opt, index) {
        this.$confirm('是否取消订单', '', {
          confirmButtonText: '取消订单',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.setOrder({
            id: opt.id,
            closeType: '3'
          }).then(res => {
            if(opt.orderStatus == '2') {
              this.$set(opt, 'orderStatus', '5')
            } else {
              this.$set(opt, 'orderStatus', '7')
            }

          }).catch(() => {
            this.$message.error('订单取消失败')
          })
        }).catch(() => {})
      },
      setOrder(opt) {
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
      routeTo(opt) {
        this.$router.push({
          path: '/orderlist',
          query: {
            id: opt.id
          }
        })
      },
      selectRefund(opt) {
        this.refundsReason = opt
      },
      refund(opt) {
        this.$refs.refundForm.validate(valid => {
          if(valid) {
            if(!this.refundsReason) {
              this.$message.error('请选择退款原因')
              return false
            }
            this.$confirm('对服务不满意', '', {
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
      refundMoney() {
        this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/orderform/initiateRefunds`, {}, {
          params: {
            id: this.refundOrder.id,
            amount: this.refundData.amount,
            refundsReason: this.refundsReason
          }
        }).then(({
          data
        }) => {
          if(data.data.key === 'error') {
            return Promise.reject(data)
          } else {
            this.$message({
              type: 'success',
              message: data.data.value
            })
            this.refundsReason = ''
            this.refundData = {
              desc: '',
              amount: 0
            }
            this.$set(this.orderList[this.index], 'orderStatus', '5')
          }
        }).catch(error => {
          this.$message.error(error.data.data.value)
        })
      },
      changeType(opt) {
        this.activeType = opt
      },
      submit(opt, key) {
        if(opt.orderStatus === '3' || opt.orderStatus === '4') {
          this.dialogVisible = true
          this.refundOrder = opt
          this.index = key
        }
      }
    },
    components: {
      tabHeader
    }
  }
</script>
<style scoped>
  .tab_content {
    background: #fff;
    padding: 15px;
    box-sizing: border-box;
  }

  .tab_title {
    padding: 12px 0 10px;
    margin: 0 auto;
    border-bottom: 1px solid #efefef;
    font-size: 16px;
    color: #5D5D5D;
  }

  .order_list {
    border: 1px solid #efefef;
    margin-top: 10px;
  }

  .form {
    margin-top: 20px;
  }
.word-break{
  word-break: break-all;
  display: inline-block;
  vertical-align: top;
}
  .order_title {
    background: #e4e4e4;
    padding: 0 15px;
    line-height: 32px;
    box-sizing: border-box;
  }

  .order_title .status {
    font-size: 14px;
    color: #FFFFFF;
    display: inline-block;
    vertical-align: middle;
    width: 90px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 10px;
    background: rgb(255, 79, 81);
  }

  .text-red {
    color: rgb(255, 79, 81);
    font-size: 12px;
    line-height: 1em;
  }

  .order_con {
    padding: 10px;
  }
  .order_con .order_li_con{
    max-width: calc(100% - 100px);
  }
  .order_con .logo {
    margin-right: 10px;
  }

  .order_con .el-col {
    line-height: 77px;
  }

  .order_con .li_title,
  .order_con .li_desc {
    line-height: 1em;
    text-align: left;
  }

  .order_con .li_title {
    margin-bottom: 45px;
  }

  .order_button {
    margin-top: 15px;
  }

  .no_more {
    margin-top: 15px;
  }
  .record_detail{
    margin-top: 60px;
  }
  .record,.record_detail .title{
    font-size: 14px;
  }
  .record_detail .title{
    width: 5em;
    display: inline-block;
  }
  .record_detail .de_list{
    margin: 20px 0;
  }
  .record_detail  span.title{
    margin-right: 1em;
  }
  .record_detail .title:nth-of-type(2) {
    margin-left: 40px;
  }
  .synopsis{
    max-width: calc(100% - 9em);
    vertical-align: top;
  }
</style>
