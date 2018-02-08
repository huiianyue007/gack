<template>
  <div class="nav_box">
    <div class="nav_list">
      <ul class="nav nav_title">
        <li v-for = '(item, key) in navList' :key = 'item.title'>
          {{ item.title }}
          <div class="nav_content">
            <div class="nav_li" v-for = '(it, index) in navListData[key]' :key = 'index'>
              <div class="nav_li_title">
                {{ it.serverName }}
              </div>
              <div class="nav_li_content">
                <span v-for = '(obj, k) in it.serverClasTwo' @click = 'select(it, k)'>{{ obj.operatorSerTwo.serverName }}</span>
              </div>
            </div>
            <box-img class="bottom-img" v-if = 'navListData[key].length == 1' :bgImg="require('assets/images/gack/bottomImg.png')" prop="42:168"></box-img>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['navData', 'imgData', 'title', 'index'],
    data () {
      return {
        navList: [{
          title: '工商/财务'
        }, {
          title: '品牌/营销'
        }, {
          title: 'IT服务'
        }, {
          title: '企业/行政'
        }, {
          title: '人力服务'
        }, {
          title: '法律/知识产权'
        }]
      }
    },
    computed: {
      navListData () {
        let navListData = []
        for (let i = 0; i <= 6; i++) {
          navListData.push([])
        }
        this.navData.forEach(item => {
          if (item.serverName == '工商服务' || item.serverName == '财税服务') {
            navListData[0].push(item)
          } else if (item.serverName == '品牌创意服务' || item.serverName == '营销推广服务') {
            navListData[1].push(item)
          } else if (item.serverName == 'IT服务' || item.serverName == '联想通道') {
            navListData[2].push(item)
          } else if (item.serverName == '企业咨询服务' || item.serverName == '企业咨询' || item.serverName == '行政服务') {
            navListData[3].push(item)
          } else if (item.serverName == '人力服务' || item.serverName == '软件开发') {
            if (!navListData[4]) { navListData[4] = [] }
            navListData[4].push(item)
          }  else if (item.serverName == '法律服务' || item.serverName == '知识产权服务') {
            navListData[5].push(item)
          }
        })
        return navListData
      }
    },
    methods: {
      select (opt, index) {
        let key = this.navData.findIndex(item => {
          return item.operatorServerClass.id === opt.operatorServerClass.id
        })
        this.$emit('changTab',opt, key, index)
      }
    }
  }
</script>
<style scoped>
  .nav_box{
    width: 100%;
    position: absolute;
    box-sizing: border-box;
    left: 0;
    background: rgba(54, 54, 54, .9);
    z-index: 2016;
  }
  .nav li{
    cursor: pointer;
    padding: 7px 0;
    line-height: 36px;
    cursor: pointer;
    border-top: 1px solid #eee;
    color: #eee;
    text-align: center;
    font-size: 14px;
    overflow:hidden;
  }
  .nav li:last-child{
    border-bottom: 1px solid #eee;
  }
  .nav li img{
    vertical-align: middle;
    margin: 0 0 0.5px 20px;
  }
  .nav_title{
    box-sizing: border-box;
  }
  .nav_content{
    display: none;
    width: 600px;
    position:absolute;
    left: 100%;
    top:0;
    height: 100%;
    color: #333;
    text-align: left;
    background: #fff;
  }
  .nav_title li:hover {
    color: #fff;
    background:#D7000F;
  }
  .nav_title li:hover .nav_content{
    display:block;
  }
  .nav_li{
    padding: 0 30px;
  }
  .nav_li .nav_li_title{
    border-bottom: 1px solid #eee;
    font-size: 14px;
    font-weight: bold;
  }
  .nav_li_content span{
    color: #666;
    padding: 0px 15px;
    font-size: 12px;
    display: inline-block;
  }
  .nav_li_content span:hover{
    color: #C55A5A;
  }
  .bottom-img{
    position: absolute !important;
    bottom: 0;
    left:0;
    width: 100%;
  }
</style>
