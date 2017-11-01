<template>
    <div class="footer">
        <div class="footerbox">
            <div class="footertop" v-if = 'homePage'>
                <p>
                    友情链接&nbsp;|&nbsp;
                  <a :href="item.url" v-for = 'item in homePage.friendshiplinks' class = 'frend_link'>{{ item.linkName }}</a>
                    <span class="lianxi phone">
                        <img src="../assets/reg/dianhua.png">&nbsp;400-851-8585&nbsp;&nbsp;&nbsp;9am-6pm&nbsp;&nbsp;&nbsp;工作日
                    </span>
                    <span class="lianxi mail">
                        <img src="../assets/reg/youjian.png">&nbsp;
                        <a href="mailto:gackservice@gakj.citic.com">gackservice@gakj.citic.com</a>
                    </span>
                </p>
            </div>
            <div class="footerbottom">
                <p class="copywright">©2017 国安创客投资有限公司 京ICP备17032183号-1 京公网安备110110502033396号</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            msg: '111'
        }
    },
    computed: {
    homePage () {
      return this.$store.state.homePage
    }
  }
}
</script>
<style scoped>
.footer {
    width: 100%;
    height: auto;
    overflow: hidden;
    background-color: #fff;
}
.footer *{
    box-sizing: border-box;
}
.footerbox {
    width: 1200px;
    margin: 0 auto;
}
.footerbox .footertop {
    font-size: 14px;
    color: #5e5e5e;
    text-align: center;
    margin-top: 30px;
}
.footerbox .footertop .frend_link{
  margin: 0 10px;
}
.footerbox .footerbottom {
    font-size: 13px;
    color: #5e5e5e;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 50px;
}
.footerbox .footertop .lianxi {
    margin-left: 60px;
}

</style>
