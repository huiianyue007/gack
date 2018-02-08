<template>
  <div class="feedback">
    <div class="title">
      问题反馈
    </div>
    <el-form :rules = 'rules' :model = 'feedback' ref = 'ruleForm'>
      <el-form-item prop = 'feedback'>
        <el-input type = 'textarea' v-model = 'feedback.feedback' :rows="20"  :maxlength = '200' placeholder="请填写问题内容，最多200字"></el-input>
        <div class="subhead">请最多输入200个字</div>
      </el-form-item>
    </el-form>
    <div>
      <el-button type = 'primary' size = 'large' @click = 'submit'>提交</el-button>
    </div>
  </div>
</template>
<script>
  const validateText = function (rules, value, callback) {
    if (value.length > 200) {
      callback('请最多输入200个字')
    } else {
      callback()
    }
  }
  export default {
    name: 'feedback',
    data: () => ({
      feedback: {
        feedback: ''
      },
      rules: {
        feedback: [{ validator: validateText, trigger: 'blur' }]
      }
    }),
    beforeDestroy () {
      this.$refs.ruleForm.resetFields()
    },
    methods: {
      submit () {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/newType/insertOperatorFeedback`, {}, {
              params: {
                feedbackContext: this.feedback.feedback,
                userId: this.$store.state.userid.id
              }
            }).then(res => {
                if (res.data.status == 220 || res.data.status == 250) {
                  return Promise.reject(res)
                }
                let data = res.data
                if (data.data.stauts == 1) {
                  this.$message({
                    type: 'success',
                    message: '信息反馈成功'
                  })
                } else if (data.data.stauts == 2) {
                  this.$message.error('信息反馈次数用完')
                }
                this.feedback.feedback = ''
            }).catch(error => {
              console.log(error.data)
                 if (error.data.status === 220) {
                  this.$message.error('信息包含敏感词')
                } else if (error.data.status === 250) {
                  this.$message.error('信息反馈失败')
                }
            })
          }
        })
      }
    }
  }
</script>
<style scoped>
  .feedback{
    background:#f3f3f3;
    min-height: 655px;
    padding: 0 20px 40px 0;
    overflow:hidden;
  }
  .title {
    margin: 15px 0;
  }
  .text{
    width:100%;
    height: 464px;
    padding: 1em;
    box-sizing: border-box;
  }

</style>
