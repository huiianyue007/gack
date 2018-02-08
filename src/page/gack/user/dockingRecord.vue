<template>
  <div class="record">
    <el-row class = 'record_content'>
      <el-col :span = '8' class = 'record_li_con'>项目名称</el-col>
      <el-col :span = '8'  class = 'record_li_con'>对接时间</el-col>
    </el-row>
    <div class="record_content record_list">
      <layout v-if ='!recordList.length'></layout>
      <el-row class = 'record_li' v-for = '(item, key) in recordList' :key = 'key' @click.native = 'select(item)'>
        <el-col :span = '8' class = 'record_li_con'>{{ item.commodityName }}</el-col>
        <el-col :span = '8'  class = 'record_li_con'>{{ item.createTime | time }}</el-col>
        <el-col :span = '8'  class = 'record_li_con text-center select'>查看详情</el-col>
      </el-row>
      <div class="text-right">
        <el-pagination @size-change="handleSizeChange" class='pagination' @current-change="handleCurrentChange" :page-size='pageSize' :current-page="currentPage" layout="prev, pager, next" :total="total" v-if='total'>
        </el-pagination>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="50%">
      <div class="text-center title">对接资料收集单</div>
      <div class="record_detail" v-if = 'record'>
        <div>
          <div class="inline-block" style="min-width: calc(50% - 5px)">
            <span class="title">企业名称</span> <div class="inline-block" style="vertical-align:top;max-width: calc(100% - 8em);word-wrap: break-word">
            {{record.enterpriseName}}
          </div>
          </div>
          <div class="inline-block" style="min-width: calc(50% - 5px)">
            <span class="title">联系方式</span> {{record.contactNumber}}
          </div>
        </div>
        <el-row class = 'de_list'>
          <el-col :span = '12'>
            <span class="title">联系人</span> <div class="word-break" style="max-width: calc(100% - 7em)">{{record.contactPerson}}</div>
          </el-col>
          <el-col :span = '12'>
            <span class="title">职位</span> <span class="word-break" style="max-width: calc(100% - 6em)">{{record.position}}</span>
          </el-col>
        </el-row>
        <p class = 'de_list'>
          <span class="title">需求简述</span>
          <span class="word-break synopsis">
          {{record.projectIntroduction}}
        </span>
        </p>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'docking_record',
    data () {
      return {
        recordList: [],
        total: 0,
        pageSize: 10,
        currentPage: 1,
        dialogVisible: false,
        record: null
      }
    },
    created () {
      this.init()
    },
    methods: {
      select (opt) {
        this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/demandDocking/findDemandDockingByid`, {}, {
          params: {
            id: opt.id
          }
        }).then(({ data }) => {
          this.dialogVisible = true
          this.record = data.data
        }).catch(error => {
          console.log(error)
        })
      },
      handleSizeChange(val) {
        //pagesize改变时候触发
        this.pagesize = val;
        this.init();
      },
      handleCurrentChange(val) {
        //当前页改变时候触发
        this.currentPage = val
        //参数1  查询条件 当前页码  当前页显示条数
        this.init()
      },
      init () {
        this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/demandDocking/findByProperties`, {}, {
          params: {
            userid: this.$store.state.userid.id,
            pageNumber: this.currentPage -1,
            pageSize: this.pageSize
          }
        }).then(({ data }) => {
          this.recordList = data.data.result
          this.total = data.data.totle
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>
<style scoped>
  .record_content{
    background: #fff;
    padding: 15px 0;
    margin-bottom: 15px;
  }
  .record_list{
    min-height: 400px;
    position: relative;
  }
  .record_li{
    border-bottom: 1px solid #eee;
    padding: 15px 0;
  }
  .record_li_con{
    padding: 0 15px;
    box-sizing: border-box;
  }
  .record_li_con.select{
    color: blue;
  }
  .record_li_con.select:visited{
    color: red;
  }
  .record_detail{
    margin-top: 60px;
  }
  .record,.record_detail .title{
    font-size: 14px;
  }
  .record_detail .title{
    width: 5em;
    display: inline-block;
  }
  .record_detail .de_list{
    margin: 20px 0;
  }
  .record_detail  span.title{
    margin-right: 40px;
  }
  .record_detail .title:nth-of-type(2) {
    margin-left: 40px;
  }
  .synopsis{
    max-width: calc(100% - 9em);
  }
  .word-break{
    vertical-align: top;
    display: inline-block;
    word-break: break-all;
  }
</style>
