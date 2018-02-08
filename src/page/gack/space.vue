<template>
  <div class="page" v-if = 'room'>
    <div class="container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>空间风采</el-breadcrumb-item>
        <el-breadcrumb-item>{{ room.roomName}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container space_content">
      <div class="fc">
        <div class="fc_content" :class='{fixed: scrollTop > 200 && scrollTop < 800, top: scrollTop > 800}'>
          <h1>{{ room.roomName }}</h1>
          <p class="add">{{ room.address }}</p>
          <el-form :data='formData' :model = 'formData' :rules = 'rules' ref = 'rulesForm'>
            <div class="login_inp">
              <el-form-item prop = 'username' required>
                <div class="icon_img">
                  <img src='~assets/images/reg/username.png'>
                </div>
                <el-input v-model='formData.username' :minlength = '2' :maxlength = '7' placeholder="输入联系人姓名"></el-input>
              </el-form-item>
            </div>
            <div class="login_inp">
              <el-form-item prop = 'phonenumber' required>
                <div class="icon_img">
                  <img src='~assets/images/reg/phonenumber.png'>
                </div>
                <el-input v-model='formData.phonenumber' :maxlength = '11' placeholder="输入联系电话"></el-input>
              </el-form-item>
            </div>
            <div class="login_inp">
              <el-form-item prop = 'date'>
                <div class="icon_img">
                  <img src='~assets/images/reg/canguan.png'>
                </div>
                <el-date-picker v-model="formData.date" :editable = 'false' type="date" placeholder="选择日期" :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
            </div>
            <div class="login_inp">
              <el-form-item prop = 'number' required>
                <div class="icon_img">
                  <img src='~assets/images/reg/number.png'>
                </div>
                <el-input v-model.number='formData.number'  placeholder="输入参观人数"></el-input>
              </el-form-item>
            </div>
            <div class="login_inp">
              <el-form-item prop = 'desc'>
                <div class="icon_img">
                  <img src='~assets/images/reg/beizhu.png'>
                </div>
                <el-input v-model='formData.desc' type="textarea" :rows = '3'  placeholder="请填写参观目的和公司信息"></el-input>
              </el-form-item>
            </div>
          </el-form>
          <div class="submit" @click = 'submit'>预约参观</div>
          <div class="lx"><img src="~assets/images/gack/fwxq_icon.png" alt="" width='22' height='22'>010-85757521</div>
        </div>
      </div>
      <div class="fr desc">
        <el-carousel :interval="3000" height = '376.667px'>
          <el-carousel-item v-for="(item,index) in swiperImg" :key="index">
            <box-img prop = '1:1.8' :bgImg = 'item'>
            </box-img>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="container space_content">
      <div class="fr desc">
        <div class="desc_li">
          <div class="desc_title"><span class = 'inline-block tip'></span>空间介绍</div>
          <div class="desc_con">
            <p>{{room.describeAsk}}</p>
          </div>
        </div>
        <div class="desc_li" v-for = 'item in commoditys' v-if = '(/空间/).test(item.serverName) || (/工位/).test(item.serverName)'>
          <div class="desc_title"><span class = 'inline-block tip'></span>{{ item.serverName }}</div>
          <div class="desc_con">
            <el-row class="con_li" :gutter='12'>
              <el-col :span='8' v-for='(pic, key) in item.commoditys' :key='key' @click.native = "$router.push(`/serde/${pic.id}/1`)">
              <box-img :bgImg = 'pic.commodity_smallimage' prop = '228:301'></box-img>
              <div class='oh desc_licon' v-if='pic.finalPrice'>
                <div class="fl" style="width:calc(100% - 7em)">
                  <el-tooltip effect="dark" :disabled = 'pic.commodityName.length <= 9' :content="pic.commodityName" placement="top">
                    <div class = 'text-hidden' :class = '{cursor: pic.commodityName.length > 9}'>{{ pic.commodityName }}</div>
                  </el-tooltip>
                </div>
                <div class="fr price">￥{{ pic.finalPrice }}元/{{ pic.measurementUnit }}</div>
              </div>
              <div class="con_title" v-else>{{ pic.commodityName }}</div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="desc_li">
          <div class="desc_title"><span class = 'inline-block tip'></span>配套设施</div>
          <div class="desc_con">
            <el-row class="con_li" :gutter='12'>
              <el-col class = 'text-center' :span='4' v-for='(pic, key) in room.spacefacilities' :key='key'>
                <img :src="pic.spacefacilitiesYesUrl" alt="">
                <div class="con_title">{{ pic.spacefacilitiesName }}</div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="desc_li">
          <div class="desc_title"><span class = 'inline-block tip'></span>交通路线</div>
          <div class="desc_con">
            <!--<baidu-map class="map" :center="{-->
              <!--lat: room.lat,-->
              <!--lng: room.lng-->
            <!--}" :zoom='15'>-->
              <!--<bm-marker :position="{-->
                <!--lat: room.lat,-->
                <!--lng: room.lng-->
              <!--}" animation="BMAP_ANIMATION_BOUNCE">-->
                <!--<bm-label :content="room.roomName" :offset="{width: -35, height: 30}"/>-->
              <!--</bm-marker>-->
            <!--<bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>-->
            <!--</baidu-map>-->
            <el-amap ref="map" vid="amapDemo" :center="[room.lng, room.lat]" :zoom="zoom" class="map" :plugin="plugin">
              <el-amap-marker  :position="[room.lng, room.lat]" :content="`<div class = 'text-hidden' style = 'background:#ff4d51;border-radius: 5px;padding: 5px;color: #fff;'>${room.roomName}</div>`"></el-amap-marker>
            </el-amap>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'space',
    data() {
      const checkAmount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('参观人数不能为空'));
        }
        if ((typeof value).toLowerCase() !== 'number') {
          return callback(new Error('请输入数字值'));
        } else if (value % 1 > 0 ) {
          return callback(new Error('输入的数字必须是整数'));
        } else {
          if (value <= 0) {
            return callback(new Error('参观人数必须大于0'));
          } else if (value > 50) {
            this.$set(this.formData, 'number', 50)
            this.$message.error('参观人数不能大于50')
            return callback(new Error('参观人数不能大于50'));
          } else {
            callback();
          }
        }
      }
      const checkDesc= (rule, value, callback) => {
        let len = value.replace(/[\u0391-\uFFE5]/g,"aa").length
        if (len > 255) {
          return callback(new Error('输入的字数超过125个字'));
        } else {
          callback();
        }
      }
      const checkDate = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入参观时间'));
        } else {
          callback();
        }
      }
      return {
        zoom: 15,
        center: [121.59996, 31.197646],
        plugin: [{
          pName: 'ToolBar'
        }],
        commoditys: [],
        room: null,
        swiperImg: [],
        scrollTop: 0,
        formData: {
          username: '',
          phonenumber: '',
          date: '',
          number: 0,
          desc: ''
        },
        value1: '',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        rules: {
          username: [{ required: true, message: '请输入联系人名称', trigger: 'blur' }],
          phonenumber: [{
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }, {
            pattern: /1[3|4|5|7|8][0-9]{9}/,
            message: '请输入正确的手机号码'
          }],
          date: [ {validator: checkDate, trigger: 'blur' }],
          number: [{ validator: checkAmount, trigger: 'blur' }],
          desc: [{ validator: checkDesc, trigger: 'blur' }]
        }
//        center: {
//          lng: 116.404,
//          lat: 39.915
//        }
      }
    },
    mounted() {
      window.addEventListener('scroll', () => {
        this.scrollTop = $('body').scrollTop()
        if (this.scrollTop == 0) {
          this.scrollTop = $('html').scrollTop()
        }
      })
    },
    beforeDestroy () {
      this.formData = {
        username: '',
        phonenumber: '',
        date: '',
        number: 0,
        desc: ''
      }
      this.$refs.rulesForm.resetFields()
    },
    created () {
      let url = '',data= {}
      if (this.query.code) {
        url = `${this.$config.back}/guoanmaker/provide/commodityMove/getProvideCommodityOrRoomMove`
        data = {
          code: this.query.code,
          cityCode: this.address.inCity.code,
          userId: this.$store.userid ? this.$store.userid.id : ''
        }
      } else if (this.query.id) {
        url = `${this.$config.back}/guoanmaker/provide/commodityMove/findProvideRoomCommodityMoves`
        data = {
          roomId: this.query.id
        }
      }
        this.$htAjax.get(url, {
          params: data
        }).then(({ data }) => {
          this.room = data.data.room
          this.swiperImg  = Object.entries(this.room).filter(item => {
            return item[1] && (item[0] === 'roomImgOne' || item[0] === 'roomImgTwo' || item[0] === 'roomImgThree'|| item[0] === 'roomImgFour' || item[0] === 'roomImgFive')
          }).map(item => {
            return item[1]
          })
          this.commoditys = data.data.commoditys
        }).catch(error => {
          // console.log(error)
        })
    },
    computed: {
      query () {
        return this.$route.query
      }
    },
    methods: {
      submit () {
        if (!this.$store.state.userid) {
          this.$router.push('/login/0')
          return false
        }
        this.$refs.rulesForm.validate(valid => {
          if (valid) {
            this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/orderform/createProvideSpaceReserve`, {}, {
              params: {
                reserveTime: this.formData.date.toLocaleDateString().replace(/\//g, '-'),
                contactPerson: this.formData.username,
                contactNumber: this.formData.phonenumber,
                reserveAmount: this.formData.number,
                remark: this.formData.desc,
                roomid: this.room.id,
                userid: this.$store.state.userid.id
              }
            }).then(({ data }) => {
              this.$message({
                type: 'success',
                message: data.data.value
              })
              this.$router.push({
                path: `/user/appointment`,
                query: {
                  title: '我的预约',
                  fromtitle: '我的预约'
                }
              })
            }).catch(error => {
              this.$message.error('预约空间失败')
            })
          }
        })
      }
    }
  }
</script>
<style scoped>
  .el-breadcrumb {
    line-height: 46px;
  }
 .page{
   background: #f3f3f3;
 }
  .content {
    width: 100%;
    margin-right: -100%;
    position: relative;
    opacity: 1;
    display: block;
    z-index: 2;
    overflow:hidden;
    background-repeat: no-repeat;
    background-position: 50% 0px;
    background-size: 100% 100%;
  }
  .container {
    overflow: hidden;
  }
 .space_content{
   background: #fff;
 }
  .desc {
    width: 678px;
  }

  .desc .desc_title {
    font-size: 20px;
    font-weight: normal;
    padding: 28px 0 15px;
    border-bottom: 1px solid #efefef;
  }
  .desc .desc_title .tip{
    width: 6px;
    height: 30px;
    border-radius: 2px;
    vertical-align: middle;
    margin: 0 19px 4px 0;
    background: #C7000A;
  }
  .desc_li p {
    text-indent: 2em;
  }

  .desc_con {
    padding: 10px 0 20px;
  }
  .desc_con .desc_licon{
   line-height: 50px;
  }
  .desc_li {
    font-size: 14px;
    color: #777777;
    line-height: 26px;
    text-align: Justify;
  }

  .con_title {
    text-align: center;
  }

  .con_li img {
    max-width: 100%;
    display:inline-block;
  }

  .fc {
    position: fixed;
    top: 297px;
    left: 50%;
    width: 1190px;
    margin-left: -595px;
    z-index: 1;
  }

  .fc .fc_content {
    width: 430px;
    background: #fff;
    padding: 55px 30px 35px;
    box-sizing: border-box;
    margin-left: 40px;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, .1);
    z-index: 11111;
  }

  .fc .fc_content.fixed {
    position: fixed;
    top: 50px;
  }

  .fc .fc_content.top {
    position: fixed;
    bottom: 180px;
  }

  .fc .fc_content h1 {
    font-size: 32px;
    font-weight: normal;
    margin-bottom: 35px;
  }

  .fc .fc_content p {
    font-size: 16px;
    color: #5D5D5D;
  }

  .fc .fc_content .input {
    margin-top: 20px;
  }

  .input_img {
    width: 24px;
    text-align: center;
  }

  .submit {
    width: 100%;
    height: 48px;
    line-height: 46px;
    background: #FF4F4C;
    color: #fff;
    font-size: 16px;
    border-radius: 2px;
    text-align: center;
    cursor: pointer;
    margin: 20px 0 30px;
  }

  .lx {
    text-align: center;
  }

  .lx img {
    vertical-align: middle;
    margin: 0 6px 3px 0;
  }

  .map {
    width: 680px;
    height: 340px;
    overflow: hidden;
    position: relative;
    z-index: 0;
    background-color: rgb(243, 241, 236);
    color: rgb(0, 0, 0);
    text-align: left;
  }

  .price {
    color: #f00;
  }

  .login_inp {
    position: relative;
    width: 100%;
    margin-top: 20px;
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
  .login_inp  >>> .el-input__inner, .login_inp >>>  .el-textarea__inner{
    padding-left: 35px;
  }
  space_content >>> .el-date-picker{
    z-index: 10;
  }
</style>
