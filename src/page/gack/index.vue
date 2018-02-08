<template>
  <div class="gack" v-if='homePage'>
    <div class="bananer">
      <el-carousel :interval="3000" v-if='homePage' height='306px' ref='carouse'>
        <el-carousel-item v-for="(item,index) in OperatorRoundPhotos" :key="index" @click.native='openTo(item)'>
          <div class="ban_img">
            <!--<img :src='item.photoPath'>-->
            <box-img :bgImg='item.photoPath' prop='306:970'></box-img>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="container">
      <div class="new_rounds">
        <card-title>常用服务
          <!--<div class="more" slot='right'>-->
          <!--<div class="icon" v-if="commonServiceNewRounds.length > 3" @click='prev("myRoundsSwiper")'><img src="../../assets/images/reg/next.png" alt=""></div>-->
          <!--<div class="icon" v-if="commonServiceNewRounds.length > 3" @click='next("myRoundsSwiper")'><img class="icon" src="../../assets/images/reg/prev.png" alt=""></div>-->
          <!--</div>-->
        </card-title>
        <div class="card_content">
          <el-row v-if='commonServiceNewRounds.length < 3' @click.native='clickRound($event)'>
            <el-col :span='8' v-for="(item, key) in commonServiceNewRounds" :key='key' class='round_li'>
              <div class="text-center title">{{ item.operatorCommonServiceNew.serviceName }}</div>
              <box-img class="round_logo" :bgImg='item.operatorCommonServiceNew.servicePicUrl' prop='126:496'></box-img>
              <el-row class='new_rounds_server'>
                <el-col :span='12' class='text-center  cursor new_rounds_server_li' v-if='it.serverName' v-for='(it, index) in item.operatorCommonServiceDownNew' :key='index'>
                  <span class="odiv" :oKey="key" :oIndex="index">{{ it.serverName }}</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <swiper :options="roundsSwiper" ref='myRoundsSwiper' v-if='commonServiceNewRounds.length >= 3' @click.native='clickRound($event)'>
            <swiper-slide v-for="(item, key) in commonServiceNewRounds" :key='key' class='round_li'>
              <div class="text-center title">{{ item.operatorCommonServiceNew.serviceName }}</div>
              <box-img class="round_logo" :bgImg='item.operatorCommonServiceNew.servicePicUrl' prop='126:496'></box-img>
              <el-row class='new_rounds_server'>
                <el-col :span='12' class='text-center  cursor new_rounds_server_li' v-if='it.serverName' v-for='(it, index) in item.operatorCommonServiceDownNew' :key='index'>
                  <span class="odiv" :oKey="key" :oIndex="index">{{ it.serverName }}</span>
                </el-col>
              </el-row>
            </swiper-slide>
          </swiper>
          <div class="swiper-button-prev" v-if='commonServiceNewRounds.length >= 3' @click='prev("myRoundsSwiper")'></div>
          <div class="swiper-button-next" v-if='commonServiceNewRounds.length >= 3' @click='next("myRoundsSwiper")'></div>
        </div>
      </div>
      <div class="card space">
        <card-title>空间租赁
          <!--<div class="more" slot='right'>-->
          <!--<div class="icon" @click='prev("mySpaceSwiper")' v-if="operatorOfficeSpaceRosNew.length > 3"><img src="../../assets/images/reg/next.png" alt=""></div>-->
          <!--<div class="icon" v-if="operatorOfficeSpaceRosNew.length > 3" @click='next("mySpaceSwiper")'><img class="icon" src="../../assets/images/reg/prev.png" alt=""></div>-->
          <!--</div>-->
        </card-title>
        <div class="card_content">
          <el-row v-if='operatorOfficeSpaceRosNew.length < 3' @click='clickTo($event)'>
            <el-col :span='8' v-for="(item, key) in operatorOfficeSpaceRosNew" :key='key' class='swiper_li'>
              <div :code='item.roomCode' class='swiper_parent'>
                <box-img :bgImg='item.picture' prop='330:595'></box-img>
                <div class="text-center space_title">{{ item.roomName }}</div>
              </div>
            </el-col>
          </el-row>
          <swiper :options="spaceSwiperOption" v-if='operatorOfficeSpaceRosNew.length >= 3' ref='mySpaceSwiper' @click.native='clickTo($event)'>
            <swiper-slide v-for="(item, key) in operatorOfficeSpaceRosNew" :key='key' class='swiper_li'>
              <div :code='item.roomCode' class='swiper_parent'>
                <box-img :bgImg='item.picture' prop='330:595'></box-img>
                <div class="text-center space_title">{{ item.roomName }}</div>
              </div>
            </swiper-slide>
          </swiper>
          <div class="swiper-button-prev" v-if='operatorOfficeSpaceRosNew.length >= 3' @click='prev("mySpaceSwiper")'></div>
          <div class="swiper-button-next" v-if='operatorOfficeSpaceRosNew.length >= 3' @click='next("mySpaceSwiper")'></div>
        </div>
      </div>
      <div class="card company">
        <card-title>企业服务</card-title>
        <el-row class="card_li" v-for='(item, key) in homePage.operatorCompanyServiceVOs' :key='key'>
          <el-col :span="5" class="inline-block fn title text-center company_li">
            {{item.serverName}}
          </el-col>
          <el-col :span='6' v-for="(it, index) in item.commodityRos" class='inline-block fn' :key='index' @click.native="companyTo(it)">
            <div class='company_con'>
              <box-img class='inline-block company_list' :bgImg='it.commodity_smallimage'></box-img>
              <div class='inline-block company_list'>
                <div class="title company_title">{{ it.commodityName }}</div>
                <div class="text-hidden subhead company_subhead text-subhead">{{it.synopsis}}</div>
                <div class="company_price">{{ it.isBargaining == '1'? ( it.finalPrice ? `￥${it.finalPrice} 起` : '面议') : `￥${it.finalPrice}` }}</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="oh knowledge">
      <div class="container">
        <div class="card">
          <card-title>知识产权服务</card-title>
          <div class="card_content text-center knowledge_search">
            <!--<div class="search_title">-->
            <!--<div class="inline-block title">-->
            <!--<span :class='{"active_search" : activeSearcType == "2"}' @click="activeSearcType = '1'">商标查询</span> |-->
            <!--<span :class='{"active_search" : activeSearcType == "1"}' @click='activeSearcType = "2"'>专利查询</span>-->
            <!--</div>-->
            <!--</div>-->
            <!--<el-input placeholder="请输入内容" v-model="keywords" @keyup.enter="search" class="search_input">-->
            <!--<el-button slot="append" @click="search" class="search_button">查询</el-button>-->
            <!--</el-input>-->
            <el-input :placeholder="`请输入你想搜索的${select == '商标查询' ? '商标' : '专利'}名`" v-model="keywords" @keyup.enter.native='search' class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="免费商标查询" value="商标查询"></el-option>
                <el-option label="免费专利查询" value="专利查询"></el-option>
              </el-select>
              <div class="search_button text-center" slot="append" @click='search'>
              </div>
              <!--<el-button type = 'primary' slot="append" class = 'search_button' icon="el-icon-search" @click = 'search'></el-button>-->
            </el-input>
          </div>
          <el-row :gutter="30" class="knowledge_list">
            <el-col :span='8' v-if='key <= 2' v-for='(item, key) in homePage.hotServerPcs' :key='key' @click.native="serverTo(key)">
              <!--<box-img :bgImg='item.iconPath' prop = '323:513' class = 'knowledge_li'></box-img>-->
              <div class="knowledge_li">
                <div class="inline-block">
                  <div class="title knowledge_li_title">{{ item.serverName }}</div>
                  <div class="knowledge_li_more">查看更多 ></div>
                </div>
                <box-img :bgImg='item.iconPath' prop='188:281' class='inline-block'></box-img>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="card tuijian">
        <card-title style='border:none;'>投资服务</card-title>
        <div class="text-center" style="font-size: 16px;">
          <span :class='["title", "cursor", { "active_title": activeTitle == "2" }]' @click='activeTitle = "1"'>金融大咖</span><span style="margin: 0 15px;font-size: 20px;">|</span><span :class='["title", "cursor", {"active_title": activeTitle == "1" }]' @click='activeTitle = "2"'>推荐标的</span>
        </div>
        <div class="tuijian_li_content" v-if = 'activeTitle == "1"'>
          <!--<div class="title tuijian_title">{{ homePage.financingServiceNewVOs[0].operatorFinancingServiceNew.financingName }}</div>-->
          <el-carousel :interval="3000" v-if='homePage' height='224px' :autoplay='false' indicator-position="outside" arrow='never'>
            <el-carousel-item class='tuijian_swiper' v-for="(item,index) in tuijianList" :key="index">
              <div class="tuijian_list_con jinrong_list_con">
                <!--<div class="xline"></div>-->
                <!--<div class="yline"></div>-->
                <div class="tuijian_li" v-if='it' v-for="(it, key) in item" @click.stop='concat'>
                  <box-img prop='272:373' :bgImg='it.picture' :cover='false'>
                    <div class="tuijian_shadow">
                      <div class="text-hidden jinrong_title">
                        <el-tooltip :disabled='it.corporateName.length <= 18' :content="it.corporateName" placement="top">
                          <span :class='{"cursor": it.corporateName.length > 18 }'>{{ it.corporateName }}</span>
                        </el-tooltip>
                      </div>
                      <div class="tuijian_shadow_con">
                        <div class="inline-block text-hidden" style='max-width: 50%'>
                          <el-tooltip :disabled='it.name.length <= 9' :content="it.name" placement="top">
                            <span :class='{"cursor": it.name.length > 9 }'>{{ it.name }}</span>
                          </el-tooltip>
                        </div>
                        <div class="inline-block text-hidden" style='max-width: 50%'>
                          <el-tooltip :disabled='it.business.length <= 9' :content="it.business" placement="top">
                            <span :class='{"cursor": it.business.length > 9 }'>{{ it.business }}</span>
                          </el-tooltip>
                        </div>
                      </div>
                    </div>
                    <!--<div class="box_content">-->
                    <!--<box-img :bgImg='it.picture' prop='204:160' :cover='false' class='inline-block jinrong_logo'></box-img>-->
                    <!--<div class="inline-block text-left">-->
                    <!--<div class="text-hidden jinrong_title">-->
                    <!--<el-tooltip :disabled = 'it.name.length <= 5' :content="it.name" placement="top">-->
                    <!--<span :class = '{"cursor": it.name.length > 5 }'>{{ it.name }}</span>-->
                    <!--</el-tooltip>-->
                    <!--</div>-->
                    <!--<div class="text-hidden jinrong_title">-->
                    <!--<el-tooltip :disabled = 'it.business.length <= 5' :content="it.business" placement="top">-->
                    <!--<span :class = '{"cursor": it.business.length > 5 }'>{{ it.business }}</span>-->
                    <!--</el-tooltip>-->
                    <!--</div>-->
                    <!--<div class="text-hidden jinrong_title">-->
                    <!--<el-tooltip :disabled = 'it.corporateName.length <= 5' :content="it.corporateName" placement="top">-->
                    <!--<span :class = '{"cursor": it.corporateName.length > 5 }'>{{ it.corporateName }}</span>-->
                    <!--</el-tooltip>-->
                    <!--</div>-->
                    <!--</div>-->
                    <!--</div>-->
                  </box-img>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
          <div class="text-center route_title">
            <router-link :to='{path: "/service", query: {id0: "tuijian", serverName0: "金融大咖", type0: 3}}'>超过4000位专业金融人士满足你的项目要求...</router-link>
          </div>
        </div>
        <div class="tuijian_li_content" v-if = 'activeTitle == "2"'>
          <!--<div class="title tuijian_title">{{ homePage.financingServiceNewVOs[1].operatorFinancingServiceNew.financingName }}</div>-->
          <el-carousel :interval="3000" v-if='homePage' height='224px' :autoplay='false' indicator-position="outside" arrow='never'>
            <el-carousel-item class='tuijian_swiper' v-for="(item,index) in jinrongList" :key="index">
              <div class="tuijian_list_con">
                <!--<div class="xline"></div>-->
                <!--<div class="yline"></div>-->
                <div class="tuijian_li" v-for="(it, key) in item" v-if='it' @click='openToSerde(it)'>
                  <box-img :bgImg='it.projectPhoto' prop='272:373' style='position: relative' :cover='false'>
                    <div class="tuijian_shadow">
                      <div class="text">{{ it.name }}</div>
                    </div>
                  </box-img>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
          <div class="text-center route_title">
            <router-link to='/finance'>10,000+项目等您来参与其中！...</router-link>
          </div>
        </div>
        <!--<el-row :gutter='24' class='tuijian_content'>-->
        <!--<el-col :span='12' class='jinrong'>-->
        <!--<div class="tuijian_li_content">-->
        <!--<div class="title tuijian_title">{{ homePage.financingServiceNewVOs[0].operatorFinancingServiceNew.financingName }}</div>-->
        <!--<el-carousel :interval="3000" v-if='homePage' height='407px' :autoplay = 'false' indicator-position="outside" arrow = 'never'>-->
        <!--<el-carousel-item class='tuijian_swiper' v-for="(item,index) in tuijianList" :key="index">-->
        <!--<div class="tuijian_list_con jinrong_list_con">-->
        <!--&lt;!&ndash;<div class="xline"></div>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="yline"></div>&ndash;&gt;-->
        <!--<div class="tuijian_li" v-if='it' v-for="(it, key) in item" @click.stop='concat'>-->
        <!--<box-img prop='272:373' :bgImg='it.picture' :cover='false'>-->
        <!--<div class="tuijian_shadow">-->
        <!--<div class="text-hidden jinrong_title">-->
        <!--<el-tooltip :disabled = 'it.corporateName.length <= 18' :content="it.corporateName" placement="top">-->
        <!--<span :class = '{"cursor": it.corporateName.length > 18 }'>{{ it.corporateName }}</span>-->
        <!--</el-tooltip>-->
        <!--</div>-->
        <!--<div class="tuijian_shadow_con">-->
        <!--<div class="inline-block text-hidden" style = 'max-width: 50%'>-->
        <!--<el-tooltip :disabled = 'it.name.length <= 9' :content="it.name" placement="top">-->
        <!--<span :class = '{"cursor": it.name.length > 9 }'>{{ it.name }}</span>-->
        <!--</el-tooltip>-->
        <!--</div>-->
        <!--<div class="inline-block text-hidden" style = 'max-width: 50%'>-->
        <!--<el-tooltip :disabled = 'it.business.length <= 9' :content="it.business" placement="top">-->
        <!--<span :class = '{"cursor": it.business.length > 9 }'>{{ it.business }}</span>-->
        <!--</el-tooltip>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--&lt;!&ndash;<div class="box_content">&ndash;&gt;-->
        <!--&lt;!&ndash;<box-img :bgImg='it.picture' prop='204:160' :cover='false' class='inline-block jinrong_logo'></box-img>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="inline-block text-left">&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="text-hidden jinrong_title">&ndash;&gt;-->
        <!--&lt;!&ndash;<el-tooltip :disabled = 'it.name.length <= 5' :content="it.name" placement="top">&ndash;&gt;-->
        <!--&lt;!&ndash;<span :class = '{"cursor": it.name.length > 5 }'>{{ it.name }}</span>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-tooltip>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="text-hidden jinrong_title">&ndash;&gt;-->
        <!--&lt;!&ndash;<el-tooltip :disabled = 'it.business.length <= 5' :content="it.business" placement="top">&ndash;&gt;-->
        <!--&lt;!&ndash;<span :class = '{"cursor": it.business.length > 5 }'>{{ it.business }}</span>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-tooltip>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="text-hidden jinrong_title">&ndash;&gt;-->
        <!--&lt;!&ndash;<el-tooltip :disabled = 'it.corporateName.length <= 5' :content="it.corporateName" placement="top">&ndash;&gt;-->
        <!--&lt;!&ndash;<span :class = '{"cursor": it.corporateName.length > 5 }'>{{ it.corporateName }}</span>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-tooltip>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--</box-img>-->
        <!--</div>-->
        <!--</div>-->
        <!--</el-carousel-item>-->
        <!--</el-carousel>-->
        <!--<div class="text-center route_title">-->
        <!--<router-link :to='{path: "/service", query: {id0: "tuijian", serverName0: "金融大咖", type0: 3}}'>超过4000位专业金融人士满足你的项目要求...</router-link>-->
        <!--</div>-->
        <!--</div>-->
        <!--</el-col>-->
        <!--<el-col :span='12'>-->
        <!--<div class="tuijian_li_content">-->
        <!--<div class="title tuijian_title">{{ homePage.financingServiceNewVOs[1].operatorFinancingServiceNew.financingName }}</div>-->
        <!--<el-carousel :interval="3000" v-if='homePage' height='407px' :autoplay = 'false' indicator-position="outside" arrow = 'never'>-->
        <!--<el-carousel-item class='tuijian_swiper' v-for="(item,index) in jinrongList" :key="index">-->
        <!--<div class="tuijian_list_con">-->
        <!--&lt;!&ndash;<div class="xline"></div>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="yline"></div>&ndash;&gt;-->
        <!--<div class="tuijian_li" v-for="(it, key) in item" v-if='it' @click='openToSerde(it)'>-->
        <!--<box-img :bgImg='it.projectPhoto' prop='272:373' style='position: relative' :cover='false'>-->
        <!--<div class="tuijian_shadow">-->
        <!--<div class="text">{{ it.name }}</div>-->
        <!--</div>-->
        <!--</box-img>-->
        <!--</div>-->
        <!--</div>-->
        <!--</el-carousel-item>-->
        <!--</el-carousel>-->
        <!--<div class="text-center route_title">-->
        <!--<router-link to='/finance'>10,000+项目等您来参与其中！...</router-link>-->
        <!--</div>-->
        <!--</div>-->
        <!--</el-col>-->
        <!--</el-row>-->
      </div>
      <div class="card business">
        <card-title>热门商户 </card-title>
        <div class="card_content">
          <swiper :options="swiperBusinessOption" class='' ref='myBusinessSwiper'>
            <swiper-slide v-for="(item, key) in homePage.hotBusinessVOs" :key='key' class='swiper_li business_li' @click.native='$router.push({path: "/shopDetails", query: {businessId: item.businessId}})'>
              <div class="content">
                <div class="inline-block business_logo">
                  <div class="business_logo_content">
                    <box-img :bgImg='item.businesspicture' prop="188:305" :cover='false'></box-img>
                  </div>
                </div>
                <div class="inline-block business_con">
                  <div class="text-hidden business_title">
                    <el-tooltip :disabled='item.businessName.length <= 13' :content="item.businessName" placement="top">
                      <span :class='{"cursor": item.businessName.length > 13 }'>{{ item.businessName }}</span>
                    </el-tooltip>
                  </div>
                  <el-button type="primary" class='business_button'>进入店铺</el-button>
                </div>
              </div>
              <div class="desc">店铺简介:
                <div class="inline-block desc_con">
                  <p class="desc_p_con">{{item.businessIntroduce ? item.businessIntroduce : "未对店铺进行描述"}}</p>
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <div class="swiper-button-prev" v-if='!isBusinessStart && homePage.hotBusinessVOs.length > 2' @click='prev("myBusinessSwiper")'></div>
          <div class="swiper-button-next" v-if='!isBusinessEnd && homePage.hotBusinessVOs.length > 2' @click='next("myBusinessSwiper")'></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import '@/assets/js/clamp'
  export default {
    name: 'index',
    data() {
      let self = this
      return {
        // 是否审核
        activeTitle: "1",
        imgHeight: '',
        projectName: '',
        activeSearcType: '1',
        banners: [],
        isActive: false,
        isDisplays: false,
        select: '商标查询',
        spaceSwiperOption: {
          loop: true,
          slidesPerView: 3,
          spaceBetween: 10
        },
        roundsSwiper: {
          loop: true,
          slidesPerView: 3,
          spaceBetween: 10
        },
        isBusinessEnd: false,
        isBusinessStart: true,
        swiperBusinessOption: {
          slidesPerView: 2,
          spaceBetween: 10,
          on: {
            slideChangeTransitionEnd() {
              if(self.homePage && !Array.isArray(self.homePage.hotBusinessVOs)) {
                return false
              }
              if(this.activeIndex == 0) {
                self.isBusinessEnd = false
                self.isBusinessStart = true
              } else if(this.activeIndex == self.homePage.hotBusinessVOs.length - 2) {
                self.isBusinessEnd = true
                self.isBusinessStart = false
              } else {
                self.isBusinessEnd = false
                self.isBusinessStart = false
              }
            }
          }
        },
        keywords: '',
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
    mounted() {
      this.banners = []
      if(this.homePage && this.homePage.opdevelop && this.homePage.opdevelop[0]) {
        this.banners = this.homePage.opdevelop[0].operatorCompanyDevelopServers
      } else {
        this.$store.watch(state => state.homePage, val => {
          if(this.homePage && this.homePage.opdevelop && this.homePage.opdevelop[0]) {
            this.banners = this.homePage.opdevelop[0].operatorCompanyDevelopServers
          }
        })
      }
      $(this.$refs.myBusinessSwiper.$el).find('.desc_p_con').each(function() {
        $clamp(this, {
          clamp: 3
        })
      })
    },
    watch: {
      homePage(val) {
        if(val && val.opdevelop && val.opdevelop[0]) {
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
      user(val) {
        if(val && !val.password) {
          this.$confirm('您的账户安全级别较低，请设置密码', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
        }
      }
    },
    computed: {
      operatorOfficeSpaceRosNew() {
        if(this.homePage) {
          return this.homePage.operatorOfficeSpaceRosNew.filter(item => {
            return item
          })
        } else {
          return []
        }
      },
      commonServiceNewRounds() {
        if(this.homePage) {
          return this.homePage.commonServiceNewRounds.filter(item => {
            return item.operatorCommonServiceNew.serviceName
          })
        } else {
          return []
        }
      },
      tuijianList() {
        if(this.homePage) {
          let tuijianList = []
          let listArr = []
          if(!this.homePage.financingServiceNewVOs[0]) {
            return []
          }
          if(Array.isArray(this.homePage.financingServiceNewVOs[0].personalInvestorDisplays)) {
            let personalInvestorDisplays = this.homePage.financingServiceNewVOs[0].personalInvestorDisplays
            personalInvestorDisplays.forEach((item, index) => {
              listArr.push(item)
              if(((index + 1) % 4 == 0 && index !== 0) || index == personalInvestorDisplays.length - 1) {
                tuijianList.push(listArr)
                listArr = []
              }
            })
          }
          return tuijianList
        }
      },
      jinrongList() {
        if(this.homePage) {
          let tuijianList = []
          let listArr = []
          if(!this.homePage.financingServiceNewVOs[1]) {
            return []
          }
          if(Array.isArray(this.homePage.financingServiceNewVOs[1].personalFinanceProjects)) {
            let personalInvestorDisplays = this.homePage.financingServiceNewVOs[1].personalFinanceProjects
            personalInvestorDisplays.forEach((item, index) => {
              listArr.push(item)
              if(((index + 1) % 4 == 0 && index !== 0) || index == personalInvestorDisplays.length - 1) {
                tuijianList.push(listArr)
                listArr = []
              }
            })
          }
          return tuijianList
        }
      },
      LoginType() {
        let user = this.$store.state.userid
        if(user) {
          return 1
        } else {
          return 0
        }
      },
      homePage() {
        return this.$store.state.homePage
      },
      OperatorRoundPhotos() {
        return this.homePage.OperatorRoundPhotos.filter(item => {
          return item.photoPath
        }).map(item => {
          if((item.url.indexOf('takeOutAward.html') !== -1 || item.url.indexOf('eggFrenzy') !== -1) && this.$store.state.userid) {
            if(item.url.indexOf('?') !== -1) {
              item.url += `&userid=${this.$store.state.userid.id}`
            } else {
              item.url += `?userid=${this.$store.state.userid.id}`
            }
            item.flag = false
          } else if((item.url.indexOf('takeOutAward.html') !== -1 || item.url.indexOf('eggFrenzy') !== -1) && !this.$store.state.userid) {
            let index = item.url.indexOf('&userid')
            item.url = index !== -1 ? item.url.substring(0, index) : item.url
            item.flag = true
          } else {
            let index = item.url.indexOf('&userid')
            item.url = index !== -1 ? item.url.substring(0, index) : item.url
            item.flag = false
          }
          return item
        })
      }
    },
    methods: {
      clickRound(e) {
        let opt = this.commonServiceNewRounds[$(e.target).attr('oKey')]
        let key = $(e.target).attr('oIndex')
        this.routeToServer(opt, key)
      },
      routeToServer(opt, key) {
        let type = ''
        if(opt.operatorCommonServiceDownNew[key].pcNavigation == '1') {
          type = 'appsBusinessService'
        } else if(opt.operatorCommonServiceDownNew[key].pcNavigation == '2') {
          type = 'appsknowledgeService'
        } else if(opt.operatorCommonServiceDownNew[key].pcNavigation == '4') {
          type = 'appcollaborateService'
        } else if(opt.operatorCommonServiceDownNew[key].pcNavigation == '5') {
          this.$router.push({
            path: "/spacelist",
            query: {
              title: opt.operatorCommonServiceDownNew[key].serverName
            }
          })
          return false
        }
        let i = 0
        let k = this.homePage[type].findIndex(item => {
          i = item.serverClasTwo.findIndex(it => {
            return it.operatorSerTwo.id == opt.operatorCommonServiceDownNew[key].serverTwoId
          })
          return i !== -1
        })
        let serverQuery = {
          key: k,
          index: i,
          type
        }
        this.$router.push({
          path: '/service',
          query: serverQuery
        })
      },
      clickTo(e) {
        let code = $(e.target).parents('.swiper_parent').attr('code')
        this.$router.push({
          path: "/space",
          query: {
            code
          }
        })
      },
      concat() {
        this.$alert('400-8518585', '请拨打电话', {
          lockScroll: false,
          confirmButtonText: '确定',
          type: 'info'
        }).then().catch()
      },
      prev(opt) {
        this.$refs[opt].swiper.slidePrev()
        this.matchSwiper(opt)
      },
      next(opt) {
        this.$refs[opt].swiper.slideNext()
        this.matchSwiper(opt)
      },
      matchSwiper(opt) {
        let str = ''
        if(opt == 'myBusinessSwiper') {
          str = 'hotBusinessVOs'
        } else {
          return false
        }
        if(this.homePage && !Array.isArray(this.homePage[str])) {
          return false
        }
        if(this.$refs[opt].swiper.activeIndex == 0) {
          this.isBusinessEnd = false
          this.isBusinessStart = true
        } else if(this.$refs[opt].swiper.activeIndex == this.homePage.hotBusinessVOs.length - 2 && opt == 'myBusinessSwiper') {
          this.isBusinessEnd = true
          this.isBusinessStart = false
        } else {
          this.isBusinessEnd = false
          this.isBusinessStart = false
        }
      },
      openToSerde(opt) {
        this.$router.push(`/financedesc/${opt.id}`)
      },

      enter(index) {
        this.isActive = true
        if(index === 1) {
          this.isDisplays = true
        } else {
          this.isDisplays = false
        }
      },
      openTo(opt) {
        if(opt.flag) {
          this.$router.push('/login/0')
        } else {
          window.location.href = opt.url
        }
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
      search() {
        this.keywords = this.keywords.replace(/ /g, '')
        if(this.select == '商标查询') {
          this.activeSearcType = '1'
        } else if(this.select == '专利查询') {
          this.activeSearcType = '2'
        }
        this.$store.commit('setTradeNum', true)
        this.$router.push({
          path: `/trademark/${this.activeSearcType}`,
          query: {
            keywords: this.keywords
          }
        })
      },
      serverTo(key) {
        this.$router.push({
          path: '/service',
          query: {
            key: key,
            type: 'hotServerPcs'
          }
        })
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
      companyTo(opt) {
        this.$router.push(`/serde/${opt.id}/1`)
      },
      companyMou(index) {
        if(this.homePage.opdevelop[index]) {
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
  .bananer {
    margin: 0 auto;
    padding-left: 230px;
    box-sizing: border-box;
    width: 1200px;
  }

  .ban_img img {
    width: 100%;
  }

  .card_content {
    border: 1px solid #eee;
    box-shadow: 1px 1px 1px 1px #eee;
    position: relative;
    padding: 10px 40px;
    box-sizing: border-box;
  }

  .swiper_li {
    cursor: pointer;
  }

  .more .icon {
    width: 24px;
    display: inline-block;
    cursor: pointer;
  }

  .more .icon:first-child {
    margin-right: 25px;
  }

  .new_rounds .round_li {
    padding: 15px;
    margin: 15px 0;
    box-shadow: 1px 1px 5px 2px #eee;
    box-sizing: border-box;
  }

  .new_rounds .round_logo {
    margin: 20px 0;
  }

  .new_rounds_server {
    height: 6em;
  }

  .new_rounds_server .new_rounds_server_li {
    border-right: 1px solid #eee;
    margin-top: 15px;
  }

  .new_rounds_server .new_rounds_server_li span {
    border-bottom: 1px solid transparent;
    line-height: 1.5em;
    display: inline-block;
    transition: border-bottom .2s linear;
  }

  .new_rounds_server .new_rounds_server_li span:hover {
    border-bottom: 1px solid #666;
    transition: border-bottom .2s linear;
  }

  .new_rounds_server .new_rounds_server_li:nth-child(2n) {
    border-right: none;
  }

  .space .card_content {
    padding: 24px 40px;
  }

  .space .space_title {
    margin-top: 10px;
  }

  .company .card_li {
    margin-bottom: 10px;
    padding: 15px 0;
    box-shadow: 1px 1px 1px 1px #eee;
  }

  .company .card_li .company_con {
    padding: 0 15px;
    cursor: pointer;
    border-left: 1px solid #eee;
    box-sizing: border-box;
  }

  .company .company_li {
    vertical-align: middle;
  }

  .company .company_li .title {
    margin: auto 0;
    position: absolute;
    top: 0;
    bottom: 0;
  }

  .company .card_li .company_con .company_list {
    width: calc(50% - 7.5px);
    vertical-align: middle;
  }

  .company .card_li .company_con .company_list:nth-child(2) {
    padding-left: 10px;
  }

  .company .company_list .company_title {
    font-size: 16px;
    height: 3em;
    overflow: hidden;
  }

  .company .company_list .company_price {
    font-size: 18px;
    color: #FD3232;
  }

  .company .company_list .company_subhead {
    margin: 15px 0;
  }

  .search_title {
    margin: 10px 0;
    cursor: pointer;
  }

  .search_title .active_search {
    color: #999;
  }

  .search_input {
    width: 542px;
    margin-bottom: 20px;
  }

  .knowledge .search_button {
    border-bottom-right-radius: 16px;
    border-top-right-radius: 16px;
    width: 100%;
    top: 0;
    left: 0;
    background: #c7000a url('~@/assets/images/gack/search.png') no-repeat center center/50% 50%;
    position: absolute;
    height: 100%;
    color: #fff;
  }

  .knowledge {
    background: #fff;
  }
  /*.knowledge .card_content {*/
  /*background: #333;*/
  /*}*/

  .knowledge .knowledge_search {
    background: #333;
  }

  .knowledge .knowledge_list {
    margin: 10px 0;
  }

  .knowledge .knowledge_list .knowledge_li {
    box-shadow: 0 0 10px 0 #eee;
    border: 1px solid #eee;
    padding: 24px;
    box-sizing: border-box;
  }

  .knowledge .knowledge_list .knowledge_li .inline-block {
    width: calc(50% - 3px);
    vertical-align: middle;
  }

  .knowledge .knowledge_list .knowledge_li .inline-block:first-child {
    padding: 0 15px;
    box-sizing: border-box;
  }

  .knowledge .knowledge_list .knowledge_li .inline-block .knowledge_li_title {
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 2px solid #ff5556;
  }

  .knowledge .knowledge_list .knowledge_li .inline-block .knowledge_li_more {
    font-size: 14px;
    font-weight: bold;
  }

  .business {
    margin-bottom: 20px;
  }

  .card_content .swiper-button-prev,
  .card_content .swiper-button-next {
    width: 18px;
    height: 70px;
    opacity: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    background-size: cover;
    transition: opacity linear .2s;
  }

  .space .card_content .swiper-button-prev,
  .space .card_content .swiper-button-next {
    top: 82px;
    bottom: auto;
  }

  .card_content:hover .swiper-button-prev,
  .card_content:hover .swiper-button-next {
    opacity: .7;
    transition: opacity linear .2s;
  }

  .swiper-button-prev {
    transform: rotate(180deg);
    left: 5px;
    background-image: url('~@/assets/images/arrow_next.png');
  }

  .swiper-button-next {
    right: 5px;
    background-image: url('~@/assets/images/arrow_next.png');
  }

  .business .business_li {
    border-right: 1px solid #eee;
    box-sizing: border-box;
  }

  .business .business_logo {
    width: 255px;
    box-shadow: 0 0 10px 0 #eee;
    vertical-align: middle;
  }

  .business .business_logo_content {
    box-sizing: border-box;
    padding: 15px;
    border: 1px solid #eee;
  }

  .business .business_con {
    margin-left: 10px;
    width: calc(100% - 270px);
    vertical-align: middle;
  }

  .business .business_title {
    font-size: 20px;
    font-weight: bold;
  }

  .tuijian_content {
    /*border: 1px solid #eee;*/
    box-sizing: border-box;
  }

  .tuijian .active_title {
    color: #999;
  }

  .tuijian_content .tuijian_li_content {
    border: 1px solid #eee;
    box-sizing: border-box;
  }

  .tuijian_swiper .tuijian_list_con .tuijian_li {
    float: left;
    width: calc(25% - 18px);
    margin-top: 10px;
    cursor: pointer;
    border: 1px solid #eee;
    box-shadow: 0 0 10px 0 #eee;
    box-sizing: border-box;
    margin-right: 22px;
    position: relative;
  }

  .tuijian_swiper .tuijian_list_con .xline {
    position: absolute;
    top: 10px;
    bottom: 0;
    left: 15px;
    right: 0;
    height: calc(100% - 20px);
    width: 2px;
    margin: auto;
  }

  .tuijian_swiper .tuijian_list_con .yline {
    position: absolute;
    top: -30px;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    width: calc(100% - 30px);
    margin: auto;
  }

  .tuijian_swiper .tuijian_list_con .xline:before,
  .tuijian_swiper .tuijian_list_con .xline:after {
    content: '';
    width: 2px;
    height: calc(50% - 25px);
    display: inline-block;
    background: #eee;
  }

  .tuijian_swiper .tuijian_list_con .yline:before,
  .tuijian_swiper .tuijian_list_con .yline:after {
    content: '';
    width: calc(50% - 5em);
    height: 2px;
    display: inline-block;
    background: #eee;
  }

  .tuijian_swiper .tuijian_list_con .xline:before {
    margin-bottom: 50px;
  }

  .tuijian_swiper .tuijian_list_con .yline:before {
    margin-right: 10em;
  }

  .tuijian_swiper .jinrong_list_con .tuijian_li .box_content {
    padding: 30px 15px;
    box-sizing: border-box;
  }

  .tuijian_swiper .tuijian_list_con {
    position: relative;
    padding: 0 15px;
    min-height: 442px;
  }

  .tuijian_swiper .tuijian_list_con:after {
    content: '';
    display: block;
    clear: both;
  }

  .tuijian_swiper .tuijian_li .tuijian_shadow {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: all .5s linear;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
  }

  .tuijian_swiper .jinrong_list_con .tuijian_li .tuijian_shadow {
    height: 50px;
    padding: 0 15px;
    box-sizing: border-box;
    top: auto;
  }

  .tuijian_swiper .tuijian_li:hover .tuijian_shadow {
    opacity: 1;
    transition: all .5s linear;
  }

  .text {
    position: absolute;
    top: 0;
    left: 0;
    transition: all .5s linear;
    bottom: 0;
    right: 0;
    height: 3em;
    line-height: 3em;
    margin: auto 0;
    text-align: center;
  }

  .tuijian_swiper .tuijian_li .inline-block {
    max-width: 50%;
    vertical-align: middle;
  }

  .tuijian_swiper .tuijian_li .inline-block.jinrong_logo {
    width: calc(50% - 20px);
    margin-right: 15px;
  }

  .tuijian_swiper .tuijian_li .tuijian_list_con .inline-block:nth-child(2) {
    margin-left: 15px;
    font-size: 14px;
  }
  /*.tuijian_swiper .tuijian_li .inline-block .jinrong_title:nth-child(2) {*/
  /*margin: 15px 0;*/
  /*}*/

  .tuijian_li_content .tuijian_title {
    /*position: absolute;*/
    /*top: 0;*/
    /*bottom: 0;*/
    /*margin: auto 0;*/
    background: #C7000A;
    color: #fff;
    height: 40px;
    line-height: 40px;
    width: 100%;
    font-size: 18px;
    margin: 0 auto;
    font-weight: normal;
    text-align: center;
  }

  .tuijian .route_title {
    color: #666;
    cursor: pointer;
    margin-bottom: 12px;
    text-decoration: underline;
    background: transparent;
    transition: all linear .2s;
  }
  /*.tuijian .route_title:hover {*/
  /*background: rgba(0, 0, 0, .5);*/
  /*color: #fff;*/
  /*text-decoration: none;*/
  /*transition: all linear .2s;*/
  /*}*/

  .tuijian_swiper {
    background: #fff;
  }

  .tuijian_swiper .tuijian_list_con .tuijian_li:nth-of-type(4n) {
    margin-right: 0;
  }
  /*.tuijian_swiper .tuijian_list_con .tuijian_li:nth-of-type(n+3) {*/
  /*margin-top: 10px;*/
  /*}*/

  .desc {
    margin-top: 15px;
  }

  .desc .desc_con {
    padding: 0 1em;
    color: #999;
    font-size: 12px;
    width: calc(100% - 8em);
    vertical-align: top;
    overflow: hidden;
    position: relative;
  }

  .business_button {
    margin-top: 30px;
  }

  .desc .desc_con .desc_more {
    position: absolute;
    bottom: 0;
    right: 0;
    background: #fff;
    padding-left: 15px;
    color: #ff0000;
  }

  .tuijian_li_content>>>.el-carousel__indicators .el-carousel__indicator {
    padding: 14px;
    border-radius: 15px;
  }

  .tuijian_li_content>>>.el-carousel__indicators .el-carousel__indicator .el-carousel__button {
    width: 15px;
    height: 15px;
    border-radius: 15px;
  }

  .knowledge .input-with-select {
    width: 650px;
    margin: 0 auto;
  }

  .knowledge>>>.el-select .el-input {
    width: 150px;
  }

  .knowledge>>>.el-input-group__append,
  .el-input-group__prepend:nth-of-type(2) {
    border: 1px solid #c7000a;
    border-bottom-right-radius: 30px;
    border-top-right-radius: 30px;
  }

  .knowledge>>>.el-input-group__append .el-button.el-button--primary {
    background: #c7000a;
    border-color: #c7000a;
    border-bottom-left-radius: 0px;
    border-top-left-radius: 0px;
    border-bottom-right-radius: 30px;
    border-top-right-radius: 30px;
    color: #fff;
  }
</style>
