<template>
  <div class="oh finance">
    <div class="container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>推荐标的</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="oh container finance_type">
      <div class="list type_title"><span class="title">所属项目</span> <span style="margin: 0 15px;">所属行业:</span><el-button v-if = '!industryField'>不限</el-button><el-button v-if = 'industryField' @click = 'industryField = ""'>{{ industryField }} <i class="el-icon-close"></i></el-button> <span style="margin: 0 15px;">融资目标:</span><el-button  @click = 'clear'>{{ financingTargetBegin && financingTargetEnd ? `${financingTargetBegin}万-${financingTargetEnd}万`: '不限' }}<i class="el-icon-close" v-if = 'financingTargetBegin && financingTargetEnd'></i></el-button></div>
      <div class="list">
        <span>所属行业</span>
        <div class="inline-block industry_list" :class = "{'active_list': !show}">
          <el-button  class = 'industry_button' v-for = '(item, key) in industryList' :key = 'key' :type="industryField == item ? 'primary': ''" @click = 'industryField = item'>{{item}}</el-button>
        </div>
        <span :class = '["cursor", show ? "el-icon-arrow-up" : "el-icon-arrow-down"]' @click = 'show = !show'></span>
      </div>
      <div class="list">
        <span>融资目标</span> <el-button v-for = '(item, key) in targetList' :key = 'key' :type = 'financingTargetBegin == item.startPrice && financingTargetEnd == item.endPrice ? "primary": ""' @click = 'selectType(item)'>{{item.startPrice}}万-{{item.endPrice}}万</el-button>
      </div>
    </div>
    <div class="oh container finance_content">
      <div class="view">
        <div class="view_subhead">
          <span :class='{active: sortBy === "toExamineTime"}' @click='change("toExamineTime")'>
                  按时间排序
                  <img src="~assets/images/gack/up.png" alt="" v-if = 'sortBy === "toExamineTime" && strategy === "DESC"'>
                  <img src="~assets/images/gack/down.png" alt="" v-if = 'sortBy === "toExamineTime" && strategy === "ASC"'>
                </span>
          <span :class='{active: sortBy === "financingTarget" }' @click='change("financingTarget")'>
                  按融资金额排序
                  <img src="~assets/images/gack/up.png" alt="" v-if = 'sortBy === "financingTarget" && strategy === "DESC"'>
                  <img src="~assets/images/gack/down.png" alt="" v-if = 'sortBy === "financingTarget" && strategy === "ASC"'>
                </span>
          <span class="fr" v-if = 'total'>共有 <span class="text-red">{{ total }}+</span>符合要求的项目信息</span>
          <span class="fr" v-else>没有符合要求的项目信息</span>
        </div>
        <layout v-if='!financeList.length'></layout>
        <div class="view_list" v-for='item in financeList'>
          <box-img class='inline-block logo' :bgImg='item.projectPhoto' prop='3:4'></box-img>
          <div class="inline-block view_content">
            <div class="title">{{ item.name }}
              <div class="fr desc">{{ item.toExamineTime | time }}</div>
            </div>
            <div class="subhead">融资目标 <span class="text-red">{{ item.financingTarget }}万</span></div>
            <div class="view_con">
              <span>融资轮次: {{ item.roundOfFinancing }}</span>
              <span>所属行业： {{ item.industryField }}</span>
              <div class="fr">{{ item.username }}</div>
            </div>
          </div>
          <div class="inline-block text-center view_button">
            <el-button type="primary" @click='$router.push(`/financedesc/${item.id}`)'>查看详情</el-button>
          </div>
        </div>
        <div class="text-right">
          <el-pagination @size-change="handleSizeChange" class='fr pagination' @current-change="handleCurrentChange" :page-size='size' :current-page="page" layout="prev, pager, next" :total="total" v-if='total'>
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'finance',
    data() {
      return {
        industryList: ['教育', '金融', '医疗健康', '旅游', '文化娱乐', '企业服务', '工具软件','本地生活', '社交网络', '体育运动', '农业', '硬件', 'AI', '电商', '交通出行', '能源环保', '公共服务', '其他'],
        targetList: [{
          startPrice: '100',
          endPrice: '300'
        }, {
          startPrice: '300',
          endPrice: '500'
        }, {
          startPrice: '500',
          endPrice: '1000'
        }, {
          startPrice: '1000',
          endPrice: '5000'
        }],
        show: false,
        financeList: [],
        sortBy: 'toExamineTime',
        strategy: 'DESC',
        industryField: '',
        financingTargetBegin: null,
        financingTargetEnd: null,
        page: 1,
        size: 10,
        total: 0,
      }
    },
    created () {
      this.page = 1
      this.init()
    },
    watch: {
      industryField() {
        this.page = 1
        this.init()
      },
      sortBy() {
        this.page = 1
        this.init()
      },
      financingTargetBegin () {
        this.page = 1
        this.init()
      },
      strategy() {
        this.page = 1
        this.init()
      },
      industryField() {
        this.page = 1
        this.init()
      },
      financingTargetBegin() {
        this.page = 1
        this.init()
      },
      financingTargetEnd() {
        this.page = 1
        this.init()
      },
    },
    methods: {
      clear () {
        this.financingTargetBegin= null
        this.financingTargetEnd = null
      },
      selectType (opt) {
        this.financingTargetBegin= opt.startPrice
        this.financingTargetEnd = opt.endPrice
      },
      handleSizeChange(val) {
        //pagesize改变时候触发
        this.size = val;
        this.init();
      },
      handleCurrentChange(val) {
        //当前页改变时候触发
        this.page = val
        //参数1  查询条件 当前页码  当前页显示条数
        this.init()

      },
      init() {
        this.financeList = []
        this.$htAjax.post(`${this.$config.back}/guoanmaker/providepersonalFinanceProject/findPersonalFinanceProjectForPCVisitor`, {}, {
          params: {
            sortBy: this.sortBy,
            strategy: this.strategy,
            industryField: this.industryField,
            financingTargetBegin: this.financingTargetBegin,
            financingTargetEnd: this.financingTargetEnd,
            page: this.page - 1,
            size: this.size
          }
        }).then(({
          data
        }) => {
          this.financeList = data.data.list
          this.total = data.data.total
        }).catch(error => {
          console.log(error)
        })
      },
      change(opt) {
        if(this.sortBy == opt) {
          if(this.strategy == "DESC") {
            this.strategy = "ASC"
          } else {
            this.strategy = "DESC"
          }
        } else {
          this.sortBy = opt
        }
      }
    }
  }
</script>
<style scoped>
  .finance {
    background: #eee;
  }

  .finance .finance_content {
    padding: 15px;
    background: #fff;
    box-sizing: border-box;
    margin-bottom: 20px;
  }

  .finance .finance_type {
    margin-bottom: 15px;
    background: #fff;
  }

  .finance .finance_type .list {
    padding: 15px 50px;
    border-bottom: 1px solid #eee;
  }
  .finance .finance_type .list span{
    margin-right: 15px;
    display: inline-block;
    margin-top: 10px;
  }
  .finance .finance_type .list .industry_list {
    max-width: calc(100% - 8em);
    vertical-align: top;
    overflow: hidden;
  }
  .finance .finance_type .list .industry_list.active_list{
    height: 60px;
  }
  .finance .finance_type .list .industry_list .industry_button{
    margin: 10px;
  }
  .finance .finance_type .type_title {
    padding: 15px;
  }

  .view {
    min-height: 400px;
    position: relative;
  }

  .view_subhead {
    background: #fff;
    font-size: 14px;
    box-sizing: border-box;
    border-bottom: 1px solid #e6f1fe;
  }

  .sub_li .view_subhead {
    margin: 30px 0 20px;
  }

  .view_subhead span {
    margin-right: 15px;
    display: inline-block;
    cursor: pointer;
    height: 56px;
    line-height: 56px;
  }

  .active {
    color: #D7000F;
    border-bottom: 2px solid #D7000F;
  }

  .view_list {
    padding: 15px;
    box-sizing: border-box;
  }

  .view_list .inline-block {
    vertical-align: middle;
  }

  .view_list .logo {
    width: 200px;
  }

  .view_content {
    margin-left: 15px;
    width: calc(100% - 400px);
  }
  .view_con span:nth-of-type(2){
    margin-left: 15px;
  }
  .view_content .desc {
    color: #999;
    font-weight: normal;
    font-size: 14px;
  }

  .view_content .subhead {
    margin: 40px 0;
  }

  .view_list .view_button {
    width: 175px;
  }
</style>
