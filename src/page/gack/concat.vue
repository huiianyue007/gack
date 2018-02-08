<template>
  <div class="container">
    <div class="list">
      <div class="title">
        {{ companyAddress.title }}
      </div>
      <!--<div class="li_address">{{ address.address }}</div>-->
      <el-amap :center="[116.51068, 39.911]" :zoom="15" class="li_address">
        <el-amap-info-window :position="[116.51068, 39.911]" :content="`<div class = 'text-hidden' style = 'background: #ff4d51;border-radius: 5px;padding: 5px;color: #fff;'><div style='position:absolute; bottom:-5px; left:10px;background: #ff4d51;width: 24px;height:24px;transform:rotate(45deg);z-index: -1'></div>${companyAddress.address}</div>`" :offset="[155, -42]" isCustom='true'></el-amap-info-window>
        <el-amap-marker :position="[116.51068, 39.911]" :content="`<div class = 'text-hidden' style = 'background:#ff4d51;border-radius: 5px;padding: 5px;'></div>`"></el-amap-marker>
      </el-amap>
    </div>
    <el-row :gutter='12'>
      <el-col :span="8" class="list list_con" v-for='(item, key) in concatList' :key='key'>
        <div class="title">
          {{ item.title }}
        </div>
        <div class="shadow">
          <div class="li">
            <div class="li_con"><img src="~assets/images/gack/foot_p.png" width='24' alt="">{{ item.phonenumber }}</div>
            <div class="li_con"><img src="~assets/images/gack/foot_m.png" width='24' alt="">{{ item.email }}</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'concat',
    data() {
      return {
        concatList: [{
          title: '商务合作',
          phonenumber: '400-851-8585',
          email: 'gackservice@gakj.citic.com'
        }, {
          title: '项目投资',
          phonenumber: '400-851-8585',
          email: 'gackservice@gakj.citic.com'
        }, {
          title: '客服电话',
          phonenumber: '400-851-8585',
          email: 'gackservice@gakj.citic.com'
        }],
        companyAddress: {
          title: '公司地址',
          address: '北京市朝阳区高碑店镇尚8里文创园A座华腾世纪总部公园'
        }
      }
    }
  }
</script>
<style scoped>
  .container {
    padding-bottom: 2em;
  }
  
  .list:nth-child(1) .shadow {
    background: url(~assets/images/gack/shangwuhezuo.png) center center / contain no-repeat
  }
  
  .list:nth-child(2) .shadow {
    background: url(~assets/images/gack/jinrong.png) center center / contain no-repeat
  }
  
  .list:nth-child(3) .shadow {
    background: url(~assets/images/gack/phone.png) center center / contain no-repeat
  }
  
  .list_con {
    margin-top: 2em;
  }
  
  .list .title {
    margin: 15px 0;
  }
  
  .list .li {
    background: rgba(0, 0, 0, .5);
    color: #fff;
    padding: 82px 70px;
  }
  
  .list .li .li_con img {
    margin-right: 10px;
  }
  
  .list .li .li_con:first-child {
    margin-bottom: 30px;
  }
  
  .li_address {
    height: 300px;
  }
</style>