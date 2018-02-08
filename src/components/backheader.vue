<template>
  <div class="header">
    <div class="container content">
      <div class="fl">
        <span>客服热线 ：400-851-8585</span>
        <div class="inline-block icon sj"></div>
        <div class="inline-block icon wx">
          <img src="../assets/images/gack/ewm_u155.png" alt="">
        </div>
      </div>
      <div class="fr">
        <router-link to='/login/0' replace v-if='!user'>登录</router-link>
        <router-link to='/user' replace v-else> {{ user.username }} </router-link>
        <span>|</span>
        <router-link to='/register/0' replace v-if='!user'>注册</router-link>
        <span class='login_out' v-else @click='loginOut'>退出</span>
        <span>|</span>
        <span class="news_tit" @click="newsList">
          消息
          <b style="color:#c7000a;margin-left:5px;font-weight:400;">{{newsNum}}</b>
          <div class="news_box" v-if="newsbox" @mouseleave='newsboxLeave'>
            <div class="new_top">待处理事项</div>
            <ul class="new_list">
              <li v-for="item in newList" @click="typeClick(item)">
                <span>【{{item.type}}】</span>
                <div class="new_div" v-html="item.decribestr">
                  <!-- 您有一笔【火腿肠】订单
                   <b>待接单</b>，需要您处理 -->
                </div>
              </li>
            </ul>
          </div>
        </span>
        <span>|</span>
        <router-link to='/login/1' v-if='!user'>我要成为服务商</router-link>
        <span v-if='!user'>|</span>
        <router-link :to='{path: "/user/order", query: {title: "订单中心"}}'>订单中心</router-link>
        <span>|</span>
        <router-link to='/middle' v-if='user && !user.isProvider'>我要成为服务商</router-link>
        <router-link to='/' v-if='user && user.isProvider'>国安创客官网</router-link>
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
      isProvider: false,
      newsbox: false,
      businessid: '',
      newList: [],
      newsNum: 0
    }
  },
  created: function() {
    this.getBusiness();
  },
  watch: {
    '$store.state.business': 'getBusiness'
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
        this.newList = []
        this.$store.commit('setUserInfo', null)
        this.$store.commit('setUserId', null)
        this.$router.push('/')
        this.siginOut()
      }).catch(() => {

      })
    },
    getBusiness() {
      this.businessid = this.$store.state.business;
      let item = {
        businessid: this.businessid  //服务商id
      }
      this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/message/MessageForBusiness`, {}, {
        params: item
      }).then(({ data }) => {
        if (data.status == 200) {
          data.data.list.forEach(function(element) {
            if (element.type == 1) {
              element.type = '订单';
            } else if (element.type == 2) {
              element.type = '商品';
            } else if (element.type == 3) {
              element.type = '评价';
            } else if (element.type == 4) {
              element.type = '发票';
            } else if (element.type == 5) {
              element.type = '系统';
            } else if(element.type == 6) {
              element.type = '空间';
            }else {
              element.type = '店铺';
            }
          });
          this.newsNum = data.data.notReadnum;
          this.newList = data.data.list;
        }
      }).catch(() => {
      })
    },
    newsList() {
      if (this.newsNum > 0) {
        this.newsbox = !this.newsbox;
      } else {
        this.$message({
          type: 'success',
          message: '暂无最新消息'
        })
      }
    },
    newsboxLeave() {
      let item = {
        businessid: this.businessid  //服务商id
      }
      var that = this;
      setTimeout(() => {
        this.newsbox = false;
        this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/message/MessageSetIsread`, {}, {
          params: item
        }).then(({ data }) => {
          if (data.status == 200) {
            this.getBusiness();
          }
        }).catch(() => {
        })
      }, 300)
    },
    //点击跳转
    typeClick(item) {
      if (item.type == '订单') {
        this.$store.state.adminleftnavnum = 'merchandise';
        this.$router.push('/merchandise');
      } else if (item.type == '商品') {
        this.$store.state.adminleftnavnum = 'manage';
        this.$router.push('/manage');
      } else if (item.type == '评价') {
        this.$store.state.adminleftnavnum = 'reviewShow';
        this.$router.push('/reviewShow');
      } else if (item.type == '发票') {
        this.$store.state.adminleftnavnum = 'invoice';
        this.$router.push('/invoice');
      } else if (item.type == '系统') {
        this.$store.state.adminleftnavnum = 'backHome';
        this.$router.push('/backHome');
      } else if (item.type == '空间') {
        this.$store.state.adminleftnavnum = 'spaceHome';
        this.$router.push('/spaceHome');
      } else {
        this.$store.state.adminleftnavnum = 'shopSet';
        this.$router.push('/shopSet');
      }
      let itemJson = {
        businessid: this.businessid,  //服务商id
        id: item.id
      }
      this.newsbox = false;
      this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/message/MessageSetIsread`, {}, {
        params: itemJson
      }).then(({ data }) => {
        if (data.status == 200) {
          this.getBusiness();
        }
      }).catch(() => {
      })

    },
    siginOut() {
      return new Promise((resolve, reject) => {
        this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/user/signOut`).then(res => {
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
  width: 100%;
  min-width: 960px;
  height: 35px;
  line-height: 32px;
  font-size: 12px;
  border-bottom: 1px solid #e2e2e2;
}
.header .container{
  width: 90%;
  min-width: 960px;
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
  background-image: url(~@/assets/images/gack/wx_icon.png);
}

.header .icon.wx:hover {
  background-image: url(~@/assets/images/gack/wx_icon1.png);
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
  background-image: url(~@/assets/images/gack/sj_icon.png);
  background-size: 13px 18px;
}

.header .icon.sj:hover {
  transition: all linear .2s;
  background-image: url(~@/assets/images/gack/sj_icon1.png);
}

.header .news_box {
  width: 300px;
  height: 205px;
  background: #fff;
  position: absolute;
  left: -135px;
  top: 30px;
  cursor: pointer;
  padding: 10px 0;
  box-sizing: border-box;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, .2);
}

.header .new_top {
  border-left: 3px solid #c7000a;
  height: 18px;
  margin: 0 10px;
  padding-left: 10px;
  line-height: 18px;
}

.header .news_box:before {
  content: '';
  position: absolute;
  left: 140px;
  top: -10px;
  overflow: hidden;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 15px solid #fff;
}

.new_list {
  width: 100%;
  height: 165px;
  margin: 4px 0;
  overflow-x: hidden;
  overflow-y: auto;
}

.new_list::-webkit-scrollbar {
  width: 4px;
  height: 16px;
  background-color: #f5f5f5;
}



/*定义滚动条的轨道，内阴影及圆角*/

.new_list::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  border-radius: 2px;
  background-color: #f5f5f5;
}



/*定义滑块，内阴影及圆角*/

.new_list::-webkit-scrollbar-thumb {
  width: 10px;
  height: 20px;
  border-radius: 2px;
  -webkit-box-shadow: inset 0 0 6px #eee;
  background-color: #555;
}

.new_list li {
  width: 100%;
  height: auto;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  font-size: 12px;
  box-sizing: border-box;
  padding: 2px 10px;
  padding-right: 0;
  border-bottom: 1px solid #e5e5e5!important;
}

.new_list li:hover {
  background: #f5f5f5;
}

.new_list li span {
  margin: 0!important;
  position: relative;
  left: -5px;
  float: left;
  color: #999;
}

.new_list li b {
  color: #c7000a;
}

.new_list li div {
  margin: 0!important;
  float: left;
  width: 210px;
  height: auto;
}

.new_list li:last-of-type {
  border-bottom: 0!important;
}

.header .news_tit {
  position: relative;
}
</style>
