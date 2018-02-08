<template>
  <div class="invoice">
    <div class="back" @click = '$router.go(-1)'>
      < 返回上一页
    </div>
    <card class="view">
      <div class="view_title" slot = 'header'>
        <span class="title">发票选择</span>
        <span class="tip">
          注意：发票申请后5个工作日内服务商将发票寄出，快递费用为邮寄到付/卖家包邮
        </span>
      </div>
      <div class="title">
        <span class="invoice_title">发票抬头</span>
      </div>
      <router-link tag = 'div' class="view_li active"  v-if =  'invoiceList' :to = '{path: "/user/myinvoice", query: {from: "order"}}'>
        <p>单位名称：{{ invoiceList.invoiceName }} </p>
        <div class="edit">
          <el-button type = 'info' :plain = 'true' size = 'small' >{{ invoiceList.invoiceType === '0' ? '普通发票' : '专用发票' }}</el-button>
          <el-button type = 'small' :plain = 'true'>默认</el-button>
        </div>
      </router-link>
      <el-button type = 'primary' v-else @click = '$router.push({path: "/user/addinvoice", query: {title: "我的发票", fromtitle: "我的发票", default: "1"}})'>添加默认发票</el-button>
    </card>
    <card class="view">
      <div class="view_title" slot = 'header'>
        <span class="title">地址信息</span>
      </div>
      <router-link tag = 'div' class="view_li active"  :to = '{path: "/user/address", query: {title: "我的地址", fromtitile: "地址管理" }}' v-if = 'addressList'>
        <p>姓名：{{ addressList.name }} </p>
        <p>电话: {{addressList.telephone}}</p>
        <p>地址: {{ addressList.address }}</p>
        <div class="edit">
          <el-button type = 'small' :plain = 'true'>默认</el-button>
        </div>
      </router-link>
      <el-button type = 'primary' v-else @click = '$router.push({path: "/user/editaddress", query: {title: "我的地址", fromtitle: "地址管理", default: "1"}})'>添加默认地址</el-button>
    </card>
    <div class="text-center">
      <el-button type = 'primary' size = 'large' @click = 'submit'>确认</el-button>
    </div>
  </div>
</template>
<script>
  import store from 'store'
  export default {
    name: 'invoice',
    data: () => ({
      invoiceType: 'common'
    }),
    methods: {
      submit () {
        this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/orderform/getInvoice`, {}, {
          params: {
            orderid: this.$route.params.id,
            invoiceid: this.invoiceList.id,
            addressid: this.addressList.id
          }
        }).then(({ data }) => {
          this.$message({
            type: 'success',
            message: data.data.value
          })
          this.$router.push({
            path: '/user/order',
            query: {
              title: '我的订单'
            }
          })
        }).catch(() => {
          this.$message.error('申请开发票失败')
        })
      }
    },
    computed: {
      addressList () {
        return this.$store.state.userInfo.addresses.filter(item => {
          return item.isdefault == "1"
        })[0]
      },
      invoiceList () {
        return this.$store.state.userInfo.invoices.filter(item => {
          return item.isdefault === '1'
        })[0]
      }
    }
  }
</script>
<style scoped>
  .invoice .back{
    color: #f00;
    line-height:50px;
    font-size:14px;
  }
  .view{
    background: #fff;
    padding:15px 20px;
    margin-bottom: 15px;
  }
  .view_title .tip{
    color: #f00;
    margin-left: 10px;
    font-size: 14px;
  }
  .button{
    margin-top: 20px;
  }
  .view_li {
    margin-top: 15px;
    position:relative;
    padding: 15px 20px;
  }
  .view_li .edit{
    position:absolute;
    right: 15px;
    bottom: 20px;
  }
  .view_li p{
    line-height: 3em;
  }
  .active{
    border: 1px solid #f00;
  }
  .invoice_title{
    font-size: 16px;
    margin-right: 15px;
  }
  .invoice_con {
    margin-top: 15px;
  }
</style>
