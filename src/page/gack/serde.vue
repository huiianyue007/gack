<template>
  <div class="page">
    <div class="container" v-if = 'service'>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ query.type == 2 ? '推荐标的' : (query.type == 3 ? '金融大咖' : service.serverName) }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ service.commodityName || service.companyProject || service.corporateName }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="oh view" v-if = 'service'>
        <div class = 'fl'>
          <div class = 'view_con'>
            <div v-if = 'query.type == 1' class = 'fl view_comimg'>
              <div class="img" :style = "imgStyle"></div>
            </div>
            <div  v-if = 'query.type == 2' class = 'fl view_comimg'>
              <div class="img" :style = " imgStyle1"></div>
            </div>
            <div class = 'pr fl oh service_info' ref = 'img'>
              <div class="text-hidden title service_title">{{ service.commodityName || service.companyProject || service.corporateName }}</div>
              <div class="text-hidden subhead"> {{ service.synopsis || service.introduction }}</div>
              <el-row class = 'list_con' v-if = 'query.type == 1'>
                <el-col :span = '18' v-if = 'service.isTerritoryRestriction == 2 && service.isBargaining === "2" && service.type == "1"'>
                    <span>现价</span>
                    <span class="current_price">
                    {{ service.finalPrice }}
                    <span class="unit">元</span>
                  </span>
                </el-col>
                <el-col :span = '18' v-if = '(service.isTerritoryRestriction == 1 && service.serviceRange.length ? service.serviceRange[activeAddress].isPromotion == 2 : service.isPromotion == 2) || service.isBargaining === "1"'>
                    <span>现价</span>
                    <span class="current_price">
                    {{ service.serviceRange[activeAddress]  ? service.serviceRange[activeAddress].finalPrice : service.finalPrice }}
                    <span class="unit">元</span>
                  </span>
                </el-col>
                <el-col :span = "18" v-if = '(service.isTerritoryRestriction == 1 && service.serviceRange.length ? service.serviceRange[activeAddress].isPromotion == 1 : service.isPromotion == 1) && service.isBargaining === "2"'>
                  <div class="old_price">
                    <span>原价</span>
                    <span class = 'del-line'>
                      {{ service.serviceRange[activeAddress]  ? service.serviceRange[activeAddress].commodityPrice : service.commodityPrice }}
                      元
                    </span>
                  </div>
                  <div class="new_price">
                    <span>现价</span>
                    <span class="current_price">
                      {{ service.serviceRange[activeAddress]  ? service.serviceRange[activeAddress].commodityPricePromotion : service.commodityPricePromotion }}
                      <span class="unit">元</span>
                    </span>
                  </div>
                </el-col>
                <el-col :span = '6' class = 'text-center'>
                  {{ service.salesVolume }}
                  <p>累计销售</p>
                </el-col>
              </el-row>
              <div class="subhead" v-if = 'query.type == "3"'>
                {{ service.business }} {{service.name}}
              </div>
              <!--<el-switch v-if = 'query.type !== "2" && query.type !== "3"'-->
                <!--v-model="collectionFlag"-->
                <!--on-text="收藏"-->
                <!--off-text="取消收藏"-->
                <!--:width = '100'>-->
              <!--</el-switch>-->
              <img src="~assets/reg/shoucang.png" v-if = 'collectionFlag && query.type !== "2"' alt="" class="coll" @click = 'shoucang(false)'>
              <img src="~assets/reg/weishoucang.png" v-if = '!collectionFlag && query.type !== "2"' alt="" class="coll" @click = 'shoucang(true)'>
              <el-form class = 'address' label-position = 'left' v-if = 'service.type === "2" && service.isTerritoryRestriction === "1" && service.isBargaining !== "1"'>
                <el-form-item label = '地区' required label-width = '60px' >
                  <el-select v-model = 'activeAddress' placeholder="请选择地区" size = 'small'>
                    <el-option v-for = '(item, key) in service.serviceRange' :key = 'key' :value = 'key' :label = 'item.cityName + (item.areaName ? "-" + item.areaName : "")'></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <el-row class = 'service' v-if = 'query.type == 2'>
                <!--<el-col :span = '8'>-->
                  <!--<img src="~assets/gack/u2722.png" alt="" width = '20' height = '20'>-->
                  <!--{{ service.address }}-->
                <!--</el-col>-->
                <el-col :span = '12'>
                  <img src="~assets/reg/lc.png" alt="" width = '20' height = '20'>
                  轮次 {{service.round}}
                </el-col>
                <el-col :span = '12'>
                  <img src="~assets/reg/rz.png" alt="" width = '20' height = '20'>
                  {{ service.financingDemand}}
                </el-col>
              </el-row>
              <div class="service_price" v-if = 'service.type === "3"'>
                ￥{{ service.finalPrice }}
                <span class="fr tip">（还剩{{service.stock}}个名额，截至日期为{{service.registrationEndTime | time("年-月-日")}}。）</span>
              </div>
              <el-row v-if = 'service.type === "3" || query.type === "2"'>
                <el-button type = 'primary' @click.native = 'submit'>联系该项目</el-button>
              </el-row>
              <el-row class = 'text-center' v-if = 'service.type === "3" || query.type === "3"'>
                <el-button type = 'primary' @click.native = 'submit'>联系投资人</el-button>
              </el-row>
              <el-row class = 'buy' v-else>
                <el-button type = 'primary' v-if = 'query.type == "1" && service.type !== "3" && service.isBargaining !== "1"' @click.native = 'submit(true)'>立即购买</el-button>
                <el-button type = 'primary'  @click.native = 'submit()' v-if = 'service.type !== "3" && service.isBargaining === "1"'>询问低价</el-button>
              </el-row>
            </div>
          </div>
          <ul class = "list_nav">
            <li class = 'fl nav_li' :class = '{active: anchor === item.params}' v-for = '(item, index) in navList' :key = 'index' @click = 'changeTab(item.params)'>
              {{ item.title }}
            </li>
          </ul>
          <div class="view_con" >
            <div class="cli" v-for = '(item, index) in navList' :ref = 'item.params'>
              <div class="cli_title">{{ item.title }}</div>
              <div class="desc" v-html = 'service[item.params]' v-if = 'item.params !== "entrepreneurialTeam"'></div>
              <div class="desc" v-if = 'item.params === "entrepreneurialTeam"' v-html = 'service.introduce'></div>
              <div class="desc" v-if = 'item.params === "entrepreneurialTeam"' v-html = 'service.entrepreneurialTeam'></div>
              <div class="desc" v-if = 'item.params === "entrepreneurialTeam"' v-html = 'service.teamPresentation'></div>
            </div>
          </div>
        </div>
        <ranking-list :listData = 'rankingList' @changeType = 'changeRanking' @openTo = 'open'></ranking-list>
      </div>
    </div>
  </div>
</template>
<script>
  import rankingList from 'components/rankingList'
  export default {
    data: () => ({
      collectionFlag: false,
      rankingList:[],
      service: null,
      anchor: 'introduce',
      activeAddress: 0,
      imgStyle: null,
      imgStyle1: null,
      train: [
        '培训受众',
        '课程收益',
        '课程概述',
        '培训师/机构介绍',
        '课程目录'
      ],
      space: [
        '工位介绍',
        '工位类型',
        '支付方式（解释：“押一付三这种方式”）',
      ],
      other: [
        '商品描述',
        '服务承诺'
      ],
      coffee: [{
        title: '介绍',
        params: 'introduction'
      }, {
        title: '团队',
        params: 'entrepreneurialTeam'
      }],
      touzi: [{
        title: '介绍',
        params: 'introduce'
      }, {
        title: '职务',
        params: 'business'
      }, {
        title: '联系人',
        params: 'name'
      }],
      navList: [
        'introduce',
        'description',
        'commodityCase',
        'process',
        'promise'
      ]
    }),
    mounted () {
      this.changeRanking('turnover')
    },
    activated () {
      this.init()
    },
    watch: {
      'address.inCity.code' () {
        this.$router.push('/')
      },
      service (val) {
        if (val) {
          this.$nextTick(() => {
            this.imgStyle = {
              height: this.$refs.img.offsetHeight + 'px',
              width: this.$refs.img.offsetHeight * 1.8 + 'px',
              background: `url(${this.service.commodity_bigimage}) #f3f3f3 center center / contain no-repeat`
            }
            this.imgStyle1 = {
              height: this.$refs.img.offsetHeight + 'px',
              width: this.$refs.img.offsetHeight * 1.8 + 'px',
              background: `url(${this.service.picture}) #fff center center / contain no-repeat`
            }
            this.$refs.img.style.width = 698 - this.$refs.img.offsetHeight * 1.8 + 'px'
          })
        }
      },
      collectionFlag (val, oldVal) {
        if (!this.$store.state.userid.id) {
          this.collectionFlag = oldVal
          this.$router.push('/login/0')
          return false
        }
        if (val) {
          this.insertPersonalCollection()
        } else {
          this.deletePersonalCollection()
        }
      }
    },
    computed: {
      query () {
        return this.$route.params
      }
    },
    components: {
      rankingList
    },
    methods: {
      init () {
        this.navList = [
          'introduce',
          'description',
          'commodityCase',
          'process',
          'promise'
        ]
        this.service = null
        let url = '', data = {}
        if (this.query.type == 2) {
          url = 'https://apitest.gack.citic:8082/guoanmaker/provide/commodity/selectOnePersonalPlatform',
            data = {
              id: this.query.id
            }
        } else if (this.query.type == 1){
          url = 'https://apitest.gack.citic:8082/guoanmaker/provide/commodityMove/getProvideCommodity'
          data = {
            id: this.query.id,
            cityCode: this.address.inCity.code
          }
        } else if (this.query.type == 3) {
          url = 'https://apitest.gack.citic:8082/guoanmaker/provide/commodity/selectOnePersonalInvestorDisplay'
          data = {
            id: this.query.id,
            cityCode: this.address.inCity.code
          }
        }
        if (this.$store.state.userid) {
          data.userId = this.$store.state.userid.id
        }
        this.$htAjax.request({
          url,
          method: this.query.type == 2 || this.query.type == 3 ? 'post' : 'get',
          params: data
        }).then(({ data }) => {
          this.service = data.data
          if (data.data.isCollection === 2) {
            this.collectionFlag = false
          } else  if (data.data.isCollection === 1) {
            this.collectionFlag = true
          }
          if (this.query.type === '2') {
            this.anchor = 'introduction'
            this.navList = this.coffee
          } else if (this.query.type == '3') {
            this.navList = this.touzi
          } else if(this.service.type === '3') {
            this.anchor = 'description'
            this.navList = this.train.map((item, index) => {
              let ar = {
                title: item,
                params: this.navList.filter((item, key) => {
                  return key == 1 || key == 4
                })[index]
              }
              return ar
            })
          } else if (this.service.type === '2') {
            this.anchor = 'description'
            this.navList = this.other.map((item, index) => {
              let ar = {
                title: item,
                params: this.navList.filter((item, key) => {
                  return key == 1 || key == 4
                })[index]
              }
              return ar
            })
          } else {
            this.anchor = 'introduce'
            this.navList = this.space.map((item, index) => {
              let ar = {
                title: item,
                params: this.navList[index]
              }
              return ar
            })
          }
        }).catch(error => {
//          console.log(error)
        })
      },
      shoucang (opt) {
        if (!this.$store.state.userid) {
          this.$confirm('请先登录？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push('/login/0')
          }).catch(() => {})
          return false
        }
        this.collectionFlag = opt
        if (opt) {
          this.$message({
            type: 'success',
            message: '添加收藏成功'
          })
        } else {
          this.$message({
            type: 'success',
            message: '取消收藏成功'
          })
        }
      },
      open (opt) {
        this.$router.push(`/serde/${opt.id}/1`)
      },
      insertPersonalCollection () {
        this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/commodity/insertPersonalCollection', {}, {
          params: {
            personalUserId: this.$store.state.userid.id,
            provideCommodityId: this.$route.params.id
          }
        }).then(res => {
        }).catch(error => {
          console.log(error)
        })
      },
      deletePersonalCollection() {
        this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/commodity/deletePersonalCollection', {}, {
          params: {
            personalUserId: this.$store.state.userid.id,
            provideCommodityId: this.$route.params.id
          }
        }).then(res => {
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
        })
      },
      changeTab (opt) {
        this.anchor = opt
        this.$nextTick(() => {
          let top = $(this.$refs[opt]).offset().top
          $("html,body").animate({ scrollTop: top}, 500);
        })
      },
      submit(opt) {
        if (!this.user) {
          this.$router.push('/login/0')
          return false
        }
        if (this.query.type === '2') {
          this.$alert('400-8518585', '请拨打电话', {
            confirmButtonText: '确定',
            type: 'info'
          }).then().catch()
          return false
        }
        let address = '全国'
        let code = null
        if (this.service.serviceRange) {
          let addr = this.service.serviceRange[this.activeAddress]
          if (addr) {
            address = addr.cityName + "-" + addr.areaName
            code = addr.id
          }
        }
        this.$router.push({
          path: '/negotiated',
          query: {
            id: this.$route.params.id,
            type: 'commodity',
            activeAddress: address,
            code: code
          }
        })
      }
    }
  }
</script>
<style scoped>
  .pr{
    position:relative;
  }
  .page{
    background:#f3f3f3;
    padding-bottom: 40px;
  }
  .el-breadcrumb {
    line-height:46px !important;
  }
  .container {
    width: 1004px;
  }
  .view_con{
    width: 748px;
    background:#fff;
    padding: 10px;
    overflow: hidden;
    box-sizing: border-box;
  }
  .view_comimg {
    padding: 0 15px;
    box-sizing: border-box;
  }
  .view_con .img{
    width: 100%;
    margin: 0 auto;
  }
  .title{
    margin: 10px 0 12px;
    font-weight: normal;
  }
  .list_con{
    background:#FDF1F3;
    margin: 10px 0 20px;
    padding: 12px 20px 12px 10px;
  }
  .list_con p {
    font-size: 12px;
    color: #999;
  }
  .current_price{
    color: #f00;
    font-size: 30px;
  }
  .unit{
    font-size: 16px;
  }
  .list_nav{
    height: 39px;
    line-height: 38px;
    background: #F5F5F5;
    width: 748px;
    margin-top:10px;
    border-bottom: 1px solid #FF0000;
  }
  .nav_li{
    padding: 0 28px;
    cursor: pointer;
    line-height:39px;
    color: #666;
  }
  .active {
    color: #fff;
    background: #FF0000;
  }
  .cli_title{
    font-weight: normal;
    padding: 20px 0 10px 10px;
    font-size: 14px;
    color: #FF8D00;
  }
  .desc, .desc p{
    font-size: 12px;
    color: #666;
    line-height: 26px;
  }
  .desc{
    padding-left:10px;
  }
  .service{
    margin: 15px 0;
  }
  .service_price{
    color: #f00;
    overflow:hidden;
    font-size: 14px;
  }
  .service_price .tip{
    font-size: 12px;
    display:inline-block;
    width: 80%;
  }
  .address {
    margin: 10px 0;
  }
  .coll {
    position:absolute;
    right: 10px;
    top:10px;
    width: 24px;
  }
  /*.buy{*/
    /*margin-top:40px;*/
  /*}*/
  .old_price{
    color: #999;
  }
  .el-form-item{
    margin-bottom: 10px;
  }
  .service_info .service_title{
    width: calc(100% - 48px);
  }
</style>
<style>
  .desc p img{
    display:block;
    width: 100%;
  }
</style>
