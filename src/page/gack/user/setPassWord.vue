<template>
  <card v-if = 'user'>
    <div class="title" slot = 'header'>设置密码</div>
    <div class="label" v-if = '!user.password'><span class="inline-block label_title">绑定手机号</span> {{ user.username }}</div>
    <el-form class = 'pass_form' :model = 'setForm' ref = 'setForm' label-position="left" :rules = 'rules' prop = 'passwordOld' label-width = '100px'>
      <el-form-item label = '旧密码' required prop = 'passwordOld' v-if = 'user.password'>
        <el-input v-model = 'setForm.passwordOld' :minlength = '6' :maxlength = '16' type = 'password' placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item class="reg_message" label="短信验证码" prop="meg" v-else>
        <el-col :span="11">
          <el-input v-model="setForm.meg" placeholder="短信验证码"></el-input>
        </el-col>
        <el-col :span="11" class="reg-line" :push = '2'>
          <el-button type="primary" @click="regGet" class = 'ver_code' :disabled="disabled || time > 0">{{regGetText}}</el-button>
        </el-col>
      </el-form-item>
      <el-form-item label = '新密码' required prop = 'passwordNew'>
        <el-input v-model = 'setForm.passwordNew' :minlength="6" :maxlength="16" type = 'password' placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label = '确认密码' required prop = 'passwordConfirm'>
        <el-input v-model = 'setForm.passwordConfirm' :minlength="6" :maxlength="16" type = 'password' placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="block" type = 'danger' @click = 'submit' :loading = 'loadding'>提交</el-button>
      </el-form-item>
    </el-form>
  </card>
</template>
<script>
  import md5 from 'js-md5'
  import store from 'store'
  export default {
    name: 'setpass',
    async beforeRouteEnter (from, to, next) {
      if (store.state.userid) {
        if (!store.state.userInfo) {
          await store.dispatch('findById', store.state.userid.id).catch(() => {
            next('/login/0')
          })
          next()
        } else {
          next()
        }
      } else {
        next('/login/0')
      }
    },
    data () {
      let self = this
      return {
        time: 0,
        loadding: false,
        disabled: false,
        setForm: {
          passwordNew: '',
          passwordOld: '',
          meg: '',
          passwordConfirm: ''
        },
        rules: {
          passwordOld: [{ validator: self.checkAge, trigger: 'blur' }],
          passwordNew: [{ validator: self.validatePass, trigger: 'blur' }],
          passwordConfirm: [{ validator: self.checkOldPassword, trigger: 'blur' }],
          meg: [
            { required: true, message: '请输入短信验证码', trigger: 'blur' }
          ]
        }
      }
    },
    destoryed () {
      this.setForm = {
        passwordNew: '',
        passwordOld: '',
        meg: '',
        passwordConfirm: ''
      },
      this.$refs.setForm.resetFields()
    },
    computed: {
      regGetText: function() {
        return this.time > 0 ? this.time + 's 后重新获取' : '获取验证码';
      }
    },
    methods: {
      checkAge (rules, value, callback) {
        if (!value) {
          return callback(new Error('密码不可为空'));
        } else {
          callback()
        }
      },
      checkOldPassword (rule, value, callback){
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.setForm.passwordNew) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
      regGet() {
        this.time = 60;
        this.disabled = false;
        this.timer();
        var phone = {
          telephone: this.user.username,
          isuser: '0'
        }
        this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/user/sendVerificationCode`, {}, {
          params: phone
        }).then(({ data }) => {
          this.$message.success(data.data.value);
        }).catch(({ data }) => {
          this.$message.error('请稍后重试');
        });
      },
      timer () {
        if (this.time > 0) {
          this.time--;
          setTimeout(this.timer, 1000);
        }
      },
      validatePass (rule, value, callback) {
        let regExp = /(^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$)|(^[a-zA-Z]{6,16}$)/
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (regExp.test(value) === false) {
          callback(new Error('6-16字母和数字组成，不能是纯数字'))
        } else {
          callback();
        }
      },
      submit () {
        this.$refs.setForm.validate(valit => {
          if (!valit) return false
          this.loadding = true
          let url = this.user.password ? `${this.$config.gack}/guoanmaker/personal/user/changeUserPassword` : `${this.$config.gack}/guoanmaker/personal/user/changePassword`
          let data = this.user.password ? {
            userid: this.user.id,
            oldPassword: md5(this.setForm.passwordOld).toUpperCase(),
            newPassword: md5(this.setForm.passwordNew).toUpperCase()
          } : {
            username: this.user.username,
            password: md5(this.setForm.passwordNew).toUpperCase(),
            code: this.setForm.meg
          }
          this.$htAjax.post(url, {}, {
            params: data
          }).then(res => {
            this.loadding = false
            this.$message({
              type: 'success',
              message: '密码设置成功'
            })
            this.$store.dispatch('findById', this.user.id)
            this.$router.go(-1)
          }).catch(({ data }) => {
            this.loadding = false
            this.$message.error(data.data.value)
          })
        })
      }
    }
  }
</script>
<style scoped>
  .pass{
    background: #fff;
  }
  .pass_form{
    width: 560px;
  }
  .label {
    margin: 10px 0;
    font-size: 14px;
  }
  .label .label_title{
    width: 100px;
  }
</style>
