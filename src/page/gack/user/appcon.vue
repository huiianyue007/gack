<template>
  <div class="app_con">
    <div class="app" @click = '$router.go(-1)'><img src="~assets/images/gack/arrow_l.png" alt=""> 返回上一页</div>
    <el-card class="app_content" v-if = '$route.params.type == "space" && appoint'>
      <div class="app_title" slot = 'header'>
        <div class="fl">{{ appoint.roomName }}</div>
        <div class="fr text-red">{{ appoint.state == '0' ? '预约中' : '预约成功' }}</div>
      </div>
      <div class="time">
        <div class="inline-block label">联系人</div><p class="inline-block text-hidden">{{ appoint.contactPerson }}</p>
      </div>
      <div class="time">
        <div class="inline-block label">联系电话</div><p class="inline-block text-hidden">{{ appoint.contactNumber }}</p>
      </div>
      <div class="time">
        <div class="inline-block label">参观时间</div><p class="inline-block text-hidden">{{ appoint.reserveTime | time('.-.-') }}</p>
      </div>
      <div class="time">
        <div class="inline-block label">创建时间</div><p class="inline-block text-hidden">{{ appoint.createTime | time('.-.-') }}</p>
      </div>
      <div class="time">
        <div class="inline-block label">参观人数</div><p class="inline-block text-hidden">{{ appoint.reserveAmount }}</p>
      </div>
      <div class="time">
        <div class="inline-block label">需求描述</div><p class="word-break inline-block" style = 'vertical-align:top;width: calc(100% - 7em)'>{{ appoint.remark }}</p>
      </div>
    </el-card>
    <el-card v-if = '$route.params.type === "yuyue" && orderInfo' class = 'view'>
      <div class="app_title" slot = 'header'>
        <div class="fl">{{ orderInfo.eventTitle }}</div>
        <div class="fr text-red" v-if = 'orderInfo.isMoney == 1'>{{ orderInfo.state | activity }}</div>
        <div class="fr text-red" v-if = 'orderInfo.isMoney == 0'>报名成功</div>
      </div>
      <div class="view_con">
        <div class="fl label">报名人</div>
        <div class="fl view_input">{{orderInfo.linkMan}}</div>
      </div>
      <div class="view_con">
        <div class="fl label">联系电话</div>
        <div class="fl view_input">{{orderInfo.telePhone}}</div>
      </div>
      <div class="view_con">
        <div class="fl label">活动时间</div>
        <div class="fl view_input">{{orderInfo.eventStartTime | time('年-月-日 :')}}</div>
      </div>
      <div class="view_con">
        <div class="fl label">活动地点</div>
        <div class="fl view_input">{{orderInfo.eventDetailedAddress}}</div>
      </div>
      <div class="view_con">
        <div class="fl label">创建订单时间</div>
        <div class="fl view_input">{{orderInfo.buildTime | time('年-月-日 :')}}</div>
      </div>
      <div class="view_con" v-if = 'orderInfo.isMoney == 1'>
        <div class="fl">数量: {{ orderInfo.buyNum }}</div>
        <div class="fl text-red price">
          支付: {{ orderInfo.payMoney }}
        </div>
        <div class="fr">
          <el-button size = 'small' @click.stop = 'cancelOrder("2")'  v-if = 'orderInfo.state ==0 '>取消报名</el-button>
          <el-button size = 'small' @click.stop = '$router.push(`/submit-order/${orderInfo.id}/activity`)' v-if = 'orderInfo.state == 0'>立即支付</el-button>
          <el-button size = 'small' @click.stop = '$router.push(`/eventdetails/${orderInfo.id}`)' v-if = 'orderInfo.state == 2'>再次报名</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
  export default {
    name: 'appcon',
    data: () => ({
      orderInfo: null
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
    created () {
      if (this.$route.params.type == 'yuyue') {
        this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/activityEnlist/getActivityEnlist`, {}, {
          params: {
            Id: this.$route.params.id
          }
        }).then(({ data }) => {
          this.orderInfo = data.data
        }).catch(error => {
          console.log(error)
        })
      } else if (this.$route.params.type == 'space' && !this.appoint) {
        this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/orderform/findSpaceReserveById`, {}, {
          params: {
            id: this.$route.params.id
          }
        }).then(({data}) => {
          this.$store.commit('setAppoint', data.data)
        }).catch(error => {
        })
      }
    },
      computed: {
        appoint () {
          if (this.$route.params.type == 'space') {
            return this.$store.state.appoint
          }
        }
      },
    methods: {
      cancelOrder (val) {
        this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/activityEnlist/updateActivityEnlistState`, {
          userId: this.$store.state.userid.id,
          id: this.orderInfo.id,
          state: val
        }).then(() => {
          this.orderInfo.state = val
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
    }
  }
</script>
<style scoped>
  .app{
    margin-bottom: 10px;
  }
  .app_title{
    font-size: 16px;
    overflow:hidden;
  }
  .app_title .app{
    margin-right: 15px;
  }
  .text-red{
    color: #ff0000;
    font-size: 14px;
  }
  .time{
    padding: 15px 0;
  }
  .time:nth-of-type(4) {
    border-top: 1px solid #e0e0e0;
  }
  .time .label{
    margin-right: 15px;
    width: 80px;
  }
  .time .inline-block{
    vertical-align: middle;
  }
  .view_con{
    overflow:hidden;
    padding: 15px;
    font-size: 14px;
  }
  .view_con .label{
    width: 100px;
  }
  .view .view_footer{
    overflow: hidden;
    padding-top: 15px;
    font-size: 14px;
  }
  .price{
    margin-left: 15px;
  }
</style>
