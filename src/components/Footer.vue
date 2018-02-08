<template>
  <div class="footer">
    <div class="container content">
      <div class="fl">
        <p>
          <router-link to="/about">关于我们</router-link>
          <span>|</span>
          <router-link to="/concat">联系我们</router-link>
          <span>|</span>
          <router-link to="/help">帮助中心</router-link>
          <span>|</span>
          <router-link :to="{path: '/user/feedback', query: {title: '问题反馈'}}">问题反馈</router-link>
          <span>|</span>
          <router-link to="/rule">规则中心</router-link>
        </p>
        <p v-if = 'homePage'>
          <span style="margin-right:20px;margin-left:0">友情链接</span>
          <a :href="item.url" v-for = 'item in homePage.friendshiplinks'>{{ item.linkName }}</a>
        </p>
      </div>
      <div class="fr">
        <p>&copy;&nbsp;2017国安创客（北京）科技有限公司</p>
        <p>京公网安备110110502033396号</p>
        <p>京ICP备17032183号-1</p>
      </div>
      <div class="fr img">
        <img src="~assets/images/gack/ewm1.png" alt="">
        <img src="~assets/images/gack/ewm.jpg" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    computed: {
      homePage () {
        return this.$store.state.homePage
      }
    }
  }
</script>
<style scoped>
  .footer{
    background: #000;
    color: #CBCBCC;
    padding: 33px 0 45px;
    font-size:12px;
  }
  .footer p {
    font-size:12px;
  }
  .footer .content{
    overflow:hidden;
  }
  .footer .content .fl p:last-child{
    margin-top:26px;
  }
  .footer .content .fl p {
    color:#CBCBCC;
  }
  .footer .content .fl p:last-child a,.footer .content .fl p:last-child span{
    margin-right:15px;
  }
  .footer .content .fl p span{
    margin: 0 10px;
  }

  .footer .content .fr.img{
    margin-right: 50px;
  }
  .footer .content .fr p:nth-of-type(2) {
    margin: 5px 0;
  }
  .footer .content .fr{
    text-align:right;
  }
  .footer .content .fr p{
    color: #cbcbcb;
  }
  .footer .content .fr img{
    width:73px;
    height:73px;
    margin-left:30px;
  }
</style>
