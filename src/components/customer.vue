<template>
  <div class="scroll">
    <div class="button" @click = 'scrollTop'>
      <div class="qimoChat" @click = 'zixun'>
        <img src="../assets/images/gack/kefu.png" alt="">
        咨询客服
      </div>
      <img src="../assets/images/gack/back.png" alt="">
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      scrollTop () {
        $("html,body").animate({ scrollTop: top}, 500);
      },
      zixun () {
        _czc.push(["_trackEvent",'咨询客服','咨询']);
        qimoChatClick()
      }
    }
  }
</script>
<style scoped>
  .scroll {
    position: fixed;
    right: 0px;
    bottom: 100px;
    z-index: 100;
    cursor: pointer;
  }
  .qimoChat{
    text-align:center;
    color: #fff;
    padding: 4px;
    box-sizing: border-box;
    width: 40px;
    font-size: 18px;
    margin-bottom: 20px;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    background: #ff5051;
  }
  .qimoChat img{
    margin: 5px 0;
  }
</style>
