<template>
  <div class="button" @click = 'scrollTop'>
    <img src="../assets/gack/back.png" alt="">
  </div>
</template>
<script>
  export default {
    methods: {
      scrollTop () {
        $("html,body").animate({ scrollTop: top}, 500);
      }
    }
  }
</script>
<style scoped>
  .button {
    position: fixed;
    right: 0px;
    bottom: 100px;
    z-index: 100;
    cursor: pointer;
  }
</style>
