<template>
  <div class="page">
    <div class="container">
      <el-breadcrumb class = 'bread' separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>服务项目</el-breadcrumb-item>
        <el-breadcrumb-item>确认订单</el-breadcrumb-item>
      </el-breadcrumb>
      <card :bodyStyle = "{padding: '15px'}" v-if = 'commodity'>
        <div class="title" slot = 'header'> <span class = 'inline-block'></span>购买的商品</div>
        <div class="subead service" v-if = 'commodity'>
          服务商名称: {{ commodity.businessName }}
        </div>
        <el-row class = 'table'>
          <el-col :span = '5' class = 'text-center'>
            <img :src="commodity.commodity_smallimage"  width = '134' height = '134' alt="">
          </el-col>
          <el-col :span = '19'>
            <div class="title">{{ commodity.commodityName }}</div>
            <div class="subhead">单价: <span class="text-red">{{ commodity.finalPrice}}元</span></div>
            <div class="subhead">地区 {{ $route.query.activeAddress }}</div>
          </el-col>
        </el-row>
      </card>
      <card :bodyStyle = '{padding: "15px"}' class="form" v-if = 'commodity'>
        <div class="title" slot = 'header'>个人信息</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class = 'form_container'>
          <el-form-item label="联系人" prop = 'contactPerson' required>
            <el-input v-model = 'ruleForm.contactPerson' :minlength = '2' :maxlength = '7' placeholder="请输入联系人"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop = 'contactNumber' required>
            <el-input v-model = 'ruleForm.contactNumber' :maxlength = '11' placeholder = '请输入联系电话'></el-input>
          </el-form-item>
          <el-form-item label = '租用数量' v-if = 'commodity.type == "1"' prop = 'quantity' required>
            <el-input v-model = "ruleForm.quantity" placeholder="请填写租用数量"></el-input>
          </el-form-item>
          <el-form-item label="租赁时间范围：" label-width = '140px' required class="serverarea" v-if = 'commodity.type == "1"'>
            <el-col :span="12">
              <el-form-item prop="beginDate">
                <el-date-picker :editable = 'false' v-model="ruleForm.beginDate" type="datetime" placeholder="选择起始时间" :picker-options="pickerOptions"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="endDate">
                <el-date-picker v-model="ruleForm.endDate" type="datetime" placeholder="选择结束时间"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label = '请描述你的需求' :maxlength = '50' prop="endDate">
            <el-input type="textarea" :rows = '4' v-model = 'ruleForm.requirementDescription' placeholder = '请填写您的需求描述'></el-input>
          </el-form-item>
        </el-form>
      </card>
      <div class="text-center" v-if = 'commodity'>
        <el-button size = 'large' type = 'danger' @click.native = 'submit'>{{ commodity.isBargaining === "1" ? "询低价" : "确认订单"}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import card from 'components/card'
  export default {
    data () {
      const checkNumber = (rules, val, callback) => {
        if (val <= 0) {
          callback('选择数量不能小于0')
        } else {
          callback()
        }
      }
      let self =this
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        commodity: null,
        ruleForm: {
          contactPerson: '',
          contactNumber: '',
          quantity: '',
          requirementDescription: '',
          beginDate: '',
          endDate: ''
        },
        rules: {
          contactPerson: [{
            required: true, message: '请输入联系人', trigger: 'blur'
          }],
          contactNumber: [{
            required: true, message: '请输入联系方式', trigger: 'blur'
          }, {
            pattern: /1[3|4|5|7|8][0-9]{9}/, message: '请输入正确的手机号码', trigger: 'blur'
          }],
          quantity: [{
            required: true, message: '请输入租赁数量', trigger: 'blur',
          }, {
            validator: checkNumber, trigger: 'blur'
          }],
          beginDate: [{ type:'date', validator: self.checkStartTime, trigger: 'blur' }],
          endDate: [{ type:'date', validator: self.checkEndTime, trigger: 'blur' }]
        }
      }
    },
    activated () {
      this.$htAjax.get('https://apitest.gack.citic:8082/guoanmaker/provide/commodityMove/getProvideCommodity', {
        params: {
          id: this.query.id,
          cityCode: this.address.inCity.code,
        }
      }).then(({ data }) => {
          this.commodity = data.data
      }).catch(error => {
        console.log(error)
      })
    },
    computed: {
      query () {
        return this.$route.query
      }
    },
    methods: {
      checkStartTime (rules, value, callback) {
        if (this.commodity.type !== '1') {
          return callback()
        }
        if (!value) {
          callback('请选择开始时间')
        } else if (this.ruleForm.endDate && this.ruleForm.endDate.getTime() < value.getTime()){
          callback('起始时间要早于结束时间')
        } else {
          callback()
        }
      },
      checkEndTime (rules, value, callback) {
        if (this.commodity.type !== '1') {
          return callback()
        }
        if (!value) {
          callback('请选择开始时间')
        } else if (this.ruleForm.beginDate && this.ruleForm.beginDate.getTime() > value.getTime()){
          callback('起始时间要早于结束时间')
        } else {
          callback()
        }
      },
      timeFormat (opt) {
        let time = new Date(opt)
        return time.getFullYear() + '-' + (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + '-' + (time.getDate() < 10 ? '0' + time.getDate() : time.getDate())
      },
      submit () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let data = {}
            for (let name in this.ruleForm) {
              if (this.ruleForm[name]) {
                data[name] = this.ruleForm[name]
              }
            }
            data.beginDate = this.timeFormat(data.beginDate)
            data.endDate = this.timeFormat(data.endDate)
            data.userid = this.$store.state.userid.id
            data.commodityid = this.commodity.id
            if (this.commodity.type === "2" && this.commodity.isTerritoryRestriction === "1") {
              data.serverPlace = this.$route.query.activeAddress
              data.rangeid = this.$route.query.code
            }
            let url = ''
            if (this.commodity.isBargaining === '1') {
              url = 'https://apitest.gack.citic:8081/guoanmaker/personal/orderform/createBargainingOrder'
            } else if (this.commodity.type === '2') {
              url = 'https://apitest.gack.citic:8081/guoanmaker/personal/orderform/createNotBargainingOrder'
            } else if (this.commodity.type === '1') {
              url = 'https://apitest.gack.citic:8081/guoanmaker/personal/orderform/createSeatLeaseOrder'
            }
            this.$htAjax.post(url, {}, {
              params: data
            }).then(({ data }) => {
              if (this.commodity.isBargaining === '1') {
                this.$message({
                  type: 'success',
                  message: '提交成功， 服务商会火速与您联系'
                })
                this.$router.go(-1)
              } else {
                this.$message({
                  type: 'success',
                  message: '订单创建成功'
                })
                this.$router.push(`/submit-order/${data.data.value}/commodity`)
              }
            }).catch(() => {
              this.$message.error('商品库存不足')
            })
          }
        });
      }
    },
    components: {
      card
    }
  }
</script>
<style scoped>
  .page{
    background: #f3f3f3;
    padding-bottom: 40px;
  }
  .table{
    padding: 10px 0;
    background:#fff;
  }
  .title .inline-block{
    width:6px;
    height:30px;
    background:rgba(199,0,10,1);
    vertical-align: middle;
    margin-right: 9px;
  }
  .table img{
    max-width: 100%;
  }
  .text-red{
    color: #f00;
  }
  .table .title{
    margin: 10px 0;
  }
  .subhead{
    margin-top: 15px;
  }
  .service{
    width:100%;
    line-height:40px;
    padding:0 20px;
    background:rgba(240,240,240,1);
  }
  .form{
    margin:15px 0;
  }
  .form_container{
    width:50%;
  }
</style>
