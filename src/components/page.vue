<template>
  <div class="page_box">
    <div :class="['header', fixedTop ? 'fixed' : 'absolute']" ref = 'header'>
      <slot name = 'header'></slot>
    </div>
    <loadding ref = 'loadding' v-if = 'async'>
      loadding...
      <div class="text" slot = 'error'>error</div>
    </loadding>
    <slot></slot>
    <div :class="['footer', {fixed: fixedBottom}, {absolute: flag}]" ref = 'footer'>
      <slot name = footer></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      fixedTop: {
        type: Boolean,
        default: false
      },
      fixedBottom: {
        type: Boolean,
        default: false
      },
      async: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      flag: false
    }),
    created () {
      if (this.async) {
        this.$on('loadding', (res) => {
          if (res) {
            this.$refs.loadding.$emit('loadding', true)
          } else {
            this.$refs.loadding.$emit('loadding')
          }
        })
      }
    },
    methods: {
      init () {
        if (!this.fixedTop) {
          this.$el.style.paddingTop = this.$refs.header.offsetHeight + 'px'
        }
        if (!this.fixedBottom) {
          this.$el.style.paddingBottom = this.$refs.footer.offsetHeight + 'px'
        }
      }
    },
    mounted () {
      this.init()
      this.flag = true
    },
    updated () {
      this.init()
      this.flag = true
    }
  }
</script>
<style scoped>
.page_box{
  min-height:100%;
  min-width: 1200px;
  box-sizing: border-box;
  position:relative;
}
.header{
  width: 100%;
  top:0;
}
.footer{
  width: 100%;
  bottom:0;
}
</style>
