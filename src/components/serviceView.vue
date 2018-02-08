<template>
  <div class="view">
    <div class="view_list cursor" v-for = 'item in listData'  @click = 'routeTo(item)' v-if = 'flag'>
      <el-row>
        <el-col :span = '8'>{{item.commodityName }}</el-col>
        <el-col :span = '8' class ="subhead list_desc">{{item.desc}}</el-col>
      </el-row>
      <el-row>
        <el-col :span = '22'>
          <el-row class = 'list_con'>
            <el-col :span = '8'>
              <p>开课时间: {{ item.registrationStartTime | time }}</p>
              <p>开课地点: {{ item.companyCity }}</p>
              <p class = 'text-hidden'>关键字: {{ item.synopsis }}</p>
            </el-col>
            <el-col :span = '8'>
              <p>课程时长: {{ (item.registrationEndTime - item.registrationStartTime) | duration }}</p>
            </el-col>
            <el-col :span = '8'>
              <p>价格: ￥{{ item.finalPrice }}</p>
              <p>课程分类: {{ item.serverName }}</p>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span = '2'>
          <el-button size = 'small'>课程详情</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="view_list cursor" v-if = '!flag' v-for = '(item, key) in listData' :key = 'key' @click = 'routeTo(item)'>
      <el-row>
        <el-col :span = '4'>
          <box-img :bgImg = 'item.picture' :cover = 'false' prop = '2:3'></box-img>
        </el-col>
        <el-col :span = '!item.corporateName ? 16 : 20'>
          <el-row :gutter = '6'>
           <div class="oh logo">
             <div :class="{fl: item.corporateName}">
               <p>{{ item.companyProject || item.name }}</p>
               <div class="subhead" v-if = 'item.business'><img src="~assets/images/reg/job.png" alt="" height = '15'> {{ item.business }}</div>
               <div v-if = 'item.corporateName' class = 'tip'>{{ item.corporateName }}</div>
             </div>
             <div class="fr" v-if = 'item.corporateName'>
               <el-button type = 'primary'@click = 'concat'>联系TA</el-button>
             </div>
           </div>
           <p class="list_desc" :class = '{"text-hidden": !item.corporateName, "subhead": !item.corporateName, "desc": !item.corporateName, "logo": item.corporateName}'>{{ item.introduction }}</p>
          </el-row>
          <el-row class = 'list_con' v-if = 'item.round'>
            <el-col :span = '5' v-if = 'item.round '><p>轮次: {{ item.round }}</p></el-col>
            <el-col :span = '13'><p>{{ item.financingDemand }}</p></el-col>
            <el-col :span = '6' v-if = 'item.address'><p>所在城市: {{ item.address }}</p></el-col>
          </el-row>
        </el-col>
        <el-col :span = '2' :push = '1' v-if = '!item.corporateName'>
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
          this.$router.push(`/serde/${opt.id}/${this.flag ? '1' : '2'}`)
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
    margin: 40px 0;
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
