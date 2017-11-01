<template>
  <div class="empty">
    <div class="content" ref = 'content'>
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    mounted () {
    }
  }
</script>
<style scoped>
  .empty{
    width:100%;
    height: 100%;
    position: relative;
  }
  .empty .content{
    position:absolute;
  }
</style>
