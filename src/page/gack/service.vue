<template>
  <div class="service">
    <div class="container">
      <div class="crumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item  v-if = "$route.query.serverName0">{{ $route.query.serverName0 }}</el-breadcrumb-item>
          <el-breadcrumb-item v-if = 'serviceParentContent'>{{ $route.query.type == 'hotServerPcs' ? serviceParentContent.serverName : serviceParentContent.operatorServerClass.serverName }}</el-breadcrumb-item>
          <el-breadcrumb-item v-if = 'serviceContent'>{{ serviceContent.operatorSerTwo.serverName }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="oh views">
        <div class="fl views_con" v-if = 'query'>
          <div class="ht_type" v-if = 'serviceContent && serviceContent.serverClasThree'>
            请选择您需要服务的类型：
            <div class="ht_active_content">
              <el-button v-if = 'activeBusinessType' type = 'primary' @click = 'delActive'>{{ activeBusinessType.serverName }} <i class="el-icon-close"></i></el-button>
            </div>
            <div class="ht_content">
              <el-button v-for='(item, index) in serviceContent.serverClasThree' :key = 'index' @click = 'selectType(item)'>
                {{ item.serverName }}
              </el-button>
            </div>
          </div>
          <div class="sub_con">
            <div class="ht_list">
              <div class="subhead" v-if = 'params !== "jinrong" && params !== "tuijian" && $route.query.type !=="company"'>
                <span :class='{active: active === 3 || active == 4}' @click='change("price")'>
                  价格排序
                  <img src="~assets/images/gack/up.png" alt="" v-if = 'active === 4'>
                  <img src="~assets/images/gack/down.png" alt="" v-if = 'active === 3'>
                </span>
                <span :class='{active: active === 5 || active === 6 }' @click='change("volume")'>
                  成交量排序
                  <img src="~assets/images/gack/up.png" alt="" v-if = 'active === 5'>
                  <img src="~assets/images/gack/down.png" alt="" v-if = 'active === 6'>
                </span>
              </div>
              <component :is = 'listName' :title = 'title' :listData = 'listData' :opt = 'params' :flag = 'flag'></component>
              <el-button class="block no_more" @click = 'loaddingMore' v-if = '!last && listData.length'>加载更多数据</el-button>
              <div class="text-center no_data" v-if = 'last && listData.length'>暂无更多数据</div>
              <div class="no_data_lay" v-if = '!listData.length'>
                <layout>
                </layout>
              </div>
            </div>
          </div>
        </div>
        <ranking-list :listData = 'rankingList' @changeType = 'changeRanking' @openTo = 'open'></ranking-list>
      </div>
    </div>
  </div>
</template>
<script>
  import rankingList from  'components/rankingList'
  import serviceList from 'components/serviceList'
  import companyList from 'components/companyList'
  import serviceView from 'components/serviceView'
  export default {
    name: 'service',
    data: () => ({
      rankingList:[],
      active: 3,
      service: '',
      params: '',
      paramsCon: '',
      listName: 'service-list',
      title: '',
      activeType: [],
      activeBusinessType: null,
      regionStart: 0,
      countrywideStart: 0,
      currentPage: 0,
      last: false,
      pageSize: 10,
      listData: [],
      flag: true
    }),
    created () {
      this.currentPage = 0
      if (this.homePage) {
        this.init()
      } else {

      }
      this.changeRanking('turnover')
    },
    watch: {
      query (val) {
        if (val) {
          this.currentPage = 0
          this.init()
        }
      },
      params (val) {
        this.listData = []
        this.regionStart = 0
        this.countrywideStart = 0
        if (val === 'jinrong') {
          this.flag = false
          this.selectPersonalPlatform()
        } else if (val == 'tuijian') {
          this.flag = false
          this.selectPersonalInvestorDisplay()
        } else {
          this.flag = true
          if (this.$route.query.type == 'company' && this.$route.query.index == 1) {
            this.flag = false
          }
          this.getServiceList({
            page: this.currentPage + 1,
            service_type_id: val,
            code: this.address.inCity.code,
            regionStart: this.regionStart,
            countrywideStart: this.countrywideStart,
            reorderType: this.active
          })
        }
      },
      'address.inCity.code' (val) {
        this.$router.push("/")
      },
      activeBusinessType (val) {
        if (val) {
          this.params = val.id
        } else {
          this.params = this.id
        }
      },
      active (val) {
        this.listData = []
        this.regionStart = 0
        this.countrywideStart = 0
        this.currentPage = 0
        this.getServiceList({
          page: this.currentPage + 1,
          service_type_id: this.id,
          code: this.address.inCity.code,
          regionStart: this.regionStart,
          countrywideStart: this.countrywideStart,
          reorderType: val
        })
      }
    },
    computed: {
      query () {
        if (this.$route.name == 'service') {
          return this.$route.query
        }
      },
      homePage () {
        return this.$store.state.homePage
      },
      serviceParentContent () {
        if (this.$route.query.key != undefined && this.$route.query.type && this.homePage) {
          let key = this.$route.query.key
          if (this.$route.query.type == 'appcollaborateService') {
            return this.homePage.appcollaborateService[key]
          } else if (this.$route.query.type == 'appsBusinessService') {
            return this.homePage.appsBusinessService[key]
          } else if (this.$route.query.type == 'hotServerPcs') {
            return this.homePage.hotServerPcs[key]
          } else if (this.$route.query.type == 'appsknowledgeService') {
            return this.homePage.appsknowledgeService[key]
          }
        }
      },
      serviceContent () {
        if (!this.serviceParentContent) return null
        if (this.$route.query.index != undefined && this.$route.query.type) {
          let index = this.$route.query.index
          return this.serviceParentContent.serverClasTwo[index]
        }
      },
      id () {
        if (this.serviceContent) {
          return this.activeBusinessType ? this.activeBusinessType.id : this.serviceContent.operatorSerTwo.id
        } else if (this.serviceParentContent) {
          return this.serviceParentContent.operatorServerClass ? this.serviceParentContent.operatorServerClass.id : (this.serviceParentContent.serviceTwoId || this.serviceParentContent.serviceTwoId.serviceFirstId)
        } else if (this.query) {
          return this.query.id2 ? this.query.id2 : (this.query.id1 ? this.query.id1 : this.query.id0)
        }
      }
    },
    methods: {
      selectType (opt) {
        this.activeBusinessType = opt
      },
      delActive (index) {
          this.activeBusinessType = null
      },
      open (opt) {
        this.$router.push(`/serde/${opt.id}/1`)
      },
      loaddingMore () {
        if (this.last || !this.listData.length) return false
        this.currentPage ++
        if (this.params === 'jinrong') {
          this.flag = false
          this.selectPersonalPlatform()
        } else if (this.params == 'tuijian') {
          this.flag = false
          this.selectPersonalInvestorDisplay()
        } else {
          this.flag = true
          if (this.$route.query.type == 'company' && this.$route.query.index == 1) {
            this.flag = false
          }
          this.getServiceList({
            page: this.currentPage + 1,
            service_type_id: this.params,
            code: this.address.inCity.code,
            regionStart: this.regionStart,
            countrywideStart: this.countrywideStart,
            reorderType: this.active
          })
        }
      },
      selectPersonalInvestorDisplay () {
        this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/commodity/selectPersonalInvestorDisplay`, {}, {
          params: {
            page: this.currentPage,
            size: this.pageSize
          }
        }).then(({ data }) => {
          this.last = data.data.last
          this.listData = this.listData.concat(data.data.content)
        }).catch(error => {
          console.log(error)
        })
      },
      changeRanking (opt) {
        let type = ''
        if (opt === 'turnover') {
          type = 1
        } else {
          type = 2
        }
        let data = {
          cityCode: this.address.inCity.code,
          size: 10,
          page: 1,
          type
        }
        this.$htAjax.get(`${this.$config.back}/guoanmaker/provide/commodityMove/selectByCommoditys`, {
          params: data
        }).then(({ data }) => {
          this.rankingList = data.data
        }).catch(error => {
          console.log(error)
        })
      },
      selectPersonalPlatform () {
        this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/commodity/selectPersonalPlatform`, {}, {
          params: {
            page: this.currentPage,
            size: this.pageSize
          }
        }).then(({ data }) => {
          this.last = data.data.last
          this.listData = this.listData.concat(data.data.content)
        }).catch(error => {
          console.log()
        })
      },
      init () {
        if (this.$route.query.type == 'company' && this.$route.query.index == 1) {
          this.flag = false
        }
        this.params = this.id
        if (this.query.type0 == '3') {
          this.listName = 'service-view'
        } else if (this.query.type == 'company') {
          this.listName = 'company-list'
        } else {
          this.listName = 'service-list'
        }
      },
      change(opt) {
        if(this.active === opt) {
          this.orderBy = !this.orderBy
        } else {
          this.active = opt
        }
      },
      getServiceList (opt) {
        this.$htAjax.get(`${this.$config.back}/guoanmaker/provide/commodityMove/findCommdityMove`, {
          params: opt
        }).then(({ data }) => {
          this.regionStart = data.data.regionStart
          this.countrywideStart = data.data.countrywideStart
          this.listData = this.listData.concat(data.data.commoditys)
          if (data.data.commoditys.length < 10) {
            this.last = true
          } else {
            this.last = false
          }
        }).catch(error => {
          console.log(error)
        })
      },
      change (opt) {
        if (opt === 'price') {
          if (this.active === 3) {
            this.active = 4
          } else {
            this.active = 3
          }
        } else {
          if (this.active === 5) {
            this.active = 6
          } else {
            this.active = 5
          }
        }
      }
    },
    components: {
      rankingList, serviceView, serviceList, companyList
    }
  }
</script>
<style scoped>
  .service {
    background: #f3f3f3;
    padding-bottom: 15px;
  }
  .subhead {
    background: #fff;
    font-size: 14px;
    box-sizing: border-box;
    border-bottom: 1px solid #e6f1fe;
  }
  .sub_li .subhead{
    margin: 30px 0 20px;
  }
  .subhead span {
    margin-right: 15px;
    display: inline-block;
    cursor: pointer;
    height: 56px;
    line-height: 56px;
  }
  .container {
    width: 1004px;
  }

  .crumb .el-breadcrumb {
    line-height: 46px;
  }

  .views_con {
    width: 748px;
  }
  .sub_search {
    width: 748px;
    background: #fff;
    overflow: hidden;
    padding: 30px 20px 20px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }

  .input input {
    height: 40px;
    padding: 10px 10px 12px;
    border: 1px solid #D7000F;
    width: 640px;
    float: left;
    outline: none;
    vertical-align: middle;
    font-size: 14px;
    box-sizing: border-box;
  }

  .sub_con {
    border:1px solid transparent;
  }

  .ht_type {
    background: #fff;
    margin-bottom: 15px;
    padding: 15px;
    box-sizing: border-box;
  }
  .ht_type:after{
    content:'';
    display: block;
    clear:both;
  }
  .ht_type .ht_active_content{
    margin: 15px 0;
  }
  .ht_type .ht_content{
    padding: 15px;
  }
  .ht_type .ht_li {
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    font-size: 14px;
    cursor: pointer;
    position:relative;
  }
  .ht_type .ht_li:hover{
    color: #D7000F;
  }
  .ht_type .ht_li:hover .ht_con{
    display:block;
  }
  .ht_type .ht_li .ht_con{
    position:absolute;
    top:0;
    display:none;
    z-index: 11;
    left: 100%;
  }
  .ht_type .ht_li .ht_con .ht_con_li{
    background: #fff;
    width:110px;
    margin-left: 15px;
    color: #333;
    padding: 5px;
    border: 1px solid #f1f1f1;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, .1);
  }
  .ht_type .ht_li .ht_con .ht_type_list:hover{
    color: #D7000F;
  }
  .ht_title {
    background: #D7000F;
    color: #fff !important;
  }
  .ht_list {
    width: 748px;
    padding: 0 50px 15px;
    box-sizing: border-box;
    background: #fff;
    min-height: 100vh;
  }

  .active {
    color: #D7000F;
    border-bottom: 2px solid #D7000F;
  }
  .active_li{
    color: #D7000F;
  }
  .no_more{
    margin-top: 15px;
  }
</style>
