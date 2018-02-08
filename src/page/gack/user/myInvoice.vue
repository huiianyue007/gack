<template>
  <div class="invoice">
    <card>
      <div class="title" slot = 'header'><span class="tip inline-block"></span>我的发票 <el-button type = 'primary' class = 'fr' @click = '$router.push({path: "/user/addinvoice", query: {title: "我的发票", fromtitle: "我的发票"}})'>添加发票信息</el-button></div>
      <card v-for = '(item, key) in invoiceList' :key = 'key' class = 'view' v-if = 'invoiceList.length'>
        <el-row slot = 'header'>
          <el-col :span = '20'>{{ item.invoiceName }}</el-col>
          <el-col :span = '2'>
            <el-button v-if = 'item.invoiceType === "0"'>普通发票</el-button>
            <el-button v-if = 'item.invoiceType === "1"'>专用发票</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" @click.native = 'setDefault(item)'>
            <img src="~assets/images/gack/selected.png" alt="" width = '16' height = '16' v-if = 'item.isdefault === "1"'>
            <img src="~assets/images/gack/unselected.png" alt=""  width = '16' height = '16' v-if = 'item.isdefault === "0"'>
            {{ item.isdefault === "1" ? '默认发票' : '设为默认'}}
          </el-col>
          <el-col :span="8" class = 'text-center' @click.native = '$router.push({path: "/user/addinvoice", query: {id: item.id, title: "我的发票", fromtitle: "我的发票"}})'>
            编辑
          </el-col>
          <el-col :span="8" class = 'text-right' @click.native = 'deleteInvoice(item)'>
            删除
          </el-col>
        </el-row>
      </card>
      <!--<el-button size = 'large' type = 'primary' @click = '$router.push({path: "/user/addinvoice", query: {title: "我的发票"}})'>添加发票信息</el-button>-->
      <!--<el-button class="text-center block no_more" type = 'text ' v-if = '!invoiceList.length'>暂无更多发票信息</el-button>-->
      <div class="no_data_lay" v-if = '!invoiceList.length'>
        <layout>
        </layout>
      </div>
    </card>
  </div>
</template>
<script>
  import store from 'store'
  export default {
    name: 'myinvoice',
    computed: {
      invoiceList () {
        return this.user.invoices
      }
    },
    methods: {
      setDefault (opt) {
        this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/invoice/updateInvoice`, {}, {
          params: {
            id: opt.id,
            isdefault: '1'
          }
        }).then(({ data }) => {
          return this.$store.dispatch('findById', this.$store.state.userid.id)
        }).then(() => {
          if (this.$route.query.from === 'order') {
            this.$router.go(-1)
          }
        }).catch(() => {
          this.$message.error('操作失败')
        })
      },
      deleteInvoice (opt) {
        this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/invoice/deleteInvoice`, {}, {
          params: {
            id: opt.id
          }
        }).then(({ data }) => {
          this.$store.dispatch('findById', this.$store.state.userid.id)
        }).catch(error => {
          this.$message.error('操作失败')
        })
      }
    }
  }
</script>
<style scoped>
  .invoice{
    background: #fff;
  }
  .invoice .tip{
    width: 6px;
    height: 32px;
    background: #ff0000;
    vertical-align: middle;
    margin-right: 15px;
  }
  .view {
    width: 576px;
    margin-bottom: 10px;
    border: 1px solid #e0e0e0;
  }
  .no_more{
    margin-top: 15px;
  }
</style>
