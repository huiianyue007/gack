<template>
  <div class="coupon">
    <tab-header :tabArr = 'tabArr' :defaultValue = 'tabArr[0].type' @changeType = 'changeType'></tab-header>
    <div class="view">
      <el-table :data = 'activeTypeList'>
        <el-table-column label = '优惠券名称' prop = 'couponsname'></el-table-column>
        <el-table-column label = '优惠券额度' prop = 'quota'></el-table-column>
        <!--<el-table-column label = '所属平台' prop = 'platform'></el-table-column>-->
        <!--<el-table-column label = '适用范围' prop = 'range'></el-table-column>-->
        <!--<el-table-column label = '领取时间' :width = '200' prop = 'time'></el-table-column>-->
        <el-table-column label = '有效期至' prop = 'expiredTime'></el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" style="float:right;margin-top:15px;"  @current-change="handleCurrentChange" :page-size='pagesize' :current-page="currentPage" layout="prev, pager, next" :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import tabHeader from 'components/tabHeader'
  export default {
    data: () => ({
      activeType: 'available',
      tabArr: [{
        title: '可使用的优惠券',
        type: 'available'
      }, {
        title: '已使用/已过期的优惠券',
        type: 'expired'
      }],
      activeTypeList: [],
      couponData: [],
      pagesize: 8,
      currentPage: 1,
      totalCount: 0
    }),
    components: {
      tabHeader
    },
    activated () {
      if (this.user) {
        this.getCoupon()
      }
    },
    watch: {
      user (val) {
        if (val) {
          this.getCoupon()
        }
      },
      activeType () {
        this.getCoupon()
      }
    },
    methods: {
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
      getCoupon () {
        let date = new Date().getTime()
        this.$htAjax.post('https://apitest.gack.citic:8081/guoanmaker/personal/orderform/findCouponsByPage', {}, {
          params: {
            userid: this.$store.state.userid.id,
            pageNumber: this.currentPage -1,
            pageSize: this.pagesize
          }
        }).then(({data}) => {
          this.totalCount = data.data.totle
          this.couponData = data.data.result.map(item => {
            if (item.couponstype === '1') {
              item.quota = `满${item.fullamount}减${item.subamount}`
            } else if (item.couponstype === '0') {
              item.quota = `直减${item.subamount}`
            } if (item.couponstype === '2') {
              item.quota = `${item.subamount * 10}折价`
            }
            item.expiredTime = this.translateTime (item.endCouponstime)
            return item
          })
          this.activeTypeList = this.couponData.filter(item => {
            let flag = item.isUsed == '0'
            if (this.activeType === 'available') {
              return flag
            } else if (this.activeType === 'expired') {
              return !flag
            }
          })
        }).catch(error => {
          console.log(error)
        })
      },
      translateTime (opt) {
        let date = new Date(opt)
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-'  + date.getDate()
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
</style>
