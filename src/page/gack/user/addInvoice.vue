<template>
  <div class="invoice">
    <card class = 'view'>
      <div class="title" slot = 'header'><span class="tip inline-block"></span>发票类型</div>
      <el-button @click = 'invoiceType = "0"' :type = 'invoiceType === "0" ? "primary" : ""'>普通发票</el-button>
      <el-button @click = 'invoiceType = "1"' :type = 'invoiceType === "1" ? "primary" : ""'>专用发票</el-button>
    </card>
    <card class = 'view'>
      <div class="title" slot = 'header'><span class="tip inline-block"></span>信息类型</div>
      <el-form class = 'form' :data = 'specialForm' :model = 'specialForm' :rules = 'specialRules' ref="specialForm" label-width="120px"  label-position="left">
        <el-form-item label = '单位名称' prop = 'invoiceName'>
          <el-input v-model = 'specialForm.invoiceName' placeholder = "请输入单位名称"></el-input>
        </el-form-item>
        <el-form-item label = '纳税人识别号' prop = 'taxNumber'>
          <el-input v-model = 'specialForm.taxNumber' placeholder = "请输入纳税人识别号"></el-input>
        </el-form-item>
        <el-form-item label = '注册电话' prop = 'telephone' v-if = 'invoiceType === "1"'>
          <el-input v-model = 'specialForm.telephone' :maxlength="11" placeholder = "请输入注册电话"></el-input>
        </el-form-item>
        <el-form-item label = '注册地址' prop = 'address' v-if = 'invoiceType === "1"'>
          <el-input v-model = 'specialForm.address' placeholder = "请输入注册地址"></el-input>
        </el-form-item>
        <el-form-item label = '开户银行' prop = 'bankName' v-if = 'invoiceType === "1"'>
          <el-input v-model = 'specialForm.bankName' placeholder = "请输入开户银行"></el-input>
        </el-form-item>
        <el-form-item label = '银行账户' prop = 'bankNumber' v-if = 'invoiceType === "1"'>
          <el-input v-model = 'specialForm.bankNumber' placeholder = "请输入银行账户"></el-input>
        </el-form-item>
        <el-form-item label-width = '0px'>
          <el-checkbox-group v-model="specialForm.isdefault" :disabled = 'disabled'>
            <el-checkbox label="是否为默认" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </card>
    <div class="view" v-if = 'invoiceType === "1"'>
      <el-form>
        <el-form-item label = '营业执照'>
          <el-upload class="avatar-uploader" name="companyLogo" :action="`${$config.back}/putImg`" :show-file-list="false" :multiple="false" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess">
            <img v-if="businessFile || (invoiceList &&　invoiceList.businessPic)" :src="businessFile || invoiceList.businessPic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label = '营业副本'>
          <el-upload class="avatar-uploader" name="companyLogo" :action="`${$config.back}/putImg`" :show-file-list="false" :multiple="false" :before-upload="beforeAvatarUploadCopy" :on-success="handleAvatarSuccessCopy">
            <img v-if="businessLicenseFile || (invoiceList && invoiceList.businessLicensePic)" :src="businessLicenseFile || invoiceList.businessLicensePic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <el-button type="primary" size = 'large' @click = 'submit'>保存</el-button>
  </div>
</template>
<script>
  import store from 'store'
 export default {
   name: 'addinvoice',
   data () {
     const checkNumber = (rule, value, callback) => {
       if (!value) {
         return callback(new Error('请输入开户银行账号'));
       } else if (!(/\d/g).test(value)) {
         return callback(new Error('请输入数字值'));
       } else {
           callback();
       }
     }
     const checkTaxNumber = (rule, value, callback) => {
       if (!value) {
         return callback(new Error('请输入纳税人识别号'))
       }
       if (value.length < 10 || value.length > 20) {
         return callback(new Error('输入识别号不能大于20位,不能小于10位'))
       }
       if (!(/^[0-9A-Z]{10,20}$/).test(value)) {
         return callback(new Error('只能包含数字或大写字母'))
       }
       callback()
     }
     return {
       businessFile: '',
       disabled: false,
       businessLicenseFile: '',
       invoiceType: '0',
       specialForm: {
         invoiceName: '',
         taxNumber: '',
         telephone: '',
         address: '',
         bankName: '',
         bankNumber: '',
         isdefault: ''
       },
       specialRules: {
         invoiceName: [{ required: true, message: '请输入单位名称', trigger: 'blur' }],
         taxNumber: [{ required: true, message: '请输入纳税人识别号', trigger: 'blur' }, { validator: checkTaxNumber, trigger: 'blur' }],
         telephone: [{ required: true, message: '请输入手机号', trigger: 'blur' },
           { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }],
         address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
         bankName: [{ required: true, message: '请输入开户银行名称', trigger: 'blur' }],
         bankNumber: [{ required: true, message: '请输入开户银行账号', trigger: 'blur' },{ validator: checkNumber, trigger: 'blur' }]
       }
     }
   },
   computed: {
     invoiceList () {
       if (this.$route.query.id) {
         return this.$store.state.userInfo.invoices.find(item => {
           return item.id === this.$route.query.id
         })
       }
     },
     invoice () {
       return this.$store.state.userInfo.invoices.find(item => {
         return item.isdefault == '1'
       })
     }
   },
   created () {
     if (!this.invoice) {
       this.$set(this.specialForm, 'isdefault', true)
     }
     if (this.invoiceList) {
       this.invoiceType = this.invoiceList.invoiceType
       Object.entries(this.invoiceList).forEach(item => {
         if (item[0] == 'isdefault') {
           if (item[1] == '1') {
             item[1] = true
           } else {
             item[1] = false
           }
         }
         this.specialForm[item[0]] = item[1]
       })
       if (!this.$store.state.userInfo.invoices.length || !this.invoice) {
         this.disabled = true
       }
     } else {
       if (!this.invoice) {
         this.disabled = true
       }
       if (!this.user.invoices.length) {
         this.$set(this.specialForm, 'isdefault', true)
       } else {
         this.$set(this.specialForm, 'isdefault',false)
       }
       this.businessLicenseFile = ''
       this.businessFile= ''
     }
     if (this.$route.query.default == '1') {
       this.$set(this.specialForm, 'isdefault', true)
       this.disabled = true
     }
   },
   beforeDestroy () {
     if (!this.$route.query.id) {
       this.$refs.specialForm.resetFields()
     }
   },
   methods: {
     submit () {
       this.$refs.specialForm.validate((valid) => {
         if (valid) {
           let data = {}
           if (this.invoiceType !== "1") {
             data = {
               invoiceName: this.specialForm.invoiceName,
               taxNumber: this.specialForm.taxNumber,
               isdefault: this.specialForm.isdefault ? '1' : '0',
               invoiceType: this.invoiceType,
               user_id: this.$store.state.userid.id
             }
           } else {
             data = Object.assign(this.specialForm, {
               businessLicenseFile: this.businessLicenseFile.replace(/https/ig, 'http'),
               businessFile: this.businessFile.replace(/https/ig, 'http'),
               isdefault: this.specialForm.isdefault ? '1' : '0',
               invoiceType: this.invoiceType,
               user_id: this.$store.state.userid.id
             })
           }
           let url = this.$route.query.id ? `${this.$config.gack}/guoanmaker/personal/invoice/updateInvoiceForPC` :`${this.$config.gack}/guoanmaker/personal/invoice/saveInvoiceForPC`
           if (this.$route.query.id) {
             data.id = this.$route.query.id
           }
//           data.isdefault = this.specialForm.isdefault ? '1' : '0'
           this.$htAjax.post(url, {}, {
             params: data
           }).then(() => {
             return this.$store.dispatch('findById', this.$store.state.userid.id)
           }).then(() => {
             this.$router.go(-1)
           }).catch(() => {
             this.$message.error('操作失败')
           })
         }
       })
     },
     beforeAvatarUpload(file) {
       const isImg = file.type;
       var isJPG = false;
       if (isImg != 'image/jpeg' && isImg != 'image/png' && isImg != 'image/bmp' && isImg != 'image/gif') {
         this.$message.error('上传头像图片只能是 JPG/PNG/BMP/GIF 格式!');
         isJPG = false;
       } else {
         isJPG = true;
       }
       const isLt2M = file.size / 1024 / 1024 < 3;

       if (!isLt2M) {
         this.$message.error('上传头像图片大小不能超过 3MB!');
       }
       return isJPG && isLt2M;
     },
     handleAvatarSuccess(res, file) {
        this.businessFile = res.data;
//       this.$set(this.formLabelAlign, 'portraitFile', res.data)
     },
     beforeAvatarUploadCopy(file) {
       const isImg = file.type;
       var isJPG = false;
       if (isImg != 'image/jpeg' && isImg != 'image/png' && isImg != 'image/bmp' && isImg != 'image/gif') {
         this.$message.error('上传头像图片只能是 JPG/PNG/BMP/GIF 格式!');
         isJPG = false;
       } else {
         isJPG = true;
       }
       const isLt2M = file.size / 1024 / 1024 < 3;

       if (!isLt2M) {
         this.$message.error('上传头像图片大小不能超过 3MB!');
       }
       return isJPG && isLt2M;
     },
     handleAvatarSuccessCopy(res, file) {
        this.businessLicenseFile = res.data
//       this.$set(this.formLabelAlign, 'portraitFile', res.data)
     }
   }
 }
</script>
<style scoped>
  .invoice{
    background: #f3f3f3;
  }
  .view{
    margin-bottom: 10px;
    background: #fff;
    padding: 15px 24px;
  }
  .invoice .tip{
    width: 6px;
    height: 32px;
    background: #ff0000;
    vertical-align: middle;
    margin-right: 15px;
  }
  .form {
    width: 568px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    border: 1px dashed #e0e0e0;
    border-radius: 5px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
