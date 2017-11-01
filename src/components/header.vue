<template>
  <div class="header">
    <div class="container content">
      <div class="fl">
        <span>客服热线 ：400-851-8585</span>
        <div class="inline-block icon sj"></div>
        <div class="inline-block icon wx">
          <img src="../assets/gack/ewm_u155.png" alt="">
        </div>
      </div>
      <div class="fr">
        <router-link to='/login/0' v-if='!user'>登录</router-link>
        <router-link to='/user' replace v-else> {{ user.username }} </router-link>
        <span>|</span>
        <router-link to='/register/0' v-if='!user'>注册</router-link>
        <span class='login_out' v-else @click='loginOut'>退出</span>
        <span>|</span>
        <router-link :to='{path: "/user/message", query: {title: "消息"}}'>消息</router-link>
        <span>|</span>
        <router-link to='/login/1' v-if='!user'>我要成为服务商</router-link>
        <span v-if='!user'>|</span>
        <router-link :to= "{path: '/user/order', query: {title: '订单中心'}}">订单中心</router-link>
        <span>|</span>
        <router-link to='/middle' v-if='user && !user.isProvider'>我要成为服务商</router-link>
        <router-link to='/backhome' v-if='user && user.isProvider'>商户中心</router-link>
        <span v-if='user'>|</span>
        <router-link to='/help'>帮助中心</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isProvider: false
    }
  },
  methods: {
    loginOut() {
      this.$confirm('确认退出系统？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '成功退出系统!'
        })
        this.$store.commit('setUserInfo', null)
        this.$store.commit('setUserId', null)
        window.localStorage.removeItem('password')
        this.$router.push('/')
        this.siginOut()
      }).catch(() => {
      })
    },
    siginOut() {
      return new Promise((resolve, reject) => {
        this.$htAjax.post('https://apitest.gack.citic:8081/guoanmaker/personal/user/signOut').then(res => {
          resolve(res)
        }).catch(() => {
          reject()
        })
      })
    }
  }
}
</script>
<style scoped>
.header {
  background: #f9f9f9;
  height: 35px;
  line-height: 32px;
  font-size: 12px;
  border-bottom: 1px solid #e2e2e2;
}

.header .fl span {
  margin-right: 25px;
}

.header .fr .login_out {
  cursor: pointer;
}

.header .fr span {
  cursor: pointer;
  margin: 0 10px;
}

.header .icon {
  width: 25px;
  height: 25px;
  vertical-align: middle;
  border-radius: 50%;
  background-position: center;
  background-repeat: no-repeat;
  transition: all linear .2s;
}

.header .icon.wx {
  margin-left: 15px;
  position: relative;
  background-image: url(~@/assets/gack/wx_icon.png);
}

.header .icon.wx:hover {
  background-image: url(~@/assets/gack/wx_icon1.png);
}

.header .icon.wx img {
  max-width: 137px;
  height: 171px;
  opacity: 0;
  display: none;
  position: absolute;
  top: 35px;
  z-index: 13;
  left: 0;
  transition: opacity linear .2s;
}

.header .icon.wx:hover img {
  display: block;
  opacity: 1;
  transition: opacity linear .2s;
}

.header .icon.sj {
  background-image: url(~@/assets/gack/sj_icon.png);
  background-size: 13px 18px;
}

.header .icon.sj:hover {
  transition: all linear .2s;
  background-image: url(~@/assets/gack/sj_icon1.png);
}
</style>
