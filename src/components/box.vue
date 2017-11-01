<template>
  <div class="box_img">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      prop: {
        type: Number,
        default: 1
      }
    },
    activated () {
      this.$nextTick(() => {
        let width = this.$el.offsetWidth
        this.$el.style.height = width * this.prop + 'px'
      })
    },
    mounted () {
      this.$nextTick(() => {
        let width = this.$el.offsetWidth
        this.$el.style.height = width * this.prop + 'px'
      })
    }
  }
</script>
<style scoped>
  .box_img{
    position:relative;
    overflow:hidden;
  }
  .box_img img{
    min-height: 100%;
    min-width: 100%;
  }
</style>
