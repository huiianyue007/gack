<template>
  <div class="login">
    <login-header>欢迎登录</login-header>
    <div class="container">
      <div class="contentbox">
        <div class="biaodan">
          <p class="denglu">
            <span class="fl cursor" :class="{'login_title': flag}" @click='flag = true'>登录</span>
            <span class="fr cursor" :class="{'login_title': !flag}" @click='flag = false'>手机号码快捷登录</span>
          </p>
          <div class="login_form">
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px" class="demo-loginForm">
              <el-input type="text" v-show="false"></el-input>
              <el-input type="password" v-show="false"></el-input>
              <div class="login_inp">
                <el-form-item prop="phone">
                  <div class="icon_img">
                    <img src='../assets/images/reg/dhicon.png'>
                  </div>
                  <el-input v-model.trim.lazy="loginForm.phone" :maxlength="11" placeholder="请输入手机号码"></el-input>
                </el-form-item>
              </div>
              <div class="login_inp" v-if='flag'>
                <el-form-item prop="sign" :error="errors">
                  <div class="icon_img">
                    <img src='../assets/images/reg/zc_mm.png'>
                  </div>
                  <el-input type="password" v-model.trim="loginForm.sign" :minlength="6"  placeholder="请输入密码" @keyup.enter.native='submitForm'></el-input>
                </el-form-item>
              </div>
              <el-checkbox-group class="loginType" size="small" v-model="loginForm.type" v-if='flag'>
                <el-checkbox label="记住密码" name="type"></el-checkbox>
                <router-link to='/profile' class="el_forget" replace>忘记密码?</router-link>
              </el-checkbox-group>
              <el-form-item class="reg_message" prop="meg" v-if='!flag'>
                <el-row>
                  <el-col :span="11">
                    <el-input v-model="loginForm.meg" :maxlength='6' placeholder="短信验证码" @keyup.enter.native='submitForm'></el-input>
                  </el-col>
                  <el-col :span="2">&nbsp;</el-col>
                  <el-col :span="11" class="reg-line">
                    <el-button type="primary" @click="regGet" style="background:#f6f7f8;border: 1px solid #C4C4C4;color:#4a4a4a" :disabled="disabled || time > 0">{{regGetText}}</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <div class="login_inp sub_login">
                <el-button type="danger" @click="submitForm" :loading="submitLoading">登录</el-button>
              </div>
            </el-form>
            <div class="zhuce" v-if='flag'>
              <router-link :to="register" replace>立即注册&gt;&gt;</router-link>
            </div>
          </div>

        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
  import md5 from 'js-md5'
  import loginHeader from 'components/loginHeader'
  import vFooter from 'components/FooterNew'
  export default {
    name: 'login',
    data() {
      var checkAge = (rule, value, callback) => {
        if(!value) {
          return callback(new Error('密码不可为空'));
        }
        /*setTimeout(() => {
          var isLogin = 1;
          if (isLogin != 1) {
              callback(new Error('密码错误,请重新输入'));
          } else {
              callback();
          }
        }, 1000);*/
        else {
          callback();
        }
      };
      return {
        submitLoading: false,
        //注册
        register: '/register/0',
        service: '0',
        disabled: false,
        loginForm: {
          phone: '',
          sign: '',
          meg: '',
          type: true
        },
        time: 0,
        errors: '',
        flag: true,
        rules: {
          /**
           * 验证手机号码
           * 移动号码段:139、138、137、136、135、134、150、151、152、157、158、159、182、183、187、188、147
           * 联通号码段:130、131、132、136、185、186、145
           * 电信号码段:133、153、180、189
           **/
          phone: [{
              required: true,
              message: '请输入手机号',
              trigger: 'blur'
            },
            {
              pattern: /^1[34578]\d{9}$/,
              message: '请输入正确的手机号码',
              trigger: 'blur'
            }
          ],
          sign: [{
            validator: checkAge,
            trigger: 'blur'
          }]
        }
      }
    },
    mounted() {
      this.service = this.$route.params.service;
      if (this.service == '3' && this.$route.query.url && this.$route.query.state) {
        this.register = {
          path: '/register/' + this.service,
          query: {
            url: this.$route.query.url,
            state: this.$route.query.state
          }
        }
      } else {
        this.register = '/register/' + this.service;
      }

      if(this.username) {
        this.loginForm.phone = this.username
      }
      if(this.password) {
        this.loginForm.sign = window.atob(this.password)
      }
    },
    components: {
      vFooter,
      loginHeader
    },
    computed: {
      regGetText: function() {
        return this.time > 0 ? this.time + 's 后重新获取' : '获取验证码';
      },
      username() {
        return window.localStorage.getItem('username')
      },
      password() {
        if (this.$store.state.remember) {
          return window.localStorage.getItem('password')
        }
      }
    },
    methods: {
      regGet() {
        this.$refs.loginForm.validateField('phone', (valid) => {
          if(valid == '') {
            this.time = 60
            this.disabled = false
            this.timer()
            this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/user/sendVerificationCode`, {}, {
              params: {
                telephone: this.loginForm.phone,
                isuser: '0'
              }
            }).then(({
              data
            }) => {
              this.$message.success('验证码已发送')
            }).catch(() => {
              this.$message.error('请求错误')
            })
          }
        });
      },
      timer: function() {
        if(this.time > 0) {
          this.time--;
          setTimeout(this.timer, 1000);
        }
      },
      setPass () {
        if(!this.user.password && !this.flag) {
          this.$confirm('您的账户安全级别较低，请设置密码', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push({
              path: '/user/setpass',
              query: {
                title: '设置密码'
              }
            })
          }).catch()
        } else if (this.service !== '1') {
          if (this.$store.state.parentPage === '/') {
            this.$router.replace('/')
          } else {
            this.$router.go(-1)
          }
        }
      },
      submitForm() {
        this.$refs.loginForm.validate((valid) => {
          if(valid) {
            this.submitLoading = true;
            let userInfo = null
            if(this.flag) {
              let passwordMd = md5(this.loginForm.sign);
              userInfo = {
                username: this.loginForm.phone,
                password: passwordMd.toUpperCase()
              }
            } else {
              userInfo = {
                username: this.loginForm.phone,
                code: this.loginForm.meg
              }
            }
            let url = this.flag ? `${this.$config.gack}/guoanmaker/personal/user/verify` : `${this.$config.gack}/guoanmaker/personal/user/fastLanding`
            this.$htAjax.post(url, {}, {
              params: userInfo
            }).then(res => {
              this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/userstatistics/saveUserstatistics`, {}, {
                params: {
                  userid: res.data.data.value,
                  type: '5'
                }
              })
              return Promise.resolve(res)
            }).then(({
              data
            }) => {
              _czc.push(["_setCustomVar", "是否登录", "已登录", 72000]);
              this.submitLoading = false;
              this.$message({
                message: '登录成功',
                type: 'success'
              });
              let user = {
                avatar: 0,
                id: data.data.value,
              }
              this.$store.commit('setRemember', this.loginForm.type)
              if(this.loginForm.type) {
                let password = window.btoa(this.loginForm.sign)
                window.localStorage.setItem('username', this.loginForm.phone)
                window.localStorage.setItem('password', password)
              }
              this.$store.commit('setUserId', user)
              this.$store.commit('setSessionId', data.data.sessionid)
              this.$htAjaxGlobal.headers = {
                'Authorization': `Bearer ${this.$store.state.sessionid}`
              }
              return this.$store.dispatch('findById', data.data.value)
            }).then(() => {
              if(this.service == '1') {
                if(this.user.isProvider != null) {
                  this.$router.push('/backHome', () => {
                   this.setPass()
                  });
                } else {
                  this.$router.push('/middle', () => {
                    this.setPass()
                  });
                }
              } else if(this.service == '3' && this.$route.query.url) {
                let url = this.$route.query.url
                if (!(/\?/ig).test(this.$route.query.url)) {
                  url = url + '?' + 'userid=' + this.$store.state.userid.id
                } else {
                  if(url.indexOf('userid=') !== -1 && url.indexOf('&') !== -1) {
                    let userid = url.substring(url.indexOf('userid='), url.indexOf('&', url.indexOf('userid=')))
                    url = url.replace(userid, 'userid=' + this.$store.state.userid.id)
                  } else if (url.indexOf('userid=') !== -1 && url.indexOf('&') === -1) {
                    url = url.substring(0, url.indexOf('userid=')) + 'userid=' + this.$store.state.userid.id
                  }else  {
                    url += '$userid=' + this.$store.state.userid.id
                  }
                }
                window.location.replace(url)
              } else {
                this.setPass()
//                this.$router.push('/', () => {
//                  if(!this.user.password) {
//                    this.$confirm('您的账户安全级别较低，请设置密码', '警告', {
//                      confirmButtonText: '确定',
//                      cancelButtonText: '取消',
//                      type: 'warning'
//                    }).then(() => {
//                      this.$router.push({
//                        path: '/user/setpass',
//                        title: '设置密码'
//                      })
//                    }).catch()
//                  }
//                });
              }
            }).catch(res => {
              this.submitLoading = false;
              if (!res.data) {
                this.$message.error('请稍后登陆')
                return false
              }
              if(res.data.data.key) {
                this.$message.warning(res.data.data.value);
              }
            })
          }
        })
      }
    }
  }
</script>
<style scoped>
  .container {
    width: 100%;
    height: 500px;
    background-color: #e4e4e4;
  }

  .contentbox {
    width: 1200px;
    height: 500px;
    background: url(~@/assets/images/gack/loginbg.jpg) no-repeat;
    margin: 0 auto;
    overflow: hidden;
  }

  .contentbox .biaodan {
    float: right;
    margin-right: 95px;
    margin-top: 60px;
    width: 350px;
    height: 380px;
    background-color: #fff;
  }

  .contentbox .biaodan .denglu {
    font-size: 20px;
    width: 280px;
    margin: 40px auto 10px;
  }

  .contentbox .biaodan .denglu .login_title {
    color: #f00;
  }

  .login_form {
    width: 280px;
    height: auto;
    margin: 0 auto;
    overflow: hidden;
  }

  .icon_img {
    position: absolute;
    left: 0;
    top: 0;
    width: 36px;
    height: 36px;
    z-index: 99;
  }

  .login_inp {
    position: relative;
    width: 100%;
    margin-top: 20px;
  }

  .icon_img img {
    position: absolute;
    margin: auto auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .sub_login {
    margin-top: 20px;
  }

  .sub_login .el-button {
    width: 100%;
  }

  .login .loginType {
    margin-top: 10px;
  }

  .login .el_forget {
    float: right;
    color: #666;
    cursor: pointer;
    font-size: 12px;
    margin-top: 4px;
  }

  .login .zhuce {
    color: #ff6d6d;
    font-size: 14px;
    margin-top: 15px;
  }

  .login .zhuce a {
    color: #ff6d6d;
  }
</style>

<style>
  .login .el-input__inner {
    padding-left: 35px;
  }

  .login .el-checkbox__label {
    color: #666;
  }

  .login .el-checkbox__inner {
    width: 14px;
    height: 14px;
  }

  .login .el-checkbox__inner::after {
    height: 6px;
    left: 3px;
  }

  .login .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #ff6d6d;
    border-color: #ff6d6d;
  }

  .login .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #ff6d6d;
  }

  .reg_message .el-input__inner {
    padding-left: 15px;
  }

  .login .el-checkbox__inner:hover {
    border-color: #ff6d6d;
  }
</style>
