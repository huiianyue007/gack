<template>
  <div class="help">
    <el-row class = 'container' v-if = 'allHelp'>
      <el-col :span = '6' class = 'list'>
        <div class="title">
          帮助中心
        </div>
        <div class="cursor li" :class = '{active: activeType === index}' v-for = '(item, index) in allHelp' @click = 'changeType(index)'>
          {{ item.title }}
        </div>
      </el-col>
      <el-col :span = '18' :push = '2' class = 'con' v-if = 'allHelp[activeType]'>
        <div class="con_padding con_title">
          {{ allHelp[activeType].questionTitle }}
        </div>
        <div class="con_padding con_desc" v-html = 'allHelp[activeType].questionContent'>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data: () => ({
      activeType: 0,
      allHelp: null
    }),
    created () {
      this.$htAjax.post('https://apitest.gack.citic:8083/guoanmaker/operator/help/getAllHelp').then(({data}) => {
        this.allHelp = data.data
      }).catch(error => {
      })
    },
    methods: {
      changeType (opt) {
        this.activeType = opt
      }
    }
  }
</script>
<style scoped>
  .help{
    background:#f3f3f3;
    min-height:100vh;
  }
  .container{
    overflow:hidden;
    padding: 15px 0;
  }
  .list{
    width: 170px;
    background: #fff;
    text-align:center;
  }
  .list .title{
    line-height:89px;
    font-weight: normal;
    border-bottom: 1px solid #eee;
  }
  .list .li{
    line-height:35px;
  }
  .con{
    background: #fff;
    padding: 0 1em;
    font-size:12px;
    min-height: 600px;
    box-sizing: border-box;
  }
  .con_title{
    border-bottom: 1px dashed #eee;
    line-height: 2em;
    font-size:16px;
  }
  .con_padding{
    padding: 10px 1em;
  }
  .con_desc{
    padding: 10px 15px;
  }
  .active{
    background:#f00;
    color:#fff;
  }
</style>
