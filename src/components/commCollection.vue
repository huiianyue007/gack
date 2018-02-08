<template>
  <div class="list">
      <div class="type_list" v-if = 'typeCountList.length' :class = '[flag? "show" : "hidden"]'>
        <div class="type_list_con" v-if = ''>
          <span class="inline-block"  v-if = 'item.num > 0' :class = '{"active_type": type== item.sid}' @click = 'select(item)' v-for = '(item, key) in typeCountList'>
        {{ item.sname }}({{ item.num }})
      </span>
        </div>
        <span class="el-icon-arrow-down icon" v-if ='!flag' @click = 'flag = true'></span>
        <span class="el-icon-arrow-up icon" v-else @click = 'flag = false'></span>
      </div>
    <div class="comm_list">
      <layout v-if = '!commList.length'></layout>
      <el-row :gutter = '20'>
        <el-col :span = 6 v-for = '(item, key) in commList' :key = 'key' class = 'comm' @click.native = '$router.push({path: `/serde/${item.commodityid}/1`, query: {cityCode: item.code == "0" ? null : item.code}})'>
          <box-img :bgImg = 'item.commodity_smallimage'>
          </box-img>
          <div class="text-hidden text-center comm_title">{{ item.commodityName }}</div>
          <div class="text-center text-red">￥{{ item.finalPrice }}</div>
          <img src="~assets/images/reg/shoucang.png" alt="" class="coll" @click.stop = 'shoucang(item, key)'>
          <transition name="el-fade-in">
            <div v-show="item.show" class="transition-box text-center diag">
              <span class="content">确定取消关注该商品</span>
              <div class="text-center button">
                <el-button type="primary" size = 'small' @click.stop="del(item)">确定</el-button>
                <el-button size = 'small' @click.stop = 'item.show=false'>取消</el-button>
              </div>
            </div>
          </transition>
        </el-col>
      </el-row>
    </div>
    <div class="text-right button">
      <el-pagination @size-change="handleSizeChange"  class = 'inline-block pagination' @current-change="handleCurrentChange" :page-size='size' :current-page="page" layout="prev, pager, next" :total="count" v-if = 'count'>
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'commCollection',
    data () {
      return {
        page: 1,
        size: 8,
        type: 'all',
        typeCountList: [],
        commList: [],
        flag: false,
        initFlag: false,
        count: 0,
        key: 0
      }
    },
    activated () {
      this.type =  'all'
      this.initFlag =  false
      this.init()
    },
    watch: {
      type () {
        this.page = 1
        this.init()
      }
    },
    methods: {
      handleSizeChange(val) {
        //pagesize改变时候触发
        this.pagesize = val;
        this.init()
      },
      handleCurrentChange(val) {
        //当前页改变时候触发
        this.page = val
        this.init()
      },
      select (opt) {
        this.type = opt.sid
        this.count = opt.num
        if (this.flag) {
          this.flag = false
        }
      },
      shoucang (item, key) {
        this.key = key
        this.$set(item, 'show', true)
      },
      del (opt) {
        this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/commodity/deletePersonalCollection`, {}, {
          params: {
            personalUserId: this.$store.state.userid.id,
            provideCommodityId: opt.commodityid
          }
        }).then(res => {
          this.$set(opt, 'show', false)
          if (this.type!== 'all') {
            let index = this.typeCountList.findIndex(item => {
              return item.sid == this.type
            })
            this.$set(this.typeCountList[index], 'num', this.typeCountList[index].num - 1)
            if (!this.typeCountList[index].num) {
              this.type = 'all'
            }
          } else {
            let index = this.typeCountList.findIndex(item => {
              return item.sid == opt.serid
            })
            this.$set(this.typeCountList[index], 'num', this.typeCountList[index].num - 1)
          }
          this.$set(this.typeCountList[0], 'num', this.typeCountList[0].num - 1)
          this.page = 1
          this.init()
        }).catch(error => {
          console.log(error)
        })
      },
      init () {
        this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/commodity/selectPersonalCollectionPagePCType`, {}, {
          params: {
            type: this.type,
            userid: this.$store.state.userid.id,
            page: this.page - 1,
            size: this.size,
          }
        }).then(({data}) => {
          this.commList= data.data.commlist.map(item => {
            item.show = false
            return item
          })
          this.count = data.data.count
          if (!this.initFlag) {
            this.initFlag = true
            this.typeCountList = data.data.typeCountList
            this.typeCountList.unshift({
              sid: 'all',
              sname: '全部宝贝',
              num: this.count
            })
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>
<style scoped>
  .list{
    padding: 0 15px;
    min-height: 400px;
  }
  .list .type_list{
    padding: 0 15px;
    box-sizing: border-box;
    height: 66px;
    background: #fff;
    border-bottom: 1px solid #eee;
    position:relative;
  }
  .list .type_list .icon{
    position: absolute;
    top: 0px;
    right: 15px;
    z-index: 2;
  }
  .type_list_con{
    position: absolute;
    top: 0px;
    left:0;
    width: calc(100% - 35px);
    background: #fff;
    z-index:1;
  }
  .list .type_list.hidden{
    overflow: hidden;
  }
  .list .type_list.show{
    overflow: none;
  }
  .list .type_list span{
    line-height: 23px;
    padding: 20px 0;
    margin-right: 35px;
  }
  .list .type_list span:last-child{
    margin-right: 0;
  }
  .list .type_list .active_type{
    border-bottom: 2px solid #ff0000;
  }
  .comm_list{
    padding: 10px 20px;
    position: relative;
    min-height: 400px;
  }
  .comm{
    margin: 10px 0;
    position: relative;
  }
  .comm .comm_title{
    font-size: 16px;
    margin: 10px 0;
    font-weight: bold;
  }
  .coll{
    position: absolute;
    top: 15px;
    right: 15px;
    width: 24px;
  }
  .comm .diag{
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    right: 0;
    font-size: 16px;
    background: rgba(0,0,0,.5);
    color: #fff;
  }
  .comm .diag{
    padding-top: 75px;
    box-sizing: border-box;
  }
  .comm .diag .button{
    margin-top: 45px;
  }
</style>
