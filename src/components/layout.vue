<template>
  <div class="layout">
    <div class="layout_con" :style = 'layStyle' ref = 'lay'>
      <slot>
        <img src="~assets/gack/20171013193051.png" alt="">
      </slot>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      layStyle: ''
    }),
    mounted () {
      this.$nextTick(() => {
        let width = this.$refs.lay.offsetWidth
        let height = this.$refs.lay.offsetHeight
        this.layStyle = {
          'top': `calc(50% - ${height / 2}px)`,
          'left': `calc(50% - ${width / 2}px`
        }
      })
    }
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
  }
  .layout_con img{
    width: 200px;
    height: 200px;
  }
</style>
