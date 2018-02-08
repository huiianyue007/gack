<template>
    <div class="wrapper" v-loading.fullscreen.lock="fullscreenLoading">
        <div class="backHome" v-if="reg">
            <v-head></v-head>
            <v-sidebar :prop='reg'></v-sidebar>
            <div class="content">
                <transition name="move" mode="out-in">
                    <!-- <keep-alive :include="includedComponents"> -->
                        <router-view></router-view>
                    <!-- </keep-alive> -->
                </transition>
            </div>
        </div>
        <div class="backHome" v-else>
            <v-head></v-head>
            <v-sidebar :prop='reg'></v-sidebar>
            <div class="content">
                <div class="crumbs">
                    <el-breadcrumb separator=">">
                        <el-breadcrumb-item>
                            商家管理中心
                        </el-breadcrumb-item>
                        <el-breadcrumb-item>
                            已提交审核
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="crum_box" v-if="examine==0">
                        <p style="font-size:24px;color:#333;padding-bottom:10px"><img src="../assets/images/information/success.png">企业实名认证开通申请已提交审核</p>
                        <p>我们会在1-3个工作日内完成审核，您也可以通过以下方式查询您的认证结果：</span>
                        </p>
                        <p style="line-height:40px">人工查询电话：400-851-8585 </p>
                    </div>
                    <div class="crum_box" v-if="examine==1">
                        <p style="font-size:24px;color:#333;;padding-bottom:10px;">
                            <img src="../assets/images/information/nopass.png">很抱歉，您未审核通过</p>
                        <p>原因：因为您的企业信息不符合标准</p>
                        <p style="font-size:16px">
                            <b>{{successTime}}秒</b> 后自动跳转填写企业认证信息页面，您也可以手动点击
                            <b @click="information">填写企业信息</b> 进行跳转
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './backpage/Header';
import vSidebar from './backpage/Sidebar';
import store from '@/store'
export default {
    data() {
        return {
            //是否注册
            reg: false,
            examine: 0,
            successTime: 6,
            busid: '',
            fullscreenLoading: true,
            userId: '',
            includedComponents: ['merchandise']
        }
    },
    async beforeRouteEnter(from, to, next) {
        if (store.state.sessionid) {
            if (!store.state.userInfo) {
                await store.dispatch('findById', store.state.userid.id).catch(() => {
                    next('/login/0')
                })
                let user = store.state.userInfo
                if (!user || !user.isProvider) {
                    next('/')
                } else {
                    next()
                }
            } else {
                next()
            }
        } else {
            next('/login/0')
        }
    },
    created: function() {
        let user = this.$store.state.userid;
        if (user) {
            this.userId = user.id;
            this.userInfo();
        } else {
            this.fullscreenLoading = false;
            this.$router.push('/login/0');
        }
    },
    components: {
        vHead, vSidebar
    },
    methods: {
        userInfo() {
            let userInfos = this.$store.state.userInfo;
            if (userInfos != null) {
                let isProvider = userInfos.isProvider;
                if (isProvider == '0') {
                    this.$router.push('/information');
                    this.fullscreenLoading = false;
                } else if (isProvider == '1') {
                    this.reg = false;
                    this.examine = 0;
                    this.fullscreenLoading = false;
                } else if (isProvider == '2') {
                    this.reg = true;
                    this.examine = 0;
                    var item = {
                        userid: this.userId
                    }
                    this.$htAjax.post(`${this.$config.back}/selectBusByUserid`, {}, {
                        params: item
                    }).then(({ data }) => {
                        this.fullscreenLoading = false;
                        if (data.status == 200) {
                            this.$store.commit('businessInfo', data.data.id)
                            this.$store.commit('isRoomServer', data.data.isRoomServer)
                        }
                    }).catch((err) => {
                        this.fullscreenLoading = false;
                        this.$message.warning('请联系管理员');
                        this.$router.push('/404');
                    });
                } else if (isProvider == '3') {
                    this.reg = false;
                    this.examine = 1;
                    this.timer();
                    this.fullscreenLoading = false;
                } else if (isProvider == '4') {
                    this.$message.warning('您账户已被冻结，请联系管理员!');
                    this.$router.push('/');
                    this.fullscreenLoading = false;
                } else {
                    this.fullscreenLoading = false;
                }
            } else {
                this.fullscreenLoading = false;
                this.$store.dispatch('findById', this.userId).catch(() => { })
            }
        },
        information() {
            this.$router.push('/information');
        },
        timer() {
            if (this.successTime > 0) {
                this.successTime--;
                let times = setTimeout(this.timer, 1000);
                if (this.successTime <= 0) {
                    clearTimeout(times)
                }
            }
        }
    },
    watch: {
        successTime: function(newVal, oddVal) {
            if (newVal == 0) {
                this.$router.push('/information');
            }
        },
        '$store.state.userInfo': 'userInfo'
    }
}
</script>
<style scoped>
.wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-width: 960px;
}

.backHome {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.content {
    position: absolute;
    left: 220px;
    width: auto;
    min-width: 700px;
    top: 90px;
    right: 0;
    bottom: 0;
    padding: 0px 20px 20px 20px;
    overflow-x: hidden;
    overflow-y: auto;
}

.crumbs {
    height: auto;
    margin: 15px 0;
    margin-top: 15px;
    width: 100%;
}

.crum_box {
    width: 100%;
    height: auto;
    padding: 40px 0;
    margin: 20px 0;
    margin-top: 10%;
    color: #666;
    /* background: #efefef; */
    font-size: 22px;
    text-align: center;
}

.crum_box p {
    font-size: 18px;
    line-height: 50px;
}

.crum_box img {
    width: 30px;
    height: 30px;
    position: relative;
    top: -2px;
    margin-right: 10px;
}

.crum_box b {
    font-weight: 400;
    color: #c7000a;
    cursor: pointer;
}

.crum_box span {
    margin-left: 40px;
}
</style>
