<template>
  <div class="nav_data_list">
    <div class="nav_li text-center" :class = "{server: !item.serverClasTwo}" :style = "{width: `${100 / navRouteData.length}%`, height: `${Height}px`}" v-for = '(item, key) in navRouteData' :key ='key' @click.self = 'clickTo(item, key)'>
      {{item.serverName}}
      <div class="nav_li_content">
        <el-row>
          <el-col :span = '12' class = "nav_list_span" v-for = '(it, index) in item.serverClasTwo' :key="index" @click.stop.native = 'click(item, key, index)'>
            {{ it.operatorSerTwo.serverName }}
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        Height: null
      }
    },
    updated () {
      this.init()
    },
    mounted () {
      this.init()
    },
    name: 'nav_data_list',
    props: {
      navData: {
        type: Array,
        default: []
      }
    },
    methods: {
      init () {
        this.$nextTick(() => {
          Array.from($(this.$el).find('.nav_li')).forEach(item => {
            let height = item.offsetHeight
            if (!this.Height || this.Height < height) {
              this.Height = height
            }
          })
        })
      },
      click (opt, key, index) {
        this.$emit('changeRouteTab', opt, key, index)
      },
      clickTo (opt, index) {
        if (opt.serverClasTwo && opt.serverClasTwo.length) {
          return false
        }
        this.$emit('clickRouteTab', opt, index)
      }
    },
    computed: {
      navRouteData () {
        return this.navData
      }
    }
  }
</script>
<style scoped>
  .nav_data_list{
    position:absolute;
    background: #fff;
    top:40px;
    left:0;
    width: 100%;
    color: #666;
    border: 1px solid #eee;
    padding: 15px;
    box-sizing: border-box;
  }
  .nav_data_list:after{
    content:'';
    clear: both;
  }
  .nav_li{
    float:left;
    border-right: 1px dashed #999;
    box-sizing: border-box;
    max-width: 200px;
  }
  .nav_li.server:hover{
    color: #ff0000;
  }
  .nav_li:last-child{
    border-right: none;
  }
  .nav_li_content{
    font-size: 12px;
    font-weight: normal;
  }
  .nav_li_content .nav_list_span{
    color: #333;
    transition: color .2s linear;
  }
  .nav_li_content .nav_list_span:hover{
    color: #ff0000;
    transition: color .2s linear;
  }
</style>
