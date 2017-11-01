<template>
  <div class="card" :style = 'bodyStyle'>
    <div class="card_title">
      <slot name="header"></slot>
    </div>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['bodyStyle']
  }
</script>
<style scoped>
  .card{
    background:#fff;
    padding: 15px 24px;
  }
  .card_title{
    padding-bottom: 15px;
    border-bottom: 1px solid #e0e0e0;
  }
  .body{
    padding-top: 15px;
  }
</style>
