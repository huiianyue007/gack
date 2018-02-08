<template>
  <div class="service_list">
    <div class="sub_li cursor" v-for = "(item, key) in listData" :key = "key" @click = 'clickMe(item)'>
      <box-img class = 'inline-block img' :bgImg = "item.commodity_smallimage">
      </box-img>
      <div class = 'inline-block sub_con'>
        <div class="title">{{ item.commodityName}}</div>
        <div class="subhead" >{{ item.businessName}}</div>
        <el-row :gutter = '12'>
          <el-col class="text-red" :span = '8' v-if = 'item.startingPrice && item.isBargaining == "1"'>{{ item.startingPrice }}元起 {{item.measurementUnit ? '/' + item.measurementUnit : '' }}</el-col>
          <el-col :span = '8' v-if = 'item.finalPrice && item.isBargaining !== "1"'>价格: <span class="text-red price">{{ item.finalPrice }}元 {{item.measurementUnit ? '/' + item.measurementUnit : '' }}</span></el-col>
          <el-col :span = '8' class = 'volume'>成交量<span class="text-red price">{{ item.salesVolume}}</span></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['listData', 'list', 'opt', 'flag'],
    data: () => ({
      active: 'price',
      orderBy: false
    }),
    methods: {
      change(opt) {
        if(this.active === opt) {
          this.orderBy = !this.orderBy
        } else {
          this.active = opt
        }
      },
      clickMe (opt) {
        this.$router.push(`/serde/${opt.id}/1`)
      }
    }
  }
</script>
<style scoped>
  .service_list{
    background:#fff;
  }
  .text-red{
    color: #f00;
  }
  .sub_li .subhead{
    margin: 30px 0 20px;
  }
  .sub_li{
    padding:30px 0;
    border-bottom:1px solid #f0f0f0;
  }
  .sub_li .img{
    width: 160px;
    vertical-align: middle;
  }
  .sub_li .sub_con{
    width: calc(100% - 210px);
    vertical-align: middle;
    margin-left: 20px;
  }
  /*.sub_li .title{*/
    /*width: 50%;*/
  /*}*/
  .tip {
    width: 200px;
  }
  .price {
    margin-left: 10px;
  }
  .volume{
    font-size: 12px;
  }
</style>
