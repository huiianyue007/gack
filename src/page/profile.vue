<template>
  <div class="profile">
    <login-header login>
      重设密码
    </login-header>
    <div class="container">
      <el-form class="reg_form reg_box" :rules="rules" :model = 'resetForm' label-width="120px" ref = 'resetForm'>
        <el-form-item prop = 'phone' label = '手机号码'>
          <div class="icon_img">
            <img src='../assets/images/reg/dhicon.png'>
          </div>
          <el-input v-model = 'resetForm.phone' :maxlength = '11' placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop = 'code' class = 'reg_message' label = '验证码'>
          <el-row>
            <el-col :span = '11'>
              <el-input v-model = 'resetForm.code' :maxlength = '6' placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span = '11' :push = '2'>
              <g-verify @click.native="initCode" width = '100' height="36" :code = 'verCode'></g-verify>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="reg_message" label="短信验证码" prop="meg">
          <el-col :span="11">
            <el-input v-model="resetForm.meg" :maxlength="6" placeholder="短信验证码"></el-input>
          </el-col>
          <el-col :span="11" class="reg-line" :push = '2'>
            <el-button type="primary" @click="regGet" class = 'ver_code' :disabled="disabled || time > 0">{{regGetText}}</el-button>
          </el-col>
        </el-form-item>
        <el-form-item prop = 'password' label = '设置密码'>
          <div class="icon_img">
            <img src='../assets/images/reg/zc_mm.png'>
          </div>
          <el-input v-model = 'resetForm.password' :minlength="6" type = 'password' placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop = 'oldPassword' label = '请再次输入密码'>
          <div class="icon_img">
            <img src='../assets/images/reg/zc_mm.png'>
          </div>
          <el-input v-model = 'resetForm.oldPassword' :minlength="6"  type = 'password' placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="block" type = 'danger' @click.native = 'submit' :loading = 'loadding'>提交</el-button>
        </el-form-item>
      </el-form>

    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
  import vFooter from 'components/FooterNew'
  import loginHeader from 'components/loginHeader'
  import GVerify from 'components/GVerify'
  import md5 from 'js-md5'
  export default {
    name: 'profile',
    data () {
      let self = this
      return {
        time: 0,
        loadding: false,
        disabled: false,
        verCode: '',
        resetForm: {
          phone: '',
          meg: '',
          code: '',
          password: '',
          oldPassword: ''
        },
        rules: {
          phone: [{
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }, {
            pattern: /1[3|4|5|7|8][0-9]{9}/,
            message: '只能输入正确的手机号码'
          }],
          meg: [
            { required: true, message: '请输入短信验证码', trigger: 'blur' }
          ],
          code: [{ validator: self.validatever, trigger: 'blur' }],
          password: [
            { validator: self.checkPassword, trigger: 'blur' }
          ],
          oldPassword: [
            { validator: self.checkOldPassword, trigger: 'blur' }
          ],
        }
      }
    },
    mounted () {
      this.initCode()
    },
    computed: {
      regGetText () {
        return this.time > 0 ? this.time + 's 后重新获取' : '获取验证码';
      }
    },
    methods: {
      checkPassword (rules, value, callback) {
        let regExp = /(^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$)|(^[a-zA-Z]{6,16}$)/
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (regExp.test(value) === false) {
          callback(new Error('6-16字母和数字组成，不能是纯数字'))
        } else {
          callback();
        }
      },
      checkOldPassword (rule, value, callback){
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.resetForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
      regGet() {
        this.$refs.resetForm.validateField('phone', (valid) => {
          if (valid == '') {
            this.time = 60;
            this.disabled = false;
            this.timer();
            var phone = {
              telephone: this.resetForm.phone,
              isuser: '0'
            }
            this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/user/sendVerificationCode`, {}, {
              params: phone
            }).then(({ data }) => {
              this.$message.success(data.data.value);
            }).catch(({ data }) => {
              this.$message.error('请稍后重试');
            });
          }

        });
      },
      //获取验证码 倒计时
      timer () {
        if (this.time > 0) {
          this.time--;
          setTimeout(this.timer, 1000);
        }
      },
      validatever (rules, value, callback) {
        if (!value) {
          callback(new Error('请输入验证码'))
        } else if (value.toUpperCase() !== this.verCode.toUpperCase()) {
          callback(new Error('验证码输入不正确'))
        } else {
          callback()
        }
      },
      initCode () {
        this.resetVerCode().then(({data}) => {
          this.verCode = data.data.code
        }).catch(error => {})
      },
      submit () {
        this.loadding = true
        this.$refs.resetForm.validate((valid) => {
          if (valid) {
            this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/user/changePassword`, {}, {
              params: {
                username: this.resetForm.phone,
                password: md5(this.resetForm.password).toUpperCase(),
                code: this.resetForm.meg
              }
            }).then(res => {
              this.loadding = false
              this.$message({
                type: 'success',
                message: '密码修改成功'
              })
              this.$router.go(-1)
            }).catch(() => {
              this.loadding = false
              this.$message.error('密码修改失败')
            })
          }
        })
      }
    },
    components: {
      loginHeader,
      vFooter,
      GVerify
    }
  }
</script>
<style scoped>
  .container{
    width: 1200px;
    margin: 0 auto;
    height: auto;
    overflow: hidden;
  }
  .reg_form{
    margin-top: 57px;
    margin-left: 45px;
    width: 560px;
    box-sizing: border-box;
    padding-right: 80px;
    height: auto;
    margin-bottom: 50px;
  }
  .ver_code {
    background:#f6f7f8;
    border: 1px solid #C4C4C4;
    color:#4a4a4a;
  }
  .icon_img {
    position: absolute;
    left: 0;
    top: 0;
    width: 36px;
    height: 36px;
    z-index: 99;
  }
  .icon_img img {
    position: absolute;
    margin: auto auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
</style>
<style>
  .reg_box .el-input__inner {
    padding-left: 35px;
  }
  .reg_message .el-input__inner {
    padding-left: 15px;
  }
</style>
