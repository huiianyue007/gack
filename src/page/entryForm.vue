<template>
    <div class="entryForm">
        <div class="entryForm_box">
            <div class="entryFormImg" v-if="header.isMoney === 0" ref="Img">
                <img :src="header.eventPicUrl" alt="此处报名图片" />
            </div>
            <div class="isMoney_box" v-if="header.isMoney === 1">
                <div class="isMoney_boxLogo">
                    <img :src="header.eventPicUrl" alt="此处报名图片" />
                </div>
                <div class="isMoney_boxTitle">
                    <div style="display: flex;flex-wrap: wrap;justify-items: center;padding:10px">
                        <p>{{header.eventTitle}}</p>
                        <p style="font-size:12px">{{header.site}}</p>
                        <p style="font-size:12px">{{header.eventStartTime | time}} ~ {{header.eventEndTime | time}}</p>
                    </div>
                </div>
            </div>
            <div v-if="header.isMoney === 1 && !phoneState" class="title_Price">
                <div class="title_Price_box">
                   <div v-for="(item,index) in titlePirce" :key="index" style="display:inline-block;text-align: center;">
                        <span :class="active == index?'activeIndex':''" @click="goodsPrice(index)">{{item.titel}}</span>
                    </div>
                </div>

                <div v-if="header.price" class="chulaiba">
                    <p>单价：</p>
                    <p>{{header.price}} 元</p>
                </div>
                <div v-if="header.price" class="chulaiba">
                    <p>数量：</p>
                    <p>
                        <el-input-number style="width: 120px;" size="small" @change="handleChange" v-bind = 'prop' v-model="header.buyNum"></el-input-number>
                    </p>
                </div>
                <div class="title_Price_line" v-if="header.infor"></div>
                <span v-if="header.infor" style="display:block;font-size:12px;text-align:center;color:#ccc">注：{{header.infor}}</span>
                <!--<el-input-number size="small" v-model="header.num1" @change="handleChange" :min="1" :max="3"></el-input-number>-->
            </div>
            <!--<div class="entryForm_hr" v-if="phoneState"></div>-->
            <div class="entryForm_title" v-if="header.isMoney === 0"></div>
            <div class="entryForm_form" v-loading="loadingTab" style="margin-top:20px">
                <!--<h1>报名信息</h1>-->
                <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="140px" class="demo-dynamic">
                    <div v-for="(item,index) in dynamicValidateForm.ruleForm2" :key="index">
                        <!-- input -->
                        <el-form-item :prop="'ruleForm2.' + index + '.typeName'" :label="item.name" :rules="name" v-if="item.name != '手机号码' & item.name != '电子邮箱' & item.type == 3 & item.required">
                            <el-input v-model="item.typeName" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item :label="item.name" v-if="item.name != '手机号码' & item.name != '电子邮箱' & item.type == 3 & !item.required">
                            <el-input v-model="item.typeName" placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item :label="item.name" :prop="'ruleForm2.' + index + '.typeName'" :rules="phone" v-if="item.name == '手机号码' & item.type == 3 & item.required">
                            <el-input v-model="item.typeName" :maxlength="11" placeholder="请输入"></el-input>
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
                                <el-upload class="upload-demo" :on-remove="handleRemove" :action=`${config.activity}/guoanmaker/operator/activityEnlist/UploadActivityEnlistFile` :file-list="item.typeName" :on-success="scuu" name="upfile">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                </el-upload>
                            </div>
                        </el-form-item>
                        <el-form-item :label="item.name" v-if="item.type == 0 & !item.required">
                            <div @click.capture="imgIndex(index)">
                                <el-upload class="upload-demo" :on-remove="handleRemove" :action=`${config.activity}/guoanmaker/operator/activityEnlist/UploadActivityEnlistFile` :file-list="item.typeName" :on-success="scuu" name="upfile">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                </el-upload>
                            </div>
                        </el-form-item>
                        <!-- 单选 -->
                        <el-form-item :label="item.name" :required="item.required" v-if="item.type == 1 & item.required"
                          :prop="'ruleForm2.' + index + '.typeName'" :rules="resource">
                            <el-radio-group v-model="item.typeName">
                                <el-radio :label="it" v-for="(it,i) in item.paramName1" :key="i"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item :label="item.name" :required="item.required" v-if="item.type == 1 & !item.required">
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
                    <!--<el-form-item label="购买数量" v-if="header.isMoney == 1">
                                                <el-input-number v-model="header.num1" @change="handleChange" :min="header.minPurchaseRestriction" :max="header.maxPurchaseRestriction"></el-input-number>
                                            </el-form-item>-->
                    <el-form-item label="所在公司" prop="companyName" :rules="companyName" v-if="header.isMoney == 1">
                        <el-input placeholder="请输入" v-model="dynamicValidateForm.companyName"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="entryForm_hr" v-if="phoneState || header.isMoney === 0"></div>
            <div v-if="phoneState" class="pcEntryForm_hr_bottom">
                <div align="center" >
                    <el-button type="text" v-if="header.isMoney === 1">{{'付款金额 ￥' + header.total}}</el-button>
                </div>
                <div class="entryForm_submit">
                    <button @click="toCash()">提交</button>
                </div>
            </div>
            <div class="appEntryForm_hr_bottom" v-if="!phoneState && header.isMoney === 1">
                <div align="center" style="border-top: 1px solid #ebebeb;" class="appEntryForm_hr_bottom_box">
                    <!--<el-button type="text" ><span style="font-size: 22px">{{header.total}}</span> 元</el-button>-->
                    <div v-if="header.isMoney === 1"><span style="font-size: 22px">{{header.total}}</span> 元</div>
                    <i></i>
                    <b>{{header.buyNum}} 张</b>
                </div>
                <div class="entryForm_submit">
                    <button @click="toCash()">提交</button>
                </div>
            </div>
            <div v-if="!phoneState && header.isMoney === 0" class="entryForm_submit" style="margin-bottom: 15px" align="center">
                <button @click="toCash()">提交</button>
            </div>
            <div class="entryForm_bottom">
                <p>客服邮箱：gackservice@gakj.citic.com</p>
                <p>客服热线：4008518585</p>
                <p>本活动最终解释权归国安创客所有</p>
            </div>
        </div>
        <div class="successEntry" v-if="showSuccessEntry">
            <img src="../assets/images/information/successEntry.png" alt="加载中。。。" />
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
    data() {
        return {
            active: 0,
            delDisabled: false,
            addDisabled: false,
            //价钱
            titlePirce: [],
            showSuccessEntry: false,
            //头
            header: {
                isMoney: 9527,
                eventPicUrl: '',
                eventTitle: '',
                price: '',
                organizer: '',
                minNum: null,
                maxNum: null,
                total: '0',
                buyNum: 1,
                num1: '',
                site: '',
                eventStartTime: '',
                stockNum: 0,
                eventEndTime: '',
                infor: '',
                id: ''
            },
            loadingTab: false,
            dynamicValidateForm: {
                ruleForm2: [],
                companyName: ''
            },
            companyName: [{ required: true, message: '请输入所在公司', trigger: 'blur' }, { min: 1, max: 15, message: '最多输入 15 个字符', trigger: 'blur,change' }],
            name: [{ required: true, message: '请输入', trigger: 'blur' }, { min: 1, max: 15, message: '最多输入 15 个字符', trigger: 'blur,change' }],
            phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' },
            {
                pattern: /1[3|4|5|7|8][0-9]{9}/, message: '请输入正确的手机号码',
                trigger: 'blur,change'
            }],
            email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '请输入正确的邮箱地址', trigger: 'blur,change' }],
            textarea: [{ required: true, message: '请输入', trigger: 'blur,change' }],
            checkbox: [{ type: 'array', required: true, message: '请至少选择一个', trigger: 'change' }],
            upImg: [{ type: 'array', required: true, message: '请上传', trigger: 'change' }],
            resource: [
                { required: true, message: '请选择', trigger: 'change' }
            ],
            //图片下标
            indexs: 0,
            Id: '',
            userid: '',
            phoneState: false,
            prop: null
        }
    },
    created() {
        this.loadingTab = true
        if (this.$route.query.activityid) {
            this.Id = this.$route.query.activityid
        }
        if (this.$route.query.userid) {
            this.userid = this.$route.query.userid
        } else {
            this.userid = this.$store.state.userid.id
        }
        if(!this.userid){
            window.location.replace('https://apiqa.gack.citic:8443/userActivity1212/commodity/login/login.html?status=5&activityid='+this.Id)
        }
        var ua = window.navigator.userAgent.toLowerCase();
        if (!(/iphone|ipad|ipod/.test(ua) || /android/.test(ua))) {
            this.phoneState = true;
            this.header.buyNum = this.$route.query.buyNum
            this.header.total = this.$route.query.payMoney
            this.header.id = this.$route.query.activityPriceId
        }
        if (this.Id) {
            this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/eventDetails/getSelectEvent`, {}, {
                params: {
                    id: this.Id
                }
            }).then(({ data }) => {
                if (data.status === 200) {
                    var arr = data.data.applicationList
                    this.titlePirce = data.data.activityPriceList
                    if(data.data.isMoney == 1 && !this.phoneState){
                        this.header.id = this.titlePirce[0].id
                        this.header.price = this.titlePirce[0].price;
                        this.header.minNum = this.titlePirce[0].minNum
                        this.header.maxNum = this.titlePirce[0].maxNum
                        this.header.infor = this.titlePirce[0].infor
                        this.header.buyNum = this.titlePirce[0].minNum
                        this.header.stockNum = this.titlePirce[0].stockNum
                        this.header.total = Number(this.header.price) * Number(this.header.buyNum)
                    }

                    //地点
                    this.header.site = data.data.cityName + data.data.placeName + data.data.eventDetailedAddress
                    //时间
                    this.header.eventStartTime = data.data.eventStartTime
                    this.header.eventEndTime = data.data.eventEndTime
                    //海报
                    this.header.eventPicUrl = data.data.eventPicUrl
                    //是否收费
                    this.header.isMoney = data.data.isMoney
                    //价钱
                    //活动名称
                    this.header.eventTitle = data.data.eventTitle
                    //举办方
                    this.header.organizer = data.data.organizer
                    //总价
                    // this.total = data.data[0].unitPrice
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].paramName && arr[i].type === 1) {
                            arr[i].paramName1 = arr[i].paramName.split(',')
                            arr[i].typeName = ''
                        } else if (arr[i].paramName && arr[i].type === 2) {
                            arr[i].paramName2 = arr[i].paramName.split(',')
                            arr[i].typeName = []
                        }
                        if (arr[i].type === 3 || arr[i].type == 4) {
                            arr[i].typeName = ''
                        }
                        if (arr[i].type == 5) {
                            arr[i].typeName = 5
                        }
                        if (arr[i].type == 0) {
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
            }).catch(err => {
            });
        }
    },
    methods: {
        handleChange(val){
            // 如果库存小
            // 如果最大购买数量小
            if (val < this.header.minNum) {
                this.$message.error(`最少购买${this.header.minNum}张`)
                this.prop = {
                    min: this.header.minNum
                }
            } else if (val > this.header.maxNum) {
                this.$message.error(`最多购买${this.header.maxNum}张`)
                this.prop = {
                    max: this.header.maxNum
                }
            }
            window.setTimeout(() => {
                this.header.total = Math.floor(this.header.buyNum * this.header.price * 100) / 100
                this.prop = null
            }, 200)
        },
        //选择价格
        goodsPrice(index) {
            this.active = index;
            this.header.id = this.titlePirce[index].id
            this.header.price = this.titlePirce[index].price;
            this.header.minNum = this.titlePirce[index].minNum
            this.header.maxNum = this.titlePirce[index].maxNum
            this.header.infor = this.titlePirce[index].infor
            this.header.buyNum = this.titlePirce[index].minNum
            this.header.stockNum = this.titlePirce[index].stockNum
            this.header.total = Number(this.header.price) * Number(this.header.buyNum)
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
            if(this.header.total <= 0 && this.header.isMoney == 1){
                this.$message.warning('请选择商品')
                status = true;
            }
            var arr = this.dynamicValidateForm.ruleForm2;
            this.$refs.dynamicValidateForm.validate((valid) => {
                if (valid && !status) {
                    this.loadingTab = true
                    var arr1 = []
                    var arr2 = []
                    arr.map(item => {
                        var name = item.name
                        arr1.push(name)
                        if (item.type == 0) {
                            item.typeName.forEach(it => {
                                item.typeNames += ',' + it.response.data
                            })
                            item.typeNames = item.typeNames.replace(item.typeNames.substring(0, 1), '')
                            arr2.push(item.typeNames)
                        } else if (item.type == 2) {
                            arr2.push(item.typeName.join('、'))
                        } else {
                            arr2.push(item.typeName)
                        }
                    })
                    var result = {};
                    for (var i = 0; i < arr1.length; i++) {
                        if (arr2) {
                            result[arr1[i]] = arr2[i];
                        } else {
                            result[arr1[i][0]] = arr2[i][1];
                        }
                    }
                    let str = qs.stringify(result)
                    if (this.header.isMoney === 1) {
                        var json = {
                            inforValue: str,  //xml 报名列表内容
                            userId: this.userid,     // 报名人
                            activityId: this.Id,
                            linkMan: this.dynamicValidateForm.ruleForm2[0].typeName,
                            telePhone: this.dynamicValidateForm.ruleForm2[1].typeName,
                            buyNum: this.header.buyNum,
                            payMoney: this.header.total,
                            companyName: this.dynamicValidateForm.companyName,
                            activityPriceId: this.header.id,
                        }
                        //signChannel;//报名渠道 0 PC 1 安卓 2 ios
                        var ua = navigator.userAgent.toLowerCase();
                        if (/iphone|ipad|ipod/.test(ua)) {
                            json.signChannel = 2
                        } else if (/android/.test(ua)) {
                            json.signChannel = 1
                        } else{
                            json.signChannel = 0
                        }
                    } else if (this.header.isMoney === 0) {
                        var json = {
                            inforValue: str,
                            activityId: this.Id,
                            userId: this.userid,
                            linkMan: this.dynamicValidateForm.ruleForm2[0].typeName,
                            telePhone: this.dynamicValidateForm.ruleForm2[1].typeName
                        }
                    }
                    this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/activityEnlist/saveActivityEnlist`, json)
                        .then(({ data }) => {
                            if (data.status == 200) {
                                if (this.header.isMoney === 1) {
                                    if (data.msg == '下单成功') {
                                        var ua = navigator.userAgent.toLowerCase();
                                        if (/iphone|ipad|ipod/.test(ua)) {
                                            ToYun.toCashier(data.data.id)
                                            this.loadingTab = false
                                        } else if (/android/.test(ua)) {
                                            ToYun.toCashier(data.data.id)
                                            this.loadingTab = false
                                        } else {
                                            this.$router.push(`/submit-order/${data.data.id}/activity`)
                                            this.loadingTab = false
                                        }
                                    } else {
                                        this.$message.error(data.msg)
                                        this.loadingTab = false
                                    }
                                } else if (this.header.isMoney === 0) {
                                    if (data.msg == '下单成功 ') {
                                        this.Id = ''
                                        var ua = navigator.userAgent.toLowerCase();
                                        if (/iphone|ipad|ipod/.test(ua)) {
                                            this.showSuccessEntry = true;
                                            this.loadingTab = false
                                        } else if (/android/.test(ua)) {
                                            this.showSuccessEntry = true;
                                            this.loadingTab = false
                                        } else {
                                            this.$message.success('报名成功')
                                            this.loadingTab = false
                                            this.$router.push({
                                              path: '/user/appointment',
                                              query: {
                                                title: '活动报名',
                                                fromtitle: '我的预约',
                                                activeType:2
                                              }
                                            })
                                        }
                                    } else {
                                        this.$message.error(data.msg)
                                        this.loadingTab = false
                                    }
                                }
                            } else if (data.status == 104) {
                                this.$message.error(data.msg)
                                this.loadingTab = false
                            } else if (data.status == 103) {
                                this.$message.error(data.msg)
                                this.loadingTab = false
                            }
                        }).catch(err => {
                            this.$message.error(err.msg);
                            this.loadingTab = false
                        });
                }
            })
        }
    }
}

</script>
<style>
.entryForm .centerNum .el-input__inner {
    text-align: center;
}
.entryForm .el-input-number__decrease {
  right: auto;
  left: 0;
  border-right: 1px solid rgb(165, 134, 131);
}
.entryForm .el-input-number .el-input__inner {
   padding: 0 30%;
   text-align:center;
  overflow:hidden;
  text-overflow: ellipsis;
 }
</style>

<style scoped>
/*.entryForm .entryForm_form h1{
    font-size: 20px;
    font-weight: bold;
    margin: 0 0 20px 20px;
}*/

.entryForm .title_Price_line{
    margin: 20px 0 10px 0;
    border: 1px dashed #eee;
}
.entryForm .title_Price_box{
    display: flex;
    justify-content: space-between;
}
.entryForm .title_Price_box div{
    padding: 13px 0;
}
.entryForm .title_Price_box span{
    /*width: 90%;*/
    padding: 0 15px;
    height:28px;
    display: block;
    line-height: 28px;
    border: 1px solid #D8D8D8;
    border-radius: 3px;
}
.entryForm .title_Price{
    padding: 15px 5%;
    border-top: 8px solid rgba(0,0,0,.04);
    border-bottom: 8px solid rgba(0,0,0,.04);
}
.entryForm .chulaiba{
    display: flex;
    margin-top: 10px;
}
.entryForm .chulaiba p{
    width: 50%;
}
.entryForm .chulaiba p:last-child{
    text-align: right;
}
.activeIndex {
    color: #c7000a;
    background-image: url(../assets/images/backImg/Group.png);
    background-size:100% 100%;
    border: none!important;
    height:30px!important;
    line-height: 30px!important;
}

.entryForm .entryForm_bottomHr {
    height: 1px;
    background: #e7e7e7;
    width: 90%;
    margin: 0 auto;
}

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
    background: url('../assets/images/information/background.jpg') no-repeat 0 0;
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
    overflow: hidden;
}

.entryForm_box {
    width: 60%;
    height: auto;
    display: block;
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
    /*margin-bottom: 20px;*/
}

.entryForm_price {
    display: inline-block;
    margin-left: 100px;
}

.isMoney_boxLogo {
    overflow: hidden;
    /*margin-bottom: 20px;*/
}

@media screen and (max-width: 768px) {
    .entryForm_title {
        width: 94%;
        margin: 10px auto;
    }
    .entryForm_bottom{
        margin-top: 0!important;
        border-top: 8px solid rgba(0,0,0,.04);
        padding-top: 15px;
    }
    .entryForm_bottom p{
        font-size: 14px!important;
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
        width: 40%;
        display: inline-block;
        padding: 10px;
        height: 60.7%;
    }

    .isMoney_boxTitle {
        width: 60%;
        display: inline-block;
        vertical-align: top;
        /*height: 100px;*/
    }
    .entryForm_price {
        display: none;
    }

    .isMoney_box {
        display: flex;
        align-items: center;
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
.entryForm .appEntryForm_hr_bottom_box{
    display: flex;
    align-items: center;
    justify-content: center;
}
.pcEntryForm_hr_bottom .entryForm_submit {
    width: 100%;
    height: auto;
    text-align: center;
}
.appEntryForm_hr_bottom {
    display: flex;
    position: fixed;
    width: 100%;
    bottom: 0;
    height: 42px;
    line-height: 42px;
}
.appEntryForm_hr_bottom .appEntryForm_hr_bottom_box{
    width: 40%;
    background: #fff;
}
.appEntryForm_hr_bottom .appEntryForm_hr_bottom_box div{
    color: #EC5142;
}
.appEntryForm_hr_bottom .appEntryForm_hr_bottom_box i{
    width: 1px;
    height: 18px;
    background: #ccc;
    margin: 10px;
}
.appEntryForm_hr_bottom b{
    font-size: 14px;
    color: #ccc;
    font-weight: normal;
}
.appEntryForm_hr_bottom .entryForm_submit{
    width: 60%;
}
.appEntryForm_hr_bottom .entryForm_submit button{
    width:100%;
    border-radius: 0;
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
    margin-bottom: 50px;
    margin-top: 50px;
}

.entryForm_bottom p {
    text-align: center;
    font-size: 16px;
    line-height: 26px;
    color: #9a9a9a;
}

@media screen and (min-width: 769px) {
    .entryForm_form .demo-dynamic,
    .entryForm .title_Price {
        width: 60%;
        display: block;
        margin: 0 auto;
    }
    .entryForm {
        min-width: 1200px;
    }
}
.entryForm_form .el-radio{
    display: block;
    margin-left:0;
    margin: 4px 0;
}
.entryForm_form .el-radio:nth-of-type(1){
    margin-top: 12px;
}
</style>
