<template>
  <div class="entryForm">
    <div class="entryForm_box">
      <div class="entryFormImg" v-if="header.isMoney === 0">
        <img :src="header.eventPicUrl" alt="此处报名图片" />
      </div>
      <div class="isMoney_box" v-if="header.isMoney === 1">
        <div class="isMoney_boxLogo">
          <img :src="header.eventPicUrl" alt="此处报名图片" />
        </div>
        <div class="isMoney_boxTitle">
          <div style="margin-top :20px">
            <p>{{header.eventTitle}}</p>
            <p>{{'￥' + header.unitPrice}}</p>
            <p>{{header.organizer}}</p>
          </div>
        </div>
      </div>
      <div class="entryForm_title" v-if="header.isMoney === 0"></div>
      <div class="entryForm_form" v-loading="loadingTab">
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
          <div v-for="(item,index) in dynamicValidateForm.ruleForm2">
            <!-- input -->
            <el-form-item :prop="'ruleForm2.' + index + '.typeName'" :label="item.name" :rules="name" v-if="item.name != '手机号码' & item.name != '电子邮箱' & item.type == 3 & item.required">
              <el-input v-model="item.typeName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item :label="item.name" v-if="item.name != '手机号码' & item.name != '电子邮箱' & item.type == 3 & !item.required">
              <el-input v-model="item.typeName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item :label="item.name" :prop="'ruleForm2.' + index + '.typeName'" :rules="phone" v-if="item.name == '手机号码' & item.type == 3 & item.required">
              <el-input v-model="item.typeName" maxlength="11" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item :label="item.name" v-if="item.name == '手机号码' & item.type == 3 & !item.required">
              <el-input v-model="item.typeName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item :label="item.name" :prop="'ruleForm2.' + index + '.typeName'" :rules="email" v-if="item.name == '电子邮箱' & item.type == 3 & item.required">
              <el-input v-model="item.typeName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item :label="item.name" v-if="item.name == '电子邮箱' & item.type == 3 & !item.required">
              <el-input v-model="item.typeName" placeholder="请输入"></el-input>
            </el-form-item>
            <!-- 上传图 -->
            <el-form-item :label="item.name" :required="item.required" v-if="item.type == 0 & item.required" :prop="'ruleForm2.' + index + '.typeName'" :rules="upImg">
              <div @click.capture='imgIndex(index)'>
                <el-upload class="upload-demo" :on-remove="handleRemove" action="https://apitest.gack.citic:8083/guoanmaker/operator/activityEnlist/UploadActivityEnlistFile" :file-list="item.typeName" :on-success="scuu" name="upfile">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </div>
            </el-form-item>
            <el-form-item :label="item.name" v-if="item.type == 0 & !item.required">
              <div @click.capture="imgIndex(index)">
                <el-upload class="upload-demo" :on-remove="handleRemove" action="https://apitest.gack.citic:8083/guoanmaker/operator/activityEnlist/UploadActivityEnlistFile" :file-list="item.typeName" :on-success="scuu" name="upfile">
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </div>
            </el-form-item>
            <!-- 单选 -->
            <el-form-item :label="item.name" :required="item.required" v-if="item.type == 1">
              <el-radio-group v-model="item.typeName">
                <el-radio :label="it" v-for="(it,i) in item.paramName1" :key="i"></el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 多选 -->
            <el-form-item :label="item.name" v-if="item.type === 2 & item.required" :required="item.required" :prop="'ruleForm2.' + index + '.typeName'" :rules="checkbox">
              <el-checkbox-group v-model="item.typeName">
                <el-checkbox :label="it" v-for="(it, key) in item.paramName2" :value="it" :key='key'>
                  {{it}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item :label="item.name" v-if="item.type === 2 & !item.required">
              <el-checkbox-group v-model="item.typeName">
                <el-checkbox :label="it" v-for="(it, key) in item.paramName2" :value="it" :key='key'>
                  {{it}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <!-- 文本域 -->
            <el-form-item :label="item.name" v-if="item.type === 4 & item.required" :required="item.required" :prop="'ruleForm2.' + index + '.typeName'" :rules="textarea">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="item.typeName">
              </el-input>
            </el-form-item>
            <el-form-item :label="item.name" v-if="item.type === 4 & !item.required">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="item.typeName">
              </el-input>
            </el-form-item>
            <!-- 小星星 -->
            <el-form-item :label="item.name" v-if="item.type === 5" :required="item.required">
              <el-rate v-model="item.typeName" style="line-height:42px"></el-rate>
            </el-form-item>
          </div>
          <el-form-item label="购买数量" v-if="header.isMoney == 1">
            <el-input-number v-model="header.num1" @change="handleChange" :min="header.minPurchaseRestriction" :max="header.maxPurchaseRestriction"></el-input-number>
          </el-form-item>
          <el-form-item label="所在公司" prop="companyName" :rules="companyName" v-if="header.isMoney == 1">
            <el-input placeholder="请输入" v-model="dynamicValidateForm.companyName"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="entryForm_hr"></div>
      <div align="center">
        <el-button type="text" v-if="header.isMoney === 1">{{'付款金额 ￥' + header.total}}</el-button>
      </div>
      <div class="entryForm_submit">
        <button @click="toCash()">提交</button>
      </div>
      <div class="entryForm_bottom">
        <p>客服邮箱：gackservice@gakj.citic.com</p>
        <p>客服热线：4008518585</p>
        <p>本活动最终解释权归国安创客所有</p>
      </div>
    </div>
    <div class="successEntry" v-if="showSuccessEntry">
      <img src="../assets/information/successEntry.png" alt="加载中。。。" />
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    data() {
      return {
        showSuccessEntry: false,
        //头
        header: {
          isMoney: 9527,
          eventPicUrl: '',
          eventTitle: '',
          unitPrice: '',
          organizer: '',
          minPurchaseRestriction: '',
          maxPurchaseRestriction: '',
          total: '',
          buyNum: 1,
          num1: ''
        },
        loadingTab: false,
        dynamicValidateForm: {
          ruleForm2: [],
          companyName: ''
        },
        companyName: [{
          required: true,
          message: '请输入所在公司',
          trigger: 'blur'
        }, {
          min: 1,
          max: 15,
          message: '最多输入 15 个字符',
          trigger: 'blur,change'
        }],
        name: [{
          required: true,
          message: '请输入',
          trigger: 'blur'
        }, {
          min: 1,
          max: 15,
          message: '最多输入 15 个字符',
          trigger: 'blur,change'
        }],
        phone: [{
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          },
          {
            pattern: /1[3|4|5|7|8][0-9]{9}/,
            message: '请输入正确的手机号码',
            trigger: 'blur,change'
          }
        ],
        email: [{
            required: true,
            message: '请输入邮箱地址',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: 'blur,change'
          }
        ],
        textarea: [{
          required: true,
          message: '请输入',
          trigger: 'blur,change'
        }],
        checkbox: [{
          type: 'array',
          required: true,
          message: '请至少选择一个',
          trigger: 'change'
        }],
        upImg: [{
          type: 'array',
          required: true,
          message: '请上传',
          trigger: 'change'
        }],
        //图片下标
        indexs: 0,
        Id: '',
        userid: ''
      }
    },
    created() {
      this.loadingTab = true
      if(this.$route.query.activityid) {
        this.Id = this.$route.query.activityid
      }
      if(this.$route.query.userid) {
        this.userid = this.$route.query.userid
      } else {
        this.userid = this.$store.state.userid.id
      }
      if(this.Id) {
        this.$htAjax.post('https://apitest.gack.citic:8083/guoanmaker/operator/eventDetails/getSelectEvent', {}, {
          params: {
            id: this.Id
          }
        }).then(({
          data
        }) => {
          if(data.status === 200) {
            var arr = data.data[1]
            //海报
            this.header.eventPicUrl = data.data[0].eventPicUrl
            //是否收费
            this.header.isMoney = data.data[0].isMoney
            //价钱
            this.header.unitPrice = data.data[0].unitPrice

            if(this.header.isMoney === 1) {
              this.header.minPurchaseRestriction = data.data[0].minPurchaseRestriction;
              this.header.maxPurchaseRestriction = data.data[0].maxPurchaseRestriction;
              this.header.total = this.header.unitPrice * this.header.minPurchaseRestriction
            }
            this.header.buyNum = this.header.minPurchaseRestriction
            //活动名称
            this.header.eventTitle = data.data[0].eventTitle

            //举办方
            this.header.organizer = data.data[0].organizer
            //总价
            // this.total = data.data[0].unitPrice
            for(var i = 0; i < arr.length; i++) {
              if(arr[i].paramName && arr[i].type === 1) {
                arr[i].paramName1 = arr[i].paramName.split(',')
                arr[i].typeName = arr[i].paramName1[0]
              } else if(arr[i].paramName && arr[i].type === 2) {
                arr[i].paramName2 = arr[i].paramName.split(',')
                arr[i].typeName = []
              }
              if(arr[i].type === 3 || arr[i].type == 4) {
                arr[i].typeName = ''
              }
              if(arr[i].type == 5) {
                arr[i].typeName = 5
              }
              if(arr[i].type == 0) {
                arr[i].typeName = []
                arr[i].typeNames = ''
              }
            }
            this.loadingTab = false
            this.dynamicValidateForm.ruleForm2 = arr
          } else {
            this.$message.error(data.msg);
            this.loadingTab = false
          }
        }).catch(err => {});
      }
    },
    methods: {
      handleChange(val) {
        this.header.total = val * this.header.unitPrice
        this.header.buyNum = val
      },
      imgIndex(index) {
        this.indexs = index
      },
      scuu(res, file, fileList) {
        this.dynamicValidateForm.ruleForm2[this.indexs].typeName = fileList
      },
      handleRemove(file, fileList) {
        this.dynamicValidateForm.ruleForm2[this.indexs].typeName = fileList
      },
      toCash() {
        var arr = this.dynamicValidateForm.ruleForm2;
        this.$refs.dynamicValidateForm.validate((valid) => {
          if(valid) {
            this.loadingTab = true
            var arr1 = []
            var arr2 = []
            arr.map(item => {
              var name = item.name
              arr1.push(name)
              if(item.type == 0) {
                item.typeName.forEach(it => {
                  item.typeNames += ',' + it.response.data
                })
                item.typeNames = item.typeNames.replace(item.typeNames.substring(0, 1), '')
                arr2.push(item.typeNames)
              } else if(item.type == 2) {
                arr2.push(item.typeName.join('、'))
              } else {
                arr2.push(item.typeName)
              }
            })
            var result = {};
            for(var i = 0; i < arr1.length; i++) {
              if(arr2) {
                result[arr1[i]] = arr2[i];
              } else {
                result[arr1[i][0]] = arr2[i][1];
              }
            }
            let str = qs.stringify(result)
            if(this.header.isMoney === 1) {
              var json = {
                inforValue: str, //xml 报名列表内容
                userId: this.userid, // 报名人
                activityId: this.Id,
                linkMan: this.dynamicValidateForm.ruleForm2[0].typeName,
                telePhone: this.dynamicValidateForm.ruleForm2[1].typeName,
                buyNum: this.header.buyNum,
                payMoney: this.header.total,
                companyName: this.dynamicValidateForm.companyName
              }
            } else if(this.header.isMoney === 0) {
              var json = {
                inforValue: str,
                activityId: this.Id,
                userId: this.userid,
                linkMan: this.dynamicValidateForm.ruleForm2[0].typeName,
                telePhone: this.dynamicValidateForm.ruleForm2[1].typeName
              }
            }
            this.$htAjax.post('https://apitest.gack.citic:8083/guoanmaker/operator/activityEnlist/saveActivityEnlist', json)
              .then(({
                data
              }) => {
                if(data.status == 200) {
                  _czc.push(["_trackEvent", '订单', '报名活动', header.eventTitle]);

                  if(this.header.isMoney === 1) {
                    var ua = navigator.userAgent.toLowerCase();
                    if(/iphone|ipad|ipod/.test(ua)) {
                      ToYun.toCashier(data.data.id)
                      this.loadingTab = false
                    } else if(/android/.test(ua)) {
                      ToYun.toCashier(data.data.id)
                      this.loadingTab = false
                    } else {
                      this.$router.push(`/submit-order/${data.data.id}/activity`)
                      this.loadingTab = false
                    }
                  } else if(this.header.isMoney === 0) {
                    this.Id = ''
                    var ua = navigator.userAgent.toLowerCase();
                    if(/iphone|ipad|ipod/.test(ua)) {
                      this.showSuccessEntry = true;
                      this.loadingTab = false
                    } else if(/android/.test(ua)) {
                      this.showSuccessEntry = true;
                      this.loadingTab = false
                    } else {
                      this.$message.success('报名成功')
                      this.loadingTab = false
                      this.$router.push('/')
                    }
                  }
                } else if(data.status == 104) {
                  this.$message.error(data.msg)
                  this.loadingTab = false
                } else if(data.status == 103) {
                  this.$message.error(data.msg)
                  this.loadingTab = false
                }
              }).catch(err => {
                this.$message.error(err.data.msg);
                this.loadingTab = false
              });
          }
        })
      }
    }
  }
</script>

<style scoped>
  .entryForm .successEntry {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #fff;
  }
  
  .entryForm .successEntry img {
    width: 50%;
    display: block;
    margin: 6rem auto;
  }
  
  .entryForm {
    width: 100%;
    height: auto;
    background: url('../assets/information/background.jpg') no-repeat 0 0;
    background-size: 100% 100%;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 4px;
  }
  
  .isMoney_boxTitle {
    display: none;
  }
  
  .entryForm img {
    width: 100%;
  }
  
  .entryFormImg {
    margin-bottom: 10px;
    height: 300px;
    overflow: hidden;
  }
  
  .entryForm_box {
    width: 60%;
    height: auto;
    display: block;
    min-height: 1000px;
    background: #fff;
    margin: 75px auto;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, .1), 0 10px 10px 0 rgba(170, 182, 206, .36);
    overflow: hidden;
  }
  
  .entryForm_form {
    width: 620px;
    height: auto;
    margin: 0 auto;
    overflow: hidden;
    padding-right: 25px;
  }
  
  .entryForm_hr {
    height: 20px;
    line-height: 20px;
    overflow: hidden;
    position: relative;
    margin: 0 60px 10px 60px;
  }
  
  .isMoney_boxLogo img {
    display: block;
    width: 100%;
    /* height: 100%; */
    margin-bottom: 20px;
  }
  
  .entryForm_price {
    display: inline-block;
    margin-left: 100px;
  }
  
  .isMoney_boxLogo {
    height: 300px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  
  @media screen and (max-width: 768px) {
    .entryForm_title {
      width: 94%;
      margin: 10px auto;
    }
    .isMoney_boxLogo img {
      height: 100%;
    }
    .entryForm_hr {
      width: 90%;
      margin: 10px auto;
    }
    .entryForm_form {
      width: auto;
      padding-right: 25px;
    }
    .entryForm,
    .entryForm_box {
      width: 100%;
      min-width: auto;
    }
    .entryForm_box {
      margin: 0;
    }
    .isMoney_boxLogo {
      width: 30%;
      display: inline-block;
      padding: 10px;
      height: 100px;
    }
    .isMoney_boxTitle {
      width: 60%;
      display: inline-block;
      vertical-align: top;
      height: 100px;
    }
    .entryForm_price {
      display: none;
    }
    .isMoney_box {
      height: 120px;
    }
    .entryFormImg {
      height: auto;
    }
  }
  
  .entryForm_title {
    width: 100%;
    height: auto;
    overflow: hidden;
  }
  
  .entryForm_hr:after {
    content: '';
    width: 100%;
    height: 1px;
    background: #e7e7e7;
    position: absolute;
    top: 50%;
    left: 0;
  }
  
  .entryForm_hr span {
    position: absolute;
    left: 50%;
    top: 0;
    width: 180px;
    color: #333;
    font-size: 18px;
    margin-left: -90px;
    text-align: center;
    display: block;
    height: 20px;
    line-height: 20px;
    z-index: 99;
    background: #fff;
  }
  
  .entryForm_submit {
    width: 100%;
    height: auto;
    text-align: center;
  }
  
  .entryForm_submit button {
    color: #fff;
    background: #F70000;
    width: 280px;
    height: 42px;
    line-height: 42px;
    text-align: center;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    outline: none;
  }
  
  .entryForm_bottom {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin: 50px 0;
  }
  
  .entryForm_bottom p {
    text-align: center;
    font-size: 16px;
    line-height: 26px;
    color: #9a9a9a;
  }
  
  @media screen and (min-width: 769px) {
    .entryForm_form .el-form {
      width: 60%;
      display: block;
      margin: 0 auto;
    }
    .entryForm {
      min-width: 1200px;
    }
  }
</style>