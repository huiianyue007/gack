<template>
  <div class="layout">
    <div class="layout_con">
      <slot>
        <img src="~assets/images/gack/20171013193051.png" alt="">
      </slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'layout'
  }
</script>
<style scoped>
  .layout{
    width: 100%;
    height: 100%;
    position:absolute;
    top:0;
    left:0;
  }
  .layout_con{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .layout_con img{
    width: 200px;
    height: 200px;
  }
</style>
