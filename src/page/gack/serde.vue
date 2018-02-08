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
              <div class="img" :style = "imgStyle1"></div>
            </div>
            <div class = 'pr fl oh service_info' ref = 'img'>
              <div class="text-hidden title service_title">
                <!--{{ service.commodityName || service.companyProject || service.corporateName }}-->
                <el-tooltip :disabled = '(service.commodityName && service.commodityName.length < 10) || (service.companyProject && service.companyProject.length < 10) || (service.corporateName && service.corporateName.length < 10)' :content="service.commodityName || service.companyProject || service.corporateName" placement="top">
                  <span :class = '{"cursor": (service.commodityName && service.commodityName.length >= 10) || (service.companyProject && service.companyProject.length >= 10) || (service.corporateName && service.corporateName.length >= 10)}'>{{ service.commodityName || service.companyProject || service.corporateName }}</span>
                </el-tooltip>
              </div>

              <el-row>
                <el-col :span = '16' :class = '{"xvqiu": service.type == "4"}'>
                  <div class="text-hidden subhead"> {{ service.synopsis || service.introduction }}</div>
                  <div class="text-hidden subhead" v-if = 'service.type =="4"'>{{service.businessName}}</div>
                </el-col>
                <el-col :span = '8' class = 'text-right' v-if = 'service.type !== "4" && service.type !== "5"'>
                  <el-button type="primary"  size = 'mini' @click = '$router.push({path: "/shopDetails", query: {commId: $route.params.id }})' v-if = 'query.type == 1'>进入店铺</el-button>
                </el-col>
              </el-row>
              <el-row class = 'list_con' v-if = 'query.type == 1 && service.type !== "4"'>
                <el-col :span = '18' v-if = 'service.isSeckill == 2 || (service.isTerritoryRestriction == 2 && service.isBargaining === "2" && service.type == "1")'>
                    <span>现价</span>
                    <span class="current_price">
                    {{ service.finalPrice }}
                    <span class="unit">元 / {{service.measurementUnit}}</span>
                  </span>
                </el-col>
                <el-col :span = '18' v-if = 'service.isSeckill !== 2 && ((service.isTerritoryRestriction == 1 && service.serviceRange.length ? service.serviceRange[activeAddress].isPromotion == 2 : service.isPromotion == 2) || ((service.isTerritoryRestriction == 1 && service.serviceRange.length ? service.serviceRange[activeAddress].isPromotion == 1 : service.isPromotion == 1) && (service.nowTime < service.startTime || service.nowTime > service.endTime) || service.isBargaining === "1"))'>
                    <span>现价</span>
                    <span class="current_price" v-if = "service.serviceRange[activeAddress]  ? service.serviceRange[activeAddress].finalPrice : service.finalPrice">
                    {{ service.serviceRange[activeAddress]  ? service.serviceRange[activeAddress].finalPrice : service.finalPrice }}
                    <span class="unit">元 / {{service.measurementUnit}}</span>
                  </span>
                  <span v-else class="current_price" style="font-size:18px">面议</span>
                </el-col>
                <el-col :span = "18" v-if = 'service.isSeckill != 2 && (service.isTerritoryRestriction == 1 && service.serviceRange.length ? service.serviceRange[activeAddress].isPromotion == 1 : service.isPromotion == 1) && service.nowTime > service.startTime && service.nowTime < service.endTime && service.isBargaining === "2"'>
                  <div class="old_price">
                    <span>原价</span>
                    <span class = 'del-line'>
                      {{ service.serviceRange[activeAddress]  ? service.serviceRange[activeAddress].commodityPrice : service.commodityPrice }}
                      元 / {{ service.measurementUnit }}
                    </span>
                  </div>
                  <div class="new_price">
                    <span>现价</span>
                    <span class="current_price">
                      {{ service.serviceRange[activeAddress]  ? service.serviceRange[activeAddress].finalPrice : service.finalPrice }}
                      <span class="unit">元 / {{ service.measurementUnit }}</span>
                    </span>
                  </div>
                </el-col>
                <el-col :span = '6' class = 'text-center' v-if = 'service.type!== "5" && service.type!== "4"'>
                  {{ service.salesVolume ? service.salesVolume  : 0 }}
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
              <img src="~assets/images/reg/shoucang.png" v-if = 'collectionFlag && query.type !== "2" && service.type!== "4" || (service.type == "4" && $route.query.companryTYpe == "2")' alt="" class="coll" @click = 'shoucang(false)'>
              <img src="~assets/images/reg/weishoucang.png" v-if = '!collectionFlag && query.type !== "2" && service.type!=="4" || (service.type == "4" && $route.query.companryTYpe == "2")' alt="" class="coll" @click = 'shoucang(true)'>
              <el-form class = 'address' label-position = 'left' v-if = 'service.isSeckill != 2 && (service.type === "2" && service.isTerritoryRestriction === "1" && service.isBargaining !== "1")'>
                <el-form-item label = '地区' required label-width = '60px' >
                  <el-select v-model = 'activeAddress' placeholder="请选择地区" size = 'small'>
                    <el-option v-for = '(item, key) in service.serviceRange' :key = 'key' :value = 'key' :label = 'item.cityName + (item.areaName ? "-" + item.areaName : "")'></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <el-row class = 'service' v-if = 'query.type == 2'>
                <!--<el-col :span = '8'>-->
                  <!--<img src="~assets/images/gack/u2722.png" alt="" width = '20' height = '20'>-->
                  <!--{{ service.address }}-->
                <!--</el-col>-->
                <el-col :span = '12'>
                  <img src="~assets/images/reg/lc.png" alt="" width = '20' height = '20'>
                  轮次 {{service.round}}
                </el-col>
                <el-col :span = '12'>
                  <img src="~assets/images/reg/rz.png" alt="" width = '20' height = '20'>
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
              <el-row class = 'buy' v-else-if = 'service.type == "4" || service.type == "5"'>
                <el-button type = 'primary' :disabled = 'service.commodityState !== 2' :plain = 'service.commodityState !== 2'  @click.native = 'submit(3)'>{{ service.type == '4' ? '我要对接' : '提交需求' }}</el-button>
              </el-row>
              <el-row class = 'buy' v-else>
                <el-button type = 'primary' :disabled = 'service.commodityState !== 2' :plain = 'service.commodityState !== 2' v-if = 'query.type == "1" && service.type !== "3" && service.isBargaining !== "1"' @click.native = 'submit(1)'>{{service.commodityState | commodityState(true) }}</el-button>
                <el-button type = 'primary'  :disabled = 'service.commodityState !== 2' :plain = 'service.commodityState !== 2' @click.native = 'submit(2)' v-if = 'service.type !== "3" && service.isBargaining === "1"'>{{service.commodityState | commodityState }}</el-button>
              </el-row>
            </div>
          </div>
          <ul class = "list_nav">
            <li class = 'fl nav_li' :class = '{active: activeType == "detail"}' @click = 'activeType = "detail"'>
              {{ service.type == 4 ? '需求描述' : '服务详情' }}
            </li>
            <li class = 'fl nav_li' :class = '{active: activeType == "evaluate"}' v-if = 'service.personalAppraises && service.personalAppraises.length' @click = 'activeType = "evaluate"'>
              查看评价
            </li>
          </ul>
          <div class="view_con detail" v-if = 'activeType == "detail" && service.type !== "4" && service.type !== "5"'>
            <div class="cli" v-for = '(item, index) in activeServer'>
                <div class="cli_title">{{ item.title }}</div>
              <div class="desc" v-html = 'service[item.params]' v-if = 'item.params !== "entrepreneurialTeam"'></div>
              <div class="desc" v-if = 'item.params === "entrepreneurialTeam"' v-html = 'service.introduce'></div>
              <div class="desc" v-if = 'item.params === "entrepreneurialTeam"' v-html = 'service.entrepreneurialTeam'></div>
              <div class="desc" v-if = 'item.params === "entrepreneurialTeam"' v-html = 'service.teamPresentation'></div>
              </div>
          </div>
          <evaluate-content class="view_con" v-if = 'activeType == "evaluate"' :haopingshu = 'bestList.length' :zhongpingshu = 'goodList.length' :chapingshu = 'badList.length' :evaluateList = 'list' :totalCountevaluate = 'activeServer.length' @selectEvaluate = 'selectEvaluate'>
            <el-pagination @size-change="handleSizeChange"  class = 'inline-block pagination' @current-change="handleCurrentChange" :page-size='pageSize' :current-page="page" layout="prev, pager, next" :total="activeServer.length" v-if = 'activeServer.length'>
            </el-pagination>
          </evaluate-content>
        </div>
        <ranking-list :listData = 'rankingList' @changeType = 'changeRanking' @openTo = 'open'></ranking-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import rankingList from 'components/rankingList'
  import evaluateContent from 'components/evaluateContent'
  export default {
    name: 'serde',
    data: () => ({
      collectionFlag: false,
      rankingList:[],
      service: null,
      anchor: 'introduce',
      activeAddress: 0,
      activeType: 'detail',
      imgStyle: null,
      imgStyle1: null,
      page: 1,
      pageSize: 10,
      list:[],
      activeServer: [],
      train: [
        '培训受众',
        '课程收益',
        '课程概述',
        '培训师/机构介绍',
        '课程目录'
      ],
      space: [
        '工位类型',
        '支付方式（解释：“押一付三这种方式”）',
        '工位介绍'
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
    filters: {
      commodityState (opt, format) {
        if (opt == '2') {
          if (format) {
            return '立即购买'
          } else {
            return '询问低价'
          }
        } else{
          return '商品已下架'
        }

      }
    },
    mounted () {
      this.changeRanking('turnover')
    },
    created () {
      this.activeType = 'detail'
      this.init()
    },
    watch: {
    'address.inCity.code' () {
      this.$router.push('/')
    },
      activeType (val) {
        if (val == 'detail') {
          this.activeServer = this.navList
        } else if (val == 'evaluate') {
          this.activeServer = this.evaluateList
          this.getList()
        }
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
      evaluateList () {
        if (this.service && Array.isArray(this.service.personalAppraises)) {
          return this.service.personalAppraises.map(item => {
            item.username = item.userName
            item.info = item.appraise
            item.commodityName = this.service.commodityName || this.service.companyProject || this.service.corporateName
            return item
          })
        } else {
          return []
        }
      },
      query () {
        return this.$route.params
      },
      badList () {
        if (this.service) {
          return this.evaluateList.filter(item => {
            return item.averageValue <= 2
          })
        } else {
          return []
        }
      },
      goodList () {
        if (this.service) {
          return this.evaluateList.filter(item => {
            return item.averageValue <= 4 && item.averageValue > 2
          })
        } else {
          return []
        }
      },
      bestList () {
        if (this.service) {
          return this.evaluateList.filter(item => {
            return item.averageValue > 4
          })
        } else {
          return []
        }
      }
    },
    components: {
      rankingList,
      evaluateContent
    },
    methods: {
      handleSizeChange(val) {
        //pagesize改变时候触发
        this.pageSize = val;
        this.getList()
//        if (this.activeType == "evaluate") {
//          this.initEvaluate()
//        } else {
//          this.initList();
//        }
      },
      handleCurrentChange(val) {
        //当前页改变时候触发
        this.page = val
        this.getList()
//        if (this.activeType == "evaluate") {
//          this.initEvaluate(this.shopDetail.shopDtl.businessId)
//        } else {
//          this.initList(this.shopDetail.shopDtl.businessId);
//        }
      },
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
          url = `${this.$config.back}/guoanmaker/provide/commodity/selectOnePersonalPlatform`,
            data = {
              id: this.query.id
            }
        } else if (this.query.type == 1){
          url = `${this.$config.back}/guoanmaker/provide/commodityMove/getProvideCommodity`
//          url = `http://172.16.32.64:8082/guoanmaker/provide/commodityMove/getProvideCommodity`
          data = {
            id: this.query.id,
            cityCode: this.$route.query.cityCode == '0' ? this.address.inCity.code : (this.$route.query.cityCode ||this.address.inCity.code)
          }
          if (this.$route.query.secckillId) {
            data.secckillId = this.$route.query.secckillId
          }
        } else if (this.query.type == 3) {
          url = `${this.$config.back}/guoanmaker/provide/commodity/selectOnePersonalInvestorDisplay`
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
          if (this.service.isTerritoryRestriction === "1" && this.$route.query.rid) {
            this.service.serviceRange.forEach((item, index) => {
              if (item.id == this.$route.query.rid) {
                this.activeAddress = index
              }
            })
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
            }).reverse()
          }
          this.activeServer = this.navList
        }).catch(error => {
//          console.log(error)
        })
      },
      getList () {
        this.list = this.activeServer.filter((item, index) => {
          return index >= this.pageSize * (this.page -1) && index < this.pageSize * this.page
        })
      },
      selectEvaluate (opt) {
        if (opt == '0') {
          this.activeServer = this.evaluateList
        } else if (opt == '1') {
          this.activeServer = this.bestList
        } else if (opt == '2') {
          this.activeServer = this.goodList
        } else if (opt == '3') {
          this.activeServer = this.badList
        }
        this.page = 1
        this.getList()
      },
      shoucang (opt) {
        if (!this.$store.state.userInfo) {
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
        this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/commodity/insertPersonalCollection`, {}, {
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
        this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/commodity/deletePersonalCollection`, {}, {
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
        this.$htAjax.get(`${this.$config.back}/guoanmaker/provide/commodityMove/selectByCommoditys`, {
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
        if (opt == 3){
          this.$router.push({
            path: `/demand/${this.service.id}/${this.service.type}`,
            query: {
              title: this.service.commodityName,
              type: this.service.isBargaining
            }
          })
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
            address = addr.cityName + (addr.areaName ? '-' + addr.areaName : '')
            code = addr.id
          }
        }
        if (this.service.isSeckill != 2 && (this.service.type === "2" && this.service.isTerritoryRestriction === "1" && this.service.isBargaining !== "1")) {
          this.$router.push({
            path: '/negotiated',
            query: {
              id: this.$route.params.id,
              type: 'commodity',
              activeAddress: address,
              code: code,
              cityCode: this.$route.query.cityCode,
              rid: this.service.serviceRange[this.activeAddress].id,
              secckillId: this.$route.query.secckillId
            }
          })
        } else {
          this.$router.push({
            path: '/negotiated',
            query: {
              id: this.$route.params.id,
              type: 'commodity',
              activeAddress: address,
              code: code,
              secckillId: this.$route.query.secckillId
            }
          })
        }

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
  .detail{
    min-height: 200px;
  }
  .view_con >>> p{
    color: #666;
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
  .service_info .xvqiu {
    margin:15px;
  }
  .service_info .xvqiu .subhead{
    margin-top: 15px;
  }
</style>
<style>
  .desc p img{
    display:block;
    width: 100%;
  }
</style>
