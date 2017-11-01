<template>
  <div class="page">
    <div class="container">
      <div class="back cursor" @click = '$router.go(-1)'>
        < 返回上一页
      </div>
      <div class="view">
        <div class="title">商品信息</div>
        <el-table :data = 'commodity'>
          <el-table-column label = '商品' :width = '400'>
            <template slot-scope="scope">
              <el-row :gutter = '12'>
                <el-col :span = '12'>
                  <img :src="scope.row.commodity_smallimage" alt="" width = '84' height = '84'>
                </el-col>
                <el-col :span = '12'>
                  <div class="title">{{ scope.row.commodityName }}</div>
                  <div class="subhead">{{ scope.row.businessName }}</div>
                  <div class="subhead">{{ scope.row.serverPlace || '全国' }}</div>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column prop = 'realPrice' label = '单价'>
          </el-table-column>
          <el-table-column prop = 'preferentialMoney' label = '优惠券'>
          </el-table-column>
          <el-table-column prop = 'quantity' label = '数量'>
          </el-table-column>
          <el-table-column label = '订单状态'>
            <template slot-scope= 'scope'>
              <el-button type = 'primary' size = 'small'>{{ scope.row.orderStatus | filterStatus }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="view">
        <div class="title">
          评价商品
        </div>
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
        <div class="title">请留下您的宝贵意见</div>
        <el-form>
          <el-form-item>
            <el-input type = 'textarea':rows = '4' v-model = 'option'></el-input>
          </el-form-item>
        </el-form>
        <div class="text-center">
          <el-button size = 'large' @click = 'submit'>提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      option: '',
      commodity: [],
      evaluate: {
        quality: 0,
        communicate: 0,
        efficiency: 0
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
    activated () {
      this.commodity = []
      this.$htAjax.post('https://apitest.gack.citic:8081/guoanmaker/personal/orderform/findByid', {}, {
        params: {
          id: this.$route.params.id
        }
      }).then(({ data }) => {
        this.commodity.push(data.data)
      }).catch(error => {
      })
    },
    methods: {
      submit () {
        this.$htAjax.post('https://apitest.gack.citic:8081/guoanmaker/personal/appraise/findAppraiseStatesIsUsed').then(({ data }) => {
          let evaluat = Object.values(this.evaluate)
          let arr = data.data.map((item, index) => {
            return item.stateName + '@'+ evaluat[index]
          }).join(',')
          return this.$htAjax.post('https://apitest.gack.citic:8081/guoanmaker/personal/appraise/saveAppraise', {}, {
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
//        this.$htAjax.post('https://apitest.gack.citic:8081/guoanmaker/personal/appraise/saveAppraise', {
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
  .back{
    color: #f00;
    line-height:50px;
    font-size:14px;
  }
  .view {
    background: #fff;
    padding: 0 20px 15px 20px;
    box-sizing: border-box;
    overflow:hidden;
    margin-bottom: 10px;
  }
  .view .title{
    margin:15px 0;
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

</style>
