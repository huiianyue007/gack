<template>
  <div class="view">
    <div class="view_list cursor" v-for = '(item, key) in listData' :key = 'key' @click = 'routeTo(item)'>
      <el-row>
        <el-col :span = '4' class = 'center'>
          <box-img :bgImg = 'item.commodity_smallimage' :cover = 'false'></box-img>
        </el-col>
        <el-col :span = '!flag ?  15 : 10' class = 'center'>
          <el-row :gutter = '6'>
            <div class="oh logo">
              <div>
                <p>{{ item.commodityName }}</p>
                <div class="subhead" v-if = 'item.businessName'>{{ item.businessName }}</div>
                <div class="subhead" v-if = 'item.serverName'>{{ item.serverName }}</div>
              </div>
            </div>
          </el-row>
        </el-col>
        <el-col :span = '4' v-if = 'item.type == "5"' class = 'center text-red text-center'>
          <span v-if = 'item.salesVolume'>咨询{{ item.salesVolume }}次</span>
        </el-col>
        <el-col :span = '4' class = 'center text-center'>
          <div class="text-red" style = 'margin-bottom: 15px;' v-if = 'flag && item.finalPrice'>
            ￥{{ item.finalPrice}}/ {{item.measurementUnit}}
          </div>
          <div class="text-red" style = 'margin-bottom: 15px;' v-if = 'flag && !item.finalPrice'>
            面议
          </div>
          <el-button size = 'small' class = 'select' type = 'danger'>查看详情</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['listData', 'list', 'opt', 'flag'],
    data: () => ({
      orderBy: false,
    }),
    filters: {
      duration (opt) {
        let time = opt
        let second = Math.ceil((time / 1000) % 60)
        let min = Math.floor((time / 60000) % 60)
        let hour = Math.floor((time / 3600000) % 24)
        let day = Math.floor(time / 1000 / 60/ 60 / 24 )
        return (day > 0 ? day + '天' : '') + ( hour > 0 ? hour + '小时' : '') + (min > 0 ? min + '分' : '') + (second > 0 ? second + '秒' : '')
      }
    },
    methods: {
      concat () {
        this.$alert('400-8518585', '请拨打电话', {
          confirmButtonText: '确定',
          type: 'info'
        }).then().catch()
      },
      routeTo (opt) {
        if (opt.corporateName) {
          return false
        } else {
          this.$router.push(`/serde/${opt.id}/1`)
        }
      }
    }
  }
</script>
<style scoped>
  .view{
    background:#fff;
    box-sizing:border-box;
  }
  .view .center{
    vertical-align: middle;
    float: none;
    display:inline-block;
  }
  .view_title{
    height: 56px;
    line-height: 56px;
  }
  .view_list{
    border-bottom: 1px solid #f0f0f0;
    padding: 10px;
  }
  .view_list:last-of-type{
    border:none;
  }
  .list_desc{
    font-size:14px;
    margin: 15px 0;
  }
  .subhead{
    margin: 10px 0;
  }
  .subhead.desc{
    margin: 10px 0 10px 15px;
  }
  .list_con {
    margin-left: 15px;
  }
  .list_con p{
    font-size:12px;
  }
  .list_con .el-col{
    line-height:3em;
  }
  .view_list img{
    max-width: 100%;
  }
  .select{
    margin: 15px 0;
  }
  .logo{
    margin-left:15px;
  }
  .tip{
    border: 1px solid #c7000a;
    padding: 5px 8px;
    display: inline-block;
    border-radius: 2em;
  }
</style>
