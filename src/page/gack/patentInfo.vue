<template>
  <page class = 'patent'>
    <div class="oh container" v-loading = 'loading' v-if = 'tradeInfo'>
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item to='/trademark/2'>专利查询</el-breadcrumb-item>
        <el-breadcrumb-item v-html = 'tradeInfo.title.replace(/base:sub>/ig, "sub>").replace(/base:sup>/ig, "sup>")'></el-breadcrumb-item>
      </el-breadcrumb>
      <div class="patent_detail">
        <el-row class = 'content_info'>
          <el-col :span='8' class = 'banner'>
            <box-img :bgImg = 'tradeInfo.imagePath' class = 'logo' :cover = 'false'></box-img>
          </el-col>
          <el-col :span='16' class = 'trade_detail'>
            <el-row>
              <el-col :span="8">专利名称：<span v-html = 'tradeInfo.title.replace(/base:sub>/ig, "sub>").replace(/base:sup>/ig, "sup>")'></span></el-col>
              <el-col :span="8">专利号： {{tradeInfo.id}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="tradeInfo.firstApplicant ? 8 : 16">申请人: {{ tradeInfo.applicant}}</el-col>
              <el-col :span="8" v-if = 'tradeInfo.firstApplicant'>第一申请人: {{ tradeInfo.firstApplicant}}</el-col>
            </el-row>
            <div class = 'el-row el-col'>
              发明人: {{ tradeInfo.inventor}}
            </div>
            <div class = 'el-row el-col'>
              申请日期: {{ tradeInfo.applicationDate}}
            </div>
            <el-row>
              <el-col :span="12">
                法律状态: {{ tradeInfo.legalStatus }}
              </el-col>
              <el-col :span="12">
                专利类型: {{ tradeInfo.type }}
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="patent_detail mb">
        <div class="detail_title"><span class = 'inline-block tip'></span><span class="title">专利详情</span></div>
        <div class = 'patent_detail' v-html = 'details'>
        </div>
      </div>

    </div>
  </page>
</template>
<script>
  export default {
    name: 'patent_info',
    data() {
      return {
        tradeInfo: null,
        loading: true,
        details: ''
      }
    },
    beforeDestroy () {
      this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/message/cleanCache/${this.$store.state.userid.id}`).then(({ data }) => {
      }).catch(error => {
        console.log(error)
      })
    },
    created () {
      this.init()
    },
    methods: {
      init() {
        this.loading = true
        this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/message/getPatentById/${this.$store.state.userid.id}`, {} ,{
          params: {
            keyWord: this.$route.query.keyword,
            id: this.$route.params.id
          }
        }).then(({ data }) => {
          this.loading =  false
          this.tradeInfo = data.data
          this.details = data.data.summary.replace(/\\n/ig, '<br/>')
        }).catch(error => {
          this.loading =  false
          console.log(error)
        })
      }
    }
  }
</script>
<style scoped>
  .patent{
    background: #eee;
  }
  .patent_detail{
    background: #fff;
    padding: 15px;
    margin: 15px;
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
  .mb{
    margin-bottom: 25px;
  }
</style>
<style>
  .patent .el-breadcrumb {
    line-height: 40px !important;
  }
</style>
