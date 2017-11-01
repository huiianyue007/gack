<template>
  <div class="collection">
     <div class="collection_title">
       <div class="title">我的收藏</div>
     </div>
    <div class="no_data_lay" v-if = '!collectionList.length'>
      <layout>
      </layout>
    </div>
    <router-link tag = 'div' v-for = '(item, key) in collectionList' v-if = 'collectionList.length' :key = 'key' class = 'list' :to = '"/serde/" +item.commodityid + "/1"'>
      <img :src="item.commodity_smallimage" alt="" width = '84' height = '84'>
      <div class = 'inline-block list_con'>
        <div class="title">{{ item.commodityName }}</div>
        <div class="subhead desc">价格：{{item.finalPrice}}</div>
        <div class="subhead">{{item.businessName}}</div>
      </div>
    </router-link>
    <el-button class="block no_more" @click = 'loaddingMore' v-if = 'moreFlag &&　collectionList.length'>加载更多数据</el-button>
    <div class="text-center no_data" v-if = '!moreFlag &&　collectionList.length'>暂无更多数据</div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      collectionList: [],
      moreFlag: false,
      num: 0
    }),
    activated () {
      this.collectionList = []
      this.getCollection(0)
    },
    methods: {
      getCollection (opt) {
        this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/commodity/selectPersonalCollectionPage', {}, {
          params: {
          userid: this.$store.state.userid.id,
//            userid: '2c90a93c5e69f107015e6a04ca770002',
            page: opt,
            size: 5
          }
        }).then(({data}) => {
          if (data.data.list.length < 2) {
            this.moreFlag = false
          } else {
            this.moreFlag = true
          }
          this.collectionList = this.collectionList.concat(data.data.list)
        }).catch(error => {
          console.log(error)
        })
      },
      loaddingMore () {
        this.getCollection(++this.num)
      }
    }
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
  .list {
    padding: 15px;
    border-bottom: 1px solid #efefef;
  }
  .desc{
    padding: 20px 28px;
    color: #D6000F;
  }
  .list .desc{
    padding:0;
    font-size: 14px;
    line-height: 35px;
    color: #D6000F;
  }
  .inline-block{
    vertical-align: middle;
  }
  .list_con{
    margin-left: 15px;
  }
  .no_more{
    margin-top: 15px;
  }
</style>
