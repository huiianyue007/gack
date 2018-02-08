<template>
  <page v-loading='loading' class = 'oh contract_page'>
    <div class="container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>合同下载</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="container bg_white">
        <el-row class='contract'>
          <div class="text-center search">
            合同搜索
            <el-input class='input-with-select' v-model='keywords' @keyup.enter.native = 'search'>
              <el-button type='primary' slot="append" icon="el-icon-search" @click='search'></el-button>
            </el-input>
          </div>
          <el-col :span='6' class='con_list'>
            <div class="title">合同分类</div>
            <div class="cursor list" :class = "{activeClass: activeIndex == key}" v-for='(item, key) in conList' :key = 'key' @click='searchList(item, key)' v-if="item.useCount > 0 || item.name == '全部分类'">{{ item.name }}<span v-if = 'item.name !== "全部分类"'>({{ item.useCount }})</span></div>
          </el-col>
          <el-col :span='18' class = 'con_con'>
            <el-table :data="tableData" border class = 'table'>
              <el-table-column prop="name" label="合同名称">
                <template slot-scope='scope'>
                  <el-tooltip :disabled = 'scope.row.name.length <12 || activeIndex !== 0' :content="scope.row.name" placement="top">
                    <span class='text-hidden cursor'>{{scope.row.name}}</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="typename" v-if = 'activeIndex === 0' label="合同分类">
              </el-table-column>
              <el-table-column label="下载" width="120">
                <template slot-scope='scope'>
                  <span class='cursor ' :style = '{color: scope.row.blue}' @click.self='download(scope.row)'>请点击</span>
                  <span class='cursor ' :style = '{color: scope.row.blue}' @click.self='preview(scope.row)'>预览</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" class='fr pagination' @current-change="handleCurrentChange" :page-size='pageSize' :current-page="currentPage" layout="prev, pager, next" :total="totalCount" v-if='totalCount'>
            </el-pagination>
          </el-col>
        </el-row>
      </div>
      <div class="text-center con_footer">
        没有您需要的合同？请您在下方留下您需要的合同信息，我们会扩充我们的合同库，并以邮件方式第一时间通知您，感谢支持！
      </div>
      <el-form :inline="true" :model="contractForm" :rules="contractRules" ref="contractForm" label-width="100px" class="rule_form">
        <el-form-item label='合同类型' prop='type'>
          <el-input v-model='contractForm.type' placeholder='请输入合同类型'></el-input>
        </el-form-item>
        <el-form-item label='合同名称' prop='name'>
          <el-input v-model='contractForm.name' placeholder="请输入合同名称"></el-input>
        </el-form-item>
        <el-form-item label='邮箱' prop='email'>
          <el-input v-model='contractForm.email' placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <div class="text-center">
          <el-button type="primary" @click.stop = 'submit' size = 'large'>提交</el-button>
        </div>
      </el-form>
      <el-dialog :visible.sync="previewVisible" class="text-center" :close-on-click-modal='false'>
        <div class="title preview_title">{{ previewTitle }}</div>
        <img :src="imgSrc" alt="">
      </el-dialog>
      <el-dialog :visible.sync="prizeTableVisible" :close-on-click-modal='false' @close = 'close'>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo_rule_form">
          <el-form-item class="reg_message" label="验证码" required prop="code">
            <el-col :span="11">
              <el-input v-model="ruleForm.code" :maxlength="6" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11" class="reg-line">
              <g-verify @click.native="regGetCode" width='100' height="36" :code='verCode'></g-verify>
            </el-col>
          </el-form-item>
          <div class="text-center">
            <el-button @click="submitDownLoad">确定</el-button>
          </div>
        </el-form>
      </el-dialog>
      <ver-login :dialogVisible = 'dialogLoginVisible' @change = 'change'>请登录后继续操作</ver-login>
    </div>
  </page>
</template>
<script>
  import GVerify from 'components/GVerify'
  import verLogin from 'components/verLogin'
  export default {
    name: 'contract',
    data() {
      const validatever = (rules, value, callback) => {
        if(value.toUpperCase() !== this.verCode.toUpperCase()) {
          callback(new Error('验证码不正确'));
        } else {
          callback()
        }
      }
      return {
        keywords: '',
        conList: [{
          name: '全部分类'
        }],
        previewVisible: false,
        previewTitle:'',
        tableData: [],
        loading: true,
        totalCount: 0,
        imgSrc: '',
        pageSize: 15,
        currentPage: 1,
        verCode: '',
        blue: 'blue',
        prizeTableVisible: false,
        dialogLoginVisible: false,
        contractForm: {
          type: '',
          name: '',
          email: ''
        },
        ruleForm: {
          code: ''
        },
        params: null,
        file: '',
        contractRules: {
          name: [{
            required: true,
            message: '请输入合同名称',
            trigger: 'blur'
          }],
          type: [{
            required: true,
            message: '请输入合同类型',
            trigger: 'blur'
          }],
          email: [{
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          }, {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: '请输入正确的邮箱'
          }],
        },
        activeIndex: 0,
        activeContrat: null,
        rules: {
          code: [{
            validator: validatever,
            trigger: 'blur'
          }],
        }
      }
    },
    created () {
      this.conList = [{
        name: '全部分类'
      }]
      this.params = null
      this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/contract/contractTypes`).then(({
        data
      }) => {
        this.loading = false
        this.conList = this.conList.concat(data.data)
        this.init()
      }).catch(error => {
        this.loading = false
      })
    },
    methods: {
      preview (opt) {
        this.imgSrc = opt.img
        this.previewTitle = opt.name
        this.previewVisible = true
      },
      close () {
        this.ruleForm.code = ''
        this.$refs.ruleForm.resetFields()
      },
      change () {
        this.dialogLoginVisible =  false
      },
      handleSizeChange(val) {
        //pagesize改变时候触发
        this.pagesize = val;
        this.init();
      },
      handleCurrentChange(val) {
        //当前页改变时候触发
        this.currentPage = val
        //参数1  查询条件 当前页码  当前页显示条数
        this.init()

      },
      submit () {
        this.$refs.contractForm.validate((valid) => {
            if(valid) {
              if (!this.$store.state.userInfo) {
                this.dialogLoginVisible = true
                return false
              }
              this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/contract/addContractDemand`, {}, {
                params: this.contractForm
              }).then(({ data }) => {
                if (data.data == 1) {
                  this.$alert('需求已收到，感谢您对我们的支持，更新合同库后会通过邮箱第一时间对您进行通知，请关注邮箱邮件！', '', {
                    confirmButtonText: '确定'
                  });
                } else {
                  this.$alert('需求已存在，添加失败', '', {confirmButtonText: '确定'})
                }
              }).catch(error => {
                console.log(error)
              })
            }
        })
      },
      regGetCode() {
        if (this.$refs.ruleForm) {
          this.$refs.ruleForm.resetFields()
        }
        this.resetVerCode().then((res) => {
          this.verCode = res.data.data.code
        }).catch(error => {
          console.log(error)
        })
      },
      search() {
        this.currentPage = 1
        this.activeIndex = 0
        this.keywords = this.keywords.replace(/ /g, '')
        this.params = {
          name: this.keywords
        }
        this.init()
      },
      searchList(opt, key) {
        this.keywords = ''
        this.currentPage = 1
        if (opt.name == '全部分类') {
          this.params = null
        } else {
          this.params = opt
        }
        this.activeIndex = key
        this.init()
      },
      init() {
        this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/contract/findAllContract`, {}, {
          params: {
            name: this.params && !this.params.id ? this.params.name : null,
            typeid: this.params ? this.params.id : null,
            currentPage: this.currentPage - 1,
            pageSize: this.pageSize
          }
        }).then(({
          data
        }) => {
          this.loading = false
          this.tableData = data.data.contracts.map(item => {
            item.blue = 'blue'
            return item
          })
          this.totalCount = data.data.totalCount
        }).catch(error => {
          console.log(error)
        })
      },
      submitDownLoad() {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
            window.location.href = `${this.$config.activity}/guoanmaker/operator/contract/downloadFile.htmls?id=${this.file}&userId=${this.$store.state.userid.id}`
            this.prizeTableVisible = false
            this.$set(this.activeContrat, 'blue', 'red')
            this.ruleForm.code = ''
          }
        })
      },
      download(opt) {
        if (!this.$store.state.userInfo) {
          this.dialogLoginVisible = true
          return false
        }
        this.file = opt.id
        this.activeContrat = opt
        this.regGetCode()
        this.prizeTableVisible = true
      }
    },
    components: {
      GVerify, verLogin
    }
  }
</script>
<style scoped>
  .contract_page{
    background: #eee;
  }
  .bg_white {
    background: #fff;
  }
  .contract {
    margin: 15px auto;
    width: 720px;
    padding: 15px;
    box-sizing: border-box;
    overflow:hidden;
  }
  .search{
    margin: 15px auto 20px;
  }
  .contract .con_con {
    padding-left: 10%;
  }
  .contract .con_con .table {
    width: 520px;
  }
  .contract .con_list{
    min-height: 685px;
    border-right: 1px solid #000;
  }
  .contract .list {
    line-height: 50px;
  }

  .input-with-select {
    margin-left: 20px;
    width: 600px;
  }

  .pagination {
    margin-top: 15px;
  }
  .con_footer{
    border-top: 1px dashed #333;
    line-height: 50px;
    color: #666;
  }
  .activeClass{
    color: #ff0000;
  }
  .rule_form {
    margin-bottom:50px;
    text-align:center;
  }
  .preview_title{
    margin-bottom: 20px;
  }
</style>
<style>
  .contract_page .el-input-group__append, .el-input-group__prepend:nth-of-type(2){
    border: 1px solid #c7000a;
  }
  .contract_page .el-input-group__append .el-button.el-button--primary{
    background: #c7000a;
    border-color: #c7000a;
    border-bottom-left-radius: 0px;
    border-top-left-radius: 0px;
    color: #fff;
  }
</style>
