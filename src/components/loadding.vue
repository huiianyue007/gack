<template>
  <layout v-if = '!loadding || loadding === "error"'>
    <slot v-if = '!loadding'></slot>
    <slot name = 'error' v-if = "loadding === 'error'"></slot>
  </layout>
</template>
<script>
  export default {
    data: () => ({
      loadding: ''
    }),
    created () {
      this.loadding = ''
      this.$on('loadding', (res) => {
        if (res) {
          this.loadding = true
        } else {
          this.loadding = 'error'
        }
      })
    },
    activated () {
      this.loadding = ''
    }
  }
</script>
