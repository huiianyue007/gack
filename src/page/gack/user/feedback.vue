<template>
  <div class="feedback">
    <div class="title">
      问题反馈
    </div>
    <el-form :rules = 'rules' :model = 'feedback' ref = 'ruleForm'>
      <el-form-item prop = 'feedback'>
        <el-input type = 'textarea' v-model = 'feedback.feedback' :rows="20"  :minlength = '200' placeholder="请填写问题内容，最少200字"></el-input>
        <div class="subhead">请至少输入200个字</div>
      </el-form-item>
    </el-form>
    <div>
      <el-button type = 'primary' size = 'large' @click = 'submit'>提交</el-button>
    </div>
  </div>
</template>
<script>
  const validateText = function (rules, value, callback) {
    if (value.length < 200) {
      callback('输入的字符少于200字')
    } else {
      callback()
    }
  }
  export default {
    data: () => ({
      feedback: {
        feedback: ''
      },
      rules: {
        feedback: [{ validator: validateText, trigger: 'blur' }]
      }
    }),
    methods: {
      submit () {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.$htAjax.post('https://apitest.gack.citic:8083/guoanmaker/operator/newType/insertOperatorFeedback', {}, {
              params: {
                feedbackContext: this.feedback.feedback,
                userId: this.$store.state.userid.id
              }
            }).then(({data}) => {
              if (data.status === 200) {
                this.$message({
                  type: 'success',
                  message: '信息反馈成功'
                })
              } else if (data.status === 220) {
                this.$message.error('信息包含敏感词')
              } else if (data.status === 250) {
                this.$message.error('信息反馈失败')
              }
            }).catch(error => {
              this.$message.error('信息反馈失败')
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
