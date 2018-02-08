<template>
  <page v-loading = 'loadding' class = 'trade_mark'>
    <v-header>
      <router-link to = '/' class = 'inline-block home' slot = 'home'>首页</router-link>
    </v-header>
    <div class="container">
      <div class="text-center banner">
        <div class="text-center shadow"><!--<img src="~@/assets/images/gack/pt_logo.png" class = 'logo' alt="">-->
          <p class="text-center title">超过 <span style = 'font-size: 32px;color: red;'>30,000,000</span> 个{{select == '商标查询' ? '商标' : '专利'}}任您搜索</p>
          <el-input :placeholder="`请输入你想搜索的${select == '商标查询' ? '商标' : '专利'}名`" v-model="keywords" @keyup.enter.native = 'search' class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="免费商标查询" value="商标查询"></el-option>
              <el-option label="免费专利查询" value="专利查询"></el-option>
            </el-select>
            <el-button type = 'primary' slot="append" class = 'search_button' @click = 'search' :loading = 'searchLoading'>立即查询</el-button>
          </el-input></div>
      </div>
      <div class="trade_swiper">
        <swiper :options="swiperOption" ref = 'mySwiper'>
          <swiper-slide v-for="(item, key) in banners" :key = 'key' class = 'swiper_li' @click.native = '$router.push(`/serde/${item.commidityId}/1`)'>
            <box-img :bgImg = 'item.small_pic'></box-img>
          </swiper-slide>
          <!--<div class="swiper-button-prev" slot="button-prev" @click = 'prev'></div>-->
          <!--<div class="swiper-button-next" slot="button-next" @click = 'next'></div>-->
        </swiper>
        <div class="swiper_button prev" @click = 'prev'></div>
        <div class="swiper_button next" @click = 'next'></div>
      </div>
      <div :class="['content', {'zl_con': select == '专利查询'}]" v-loading = 'conloading'>
        <div class="con_con" v-if = 'tradeMark && select == "商标查询"'>
          <div class="content_title" v-if = 'list.length == 0 && tradeMark.constructor === String'>亲爱的 <span class="text-red">{{$store.state.userInfo.username}}</span>,<span v-if = 'tradeMark.constructor === String'>{{tradeMark}}</span> <span v-else-if = 'totalCount == 0'>您搜索的“关键词”系统没有为您找到相关结果，请修改后再次查询！</span></div>
          <layout v-if = 'list.length == 0'></layout>
          <div class="con_list" v-for = '(item, key) in list' :key = 'key'>
            <box-img class="logo" :bgImg = 'item.tmImg' :cover = 'false'></box-img>
            <div class="inline-block list_content">
              <div>商标名称: {{ item.tmName }}</div>
              <div class = 'list_con'>申请日期: {{ item.appDate | time }}</div>
              <div>申请人:  {{ item.applicantCn || item.applicantEn || '无' }}</div>
            </div>
            <div class="inline-block list_content">
              <div v-if = 'item.privateDate'>有限期限: {{ item.privateDate | time }}</div>
              <div :class = '{"list_con": item.privateDate}'>商业分类: {{ item.clsType }}</div>
              <div :class = '{"list_con_bottom": !item.privateDate}'>商标号:  {{ item.regNo }}</div>
            </div>
            <el-button type = 'primary' class = 'fr inline-block button' v-if = 'flag' :disabled = '!item.remainCount && remainCount <= 0'  @click = 'routerTotrade(item)'>查看详情</el-button>
          </div>
        </div>
        <div class="con_con" v-if = 'tradeMark && select == "专利查询"'>
          <div class="content_title" v-if = 'list.length == 0 && tradeMark.constructor === String'>亲爱的{{$store.state.userInfo.username}},<span>{{tradeMark}}</span> <span v-if = 'list.length == 0 && tradeMark.constructor != String'>您搜索的“关键词”系统没有为您找到相关结果，请修改后再次查询！</span></div>
          <layout v-if = 'list.length == 0'></layout>
          <div class="con_list" v-for = '(item, key) in list' :key = 'key'>
            <div class="inline-block list_content">
              <div>专利名称: <span v-html = 'item.title.replace(/base:sub>/ig, "sub>").replace(/base:sup>/ig, "sup>")'></span></div>
              <div>申请日期: {{ item.applicationDate }}</div>
            </div>
            <div class="inline-block list_content">
              <div>专利类别: {{ item.type }}</div>
            </div>
            <el-button type = 'primary' class = 'fr inline-block button' v-if = 'flag' :disabled = '!item.remainCount && remainCount <= 0' @click = 'routerTo(item)'>查看详情</el-button>
          </div>
        </div>
        <div class="text-center select_more" v-if = '(((queryCount > 50 && currentPage == 1) || queryCount > 0) && !moreFlag) && list.length && list.length < 100 && select == "专利查询"'>
          <el-button type="primary" @click = 'more'>查看更多</el-button>
        </div>
        <div class="text-center select_more" v-if = '(((queryCount > 50 && currentPage == 1) || queryCount > 0) && !moreFlag) && tradeMark && list.length && list.length < 100 && select == "商标查询"'>
          <el-button type="primary" @click = 'more'>查看更多</el-button>
        </div>
        <!--<el-pagination @size-change="handleSizeChange"  class = 'pagination' @current-change="handleCurrentChange" :page-size='pageSize' :current-page="currentPage" layout="prev, pager, next" :total="totalCount" v-if = 'totalCount && select == "商标查询"'>-->
        <!--</el-pagination>-->
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width = '375px'>
      <span>请登录后享受更多查询次数！</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="register">注册</el-button>
    <el-button type="primary" @click="login">现在登陆</el-button>
  </span>
    </el-dialog>
    <v-footer></v-footer>
  </page>
</template>
<script>
  import vHeader from 'components/header'
  import vFooter from 'components/Footer'
  import { lazyAMapApiLoaderInstance } from 'vue-amap'
  import config from '@/config'
  import Vue from 'vue'
  import store from 'store'
  export default {
    async beforeRouteEnter (to, from, next) {
      if (store.state.homePage) {
        next()
      }
      await lazyAMapApiLoaderInstance.load()
      if (from.path == '/') {
        store.commit('setTradeNum', true)
      }
      if (!AMap.CANVAS) {
        return next(vm => {
          vm.$router.go(0)
        })
      }
      let mapObj = new AMap.Map('iCenter')
      new Promise(resolve => {
        mapObj.plugin('AMap.Geolocation', function () {
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
            convert: true,
            showButton: true,
            buttonPosition: 'LB',
            buttonOffset: new AMap.Pixel(10, 20),
            showMarker: true,
            showCircle: true,
            panToLocation: true,
            zoomToAccuracy: true
          })
          mapObj.addControl(geolocation)
          geolocation.getCityInfo((status, result) => {
            if (status === 'complete') {
              resolve(result.city)
            } else {
              resolve('北京市')
            }
          })
        })
      }).then(async data => {
        let user = store.state.userInfo
        let session = store.state.userid
        if (!user && session) {
          await store.dispatch('findById', session.id).catch(() => {})
        }
        let ad = encodeURI(data)
        return Vue.prototype.$htAjax.get(`${config.activity}/guoanmaker/operator/2app/getOpenCity2App?cityName=${ad}&username=${user ? user.username : ''}&landType=1`)
      }).then(({ data }) => {
        store.commit('setLocalPosition', data.data)
        return Vue.prototype.$htAjax.post(`${config.activity}/guoanmaker/operator/PCoficial/getAllPc`, {}, {
          params: {
            cityId: data.data.inCity.code
          }
        })
      }).then(({ data }) => {
        store.commit('setHomePage', data.data)
      }).catch(() => {
      })
      next()
    },
    name: 'trademark',
    data () {
      return {
        select: '',
        tradeNum: 0,
        banners: [],
        searchLoading: false,
        routerFlag: false,
        loadding: true,
        keywords: '',
        tradeMark: null,
        totalCount: 0,
        pageSize: 10,
        moreFlag: false,
        currentPage: 1,
        moreFlag: false,
        currentPageParent: 1,
        currentPageTrade: 1,
        remainCount: 0,
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 15
        },
        list: [],
        conloading: false,
        queryCount: 0,
        banner: null,
        dialogVisible: false,
        flag: true,
        initFlag: false,
        searchFlag: null
      }
    },
    watch: {
      select () {
        if (!this.routeFlag) {
          this.keywords = ''
        } else {
          this.routeFlag = false
        }
        this.list = []
        this.moreFlag = false
        this.tradeMark = null
        this.initBanner()
      }
    },
    activated () {
      this.loadding = true
      this.flag = true
      if (!this.select || this.$store.state.tradeNum) {
        this.select = this.$route.params.id == '1' ? '商标查询' : '专利查询'
        this.list = []
        this.keywords = ''
        this.tradeMark = null
        this.$store.commit('setTradeNum', false)
      }
      let url = this.select == '商标查询' ? `${this.$config.activity}/guoanmaker/operator/message/trademarkRemainCount`: `${this.$config.activity}/guoanmaker/operator/message/patentSearchDetail`
      this.$htAjax.post(url).then(({data}) => {
        if (this.select == '商标查询') {
          this.remainCount = data.data.value.infoCount
        } else if (this.select == '专利查询') {
          this.remainCount = data.data.countInfo
        }
      }).catch(error => {
        console.log(error)
      })
      this.initBanner()
      if (this.$route.query.keywords) {
        this.routeFlag = true
        this.keywords = this.$route.query.keywords
        this.search()
      }
    },
    components: {
      vHeader,
      vFooter
    },
    methods: {
      setSelect (opt) {
        this.select = opt
      },
      initBanner () {
        let url = this.select == '专利查询' ? `${this.$config.activity}/guoanmaker/operator/Patent/getAlltOperatorPatentCommodity` : `${this.$config.activity}/guoanmaker/operator/trademark/getAllOperatorTrademarkInformation`
        let params = this.select == '专利查询'? {
          cityCode: this.address.inCity.code,
          type: 1
        }: {
          cityId: this.address.inCity.code,
          type: 1
        }
        this.$htAjax.post(url, {}, {
          params
        }).then(({ data }) => {
          if (this.loadding) {
            this.loadding = false
          }
          this.banners = data.data
        }).catch(error => {
          if (this.loadding) {
            this.loadding = false
          }
          console.log(error)
        })
      },
//      handleSizeChange(val) {
//        //pagesize改变时候触发
//        this.pagesize = val;
//        this.init();
//      },
      routerTotrade(opt) {
        if (!this.$store.state.userInfo) {
          this.dialogVisible = true
          return false
        }
        this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/message/trademarkRemainCount`).then(({ data }) => {
          this.remainCount = data.data.value.infoCount
          if (!opt.remainCount && this.remainCount <= 0) {
            return false
          }
          this.$set(opt, "remainCount", true)
          this.$router.push({
            path: `/tradeinfo/${this.$store.state.userid.id}`,
            query: {
              keyword: this.keywords,
              regNo: opt.regNo,
              intCls: opt.intCls
            }
          })
        }).catch(error => {
          console.log(error)
        })
      },
//      handleCurrentChange(val) {
//        //当前页改变时候触发
//        this.currentPage = val
//        //参数1  查询条件 当前页码  当前页显示条数
//        this.getList()
//
//      },
      routerTo (item) {
        if (!this.$store.state.userInfo) {
          this.dialogVisible = true
          return false
        }
        this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/message/patentSearchDetail`).then(({ data }) => {
          this.remainCount = data.data.countInfo
          if (!item.remainCount && this.remainCount <= 0) {
            return false
          }
          this.$set(item, "remainCount", true)
          this.$router.push({
            path: `/patentinfo/${item.id}`,
            query: {
              keyword: this.keywords
            }
          })
        }).catch(error => {
          console.log(error)
        })

      },
      init () {
        this.list = []
        if (this.select == '商标查询') {
          this.searchTradeMark()
        } else if (this.select == '专利查询'){
          this.getPatents()
        }
      },
      more () {
        if (!this.$store.state.userInfo) {
          this.dialogVisible = true
          return false
        }
        if (this.select == '专利查询') {
          if (this.currentPage > 5) {
            this.currentPage = 1
          }
          if (this.list.length % 50 == 0) {
            this.getPatents()
          } else {
            this.getPatentsList()
            this.currentPage++
          }
        } else {
          if (this.currentPage > 5) {
            this.currentPage = 1
          }
          if (this.list.length % 50 == 0) {
            this.searchTradeMark()
          } else {
            this.getList()
            this.currentPage++
          }
        }
      },
      register () {
        this.dialogVisible = false
        this.$router.push('/register/0')
      },
      login () {
        this.dialogVisible = false
        this.$router.push('/login/0')
      },
      getPatents () {
        this.conloading = true
        this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/message/getPatentsByKeyWord/${this.$store.state.userid.id}`, {}, {
          params: {
            keyWord: this.keywords || this.$route.query.keywords,
            page: this.currentPageParent,
            pageSize: 50,
            userid: this.$store.state.userid.id
          }
        }).then(({ data }) => {
          this.conloading = false
          this.tradeMark = data.data
          this.queryCount = data.data.queryCount
          this.remainCount = data.data.queryInfoCount
          if (this.initFlag) {
            this.flag = this.remainCount > 0
            this.initFlag = false
          }
            this.getPatentsList()
            this.currentPage++
            this.currentPageParent ++
          this.searchLoading = false
        }).catch(({data}) => {
          this.conloading = false
          this.searchLoading = false
        })
      },
      searchTradeMark () {
        this.conloading = true
        this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/message/selectTrademarks`, {}, {
          params: {
            id: this.$store.state.userid.id,
            keyword: this.keywords || this.$route.query.keywords,
            currentPage: this.currentPageTrade,
            pageSize: 50
          }
        }).then(({ data }) => {
          this.conloading = false
          this.tradeMark = data.data
          this.queryCount = data.data.value.remainSearchCount
          this.remainCount = data.data.value.remainInfoCount
          if (this.initFlag) {
            this.flag = this.remainCount > 0
            this.initFlag = false
          }
          this.getList()
          this.searchLoading = false
          this.totalCount = data.data.value.trademarks.length
          this.currentPage++
          this.currentPageTrade ++
        }).catch(error => {
          this.conloading = false
          this.tradeMark = error.data.data.value
          this.searchLoading = false
        })
      },
      getPatentsList () {
        let liArr = this.tradeMark.patents.filter((item, index) => {
          return index >= this.pageSize * (this.currentPage - 1) && index < this.pageSize * this.currentPage
        })
        this.list = this.list.concat(liArr)
        if (liArr.length < this.pageSize) {
          this.moreFlag = true
        }
      },
      getList () {
        let liArr = this.tradeMark.value.trademarks.filter((item, index) => {
          return index >= this.pageSize * (this.currentPage - 1) && index < this.pageSize * this.currentPage
        })
        this.list = this.list.concat(liArr)
        if (liArr.length < this.pageSize) {
          this.moreFlag = true
        }
      },
      search () {
        if (!this.$store.state.userInfo) {
          this.dialogVisible = true
          return false
        }
        this.keywords = this.keywords.replace(/ /g, '')
        if (!this.keywords) {
          this.$message.error('搜索关键字不能为空')
          return false
        }
        if ((/[~!@#$%^&*()]/).test(this.keywords)) {
          this.$message.error('包含非法字符')
          return false
        }
        this.searchLoading = true
        this.initFlag = true
        this.page = 1
        this.currentPageParent = 1
        this.currentPageTrade = 1
        this.currentPage = 1
        if (this.select == '专利查询') {
          this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/message/cleanCache/${this.$store.state.userid.id}`).then(({ data }) => {
            this.init()
          }).catch(error => {
            console.log(error)
          })
        }
        if (this.select== '商标查询') {
          this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/message/removeTrademarkInfoLogs`, {}, {
            params: {
              id: this.$store.state.userid.id
            }
          }).then(() => {
            this.init()
          }).catch(error => {
            console.log(error)
          })
        }
      },
      prev () {
        this.$refs.mySwiper.swiper.slidePrev()
      },
      next () {
        this.$refs.mySwiper.swiper.slideNext()
      }
    }
  }
</script>
<style scoped>
  .home{
    margin-left: 15px;
  }
  .trade_mark{
    background: #eee;
    overflow:hidden;
  }
  .container{
    background: #fff;
    padding: 15px;
    box-sizing:border-box;
    margin: 15px auto 25px;
  }
  .trade_swiper{
    padding: 0 50px;
    box-sizing: border-box;
    position:relative;
  }
  .swiper_button {
   position:absolute;
    top:0;
    bottom:0;
    cursor: pointer;
    font-size: 24px;
    width: 40px;
    height: 40px;
    margin: auto 0;
  }
  .prev{
    left: 0;
    background: url('~assets/images/gack/left.png') no-repeat center center/contain;
  }
  .next {
    right:0;
    background: url('~assets/images/gack/right.png') no-repeat center center/cover;
  }
  .banner{
    height: 500px;
    position:relative;
    margin-bottom: 15px;
    background: url('../assets/images/gack/banners.jpg') no-repeat center center/cover;
  }
  .banner .shadow{
    position:absolute;
    top:0;
    left:0;
    width: 100%;
    color: #fff;
    height: 100%;
    box-sizing: border-box;
    padding: 30px 0 20px;
    background: rgba(0,0,0,.5)
  }
  .banner .shadow .title{
    margin-top: 158px;
    color: #fff;
  }
  .banner .logo{
    width: 400px;
    margin-bottom: 20px;
  }
  .input-with-select {
    width: 600px;
    margin-top: 20px;
  }
  .content {
    min-height: 400px;
    position:relative;
    color: #333;
  }
  .content .con_con{
    padding-bottom: 40px;
  }
  .zl_con{
    overflow-y:auto;
    overflow-x: hidden;
    height: 800px;
    margin: 15px 0;
  }
  .content_title{
    line-height: 40px;
  }
  .con_list {
    padding: 15px;
  }
  .zl_con .con_list{
    border-top: 1px solid #eee;
  }
  .zl_con .con_list:last-of-type{
    border-bottom: 1px solid #eee;
  }
  .con_list .logo{
    width: 200px;
    display: inline-block;
    vertical-align: middle;
  }
  .con_list .inline-block{
    margin-left: 15px;
    vertical-align: middle;
  }
  .zl_con .inline-block{
    vertical-align: top;
  }
  .con_list .inline-block.button {
    margin-top: 55px;
  }
  .zl_con .inline-block.button {
    margin-top: 10px;
  }
  .con_list .inline-block .list_con{
    margin: 40px 0;
  }
  .con_list .inline-block .list_con_bottom {
    margin: 40px 0 60px;
  }
  .pagination{
    position:absolute; right: 10px; bottom: 10px;
  }
  .select_more{
    margin-top: 20px;
  }
  .list_content{
    width: 34%;
  }
  .zl_con  .list_content{
    width: 40%;
  }
  .trade_mark >>> .el-select .el-input {
    width: 150px;
  }
  .trade_mark >>> .el-input-group__append, .el-input-group__prepend:nth-of-type(2) {
    border: 1px solid #c7000a;
  }
  .trade_mark >>> .el-input-group__append .el-button.el-button--primary{
    background: #c7000a;
    border-color: #c7000a;
    border-bottom-left-radius: 0px;
    border-top-left-radius: 0px;
    color: #fff;
  }
</style>
