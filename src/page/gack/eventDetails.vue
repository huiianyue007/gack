<template>
  <div class="page">
    <div class="container">
      <el-breadcrumb separator=">" class = 'bread'>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/activity' }">线下活动</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="view" v-if = 'news'>
        <el-row :gutter = '12'>
          <el-col :span = '10'>
            <box-img prop = '6:11' :bgImg = 'news.eventPicUrl'>
            </box-img>
          </el-col>
          <el-col :span = '14'>
            <div class="title">{{ news.eventTitle }}</div>
            <div class="subhead"><img src="~assets/images/gack/hdxq_t.png" alt="">{{ news.eventStartTime | time }} ~ {{ news.eventEndTime | time }}</div>
            <div class="subhead"><img src="~assets/images/gack/hdxq_w.png" alt="">{{ news.eventDetailedAddress }}</div>
            <div class="subhead"><img src="~assets/images/gack/hdxq_p.png" alt="">
              {{news.organizer}}
              <span class="price"  v-if = 'news.isMoney === 1 && news.unitPrice'>[{{ news.unitPrice }} 元/人]</span>
              <span class="price" v-if = 'news.isMoney === 0'>[免费]</span>
            </div>
            <div class="subhead" v-if = 'news.isMoney === 1'>
              选择票价
              <el-button v-for = '(item, key) in news.activityPriceList' :key = 'key' type = 'primary' :plain  = 'activityPriceIndex !== key' @click = 'activityPriceIndex = key'>
                <span style = 'max-width: 60px;display: inline-block' class = 'text-hidden'>{{item.titel}}</span>&nbsp;&nbsp;￥{{ item.price }}元</el-button>
            </div>
            <div class="subhead" v-if = 'news.isMoney === 1'>
              张数确认 <el-input-number v-model="num1" v-bind = 'prop' @change = 'change'></el-input-number> <span class="text-red">最大购买{{ max }}张</span>
            </div>
            <div class="subhead" v-if = 'news.isMoney === 1'>
              说明 {{ news.activityPriceList[activityPriceIndex].infor }}
            </div>
            <!--news.isMoney === 1 && news.state == 5-->
            <el-button class = 'submit' type = 'danger' :disabled = "news.state !== 5" @click = 'submit' v-if = '(!news.enrollment || news.enrollment > news.eventJoinPersonNum) && news.isMoney == 1 && news.state == 5'>确认提交</el-button>
            <el-button class = 'submit' type = 'danger' :disabled = "news.state !== 5" @click = 'submit' v-else-if = '!news.enrollment || news.enrollment > news.eventJoinPersonNum'>{{ news.state | activityStatus(activityType)}}</el-button>
            <el-button class="submit" disabled v-if = 'news.enrollment &&　news.enrollment <= news.eventJoinPersonNum'>报名人数已满</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="oh">
        <div class="fl content">
          <div class="title">活动详情</div>
          <div v-html = 'news.eventInfor' class = 'editorImg'></div>
        </div>
        <div class="fr tip">
          <img src="~assets/images/gack/hdxq_sc.png" alt="" width = '17' height = '16'>这些活动你可能会感兴趣呦！
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'eventdetails',
    data: () => ({
      news: {},
      now: new Date().getTime(),
      num1: 1,
      min:1,
      max: Number.POSITIVE_INFINITY,
      activityPriceIndex: 0,
      activityType: [{
        type: '0',
        title: '活动为发布'
      }, {
        type: '1',
        title: '活动未开始'
      }, {
        type: '2',
        title: '活动已开始'
      }, {
        type: '3',
        title: '活动已结束'
      }, {
        type: '4',
        title: '活动已删除'
      }, {
        type: '5',
        title: '活动报名中'
      }, {
        type: '6',
        title: '报名未开始'
      }, {
        type: '7',
        title: '活动未生效'
      }],
      prop: null
    }),
    watch: {
      activityPriceIndex (val) {
        this.max = this.news.activityPriceList.length ? this.news.activityPriceList[val].maxNum:  this.news.maxPurchaseRestriction || Number.POSITIVE_INFINITY
        this.min = this.news.activityPriceList.length ? this.news.activityPriceList[val].minNum:  this.news.minPurchaseRestriction || 1
        this.num1 = this.min
      }
    },
    filters: {
      time (opt) {
        let date = new Date(opt)
        return date.getFullYear() + '年' + (date.getMonth() + 1) + '月'  + date.getDate() + '日 '+(date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + '时' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + '分'
      },
      activityStatus (opt, val) {
        let ar = val.filter(item => {
          return opt == item.type
        })[0]
        if (ar) {
          return ar.title
        }
      }
    },
    created () {
      this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/eventDetails/getSelectEvent`, {}, {
        params: {
          id: this.$route.params.id
        }
      }).then(({data}) => {
        this.news = data.data
        this.max = data.data.activityPriceList.length ? data.data.activityPriceList[0].maxNum:  data.data.maxPurchaseRestriction || Number.POSITIVE_INFINITY
        this.min = data.data.activityPriceList.length ? data.data.activityPriceList[0].minNum:  data.data.minPurchaseRestriction || 1
      }).catch(error => {
      })
    },
    computed: {
      flag () {
        if (this.news) {
          return this.now > this.news.signupStartTime && this.now < this.news.signupEndTime
        }
      }
    },
    methods: {
      change (val) {
        if (val < this.min) {
          this.$message.error(`最少购买${this.min}张`)
          this.prop = {
            min: this.min
          }
        } else if (val > this.max) {
          this.$message.error(`最多购买${this.max}张`)
          this.prop = {
            max: this.max
          }
        }
        window.setTimeout(() => {
          if (val < this.min) {
            val = this.min
          }
          if (this.max && val > this.max) {
            val = this.max
          }
          this.num1 = parseInt(val)
          this.prop = null
        }, 200)
      },
      submit () {
        if (this.news.state !== 5) return false
        if (!this.$store.state.userid) {
          this.$router.push('/login/0')
          return false
        }
        if (this.news.isMoney == '1') {
          this.$router.push({
            path: '/entryForm',
            query: {
              activityid: this.$route.params.id,
              activityPriceId: this.news.activityPriceList[this.activityPriceIndex].id,
              buyNum: this.num1,
              payMoney:this.news.activityPriceList[this.activityPriceIndex].price * this.num1
            }
          })
        } else {
          this.$router.push({
            path: '/entryForm',
            query: {
              activityid: this.$route.params.id
            }
          })
        }

      }
    }
  }
</script>
<style scoped>
  .page{
    background: #f3f3f3;
  }
  .view{
    background:#fff;
    padding: 15px 20px;
    margin-bottom: 15px;
  }
  .subhead{
    margin-top: 15px;
  }
  .subhead img{
    margin-right: 15px;
  }
  .price{
    color: #f00;
    margin-left: 15px;
  }
  .tip{
    color: #f00;
  }
  .content{
    background: #fff;
    width: 860px;
    box-sizing:border-box;
    padding:0 15px 15px;
  }
  .content img{
    width: 100%;
  }
  .content .title{
    font-size: 16px;
    font-weight: normal;
    height: 46px;
    line-height: 46px;
    margin-bottom: 15px;
    border-bottom: 1px solid #efefef;
  }
  .tip{
    background: #fff;
    width: 310px;
    box-sizing:border-box;
    padding-left: 30px;
    height: 48px;
    line-height: 48px;
  }
  .tip img{
    margin-right: 15px;
  }
  .submit{
    margin-top:35px;
  }
</style>
<style>
  .subhead .el-input-number {
    width: 150px;
  }
 .subhead .el-input-number__decrease {
    right: auto;
    left: 0;
    border-left: 1px solid rgb(165, 134, 131);
    border-right: 1px solid rgb(165, 134, 131);
  }
 .subhead .el-input-number .el-input__inner {
    padding: 0 30%;
    text-align:center;
   overflow:hidden;
   text-overflow: ellipsis;
  }
</style>
