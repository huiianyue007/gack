<template>
    <div>
        <div class="step">
            <el-steps :space="500" :active="active" align-center center>
                <el-step title="修改密码"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
        </div>
        <div class="pwd" v-if="active=='1'">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="130px" class="demo-ruleForm">
                <el-form-item label="当前登陆密码" prop="lodpass">
                    <el-input type="password" v-model="ruleForm2.lodpass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新的登陆密码" prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" :minlength="6" :maxlength="12"></el-input>
                </el-form-item>
                <el-form-item label="确认新的登陆密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" :minlength="6" :maxlength="12"></el-input>
                </el-form-item>
                <el-form-item align-center center style="margin-top:50px;">
                    <el-button type="primary" style="padding:11px 30px;" @click="submitForm">确定</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="suc" v-if="active=='2'">
            <div class="check">
                <i class="el-icon-check"></i>
            </div>
            <span>修改成功，请记住您新的登录密码</span>
            <div class="btn">
                <el-button type="primary" @click="changeRouter">重新登陆</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import md5 from 'js-md5'

export default {
    data() {
        var validatePass = (rule, value, callback) => {
            let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
            if (value == '') {
                callback(new Error('请输入密码'));
            } else if (regExp.test(value) === false) {
                callback(new Error('6-12字母和数字组成，不能是纯数字或纯英文'))
            } else {
                if (this.ruleForm2.checkPass !== '') {
                    this.$refs.ruleForm2.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass3 = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入当前登陆密码'));
            } else {
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (regExp.test(value) === false) {
                callback(new Error('6-12字母和数字组成，不能是纯数字或纯英文'))
            } else if (value !== this.ruleForm2.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            active: 1,
            userid: '',
            ruleForm2: {
                lodpass: '',
                pass: '',
                checkPass: ''
            },
            rules2: {
                lodpass: [
                    { validator: validatePass3, }
                ],
                pass: [
                    { validator: validatePass, }
                ],
                checkPass: [
                    { validator: validatePass2, }
                ]
            }
        }

    },
    created() {
        let user = this.$store.state.userid;
        if (user) {
            this.userid = user.id
        }
    },
    methods: {
        submitForm() {
            this.$refs.ruleForm2.validate((valid) => {
                if (valid) {
                    let passwordMd = md5(this.ruleForm2.checkPass);
                    let oldPassword= md5(this.ruleForm2.lodpass);
                    let item = {
                        userid: this.userid,
                        oldPassword: oldPassword.toUpperCase(),
                        newPassword: passwordMd.toUpperCase()
                    }
                    var that = this;
                    this.$htAjax.post('https://apitest.gack.citic:8081/guoanmaker/personal/user/changeUserPassword', {}, { params: item })
                        .then(({ data }) => {
                            if (data.status == 200) {
                                if (data.data.key == 'success') {
                                    that.$message.success(data.data.value);
                                    that.active = 2
                                } else if (data.data.key == 'error') {
                                    that.$message.warning(data.data.value);
                                    that.active = 1
                                }
                            } else {
                                that.$message.error(data.msg);
                            }
                        }).catch(function(err) {
                        });
                } else {
                    return false;
                }
            });
        },
        changeRouter() {
            this.$router.push('/login/0');
        }
    }
}
</script>
<style scoped>
.step {
    width: 100%;
    height: auto;
    margin: 0 auto;
    padding: 30px 0;
}

.pwd {
    width: 40%;
    margin: 30px auto;
}

.suc {
    margin-top: 50px;
    text-align: center;
    position: relative;
}

.suc .check {
    width: 50px;
    height: 50px;
    background-color: #C7000A;
    border-radius: 50%;
    text-align: center;
    line-height: 50px;
    color: white;
    font-size: 25px;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -250px;
}

.suc span {
    font-size: 26px;
    line-height: 50px;
}

.suc .btn {
    text-align: center;
    margin-top: 20px;
}
</style>
