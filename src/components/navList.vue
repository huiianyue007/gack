<template>
  <div class="nav_box">
    <div class="container nav_list">
      <ul class="nav fl nav_title">
        <li v-for = '(item, key) in navData' :class = '{acitve: key === num}' @mouseover = 'overTable(key)'>
          {{ item.operatorServerClass.serverName }}
          <img src="~assets/gack/xy.png" v-if = 'key !== num' alt="">
          <img src="~assets/gack/xy1.png" alt="" v-else>
        </li>
      </ul>
      <!--<ul class="nav fl" v-if = 'trData && trData[num].arr'>-->
      <ul class="nav fl" v-if = 'trData'>
        <li v-for = '(item, k) in trData' @mouseover = 'overTr(k)' :class = '{acitve: k === key}' @click = 'openViews(k)'>
          {{item.operatorSerTwo.serverName}}
          <img src="../assets/gack/xy1.png" v-if = 'k === key && trData[key].serverClasThree' alt="">
          <img src="../assets/gack/xy.png" alt="" v-if = 'k !== key && trData[key].serverClasThree'>
        </li>
      </ul>
      <ul class="nav fl nav_data">
        <li class = 'fl' v-for = '(item, key) in tdData' @click = 'routeToView(key)'>
          {{ item.serverName }}
        </li>
      </ul>
      <div class="fr">
        <div class="img" v-for = 'item in imgData'>
          <img :src="item.imgSrc" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['navData', 'imgData', 'title', 'index'],
    data () {
      return {
        num: 0,
        key: 0,
      }
    },
    computed: {
      trData() {
        if (this.navData[this.num]) {
          return this.navData[this.num].serverClasTwo
        }
      },
      tdData () {
        if (this.trData && this.trData[this.key]) {
          if (this.trData[this.key].serverClasThree) {
            return this.trData[this.key].serverClasThree
          } else {
            return this.trData
          }
        }
      }
    },
    methods: {
      routeToView (key) {
        this.$emit('changTab', {
          firstIndex: this.num,
          secondIndex: this.key,
          threeIndex: key
        })
      },
      openViews (key) {
        this.$emit('changTab', {
          firstIndex: this.num,
          secondIndex: key,
        })
      },
      overTable (index) {
        this.num = index
        this.key = 0
      },
      overTr (index) {
        this.key = index
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
    padding: 20px 0 30px;
    min-height: 300px;
    background: rgba(255, 255, 255, 1);
    z-index: 2016;
  }
  .nav li{
    cursor: pointer;
    padding: 0 20px 0 12px;
    line-height: 36px;
    margin-bottom: 10px;
    cursor: pointer;
    text-align: center;
    font-size: 14px;
    overflow:hidden;
  }
  .nav li img{
    vertical-align: middle;
    margin: 0 0 0.5px 20px;
  }
  .nav_title{
    padding-right:15px;
    box-sizing: border-box;
  }
  .acitve{
    color: #fff;
    background:#D7000F;
  }
  .nav_data {
    padding-left:15px;
    width: 50%;
    box-sizing: border-box;
  }
  .nav_data li {
    width: 280px;
    background:#f1f1f1;
    margin: 0 10px 10px 0;
    box-sizing:border-box;
  }
  .nav_data li:hover {
    color: #fff;
    background:#D7000F;
  }
  .fr {
    width:20%;
  }
  .fr img:first-child{
    margin-bottom: 30px;
  }
</style>
