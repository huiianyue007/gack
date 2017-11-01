<template>
    <div class="headers">
        <my-header></my-header>
        <div class="header_box">
            <div class="pb_left" @click="homeUrl">
                <img src="../../assets/information/logo2.png"/>
                <span>国安创客</span>
            </div>
            <div class="pb_center">商家中心</div>
            <div class="pb_right" >
                <!-- <span>首页</span>
                <img src="../../assets/backImg/home.png" /> -->
            </div>
        </div>
    </div>
</template>
<script>
import myHeader from 'components/backheader'

export default {
    data() {
        return {
            sysUserName: 'admin'
        }
    },
    mounted() {
       
    },
    components:{
        myHeader
    },
    methods: {
        //返回首页
        homeUrl() {
            this.$router.push('/');
        },
    }
}
</script>
<style scoped>
.headers {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99;
    min-width: 960px;
    box-sizing: border-box;
    width: 100%;
    height: 90px;
    background: #c7000a;
    font-size: 22px;
    line-height: 90px;
  
}

.header_box {
    width: 90%;
    height: 55px;
    margin: 0 auto;
    line-height: 55px;
    color: #fff;
}
.pb_left {
    float: left;
    width: 30%;
    cursor: pointer;
}
.pb_left img{
    float: left;
    display: block;
    width: 41px;
    margin: 7px 0;
    margin-right: 15px;
}
.pb_left span {
    float: left;
    font-size: 20px;
    font-weight: 400!important;
}

.header_box .pb_center {
    float: left;
    width: 40%;
    font-weight: 400!important;
    font-size: 20px;
    text-align: center;
}

.pb_right {
    float: right;
    width: 30%;
    text-align: right;
    cursor: pointer;
    overflow: hidden;
}

.pb_right span {
    float: right;
    font-size: 16px;
}

.pb_right img {
    float: right;
    width: 26px;
    margin: 15px 8px;
    height: 25px;
}

.el-dropdown-menu__item {
    text-align: center;
}


</style>
