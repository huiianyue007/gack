<template>
  <div class="container content">
    <el-radio-group v-model="evaluate" class = 'el-form-content'>
      <el-radio label="0">全部</el-radio>
      <el-radio label="1" v-if = 'haopingshu'>好评 <span>({{ haopingshu }})</span></el-radio>
      <el-radio label="2" v-if = 'zhongpingshu'>中评 <span>({{ zhongpingshu }})</span></el-radio>
      <el-radio label="3" v-if = 'chapingshu'>差评 <span>({{ chapingshu }})</span></el-radio>
    </el-radio-group>
    <el-row class="evaluate_list" v-for = '(item, key) in evaluateList' :key = 'key'>
      <el-col :span = '4'>
        <div class="text-center">
          <box-img :bgImg = 'item.portrait' class = 'inline-block portrait'></box-img>
        </div>
        <div class="text-center">
          <div class="inline-block">
            <p>{{item.username}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span = '18' class = 'evaluate_info'>
        <div class = 'evaluate_title'>
            商品名:{{ item.commodityName }} <span class="evaluate_time">{{ item.appraiseTime | time('.-.- :') }}</span>
        </div>
        <div class = 'evaluate_content'>
            用户评价:
          <div class="inline-block evaluate_info_reply">{{ item.appraise }}</div>
        </div>
        <div class = 'evaluate_reply' v-if ='item.reply'>
            商家回复:
          <div class="inline-block evaluate_info_reply evaluate_reply">{{ item.reply }}</div>
        </div>
      </el-col>
      <el-col :span = '2' class = 'text-center'>
        <img src="~assets/images/gack/bad.png" alt="" class = 'evaluate_img' v-if = 'item.averageValue <= 2'>
        <img src="~assets/images/gack/good.png" alt="" class = 'evaluate_img' v-else-if = 'item.averageValue <= 4'>
        <img src="~assets/images/gack/best.png" alt="" class = 'evaluate_img' v-else>
        <div class="text-center">
          {{ item.averageValue | evaluateState}}
        </div>
      </el-col>
    </el-row>
    <layout v-if = 'totalCountevaluate == 0'></layout>
    <div class="text-right">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      haopingshu: {
        type: Number,
        default: 0
      },
      zhongpingshu: {
        type: Number,
        default: 0
      },
      chapingshu: {
        type: Number,
        default: 0
      },
      totalCountevaluate: {
        type: Number,
        default: 0
      },
      evaluateList: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        evaluate: '0'
      }
    },
    watch: {
      evaluate () {
        this.select()
      }
    },
    filters: {
      evaluateState (opt) {
        if (opt <= 2) {
          return '差评'
        } else if (opt <=4) {
          return '中评'
        } else {
          return '好评'
        }
      }
    },
    methods: {
      select() {
        this.$emit('selectEvaluate', this.evaluate)
      }
    }
  }
</script>
<style scoped>
  .el-form-content {
    margin: 15px 0;
  }
  .el-form-content .el-form-item,.el-form-content .el-radio{
    margin:0 15px;
  }
  .el-form-content .el-select{
    width: 120px;
  }
  .evaluate_list{
    border-bottom: 1px solid #eee;
    padding: 15px;
  }
  .evaluate_list .evaluate_img{
    width:40px;
    height: 40px;
  }
  .evaluate_list p {
    text-align: left;
  }
  .evaluate_info .evaluate_title{
    color: #999;
  }
  .evaluate_info .evaluate_info_reply{
    width: calc(100% - 6em);
    margin-left:1em;
    word-break: break-all;
    vertical-align: top;
  }
  .evaluate_info .evaluate_title .evaluate_time{
    margin-left:15px;
  }
  .evaluate_info .evaluate_content{
    margin:30px 0;
  }
  .evaluate_info .evaluate_reply{
    color: #E66415;
  }
  .portrait{
    width: 80px;
    border-radius: 50%;
    background: #eee;
  }
</style>
