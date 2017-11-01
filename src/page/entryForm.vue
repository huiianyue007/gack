<template>
    <div class="entryForm">
        <div class="entryForm_box">
            <div class="entryFormImg" v-if="isMoney === 0">
                <img :src="eventPicUrl" alt="此处报名图片" />
            </div>
            <div class="isMoney_box" v-if="isMoney === 1">
                <div class="isMoney_boxLogo">
                    <img :src="eventPicUrl" alt="此处报名图片" />
                </div>
                <div class="isMoney_boxTitle">
                    <div style="margin-top :20px">
                        <p>{{eventTitle}}</p>
                        <p>{{'￥' + unitPrice}}</p>
                        <p>{{organizer}}</p>
                    </div>
                </div>
            </div>
            <div class="entryForm_title" v-if="isMoney === 0"></div>
            <div class="entryForm_form" v-loading="loadingTab">
                <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                    <div v-for="(item,index) in ruleForm2.type" :key="index">
                        <!--<el-tooltip :content="item.infor" placement="top" :disabled="disableds &&
                                 item.type == 3 ||( item.name == '姓名' 
                            || item.name == '手机号码' || item.name == '电子邮箱' || item.infor == '')">-->
                        <el-form-item :label="item.name" v-if="item.type === 3 & item.required
                                                                                                  & item.name ==='电子邮箱'" :prop="'type.'+ index+'.typeName'" :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                                                                                         { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }]">
                            <el-input placeholder="请输入" v-model="item.typeName"></el-input>
                        </el-form-item>
                        <el-form-item :label="item.name" v-if="item.type === 3 & item.required
                                                                                                                                                                                            & item.name ==='手机号码'" :prop="'type.'+ index+'.typeName'" :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },
                                                                                                                                                                                            { pattern:/1[3|4|5|7|8][0-9]{9}/, message: '请输入正确的手机号码', trigger: 'blur,change' }]">
                            <el-input placeholder="请输入" v-model="item.typeName"></el-input>
                        </el-form-item>
                        <el-form-item :label="item.name" v-if="item.type === 3 & item.required &
                                                                                                                                                                                           item.name !=='电子邮箱' & item.name !=='手机号码'" :prop="'type.'+ index+'.typeName'" :rules="[{ required: true, message: '请输入', trigger: 'blur' },
                                                                                                                                                                             { min: 1, max: 15, message: '最多输入 15 个字符', trigger: 'blur,change' }]">
                            <el-input placeholder="请输入" v-model="item.typeName"></el-input>
                        </el-form-item>
                        <el-form-item :label="item.name" v-if="item.type === 3 & !item.required">
                            <el-input placeholder="请输入" v-model="form1.name"></el-input>
                        </el-form-item>
                        <el-form-item :label="item.name" v-if="item.type === 0" :required="item.required">
                            <el-upload class="upload-demo" action="https://apitest.gack.citic:8083/guoanmaker/operator/activityEnlist/UploadActivityEnlistFile"
                             :file-list="fileList" :on-success="scuu" :on-remove="handleRemove" name="upfile">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item :label="item.name" v-if="item.type === 1 & item.required" prop="option1" :required="item.required">
                            <el-radio-group v-model="form1.option1">
                                <el-radio :label="it" v-for="(it,i) in paramName1" :key="i"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item :label="item.name" v-if="item.type === 1 & !item.required" prop="option1">
                            <el-radio-group v-model="form1.option1">
                                <el-radio :label="it" v-for="(it,i) in paramName1" :key="i"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item :label="item.name" v-if="item.type === 2 & item.required" :required="item.required">
                            <el-checkbox-group v-model="option2">
                                <el-checkbox :label="it" v-for="(it, key) in paramName2" :value="it" :key='key'>
                                    {{it}}
                                </el-checkbox>
                            </el-checkbox-group>
                            <div class="el-form-item__error" v-if="errorOption2">至少选择一个</div>
                        </el-form-item>
                        <el-form-item :label="item.name" v-if="item.type === 2 & !item.required" :required="item.required">
                            <el-checkbox-group v-model="option2">
                                <el-checkbox :label="it" v-for="(it,i) in paramName2" :key='i'>
                                    {{it}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item :label="item.name" v-if="item.type === 4 & item.required" :required="item.required">
                            <el-input type="textarea" @blur="textarea(form1.textarea)" :rows="2" placeholder="请输入内容" v-model="form1.textarea">
                            </el-input>
                            <div class="el-form-item__error" v-if="errorTextarea">请输入</div>
                        </el-form-item>
                        <el-form-item :label="item.name" v-if="item.type === 4 & !item.required">
                            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form1.textarea">
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="item.name" v-if="item.type === 5 & item.required" :required="item.required">
                            <el-rate v-model="form1.value1" style="line-height:42px"></el-rate>
                        </el-form-item>
                        <el-form-item :label="item.name" v-if="item.type === 5 & !item.required">
                            <el-rate v-model="form1.value1" style="line-height:42px"></el-rate>
                        </el-form-item>
                        <!--</el-tooltip>-->
                    </div>
                </el-form>
                <el-form v-if="isMoney === 1" label-width="100px" :model="ruleForm" class="demo-ruleForm" :rules="rules" ref="ruleForm">
                    <!--<el-form-item label="联系人" prop="name" :rules="[{ required: true, message: '请输入联系人', trigger: 'blur' },
                                                                                            { min: 1, max: 5, message: '最多输入 5 个字符', trigger: 'blur,change' }]">
                                <el-input placeholder="请输入" v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="电话" prop="telePhone" :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },
                                                                                             { pattern:/1[3|4|5|7|8][0-9]{9}/, message: '请输入正确的手机号码', trigger: 'blur,change' }]">
                                <el-input placeholder="请输入" v-model="ruleForm.telePhone"></el-input>
                            </el-form-item>-->
                    <el-form-item label="购买数量">
                        <!--<el-tooltip :content="'单价 ￥ '+ unitPrice" placement="top" :disabled="disableds">-->
                        <el-input-number v-model="num1" @change="handleChange" :min="minPurchaseRestriction" :max="maxPurchaseRestriction"></el-input-number>
                        <!--</el-tooltip>-->
                        <!--<span class="entryForm_price">单价 {{' ￥' + unitPrice}}</span>-->
                    </el-form-item>
                    <el-form-item label="所在公司" prop="companyName" :rules="[{ required: true, message: '请输入所在公司', trigger: 'blur' },
                                                                                            { min: 1, max: 15, message: '最多输入 15 个字符', trigger: 'blur,change' }]">
                        <el-input placeholder="请输入" v-model="ruleForm.companyName"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="entryForm_hr"></div>
            <div align="center">
                <el-button type="text" v-if="isMoney === 1">{{'付款金额 ￥' + total}}</el-button>
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
            disableds: false,
            option2: [],
            form1: {
                name: '',
                option1: '',
                textarea: '',
                value1: 5
            },
            errorOption2: false,
            errorTextarea: false,
            fileList: [],
            eventPicUrl: '',
            paramName1: '',
            paramName2: '',
            ruleForm2: {
                type: []
            },
            ruleForm: {
                name: '',
                telePhone: '',
                buyNum: 1,//购买数量
                companyName: ''
            },
            rules: {},
            loadingTab: false,
            Id: '',
            isMoney: 0,
            eventTitle: '',
            unitPrice: 0,
            organizer: '',
            num1: 1,
            total: 0,
            userid: '',
            minPurchaseRestriction: 0,
            maxPurchaseRestriction: 100,
            showSuccessEntry: false
        }
    },

    methods: {
        toCash() {
            var isquery = true;
            this.ruleForm2.type.map(it => {
                if (it.type === 3 && it.typeName === '' && it.required) {
                    this.$message.warning('请填写完整信息')
                    isquery = false;
                } else if (it.type === 3 && it.required && it.name == '手机号码' && it.typeName) {
                    if (!/1[3|4|5|7|8][0-9]{9}/.test(it.typeName)) {
                        this.$message.warning('请填写合法手机号')
                        isquery = false;
                    }
                } else if (it.type === 3 && it.required && it.name == '电子邮箱' && it.typeName) {
                    if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(it.typeName)) {
                        this.$message.warning('请填写合法邮箱')
                        isquery = false;
                    }
                }
                if (this.fileList.length == 0 && it.type === 0 && it.required) {
                    this.$message.warning('请填写完整信息')
                    return false;
                }
                if (this.option2.length == 0 && it.type === 2 && it.required) {
                    this.$message.warning('请填写完整信息')
                    isquery = false;
                }
                if (this.form1.textarea == '' && it.type === 4 && it.required) {
                    this.$message.warning('请填写完整信息')
                    isquery = false;
                }

            })
            if (this.isMoney === 1) {
                if (this.ruleForm.companyName == '') {
                    this.$message.warning('请填写完整信息')
                    isquery = false;
                }
            }
            if (isquery) {
                this.loadingTab = true;
                var arr1 = []
                var arr2 = []
                this.ruleForm2.type.map(item => {
                    var name = item.name
                    arr1.push(name) 
                    if (item.type === 0) {
                        this.fileList.forEach(it=>{
                            item.typeName.push(it.response.data)
                        })
                    }
                    if (item.type === 1) {
                        item.typeName = this.form1.option1
                    }
                    if (item.type === 2) {
                        item.typeName = this.option2.join('、')
                    }
                    if (item.type === 4) {
                        item.typeName = this.form1.textarea
                    }
                    if (item.type === 5) {
                        item.typeName = this.form1.value1
                    }
                    var value = item.typeName  
                    arr2.push(value) 
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
                if (this.isMoney === 1) {
                    var json = {
                        inforValue: str,  //xml 报名列表内容
                        userId: this.userid,     // 报名人
                        activityId: this.Id,
                        linkMan: this.ruleForm2.type[0].typeName,
                        telePhone: this.ruleForm2.type[1].typeName,
                        buyNum: this.ruleForm.buyNum,
                        payMoney: this.total,
                        companyName: this.ruleForm.companyName
                    }
                } else if (this.isMoney === 0) {
                    var json = {
                        inforValue: str,
                        activityId: this.Id,
                        userId: this.userid,
                        linkMan: this.ruleForm2.type[0].typeName,
                        telePhone: this.ruleForm2.type[1].typeName
                    }
                }
                this.$htAjax.post('https://apitest.gack.citic:8083/guoanmaker/operator/activityEnlist/saveActivityEnlist', json)
                    .then(({ data }) => {
                        if (data.status == 200) {
                            if (this.isMoney === 1) {
                                var ua = navigator.userAgent.toLowerCase();
                                if (/iphone|ipad|ipod/.test(ua)) {
                                    ToYun.toCashier(data.data.id)
                                    this.loadingTab = false
                                } else if (/android/.test(ua)) {
                                    ToYun.toCashier(data.data.id)
                                    // this.$message.warning(typeof (data.data.id))
                                    this.loadingTab = false
                                } else {
                                    this.$router.push(`/submit-order/${data.data.id}/activity`)
                                    this.loadingTab = false
                                }
                                // this.$message.success('报名成功')
                            } else if (this.isMoney === 0) {
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
                                    this.$router.push('/')
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
                        this.$message.error(err.data.msg);
                        this.loadingTab = false
                    });
            }
        },
        handleChange(val) {
            this.total = val * this.unitPrice
            this.ruleForm.buyNum = val
        },
        options(val) {
            if (val.length == 0) {
                this.errorOption2 = true
            } else {
                this.errorOption2 = false
            }
        },
        scuu(res, file, fileList) {
            this.fileList = fileList
        },
        handleRemove(file, fileList) {
            this.fileList = fileList
        },
        textarea(val) {
            if (val) {
                this.errorTextarea = false
            } else {
                this.errorTextarea = true
            }
        }
    },
    created() {
        var ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) {
            this.disableds = true
        } else if (/android/.test(ua)) {
            this.disableds = true
        }
        this.loadingTab = true
        if (this.$route.query.activityid) {
            this.Id = this.$route.query.activityid
        }
        if (this.$route.query.userid) {
            this.userid = this.$route.query.userid
        } else {
            this.userid = this.$store.state.userid.id
        }
        if (this.Id) {
            this.$htAjax.post('https://apitest.gack.citic:8083/guoanmaker/operator/eventDetails/getSelectEvent', {}, {
                params: {
                    id: this.Id
                }
            }).then(({ data }) => {
                if (data.status === 200) {
                    this.ruleForm2.type = data.data[1]
                    //海报
                    this.eventPicUrl = data.data[0].eventPicUrl
                    //是否收费
                    this.isMoney = data.data[0].isMoney
                    //价钱
                    this.unitPrice = data.data[0].unitPrice

                    if (this.isMoney === 1) {
                        this.minPurchaseRestriction = data.data[0].minPurchaseRestriction;
                        this.maxPurchaseRestriction = data.data[0].maxPurchaseRestriction;
                        this.total = this.unitPrice * this.minPurchaseRestriction
                    }
                    this.ruleForm.buyNum = this.minPurchaseRestriction
                    //活动名称
                    this.eventTitle = data.data[0].eventTitle

                    //举办方
                    this.organizer = data.data[0].organizer
                    //总价
                    // this.total = data.data[0].unitPrice
                    this.ruleForm2.type.map((item, index) => {
                        if (item.paramName && item.type === 1) {
                            this.paramName1 = item.paramName.split(',')
                            this.form1.option1 = this.paramName1[0]
                            item.typeName = ''
                        } else if (item.paramName && item.type === 2) {
                            this.paramName2 = item.paramName.split(',')
                            item.typeName = []
                        }
                        if (item.type === 3 || item.type == 4 || item.type == 5) {
                            item.typeName = ''
                        }
                        if (item.type == 0) {
                            item.typeName = []
                        }
                        this.loadingTab = false
                    })
                } else {
                    this.$message.error(data.msg);
                    this.loadingTab = false
                }
            }).catch(err => {
            });
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
