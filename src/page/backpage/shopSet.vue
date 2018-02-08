<template>
    <div class="shopSet">
        <div class="crumbs">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>商家管理中心</el-breadcrumb-item>
                <el-breadcrumb-item>店铺设置</el-breadcrumb-item>
                <el-breadcrumb-item>基础设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="店铺名称" prop="shopName">
                    <el-input v-model="ruleForm.shopName" placeholder="请填写店铺名称" style="width:500px;" ></el-input>
                </el-form-item>
                <el-form-item label="认证手机" prop="phone">
                    <el-input v-model="ruleForm.phone" :maxlength="11" placeholder="请填写认证手机" style="width:300px;" :disabled='isWrite'></el-input>
                    <el-button type="text" @click="isWrite=false">修改</el-button>
                </el-form-item>
                <el-form-item label="所在地" style="width:800px" required>
                    <el-col :span="5">
                        <el-form-item prop="province">
                            <el-select v-model="ruleForm.province" style="width:100%" @change='provinceChange' placeholder="请选省份">
                                <el-option v-for="(item,index) in provinces" :key='index' :label="item.name" :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="1">
                        &nbsp;
                    </el-col>
                    <el-col :span="5">
                        <el-form-item prop="city">
                            <el-select v-model="ruleForm.city" style="width:100%" @change='cityChange' placeholder="请选市">
                                <el-option v-for="(item,index) in citys" :key='index' :label="item.name" :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="1">
                        &nbsp;
                    </el-col>
                    <el-col :span="5">
                        <el-form-item prop="area">
                            <el-select v-model="ruleForm.area" style="width:100%" placeholder="请选县/区">
                                <el-option v-for="(item,index) in areas" :key='index' :label="item.name" :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="详细地址" prop="address">
                    <el-input v-model="ruleForm.address" placeholder="请填写详细地址" style="width:500px;"></el-input>
                </el-form-item>
                <el-form-item label="店铺logo" required>
                    <el-upload class="avatar-uploader" name="companyLogo" :action="`${$config.back}/putImg`" :show-file-list="false" :multiple="false" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess1">
                        <img v-if="ruleForm.uplogoUrl" :src="ruleForm.uplogoUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="焦点图APP">
                    <el-upload class="avatar-uploader APP" name="companyLogo" :action="`${$config.back}/putImg`" :show-file-list="false" :multiple="false" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess2">
                        <img v-if="ruleForm.upshopUrl" :src="ruleForm.upshopUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span class='red'>为了展示效果美观，建议上传375*147的图片</span>
                </el-form-item>
                <!--<el-form-item label="焦点图PC">
                    <el-upload class="avatar-uploader PC" name="companyLogo" :action="`${$config.back}/putImg`" :show-file-list="false" :multiple="false" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess4">
                        <img v-if="ruleForm.upshopPcUrl" :src="ruleForm.upshopPcUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span class='red'>为了展示效果美观，建议上传340*258的图片</span>
                </el-form-item>-->

                <el-form-item label="营业执照" required>
                    <el-upload class="avatar-uploader" name="companyLogo" :action="`${$config.back}/putImg`" :show-file-list="false" :multiple="false" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess3">
                        <img v-if="ruleForm.uplicensesUrl" :src="ruleForm.uplicensesUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="店铺简介">
                    <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="ruleForm.brief" style="width:500px;">
                    </el-input>
                </el-form-item>
                <el-form-item style="text-align: center;margin-right:300px;">
                    <el-button type="primary" @click="submitForm" :loading="submitLoading">确认提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            businessid: '',
            submitLoading: false,
            isWrite: true,
            ruleForm: {
                id: '',
                shopName: '',
                phone: '',
                province: '',
                city: '',
                area: '',
                address: '',
                logoUrl: '',
                uplogoUrl: '',
                shopUrl: '',
                upshopUrl: '',
                shopPcUrl: '',
                upshopPcUrl: '',
                licensesUrl: '',
                uplicensesUrl: '',
                brief: '',
            },
            provinces: [],
            citys: [],
            areas: [],
            rules: {
                shopName: [
                    { required: true,message: '请输入店铺名称', trigger: 'blur' },
                ],
                phone: [
                    { required: true,message: '请填写手机号' },
                    {
                        pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
                        message: '请填写正确的手机号',
                        trigger: 'blur'
                    }
                ],
                province: [
                    { required: true, message: '请选择省份', trigger: 'change' }
                ],
                city: [
                    { required: true, message: '请选择市', trigger: 'change' }
                ],
                area: [
                    { required: true, message: '请选择县/区', trigger: 'change' }
                ],
                address: [
                    { required: true, message: '请输入详细地址', trigger: 'blur' }
                ],
                brief: [
                    { required: true, message: '请填写店铺简介', trigger: 'blur' },
                ]
            },
            look: true,
            looks: true,
        }
    },
    created() {
        // 商户ID
        let businessid = this.$store.state.business;
        if (businessid) {
            this.businessid = businessid;
        }
        this.$htAjax.post(`${this.$config.back}/selProvinceList`)
            .then(({ data }) => {
                if (data.status === 200) {
                    this.provinces = data.data;
                } else {
                    that.$message.error(data.msg);
                }
            }).catch(function(err) {

            });

        this.init()
    },
    methods: {
        init() {
            var reg = {
                businessId: this.businessid
            }
            this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/shop/selectProvideShop`, {}, {
                params: reg
            }).then(({ data }) => {
                if (data.status == 200) {
                    this.look = false;
                    this.looks = false;
                    this.ruleForm.shopName = data.data.result.businessName
                    this.ruleForm.phone = data.data.result.licensPhone
                    this.ruleForm.province = data.data.result.companyProvince
                    this.provinceChange(data.data.result.companyProvince);
                    this.cityChange(data.data.result.companyCity);
                    this.ruleForm.address = data.data.result.companyAdress
                    this.ruleForm.logoUrl = data.data.result.companyLogo
                    this.ruleForm.uplogoUrl = data.data.result.companyLogo
                    this.ruleForm.shopUrl = data.data.result.banner
                    this.ruleForm.upshopUrl = data.data.result.banner
                    this.ruleForm.shopPcUrl = data.data.result.bannerForPc
                    this.ruleForm.upshopPcUrl = data.data.result.bannerForPc
                    this.ruleForm.licensesUrl = data.data.result.companyLicenseReplica
                    this.ruleForm.uplicensesUrl = data.data.result.companyLicenseReplica
                    this.ruleForm.brief = data.data.result.introduce
                    this.ruleForm.id = data.data.result.id
                    this.ruleForm.area = data.data.result.companyArea   
                    this.ruleForm.city = data.data.result.companyCity
                }
            }).catch(({ data }) => {
                this.loadingInformation = false;
            });
        },
        submitForm() {
            var province = this.provinces.filter((o) => {
                return o.code == this.ruleForm.province;
            })
            var city = this.citys.filter((o) => {
                return o.code == this.ruleForm.city;
            })
            var area = this.areas.filter((o) => {
                return o.code == this.ruleForm.area;
            })
            var cal=province[0].name+city[0].name+area[0].name
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    var reg = {
                        id: this.ruleForm.id,
                        businessName: this.ruleForm.shopName,
                        licensPhone: this.ruleForm.phone,
                        companyAdress: this.ruleForm.address,
                        companyProvince: this.ruleForm.province,
                        companyCity: this.ruleForm.city,
                        companyArea: this.ruleForm.area,
                        companyLogo: this.ruleForm.uplogoUrl,
                        banner: this.ruleForm.upshopUrl,
                        bannerForPc: this.ruleForm.upshopPcUrl,
                        introduce: this.ruleForm.brief,
                        companyLicenseReplica: this.ruleForm.uplicensesUrl,
                        cal:cal
                    }
                    this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/shop/modProvideShop`, reg)
                    .then(({ data }) => {
                        if (data.status == 200) {
                            this.submitLoading = false;
                            this.$alert('成功提交信息，请耐心等待审核结果', '提示', {
                                confirmButtonText: '确定',
                            });
                        }
                    }).catch(({ data }) => {
                        this.submitLoading = false;
                    });
                } else {
                    this.$message.warning('请仔细检查页面信息后，再次提交！');
                    this.submitLoading = false;
                    return false;
                }
            });
        },
        //省变化
        provinceChange(item) {
            var reg = {
                procode: item
            }
            var that = this;
            this.$htAjax.post(`${this.$config.back}/selcityList`, {}, {
                params: reg
            }).then(({ data }) => {
                if (data.status === 200) {
                    that.citys = data.data;
                    if(that.looks){
                        that.ruleForm.city = that.citys[0].code;
                        that.cityChange(that.ruleForm.city)
                    }else{
                        that.looks = true;
                    }
                } else {
                    that.$message.error(data.msg);
                }
            }).catch(function(err) {

            });

        },

        //市变化
        cityChange(item) {
            var reg = {
                citycode: item
            }
            var that = this;
            this.$htAjax.post(`${this.$config.back}/selAreaList`, {}, {
                params: reg
            }).then(({ data }) => {
                if (data.status === 200) {
                    that.areas = data.data;
                    if(that.look){
                        that.ruleForm.area = that.areas[0].code;
                    }else{
                        that.look = true
                    }
                } else {
                    that.$message.error(data.msg);
                }
            }).catch(function(err) {

            });
        },
        handleAvatarSuccess1(response, file, fileList) {
            this.ruleForm.logoUrl = URL.createObjectURL(file.raw);
            this.ruleForm.uplogoUrl = response.data;
        },
        handleAvatarSuccess2(response, file, fileList) {
            this.ruleForm.shopUrl = URL.createObjectURL(file.raw);
            this.ruleForm.upshopUrl = response.data;
        },
        handleAvatarSuccess3(response, file, fileList) {
            this.ruleForm.licensesUrl = URL.createObjectURL(file.raw);
            this.ruleForm.uplicensesUrl = response.data;
        },
        handleAvatarSuccess4(response, file, fileList) {
            this.ruleForm.shopPcUrl = URL.createObjectURL(file.raw);
            this.ruleForm.upshopPcUrl = response.data;
        },
        beforeAvatarUpload(file) {
            const isImg = file.type;
            var isJPG = false;
            if (isImg != 'image/jpeg' && isImg != 'image/png' && isImg != 'image/bmp' && isImg != 'image/gif') {
                this.$message.warning('上传图片只能是 JPG/PNG/BMP/GIF 格式!');
                isJPG = false;
            } else {
                isJPG = true;
            }
            const isLt2M = file.size / 1024 / 1024 < 0.2;

            if (!isLt2M) {
                this.$message.warning('上传图片大小不能超过 200kb!');
            }
            return isJPG && isLt2M;
        },
    }
}
</script>
<style scoped>
.crumbs {
    height: auto;
    margin: 15px 0;
    margin-top: 15px;
    width: 100%;
}
.red{
    color:red;
}
</style>
<style>
.shopSet .avatar-uploader .el-upload {
    width: 178px;
    height: 178px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.shopSet .avatar-uploader.APP .el-upload {
    width: 375px;
    height: 147px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.shopSet .avatar-uploader.PC .el-upload {
    width: 178px;
    height: 136px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.shopSet .avatar-uploader.comImg .el-upload {
    width: 320px;
    height: 178px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.shopSet .avatar-uploader .el-upload:hover {
    border-color: #c7000a;
}

.shopSet .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.shopSet .APP .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 375PX!important;
    height: 147px!important;
    line-height: 147px;
    text-align: center;
}
.shopSet .PC .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178PX!important;
    height: 136px!important;
    line-height: 136px;
    text-align: center;
}
</style>
