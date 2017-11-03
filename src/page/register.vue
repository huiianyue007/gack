<template>
    <div class="reg_box">
        <login-header login>注册</login-header>
        <div class="reg_list">
            <div class="reg_form">
                <el-input type="text" v-show="false"></el-input>
                <el-input type="password" v-show="false"></el-input>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="手机号码" prop="phone">
                        <div class="icon_img">
                            <img src='../assets/reg/dhicon.png'>
                        </div>
                        <el-input v-model="ruleForm.phone" :maxlength="11" placeholder="手机号码"></el-input>
                    </el-form-item>
                    <el-form-item class="reg_message" label="短信验证码" prop="meg">
                        <el-col :span="11">
                            <el-input v-model="ruleForm.meg" :maxlength="6" placeholder="短信验证码"></el-input>
                        </el-col>
                        <el-col :span="2">&nbsp;</el-col>
                        <el-col :span="11" class="reg-line">
                            <el-button type="primary" @click="regGet" style="background:#f6f7f8;border: 1px solid #C4C4C4;color:#4a4a4a" :disabled="disabled || time > 0">{{regGetText}}</el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="reg_message" label="验证码" required prop="code">
                        <el-col :span="11">
                            <el-input v-model="ruleForm.code" :maxlength="6" placeholder="请输入验证码"></el-input>
                        </el-col>
                        <el-col :span="2">&nbsp;</el-col>
                        <el-col :span="11" class="reg-line">
                            <el-button type="primary" @click="regGetCode()" style="background:#f6f7f8;border: 1px solid #C4C4C4;color:#4a4a4a" :disabled="disabled || time > 0">{{ verCode }}</el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="设置密码" required prop="password">
                        <div class="icon_img">
                            <img src='../assets/reg/zc_mm.png'>
                        </div>
                        <el-input type='password' v-model="ruleForm.password" :maxlength="12" placeholder="请设置一个6到12位的密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" required prop="conPassword">
                        <div class="icon_img">
                            <img src='../assets/reg/zc_mm.png'>
                        </div>
                        <el-input type='password' v-model="ruleForm.conPassword" :maxlength="12" placeholder="再次输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="type">
                        <el-checkbox-group v-model="ruleForm.type">
                            <el-checkbox label="我已阅读" name="type"></el-checkbox>
                            <span class="reg_agreement">《国安创客网站注册协议》</span>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item class="reg_login">
                        <el-button type="danger" @click="submitForm('ruleForm')">进入国安创客官网</el-button>
                        <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
                    </el-form-item>
                </el-form>
            </div>
            <div class="reg_right">
                <img src="../assets/reg/zc_bj.jpg">
            </div>
        </div>
        <el-dialog title="用户协议" :visible.sync="dialogTableVisible" lock-scroll :close-on-click-modal='false'>
            <div class="xieyi">
                <div class="xieyi_cont">
                    <h2>欢迎加入国安创客</h2>
                    <b>第一条 服务条款的确认与接纳</b>
                    <p>（一）以下所述各条款和条件构成您与创客平台之间，就使用本创客平台服务所达成的协议。当您同意以下各条款并注册时，即表示您已同意受该条款约束，可以使用创客平台为您提供的各项服务如果您不同意接受全部的条款和条件，请勿注册，同时您将无权使用创客平台的服务。</p>
                    <p>（二）创客平台有权在必要时修改本服务条款和条件，并只需公示于其网站。修改后的条款即时生效。在创客平台修改服务条款后，您继续使用服务应被视作您已接受了修改后的条款。</p>
                    <p>（三）除非得到创客平台的书面授权，任何人将不得修改本条款。</p>
                    <p>（四）创客平台提供的网络服务的所有权和最终解释权归中信国安创客投资有限公司所有。本协议中，被许可使用创客平台服务的用户均简称为“用户”。</p>

                    <b>第二条 服务内容</b>
                    <p>（一）在用户同意遵守本协议条款前提下，用户有权在创客平台网站指定位置上发布符合中国各项法律法规及规范性文件以及创客平台网站服务条款要求的信息。</p>
                    <p>（二）创客平台运用自己的操作系统通过互联网络为用户顺利实现在创客平台网站的信息发布提供服务。</p>

                    <b>第三条 服务内容的保证与变更</b>
                    <p>创客平台无法监控经由本服务传送的内容，也无法对用户的使用行为进行全面控制，因此不保证内容的合法性、正确性、真实性等；用户使用本服务时，请自行加以判断并承担所有风险。创客平台有权在必要时修改服务内容，而无需征得用户的事先同意。</p>

                    <b>第四条 用户权利义务</b>
                    <p>（一）用户有权在创客平台网站指定位置上发布符合中国各项法律法规及规范性文件以及创客平台网站服务条款要求的信息，并依据本平台服务规则享受创客平台提供的各项服务。</p>
                    <p>（二）用户有义务保证其发布的信息符合法律、法规及创客平台网站的相关服务规则，并及时对已发布的信息进行维护和管理。</p>
                    <p>（三）考虑到创客平台产品服务的重要性，用户有义务保证其提供的所有信息（包括但不限于个人注册信息、 发布的项目信息等）真实、准确，无重大遗漏或误导。如因用户提供的信息不准确，不真实，不合法有效，创客平台保留结束用户使用创客平台各项服务的权利，同时用户应赔偿因此造成的各方的一切损失。</p>
                    <p>（四）除创客平台规定的条件外，用户因其在创客平台网站的信息发布行为而达成的交易，应当与交易对方约定具体交易条件并完成交易。同时，用户明确知道，自己应当对创客平台上发布的项目做出独立的投资判断，创客平台不对用户的投资判断承担任何责任。</p>

                    <b>第五条 创客平台权利义务</b>
                    <p>（一）创客平台应运用专业电子技术为用户发布信息提供技术服务。</p>
                    <p>（二）如用户有如下行为之一的，创客平台有权立即停止用户所发布的信息的技术支持，并保存有关记录， 必要时可依据法律法规向国家有关机关报告，并且删除含有该内容的地址、目录或关闭服务器。用户应承担全部法律责任，并赔偿创客平台由此受到的损失，包括合理的追索费用： 1、用户提供的产品有侵害任何第三方知识产权、财产权等合法权益，或可能对第三方造成不利影响或侵害； 2、用户利用创客平台提供之网络平台进行任何犯罪活动，或宣传散播法律法规禁止散播的信息，或一切损害创客平台利益的活动； 3、用户有违反本协议任何条款的行为，经创客平台警告后仍未更正的； 4、用户的行为干扰创客平台的服务。
                    </p>
                    <p>（三）用户同意创客平台有权依据本协议及本平台服务规则对用户的不合法、不合规行为采取行动，包括但不限于中断其帐号、删除地址、目录或关闭服务器等。</p>
                    <p>（四）创客平台或中信国安创客投资有限公司对本平台发布的信息真实性、及时性和有效性不做任何形式的担保， 对该等信息的理解和运用应当依赖于用户自身判断。</p>

                    <b>第六条 用户注册与账户安全</b>
                    <p>（一）用户保证以真实的身份注册，提供的个人身份资料信息真实、完整、有效，依据法律规定和约定对所提供的信息承担相应的法律责任。如果资料发生变化应及时更改。</p>
                    <p>（二）在安全完成本服务的登记程序后，用户应维持密码及帐号的机密安全。对任何人利用用户的密码及帐号所进行的活动，而对用户、创客平台或第三方造成的损害，用户将负全部责任。创客平台无法对非法使用用户帐号及密码的行为作出甄别，因此创客平台不承担任何责任。用户若发现任何非法使用帐号或安全漏洞的情况，应立即通告创客平台。</p>

                    <b>第七条 免责声明</b>
                    <p>（一）根据本协议，创客平台仅为用户提供网络空间及技术服务，对用户发布的信息的真实性、合法性、及时性和有效性不作任何性质的担保及保证，用户理解并使用这些信息应当依赖自身的独立思考和投资判断。创客平台对用户的投资收益不做任何承诺，同时对投资损失不承担任何责任。</p>
                    <p>（二）中信国安创客投资有限公司尽力维护创客平台的稳定，但不就电讯系统或互联网的中断或无法运作、技术故障、计算机错误或病毒、信息损坏或丢失或由此而产生的其他任何性质的破坏而向用户或任何第三方承担赔偿责任。</p>
                    <p>（三）用户明确同意使用创客平台服务的风险由用户个人承担。创客平台不担保服务一定能满足用户的要 求，用户理解并接受下载或通过创客平台产品服务取得的任何信息资料取决于用户自己，并由其承担系统受 损、资料丢失以及其它任何风险。</p>

                    <b>第八条 隐私政策与安全</b>
                    <p>（一）保护用户个人隐私是创客平台的一项基本政策，创客平台将尽力维护用户隐私。创客平台保证不对外公开或向第三方提供单个用户的注册资料及用户在使用网络服务时存储在创客平台的非公开内容，但以下情况除外： 1、为符合国家法律法规强制性规定，或应有权机关要求； 2、为维护创客平台的知识产权和其他重要权利； 3、在紧急情况下为维护用户个人和社会大众的隐私安全； 4、根据本条款相关规定或者创客平台认为必要的其他情况下。
                    </p>
                    <p>（二）一旦注册成功成为用户，即得到一个密码和帐号。如果用户未保管好自己的帐号和密码而对用户、 创客平台或第三方造成的损害，用户将负全部责任。另外，每个用户应对其帐户中的所有活动和事件负全责。用户可随时改变您的密码和图标，也可以结束旧的帐户重开一个新帐户。用户同意若发现任何非法使用用户帐号或安全漏洞的情况，应立即通告创客平台。</p>
                    <p>（三）创客平台可能会与第三方合作向用户提供相关的网络服务。在此情况下，如该第三方同意承担与创客平台同等的保护用户隐私的责任，则创客平台有权将用户的注册资料等提供给该第三方。</p>
                    <p>（四）在不透露单个用户隐私资料的前提下，创客平台有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。</p>

                    <b>第九条 知识产权</b>
                    <p>（一）创客平台服务涉及到的产品的所有权以及相关软件的知识产权归中信国安创客投资有限公司所有。</p>
                    <p>（二）在创客平台内，无论是用户原创或是用户得到著作权人授权转载的作品，用户上载的行为即意味着用户或用户代理的著作权人授权创客平台及中信国安创客投资有限公司对上载作品享有使用权和收益权，但用户或原著作权人仍保有上载作品的著作权。</p>
                    <p>（三）用户应当保证其发布的信息不侵犯任何第三方知识产权及其他权利，否则由此给第三方及创客平台造成的损失由用户承担。</p>

                    <b>第十条 法律事项</b>
                    <p>（一）因本服务条款引发的一切争议之解决均应适用中国法律。各方首先应通过友好协商解决；协商不成的，任一方均可向中信国安创客投资有限公司所在地人民法院起诉。</p>
                    <p>（二）本协议的期限自用户点击同意条款之日起算，至用户注销账号之日起自动终止。</p>
                </div>
                <el-button type="primary" size='large' class='同意' @click='ruleForm.type = true'>同意</el-button>
            </div>
        </el-dialog>
        <v-footer></v-footer>
    </div>
</template>
<script>
import md5 from 'js-md5'
import vFooter from '../components/FooterNew'
import loginHeader from 'components/loginHeader'
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (regExp.test(value) === false) {
                callback(new Error('6-12字母和数字组成，不能是纯数字或纯英文'))
            } else {
                if (this.ruleForm.conPassword !== '') {
                    this.$refs.ruleForm.validateField('conPassword');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (regExp.test(value) === false) {
                callback(new Error('6-12字母和数字组成，不能是纯数字或纯英文'))
            } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        const validatever = (rules, value, callback) => {
            if (value !== this.verCode) {
                callback(new Error('验证码不正确'));
            } else {
                callback()
            }
        }
        return {
            //倒计时  获取验证码
            dialogTableVisible: false,
            login: '/login/0',
            time: 0,
            verCode: '',
            disabled: false,
            ruleForm: {
                phone: '',
                meg: '',
                code: '',
                password: '',
                conPassword: '',
                type: true
            },
            rules: {
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码' }
                ],
                meg: [
                    { required: true, message: '请输入短信验证码', trigger: 'blur' },
                    { pattern: /^[0-9]*$/, message: '请输入输入正确的验证码' }
                ],
                code: [{ validator: validatever, trigger: 'blur' }],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                conPassword: [
                    { validator: validatePass2, trigger: 'blur' }
                ]

            }
        };
    },
    watch: {
        'ruleForm.type'(val) {
            this.dialogTableVisible = !val
        }
    },
    //计算属性
    computed: {
        regGetText: function() {
            return this.time > 0 ? this.time + 's 后重新获取' : '获取验证码';
        }
    },
    components: {
        vFooter,
        loginHeader
    },
    created: function() {
        //创建
    },
    mounted: function() {
        //可执行jq  相当于window.onload
        this.login = '/login/' + this.$route.params.service
        this.regGetCode()
    },
    methods: {
        regGetCode() {
            //        let timestamp = new Date().valueOf()
            //        var index = this.verCode.indexOf('?', this.verCode)
            //        if (index > 0) {
            //          this.verCode = this.verCode.substring(0, index);
            //        }
            //        if ((this.verCode.indexOf("&") >= 0)) {
            //          this.verCode = this.verCode + "×tamp=" + timestamp;
            //        } else {
            //          this.verCode = this.verCode + "?timestamp=" + timestamp;
            //        }
            this.resetVerCode().then((res) => {
                this.verCode = res.data.data.code
            }).catch(error => {
                console.log(error)
            })
            //        this.verCode = this.resetVerCode()
        },
        //获取短信验证码
        regGet() {
            var that = this;
            this.$refs.ruleForm.validateField('phone', (valid) => {
                if (valid == '') {
                    this.time = 60;
                    this.disabled = false;
                    this.timer();
                    var phone = {
                        telephone: this.ruleForm.phone,
                        isuser: '0'
                    }
                    this.$htAjax.post('https://apitest.gack.citic:8081/guoanmaker/personal/user/sendVerificationCode', {}, {
                        params: phone
                    }).then(({ data }) => {
                        that.$message.success(data.data.value);
                    }).catch(({ data }) => {
                        that.$message.warning('请稍后重试');
                    });
                }

            });
        },
        //获取验证码 倒计时
        timer: function() {
            if (this.time > 0) {
                this.time--;
                let times = setTimeout(this.timer, 1000);
                if (this.time <= 0) {
                    clearTimeout(times)
                }
            }
        },
        submitForm() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    if (this.ruleForm.type) {
                        var that = this;
                        let passwordMd = md5(this.ruleForm.conPassword);
                        var reg = {
                            username: this.ruleForm.phone,
                            password: passwordMd.toUpperCase(),
                            code: this.ruleForm.meg
                        }
                        this.$htAjax.post('https://apitest.gack.citic:8081/guoanmaker/personal/user/registered', {}, {
                            params: reg
                        }).then(() => {
                          return this.$htAjax.post('https://apitest.gack.citic:8081/guoanmaker/personal/user/verify', {}, {
                            params: {
                              username: this.ruleForm.phone,
                              password: passwordMd.toUpperCase()
                            }
                          })
                        }).then(res => {
                          this.$htAjax.post('https://apitest.gack.citic:8081/guoanmaker/personal/userstatistics/saveUserstatistics', {}, {
                            params: {
                              userid: res.data.data.value,
                              type: '4'
                            }
                          })
                          return Promise.resolve(res)
                        }).then(({ data }) => {
                            if (data.data.key == 'success') {
                                this.$store.commit('setFirstLogin', 1)
                                that.$message({
                                    message: '注册成功，请登录',
                                    type: 'success'
                                });
                                that.$router.push(that.login);
                            } else {
                                that.$message.warning(data.data.value);
                            }
                        }).catch(({ data }) => {
                            that.$message.warning(data.data.value);
                        });
                    } else {
                        this.$message({
                            message: '请阅读注册协议！',
                            type: 'warning'
                        });
                    }
                } else {
                    this.$message.warning('请先填写表单信息，再进行提交');
                    return false;
                }
            });
        },
        resetForm() {
            this.$refs.ruleForm.resetFields();
        }
    }
}
</script>
<style  scoped>
.reg_box {
    width: 100%;
    height: auto;
    overflow: hidden;
}

.reg_list {
    width: 1200px;
    margin: 0 auto;
    height: auto;
    overflow: hidden;
}

.reg_form {
    float: left;
    margin-top: 57px;
    margin-left: 45px;
    width: 560px;
    box-sizing: border-box;
    padding-right: 80px;
    height: auto;
    margin-bottom: 50px;
}

.reg_right {
    float: right;
    margin-right: 95px;
    margin-top: 57px;
}

.icon_img {
    position: absolute;
    left: 0;
    top: 0;
    width: 36px;
    height: 36px;
    z-index: 99;
}

.icon_img img {
    position: absolute;
    margin: auto auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}

.reg_agreement {
    color: #ff5152;
    cursor: pointer;
}

.xieyi_cont {
    height: 320px;
    margin-bottom: 15px;
    overflow: auto;
}
</style>

<style>
.reg_box .el-input__inner {
    padding-left: 35px;
}

.reg_message .el-input__inner {
    padding-left: 15px;
}

.reg-line .el-button {
    width: 100%;
}

.reg_login .el-button {
    width: 100%;
}

.reg_box .el-checkbox__inner {
    width: 14px;
    height: 14px;
}

.reg_box .el-checkbox__inner::after {
    height: 6px;
    left: 3px;
}

.reg_box .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #ff6d6d;
    border-color: #ff6d6d;
}

.reg_box .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #ff6d6d;
}

.reg_box .el-checkbox__inner:hover {
    border-color: #ff6d6d;
}
</style>
