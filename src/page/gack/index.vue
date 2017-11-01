<template>
  <div class="gack" v-if = 'homePage'>
    <div class="bananer">
      <el-carousel :interval="3000" v-if = 'homePage' :height = 'imgHeight' ref = 'carouse'>
        <el-carousel-item v-for="(item,index) in OperatorRoundPhotos" :key="index" @click.native = 'openTo(item)'>
          <div class="ban_img">
            <img :src='item.photoPath'>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!--banner end-->
    <!--企业发展树-->
    <div class="company_tree">
      <div class="bt">
        <div class="bt_in">
          <span>企业发展历程</span>
        </div>
      </div>
      <div class="fz_cont">
        <div class="fz_lc">
          <ul>
            <li class="" v-for="(company,index) in homePage.opdevelop" @mouseover="companyMou(index)">
              <p class="num ">{{company.name}}</p>
              <p class="line" :class='{hotline:isHotline[index]}'></p>
              <div class="icon" :class='{hoticon:isHoticon[index]}'></div>
              <div class="qi">
                <div class="cont">
                  {{company.describebb}}
                </div>
              </div>
            </li>
          </ul>
          <div class="clear"></div>
        </div>
        <div class="fz_lb">
          <p>{{ projectName }}</p>
          <div class="realtive">
            <div class="prev" @click='prev'>
              <img src="~assets/gack/arrow_l.png" alt="" width="11" height="21">
            </div>
            <div class="next" @click='next'>
              <img src="~assets/gack/arrow_r.png" alt="" width="11" height="21">
            </div>
          </div>
          <swiper :options="swiperOption" ref = 'mySwiper'>
              <swiper-slide v-for="(banner, key) in banners" :key = 'key' @click.native = "$router.push({path: '/service',query: {id0: banner.oneServerId,serverName0: banner.serverName}})">
                <img :src="banner.picture">
                <div class="shadow">
                  <div class="text">
                    <div class='mc'>{{ banner.serverName }}</div>
                  </div>
                </div>
              </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card_title">办公空间服务</div>
      <p>为企业提供完善智能化办公空间</p>
      <!--<swiper :options="officeOption" class = 'container card_container'>-->
        <!--<swiper-slide v-for = '(item, key) in homePage.OperatorOfficeSpaceRos' :key = 'key' @click.native = '$router.push({path: "/space", query: {code: item.roomCode}})'>-->
          <!--<li class = 'service'>-->
            <!--<img :src="item.picture" alt="">-->
            <!--<div class="shadow">-->
              <!--<h2>{{ item.roomName }}</h2>-->
              <!--<p>-->
                <!--{{ item.detailss }}-->
              <!--</p>-->
            <!--</div>-->
            <!--<div class="bottom">-->
              <!--{{ item.roomName }}-->
            <!--</div>-->
          <!--</li>-->
        <!--</swiper-slide>-->
        <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
        <!--<div class="swiper-button-next" slot="button-next"></div>-->
      <!--</swiper>-->
      <el-carousel :interval="4000" type="card" class = 'container card_container'>
        <el-carousel-item v-for="(item, key) in homePage.OperatorOfficeSpaceRos" :key="key" @click.native = '$router.push({path: "/space", query: {code: item.roomCode}})'>
          <div class = 'service'>
            <img :src="item.picture" alt="">
            <div class="shadow">
              <h2>{{ item.roomName }}</h2>
              <p>
              {{ item.detailss }}
              </p>
            </div>
            <div class="bottom">
              {{ item.roomName }}
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="card activity">
      <div class="card_title">
        线下活动
      </div>
      <ul class="container card_container">
        <li class="fl" v-for = 'item in homePage.pcActiveRos' @click = '$router.push(`/eventdetails/${item.activeid}`)'>
          <box-img :prop="142/283">
            <img :src="item.picture" alt="">
          </box-img>
          <div class="bottom">
            <div class="fl">{{item.activeName}}</div>
            <div class="fr">{{item.startDate | time('年-月-日')}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="card provider">
      <div class="card_title">热门服务商</div>
      <ul class="container oh card_container">
        <li class="fl" v-for = 'item in homePage.OperatorHotBusinessRos'>
          <img :src="item.picture" alt="">
          <p class = 'text-hidden'>{{item.companyName}}</p>
          <!--<el-tooltip class="text-hidden item"  :content="item.companyName" placement="top-start">-->
            <!--{{item.companyName}}-->
          <!--</el-tooltip>-->
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import store from 'store'
  export default {
    name: 'gack',
    data() {
      return {
        // 是否审核
        imgHeight: '',
        projectName: '',
        banners: [],
        isActive: false,
        isDisplays: false,
        swiperOption: {
          pagination: null,
          slidesPerView: 'auto',
          spaceBetween: 10
        },
        isHotline: [true, false, false, false, false],
        isHoticon: [true, false, false, false, false],
//        officeOption: {
//          pagination: null,
//          slidesPerView: 'auto',
//          spaceBetween: 10,
//          prevButton:'.swiper-button-prev',
//          nextButton:'.swiper-button-next'
//        },
//        officeOption: {
//          pagination: '.swiper-pagination',
//          effect: 'coverflow',
//          pagination: null,
//          grabCursor: true,
//          centeredSlides: true,
//          slidesPerView: 'auto',
//          spaceBetween: 10,
//          coverflow: {
//            rotate: 50,
//            stretch: 0,
//            depth: 100,
//            modifier: 1,
//            slideShadows : true
//          }
//        }
      }
    },
    mounted () {
      this.banners = []
      if (this.homePage && this.homePage.opdevelop && this.homePage.opdevelop[0]) {
        this.banners = this.homePage.opdevelop[0].operatorCompanyDevelopServers
      } else {
        store.watch(state => state.homePage, val => {
          if (this.homePage && this.homePage.opdevelop && this.homePage.opdevelop[0]) {
            this.banners = this.homePage.opdevelop[0].operatorCompanyDevelopServers
          }
        })
      }
    },
    watch: {
      homePage (val) {
        if (val && val.opdevelop && val.opdevelop[0]) {
         this.projectName = val.opdevelop[0].name + '的服务'
         this.banners = val.opdevelop[0].operatorCompanyDevelopServers
          this.$nextTick(() => {
            this.imgHeight = this.$el.offsetWidth * (460 / 1920) + 'px'
          })
        } else {
          this.banners = []
          this.projectName = ''
        }
      },
      user (val) {
        if (val && !val.password) {
          this.$confirm('您的账户安全级别较低，请设置密码', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
        }
      }
    },
    computed: {
      LoginType() {
        let user = this.$store.state.userid
        if(user) {
          return 1
        } else {
          return 0
        }
      },
      homePage () {
        return this.$store.state.homePage
      },
      OperatorRoundPhotos () {
        return this.homePage.OperatorRoundPhotos.filter(item => {
          return item.photoPath
        }).map(item => {
          if((item.url.indexOf('takeOutAward.html') !== -1 || item.url.indexOf('eggFrenzy.html') !== -1) && this.$store.state.userid) {
            item.url += `&userid=${this.$store.state.userid.id}`
            item.flag = false
          } else if ((item.url.indexOf('takeOutAward.html') !== -1 || item.url.indexOf('eggFrenzy.html') !== -1) && !this.$store.state.userid) {
            item.flag = true
          } else {
            item.flag = false
          }
          return item
        })
      }
    },
    methods: {
      enter(index) {
        this.isActive = true
        if(index === 1) {
          this.isDisplays = true
        } else {
          this.isDisplays = false
        }
      },
      openTo (opt) {
        if (opt.flag) {
          this.$router.push('/login/0')
        } else {
          window.location.href = opt.url
        }
      },
      next() {
        this.$refs.mySwiper.swiper.slideNext()
      },
      prev() {
        this.$refs.mySwiper.swiper.slidePrev()
      },
      leave(index) {
        this.isActive = false
      },
      leaveTips() {
        this.isDisplays = false
      },
      // 注册
      register(o) {
        this.$router.push('/register/' + o)
      },
      login(o) {
        this.$router.push('/login/' + o)
      },
      // 后台商家中心
      sellerMe() {
        this.$router.push('/middle')
      },
      sellerHome() {
        this.$router.push('/backHome')
      },
      companyMou(index) {
        if (this.homePage.opdevelop[index]) {
          this.projectName = this.homePage.opdevelop[index].name + '的服务'
          this.banners = this.homePage.opdevelop[index].operatorCompanyDevelopServers
        }
        for(let i = 0; i < this.homePage.opdevelop.length; i++) {
          if(i !== index) {
            this.$set(this.isHotline, i, false)
            this.$set(this.isHoticon, i, false)
          } else {
            this.$set(this.isHotline, i, true)
            this.$set(this.isHoticon, i, true)
          }
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*gack_top*/

  .gack {
    width: 100%;
    min-width: 1200px;
    height: auto;
    margin: 0 auto;
    padding: 0;
    overflow: hidden;
    background: #fff;
  }

  .gack_top {
    width: 100%;
    height: 35px;
    line-height: 34px;
    background: #F9F9F9;
    border-bottom: 1px solid #e2e2e2;
  }

  .gack_rop {
    float: left;
  }

  .top_in {
    width: 1200px;
    height: 35px;
    margin: 0 auto;
    font-size: 12px;
    color: #333;
  }

  .top_in .left {
    float: left;
    width: auto;
    height: auto;
    overflow: hidden;
  }

  .top_in .left span {
    float: left;
  }

  .phone_img {
    display: inline-block;
    width: 18px;
    height: 18px;
    margin: 8px;
    margin-left: 30px;
    background: url(../../assets/gack/dh.png) no-repeat 0 0;
    background-size: 16px 16px;
  }

  .top_in .left:hover .phone_img {
    background: url(../../assets/gack/dh1.png) no-repeat 0 0;
    background-size: 16px 16px;
  }

  .top_in .right {
    float: right;
    height: 15px;
    margin: 10px 0;
    line-height: 15px;
  }

  .top_in .gack_list {
    float: left;
    padding: 0 15px;
    cursor: pointer;
    border-right: 1px solid #999;
  }

  .top_in .gack_list:last-of-type {
    border: 0;
  }

  .top_in .gack_list:hover {
    color: #D7000F;
  }

  .ph_img {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url(../../assets/gack/sj_icon.png) no-repeat 0 0;
    background-size: auto 16px;
  }

  .gack_list:nth-of-type(3):hover .ph_img {
    background: url(../../assets/gack/sj_icon1.png) no-repeat 0 0;
    background-size: auto 16px;
  }

  .wei_img {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url(../../assets/gack/wx_icon.png) no-repeat 0 0;
    background-size: 16px 16px;
  }

  .gack_list:nth-of-type(4):hover .wei_img {
    background: url(../../assets/gack/wx_icon1.png) no-repeat 0 0;
    background-size: auto 16px;
  }

  .gack_list b {
    float: left;
    font-weight: 400;
  }
  /*head*/

  .head {
    width: 100%;
    height: 60px;
  }

  .head_in {
    width: 1200px;
    height: 100%;
    margin: 20px auto 0;
  }

  .head_in .logo {
    float: left;
    width: 176px;
    height: 53px;
    background: url(../../assets/gack/pt_logo.png) no-repeat;
    margin-right: 190px;
  }

  .head_in .sy_search {
    float: left;
    width: 592px;
    height: 60px;
  }

  .head_in .sy_search .search {
    width: 592px;
    overflow: hidden;
    background: #fff;
    margin-bottom: 5px;
  }

  .head_in .sy_search .search input {
    border: 2px solid #333333;
    height: 35px;
    outline: none;
    padding: 0 10px 0;
    width: 536px;
    box-sizing: border-box;
    vertical-align: middle;
    font-size: 14px;
    font-family: "微软雅黑";
    float: left;
    line-height: 34px;
  }

  .head_in .sy_search .search_btn {
    float: left;
    width: 56px;
    height: 35px;
    background: url(../../assets/gack/fw_ss.png) no-repeat;
    cursor: pointer;
  }

  .search_key {
    font-size: 14px;
    color: #9B9B9B;
    width: 100%;
    height: 20px;
    overflow: hidden;
  }

  .search_key p {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 20px;
  }

  .search_key p span {
    margin-right: 10px;
    cursor: pointer
  }

  .search_key p span:hover {
    color: #ff0000;
  }

  .sy_fbxq {
    width: 144px;
    height: 35px;
    line-height: 32px;
    color: #fff;
    font-size: 15px;
    text-align: center;
    background: #ff5051;
    float: left;
    margin-left: 20px;
    cursor: pointer;
  }
  /*connav*/

  .connav {
    width: 100%;
    height: 40px;
    margin-top: 20px;
    line-height: 40px;
    position: relative;
    z-index: 11111;
  }

  .gack .active {
    box-shadow: rgb(220, 220, 220) 0px 3px 5px!important;
  }

  .connav_in {
    width: 1200px;
    height: 40px;
    margin: 0 auto;
  }

  .tips {
    position: absolute;
    left: 0;
    display: none;
    top: 40px;
    box-sizing: border-box;
    padding-top: 20px;
    height: 325px;
    width: 100%;
    background: #fff;
    z-index: 9999;
  }

  .tips_list {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    background: #fff;
    padding-left: 30px;
    box-sizing: border-box;
  }

  .tips_left,
  .tips_center {
    float: left;
    width: auto;
    overflow: hidden;
    height: auto;
    font-size: 14px;
    line-height: 36px;
    border-right: 1px rgba(255, 255, 255, 0.3) solid;
  }

  .tips_left li,
  .tips_center li {
    height: 36px;
    position: relative;
    padding: 0 40px 0 12px;
    cursor: pointer;
  }

  .tips_center ul {
    width: auto;
    display: none;
    height: auto;
    overflow: hidden;
  }

  .tips_center li {
    padding: 0 40px 0 15px;
    text-align: right;
  }

  .tips_center .displays,
  .tips_right .displays {
    display: block;
  }

  .displayTips {
    display: block;
  }

  .tips_left li:after,
  .tips_center li:after {
    content: '';
    width: 6px;
    height: 12px;
    background: url(../../assets/gack/xy.png) no-repeat;
    background-size: 6px 12px;
    position: absolute;
    right: 15px;
    top: 13px;
  }
  /*.tips_left li:hover:after,.tips_center li:hover:after{
   background: url(../assets/gack/xy1.png) no-repeat;
    background-size: 6px 12px;
  }*/

  .tips_left .current:after,
  .tips_center .current:after {
    background: url(../../assets/gack/xy1.png) no-repeat;
    background-size: 6px 12px;
  }
  /*.tips_left li:hover,.tips_center li:hover,.tips_right ul li:hover{
    background: #D7000F;
    color: #fff;
  }*/

  .tips_right ul li:hover {
    background: #D7000F;
    color: #fff;
  }

  .tips_left .current,
  .tips_center .current,
  .tips_right .current {
    background: #D7000F;
    color: #fff;
  }

  .tips_right {
    float: left;
    width: 660px;
    overflow: hidden;
    height: auto;
    font-size: 14px;
    line-height: 36px;
  }

  .tips_right ul {
    width: 100%;
    display: none;
    overflow: hidden;
    height: auto;
  }

  .tips_right ul li {
    width: 300px;
    float: left;
    height: 34px;
    cursor: pointer;
    line-height: 34px;
    padding: 0 20px;
    box-sizing: border-box;
    background: #f1f1f1;
    margin: 0 10px;
    margin-bottom: 10px;
  }

  .tp_infor {
    float: right;
  }

  .tp_infor li {
    cursor: pointer;
  }

  .connav_in ul {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding-left: 70px;
  }

  .connav_in ul li {
    width: auto;
    height: 40px;
    float: left;
    font-size: 15px;
    cursor: pointer;
    margin-right: 50px;
  }

  .connav_in ul li:hover {
    color: #c81523;
    font-weight: 600;
  }
  /*bananer*/

  .bananer {
    width: 100%;
    height: auto;
    background: #fff;
  }

  .el-carousel__item .ban_img {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin: 0;
  }

  .ban_img img {
    width: 100%;
    display: block;
  }
  /*企业发展历程*/

  .company_tree {
    width: 100%;
    min-width: 1200px;
    background: #F3F3F3;
    overflow: hidden;
    padding: 50px 0;
  }

  .company_tree .bt {
    width: 100%;
    height: auto;
    overflow: hidden;
  }

  .company_tree .bt_in {
    width: 281px;
    height: 57px;
    background: url(../../assets/gack/fzlc.png) no-repeat;
    margin: 0 auto;
    text-align: center;
    line-height: 54px;
    font-size: 30px;
    color: #333333;
    margin-bottom: 44px;
  }

  .fz_cont {
    width: 1004px;
    margin: 0 auto;
    overflow: hidden;
  }

  .fz_cont .fz_lc {
    width: 100%;
    height: auto;
    margin-bottom: 40px;
  }

  .fz_cont .fz_lc ul {
    width: 100%;
    height: auto;
    overflow: hidden;
  }

  .fz_cont .fz_lc ul li {
    width: auto;
    float: left;
    margin-right: 19px;
    cursor: pointer;
    height: 260px;
  }

  .fz_cont .fz_lc .num {
    width: 185px;
    height: 64px;
    background: url(../../assets/gack/tree_1.png) no-repeat;
    text-align: center;
    line-height: 64px;
    font-size: 20px;
    color: #fff;
  }

  .fz_cont .fz_lc li:nth-of-type(2) .num {
    background: url(../../assets/gack/tree_2.png) no-repeat;
  }

  .fz_cont .fz_lc li:nth-of-type(3) .num {
    background: url(../../assets/gack/tree_3.png) no-repeat;
  }

  .fz_cont .fz_lc li:nth-of-type(4) .num {
    background: url(../../assets/gack/tree_4.png) no-repeat;
  }

  .fz_cont .fz_lc li:nth-of-type(5) .num {
    background: url(../../assets/gack/tree_5.png) no-repeat;
  }

  .fz_cont .fz_lc ul li:last-of-type {
    margin-right: 0;
  }

  .fz_cont li .line {
    width: 2px;
    height: 30px;
    background: #B0B0B0;
    margin: 0 auto;
    -webkit-transition: all 0.1s linear;
    -o-transition: all 0.1s linear;
    -moz-transition: all 0.1s linear;
    transition: all 0.1s linear;
  }

  .fz_cont .fz_lc .icon {
    width: 64px;
    height: 64px;
    margin: 0 auto;
  }

  .fz_cont .fz_lc li:nth-of-type(1) .icon {
    background: url(../../assets/gack/cbq.png) no-repeat;
  }

  .fz_cont .fz_lc ul li:nth-of-type(1) .hoticon {
    background: url(../../assets/gack/cbq_1.png) no-repeat;
  }

  .fz_cont .fz_lc ul li:nth-of-type(1) .hotline {
    height: 60px;
    background: rgb(247, 1, 0);
  }

  .fz_cont .fz_lc ul li:nth-of-type(2) .icon {
    background: url(../../assets/gack/zq.png) no-repeat;
  }

  .fz_cont .fz_lc ul li:nth-of-type(2) .hoticon {
    background: url(../../assets/gack/zq_1.png) no-repeat;
  }

  .fz_cont .fz_lc ul li:nth-of-type(2) .hotline {
    height: 60px;
    background: rgb(245, 161, 0);
  }

  .fz_cont .fz_lc li:nth-of-type(3) .icon {
    background: url(../../assets/gack/fzq.png) no-repeat;
  }

  .fz_cont .fz_lc ul li:nth-of-type(3) .hoticon {
    background: url(../../assets/gack/fzq_1.png) no-repeat;
  }

  .fz_cont .fz_lc ul li:nth-of-type(3) .hotline {
    height: 60px;
    background: rgb(255, 109, 0);
  }

  .fz_cont .fz_lc li:nth-of-type(4) .icon {
    background: url(../../assets/gack/tzq.png) no-repeat;
  }

  .fz_cont .fz_lc ul li:nth-of-type(4) .hoticon {
    background: url(../../assets/gack/tzq_1.png) no-repeat;
  }

  .fz_cont .fz_lc ul li:nth-of-type(4) .hotline {
    height: 60px;
    background: rgb(153, 173, 0);
  }

  .fz_cont .fz_lc li:nth-of-type(5) .icon {
    background: url(../../assets/gack/csq.png) no-repeat;
  }

  .fz_cont .fz_lc ul li:nth-of-type(5) .hoticon {
    background: url(../../assets/gack/csq_1.png) no-repeat;
  }

  .fz_cont .fz_lc ul li:nth-of-type(5) .hotline {
    height: 60px;
    background: rgb(233, 31, 121);
  }

  .fz_cont .fz_lc .qi {
    margin-top: 20px;
  }

  .fz_cont .fz_lc .qi .cont {
    padding: 12px 8px;
    width: 185px;
    box-sizing: border-box;
    font-size: 14px;
    color: #878787;
    text-align: center;
    line-height: 28px;
    letter-spacing: 1px;
  }

  .fz_cont .clear {
    clear: both;
  }

  .fz_lb {
    width: 1004px;
    height: 224px;
    overflow: hidden;
    border: 1px solid #F6A200;
    box-sizing: border-box;
  }

  .fz_lb .realtive {
    position: absolute;
    width: 1004px;
    height: 136px;
  }

  .fz_lb .realtive img {
    width: 11px;
    height: 21px;
  }

  .fz_lb .realtive .next,
  .fz_lb .realtive .prev {
    position: absolute;
    z-index: 1;
    top: calc(50% - 10px);
  }

  .fz_lb .realtive .next {
    right: 15px;
  }

  .fz_lb .realtive .prev {
    left: 15px;
  }

  .fz_lb .swiper-container {
    width: 936px;
    overflow: hidden;
  }

  .fz_lb p {
    font-size: 16px;
    color: #F6A200;
    padding: 20px 0 20px 45px;
  }

  .swiper-slide {
    width: auto;
    margin: 0 10px;
    height: 136px;
  }
  .swiper-slide .shadow{
    display:block;
    transition: all linear 0.3s;
  }
  .swiper-slide:hover .shadow{
    display:none;
    transition: all linear 0.3s;
  }
  .service .shadow {
    display: none;
    transition: all linear .2s;
  }
  .service:hover .shadow {
    display: block;
    transition: all linear .2s;
  }
  .service .bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #fff;
    background: #000;
    line-height: 58px;
    text-align: center;
    opacity: 1;
    transition: all linear .5s;
  }
  .service:hover .bottom {
    opacity: 0;
    transition: all linear .5s;
  }
  .shadow {
    transition: all linear .2s;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .6);
  }

  .shadow .text {
    position: absolute;
    top: 58px;
    width: 100%;
    left: 0;
    text-align: center;
  }

  .shadow .text .mc {
    color: #fff;
  }

  .shadow .text .price {
    color: #f07630;
    margin-top: 12px;
  }

  .fz_lb img {
    width: 136px;
    height: 136px;
  }

  .card {
    width: 100%;
    min-width: 1200px;
    background: #fff;
    overflow: hidden;
    padding: 60px 0 50px;
  }
  .card .card_title {
    width: 319px;
    height: 51px;
    background: url(~@/assets/gack/kjfc.png) no-repeat;
    margin: 0 auto;
    text-align: center;
    line-height: 51px;
    font-size: 30px;
    color: #333333;
  }

  .card p {
    text-align: center;
    font-size: 18px;
    color: #A5A5A5;
    margin-top: 10px;
  }

  .card .card_container {
    margin: 40px auto 0;
  }

  .card .card_container li {
    margin-right: 30px;
    position: relative;
  }
  /*.card .card_container li.fl{*/
    /*padding: 0 10px;*/
    /*box-sizing: border-box;*/
  /*}*/
  .card .card_container li:last-child {
    margin-right: 0;
  }

  .card .card_container .service img {
    width: 100%;
  }
  .card .swiper-slide{
    height: 376px;
  }
  .card .card_container li .bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    color: #fff;
    background: #000;
    line-height: 58px;
    text-align: center;
    opacity: 1;
    transition: all linear .5s;
  }

  .card .card_container li .shadow {
    transition: all linear .5s;
    opacity: 0;
  }

  .card .card_container li:hover .bottom {
    opacity: 0;
    transition: all linear .5s;
  }

  .card .card_container li:hover .shadow{
    display:block;
    transition: all linear .5s;
    opacity: 1;
  }

  .card li h2 {
    font-size: 18px;
    color: #fff;
    text-align: center;
    font-weight: normal;
    margin: 60px 0 40px;
  }
  .service .shadow h2 {
    font-size: 18px;
    color: #fff;
    text-align: center;
    font-weight: normal;
    margin: 60px 0 40px;
  }
  .card li h2:before {
    content: '';
    width: 6px;
    height: 6px;
    background: #00DDE5;
    display: inline-block;
    vertical-align: middle;
    margin: 0 10px 4px 0;
  }

  .card li p {
    width: 255px;
    font-size: 14px;
    color: #fff;
    margin: 0 auto;
    line-height: 26px;
    letter-spacing: 1px;
  }
  .activity{
    background: #f3f3f3;
  }
  .activity .card_title{
    background: url(~@/assets/gack/xxhd_bj.png) no-repeat 15px center;
  }
  .activity .card_container li{
    margin: 0 20px 20px 0;
    width: 383px;
    height: 142px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
  }
  .activity .card_container li:nth-child(3), .activity .card_container li:nth-child(6){
    margin-right:0;
  }
  .activity .card_container li img{
    transform: scale(1);
    transform-origin: top left;
    transition: transform linear .5s;
  }
  .activity .card_container li:hover img{
    transform: scale(1.1);
    transform-origin: top left;
    transition: transform linear .5s;
  }
  .activity .card_container li .bottom{
    height: 81px;
    padding: 33px 10px 0 10px;
    box-sizing: border-box;
    background: url(~@/assets/gack/hd_bj.png) no-repeat left bottom;
  }
  .activity .card_container li:hover .bottom {
    opacity: 1;
  }
  .provider .card_title{
    background:url(~@/assets/gack/rmfws.png) no-repeat 20px center;
  }
  .provider .card_container li{
    margin: 0;
    text-align:center;
    width:198px;
    padding: 0 15px;
    cursor: pointer;
    box-sizing: border-box;
    border-right: 1px solid #efefef;
  }
  .provider .card_container li:hover p{
    white-space: normal;
  }
  .provider .card_container li:first-child{
    border-left: 1px solid #efefef;
  }
  .provider .card_container li img{
    width:80px;
    height:80px;
  }
  .provider .card_container li p{
    width:100%;
    height: 4em;
    color:#333;
  }
</style>
