<template>
    <div>

        <img :src="from.commodity_smallimage" alt="" class="top_img">
        <div class="info">
            <p class="info_name">{{from.commodityName}}</p>
            <p class="startPrice">￥{{from.finalPrice}}</p>
            <p class="info_class">
                <span>平台认证</span>
                <span>未服务随时退</span>
            </p>
        </div>
        <div class="content" v-if="from.type=='1'">
            <div class="con">
                <p class="title">工位类型</p>
                <p v-html="from.introduce"></p>
            </div>
            <div class="con">
                <p class="title">支付方式</p>
                <p v-html="from.description"></p>
            </div>
            <div class="con">
                <p class="title">工位介绍</p>
                <p v-html="from.commodityCase"></p>
            </div>
            <div class="con">
                <p class="title">入孵尊享</p>
                <p v-html="from.process"></p>
            </div>
            <div class="con">
                <p class="title">保障须知</p>
                <p v-html="from. guarantee"></p>
            </div>
        </div>
        <div class="content" v-if="from.type=='2'">
            <div class="con">
                <p class="title">公司介绍</p>
                <p v-html="from.introduce"></p>
            </div>
            <div class="con">
                <p class="title">商品描述</p>
                <p v-html="from.description"></p>
            </div>
            <div class="con">
                <p class="title">服务案例</p>
                <p v-html="from.commodityCase"></p>
            </div>
            <div class="con">
                <p class="title">服务流程</p>
                <p v-html="from.process"></p>
            </div>
            <div class="con">
                <p class="title">服务承诺</p>
                <p v-html="from.promise"></p>
            </div>
            <div class="con">
                <p class="title">保障须知</p>
                <p v-html="from. guarantee"></p>
            </div>
        </div>
        <div class="content" v-if="from.type=='3'">
            <div class="con">
                <p class="title">培训受众</p>
                <p v-html="from.introduce"></p>
            </div>
            <div class="con">
                <p class="title">课程收益</p>
                <p v-html="from.description"></p>
            </div>
            <div class="con">
                <p class="title">课程概述</p>
                <p v-html="from.commodityCase"></p>
            </div>
            <div class="con">
                <p class="title">培训师/机构介绍</p>
                <p v-html="from.process"></p>
            </div>
            <div class="con">
                <p class="title">课程目录</p>
                <p v-html="from.promise"></p>
            </div>
            <div class="con">
                <p class="title">保障须知</p>
                <p v-html="from. guarantee"></p>
            </div>
        </div>
        <div class="footer">
            <div class="btn">
                <button>立即购买</button>
            </div>
        </div>
    </div>
</template>
<script>

import flexible from './js/flexible'

export default {
    data() {
        return {
            comid: '',
            cityCode:'',
            from:{}
        }
    },
    mounted() {
    },
    created() {
        this.comid = this.$route.query.comid
        this.cityCode=this.$route.query.cityCode
        this.init()
    },
    methods: {
        init() {
            this.$htAjax.get('https://apitest.gack.citic:8082/guoanmaker/provide/commodityMove/getProvideCommodity?id=' + this.comid +'&cityCode='+this.cityCode)
                .then(({ data }) => {
                    if (data.status === 200) {
                        this.from = data.data
                    }
                }).catch(err => {
                });
        }
    }
}
</script>
<style scoped>
.top_img {
    display: block;
    width: 100%;
}


.info {
    box-sizing: border-box;
    padding: 0.25rem;
    width: 100%;
    height: auto;
    overflow: hidden;
    border-bottom: 1px solid #e5e5e5;
}

.info .info_name {
    color: #4a4a4a;
    font-size: 0.4rem;
    line-height: 0.6rem;
    margin-bottom: 0.1rem;
}

.info .startPrice {
    color: #c7000a;
    font-size: 0.4rem;
    line-height: 0.6rem;
}

.info .oldPrice {
    font-size: 0.3rem;
    text-decoration: line-through;
    color: #999999;
}

.info .info_class {
    font-size: 0.35rem;
    line-height: 0.5rem;
    color: #4a4a4a;
}

.content {
    height: auto;
    overflow: hidden;
    padding-bottom: 1.2rem;
}

.con {
    border-bottom: 1px solid #e5e5e5;
    padding: 0.3rem;
}

.con:last-child {
    border: 0;
}

.con .title {
    font-size: 0.35rem;
    line-height: 0.6rem;
    color: #4a4a4a;
}

.con p {
    font-size: 0.35rem;
    color: #4a4a4a;
}

.footer {
    width: 100%;
    height: 1.1rem;
    border-top: 1px solid #e5e5e5;
    position: fixed;
    bottom: 0;
    left: 0;
    background: white;
}


.btn {
    float: left;
    padding-top: 0.18rem;
    padding-left: 0.15rem;
}

.btn button {
    display: block;
    width: 96%;
    height: 0.8rem;
    background: #C7000A;
    color: white;
    /*text-align: center;*/
    margin: 0 auto;
    border-radius: 0.1rem;
}
</style>
