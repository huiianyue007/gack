<template>
  <div class="page-container">
    <div class="container">
      <div class="back" @click = '$router.go(-1)'>
        < 返回上一页
      </div>
      <div class="address_con">
        <div class="title">{{ query.title }}</div>
        <el-form label-position="left" label-width="80px" :rules = 'rules' :model = 'rulesForm' ref = 'ruleFrom'>
          <el-form-item label = '姓名' required prop = 'username'>
            <el-input v-model = 'rulesForm.username' :minlength = '2' :maxlength = '7' placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label = '电话' required prop = 'phonenumber'>
            <el-input v-model = 'rulesForm.phonenumber' :maxlength="11" placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item label = '详细地址' :maxlength = '50' required prop = 'addr'>
            <el-input type="textarea" v-model = 'rulesForm.addr' :maxlength="255" placeholder="请输入联系地址"></el-input>
          </el-form-item>
          <div class="text-center">
            <el-button size = 'large' @click.native = 'save'>保存</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'edit-address',
    data: () => ({
      rulesForm: {
        username: '',
        phonenumber: '',
        addr: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }, { required: true, message: '用户名不能为空', trigger: 'change' }],
        phonenumber: [{ required: true, message: '请输入手机号', trigger: 'blur' },
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /1[3|4|5|7|8][0-9]{9}/, message: '请输入正确的手机号码' }],
        addr: [{ required: true, message: '请输入详细地址', trigger: 'blur' }, { required: true, message: '请输入详细地址', trigger: 'change' }]
      }
    }),
    computed: {
      query () {
        return this.$route.query
      },
      user () {
        return this.$store.state.userInfo
      }
    },
    watch: {
      user (val) {
        if (this.query.index) {
          let address = val.addresses[this.query.index]
          if (address) {
            this.rulesForm = {
              username: address.name,
              phonenumber: address.telephone,
              addr: address.address
            }
          }
        }
      }
    },
    created () {
      if (this.query.id) {
        let address = this.user.addresses[this.query.index]
        if (address) {
          this.rulesForm = {
            username: address.name,
            phonenumber: address.telephone,
            addr: address.address
          }
        }
      }
    },
    beforeDestroy () {
      if (!this.query.id) {
        this.$refs.ruleFrom.resetFields()
      }
    },
    methods: {
      save () {
        this.$refs.ruleFrom.validate(valid => {
          if (valid) {
            let url = this.$route.query.id ? `${this.$config.gack}/guoanmaker/personal/user/updateAddress` : `${this.$config.gack}/guoanmaker/personal/user/saveAddress`
            let data = this.$route.query.id ? {
              name: this.rulesForm.username,
              address: this.rulesForm.addr,
              telephone: this.rulesForm.phonenumber,
              id: this.$route.query.id
            } : {
              name: this.rulesForm.username,
              address: this.rulesForm.addr,
              telephone: this.rulesForm.phonenumber,
              isdefault: this.user.addresses.length ? '0': '1',
              'user_id': this.user.id
            }
            if (this.$route.query.default == '1') {
              data.isdefault =  '1'
            }
            this.$htAjax.post(url, {}, {
              params: data
            }).then(res => {
              return this.$store.dispatch('findById', this.user.id)
            }).catch(() => {
              this.$message.error('地址保存失败')
            })
            this.$router.go(-1)
          }
        })
      }
    }
  }
</script>
<style scoped>
  .back{
    color: #ff0000;
    line-height:50px;
    font-size:14px;
  }
  .address_con{
    background: #fff;
    padding: 15px 20px;
  }
  .el-form{
    width: 50%;
    margin: 15px 0;
  }
</style>
