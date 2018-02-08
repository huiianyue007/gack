<template>
    <div class="interspace">
        <div class="box">
            <div class="header">
                <img src="~@/assets/images/img1/header.jpg" alt="">
            </div>
            <div class="footer">
                <div class="footerImg">
                    <div class="title">
                        <img src="~@/assets/images/img1/g1.png" alt="">
                    </div>
                    <div class="bottom">
                        <ul id="oul">
                            <li v-for="(item,index) in business" :key="index" @click="clickIndex(item.id)">
                                <div class="tits">
                                    <img src="~@/assets/images/img1/hot4.png" style="position: absolute;z-index: 1222;
                                    width: 30%;height: 30%;right: 0;" v-if="index < 2"/>
                                    <img :src="item.imgSrc" />
                                    <div class="positionImg">
                                        <img :src="item.imgPir" alt="">
                                    </div>
                                </div>
                                <div class="moneys">
                                    <div class="moneys_tit">
                                        {{item.title}}
                                    </div>
                                    <div class="moneys_moy">
                                        <img src="~@/assets/images/img1/btn.png" alt="">
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="title">
                        <img src="~@/assets/images/img1/g2.png" alt="">
                    </div>
                    <div class="bottom">
                        <ul>
                            <li v-for="(item,index) in finance" :key="index" @click="clickIndex(item.id)">
                                <div class="tits">
                                    <img :src="item.imgSrc" />
                                    <div class="positionImg">
                                        <img :src="item.imgPir" alt="">
                                    </div>
                                </div>
                                <div class="moneys">
                                    <div class="moneys_tit">
                                        {{item.title}}
                                    </div>
                                    <div class="moneys_moy">
                                        <img src="~@/assets/images/img1/btn.png" alt="">
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="title">
                        <img src="~@/assets/images/img1/g3.png" alt="">
                    </div>
                    <div class="bottom">
                        <ul>
                            <li v-for="(item,index) in finance1" :key="index" @click="clickIndex(item.id)">
                                <div class="tits">
                                    <img :src="item.imgSrc" />
                                    <div class="positionImg">
                                        <img :src="item.imgPir" alt="">
                                    </div>
                                </div>
                                <div class="moneys">
                                    <div class="moneys_tit">
                                        {{item.title}}
                                    </div>
                                    <div class="moneys_moy">
                                        <img src="~@/assets/images/img1/btn.png" alt="">
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="title">
                        <img src="~@/assets/images/img1/g4.png" alt="">
                    </div>
                    <div class="bottom">
                        <ul>
                            <li v-for="(item,index) in finance2" :key="index" @click="clickIndex(item.id)">
                                <div class="tits">
                                    <img :src="item.imgSrc" />
                                    <div class="positionImg">
                                        <img :src="item.imgPir" alt="">
                                    </div>
                                </div>
                                <div class="moneys">
                                    <div class="moneys_tit">
                                        {{item.title}}
                                    </div>
                                    <div class="moneys_moy">
                                        <img src="~@/assets/images/img1/btn.png" alt="">
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            business: [ {
                title: '月租金|开放办公区工位',
                id: '8a9a218f5fbd810301601155c77500c1',
                type: '1',
                imgPir: require('@/assets/images/img1/i3.png'),
                imgSrc: 'https://guoanchuangke2.oss-cn-beijing.aliyuncs.com/datas/busimage/1512119389791.jpg?Expires=4665719143&OSSAccessKeyId=LTAILWi7cyx4nHeI&Signature=n2JsSWhRnbp/zkMo2Us6cdLvqGE%3D'
            } ,{
                title: '周租金|开放办公区工位',
                id: '8ab3fd565f22c9ef015f22fef0610056',
                type: '1',
                imgPir: require('@/assets/images/img1/i4.png'),
                imgSrc: 'https://guoanchuangke2.oss-cn-beijing.aliyuncs.com/datas/busimage/1508415937171.jpg?Expires=4662015446&OSSAccessKeyId=LTAILWi7cyx4nHeI&Signature=eOXNh6BWLdByOeSsPOS1%2BtssFcE%3D'
            } , {
                title: '日租金|开放办公区工位',
                id: '8a9a218f5f341b96015f349665d8000e',
                type: '1',
                imgPir: require('@/assets/images/img1/i5.png'),
                imgSrc: 'https://guoanchuangke2.oss-cn-beijing.aliyuncs.com/datas/busimage/1508416577439.jpg?Expires=4662015763&OSSAccessKeyId=LTAILWi7cyx4nHeI&Signature=GeGcjCLGnSKhmq0N1%2BkCYi%2BcoYw%3D'
            }, {
                title: '年租金|开放办公区工位',
                id: '8a9a218f5fbd81030160115a1fc200c3',
                // id: '8a9a218f5f341b96015f343e6fb80000',
                type: '1',
                imgSrc: 'https://guoanchuangke2.oss-cn-beijing.aliyuncs.com/datas/busimage/1512120042593.jpg?Expires=4665719590&OSSAccessKeyId=LTAILWi7cyx4nHeI&Signature=1zTFLIQosQv7Ol1gntsnjuIgE6M%3D',
                imgPir: require('@/assets/images/img1/i1.png')
            }, {
                title: '季租金|开放办公区工位',
                id: '8a9a218f5fbd810301601158e65900c2',
                type: '1',
                imgPir: require('@/assets/images/img1/i2.png'),
                imgSrc: 'https://guoanchuangke2.oss-cn-beijing.aliyuncs.com/datas/busimage/1512120227788.jpg?Expires=4665719385&OSSAccessKeyId=LTAILWi7cyx4nHeI&Signature=/L12TxhRqYhfyKAId0wZgMMXEqs%3D'
            }],
            finance: [{
                title: '全天|路演大厅',
                id: '8a9a218f5fbd8103016011210f6500bd',
                type: '1',
                imgPir: require('@/assets/images/img1/i6.png'),
                imgSrc: 'https://guoanchuangke2.oss-cn-beijing.aliyuncs.com/datas/busimage/1512116703246.jpg?Expires=4665715737&OSSAccessKeyId=LTAILWi7cyx4nHeI&Signature=LgOnJyGBrFLiJ62S/3bhHxRgA8U%3D'
            }, {
                title: '9:00-12:00|路演大厅',
                id: '8a9a218f5fbd810301601122e25300be',
                type: '1',
                imgPir: require('@/assets/images/img1/i7.png'),
                imgSrc: 'https://guoanchuangke2.oss-cn-beijing.aliyuncs.com/datas/busimage/1512116422657.jpg?Expires=4665715927&OSSAccessKeyId=LTAILWi7cyx4nHeI&Signature=KNniJ4brqUXCiv7B1op6FVUooTk%3D'
            }, {
                title: '13:00-18:00|路演大厅',
                id: '8a9a218f5fbd810301601124f2ff00bf',
                type: '1',
                imgPir: require('@/assets/images/img1/i8.png'),
                imgSrc: 'https://guoanchuangke2.oss-cn-beijing.aliyuncs.com/datas/busimage/1512116871136.jpg?Expires=4665716040&OSSAccessKeyId=LTAILWi7cyx4nHeI&Signature=YuhMIpzxn9GZuruuiEBe8KKB69A%3D'
            }],
            finance1: [{
                title: '全天|升降区路演厅',
                id: '8a9a218f5fbd8103016011139a4e00ba',
                type: '1',
                imgPir: require('@/assets/images/img1/i9.png'),
                imgSrc: 'https://guoanchuangke2.oss-cn-beijing.aliyuncs.com/datas/busimage/1512115095466.jpg?Expires=4665714879&OSSAccessKeyId=LTAILWi7cyx4nHeI&Signature=dAjw0eocW7AcHriQHvXCJzxs2sA%3D'
            }, {
                title: '9:00-12:00|升降区路演厅',
                id: '8a9a218f5fbd81030160111706db00bb',
                type: '1',
                imgPir: require('@/assets/images/img1/i10.png'),
                imgSrc: 'https://guoanchuangke2.oss-cn-beijing.aliyuncs.com/datas/busimage/1512115588891.jpg?Expires=4665715093&OSSAccessKeyId=LTAILWi7cyx4nHeI&Signature=Ss3uxOiYO9MxfvdZ5nBek2nRqHg%3D'
            }, {
                title: '13:00-18:00|升降区路演厅',
                id: '8a9a218f5fbd810301601119562300bc',
                type: '1',
                imgPir: require('@/assets/images/img1/i11.png'),
                imgSrc: 'https://guoanchuangke2.oss-cn-beijing.aliyuncs.com/datas/busimage/1512115843275.jpg?Expires=4665715304&OSSAccessKeyId=LTAILWi7cyx4nHeI&Signature=pkkWHy4FnqDoKGd0Vd5SKyfKBR4%3D'
            }],
            finance2: [{
                title: '全天|视频会议室',
                id: '8a9a218f5fbd81030160110a88d700b8',
                type: '1',
                imgPir: require('@/assets/images/img1/i12.png'),
                imgSrc: 'https://guoanchuangke2.oss-cn-beijing.aliyuncs.com/datas/busimage/1512114836315.jpg?Expires=4665714204&OSSAccessKeyId=LTAILWi7cyx4nHeI&Signature=LndFv1YeJcxALLxO0XJCLbVWnOQ%3D'
            }, {
                title: '9:00-12:00|视频会议室',
                id: '8ab3fd565f22c9ef015f22fa06c10053',
                type: '1',
                imgPir: require('@/assets/images/img1/i13.png'),
                imgSrc: 'https://guoanchuangke2.oss-cn-beijing.aliyuncs.com/datas/busimage/1508416303820.jpg?Expires=4662015374&OSSAccessKeyId=LTAILWi7cyx4nHeI&Signature=bJ4/2MnzkhAhlsUXMc10jG1RTWg%3D'
            }, {
                title: '13:00-18:00|视频会议室',
                id: '8a9a218f5fbd81030160110d88ea00b9',
                type: '1',
                imgPir: require('@/assets/images/img1/i14.png'),
                imgSrc: 'https://guoanchuangke2.oss-cn-beijing.aliyuncs.com/datas/busimage/1512115268899.jpg?Expires=4665714507&OSSAccessKeyId=LTAILWi7cyx4nHeI&Signature=AjhU67ovIcBAyYX2L9HlzAB7wpw%3D'
            }]
        }
    },
    methods: {
        clickIndex(id = '8a9a218f5f813579015f8188b2070005') {
            this.$router.push(`/serde/${id}/1`)
        }
    }
}
</script>
<style scoped>
.interspace .footer {
    background: url(~@/assets/images/img1/big.jpg) center no-repeat;
    background-size: cover;
}

.interspace .footer .footerImg {
    width: 66.6%;
    margin: 0 auto;
    padding-bottom: 100px;
}

.interspace .title {
    padding-top: 50px;
    text-align: center;
}

.interspace .title img {
    width: 50%;
}

.interspace .bottom ul {
    overflow: hidden;
}

.interspace .middle ul li {
    float: left;
    width: 25%;
    cursor: pointer;
}

.interspace .bottom ul li img {
    width: 100%;
    display: block;
}



.interspace .com_ul {
    width: 96%;
    height: auto;
    overflow: hidden;
    margin: 0 auto;
}

.interspace .bottom li {
    width: 31%;
    margin: 0 1%;
    height: 100%;
    float: left;
    font-size: 14px;
    text-align: center;
    box-sizing: border-box;
    background: #1c172c;
    padding: 10px;
    margin-bottom: 20px
}

.interspace .bottom .tits {
    width: 100%;
    box-sizing: border-box;
    padding: 0;
    background: #787878;
    overflow: hidden;
    position: relative;
}
.interspace .bottom .tits .positionImg{
    position: absolute;
    top: 25%;
}
.interspace .bottom .tits img {
    display: block;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    margin-bottom: 0;
}

.interspace .bottom .moneys {
    width: 100%;
    height: auto;
    font-size: 14px;
    /* position: relative;
        top: -0.4rem;
        left: 0; */
    /* background: url('img/333.png') 0 0 no-repeat; */
    background-size: 100%;
    color: #4a4a4a;
}

.interspace .moneys .moneys_tit {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    box-sizing: border-box;
    text-align: left;
    font-size: 14px;
    color: #fff;
}

.interspace .moneys .moneys_moy img {
    width: 70%;
    margin: 0 auto;
}

.interspace .moneys .moneys_moy {
    box-sizing: border-box;
    overflow: hidden;
}

.interspace .bottom ul li:nth-child(1),
.interspace .bottom ul li:nth-child(2),
.interspace .bottom ul li:nth-child(3) {
    margin-bottom: 20px;
}
.interspace .bottom #oul li:nth-child(1){
    width: 40%;
    margin-left: 8%;
}
.interspace .bottom #oul li:nth-child(2){
    width: 40%;
}
</style>


