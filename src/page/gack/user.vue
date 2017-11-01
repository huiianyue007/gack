<template>
  <div class="page">
    <div class="container">
      <div class="breadcrumb">
        <router-link to = '/user'>个人中心</router-link>
        <span>/</span>
        <span class="breadcrumb-item">{{ $route.query.title || '我的资料'}}</span>
      </div>
      <el-row :gutter = '20'>
        <el-col :span = '4'>
          <router-link :to = '{path: item.url, query: {title: item.title}}' tag = 'div' class="list" v-for = '(item, key) in userArr' :class = '{active: $route.path === item.url}' :key = 'key'>
            {{ item.title }}
          </router-link>
        </el-col>
        <el-col :span = '20' class = 'views'>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        userArr: [{
          title: '我的资料',
          url: '/user'
        }, {
          title: '设置密码',
          url: '/user/setpass'
        }, {
          title: '地址管理',
          url: '/user/address'
        }, {
          title: '我的发票',
          url: '/user/myinvoice'
        },{
          title: '我的订单',
          url: '/user/order'
        }, {
          title: '我的消息',
          url: '/user/message'
        }, {
          title: '我的优惠券',
          url: '/user/coupon'
        }, {
          title: '我的预约',
          url: '/user/appointment'
        }, {
          title: '我的收藏',
          url: '/user/collection'
        }, {
          title: '用户反馈',
          url: '/user/feedback'
        }]
      }
    }
  }
</script>
<style scoped>
  .breadcrumb {
    line-height: 46px;
    font-size:12px;
  }
  .breadcrumb a{
    color: #A5A5A5;
  }
  .breadcrumb span{
    margin: 0 10px;
    color: #A5A5A5;
  }
  .breadcrumb .breadcrumb-item{
    margin:0;
    color: #ff0000;
  }
  .page{
    background:#f3f3f3;
    padding: 10px 0;
  }
  .list{
    height: 48px;
    line-height: 48px;
    font-size: 14px;
    border-bottom: 1px solid #f4f4f4;
    padding-left: 30px;
    background:#fff;
  }
  .list:hover {
    background: #f9f9f9;
  }
  .active{
    color: #D7000F;
    background: #f9f9f9;
    border-right: 2px solid #D7000F;
  }
  .el-col {
    cursor: pointer;
  }
</style>
