<template>
  <el-card v-if = 'message'>
    <div class="title text-center" slot = 'header'><div class="fl subhead" @click = 'back'><img src="~assets/gack/arrow_l.png" alt="">返回上一页</div>信息详情</div>
    <div class="subhead">{{ message.mesTitle }} <div class="fr">{{ message.sendTime | time('年-月-日 :') }}</div></div>
    <div class="content" v-html = 'message.mesContent'></div>
    <div class="footer">
      <div class="fr">收件人: {{ message.phone }}</div>
    </div>
  </el-card>
</template>
<script>
  export default {
    data: () => ({
      message: null
    }),
    activated () {
      this.$htAjax.post('https://apitest.gack.citic:8083/guoanmaker/operator/message/getMesToCus', {}, {
        params: {
          id: this.$route.params.id
        }
      }).then(({ data }) => {
        this.message = data.data
      }).catch(error => {
        console.log(error)
      })
    },
    methods: {
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
  .subhead img{width: 10px; margin-right: 10px;}
  .subhead{
    font-size: 14px;
  }
  .footer{
    overflow:hidden;
  }
</style>
