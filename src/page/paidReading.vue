<template>
  <div class="paid">
    <div class="container">
      <el-breadcrumb separator=">" class = 'bread'>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>付费阅读列表</el-breadcrumb-item>
        <el-breadcrumb-item v-if = 'news'>{{ news.newsTitle }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container news_con" v-if = 'news'>
      <div class="title news">{{ news.newsTitle }}</div>
      <div class="news_views"  v-if = 'payed' v-html = 'news.newsInstruction'>
      </div>
      <div class="news_views"  v-if = '!payed'v-html = 'news.unpayednewsInstruction'>
      </div>
      <div class="text-center" v-if = '!payed'>
        <el-button @click = 'pay'>单篇阅读 10元/条</el-button>
      </div>
    </div>
    <el-dialog title="微信扫描二维码支付" :visible.sync="dialogTableVisible" @close = 'payFlag = false' :close-on-click-modal = 'false'>
      <div class="qr_code">
        <layout>
          <qrcode :val="wxImg" fgColor = '#000' bgColor = '#fff' :size = '256'></qrcode>
        </layout>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import qrcode from 'components/qrcode'
  export default {
    data: () => ({
      news: null,
      dialogTableVisible: false,
      wxImg: '',
      payFlag: false,
      payed: false
    }),
    activated () {
      this.news = require('assets/js/article').default[this.$route.params.id]
      let payed = window.localStorage.getItem('payed')
      if (payed) {
        this.payed = JSON.parse(payed)[this.$route.params.id]
      }
    },
    deactivated () {
      this.payFlag = false
    },
    components: {
      qrcode
    },
    computed: {
      originalId () {
        let originalId = ''
        for (let i =0; i< 31; i++) {
          originalId += '0'
        }
        return originalId + '1'
      }
    },
    methods: {
      pay () {
        let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'],platOrderId = ''
        for (let i = 0; i< 16; i++) {
          platOrderId += arr[Math.floor(Math.random() * 16)]
        }
        this.$tkAjax.get('https://pay.gack.citic/pay.php', {
          params: {
            uid: '8ab3fd56',
            systemCode: '10',
            platOrderId: platOrderId,
            channel: 'wx_pub_qr',
            amount: '1000',
            card_type: '0',
            express_fee: '0',
            originalId: this.originalId,
            companyId: this.originalId,
            companyName: '国安创客',
            companyTitle: '国安创客',
            back_url: '',
            isJava: '1'
          }
        }).then(({ data }) => {
          this.dialogTableVisible = true
          this.wxImg = data.credential.wx_pub_qr
          return Promise.resolve(data.id)
        }).then(async id => {
          this.payFlag = true
          let state = 0
          while (state == 0 && this.payFlag) {
            let res = await this.$tkAjax.get(`https://pay.gack.citic/retrieve.php?pingId=${id}`).catch(error => {
              console.log(error)
            })
            state = res.data
          }
          if (this.payFlag) {
            return Promise.resolve()
          } else {
            return Promise.reject()
          }
        }).then(() => {
          this.dialogTableVisible = false
          this.$message({
            type: 'success',
            message: '支付成功'
          })
          this.payed = true
            let payed = window.localStorage.getItem('payed')
            let arr = [false, false, false, false, false, false, false, false, false, false]
            if (payed) {
              arr = JSON.parse(payed)
            }
            arr[this.$route.params.id] = this.payed
            window.localStorage.setItem('payed', JSON.stringify(arr))
        }).catch(error => {
          this.dialogTableVisible = false
          this.$message({
            type: 'success',
            message: '关闭成功'
          })
        })
      }
    }
  }
</script>
<style scoped>
  .paid{
    background: #f3f3f3;
    padding-bottom: 90px;
  }
  .news_con{
    background: #fff;
    padding: 20px 15px;
    box-sizing:border-box;
  }
  .news, .news_views{
    width:800px;
    margin:20px auto;
  }
  .pay{
    height: 100em;
    overflow:hidden;
  }
  .qr_code {
    width: 256px;
    height: 256px;
    margin: 0 auto;
    position: relative;
  }
</style>
