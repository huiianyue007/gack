<template>
  <page class='shop_details' v-loading='loading'>
    <div class="container">
      <div class="details" v-if='shopDetail'>
        <el-row>
          <el-col :span='8'>
            <box-img prop='258:340' :bgImg='shopDetail.shopDtl.companyLogo' class='inline-block logo'>
            </box-img>
          </el-col>
          <el-col :span='16'>
            <el-row>
              <el-col :span='12'><span class="title">{{ shopDetail.shopDtl.businessName }}</span></el-col>
              <el-col :span='8' v-if = 'shopDetail.shopDtl.score !== "暂无评分"'>店铺评分： <span class="text-red">{{shopDetail.shopDtl.score}}</span></el-col>
              <el-col :span='4' v-if='collectionFlag'>
                <img src="~assets/images/reg/shoucang.png" alt="" class="coll" @click='shoucang(false)'> 店铺已收藏
              </el-col>
              <el-col :span='4' v-if='!collectionFlag'>
                <img src="~assets/images/reg/weishoucang.png" alt="" class="coll" @click='shoucang(true)'> 店铺未收藏
              </el-col>
            </el-row>
            <el-row class='detail_subhead'>
              <el-col :span='2'>店铺简介</el-col>
              <el-col :span='22' v-if = '!shopDetail.shopDtl.introduce'>
                <span> 商家未对店铺进行描述 </span>
              </el-col>
            </el-row>
            <div class="subhead"  style = 'padding-left: 2em' v-if = 'shopDetail.shopDtl.introduce'>
              {{ shopDetail.shopDtl.introduce }}
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--<div class="container" v-if='shopDetail'>-->
      <!--<div class="detail_title"><span class='inline-block tip'></span><span class="title">营业执照、公司资质</span></div>-->
      <!--<swiper :options="swiperOption" ref='mySwiper'>-->
        <!--<swiper-slide class='swiper_li'>-->
          <!--<box-img :bgImg="shopDetail.shopDtl.companyLicenseReplica"></box-img>-->
        <!--</swiper-slide>-->
        <!--&lt;!&ndash;<div class="swiper-button-prev" slot="button-prev" @click = 'prev'></div>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="swiper-button-next" slot="button-next" @click = 'next'></div>&ndash;&gt;-->
      <!--</swiper>-->
    <!--</div>-->
    <div class="container shop_desc">
      <el-row>
        <el-col :span="3" class='text-center cursor tab_head' :class='{acitve: activeType == "all"}' @click.native='select("all")'>全部服务</el-col>
        <el-col :span="3" class='text-center cursor tab_head' :class='{acitve: activeType == "evaluate"}' @click.native='select("evaluate")'>用户评价 <span v-if = 'zongpingshu'>({{ zongpingshu }})</span></el-col>
      </el-row>
      <el-form :inline="true" class = 'el-form-content' v-if = 'activeType == "all"'>
        <el-form-item label="地区">
          <el-select v-model="activeCity" placeholder="请选择" size = 'small'>
          <el-option
          label="全部"
          value="all">
          </el-option>
          <el-option
          v-for="(item, key) in citys"
          :key="key"
          :label="item.name"
          :value="item.cityId">
          </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label = '分类'>
          <el-select v-model="activeClass" class = 'inline-block select_list' size = 'small' placeholder="请选择">
            <el-option
            label="全部"
            value="all">
            </el-option>
            <el-option
            v-for="(item, key) in classes"
            :key="key"
            :label="item.sname"
            :value="item.sid">
            </el-option>
            </el-select>
        </el-form-item>
        <el-form-item @click.native = 'selectPrice()'>
          价格
          <span :class = '[sortType == 0 || !sortType ? "el-icon-arrow-up" : "el-icon-arrow-down"]'></span>
        </el-form-item>
      </el-form>
      <!--<el-radio-group v-model="evaluate" class = 'el-form-content' v-if = 'activeType == "evaluate"'>-->
        <!--<el-radio label="0">全部</el-radio>-->
        <!--<el-radio label="1">好评 <span v-if = 'haopingshu'>({{ haopingshu }})</span></el-radio>-->
        <!--<el-radio label="2">中评 <span v-if = 'zhongpingshu'>({{ zhongpingshu }})</span></el-radio>-->
        <!--<el-radio label="3">差评 <span v-if = 'chapingshu'>({{ chapingshu }})</span></el-radio>-->
      <!--</el-radio-group>-->
    </div>
    <div class="container content" v-if = 'activeType == "all"'>
      <el-row :gutter = '1'>
        <el-col :span = '11' v-for = '(item, key) in selectList' :key = 'key' class = 'commodity_list' @click.native = 'routeTo(item)'>
            <box-img :bgImg = 'item.commodity_smallimage' class = 'inline-block commodity_img'></box-img>
            <div class = 'inline-block commodity_con'>
              <div class="title text-hidden commodity_tile">
                {{ item.commodityName }}
              </div>
              <div class="subhead text-hidden commodity_desc">
                {{ item.synopsis }}
              </div>
              <div class = 'commodity_desc'>
                {{ item.cityName == '0' ? '全国' : item.cityName}}
              </div>
              <div class="text-red commodity_price">￥{{ item.isBargaining == 1 && !item.finalPrice ? '面议' : item.finalPrice }}</div>
            </div>
        </el-col>
      </el-row>
      <layout v-if = 'totalCount == 0'></layout>
      <div class="text-right">
        <el-pagination @size-change="handleSizeChange"  class = 'inline-block pagination' @current-change="handleCurrentChange" :page-size='pageSize' :current-page="page" layout="prev, pager, next" :total="totalCount" v-if = 'totalCount'>
        </el-pagination>
      </div>
    </div>
    <evaluate-content v-if = 'activeType == "evaluate"' :haopingshu = 'haopingshu' :zhongpingshu = 'zhongpingshu' :chapingshu = 'chapingshu' @selectEvaluate = 'selectEvaluate' :evaluateList = 'EvaluateList' :totalCountevaluate = 'totalCountevaluate'>
      <el-pagination @size-change="handleSizeChange"  class = 'inline-block pagination' @current-change="handleCurrentChange" :page-size='pageSize' :current-page="page" layout="prev, pager, next" :total="totalCountevaluate" v-if = 'totalCountevaluate'>
      </el-pagination>
    </evaluate-content>
    <!--<div class="container content" v-if = 'activeType == "evaluate"'>-->
      <!--<el-row class="evaluate_list" v-for = '(item, key) in EvaluateList' :key = 'key'>-->
        <!--<el-col :span = '4'>-->
          <!--<div class="text-center">-->
            <!--<box-img :bgImg = 'item.portrait' class = 'inline-block portrait'></box-img>-->
          <!--</div>-->
          <!--<div class="text-center">-->
            <!--<div class="inline-block">-->
              <!--<p>{{item.username}}</p>-->
            <!--</div>-->
          <!--</div>-->
        <!--</el-col>-->
        <!--<el-col :span = '18' class = 'evaluate_info'>-->
          <!--<el-row class = 'evaluate_title'>-->
            <!--<el-col :span = '2'>-->
              <!--商品名称-->
            <!--</el-col>-->
            <!--<el-col :span = '8'>-->
              <!--{{ item.commodityName }}-->
            <!--</el-col>-->
            <!--<el-col :span = '8'>-->
              <!--{{ item.appraiseTime | time('.-.- :') }}-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-row class = 'evaluate_content'>-->
            <!--<el-col :span = '2'>-->
              <!--用户评价-->
            <!--</el-col>-->
            <!--<el-col :span = '22'>-->
              <!--{{ item.info }}-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-row class = 'evaluate_reply' v-if ='item.reply'>-->
            <!--<el-col :span = '2'>-->
              <!--商家回复-->
            <!--</el-col>-->
            <!--<el-col :span = '22'>-->
              <!--{{ item.reply }}-->
            <!--</el-col>-->
          <!--</el-row>-->
        <!--</el-col>-->
        <!--<el-col :span = '2' class = 'text-center'>-->
          <!--<img src="../../assets/images/gack/bad.png" alt="" class = 'evaluate_img' v-if = 'item.averageValue <= 2'>-->
          <!--<img src="../../assets/images/gack/good.png" alt="" class = 'evaluate_img' v-else-if = 'item.averageValue <= 4'>-->
          <!--<img src="../../assets/images/gack/best.png" alt="" class = 'evaluate_img' v-else>-->
          <!--<div class="text-center">-->
            <!--{{ item.averageValue | evaluateState}}-->
          <!--</div>-->
        <!--</el-col>-->
      <!--</el-row>-->
      <!--<layout v-if = 'totalCountevaluate == 0'></layout>-->
      <!--<div class="text-right">-->
        <!--<el-pagination @size-change="handleSizeChange"  class = 'inline-block pagination' @current-change="handleCurrentChange" :page-size='pageSize' :current-page="page" layout="prev, pager, next" :total="totalCountevaluate" v-if = 'totalCountevaluate'>-->
        <!--</el-pagination>-->
      <!--</div>-->
    <!--</div>-->
  </page>
</template>
<script>
  import evaluateContent from 'components/evaluateContent'
  export default {
    name: 'shop_details',
    data() {
      return {
        loading: true,
        shopDetail: null,
        page: 1,
        pageSize: 10,
        sortType: null,
        totalCount: 0,
        totalCountevaluate: 0,
        evaluate: '0',
        collectionFlag: false,
        swiperOption: {
          pagination: null,
          slidesPerView: 3,
          spaceBetween: 200
        },
        acitvePrice: '从小到大',
        citys: [],
        zongpingshu: 0,
        activeType: 'all',
        activeCity: '全部',
        activeClass: '全部',
        classes: [],
        selectList: [],
        EvaluateList: [],
        businessId: '',
        haopingshu: 0,
        zhongpingshu: 0,
        chapingshu: 0,
      }
    },
    components: {
      evaluateContent
    },
    created() {
      let businessId = this.$route.query.businessId
      let id = this.$route.query.commId
      let url = ''
      if (id) {
        url = `${this.$config.back}/guoanmaker/provide/shop/shopInitByCid`
      }
      if (businessId) {
        url = `${this.$config.back}/guoanmaker/provide/shop/shopInitByBid`
      }
      this.$htAjax.post(url, {}, {
        params: {
          businessId,
          id,
          page: this.page - 1,
          pageSize: this.pageSize,
          sortType: this.sortType
        }
      }).then(({ data }) => {
        this.loading = false
        this.businessId = businessId || data.data.shopDtl.businessId
        this.totalCount = data.data.total
        this.shopDetail = data.data
        this.selectList = data.data.comm
        this.classes = data.data.class
        this.citys = data.data.citys
        this.zongpingshu = data.data.zongpingshu
        this.haopingshu = data.data.haopingshu
        this.zhongpingshu = data.data.zhongpingshu
        this.chapingshu = data.data.chapingshu
        this.totalCountevaluate = data.data.zongpingshu
        this.EvaluateList = data.data.appraise
        if (this.$store.state.userid) {
          return this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/shop/judgeUserIsFollow`, {}, {
            params: {
              userId: this.$store.state.userid.id,
              shopId: this.shopDetail.shopDtl.shopId
            }
          })
        } else {
          return Promise.resolve()
        }
      }).then(({ data }) => {
        this.collectionFlag = data.data.isfollow == 1
      }).catch(error => {
        console.log(error)
      })
    },
    watch: {
      collectionFlag () {
        this.collection()
      },
      activeCity () {
        this.page = 1
        this.sortType = null
        this.initList()
      },
      activeClass () {
        this.page = 1
        this.initList()
      },
      sortType () {
        this.page = 1
        this.initList()
      }
    },
    methods: {
      handleSizeChange(val) {
        //pagesize改变时候触发
        this.pagesize = val;
        if (this.activeType == "evaluate") {
          this.initEvaluate()
        } else {
          this.initList();
        }
      },
      selectEvaluate (val) {
        this.evaluate = val
        this.page = 1
        this.initEvaluate()
      },
      collection () {
        this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/shop/followOrNotFollow`, {}, {
          params: {
            shopId: this.shopDetail.shopDtl.shopId,
            userId: this.$store.state.userid.id,
            state: this.collectionFlag ? 1: 0
          }
        }).then(({data}) => {
          console.log(data.data)
        }).catch(error => {
          console.log(error)
        })
      },
      handleCurrentChange(val) {
        //当前页改变时候触发
        this.page = val
        if (this.activeType == "evaluate") {
          this.initEvaluate(this.shopDetail.shopDtl.businessId)
        } else {
          this.initList(this.shopDetail.shopDtl.businessId);
        }
      },
      initEvaluate () {
        this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/shop/shopAppraiseListAndTotal`, {}, {
          params: {
            businessId: this.businessId,
            page: this.page - 1,
            pageSize: this.pageSize,
            type: this.evaluate
          }
        }).then(({ data }) => {
          this.zongpingshu = data.data.zongpingshu
          this.haopingshu = data.data.haopingshu
          this.zhongpingshu = data.data.zhongpingshu
          this.chapingshu = data.data.chapingshu
          if (this.evaluate == '0') {
            this.totalCountevaluate = data.data.zongpingshu
          } else if (this.evaluate == '1') {
            this.totalCountevaluate = data.data.haopingshu
          } else if (this.evaluate == '2') {
            this.totalCountevaluate = data.data.zhongpingshu
          } else if (this.evaluate == '3') {
            this.totalCountevaluate = data.data.chapingshu
          }
          this.EvaluateList = data.data.appraise
        }).catch(error => {
          console.log(error)
        })
      },
      initList (id) {
        this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/shop/findShopCommbyBusinessId`, {}, {
          params: {
            businessId: id || this.shopDetail.shopDtl.businessId,
            sid: this.activeClass !== 'all' && this.activeClass !== '全部'? this.activeClass: null,
            cityId: this.activeCity !== 'all' && this.activeCity !== '全部'? this.activeCity : null,
            page: this.page - 1,
            pageSize: this.pageSize,
            sortType: this.sortType
          }
        }).then(({data}) => {
          this.totalCount = data.data.total
          this.selectList = data.data.comm
        }).catch(error => {
          console.log(error)
        })
      },
      shoucang(opt) {
        if(!this.$store.state.userid) {
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
        if(opt) {
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
      dropDrown (opt) {
        this.activeCity = opt.name
      },
      selectPrice () {
        if (!this.sortType) {
          this.sortType = 1
        } else if (this.sortType == 1) {
          this.sortType = 0
        } else if (this.sortType == 0) {
          this.sortType = 1
        }
      },
      routeTo (opt) {
        this.$router.push({
          path: `/serde/${opt.id}/1`,
          query: {
            rid: opt.rid,
            cityCode: opt.cityCode || '110000'
          }
        })
      },
      select (opt) {
        this.page = 1
        this.activeType = opt
        this.evaluate = '0'
        if (this.activeType == "evaluate") {
          this.initEvaluate()
        } else {
          this.initList();
        }
      }
      //      prev () {
      //        this.$refs.mySwiper.swiper.slidePrev()
      //      },
      //      next () {
      //        this.$refs.mySwiper.swiper.slideNext()
      //      }
    }
  }
</script>
<style scoped>
  .shop_details {
    background: #eee;
    overflow: hidden;
  }

  .shop_details .container {
    margin: 15px auto;
    padding: 15px;
    box-sizing: border-box;
    background: #fff;
    position: relative;
  }

  .logo {
    width: 340px
  }

  .coll {
    width: 24px;
    vertical-align: middle;
  }

  .detail_subhead {
    margin-top: 15px;
    line-height: 2em;
  }
  .detail_subhead span{
    color: #999;
  }
  .detail_title {
    margin: 15px 0;
  }

  .detail_title .tip {
    width: 6px;
    height: 30px;
    border-radius: 2px;
    vertical-align: middle;
    margin: 0 19px 4px 0;
    background: #C7000A;
  }

  .tab_head {
    line-height: 36px;
  }
  .el-form-content {
    margin: 15px 0;
  }
  .el-form-content .el-form-item,.el-form-content .el-radio{
    margin:0 15px;
  }
  .el-form-content .el-select{
    width: 120px;
  }
  .acitve {
    background: #C7000A;
    color: #fff;
  }
  .select {
    line-height: 36px;
    padding: 15px;
  }
  . select_list{
    width: 100px;
  }
  .commodity_list{
    margin-top: 15px;
    cursor: pointer;
  }
  .commodity_img {
    width: 150px;
    vertical-align: top;
    margin-right: 15px;
  }
  .commodity_con {
    width: calc(100% - 170px);
  }
  .commodity_tile{
    margin-bottom: 10px;
  }
  .commodity_desc{
    color: #999;
    margin-bottom: 10px;
  }
  .commodity_price{
    margin-bottom: 15px;
  }

  .shop_details .content{
    min-height: 200px;
    margin: 0 auto 25px;
    padding: 0 50px;
    box-sizing: border-box;
  }
  .shop_details .shop_desc{
    margin-bottom: 0;
  }
</style>
