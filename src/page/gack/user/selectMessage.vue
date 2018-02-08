36<template>
  <el-card v-if = 'message'>
    <div class="title text-center" slot = 'header'><div class="fl subhead" @click = 'back'><img src="~assets/images/gack/arrow_l.png" alt="">返回上一页</div>信息详情</div>
    <div class="subhead">{{ message.mesTitle }} <div class="fr">{{ message.sendTime | time('年-月-日 :') }}</div></div>
    <div class="content" v-html = 'message.mesContent' @click = 'routeTo' :class = '{"href": message.url}'></div>
    <el-dialog title="参与抽奖" width ='375px' class="chulaiDasen" :visible.sync="prizeTableVisible" :close-on-click-modal = 'false' @close = 'backTo'>
      <div class="chulaiDasenDiv">
        <iframe :src= '`${prizeUrl}&type=1`' frameborder="0" width = '100%' height="600px"></iframe>
        <div class="chulaiDasenBottom" @click="chulaiDasenBottom"></div>
      </div>
    </el-dialog>
    <div class="footer">
      <div class="fr">收件人: {{ message.phone }}</div>
    </div>
  </el-card>
</template>
<script>
  export default {
    name: 'selectmessage',
    data: () => ({
      message: null,
      prizeTableVisible: false,
      prizeUrl: ''
    }),
    created () {
      this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/message/getMesToCus`, {}, {
        params: {
          id: this.$route.params.id
        }
      }).then(({ data }) => {
        data.data.mesContent = data.data.mesContent
        let arr = data.data.mesContent.split('fadsvjihfandsvoihuibjwtengfdsviuobcv')
        this.message = data.data
        this.message.mesContent = arr[0]
        if (arr[1]) {
          this.message.url = arr[1]
        }
      }).catch(error => {
        console.log(error)
      })
    },
    methods: {
      routeTo () {
        if (this.message.url) {
          this.prizeUrl = this.message.url
          this.prizeTableVisible = true
        }
      },
      backTo () {
        this.prizeTableVisible = false
        this.prizeUrl = ''
      },
      chulaiDasenBottom () {
        this.prizeTableVisible = false
        this.prizeUrl = ''
        this.$router.replace({path:'/user/address',query:{'title':'地址管理'}})
      },
      back () {
        this.$router.push({
          path: '/user/message',
          query: {
            title: '我的消息'
          }
        })
      }
    }
  }
</script>
<style scoped>
  .href >>> {
    color: #007aff;
  }
  .subhead img{width: 10px; margin-right: 10px;}
  .subhead{
    font-size: 14px;
  }
  .footer{
    overflow:hidden;
  }
  .chulaiDasen .chulaiDasenDiv{
    position: relative;
  }
  .chulaiDasen .chulaiDasenDiv .chulaiDasenBottom{
    position: absolute;
    bottom: 26px;
    left: 37%;
    right: 41%;
    height: 38px;
    cursor: pointer;
  }
</style>
