<template>
  <div class="finance">
    <div class="container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/finance' }">推荐标的</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="oh container finance_content">
      <div class="fl view" v-if='finance'>
        <div class="view_list">
          <box-img class='inline-block logo' :bgImg='finance.projectPhoto' prop='3:4'></box-img>
          <div class="inline-block view_content">
            <div class="title finance_title">{{ finance.name }}
              <el-button class="fr" type="primary" @click = 'concat' v-if = 'finance.name.length <= 16 && $store.state.userid'>联系该项目</el-button>
            </div>
            <div class="oh desc view_subhead">{{ finance.toExamineTime | time }}
              <el-button class="fr" type="primary" @click = 'concat' v-if = 'finance.name.length > 16 && $store.state.userid'>联系该项目</el-button>
            </div>
            <div class="view_subhead view_con_con" v-if = 'finance.summary && finance.summary.length <= 10'>项目概述: <p>{{ finance.summary }}</p></div>
            <div class="oh view_con">
              <div class="fl view_con_list">所属行业: <p>{{ finance.industryField }}</p></div>
              <div class="fr view_con_list" v-if = 'finance.useOfFunds && finance.useOfFunds.length <= 10'>融资用途: <p>{{ finance.useOfFunds }}</p></div>
            </div>
            <!--<div class="view_con" v-if = 'finance.useOfFunds && finance.useOfFunds.length > 10'>-->
              <!--<div class = 'view_con_con'>融资用途:<p>{{ finance.useOfFunds }}</p></div>-->
            <!--</div>-->
          </div>
        </div>
        <div class="list" v-if='$store.state.userid'>
          <div class="list_content">
            <span>出让股权: {{ finance.sellShares }}%</span>
            <span>融资目标: {{finance.financingTarget}}万</span>
          </div>
          <div class="list_content">
            <span>所处阶段: {{finance.stage}}</span>
            <span>退出方式: {{finance.investmentExitMode}}</span>
          </div>
        </div>
        <div class="list_desc" v-if = 'finance.summary && finance.summary.length > 10'>
          <card-title style='border:none;'>项目概述</card-title>
          <div class="list_detail">
            {{ finance.summary }}
          </div>
        </div>
        <div class="list_desc" v-if = 'finance.useOfFunds && finance.useOfFunds.length > 10'>
          <card-title style='border:none;'>融资用途</card-title>
          <div class="list_detail">
            {{ finance.useOfFunds }}
          </div>
        </div>
        <div class="list_desc" v-if='$store.state.userid'>
          <card-title style='border:none;'>项目详情</card-title>
          <div class="list_detail" v-html='finance.concreteSummary'>
          </div>
        </div>
        <div class="list_desc" v-if='$store.state.userid'>
          <card-title style='border:none;'>项目优势</card-title>
          <div class="list_detail" v-html='finance.competitiveAdvantageInTheField'>
          </div>
        </div>
        <div class="list_desc" v-if='$store.state.userid'>
          <card-title style='border:none;'>其他信息</card-title>
          <el-row class='list_table'>
            <el-col :span=" 8" class='text-center cursor' :class= '{"active_header": activeType == "personalFinanceProjectPartnerList"}' @click.native='changeActive("personalFinanceProjectPartnerList")'>团队情况</el-col>
            <el-col :span=" 8" class='text-center col cursor' :class= '{"active_header": activeType == "project"}' @click.native='changeActive("project")'>项目情况</el-col>
            <el-col :span=" 8" class='text-center cursor' :class= '{"active_header": activeType == "data"}' @click.native='changeActive("data")'>数据情况</el-col>
          </el-row>
          <div class="table_content" v-if='activeType == "personalFinanceProjectPartnerList"'>
            <tab-header :tabArr='messageType' @changeType='changeTab' ref = 'messageTab' :defaultValue='defaultValue'></tab-header>
            <div v-if="status == 0">
              <el-form label-width="130px" class="demo-ruleForm" labelPosition="left">
                <el-form-item label="创始人姓名：">
                  <span>{{partner.name}}</span>
                </el-form-item>
                <el-form-item label="创始人照片：">
                  <box-img class='inline-block' style='width:130px' :bgImg='partner.photo'></box-img>
                </el-form-item>
                <el-form-item label="创始人学历：">
                  <span style="margin-right:100px">{{partner.education}}</span>
                  时间：
                  <span style="margin:0 10px">{{partner.educationStartTime | time}}</span>
                  —
                  <span style="margin-left:10px">{{partner.educationEndTime | time}}</span>
                </el-form-item>
                <el-form-item label="毕业院校：">
                  <span>{{partner.educationGraduateInstitutions}}</span>
                </el-form-item>
                <div class="teamHr"></div>
                <el-form-item label="从业时间：">
                  <span>{{partner.employmentTime | time}}</span>
                  </el-date-picker>
                </el-form-item>
                <div class="teamHr"></div>
                <el-form-item label="创业前最高职位：">
                  <span style="margin-right:100px">{{partner.topJobBeforeStartingBusiness}}</span>
                  时间：
                  <span style="margin:0 10px">{{partner.topJobBeforeStartingBusinessStartTime | time}}</span>
                  —
                  <span style="margin-left:10px">{{partner.topJobBeforeStartingBusinessEndTime | time}}</span>
                </el-form-item>
                <el-form-item label="所属公司：">
                  <span style="margin-left:10px">{{partner.preVentureCompany}}</span>
                </el-form-item>
                <div class="teamHr"></div>
                <div v-for="(item,index) in partner.personalFpentrepreneurialExperienceList" :key="index">
                  <el-form-item label="创业：">
                    <span style="margin-right:20px">{{item.project}}</span>
                    <span>{{item.corporateName}}</span>
                  </el-form-item>
                  <el-form-item label="时间：">
                    <span>{{item.projectStrartTime | time}}</span>
                    —
                    <span>{{item.projectEndTime | time}}</span>
                  </el-form-item>
                </div>
                <div class="teamHr"></div>
                <el-form-item label="员工期权池">
                  <span>{{partner.employeeOptionPool | state}}</span>
                </el-form-item>
              </el-form>
            </div>
            <div v-if="status > 0">
              <div v-for="(item,index) in hehuo">
                <div v-if="status -1 == index">
                  <el-form :model="item" label-width="130px" class="demo-ruleForm" labelPosition="left">
                    <el-form-item label="合伙人姓名：">
                      <span>{{item.name}}</span>
                    </el-form-item>
                    <el-form-item label="创始人照片：">
                      <box-img class='inline-block' style='width:130px' :bgImg='item.photo'></box-img>
                    </el-form-item>
                    <el-form-item label="创始人学历：">
                      <span style="margin-right:100px">{{item.education}}</span>
                      时间：
                      <span style="margin:0 10px">{{item.educationStartTime | time}}</span>
                      —
                      <span style="margin-left:10px">{{item.educationEndTime | time}}</span>
                    </el-form-item>
                    <el-form-item label="毕业院校：">
                      <span>{{item.educationGraduateInstitutions}}</span>
                    </el-form-item>
                    <div class="teamHr"></div>
                    <el-form-item label="从业时间：">
                      <span>{{item.employmentTime | time}}</span>
                      </el-date-picker>
                    </el-form-item>
                    <div class="teamHr"></div>
                    <el-form-item label="创业前最高职位：">
                      <span style="margin-right:100px">{{item.topJobBeforeStartingBusiness}}</span>
                      时间：
                      <span style="margin:0 10px">{{item.topJobBeforeStartingBusinessStartTime | time}}</span>
                      —
                      <span style="margin-left:10px">{{item.topJobBeforeStartingBusinessEndTime | time}}</span>
                    </el-form-item>
                    <el-form-item label="所属公司：">
                      <span style="margin-left:10px">{{item.preVentureCompany}}</span>
                    </el-form-item>
                    <div class="teamHr"></div>
                    <div v-for="(it,index) in item.personalFpentrepreneurialExperienceList" :key="index">
                      <el-form-item label="创业：">
                        <span style="margin-right:20px">{{it.project}}</span>
                        <span>{{it.corporateName}}</span>
                      </el-form-item>
                      <el-form-item label="时间：">
                        <span>{{it.projectStrartTime | time}}</span>
                        —
                        <span>{{it.projectEndTime | time}}</span>
                      </el-form-item>
                    </div>
                  </el-form>
                </div>
              </div>
            </div>
          </div>
          <div class="table_content" v-if='activeType == "project"'>
            <el-form label-width="130px" class="demo-ruleForm" labelPosition="left">
              <el-form-item label="上一轮估值：">
                <span style="margin-right:20px">{{finance.lastRoundOfValuations}}</span>万元
              </el-form-item>
              <div class="teamHr"></div>
              <div v-for="(item,index) in finance.personalFppatentTechnologyList" :key="index">
                <el-form-item label="专利技术：">
                  <span style="margin-right:50px">{{item.patentTechnologyPatentYear}}年</span>
                  <span>{{item.patentName}}</span>
                </el-form-item>
              </div>
              <div class="teamHr"></div>
              <div v-for="(item,index) in finance.personalFinancingExperienceList">
                <el-form-item label="过往融资经历：">
                  <span style="margin-right:50px">{{item.financingYear}}</span>
                  <span>{{item.financingAmount}} 万元</span>
                  <span style="margin-left:50px">{{item.investorName}}</span>
                </el-form-item>
                <el-form-item label="融资轮次：">
                  <span>{{item.roundFinancing}}</span>
                </el-form-item>
              </div>
              <div class="teamHr"></div>
              <div v-for="(item,index) in finance.personalBusinessEventAwardsList">
                <el-form-item label="创业赛事奖项：">
                  <span style="margin-right:50px">{{item.eventYear}}年</span>
                  <span>{{item.eventAwards}}</span>
                </el-form-item>
              </div>
            </el-form>
          </div>
          <div class="table_content table_content_inblock2" v-if='activeType == "data"'>
            <h2>企业数据</h2>
            <el-form label-width="180px" class="demo-ruleForm" labelPosition="left">
              <div class="table_content_inblock">
              <el-form-item label="上年度营业收入：">
                <span style="margin-right: 10px">{{finance.nperatingIncomeOfTheLastYear}}</span>万元
              </el-form-item>
              <el-form-item label="上年净利润：">
                <span style="margin-right: 10px">{{finance.netProfitForThePreviousYear}}</span>万元
              </el-form-item><br/>
              <el-form-item label="上月月营业收入：">
                <span style="margin-right: 10px">{{finance.businessIncomeOfLastMonthAndMonth}}</span>万元
              </el-form-item>
              <el-form-item label="月净利润：">
                <span style="margin-right: 10px">{{finance.monthlyNetProfit}}</span>万元
              </el-form-item><br/>
              <el-form-item label="近三月营业收入增长率：">
                <span style="margin-right: 10px">{{finance.growthRateOfBusinessIncomeLastMarch}}</span>%
              </el-form-item>
              <el-form-item label="近三月净利润增长率：" class="marLeft20">
                <span style="margin-right: 10px">{{finance.netProfitGrowthRateInRecentMarch}}</span>%
              </el-form-item><br/>
              <el-form-item label="毛利率：">
                <span style="margin-right: 10px">{{finance.grossProfitRate}}</span>%
              </el-form-item><br/>
              <el-form-item label="净利率：">
                <span style="margin-right: 10px">{{finance.netInterestRate}}</span>%
              </el-form-item>
              </div>
              <h2>业务数据</h2>
              <el-form-item label="注册用户量：">
                <span>{{finance.registeredUsers}}</span>
              </el-form-item>
              <el-form-item label="是否开始盈利：">
                <span>{{finance.whetherToStartProfit | state}}</span>
              </el-form-item>
              <el-form-item label="日浏览量：">
                <span>{{finance.dailyBrowsing}}</span>
              </el-form-item><br/>
              <el-form-item label="产品是否上线：">
                <span>{{finance.whetherTheProductIsOnlineOrNot | state}}</span>
              </el-form-item>
              <el-form-item label="服务企业数量：">
                <span>{{finance.numberSserviceEnterprises}}</span>
              </el-form-item>
              <el-form-item label="获客成本：">
                <span style="margin-right: 10px">{{finance.customerCost}}</span>元
              </el-form-item><br/>
              <el-form-item label="日活：">
                <span style="margin-right: 10px">{{finance.dailyLiving}}</span>个
              </el-form-item>
              <el-form-item label="复购率：">
                <span style="margin-right: 10px">{{finance.repurchaseRate}}</span>%
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="fr view_info">
        <card-title>项目方名片</card-title>
        <div class="text-center view_no_info" v-if='!$store.state.userid'>
          <el-button @click="$router.push('/login/0')">查看具体信息</el-button>
        </div>
        <div class="view_message" v-if='partner'>
          <div class="text-center">
            <box-img class="photo" :bgImg='partner.photo'></box-img>
          </div>
          <div class="text-center">
            {{ partner.name }}
          </div>
          <p>职位: {{ partner.topJobBeforeStartingBusiness }}</p>
          <p>所属行业: {{ finance.industryField }}</p>
          <p>融资目标: {{ finance.financingTarget }}万</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tabHeader from 'components/tabHeader'
export default {
  name: 'finance_desc',
  data() {
    return {
      activeType: "personalFinanceProjectPartnerList",
      finance: null,
      partner: null,
      hehuo: [],
      messageType: [{
        title: '创始人',
        type: '0'
      }, {
        title: '合伙人1',
        type: '1'
      }],
      defaultValue: '0',
      status: '0',
    }
  },
  created () {
    this.finance = null
    this.partner = null
    this.$htAjax.post(`${this.$config.back}/guoanmaker/providepersonalFinanceProject/findPersonalFinanceProjectDetailsOnPC`, {}, {
      params: {
        projectId: this.$route.params.id,
        personalUserId: this.$store.state.userid ? this.$store.state.userid.id : null
      }
    }).then(({ data }) => {
      if (!this.$store.state.userid) {
        this.finance = data.data
      } else {
        this.finance = data.data.project
        this.partner = data.data.partner
        if (this.finance.personalFinanceProjectPartnerList.length > 1) {
          this.messageType = [{
            title: '创始人',
            type: '0'
          }]
          this.finance.personalFinanceProjectPartnerList.map((item, index) => {
            if (item.flag == 1) {
              this.messageType.push({
                title: `合伙人${index}`,
                type: `${index}`
              })
              this.hehuo.push(item)
            }
          })
        }
      }
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    concat () {
      this.$alert('400-8518585', '请拨打电话', {
        confirmButtonText: '确定',
        type: 'info'
      }).then().catch()
    },
    changeTab(opt) {
      this.status = opt
    },
    changeActive (opt) {
      if (this.$refs.messageTab) {
        this.$refs.messageTab.$emit('changeTab', '0')
        this.changeTab('0')
      }
      this.activeType = opt
    }
  },
  components: {
    tabHeader
  },
  filters: {
    state(val) {
      if (val == 1) {
        return '是'
      } else {
        return '否'
      }
    }
  }
}
</script>
<style scoped>
.finance {
  background: #eee;
}

.finance .teamHr {
  height: 1px;
  width: 90%;
  margin: 20px auto;
  border-top: 1px dashed #e8e8e8;
}

.view {
  min-height: 400px;
  background: #fff;
  width: calc(100% - 415px);
}

.view_info {
  width: 400px;
  min-height: 237px;
  background: #fff;
  padding: 0 20px 20px 20px;
  box-sizing: border-box;
}
.view_info .view_no_info {
  margin: 64px 0;
}
.view_info .view_message .photo {
  width: 100px;
  display: inline-block;
  margin-top: 20px;
  border-radius: 50%;
}

.view_info .view_message p {
  margin: 20px 0;
  color: #666;
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
  width: calc(100% - 245px);
}
.view_content .finance_title{
  margin-bottom: 15px;
}
.view_con .view_con_list{
  width: 50%;
  padding-right: 1em;
  box-sizing: border-box;
}
.view_con_con p,.view_con .view_con_list p{
  display: inline-block;
  vertical-align: top;
  width: calc(100% - 6em);
  margin-left: 1em;
}
.view .list {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 15px;
}

.view .list_desc {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 0 15px;
}

.view .list_desc .list_detail {
  padding: 15px;
}

.table_info .logo {
  width: 100px;
  vertical-align: top;
}

.list_table {
  border: 1px solid #eee;
  line-height: 3em;
}
.list_table .active_header{
  color: #ff0000;
}
.list_table .col {
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}

.table_content {
  border: 1px solid #eee;
  border-top: 0;
  padding: 15px;
  box-sizing: border-box;
  margin-bottom: 15px;
}

.table_content h2 {
  font-size: 18px;
  font-weight: bold;
  color: #ccc;
  margin-bottom: 20px;
}

.view .list .list_content:first-child {
  margin-bottom: 15px;
}

.view .list .list_content span:nth-child(2) {
  margin-left: 40px;
}

.view_content .desc {
  color: #999;
  font-weight: normal;
  font-size: 14px;
}

.view_content .view_subhead {
  margin: 15px 0;
}

.view_list .view_button {
  width: 175px;
}
</style>
<style>
.finance .table_content_inblock2 .el-form-item {
  display: inline-block;
  margin: 0 15px;
}
.finance .table_content .table_content_inblock .el-form-item{
  width: 40%;
}
</style>

