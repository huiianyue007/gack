<template>
    <div class='body'>
        <div class="container">
            <div style="margin-top: 83%;">
                <img src="~@/assets/images/img/hc1.png" width="100%" alt="">
            </div>
            <ul class="oh card coupon" id='coupon'>
                <li class="ratio fl" @click="clickIndex()">
                    <img src="~@/assets/images/img/h1.png" width="100%" alt="">
                    <!-- <div class="li_padding"></div>
                  <div class="rat_content"></div> -->
                </li>
                <li class="ratio fl" @click="clickIndex()">
                    <img src="~@/assets/images/img/h2.png" width="100%" alt="">
                    <!--  <div class="li_padding"></div>
                  <div class="rat_content"></div> -->
                </li>
                <li class="ratio fl" @click="clickIndex()">
                    <img src="~@/assets/images/img/h3.png" width="100%" alt="">
                    <!--  <div class="li_padding"></div>
                  <div class="rat_content"></div> -->
                </li>

            </ul>
            <!-- <div class="text-center card_title">
                <img src="./img/business.png">
              </div> -->
            <div style="position: absolute;left: 0;bottom: -380px;">
                <img src="../assets/images/img/left.png" width="100%" alt="">
            </div>
            <div style="position: absolute;right: 0;bottom: -380px;">
                <img src="~@/assets/images/img/right.png" width="100%" alt="">
            </div>
            <ul class="oh card business" id='business' style="margin-top: 50px;">
                <li class="ratio fl" v-for="(item,index) in business" :key="index" @click="clickIndex(item.id)">
                    <div class="li_padding"></div>
                    <div class="rat_content">
                        <a>
                            <div class="li_con" :style="{background: `url(${item.imgSrc}) no-repeat center center/cover`}"></div>
                            <!-- <div class="li_bottom ratio">
                        <div class="li_padding"></div>
                        <div class="rat_content">
                          <div class="text-hidden title"></div>
                          <div class="li_price">
                            惊爆价<span class="price"></span>
                          </div>
                        </div>
                      </div> -->
                        </a>
                    </div>
                </li>

            </ul>
            <div class="text-center card_title">
                <!-- <img src="./img/finance.png"> -->
            </div>
            <ul class="oh card business" id='finance'>
                <li class="ratio fl" v-for="(item,index) in finance" :key="index" @click="clickIndex(item.id)">
                    <div class="li_padding"></div>
                    <div class="rat_content">
                        <a>
                            <div class="li_con" :style="{background: `url(${item.imgSrc}) no-repeat center center/cover`}"></div>

                            <!-- <div class="li_bottom ratio">
                        <div class="li_padding"></div>
                        <div class="rat_content">
                          <div class="text-hidden title"></div>
                          <div class="li_price">
                            惊爆价<span class="price"></span>
                          </div>
                        </div>
                      </div> -->
                        </a>
                    </div>

                </li>
            </ul>
        </div>
        <div style="margin-top: 100px">
            <img src="~@/assets/images/img/bottom.png" width="100%" alt="">
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            business: [{
                title: '高新认定',
                price: '12000',
                id: '8a9a218f5fbd8103015fc8ecfad7002e',
                type: '1',
                imgSrc: require('@/assets/images/img/a1.png')
            }, {
                title: '财税咨询顾问',
                price: '500',
                id: '8a9a218f5fbd8103015fe6e71637007a',
                type: '1',
                imgSrc: require('@/assets/images/img/a2.png')
            }, {
                title: '财税风险',
                price: ' 100',
                id: '8a9a218f5fbd8103015fed114ee0007f',
                type: '1',
                imgSrc: require('@/assets/images/img/a3.png')
            }, {
                title: '税收筹划',
                price: '100',
                id: '8a9a218f5fbd8103015fed18cb8c0080',
                type: '1',
                imgSrc: require('@/assets/images/img/a4.png')
            }],
            finance: [{
                title: '免服务费注册公司',
                price: '800',
                id: '8ab3fd565f18f6d4015f19b2cffa0015',
                type: '1',
                imgSrc: require('@/assets/images/img/a5.png')
            }, {
                title: '公司变更',
                price: '1500',
                id: '8a9a218f5fbd8103015fecdbf9b5007c',
                type: '1',
                imgSrc: require('@/assets/images/img/a6.png')
            }, {
                title: 'ICP经营许可证',
                price: ' 100',
                id: '8a9a218f5fbd8103015fece6eebb007d',
                type: '1',
                imgSrc: require('@/assets/images/img/a7.png')
            }, {
                title: '行业资质办理',
                price: ' 500',
                id: '8a9a218f5fbd8103015fecf0f36c007e',
                type: '1',
                imgSrc: require('@/assets/images/img/a8.png')
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
.body {
    background: url('~@/assets/images/img/bj1.jpg') top center/cover no-repeat;
    overflow: hidden;
    position: relative;
    /*padding-bottom: 50px;*/
}

.first {
    width: 100%;
    padding-bottom: 60%;
}

.card {
    padding-bottom: .625rem;
}

.card_title {
    margin: 20px 0;
}

.card_title img {
    width: 20%;
}

.ratio {
    position: relative;
}

.ratio .li_padding {
    width: 100%;
}

.ratio .rat_content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.card li {
    position: relative;
    cursor: pointer;
    z-index: 1;
    width: calc(25% - 9px);
    margin-left: 12px;
    box-sizing: border-box;
}

.card li a {
    color: inherit;
    display: block;
    height: 100%;
}

.card li:first-child {
    margin: 0;
}

.coupon {
    margin-top: 55px;
    width: 100%;
}

.coupon li {
    color: #fff;
    position: relative;
    width: calc(33% - 9px);
}



/*.coupon li:nth-child(1) {
  background: url('../img/1000.png') top center/100% no-repeat;
}

.coupon li:nth-child(2) {
  background: url('../img/2000.png') top center/100% no-repeat;
}

.coupon li:nth-child(3) {
  background: url('../img/3000-300.png') top center/100% no-repeat;
}*/


/*.coupon li:nth-child(4) {
  background: url('../img/3000.png') top center/100% no-repeat;
}

.coupon li:nth-child(5) {
  background: url('../img/2000-300.png') top center/100% no-repeat;
}

.coupon li:nth-child(6) {
  background: url('../img/2000-300-1.png') top center/100% no-repeat;
}*/

.coupon li .li_padding {
    padding-bottom: 67%;
}

.coupon li:nth-child(4) {
    margin-left: 0;
}



/*.zhiyin {
  cursor: pointer;
  width: 7%;
  position: fixed;
  top: 20%;
  right: 0;
  background: url('../img/zhiyin.png') no-repeat center center/100%;
}*/

.zhiyin .li_padding {
    padding-bottom: 140%;
}

.coupon li:nth-child(n+4) {
    margin-top: 15px;
}

#cnzz_stat_icon_1268460331 {
    display: none;
}

.coupon li .li_con {
    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 44% auto 7%;
}

.coupon li .li_con .li_padding {
    padding-bottom: 31%;
}

.coupon li .li_con .desc {
    margin-left: .3125rem;
    font-size: 12px
}

.coupon li .li_con .desc .li_desc {
    font-size: 8px
}

.business li {
    /*background: url(../img/sp.png) top center/contain no-repeat;*/
}

.business li a {
    position: relative;
    padding: 0;
}

.business li .li_padding {
    padding-bottom: 120%;
}

.business li .li_con {
    height: 100%;
    font-size: 12px;
    border-radius: 8px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
}

.business li .rat_content {
    width: 100%;
}

.business li .li_bottom {
    background: url('~@/assets/images/img/bottom.png') no-repeat center center/100%;
    color: #fff;
    position: absolute;
    bottom: 2px;
    left: 0;
    padding: 3px;
    box-sizing: content-box;
    z-index: 2;
    width: 98%;
    font-size: 12px;
}

.business li .li_bottom .rat_content {
    padding: 4px;
    box-sizing: content-box;
}

.business li .li_bottom .li_padding {
    padding-bottom: 30%;
}

.business li .li_bottom {
    line-height: 1.2em;
    color: #ff0;
    font-size: 12px;
}

.remaining {
    color: #fff;
    font-size: 18px;
    line-height: 2em;
    margin: 10px 0;
}

.box1 {
    margin: 0 auto;
    display: none
}

.business li .li_bottom .title {
    color: #fff;
}

.business li .li_bottom .price span {
    font-size: 14px;
    font-stretch: ultra-condensed;
}

.qr {
    width: 10%;
    padding: 10px;
    box-sizing: content-box;
    position: fixed;
    bottom: 10%;
    text-align: center;
    right: 1%;
    background: #fff;
    border-radius: 3px;
}

.qr img {
    width: 100%;
}

@media screen and (min-width: 768px) {
    .card_title {
        margin: 55px 0;
    }
    .coupon li .li_con .title {
        font-size: 32px;
    }
    .coupon li .li_con .desc {
        font-size: 18px;
    }
    .coupon li .li_con .desc .li_desc {
        font-size: 14px;
    }
    .business li .li_con {
        font-size: 24px;
    }
    .business li .li_bottom {
        font-size: 18px;
    }
    .business li .li_bottom {
        line-height: 1.8em;
        color: #ff0;
        font-size: 14px;
    }
}

body {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

@media screen and (min-width: 1024px) {
    .body {
        background: url('~@/assets/images/img/bj1.jpg') top center/cover no-repeat;
    }
    .coupon li .li_con .title {
        font-size: 48px;
    }
    .coupon li .li_con .desc {
        font-size: 24px;
    }
    .coupon li .li_con .desc .li_desc {
        font-size: 14px;
    }
    .box1 {
        display: block;
    }
    .business li .li_bottom {
        font-size: 14px;
        line-height: 1.8em;
    }
}

.container {
    width: 66.6%;
}

@media screen and (min-width: 778px)and (max-width: 1024px) {
    .container {
        width: 768px;
    }
}

@media screen and (min-width: 1296px) {
    .business li .li_bottom {
        font-size: 16px;
    }
}

@media screen and (min-width: 1448px) {
    .container {
        width: 1296px
    }
    .business li .li_bottom {
        font-size: 24px;
    }
}

.clear {
    clear: both;
}




/* 大转盘样式 */

.banner {
    display: block;
    width: 50%;
    margin: 0 auto 20px;
}

.banner .turnplate {
    display: block;
    width: 100%;
    position: relative;
}

.banner .turnplate canvas.item {
    width: 100%;
}

.banner .turnplate img.pointer {
    position: absolute;
    width: 26.5%;
    height: 36.5%;
    left: 36.6%;
    top: 26%;
}

.shadow {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    position: fixed;
    display: none;
    top: 0;
    left: 0;
}

.shadow .content {
    background: #fff;
    width: 400px;
    height: 200px;
    margin: 100px auto;
    position: relative;
    padding: 15px;
    font-size: 14px;
    box-shadow: 1px 1px 1px #fff;
}

.shadow .content .bottom {
    position: absolute;
    width: 100%;
    bottom: 10px;
}

.shadow .content .bottom .button {
    font-size: 24px;
    padding: .3em .5em;
    border-radius: 5px;
    color: #fff;
    background: #009F95;
    cursor: pointer;
    display: inline-block;
}



/*.zhiyin_content {
  display: none;
  color: #fff;
  cursor: pointer;
  border: 3px solid #ff0;
  border-radius: 15px;
  padding: 20px;
  width: 960px;
  margin: 0 auto;
  overflow: hidden;
}

.zhiyin_content .title {
  font-size: 36px;
  font-weight: bolder;
  margin-bottom: 15px;
}

.zhiyin_content .zhiyin_img {
  background: url('./img/pc-xingshou.png') no-repeat center center/cover;
  width: 2000px;
  padding-bottom: 24%;
}*/
</style>


