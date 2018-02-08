<template>
  <div class="demand">
    <div class="crumb container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item >大企业服务</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.params.type == '5' ? '创新咨询' :' 创新需求' }}</el-breadcrumb-item>
        <el-breadcrumb-item :to = '`/serde/${$route.params.id}/1`'>{{ $route.query.title }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.params.type == '4' ? '我要对接' :' 提交需求' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container demand_content">
      <div class="title">
        {{ $route.params.type == '4' ? '对接资料收集单' :' 企业资料收集单' }}
      </div>
      <div class="demand_form">
        <div class="subhead">请认真填写下方内容，以免供应商无法与您取得服务。</div>
        <el-form :model="demandForm" :rules="rules" ref="demandForm" label-width="80px" label-position="left">
          <el-row :gutter = '30'>
            <el-col :span = '12'><el-form-item label = '企业名称' prop="enterpriseName">
              <el-input v-model="demandForm.enterpriseName" :maxlength = '50'></el-input>
            </el-form-item></el-col>
            <el-col :span = '12'>
              <el-form-item label = '联系人' prop="contactPerson">
                <el-input v-model="demandForm.contactPerson"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter = '30'>
            <el-col :span = '12'>
              <el-form-item label = '职位' prop="position">
                <el-input v-model="demandForm.position" :maxlength = '10'></el-input>
              </el-form-item>
              </el-col>
            <el-col :span = '12'>
              <el-form-item label = '联系方式' prop="contactNumber">
                <el-input v-model="demandForm.contactNumber" :maxlength="11"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item :label = '$route.params.type == "5" ? "需求描述": "项目简述"' prop="projectIntroduction">
            <el-input v-model="demandForm.projectIntroduction" type="textarea" :rows = '8' :maxlength = '300' placeholder="请输入1到300个字"></el-input>
          </el-form-item>
        </el-form>
        <div class="text-center">
          <el-button type = 'primary' @click = 'submit' :loading="submitLoading">确认提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'demand',
    data () {
      return {
        submitLoading: false,
        demandForm: {
          enterpriseName: '',
          contactPerson: '',
          position: '',
          contactNumber: '',
          projectIntroduction: ''
        },
        rules: {
          enterpriseName: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
          contactPerson: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
          position: [{ required: true, message: '请输入职位', trigger: 'blur' }],
          contactNumber: [{
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
        }
      }
    },
    created () {
      this.$refs.demandForm.resetFields()
    },
    methods: {
      submit () {
        let url = ''
        if (this.$route.params.type == '5') {
          this.demandForm.requirementDescription = this.demandForm.projectIntroduction
          this.demandForm.projectIntroduction = null
          if (this.$route.query.type== '1') {
            url = `${this.$config.gack}/guoanmaker/personal/orderform/createAdvisoryOrder`
          } else if (this.$route.query.type== '2') {
            url = `${this.$config.gack}/guoanmaker/personal/orderform/createAdvisoryOrderFixedPrice`
          }
        } else if (this.$route.params.type == '4') {
          url = `${this.$config.back}/guoanmaker/provide/demandDocking/createDemandDocking`
        }
        this.demandForm.userid = this.$store.state.userid.id
        this.demandForm.commodityid = this.$route.params.id
        this.$refs.demandForm.validate(valid => {
          if (valid) {
            this.submitLoading =true
            this.$htAjax.post(url, {}, {
              params: this.demandForm
            }).then(() => {
                this.submitLoading = false
                this.$alert('您好，资料已提交，稍后需求发布方会与您取得联系，请您稍作等待！', '', {
                  confirmButtonText: '知道了',
                  type: 'info'
                }).then(() => {
                  this.$router.go(-1)
                }).catch()
            }).catch(() => {
              this.submitLoading = false
              this.$message.error('资料提交失败')
            })
          }
        })
      }
    }
  }
</script>
<style scoped>
  .demand{
    background: #eee;
    padding-bottom: 15px;
  }
  .demand_content{
    background: #fff;
    padding: 15px;
    box-sizing: border-box;
  }
  .demand_form{
    padding: 15px 30px;
    box-sizing: border-box;
  }
  .demand_form .subhead{
    margin: 15px 0;
  }
</style>
