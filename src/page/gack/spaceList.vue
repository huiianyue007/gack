<template>
  <div class="space">
    <div class="container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ query.keywords || query.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container bg_white">
      <div class="nav" @click = 'changeOrder'>
        综合排序
        <img src="../../assets/images/gack/up.png" alt="" v-if = 'orderBy'>
        <img src="../../assets/images/gack/down.png" alt="" v-else>
      </div>
      <!--<div class="empty" v-if = 'spaceList.length <= 0 && serviceList.length <= 0'>没有搜索内容</div>-->
      <div class="no_data_lay" v-if = 'spaceList.length <= 0 && serviceList.length <= 0'>
        <layout>
        </layout>
      </div>
      <service-list v-if = 'spaceList.length > 0' :listData = 'spaceList'></service-list>
      <!--<el-row class="view_li" :gutter = '12' v-for = '(item, key) in spaceList' :key = 'key' v-if = 'spaceList.length > 0' @click.native = "routerTo(item)">-->
        <!--<el-col :span = '4'>-->
          <!--<box-img :prop = '130/184' class = 'logo'>-->
            <!--<img :src="item.commodity_smallimage" alt="">-->
          <!--</box-img>-->
        <!--</el-col>-->
        <!--<el-col :span = '16'>-->
          <!--<div class="title view_title">-->
            <!--{{item.commodityName}}-->
          <!--</div>-->
          <!--<div class="subhead">{{  item.synopsis }}</div>-->
          <!--<div  class = 'desc'></div>-->
          <!--<el-row v-if = 'item.desc'>-->
            <!--<el-col :span = '12'>-->
              <!--<el-button>{{item.desc}}</el-button>-->
            <!--</el-col>-->
          <!--</el-row>-->
        <!--</el-col>-->
        <!--<el-col :span = '4' v-if = 'item.url'>-->
          <!--<el-button type = 'primary' @click.native = '$router.push("/space/" + item.url)' class = 'detail'>空间详情</el-button>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <el-row class="view_li" :gutter = '12' v-for = '(item, key) in serviceList' :key = 'key' v-if = 'serviceList.length > 0' @click.native = "routerTo(item, 'space')">
        <el-col :span = '4'>
          <box-img prop = '130:184' class = 'logo' :bgImg = 'item.roomlogo'>
          </box-img>
        </el-col>
        <el-col :span = '16'>
          <div class="title view_title">
            {{item.roomName}}
          </div>
          <div class="subhead">{{ item.describeAsk }}</div>
          <el-row>
            <el-col :span = '12'>
              <el-button>{{item.cityName + ' ' + (item.areaName ? item.areaName : '') }}</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span = '4'>
          <el-button type = 'primary' class = 'detail'>空间详情</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import serviceList from 'components/serviceList'
  export default {
    name: 'spacelist',
    data: () => ({
      orderBy: false,
      spaceList: [],
      serviceList: []
    }),
    created () {
      let data = Object.assign(this.query, {
        page: 1
      })
      this.init(data)
    },
    watch: {
      '$route.query' (val) {
        this.spaceList = []
        let data = Object.assign(val, {
          page: 1
        })
        this.init(data)
      },
      code (val) {
        if (this.query.keywords) return false
        this.serviceList = []
        this.init({
          page: 1,
          code: val
        })
      }
    },
    deactivated () {
      this.spaceList = []
    },
    components: {
      serviceList
    },
    computed: {
      query () {
        return this.$route.query
      },
      code () {
        return this.address.inCity.code
      }
    },
    methods: {
      init (opt) {
        let url = '', data= null
        if (opt.keywords) {
          url = `${this.$config.back}/guoanmaker/provide/commodityMove/selectKeyNameCodeSpaceCommodity`
          data = {
            code: opt.code,
            keyName: opt.keywords
          }
        } else {
          url = `${this.$config.back}/guoanmaker/provide/commodityMove/findProvideRoomMoves`
          data = {
            page: opt.page,
            code: this.code
          }
        }
        this.$htAjax.get(url, {
          params: data
        }).then(({ data }) => {
          if(Array.isArray(data.data)) {
            this.serviceList = data.data
          } else {
            this.spaceList = data.data.listProvideCommodityMove
            this.serviceList = data.data.listProvideRoom
          }
        }).catch(error => {
          console.log(error)
        })
      },
      changeOrder () {
        this.orderBy = !this.orderBy
      },
      routerTo (opt, flag) {
        if (flag) {
          this.$router.push({
            path: '/space',
            query: {
              id: opt.id
            }
          })
        } else {
          this.$router.push(`/serde/${opt.id}/1`)
        }
      }
    }
  }
</script>
<style scoped>
  .space{
    background: #f3f3f3;
    padding-bottom: 20px;
  }
  .bg_white{
    background:#fff;
    padding: 0 20px;
  }
  .container{
    box-sizing:border-box;
  }
  .container .el-breadcrumb{
    line-height: 46px;
  }
  .nav{
    height: 56px;
    line-height: 56px;
  }
  .view_li{
    padding: 20px 0;
    border-bottom: 1px solid #efefef;
  }
  .view_li .logo{
    width: 184px;
  }
  .view_li img{
    max-width: 100%;
  }
  .view_li .view_title{
    margin-top:7px;
  }
  .view_li .subhead{
    margin: 15px 0;
  }
  .view_li  .detail{
    margin: 45px 0;
  }
  .empty{
    height: 400px;
    text-align:center;
  }
</style>
<style>
  .desc img{
    display:block;
  }
</style>
