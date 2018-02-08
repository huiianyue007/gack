<template>
  <div class="list">
    <layout v-if = '!collection.length'></layout>
    <el-row class="collection_li" v-for = '(item, key) in collection' :key = 'key' @click.native = 'routeToShop(item)'>
      <el-col :span = '10' class = 'li_con'>
        <box-img :bgImg = 'item.companyLogo' prop = '206:272' class = 'company_logo'></box-img>
        <div class="inline-block shop_desc">
          <div class="title">{{ item.businessName }}</div>
          <div class="text-hidden desc" v-if = 'item.introduce'>{{ item.introduce }}</div>
          <div class="desc" v-else>商家未对店铺进行描述</div>
        </div>
        <img src="~assets/images/reg/shoucang.png" alt="" class="coll" @click.stop = 'shoucang(key)'>
      </el-col>
      <el-col :span = '14' class = 'li_con commodity' v-if = 'item.shopCommodities.length'>
        <el-row>
          <el-col :span = '11' v-for = '(it, index) in item.shopCommodities' class = 'text-center' :key = 'index' @click.stop.native = 'routeToSerde(it)'>
            <box-img class = 'inline-block commodity_logo' :bgImg = 'it.commodity_smallimage'></box-img>
            <div class="text-center commodity_title">{{ it.commodityName }}</div>
            <div class="text-center text-red">￥{{ it.finalPrice }}</div>
          </el-col>
        </el-row>
      </el-col>
      <div class="more">查看更多</div>
    </el-row>
    <div class="text-right">
      <el-pagination @size-change="handleSizeChange"  class = 'inline-block pagination' @current-change="handleCurrentChange" :page-size='pageSize' :current-page="page" layout="prev, pager, next" :total="totalCountevaluate" v-if = 'totalCountevaluate'>
      </el-pagination>
    </div>
    <transition name="el-fade-in">
      <div v-show="show" class="transition-box text-center diag">
        <span class="content">是否取消关注该店铺</span>
        <div class="text-center button">
          <el-button type="primary" @click="del">确定</el-button>
          <el-button @click = 'show=false'>取消</el-button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'shopCollection',
    data () {
      return {
        page: 1,
        pageSize: 5,
        collection: [],
        totalCountevaluate: 0,
        show: false,
        key: 0
      }
    },
    activated () {
      this.init()
      this.show = false
    },
    methods: {
      routeToShop (opt) {
        this.$router.push({
          path: '/shopDetails',
          query: {businessId: opt.businessId}
        })
      },
      handleSizeChange(val) {
        //pagesize改变时候触发
        this.pagesize = val;
        this.init()
      },
      handleCurrentChange(val) {
        //当前页改变时候触发
        this.page = val
        this.init()
      },
      routeToSerde (opt) {
        this.$router.push({
          path: `/serde/${opt.id}/1`,
          query: {
            cityCode: opt.cityCode
          }
        })
      },
      del () {
        let shopId = this.collection[this.key].shopId
        this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/shop/followOrNotFollow`, {}, {
          params: {
            shopId: shopId,
            userId: this.$store.state.userid.id,
            state: 0
          }
        }).then(res => {
          this.collection.splice(this.key, 1)
          this.show = false
          this.page = 1
          this.init()
        }).catch(error => {
          console.log(error)
        })
      },
      shoucang (index) {
        this.show = true
        this.key = index
      },
      init () {
        this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/shop/userShopFollowListForPc`, {}, {
          params: {
            page: this.page - 1,
            pageSize: this.pageSize,
            userId: this.$store.state.userid.id
          }
        }).then(({ data }) => {
          this.collection = data.data.result
          this.totalCountevaluate = data.data.total
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>
<style scoped>
  .list{
    border-top: 1px solid #efefef;
    padding: 15px;
    box-sizing: border-box;
    position:relative;
    min-height: 400px;
  }
  .diag{
    position:absolute;
    top:0;
    bottom:0;
    width: 100%;
    height: 275px;
    font-size: 16px;
    overflow: hidden;
    color: #fff;
    padding-top: 75px;
    box-sizing: border-box;
    background: rgba(0,0,0,.5);
    margin: auto 0
  }
  .diag .button{
    margin-top: 45px;
  }
  .collection_li{
    box-sizing: border-box;
    border: 1px solid #efefef;
    margin: 10px 0;
  }
  .collection_li .li_con{
    padding: 10px;
    box-sizing: border-box;
    position: relative;
  }
  .company_logo{
    display:inline-block;
    vertical-align: top;
    width: 200px;
    margin-right: 15px;
  }
  .commodity{
    border-left: 1px solid #efefef;
  }
  .commodity .commodity_title{
    font-weight: bold;
    font-size: 16px;
  }
  .commodity_logo{
    width: 180px;
  }
  .coll{
    position: absolute;
    top: 10px;
    right: 10px;
    width: 24px;
  }
  .shop_desc{
    max-width: calc(100% - 240px);
  }
  .shop_desc .desc{
    margin-top:20px;
  }
  .more {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 12px;
    color: #D4091D;
  }
</style>
