<template>
  <div class="contop zhucetop">
    <div class="topbox">
    <div class="logo">
      <h1>
        <router-link to='/'>
          <img src="~assets/gack/pt_logo.png">
        </router-link>
      </h1>
    </div>
    <div class="text">
      <slot></slot>
    </div>
    <div class="right" v-if = 'login'>
      <span slot = 'right'>已有账号？</span>
      <router-link class="login" to='/login/0' slot = 'right'>登录 </router-link>
    </div>
  </div>
  </div>
</template>
<script>
  export default {
    props: {
      login: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      home () {
        this.$router.push('/')
      }
    }
  }
</script>
<style scoped>

  .zhucetop {
    border-bottom: 1px solid #b1b1b1;
  }

  .contop {
    width: 100%;
    height: 100px;
    line-height: 100px;
    background-color: #FFFFFF;
  }

  .topbox {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }

  .logo {
    float: left;
  }

  .logo a {
    display: block;
  }

  .logo a img {
    display: block;
    height: 50px;
    margin: 25px 0;
  }

  .text {
    float: left;
    width: auto;
    height: 100%;
    margin-left: 40px;
    color: #323232;
  }

  .right {
    float: right;
    width: auto;
    height: 100%;
    font-size: 14px;
    margin-right: 100px;
  }

  .right .login {
    margin-left: 25px;
    width: 60px;
    height: 30px;
    background-color: #ff5152;
    padding: 8px 18px;
    color: #fff;
    border-radius: 3px;
  }
</style>
