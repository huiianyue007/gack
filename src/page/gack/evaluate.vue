<template>
  <div class="oh page">
    <div class="container page_con">
      <card-title class = 'view_title'>服务评价 <span slot="right" class = 'more'>{{commodity.businessName}}</span></card-title>
      <div class="oh view_con">
        <div class="fl view">
          <box-img :bgImg = 'commodity.commodity_smallimage' class = 'inline-block commodity_logo'></box-img>
          <div class="inline-block commodity_info">
            <div class="commodity_name">{{commodity.commodityName}}</div>
            <div class="commodity_subhead">{{commodity.serverName}}</div>
          </div>
          <!--<el-table :data = 'commodity'>-->
            <!--<el-table-column label = '商品' :width = '400'>-->
              <!--<template slot-scope="scope">-->
                <!--<el-row :gutter = '12'>-->
                  <!--<el-col :span = '12'>-->
                    <!--<img :src="scope.row.commodity_smallimage" alt="" width = '84' height = '84'>-->
                  <!--</el-col>-->
                  <!--<el-col :span = '12'>-->
                    <!--<div class="title">{{ scope.row.commodityName }}</div>-->
                    <!--<div class="subhead">{{ scope.row.businessName }}</div>-->
                    <!--<div class="subhead">{{ scope.row.serverPlace || '全国' }}</div>-->
                  <!--</el-col>-->
                <!--</el-row>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column prop = 'realPrice' label = '单价'>-->
            <!--</el-table-column>-->
            <!--<el-table-column prop = 'preferentialMoney' label = '优惠券'>-->
            <!--</el-table-column>-->
            <!--<el-table-column prop = 'quantity' label = '数量'>-->
            <!--</el-table-column>-->
            <!--<el-table-column label = '订单状态'>-->
              <!--<template slot-scope= 'scope'>-->
                <!--<el-button type = 'primary' size = 'small'>{{ scope.row.orderStatus | filterStatus }}</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->
          <!--</el-table>-->
        </div>
        <div class=" fr view">
          <div class="title">请留下您的宝贵意见</div>
          <el-form>
            <el-form-item>
              <el-input type = 'textarea':rows = '4' :maxlength = '255' v-model = 'option'></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="view_con">
        <card-title class = 'button_title'>服务商动态评分</card-title>
        <el-row class = 'score'>
          <el-col :span = '3'>完成质量: </el-col>
          <el-col :span = '8'><el-rate v-model="evaluate.quality"></el-rate></el-col>
        </el-row>
        <el-row class = 'score'>
          <el-col :span = '3'>沟通良好: </el-col>
          <el-col :span = '8'><el-rate v-model="evaluate.communicate"></el-rate></el-col>
        </el-row>
        <el-row class = 'score'>
          <el-col :span = '3'>服务效率: </el-col>
          <el-col :span = '8'><el-rate v-model="evaluate.efficiency"></el-rate></el-col>
        </el-row>
        <div class="text-center submit_button">
          <el-button @click = 'submit' type = 'primary'><span style = 'padding: 0 15px;'>提交</span></el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'evaluate',
    data: () => ({
      option: '',
      commodity: null,
      evaluate: {
        quality: 5,
        communicate: 5,
        efficiency: 5
      }
    }),
    filters: {
      filterStatus (opt) {
        if (opt === '6') {
          return '待评价'
        } else if  (opt === '13'){
          return '已完成'
        }
      }
    },
    created () {
      this.option = ''
      this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/orderform/findByid`, {}, {
        params: {
          id: this.$route.params.id
        }
      }).then(({ data }) => {
        this.commodity = data.data
      }).catch(error => {
      })
    },
    methods: {
      submit () {
        this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/appraise/findAppraiseStatesIsUsed`).then(({ data }) => {
          let evaluat = Object.values(this.evaluate)
          let arr = data.data.map((item, index) => {
            return item.stateName + '@'+ evaluat[index]
          }).join(',')
          return this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/appraise/saveAppraise`, {}, {
            params: {
              orderid: this.$route.params.id,
              info: arr,
              appraise: this.option
            }
          })
        }).then(({ data }) => {
          if(data.data.key === 'success') {
            this.$message({
              type: 'success',
              message: data.data.value
            })
            this.$router.go(-1)
          } else {
            this.$message.error(data.data.value)
          }
        }).catch(error => {
          console.log(error)
        })
//        this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/appraise/saveAppraise`, {
//          params: {
//            orderid: this.$route.params.id,
//            info:
//            appraise: this.option
//          }
//        })
      }
    }
  }
</script>
<style scoped>
  .page{
    background: #eee;
  }
  .page_con{
    margin-top: 45px;
  }
  .back{
    color: #f00;
    line-height:50px;
    font-size:14px;
  }
  .view_con {
    background: #fff;
    padding: 0 15px 15px;
    margin-bottom: 15px;
  }
  .view {
    background: #fff;
    padding: 20px 0;
    width: 50%;
    box-sizing: border-box;
    overflow:hidden;
    margin-bottom: 10px;
  }
  .view_title{
    background: #fff;
    border-bottom: none;
    margin-bottom: 15px;
    padding: 15px !important;
  }
  .view_title .more{
    color: #666;
    font-size: 14px;
  }
  .view .title{
    margin-bottom: 15px;
    font-size: 16px;
  }
  .el-table img{
    max-width: 100%;
    margin-top: 10px;
  }
  .el-table .cell {
    padding: 0 !important;
  }
  .el-table .title{
    font-size:14px;
  }
  .score{
    padding-left: 30px;
    box-sizing:border-box;
  }
  .commodity_logo{
    width: 138px;
    vertical-align: top;
  }
  .commodity_info{
    vertical-align: top;
    width: calc(100% - 153px);
    margin-left: 10px;
  }
  .commodity_name{
    color: #333;
    font-size: 16px;
    font-weight: bold;
  }
  .commodity_subhead{
    font-size: 14px;
    color: #666;
  }
  .view >>> .el-textarea__inner{
    background: #eee;
  }
  .button_title{
    border:none !important;
  }
  .submit_button{
    margin-top: 15px;
  }
</style>
