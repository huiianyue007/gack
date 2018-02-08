<template>
  <page class = 'trade'>
    <div class="container" v-loading = 'loading'>
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item to='/trademark/1'>商标查询</el-breadcrumb-item>
        <el-breadcrumb-item v-if = 'tradeInfo'>{{ tradeInfo.tmName }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="trade_info" v-if = 'tradeInfo'>
        <el-row class = 'content_info'>
          <el-col :span='8' class = 'banner'>
            <box-img :bgImg = 'tradeInfo.tmImg' class = 'logo' :cover = 'false'></box-img>
          </el-col>
          <el-col :span='16' class = 'trade_detail'>
            <el-row>
              <el-col :span="8">商标名称：{{tradeInfo.tmName}}</el-col>
              <el-col :span="8">注册时间： {{tradeInfo.appDate | time}}</el-col>
            </el-row>
            <div class = 'el-row el-col'>
              申请人： {{tradeInfo.applicantCn || tradeInfo.applicantEn}}
            </div>
            <div class = 'el-row el-col'>
              商标号: {{ tradeInfo.regNo}}
            </div>
            <div class = 'el-row el-col'>
              代理公司名称: {{ tradeInfo.agent}}
            </div>
            <el-row>
              <el-col :span="12">
                期限: {{ tradeInfo.privateDate || '无' }}
              </el-col>
              <el-col :span="12">
                商标分类: {{ tradeInfo.clsType }}
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="trade_info trade_decon" v-if = 'tradeInfo'>
          <div class="detail_title"><span class = 'inline-block tip'></span><span class="title">申请过程</span></div>
          <div class = 'list' v-for = 'item in tradeInfo.flows' v-if ='item.flowDate'>
            {{ item.flowName }}： {{ item.flowDate | time }}
          </div>
        <div class="detail_title"><span class = 'inline-block tip'></span><span class="title">使用商品</span></div>
          <div class="de_con">
            <el-table :data="tradeInfo.goods" border class>
              <el-table-column prop="goodsCode" label="商品编号">
              </el-table-column>
              <el-table-column prop="goodsName" label="商品名称">
              </el-table-column>
            </el-table>
          </div>
      </div>
    </div>
  </page>
</template>
<script>
  export default {
    name: 'trade_info',
    data() {
      return {
        tradeInfo: null,
        loading: true
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        this.loading = true
        this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/message/selectTrademarkInfo`, {} ,{
          params: {
            keyword: this.$route.query.keyword,
            id: this.$route.params.id,
            regNo: this.$route.query.regNo,
            intCls: this.$route.query.intCls
          }
        }).then(({ data }) => {
          this.loading =  false
          this.tradeInfo = data.data.value
        }).catch(error => {
          this.loading =  false
          console.log(error)
        })
      }
    }
  }
</script>
<style scoped>
  .trade {
    background: #eee;
    padding-bottom: 15px;
  }
  .container{
    overflow:hidden;
  }
  .logo{
    width: 340px;
  }
  .trade_info{
    background: #fff;
    padding: 15px;
    overflow: hidden;
    box-sizing:border-box;
    margin-bottom: 20px;
  }
  .content_info {
    border: 1px solid #eee;
  }
  .content_info .banner {
    padding: 15px;
    border-right: 1px solid #eee;
  }
  .trade_detail .el-row{
    line-height: 73px;
    border-top: 1px solid #eee;
  }
  .trade_detail .el-row:first-child{
    border-top: none;
  }
  .trade_detail .el-row.el-col{
    padding-left: 15px;
  }
  .trade_detail .el-row .el-col{
    padding-left: 15px;
    border-right: 1px solid #eee;
  }
  .trade_detail .el-row .el-col:last-child{
    border-right: none;
  }
  .detail_title{
    margin: 15px 0;
  }
  .detail_title .tip{
    width: 6px;
    height: 30px;
    border-radius: 2px;
    vertical-align: middle;
    margin: 0 19px 4px 0;
    background: #C7000A;
  }
  .trade_info .list{
    margin: 0 15px;
  }
  .trade_info .de_con{
    padding: 0 15px;
    margin-bottom: 25px;
  }
</style>
<style>
  .trade .el-breadcrumb {
    line-height: 40px !important;
  }
</style>
