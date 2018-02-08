<template>
  <div class="coupon" v-loading="loadingTab">
    <tab-header :tabArr = 'tabArr' :defaultValue = 'tabArr[0].type' @changeType = 'changeType'></tab-header>
    <div class="view">
      <el-select v-model="orderBy" v-if = 'couponData.length'>
        <el-option label="按时间领取" value="1"></el-option>
        <el-option label="按到期时间" value="2"></el-option>
      </el-select>
      <p v-else>
        <span v-if="activeType == 'available'">您当前没有可用的优惠券</span>
        <span v-if="activeType == 'used'">您当前没有已使用的优惠券</span>
        <span v-if="activeType == 'dated'">您当前没有过期的优惠券</span>
      </p>
      <!--<el-table :data = 'couponData'>
        <el-table-column label = '优惠券名称' prop = 'couponsname'></el-table-column>
        <el-table-column label = '优惠券额度' prop = 'quota'></el-table-column>-->
        <!--<el-table-column label = '所属平台' prop = 'platform'></el-table-column>-->
        <!--<el-table-column label = '适用范围' prop = 'range'></el-table-column>-->
        <!--<el-table-column label = '领取时间' :width = '200' prop = 'time'></el-table-column>-->
        <!--<el-table-column label = '有效期至' prop = 'expiredTime'></el-table-column>
        <el-table-column label = '状态' prop = 'isUsed' v-if = 'activeType == "expired"'></el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" style="float:right;margin-top:15px;"  @current-change="handleCurrentChange" :page-size='pagesize' :current-page="currentPage" layout="prev, pager, next" :total="totalCount">
      </el-pagination>-->
      <el-row :gutter = '20' >
        <el-col :span="8" v-for="(item,index) in couponData" :key="index" class = 'box_list'>
            <div @click="clickquery(item,index)">
              <el-row :class="{box: activeType == 'available', box_1: activeType== 'used',  box_2: activeType== 'dated'}">
                <el-col :span="20">
                <div class="box1">
                  <h2>￥{{item.subamount}}</h2>
                  <p>使用类型 : {{item.servername}}</p>
                  <p>截止日期 : {{item.expiredTime}}</p>
                  <p>使用条件 : {{item.quota}}</p>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="box2" >
                  <span v-html="text"></span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-pagination @size-change="handleSizeChange" style="float:right;margin-top:15px;"  @current-change="handleCurrentChange" :page-size='pagesize' :current-page="currentPage" layout="prev, pager, next" :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import tabHeader from 'components/tabHeader'
  export default {
    name: 'coupon',
    data: () => ({
      text: '',
      activeType: 'available',
      tabArr: [{
        title: '未使用',
        type: 'available'
      }, {
        title: '已使用',
        type: 'used'
      },{
        title: '已过期',
        type: 'dated'
      }],
      activeTypeList: [],
      couponData: [],
      pagesize: 9,
      currentPage: 1,
      totalCount: 0,
      orderBy: '1',
      loadingTab: false,
      tab: false
    }),
    components: {
      tabHeader
    },
    created () {
      if (this.user) {
        this.getCoupon()
        this.getTotal()
      }
    },
    watch: {
      user (val) {
        if (val) {
          this.getCoupon()
        }
      },
      activeType () {
        this.currentPage = 1
        this.getCoupon()
      },
      orderBy () {
        this.currentPage = 1
        this.getCoupon()
      }
    },
    methods: {
      clickquery(item,index){
        if(this.activeType == 'available'){
          if(this.couponData[index].servername == '全平台'){
            this.$router.push('/')
          }else{
            this.$router.push({path:'/service',query:{id0:item.serverid,serverName0:item.servername}})
          }
        }
      },
      getTotal(){
        this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/orderform/findAllTypeCouponsCountbyuserid`, {}, {
          params: {
            userid: this.$store.state.userid.id,
            // userid: '8aaf0aab5fbd85d7015fbf004ac90049'
          }
        }).then(({data}) => {
          this.tabArr[0].title = '未使用 ( ' + (data.data.useableNum !== 'null' ? data.data.useableNum : '0') + ' )'
          this.tabArr[1].title = '已使用 ( ' + (data.data.usedNum !== 'null' ? data.data.usedNum :  '0') + ' )'
          this.tabArr[2].title = '已过期 ( ' + (data.data.expiredNum !== 'null'? data.data.expiredNum : '0') + ' )'
        }).catch(error => {
          console.log(error)
        })
      },
      handleSizeChange(val) {
        //pagesize改变时候触发
        this.pagesize = val;
        this.getCoupon();
      },
      handleCurrentChange(val) {
        //当前页改变时候触发
        this.currentPage = val;
        //参数1  查询条件 当前页码  当前页显示条数
        this.getCoupon();
      },
      getCoupon (num) {
        this.couponData = []
        let url = ''
        var orders = '';
        if (this.activeType === 'available') {
          url = `${this.$config.gack}/guoanmaker/personal/orderform/findCouponsByPage`
          this.text = '立<br/>即<br/>使<br/>用'
//          if(!num){
//            this.orderBy = '1'
//            orders = ''
//          } else {
//            orders = this.orderBy
//          }
        } else if (this.activeType === 'used') {
          url = `${this.$config.gack}/guoanmaker/personal/orderform/findUsedCouponsByPage`
          this.text = '已<br/>使<br/>用'
//          if(!num){
//            this.orderBy = '1'
//            orders = ''
//          } else {
//            orders = this.orderBy
//          }
        } else if (this.activeType === 'dated') {
          url = `${this.$config.gack}/guoanmaker/personal/orderform/findExpiredCouponsByPage`
          this.text = '已<br/>过<br/>期'
//          if(!num){
//            this.orderBy = '2'
//            orders = ''
//          } else {
//            if(this.orderBy == '1'){
//              orders = '2'
//            }else if(this.orderBy == '2'){
//              orders = '1'
//            }
//          }
        }
        this.loadingTab = true
        this.$htAjax.post(url, {}, {
          params: {
            userid: this.$store.state.userid.id,
            // userid: '8aaf0aab5fbd85d7015fbf004ac90049',
            pageNumber: this.currentPage -1,
            pageSize: this.pagesize,
            orderBy: this.orderBy
          }
        }).then(({data}) => {
          this.tabArr.title = this.tabArr.title + '(' + data.data.totle + ')'
          this.totalCount = data.data.totle
          this.couponData = data.data.result.map(item => {
            if (item.couponstype === '1') {
              item.quota = `满${item.fullamount}使用`
            } else if (item.couponstype === '0') {
              item.quota = `直减${item.subamount}`
            } if (item.couponstype === '2') {
              item.quota = `${item.subamount * 10}折价`
            }
            item.expiredTime = this.translateTime (item.endCouponstime)
            return item
          })
          this.loadingTab = false
        }).catch(error => {
          this.loadingTab = false
          console.log(error)
        })
      },
      translateTime (opt) {
        let date = new Date(opt)
        return date.getFullYear() + '.' + (date.getMonth() + 1) + '.'  + date.getDate()
      },
      changeType (opt) {
        this.activeType = opt
      }
    }
  }
</script>
<style scoped>
  .view{
    padding: 15px;
    background:#fff;
    overflow:hidden;
  }
  .box{
    overflow: hidden;
  }

  .box1{
    color:#fff;
    padding: 30px 0 10px 20px;
  }
  .box .box1{background:rgba(199,0,10,.25);}
  .box_1 .box1{background:rgba(51,51,51,.25);}
  .box_2 .box1{background:rgba(102,102,102,.25);}
  .box1 h2{
    font-size: 48px;
    color:#fff;
    margin-bottom: 21px
  }
  .box1 p{
    color:#fff;
    font-size: 12px;
  }
  .box2 span{
    margin-top: 38px;
    display: inline-block;
  }
  .box2{
    height: 157px;
    text-align: center;
    font-size: 18px;
    color:#fff;
  }
  .box .box2{background:rgba(199,0,10,1);}
  .box_1 .box2{background:rgba(51,51,51,1)}
  .box_2 .box2{background:rgba(102,102,102,1);}
  .box_list{
    margin: 10px 0;
  }
  .box_2:hover{
    background:rgba(102,102,102,.5);
  }
  .box:hover{
    background:rgba(199,0,10,.5)
  }
  .box_1:hover{
    background:rgba(51,51,51,.5)
  }

</style>
