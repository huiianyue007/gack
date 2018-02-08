<template>
    <div class="invoiceInformation">
        <div class="crumbs">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>商家管理中心</el-breadcrumb-item>
                <el-breadcrumb-item>发票信息管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="invoiceInformation_box" v-loading="loadingTab">
            <div class="expend_list">
                <div class="expend_center">
                    <el-form :inline="true" :model="account" :rules="accountRules" ref="accountForm" label-width="170px" class="demo-form-inline">
                        <div class="expend_top">
                            纳税人种类
                        </div>
                        <div class="account_true">
                            <el-radio-group class='group' v-model="account.taxpayerType">
                                <el-radio class="radio" label="1">小规模纳税人</el-radio>
                                <el-radio class="radio" label="2">一般纳税人</el-radio>
                            </el-radio-group>
                        </div>
                        <div class="expend_top">
                            填写账户信息
                        </div>
                        <div class="account_true">
                            <el-form-item label="公司名称：" prop="companyNamebank" style="margin-bottom:10px">
                                <el-input v-model="account.companyNamebank" :maxlength='50' :disabled="disabled[6]" placeholder="公司名称" style="width:240px;margin-right:10px"></el-input>
                                <el-button type="text" v-if="isOne" @click="editForm(6)">修改</el-button>
                            </el-form-item>
                            <el-form-item label="开户行名称：" prop="banAccountkName">
                                <el-input v-model="account.banAccountkName" :maxlength='50' :disabled="disabled[0]" placeholder="开户行名称" style="width:240px;margin-right:10px"></el-input>
                                <el-button type="text" v-if="isOne" @click="editForm(0)">修改</el-button>
                            </el-form-item>
                            <el-form-item label="开户行账号：" prop="bankAccountNumber">
                                <el-input v-model="account.bankAccountNumber" :maxlength='50' :disabled="disabled[1]" placeholder="开户行账号" style="width:240px;margin-right:10px"></el-input>
                                <el-button type="text" v-if="isOne" @click="editForm(1)">修改</el-button>
                            </el-form-item>
                        </div>
                        <div class="expend_top">
                            填写发票信息
                        </div>
                        <div class="account_true">
                            <el-form-item label="发票抬头：" prop="companyName" :maxlength='50' style="margin-bottom:10px">
                                <el-input v-model="account.companyName" :disabled="disabled[2]" placeholder="发票抬头" style="width:240px;margin-right:10px"></el-input>
                                <el-button type="text" v-if="isOne" @click="editForm(2)">修改</el-button>
                            </el-form-item>
                            <el-form-item label="纳税人识别号：" prop="taxpayerIdentifier" style="margin-bottom:10px">
                                <el-input v-model="account.taxpayerIdentifier" :maxlength='18' :disabled="disabled[3]" placeholder="纳税人识别号" style="width:240px;margin-right:10px"></el-input>
                                <el-button type="text" v-if="isOne" @click="editForm(3)">修改</el-button>
                            </el-form-item>
                        </div>
                        <div class="account_true">
                            <el-form-item label="公司注册地址：" prop="companyAddress">
                                <el-input v-model="account.companyAddress" :maxlength='50' :disabled="disabled[4]" placeholder="公司注册地址" style="width:240px;margin-right:10px"></el-input>
                                <el-button type="text" v-if="isOne" @click="editForm(4)">修改</el-button>
                            </el-form-item>
                            <el-form-item label="联系人手机号：" prop="contactNumber">
                                <el-input v-model="account.contactNumber" :maxlength='11' :disabled="disabled[5]" placeholder="联系人手机号" style="width:240px;margin-right:10px"></el-input>
                                <el-button type="text" v-if="isOne" @click="editForm(5)">修改</el-button>
                            </el-form-item>
                        </div>
                        <div class="account_true">
                            <el-form-item label="营业执照副本扫描件：">
                                <el-upload class="avatar-uploader" name="companyLogo" :action="`${$config.back}/putImg`" :show-file-list="false" :multiple="false" :before-upload="beforeCompanyUpload" :on-success="handlePreview">
                                    <img v-if="account.imageUrl" :src="account.imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    <div slot="tip" class="el-upload__tip" style="line-height:20px;width:300px">
                                        <div style="color:#666;">证件要求：</div>
                                        <div style="text-align: justify;">请上传由中国大陆工商局颁发的，在有效期内且年检章齐全（当年成立的公司可无年检章）的证件图片。请提供清晰、完整的彩色原件扫描件或数码照，仅支持 jpg、bmp、png、gif的图片格式，图片大小不能超过3 M。</div>
                                    </div>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="纳税人资格证明：">
                                <el-upload class="avatar-uploader" name="companyLogo" :action="`${$config.back}/putImg`" :show-file-list="false" :multiple="false" :before-upload="beforeCompanyUpload1" :on-success="handlePreview1">
                                    <img v-if="account.orgurl" :src="account.orgurl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    <div slot="tip" class="el-upload__tip" style="line-height:20px;width:300px">
                                        <div style="color:#666;">证件要求：</div>
                                        <div style="text-align: justify;">必须为清晰完整的彩色原件扫描件或数码照，仅支持jpg、bmp、png、gif的图片格式，图片大小不超过3M。必须在有效期内且年检章齐全（当年成立的公司可无年检章）必须为中国大陆工商局颁发。</div>
                                    </div>
                                </el-upload>
                            </el-form-item>
                        </div>
                        <div class="account_true">
                            <el-form-item>
                                <el-button type="primary" v-if="isOne" style="margin-left:390px;width:180px" :loading="submitLoading" @click="editCompany">确认修改</el-button>
                                <el-button type="primary" v-else style="margin-left:390px;width:180px" :loading="submitLoading" @click="submitCompany">提交</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'invoiceInformation',
    data() {
        // var validateBankAccountNumber = (rule, value, callback) => {
        //     let regExp = /^[0-9a-zA-Z]{16,19}$/g
        //     if (value === '') {
        //         callback(new Error('请输入开户行账号'));
        //     } else if (regExp.test(value) === false) {
        //         callback(new Error('账号为长度在16到19个字符英文或者数字'))
        //     } else {
        //         callback();
        //     }
        // };
        var validateTaxpayerIdentifier = (rule, value, callback) => {
            let regExp = /^[0-9a-zA-Z]{15,18}$/g
            if (value === '') {
                callback(new Error('请输入纳税人识别号'));
            } else if (regExp.test(value) === false) {
                callback(new Error('识别号长度在15到18个字符英文或者数字'))
            } else {
                callback();
            }
        };
        return {

            isOne: false,
            submitLoading: false,
            loadingTab: false,
            account: {
                id: '',
                taxpayerType: '1',
                companyNamebank: '',
                banAccountkName: '',
                bankAccountNumber: '',
                companyName: '',
                taxpayerIdentifier: '',
                companyAddress: '',
                contactNumber: '',
                imageUrl: '',
                orgurl: '',
            },
            disabled: [false, false, false, false, false, false, false],
            accountRules: {
                companyNamebank: [
                    {
                        required: true,
                        message: '请输入公司名称',
                        trigger: 'blur'
                    }
                ],
                banAccountkName: [
                    {
                        required: true,
                        message: '请输入开户行名称',
                        trigger: 'blur'
                    }
                ],
                bankAccountNumber: [
                    {
                        required: true,
                        message: '请输入开户行账号',
                        trigger: 'blur'
                    }
                ],
                companyName: [
                    {
                        required: true,
                        message: '请输入发票抬头',
                        trigger: 'blur'
                    }
                ],
                taxpayerIdentifier: [
                    {
                        required: true,
                        message: '请输入纳税人识别号',
                        trigger: 'blur'
                    }
                ],
                companyAddress: [
                    {
                        required: true,
                        message: '请输入公司注册地址',
                        trigger: 'blur'
                    }
                ],
                contactNumber: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^1[345678]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
                ]
            },
            businessid: ''
        }
    },
    created: function() {
        let businessid = this.$store.state.business;
        if (businessid) {
            this.businessid = businessid;
            this.list()
        }
    },
    methods: {
        //查询
        list() {
            let item = {
                businessid: this.businessid  //服务商id
            }
            //无数据
            this.loadingTab = true;
            var that = this;
            this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/invoice/findProvideInvoice`, {}, { params: item })
                .then(({ data }) => {
                    if (data.status == 200) {
                        if (data.data.id) {
                            that.account.id = data.data.id;
                            that.account.taxpayerType = data.data.taxpayerType;
                            that.account.companyNamebank = data.data.companyNamebank;
                            that.account.banAccountkName = data.data.banAccountkName;
                            that.account.bankAccountNumber = data.data.bankAccountNumber;
                            that.account.companyName = data.data.companyName;
                            that.account.taxpayerIdentifier = data.data.taxpayerIdentifier;
                            that.account.companyAddress = data.data.companyAddress;
                            that.account.contactNumber = data.data.contactNumber;
                            that.account.imageUrl = data.data.businessLicensePic || '';
                            that.account.orgurl = data.data.taxpayerCertificatePic || '';
                            that.isOne = true;
                            that.disabled = [true, true, true, true, true, true, true];
                        } else {
                            that.isOne = false;
                            that.disabled = [false, false, false, false, false, false, false];
                        }
                    } else {
                        that.$message.warning(data.msg);
                    }
                    that.loadingTab = false;
                }).catch(function(err) {
                    that.loadingTab = false;
                });
        },
        //新增
        setList() {
            this.$refs.accountForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    let item = {
                        taxpayerType: this.account.taxpayerType,
                        companyNamebank: this.account.companyNamebank,
                        banAccountkName: this.account.banAccountkName,
                        bankAccountNumber: this.account.bankAccountNumber,
                        companyName: this.account.companyName,
                        taxpayerIdentifier: this.account.taxpayerIdentifier,
                        companyAddress: this.account.companyAddress,
                        contactNumber: this.account.contactNumber,
                        businessLicenseFile: this.account.imageUrl,
                        taxpayerCertificateFile: this.account.orgurl,
                        businessid: this.businessid  //服务商id
                    }
                    var that = this;
                    this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/invoice/createProvideInvoiceForPC`, {}, { params: item })
                        .then(({ data }) => {
                            that.submitLoading = false;
                            if (data.status == 200) {
                                if (data.data.key == 'success') {
                                    that.$message.success(data.data.value);
                                    that.list();
                                } else {
                                    that.$message.warning(data.data.value);
                                }
                            } else {
                                that.$message.warning(data.msg);
                            }
                        }).catch(function(err) {
                            that.$message.warning(err.data.data.value);
                            that.submitLoading = false;
                        });
                }
            })
        },
        //修改
        editList() {
            this.$refs.accountForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    let item = {
                        taxpayerType: this.account.taxpayerType,
                        companyNamebank: this.account.companyNamebank,
                        banAccountkName: this.account.banAccountkName,
                        bankAccountNumber: this.account.bankAccountNumber,
                        companyName: this.account.companyName,
                        taxpayerIdentifier: this.account.taxpayerIdentifier,
                        companyAddress: this.account.companyAddress,
                        contactNumber: this.account.contactNumber,
                        businessLicenseFile: this.account.imageUrl,
                        taxpayerCertificateFile: this.account.orgurl,
                        id: this.account.id  //发票id
                    }
                    var that = this;
                    this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/invoice/updateProvideInvoiceForPC`, {}, { params: item })
                        .then(({ data }) => {
                            that.submitLoading = false;
                            if (data.status == 200) {
                                if (data.data.key == 'success') {
                                    that.disabled = [true, true, true, true, true, true, true];
                                    that.$message.success(data.data.value);
                                } else {
                                    that.$message.warning(data.data.value);
                                }
                            } else {
                                that.$message.warning(data.msg);
                            }
                        }).catch(function(err) {
                            that.submitLoading = false;
                        });
                }
            })
        },
        editForm(index) {
            if (this.disabled[index]) {
                this.$set(this.disabled, index, false);
            } else {
                // var accuntName = 'contactNumber';
                // if (index == 0) {
                //     accuntName = 'banAccountkName';
                // } else if (index == 1) {
                //     accuntName = 'bankAccountNumber';
                // } else if (index == 2) {
                //     accuntName = 'companyName';
                // } else if (index == 3) {
                //     accuntName = 'taxpayerIdentifier';
                // } else if (index == 4) {
                //     accuntName = 'companyAddress';
                // } else if (index == 5) {
                //     accuntName = 'contactNumber';
                // } else if (index == 6) {
                //     accuntName = 'companyNamebank';
                // }
                this.$refs.accountForm.validate((valid) => {
                    if (valid) {
                        this.$set(this.disabled, index, true);
                        this.editList();
                    }
                })
            }

        },
        handlePreview(response, file, fileList) {
            this.account.imageUrl = response.data;
        },
        beforeCompanyUpload(file) {
            const isImg = file.type;
            var isJPG = false;
            if (isImg != 'image/jpeg' && isImg != 'image/png' && isImg != 'image/bmp' && isImg != 'image/gif') {
                this.$message.warning('上传图片只能是 JPG/PNG/BMP/GIF 格式!');
                isJPG = false;
            } else {
                isJPG = true;
            }
            const isLt2M = file.size / 1024 / 1024 < 1;

            if (!isLt2M) {
                this.$message.warning('上传图片大小不能超过 1MB!');
            }
            return isJPG && isLt2M;
        },
        handlePreview1(response, file, fileList) {
            this.account.orgurl = response.data;
        },
        beforeCompanyUpload1(file) {
            const isImg = file.type;
            var isJPG = false;
            if (isImg != 'image/jpeg' && isImg != 'image/png' && isImg != 'image/bmp' && isImg != 'image/gif') {
                this.$message.warning('上传图片只能是 JPG/PNG/BMP/GIF 格式!');
                isJPG = false;
            } else {
                isJPG = true;
            }
            const isLt2M = file.size / 1024 / 1024 < 1;

            if (!isLt2M) {
                this.$message.warning('上传图片大小不能超过 1MB!');
            }
            return isJPG && isLt2M;
        },
        submitCompany() {
            // this.$refs.accountForm.validate((valid) => {
            //     if (valid) {
            //         if (this.account.imageUrl == '') {
            //             this.$message.warning('请上传营业执照副本扫描件');
            //             return false;
            //         }
            //         if (this.account.orgurl == '') {
            //             this.$message.warning('请上传一般纳税人资格证明');
            //             return false;
            //         }

            //     }
            // })
            this.setList();
        },
        editCompany() {
            this.$refs.accountForm.validate((valid) => {
                if (valid) {
                    // if (this.account.imageUrl == '') {
                    //     this.$message.warning('请上传营业执照副本扫描件');
                    //     return false;
                    // }
                    // if (this.account.orgurl == '') {
                    //     this.$message.warning('请上传一般纳税人资格证明');
                    //     return false;
                    // }
                    // this.disabled = [false, false, false, false, false, false, false];
                    this.editList();
                }
            })
        }

    },
    watch: {

    }
}



</script>
<style  scoped>
.crumbs {
    height: auto;
    margin: 15px 0;
    margin-top: 15px;
    width: 100%;
}

.invoiceInformation_box {
    width: 100%;
    height: auto;
    overflow: hidden;
}

.expend_list {
    width: 100%;
    height: auto;
    overflow: hidden;
}

.expend_top {
    font-size: 14px;
    box-sizing: border-box;
    width: 100%;
    height: 20px;
    margin: 6px 0;
    color: #333;
    font-weight: 600;
    line-height: 20px;
}

.expend_top:before {
    content: '|';
    color: #c7000a;
    font-weight: bold;
    height: 20px;
    float: left;
    padding-right: 10px;
    line-height: 18px;
}

.expend_center {
    width: 100%;
    height: auto;
    overflow: hidden;
}

.account_true {
    margin: 15px 0 0 0px;
}

.account_true .group {
    width: 840px;
    height: 50px;
    line-height: 50px;
    overflow: hidden;
}

.account_true .radio {
    width: 50%;
    margin: 0;
    text-align: center;
    float: left;
}

.expend_center .avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.expend_center .avatar-uploader .el-upload:hover {
    border-color: #c7000a;
}

.expend_center .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    border: 1px dashed #d9d9d9;
    line-height: 178px;
    text-align: center;
}

.expend_center .avatar-uploader-icon:hover {
    border: 1px dashed #c7000a;
}

.expend_center .avatar {
    width: 178px;
    height: auto;
    min-height: 178px;
    display: block;
}
</style>

