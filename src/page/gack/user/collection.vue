<template>
  <div class="collection">
     <div class="collection_title">
       <div class="title">我的收藏</div>
     </div>
    <div class="tab_header">
      <el-button :type = 'activeType == "comm" ? "primary" : ""' @click = 'activeType="comm"'>商品</el-button>
      <el-button :type = 'activeType == "shop" ? "primary" : ""' @click = 'activeType="shop"'>店铺</el-button>
    </div>
    <keep-alive>
      <component :is = 'componentName'></component>
    </keep-alive>

  </div>
</template>
<script>
  import shopCollection from 'components/shopCollection'
  import commCollection from 'components/commCollection'
  export default {
    name: 'collection',
    data: () => ({
      activeType: 'comm',
    }),
    components: {
      shopCollection,
      commCollection
    },
    computed: {
      componentName () {
        if (this.activeType=="shop") {
          return 'shop-collection'
        } else if (this.activeType=="comm"){
          return 'comm-collection'
        }
      }
    },
//    methods: {
//      routeTo (opt) {
//        if (this.activeType== 'comm') {
//          this.$router.push("/serde/" + opt.commodityid + "/1")
//        } else if (this.activeType== 'shop') {
//          this.$router.push({path: "/shopDetails", query: {businessId: opt.businessId }})
//        }
//      },
//      getShop (opt) {
//        return new Promise((resolve, reject) => {
//          this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/shop/userShopFollowList`, {}, {
//            params: {
//              page: opt,
//              pageSize: 5,
//              userId: this.$store.state.userid.id
//            }
//          }).then(({ data }) => {
//            if (data.data.result) {
//              this.shopCollectionList = this.shopCollectionList.concat(data.data.result)
//              this.shopcount = data.data.total
//              if (this.shopCollectionList.length >= data.data.total) {
//                this.moreFlag = false
//              } else {
//                this.moreFlag = true
//              }
//            }
//            resolve(this.shopCollectionList)
//          }).catch(error => {
//            console.log(data)
//          })
//        })
//      },
//      getCollection (opt) {
//        return new Promise((resolve, reject) => {
//          this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/commodity/selectPersonalCollectionPage`, {}, {
//            params: {
//              userid: this.$store.state.userid.id,
////            userid: '2c90a93c5e69f107015e6a04ca770002',
//              page: opt,
//              size: 5
//            }
//          }).then(({data}) => {
//            this.comCount = data.data.count
//            if (data.data.list) {
//              this.commCollectionList = this.commCollectionList.concat(data.data.list)
//            }
//            if (this.commCollectionList.length >= data.data.count) {
//              this.moreFlag = false
//            } else {
//              this.moreFlag = true
//            }
//            resolve(this.commCollectionList)
//          }).catch(error => {
//            console.log(error)
//          })
//        })
//      },
//      loaddingMore () {
//        if (this.activeType == 'comm') {
//          this.num++
//          this.getCollection(this.num).then(res => {
//            this.collectionList = res
//          })
//        } else if (this.activeType == 'shop'){
//          this.num++
//          this.getShop(this.num).then(res => {
//            this.collectionList = res
//          })
//        }
//      }
//    }
  }
</script>
<style scoped>
  .collection {
    background:#fff;
    padding-bottom: 15px;
  }
  .collection .collection_title{
    border-bottom: 1px solid #D6000F;
  }
  .collection_title .title{
    background: #D6000F;
    color: #fff;
    line-height: 45px;
    width: 118px;
    font-size: 18px;
    text-align:center;
  }
  .tab_header{
    margin: 15px 15px 0;
  }
</style>
