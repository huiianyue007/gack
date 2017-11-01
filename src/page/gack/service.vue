<template>
  <div class="service">
    <div class="container">
      <div class="crumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for = '(item, index) in typeArr' :key = 'index' :to = "{path: '/service', query: item}">{{ item.serverName2 ? item.serverName2 : (item.serverName1 ? item.serverName1 : item.serverName0) }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="oh views">
        <div class="fl views_con" v-if = 'query'>
          <div class="sub_con">
            <!--<div class="fl ht_type">-->
              <!--<div class="ht_li ht_title">服务类型</div>-->
              <!--<div class="ht_li" v-for='item in typeArr' :class = '{active_li: params === item.operatorServerClass.id || paramsCon === item.operatorServerClass.id }' @click.self = 'toogleType(item)'>-->
                <!--{{ item.operatorServerClass.serverName }}-->
                <!--<div class="ht_con" v-if = 'item.serverClasTwo'>-->
                  <!--<div class="ht_con_li">-->
                    <!--<div class="ht_type_list" :class = '{"active_li": paramsCon === ""}' @click = 'changeType(item,"")'>全部</div>-->
                    <!--<div class="ht_type_list" v-for = 'it in item.serverClasTwo' :class = '{"active_li": params === it.operatorSerTwo.id}' @click = 'changeType(item, it)'>-->
                      <!--{{ it.operatorSerTwo.serverName}}-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <div class="ht_list">
              <div class="subhead" v-if = 'params !== "jinrong" && params !== "tuijian"'>
                <span :class='{active: active === 3 || active == 4}' @click='change("price")'>
                  价格排序
                  <img src="~assets/gack/up.png" alt="" v-if = 'active === 4'>
                  <img src="~assets/gack/down.png" alt="" v-if = 'active === 3'>
                </span>
                <span :class='{active: active === 5 || active === 6 }' @click='change("volume")'>
                  成交量排序
                  <img src="~assets/gack/up.png" alt="" v-if = 'active === 5'>
                  <img src="~assets/gack/down.png" alt="" v-if = 'active === 6'>
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
  import serviceView from 'components/serviceView'
  export default {
    data: () => ({
      rankingList:[],
      active: 3,
      service: '',
      params: '',
      paramsCon: '',
      listName: 'service-list',
      title: '',
      regionStart: 0,
      countrywideStart: 0,
      currentPage: 0,
      last: false,
      pageSize: 10,
      listData: [],
      flag: true
    }),
    activated () {
      this.currentPage = 0
      this.init()
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
          this.getServiceList({
            page: this.currentPage + 1,
            service_type_id: val,
            code: this.address.inCity.code,
            regionStart: this.regionStart,
            countrywideStart: this.countrywideStart,
            reorderType: 0
          })
        }
      },
      'address.inCity.code' (val) {
        this.$router.push("/")
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
      typeArr () {
        if( !this.query) return false
        let typeArr = Array.from(new Set(Object.entries(this.query).map(item => {
          if (item[0] !== 'page') {
            return item[0].charAt(item[0].length - 1)
          }
        }))).map(item => {
          let index = eval(item)
          let query = {}
          for (let i = 0; i <= index; i++) {
            query['id' + i] = this.query['id' + i]
            query['serverName' + i] = this.query['serverName' + i]
            query['type' + i] = this.query['type' + i]
          }
          return query
        })
        return typeArr
      },
      id () {
        return this.query.id2 ? this.query.id2 : (this.query.id1 ? this.query.id1 : this.query.id0)
      }
    },
    methods: {
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
          this.getServiceList({
            page: this.currentPage,
            service_type_id: this.params,
            code: this.address.inCity.code,
            regionStart: this.regionStart,
            countrywideStart: this.countrywideStart,
            reorderType: this.active
          })
        }
      },
      selectPersonalInvestorDisplay () {
        this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/commodity/selectPersonalInvestorDisplay', {}, {
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
        this.$htAjax.get('https://apitest.gack.citic:8082/guoanmaker/provide/commodityMove/selectByCommoditys', {
          params: data
        }).then(({ data }) => {
          this.rankingList = data.data
        }).catch(error => {
          console.log(error)
        })
      },
      selectPersonalPlatform () {
        this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/commodity/selectPersonalPlatform', {}, {
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
        this.params = this.id
        if (this.query.type0 == '3') {
          this.listName = 'service-view'
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
        this.$htAjax.get('https://apitest.gack.citic:8082/guoanmaker/provide/commodityMove/findCommdityMove', {
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
      rankingList, serviceView, serviceList
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
    width: 108px;
    background: #fff;
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
