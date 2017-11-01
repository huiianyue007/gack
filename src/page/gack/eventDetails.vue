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
            <box-img :prop = '6/11'>
              <img :src="news.eventPicUrl" alt="">
            </box-img>
          </el-col>
          <el-col :span = '14'>
            <div class="title">{{ news.eventTitle }}</div>
            <div class="subhead"><img src="~assets/gack/hdxq_t.png" alt="">{{ news.eventStartTime | time }} ~ {{ news.eventEndTime | time }}</div>
            <div class="subhead"><img src="~assets/gack/hdxq_w.png" alt="">{{ news.eventDetailedAddress }}</div>
            <div class="subhead"><img src="~assets/gack/hdxq_p.png" alt="">
              {{news.organizer}}
              <span class="price"  v-if = 'news.isMoney === 1'>[{{ news.unitPrice }} 元/人]</span>
              <span class="price" v-if = 'news.isMoney === 0'>[免费]</span>
            </div>
            <el-button class = 'submit' type = 'danger' :disabled = "news.state === 3" @click = 'submit' v-if = '!news.enrollment || news.enrollment > news.eventJoinPersonNum'>{{ news.state | activityStatus(activityType)}}</el-button>
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
          <img src="~assets/gack/hdxq_sc.png" alt="" width = '17' height = '16'>这些活动你可能会感兴趣呦！
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      news: {},
      now: new Date().getTime(),
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
      }]
    }),
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
    activated () {
      this.$htAjax.post('https://apitest.gack.citic:8083/guoanmaker/operator/eventDetails/getSelectEvent', {}, {
        params: {
          id: this.$route.params.id
        }
      }).then(({data}) => {
        this.news = data.data[0]
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
      submit () {
        if (this.news.state !== 5) return false
        if (!this.$store.state.userid) {
          this.$router.push('/login/0')
          return false
        }
        this.$router.push({
          path: '/entryForm',
          query: {
            activityid: this.$route.params.id
          }
        })
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
