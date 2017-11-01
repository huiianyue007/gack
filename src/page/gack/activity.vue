<template>
  <div class="page">
    <div class="container">
      <el-breadcrumb separator=">" class = 'bread'>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>线下活动</el-breadcrumb-item>
      </el-breadcrumb>
      <div class = 'active_type'>
        <div class = 'fl active_li' v-for = '(item, key) in arr' :key = 'key' :class = '{active: activeIndex === item.typeName || (activeIndex === item.id)}' @click = 'changeIndex(item.typeName)'><div class="grid-content bg-purple-light">{{ item.typeName }}</div></div>
      </div>
      <ul class="content">
        <li class="fl content_li" v-for = 'item in dataArr' v-if = 'dataArr.length > 0' @click = '$router.push("/eventdetails/" + item.id)'>
          <div class="img" v-if = 'item.eventPicUrl'>
            <box-img :prop = '6/11'>
              <img :src="item.eventPicUrl" alt="">
            </box-img>
            <div class="tip" :class = '{"active": item.state !== 3}'>{{ item.state | activityStatus(activityType)}}</div>
          </div>
          <div class="con">
            <h3 class = 'text-hidden'>{{item.eventTitle}} <span class="subhead tip">{{item.isMoney === 0 ? '免费' : ''}}</span></h3>
            <div class="desc"><img src="~assets/gack/pxpt_icon.png" alt=""><span class="inline-block text-hidden address">{{ item.organizer }}</span></div>
            <div class="desc"><img src="~assets/gack/px_time.png" alt="">{{ item.eventStartTime | time('年-月-日 :') }}</div>
            <div class="desc"><img src="~assets/gack/px_wz.png" alt=""><span class="inline-block text-hidden address">{{item.eventDetailedAddress}}</span></div>
          </div>
        </li>
      </ul>
      <div class="no_data_lay" v-if = '!dataArr.length'>
        <layout>
        </layout>
      </div>
      <el-button class="block more" @click = 'loaddMore' v-if = 'loaddingMore && dataArr.length > 0'>加载更多</el-button>
      <div class="text-center no_data" v-if = '!loaddingMore && dataArr.length > 0'>暂无更多数据</div>
    </div>
  </div>
</template>
<script>
  export default {
    filters: {
      compareTime (opt) {
        let date = new Date()
        return opt > date.getTime()
      },
      time (opt) {
        let date = new Date(opt)
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-'  + date.getDate() + ' '+(date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + '时' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + '分'
      },
      activityStatus (opt, val) {
        return val.filter(item => {
          return opt == item.type
        })[0].title
      }
    },
    computed: {
      now () {
        return new Date().getTime()
      }
    },
    data () {
      return {
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
        loaddingMore: true,
        arr: [{
          typeName: '全部活动',
          id: 'all'
        }],
        activeIndex: 'all',
        dataArr: [],
        page: 1,
      }
    },
    activated () {
      this.dataArr = []
      this.arr = [{
        typeName: '全部活动',
        id: 'all'
      }]
      this.getNews({
        id: this.activeIndex,
        page: 1
      })
      this.page = 1
      this.$htAjax.get('https://apitest.gack.citic:8083/guoanmaker/operator/activityType/getAllActivityType').then(({data}) => {
        this.arr = this.arr.concat(data.data.filter(item =>{
          return item.state !== 0 && item.state !== 4
        })).filter(item => {
          return item.typeName !== '抽奖'
        })
      }).catch(error => {
      })
    },
    watch: {
      activeIndex (val) {
        this.page = 1
        this.dataArr = []
        this.getNews({
          id: val,
          page: 1
        })
      }
    },
    methods: {
      loaddMore () {
        if (!this.loaddingMore) return false
        this.page++
        this.getNews({
          page: this.page,
          id: this.activeIndex
        })
      },
      getNewsType () {
        this.$htAjax.post('')
      },
      getNews (opt) {
        let url = opt.id === 'all' ? 'https://apitest.gack.citic:8083/guoanmaker/operator/eventDetails/getAppAndIosAndPcOperatorEventDetailsAll' : 'https://apitest.gack.citic:8083/guoanmaker/operator/eventDetails/getselectByEventId'
        let data = {
          EventType: 1,
          page: opt.page,
          size: 16
        }
        if (opt.id !== 'all') {
          data.id = opt.id
        }
        this.$htAjax.post(url, {}, {
          params: data
        }).then(({ data }) => {
          if (data.data.cuont.length < 16) {
            this.loaddingMore = false
          } else {
            this.loaddingMore = true
          }
          this.dataArr = this.dataArr.concat(data.data.cuont)
        }).catch(() => {
          this.loaddingMore = false
        })
      },
      changeIndex (index) {
        if (index == '全部活动') {
          this.activeIndex = 'all'
        } else {
          this.activeIndex = index
        }
      }
    }
  }
</script>
<style scoped>
  .page{
    background: #f3f3f3;
    padding-bottom: 40px;
  }
  .container{
    overflow:hidden;
  }
  .el-row{
    background:#fff;
    padding: 20px 0 21px;
  }
  .el-col-2 {
    text-align:center;
    border-radius: 20px;
    font-size: 16px;
    color: #777777;
    cursor: pointer;
    height: 34px;
    line-height: 32px;
    margin-right: 15px;
  }
  .active{
    color: #fff;
    background: #FF4F51;
  }
  .content li{
    width:25%;
    background:#fff;
    background-clip: content-box;
    padding: 10px;
    box-sizing:border-box;
  }
  .content li:hover h3{
    color: #f67;
  }
  .content li:hover .con{
    box-shadow: -1px 5px 8px rgba(0,0,0,0.1);
  }
  .content li:hover .con .subhead.tip{
    color: #f00;
  }
  .content {
    overflow:hidden;
  }
  .content li img {
    max-width: 100%;
  }
  .content li .con {
    padding: 8px 14px 24px;
  }
  .content li .con h3{
    font-weight: normal;
    font-size: 16px;
    overflow: hidden;
    line-height: 24px;
    margin-bottom: 6px;
  }
  .content li .con .desc{
    font-size: 12px;
    color: #777777;
    line-height: 26px;
  }
  .content li .con .desc .address {
    width: 200px;
    vertical-align: middle;
  }
  .content li .con .desc img{
    display:inline-block;
    vertical-align: middle;
    margin: 0 6px 2.5px 0;
  }
  .page .more{
    margin-top: 20px;
  }
  .img{
    position: relative;
  }
  .img .tip{
    position:absolute;
    right:0;
    bottom:0;
    width: 75px;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    color: #fff;
    background:#939599;
    text-align: center;
  }
  .img .tip.active{
    background:#FF4F51;
  }
  .active_type{
    overflow: hidden;
    width: 100%;
    background: #fff;
    padding: 10px;
  }
  .active_li{
    margin: 0 10px;
    padding: 8px 10px;
    font-size: 14px;
    min-width: 80px;
    text-align:center;
    cursor: pointer;
    border-radius: 40px;
  }
</style>
