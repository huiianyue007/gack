<template>
  <el-card class = 'appoint' :body-style = '{overflow: "hidden",background: "#f3f3f3"}'>
    <tab-header :tabArr = 'tabList' @changeType = 'change' defaultValue = '1'slot = 'header' class = 'tab_header'></tab-header>
    <!--<el-table :data = 'tableData' v-if = 'activeType == "1"'>-->
      <!--<el-table-column label = '空间名字' prop = 'roomName' align = 'center'></el-table-column>-->
      <!--<el-table-column label = '联系人' prop = 'contactPerson' align = 'center'></el-table-column>-->
      <!--<el-table-column label = '联系电话' prop = 'contactNumber' align = 'center'></el-table-column>-->
      <!--<el-table-column label = '预约人数' prop = 'reserveAmount' align = 'center'></el-table-column>-->
      <!--<el-table-column label = '预约时间' align = 'center'>-->
        <!--<template slot-scope="scope">-->
          <!--<el-icon name="time"></el-icon>-->
          <!--<span style="margin-left: 10px">{{ scope.row.reserveTime | time }}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label = '预约状态' align = 'center'>-->
        <!--<template slot-scope="scope">-->
         <!--{{ scope.row.state === "0" ? '未预约' : '已预约' }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label = '备注' prop = 'remark' align = 'center'></el-table-column>-->
    <!--</el-table>-->
    <div class="no_data_lay" v-if = '!tableData.length'>
      <layout>
      </layout>
    </div>
    <div class="view" v-for = '(item, key) in tableData' :key = 'key'  v-if = 'activeType == "1"' @click = 'routerTo(item)'>
      <div class="view_title">
        <div class="fl">{{ item.roomName }}</div><div class="fr text-red">{{item.state == '0' ? '预约中' : '预约成功'}}</div>
      </div>
      <div class="time">
        <img src="~assets/reg/canguan.png" alt="">
        参观时间
        <span>{{ item.reserveTime | time('.-.- :') }}</span>
      </div>
      <div class="time">
        <img src="~assets/reg/number.png" alt="">
        参观人数
        <span>{{ item.reserveAmount }}</span>
      </div>
      <div class="time">
        <img src="~assets/reg/beizhu.png" alt="">
        备注信息
        <span>{{item.remark}}</span>
      </div>
    </div>
    <router-link class="view" v-for = '(item, key) in tableData' :key = 'key'  v-if = 'activeType == "2"' tag = 'div' :to = '{path: `/user/appcon/${item.id}/yuyue`, query: {title: "我的预约"}}'>
      <div class="view_title">
        <div class="fl">{{ item.eventTitle }}</div><div class="fr text-red" v-if = 'item.isMoney == 1'>{{item.state | activity}}</div><div class="fr text-red" v-if = 'item.isMoney == 0'>报名成功</div>
      </div>
      <div class="time">
        <img src="~assets/reg/canguan.png" alt="">
        活动时间
        <span>{{ item.eventStartTime | time('.-.- :') }}</span>
      </div>
      <div class="time">
        <img src="~assets/reg/dingwei.png" width = '15' alt="">
        活动地点
        <span>{{ item.eventDetailedAddress }}</span>
      </div>
      <div class="view_footer" v-if = 'item.isMoney == 1'>
        <div class="fl">数量: {{ item.buyNum }}</div>
        <div class="fl text-red price">
          支付: {{ item.payMoney }}
        </div>
        <div class="fr">
          <el-button size = 'small' @click.stop = 'cancelOrder(item, "2")'  v-if = 'item.state ==0 '>取消报名</el-button>
          <el-button size = 'small' @click.stop = '$router.push(`/submit-order/${item.id}/activity`)' v-if = 'item.state == 0'>立即支付</el-button>
          <el-button size = 'small' @click.stop = '$router.push(`/eventdetails/${item.activityId}`)' v-if = 'item.state == 2'>再次报名</el-button>
        </div>
      </div>
    </router-link>
    <el-pagination @size-change="handleSizeChange" style="float:right;margin-top:15px;"  @current-change="handleCurrentChange" :page-size='pageSize' :current-page="currentPage" layout="prev, pager, next" :total="totalCount" v-if = 'totalCount'>
    </el-pagination>
  </el-card>
</template>
<script>
  import tabHeader from 'components/tabHeader'
  export default {
    data: () => ({
      tabList: [{
        title: '我的预约',
        type: '1'
      }, {
        title: '活动报名',
        type: '2'
      }],
      pageSize: 5,
      totalCount: 0,
      currentPage: 1,
      activeType: 1,
      tableData: []
    }),
    filters: {
      activity (opt) {
        if (opt == 0) {
          return '未支付'
        } else if (opt == 1) {
          return '已支付'
        } else{
          return '交易关闭'
        }
      }
    },
    mounted () {
      this.init(this.activeType)
    },
    watch: {
      activeType (val) {
        this.tableData = []
        if (this.currentPage == 1) {
          this.init(val)
        } else {
          this.currentPage = 1
        }
      }
    },
    methods: {
      handleSizeChange(val) {
        //pagesize改变时候触发
        this.pageSize = val;
        this.init(this.activeType);
      },
      handleCurrentChange(val) {
        //当前页改变时候触发
        this.currentPage = val;
        //参数1  查询条件 当前页码  当前页显示条数
        this.init(this.activeType);
      },
      init (opt) {
//        'http://172.16.32.123:8080/guoanmaker/operator/activityEnlist/getFenYeEnlistAndCount'
        let url = opt == '1' ? 'https://apitest.gack.citic:8082/guoanmaker/provide/orderform/findSpaceReserve' : 'https://apitest.gack.citic:8083/guoanmaker/operator/activityEnlist/getFenYeEnlistAndCount'
        let data = opt == '1' ? {
          pageSize: this.pageSize,
          pageNumber: this.currentPage -1,
          userid: this.$store.state.userid.id
        } : {
//          userId: '297e58705e7411aa015e7412d25a0000',
          userId: this.$store.state.userid.id,
          page: this.currentPage,
          size: this.pageSize
        }
        this.$htAjax.post(url, {}, {
          params: data
        }).then(({data}) => {
          if (opt == '1') {
            this.totalCount = data.data.totle
            this.tableData = data.data.result
          } else {
            this.totalCount = data.data.count
            this.tableData = data.data.enlistlist
          }
       }).catch(error => {
          console.log(error)
        })
      },
      routerTo (opt) {
        this.$store.commit('setAppoint', opt)
        this.$router.push({
          path: `/user/appcon/${opt.id}/space`,
          query: {
            title: '我的预约'
          }
        })
      },
      change (opt) {
        this.activeType = opt
      },
      cancelOrder (opt, val) {
        this.$htAjax.post('https://apitest.gack.citic:8083/guoanmaker/operator/activityEnlist/updateActivityEnlistState', {
          userId: this.$store.state.userid.id,
          id: opt.id,
          state: val
        }).then(() => {
          this.$set(opt, 'state', val)
          this.$message({
            type: 'success',
            message: '取消报名'
          })
        }).catch(() => {
            if (val == 0) {
              this.$message.error('重新报名失败')
            } else {
              this.$message.error('取消报名失败')
            }
        })
      }
    },
    components: {
      tabHeader
    }
  }
</script>
<style scoped>
  .appoint {
    overflow: hidden;
  }
  .tab_header{
    padding:0 !important;
    margin:0 !important;
  }
  .view{
    overflow:hidden;
    background: #fff;
    color: #999;
    margin-bottom: 15px;
    padding: 15px;
  }
  .view .view_title{
    font-size: 16px;
    overflow:hidden;
  }
  .view .time{
    margin: 15px 0;
  }
  .view .time img {
    margin-right: 5px;
  }
  .view .view_footer{
    overflow: hidden;
    padding-top: 15px;
    border-top: 1px solid #e0e0e0;
  }
  .text-red{
    color: #ff0000;
  }
  .price{
    margin-left: 15px;
  }
</style>
