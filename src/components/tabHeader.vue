<template>
  <div class="row">
    <div class="fl order_title" :class = '{active: activeType === item.type}' v-for = "(item,key) in tabArr" :key = 'key' @click = "change(item.type)">
      {{ item.title }}
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      activeType: 'all'
    }),
    mounted () {
      if (this.defaultValue) {
        this.activeType = this.defaultValue
      }
      this.$on('changeTab', (opt) => {
        if (!this.allow) {
          return false
        }
        this.activeType = opt
      })
    },
    methods: {
      change (opt) {
        if (!this.allow) {
          return false
        }
        this.activeType = opt
        this.$emit('changeType', opt)
      }
    },
    props: {
      tabArr: {
        type: Array,
        default:[]
      },
      defaultValue: {
        type: String,
        default: 'all'
      },
      allow: {
        type: Boolean,
        default: true
      }
    }
  }
</script>
<style scoped>
  .content{
    background: #ff0000;
  }
  .row{
    background: #fff;
    overflow:hidden;
    margin-bottom: 20px;
    padding: 20px;
  }
  .el-col{
    text-align:center;
    cursor: pointer;
  }
  .order_title{
    display: inline-block;
    padding: 0 14px;
    cursor: pointer;
    box-sizing:border-box;
    border-radius: 17px;
    margin-left: 10px;
    height: 34px;
    font-size:14px;
    line-height: 32px;
  }
  .order_title:first-child {
    margin: 0;
  }
  .active{
    background:#FF4F51;
    color: #fff;
  }
</style>
