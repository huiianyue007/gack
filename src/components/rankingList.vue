<template>
  <div class="fr view_li">
    <img src="../assets/gack/ht_trade.png" alt="" width='246' height='132'>
    <el-row>
      <el-col :span = '12' :class = "{'active_color': deal === 'turnover'}" @click.native = 'toogle("turnover")'>按成交数</el-col>
      <el-col :span = '12' :class = "{'active_color': deal === 'transaction'}" @click.native = 'toogle("transaction")'>按成交金额</el-col>
    </el-row>
    <div class="view_list cursor" v-for = '(item, key) in listData' @click = 'routerTo(item)'>
      <img src="../assets/gack/a.png" alt="" width = '21' height = '26' v-if = 'key === 0'>
      <img src="../assets/gack/b.png" alt="" width = '21' height = '26' v-if = 'key === 1'>
      <img src="../assets/gack/c.png" alt="" width = '21' height = '26' v-if = 'key === 2'>
      <span class = 'ranking_index'>{{ key + 1 }}</span>
      {{ item.commodityName }}
      <div class="desc">
        <div class="fl"> {{ item.businessName }}</div>
        <div class="fr price">￥{{ item.finalPrice }}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['listData'],
    data: () => ({
      deal: 'turnover'
    }),
    methods: {
      toogle (opt) {
        this.deal = opt
        this.$emit('changeType', opt)
      },
      routerTo (item) {
        this.$emit('openTo', item)
      }
    }
  }
</script>
<style scoped>
  .view_li {
    width: 246px;
  }
  .view_li .el-col{
    text-align: center;
    background: #F3F3F3;
    color: #999;
    line-height: 51px;
    cursor: pointer;
  }
  .view_li .el-col.active_color{
    background: #fff;
    color: #F15949;
  }
  .view_list {
    padding: 20px 10px 0;
    background: #fff;
    overflow:hidden;
  }
  .view_list img{
    margin: 0 5px 5px 0;
  }
  .view_list .ranking_index{
    color: #D7000F;
    margin-left: 5px;
  }
  .view_list .desc{
    font-size: 12px;
    color: #656565;
    padding: 0 10px 20px;
    overflow:hidden;
    border-bottom: 1px solid #f0f0f0;
  }
  .view_list .desc .price{
    color: #ff7800;
  }
</style>
