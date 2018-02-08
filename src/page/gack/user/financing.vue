<template>
	<div class="financing" v-loading="loadingTab">
		<div class="title">
			<span class="tip inline-block"></span>融资信息
		</div>
		<div class="submit">
			<el-button type="primary" @click="emit" :loading="loading">保存</el-button>
		</div>
		<tab-header :tabArr='messageType' @changeType='changeTab' :defaultValue='defaultValue'></tab-header>
		<el-card>
			<!--基本信息-->
			<div v-if="status == '0'">
				<el-form :model="basic" label-width="100px" class="demo-ruleForm">
					<el-form-item label="融资目标">
						<el-input v-model="basic.financingTarget" :maxlength="10" @change="financingTargetChange" style="width:220px;margin-right:10px" placeholder="具体融资金额"></el-input>
						万元
					</el-form-item><br/>
					<el-form-item label="出让股份">
						<el-input v-model="basic.sellShares" :maxlength="10" style="width:220px;margin-right:10px"></el-input>
						%
					</el-form-item><br/>
					<el-form-item label="融资估值">
						<el-input v-model="basic.financingValuation" :maxlength="10" @change="financingValuationChange" style="width:500px;margin-right: 20px"></el-input>万元
					</el-form-item><br/>
					<el-form-item label="融资轮次">
						<el-select v-model="basic.roundOfFinancing" placeholder="请选择">
							<el-option v-for="item in roundOfFinancingList" :key="item" :label="item" :value="item">
							</el-option>
						</el-select>
					</el-form-item><br/>
					<el-form-item label="资金用途">
						<el-input v-model="basic.useOfFunds" :maxlength="300" placeholder="共可输入300字" type="textarea" :autosize="{ minRows: 2, maxRows: 6}" style="width:500px"></el-input>
					</el-form-item><br/>
					<el-form-item label="投资退出方式">
						<el-select v-model="basic.investmentExitMode" placeholder="请选择">
							<el-option v-for="item in investmentExitModeList" :key="item" :label="item" :value="item">
							</el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
			<!--行业信息-->
			<div v-if="status == 1">
				<el-form :model="industry" label-width="100px" class="demo-ruleForm">
					<el-form-item label="行业领域">
						<el-select v-model="industry.industryField" placeholder="请选择">
							<el-option v-for="item in industryFieldList" :key="item" :label="item" :value="item">
							</el-option>
						</el-select>
					</el-form-item><br/>
					<el-form-item label="领域竞争优势">
						<el-input v-model="industry.competitiveAdvantageInTheField" placeholder="共可输入300字" :maxlength="300" type="textarea" :autosize="{ minRows: 2, maxRows: 6}" style="width:500px"></el-input>
					</el-form-item><br/>
					<el-form-item label="行业排名">
						<el-input v-model="industry.industryRankings" :maxlength="10" @change="industryRankingsChange" style="width:220px;margin-right:10px"></el-input>
						位
					</el-form-item><br/>
					<el-form-item label="市场占有率">
						<el-input v-model="industry.marketShare" :maxlength="10" @change="marketShareChange" style="width:220px;margin-right:10px"></el-input>
						%
					</el-form-item><br/>
				</el-form>
			</div>
			<!--团队信息-->
			<div v-if="status == 2">
				<tab-header :tabArr='teamMessageType' ref="tabRef" @changeType='teamTab' :defaultValue='team.teamDefaultValue'></tab-header>
				<!--创始人-->
				<div v-if="team.teamStatus == '0'">
					<el-form :model="team.founder" label-width="130px" class="demo-ruleForm">
						<el-form-item label="创始人姓名">
							<el-input v-model="team.founder.name" :maxlength="10" style="width:220px"></el-input>
						</el-form-item><br/>
						<el-form-item label="创始人照片">
							<el-upload class="avatar-uploader" name="photo" :action="`${$config.back}/guoanmaker/providepersonalFinanceProject/uploadPersonalFinanceProjectPartnerPhoto`" :show-file-list="false" :on-success="founderHandleAvatarSuccess" :before-upload="beforeAvatarUpload">
								<img v-if="team.founder.photo" :src="team.founder.photo" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item><br/>
						<el-form-item label="创始人学历">
							<el-input v-model="team.founder.education" :maxlength="30" style="width:220px;margin-right:50px"></el-input>
							时间
							<el-date-picker style="margin-left:10px" @change="timeChange" v-model="team.founder.educationStartTime" type="date" placeholder="选择日期">
							</el-date-picker>
							—
							<el-date-picker v-model="team.founder.educationEndTime" @change="timeChange" type="date" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
						<el-form-item label="毕业院校">
							<el-input v-model="team.founder.educationGraduateInstitutions" :maxlength="30" style="width:500px"></el-input>
						</el-form-item>
						<div class="teamHr"></div>
						<el-form-item label="从业时间">
							<el-date-picker v-model="team.founder.employmentTime" type="date" placeholder="选择日期">
							</el-date-picker>
						</el-form-item>
						<div class="teamHr"></div>
						<el-form-item label="创业前最高职位">
							<el-input v-model="team.founder.topJobBeforeStartingBusiness" :maxlength="30" style="width:220px;margin-right:50px"></el-input>
							时间
							<el-date-picker style="margin-left:10px" @change="timeChange2_1" v-model="team.founder.topJobBeforeStartingBusinessStartTime" type="date" placeholder="选择日期">
							</el-date-picker>
							—
							<el-date-picker v-model="team.founder.topJobBeforeStartingBusinessEndTime" @change="timeChange2_1" type="date" placeholder="选择日期">
							</el-date-picker>
						</el-form-item><br/>
						<el-form-item label="所属公司">
							<el-input v-model="team.founder.preVentureCompany" :maxlength="30" style="width:500px"></el-input>
						</el-form-item>
						<div class="teamHr"></div>
						<el-form-item label="是否连续创业">
							<el-select @change="founderFlag(flag4)" v-model="flag4" style="width:150px" placeholder="请选择">
								<el-option v-for="item in isFou" :key="item.value" :label="item.key" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<div v-if="flag4 == 1">
							<div v-for="(item,index) in team.founder.personalFpentrepreneurialExperienceList" :key="index" style="position: relative">
								<el-input v-model="item.project" :maxlength="30" placeholder="所属项目" style="width:200px;margin:0 20px 0 130px"></el-input>
								<el-form-item class="marLeft0">
									<el-input v-model="item.corporateName" :maxlength="30" placeholder="公司名称" style="width:200px"></el-input>
								</el-form-item>
								<div style="position: absolute;right: 10%;top:0">
									<el-button type="text" @click="teamAdd(index)" v-if="index == 0">添加创业经历</el-button>
									<el-button type="text" @click="teamDel(index)" v-if="index > 0">删除</el-button>
								</div>
								<el-form-item>
									<el-date-picker v-model="item.projectStrartTime" @change="timeChange3_1(index)" type="date" placeholder="选择日期">
									</el-date-picker>
									—
									<el-date-picker v-model="item.projectEndTime" @change="timeChange3_1(index)" type="date" placeholder="选择日期">
									</el-date-picker>
								</el-form-item>
							</div>
						</div>

						<div class="teamHr"></div>
						<el-form-item label="员工期权池">
							<el-select v-model="team.founder.employeeOptionPool" placeholder="请选择">
								<el-option v-for="item in isFou" :key="item.value" :label="item.key" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
				</div>
				<!--合伙页-->
				<div v-if="team.teamStatus > 0">
					<div v-for="(item,index) in team.partner">
						<div v-if="team.teamStatus -1 == index" style="position: relative">
							<div v-if="index > 0" style="position: absolute;right: 10%;top:0">
								<el-button type="primary" @click="partnerDel(index)">删除</el-button>
							</div>
							<el-form :model="item" label-width="130px" class="demo-ruleForm">
								<el-form-item label="合伙人姓名">
									<el-input v-model="item.name" :maxlength="10" style="width:220px"></el-input>
								</el-form-item><br/>
								<el-form-item label="合伙人照片">
									<div @click="upClick(index)">
										<el-upload class="avatar-uploader" name="photo" :action="`${$config.back}/guoanmaker/providepersonalFinanceProject/uploadPersonalFinanceProjectPartnerPhoto`" :show-file-list="false" :on-success="partnerHandleAvatarSuccess" :before-upload="beforeAvatarUpload">
											<img v-if="item.photo" :src="item.photo" class="avatar">
											<i v-else class="el-icon-plus avatar-uploader-icon"></i>
										</el-upload>
									</div>

								</el-form-item><br/>
								<el-form-item label="合伙人学历">
									<el-input v-model="item.education" :maxlength="30" style="width:220px;margin-right:50px"></el-input>
									时间
									<el-date-picker style="margin-left:10px" @change="timeChange1(index)" v-model="item.educationStartTime" type="date" placeholder="选择日期">
									</el-date-picker>
									—
									<el-date-picker v-model="item.educationEndTime" @change="timeChange1(index)" type="date" placeholder="选择日期">
									</el-date-picker>
								</el-form-item>
								<el-form-item label="毕业院校">
									<el-input v-model="item.educationGraduateInstitutions" :maxlength="30" style="width:500px"></el-input>
								</el-form-item>
								<div class="teamHr"></div>
								<el-form-item label="从业时间">
									<el-date-picker v-model="item.employmentTime" type="date" placeholder="选择日期">
									</el-date-picker>
								</el-form-item>
								<div class="teamHr"></div>
								<el-form-item label="创业前最高职位">
									<el-input v-model="item.topJobBeforeStartingBusiness" :maxlength="30" style="width:220px;margin-right:50px"></el-input>
									时间
									<el-date-picker style="margin-left:10px" @change="timeChange2(index)" v-model="item.topJobBeforeStartingBusinessStartTime" type="date" placeholder="选择日期">
									</el-date-picker>
									—
									<el-date-picker v-model="item.topJobBeforeStartingBusinessEndTime" @change="timeChange2(index)" type="date" placeholder="选择日期">
									</el-date-picker>
								</el-form-item><br/>
								<el-form-item label="所属公司">
									<el-input v-model="item.preVentureCompany" :maxlength="30" style="width:500px"></el-input>
								</el-form-item>
								<div class="teamHr"></div>
								<el-form-item label="是否连续创业">
									<el-select @change="partnerFlag(item.isShow,index)" v-model="item.isShow"
									 style="width:150px" placeholder="请选择">
										<el-option v-for="item in isFou" :key="item.value" :label="item.key" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
								<div v-if="item.isShow == 1">
									<div v-for="(it,i) in item.personalFpentrepreneurialExperienceList" :key="i" style="position: relative">
										<el-input v-model="it.project" :maxlength="30" placeholder="所属项目" style="width:200px;margin:0 20px 0 130px"></el-input>
										<el-form-item class="marLeft0">
											<el-input v-model="it.corporateName" :maxlength="30" placeholder="公司名称" style="width:200px"></el-input>
										</el-form-item>
										<div style="position: absolute;right: 10%;top:0">
											<el-button type="text" @click="teamAdd1(index,i)" v-if="i == 0">添加创业经历</el-button>
											<el-button type="text" @click="teamDel1(index,i)" v-if="i > 0">删除</el-button>
										</div>
										<el-form-item>
											<el-date-picker v-model="it.projectStrartTime" @change="timeChange3(index,i)" type="date" placeholder="选择日期">
											</el-date-picker>
											—
											<el-date-picker v-model="it.projectEndTime" @change="timeChange3(index,i)" type="date" placeholder="选择日期">
											</el-date-picker>
										</el-form-item>
									</div>
								</div>

								<div class="teamHr"></div>
							</el-form>
							<div align="center">
								<el-button @click="partnerAdd(index)">添加合伙人</el-button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--项目信息-->
			<div v-if="status == 3">
				<el-form :model="project" label-width="130px" class="demo-ruleForm">
					<el-form-item label="上一轮估值">
						<el-input v-model="project.lastRoundOfValuations" :maxlength="10" @change="lastRoundOfValuationsChange" style="width:500px;margin-right:20px"></el-input>万元
					</el-form-item>
					<div class="teamHr"></div>
					<el-form-item label="是否有专利技术">
						<el-select @change="flag1(project.flag1)" v-model="project.flag1" style="width:150px" placeholder="请选择">
							<el-option v-for="item in isFou" :key="item.value" :label="item.key" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<div v-if="project.flag1 == 1">
						<div v-for="(item,index) in project.personalFppatentTechnologyList" :key="index" style="position: relative">
							<el-form-item class="marLeft0">
								<el-date-picker v-model="item.patentTechnologyPatentYear" style="width:150px;margin-left:130px" type="year" placeholder="年份">
								</el-date-picker>
								<el-input v-model="item.patentName" :maxlength="30" placeholder="获得过哪些专利技术" style="width:450px;margin-left:20px"></el-input>
							</el-form-item>
							<div style="position: absolute;right: 10%;top:0">
								<el-button type="text" @click="patentAdd(index)" v-if="index == 0">添加</el-button>
								<el-button type="text" @click="patentDel(index)" v-if="index > 0">删除</el-button>
							</div>
						</div>
					</div>

					<div class="teamHr"></div>
					<el-form-item label="过往融资经历">
						<el-select @change="flag2(project.flag2)" v-model="project.flag2" style="width:150px" placeholder="请选择">
							<el-option v-for="item in isFou" :key="item.value" :label="item.key" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<div v-if="project.flag2 == 1">
						<div v-for="(item,index) in project.personalFinancingExperienceList" style="position: relative">
							<el-form-item class="marLeft0">
								<el-date-picker v-model="item.financingYear" style="width:150px;margin-left:130px" type="year" placeholder="年份">
								</el-date-picker>
								<el-input v-model="item.financingAmount" :maxlength="10" @change="financingAmountChange(index)" placeholder="金融数量" style="width:150px;margin:0 20px"></el-input>万元
							</el-form-item>
							<el-form-item class="marLeft0">
								<el-input v-model="item.investorName" :maxlength="10" placeholder="投资人名称" style="width:150px;margin-left:20px"></el-input>
							</el-form-item><br/>
							<el-form-item>
								<el-input v-model="item.roundFinancing" :maxlength="10" placeholder="融资轮次" style="width:540px;margin-top:20px"></el-input>
							</el-form-item>
							<div style="position: absolute;right: 10%;top:0">
								<el-button type="text" @click="oidFinancingAdd(index)" v-if="index == 0">添加</el-button>
								<el-button type="text" @click="oidFinancingDel(index)" v-if="index > 0">删除</el-button>
							</div>
						</div>
					</div>
					<div class="teamHr"></div>
					<el-form-item label="创业赛事奖项">
						<el-select @change="flag3(project.flag3)" v-model="project.flag3" style="width:150px" placeholder="请选择">
							<el-option v-for="item in isFou" :key="item.value" :label="item.key" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<div v-if="project.flag3 == 1">
						<div v-for="(item,index) in project.personalBusinessEventAwardsList" style="position: relative">
							<el-form-item class="marLeft0">
								<el-date-picker v-model="item.eventYear" style="width:150px;margin-left:130px;" type="year" placeholder="年份">
								</el-date-picker>
								<el-input v-model="item.eventAwards" :maxlength="30" placeholder="获得过哪些创业赛事奖项" style="width:450px;margin-left:20px"></el-input>
							</el-form-item>
							<div style="position: absolute;right: 10%;top:0">
								<el-button type="text" @click="entrepreneurshipAwardAdd(index)" v-if="index == 0">添加</el-button>
								<el-button type="text" @click="entrepreneurshipAwardDel(index)" v-if="index > 0">删除</el-button>
							</div>
						</div>
					</div>
				</el-form>
			</div>
			<!--财务信息-->
			<div v-if="status == 4" class="last_box">
				<h2>企业数据</h2>
				<el-form :model="financeData" label-width="160px" class="demo-ruleForm">
					<el-form-item label="上年度营业收入">
						<el-input v-model="financeData.nperatingIncomeOfTheLastYear" :maxlength="10" @change="nperatingIncomeOfTheLastYearChange" style="width:200px;margin-right: 20px"></el-input>万元
					</el-form-item>
					<el-form-item label="上年净利润">
						<el-input v-model="financeData.netProfitForThePreviousYear" :maxlength="10" @change="netProfitForThePreviousYearChange" style="width:200px;margin-right: 20px"></el-input>万元
					</el-form-item><br/>
					<el-form-item label="上月月营业收入">
						<el-input v-model="financeData.businessIncomeOfLastMonthAndMonth" :maxlength="10" @change="businessIncomeOfLastMonthAndMonthChange" style="width:200px;margin-right: 20px"></el-input>万元
					</el-form-item>
					<el-form-item label="月净利润">
						<el-input v-model="financeData.monthlyNetProfit" :maxlength="10" @change="monthlyNetProfitChange" style="width:200px;margin-right: 20px"></el-input>万元
					</el-form-item><br/>
					<el-form-item label="近三月营业收入增长率">
						<el-input v-model="financeData.growthRateOfBusinessIncomeLastMarch" :maxlength="10" @change="growthRateOfBusinessIncomeLastMarchChange" style="width:200px;margin-right: 20px"></el-input>%
					</el-form-item>
					<el-form-item label="近三月净利润增长率" class="marLeft20">
						<el-input v-model="financeData.netProfitGrowthRateInRecentMarch" :maxlength="10" @change="netProfitGrowthRateInRecentMarchChange" style="width:200px;margin-right: 20px"></el-input>%
					</el-form-item><br/>
					<el-form-item label="毛利率">
						<el-input v-model="financeData.grossProfitRate" :maxlength="10" @change="grossProfitRateChange" style="width:200px;margin-right: 20px"></el-input>%
					</el-form-item><br/>
					<el-form-item label="净利率">
						<el-input v-model="financeData.netInterestRate" :maxlength="10" @change="netInterestRateChange" style="width:200px;margin-right: 20px"></el-input>%
					</el-form-item><br/>
					<h2>业务数据</h2>
					<el-form-item label="注册用户量">
						<el-input v-model="financeData.registeredUsers" :maxlength="10" @change="registeredUsersChange" style="width:150px"></el-input>
					</el-form-item>
					<el-form-item label="是否开始盈利">
						<el-select v-model="financeData.whetherToStartProfit" style="width:150px" placeholder="请选择">
							<el-option v-for="item in isFou" :key="item.value" :label="item.key" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="日浏览量">
						<el-input v-model="financeData.dailyBrowsing" :maxlength="10" @change="dailyBrowsingChange" style="width:150px"></el-input>
					</el-form-item><br/>
					<el-form-item label="产品是否上线">
						<el-select v-model="financeData.whetherTheProductIsOnlineOrNot" style="width:150px" placeholder="请选择">
							<el-option v-for="item in isFou" :key="item.value" :label="item.key" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="服务企业数量">
						<el-input v-model="financeData.numberSserviceEnterprises" :maxlength="10" @change="numberSserviceEnterprisesChange" style="width:150px"></el-input>
					</el-form-item>
					<el-form-item label="获客成本">
						<el-input v-model="financeData.customerCost" :maxlength="10" @change="customerCostChange" style="width:120px;margin-right: 20px"></el-input>元
					</el-form-item><br/>
					<el-form-item label="日活">
						<el-input v-model="financeData.dailyLiving" :maxlength="10" @change="dailyLivingChange" style="width:120px;margin-right: 20px"></el-input>个
					</el-form-item>
					<el-form-item label="复购率">
						<el-input v-model="financeData.repurchaseRate" :maxlength="10" @change="repurchaseRateChange" style="width:120px;margin-right: 20px"></el-input>%
					</el-form-item>
				</el-form>
			</div>
		</el-card>
	</div>
</template>
<script>
import tabHeader from 'components/tabHeader'
export default {
	name: 'financing',
	data() {
		return {
			loadingTab: false,
			messageType: [{
				title: '基本信息',
				type: '0'
			}, {
				title: '行业信息',
				type: '1'
			}, {
				title: '团队信息',
				type: '2'
			}, {
				title: '项目信息',
				type: '3'
			}, {
				title: '财务信息',
				type: '4'
			}],
			defaultValue: '0',
			status: '0',
			roundOfFinancingList: ['天使轮', 'Pre-A', 'A轮', 'B轮'],
			investmentExitModeList: ['新三板退出', '股权转让', '并购', 'IPO', '管理层收购'],
			//基本信息
			basic: {
				financingTarget: '',//项目融资目标
				sellShares: '',//出让股份
				financingValuation: '',//融资估值
				roundOfFinancing: '',//融资轮次
				useOfFunds: '',//资金用途
				investmentExitMode: '',//投资退出方式
			},
			industryFieldList: ['教育', '金融', '医疗健康', '旅游', '文化娱乐', '企业服务', '工具软件',
				'本地生活', '社交网络', '体育运动', '农业', '硬件', 'AI', '电商', '交通出行', '能源环保', '公共服务', '其他'],
			//行业信息
			industry: {
				industryField: '',//行业领域
				competitiveAdvantageInTheField: '',//领域竞争优势
				industryRankings: '',//行业排名
				marketShare: '',//市场占有率
			},
			teamMessageType: [{
				title: '创始人信息页',
				type: '0'
			}, {
				title: '合伙人1信息页',
				type: '1'
			}],
			//团队信息
			flag4: 0,
			team: {
				//创始人
				founder: {
					name: '',//合伙人姓名
					photo: '',//合伙人照片
					education: '',//合伙人学历
					educationStartTime: '',//合伙人学历开始时间
					educationEndTime: '',//合伙人学历结束时间
					educationGraduateInstitutions: '',//合伙人毕业院校
					employmentTime: '',//从业时间
					topJobBeforeStartingBusiness: '',//创业前最高职位
					topJobBeforeStartingBusinessStartTime: '',//创业前最高职位起始时间
					topJobBeforeStartingBusinessEndTime: '',//创业前最高职位结束时间
					preVentureCompany: '',//创业前所属公司
					employeeOptionPool: '',//员工期权池(0:否  1:是)
					personalFpentrepreneurialExperienceList: [{
						project: '',//项目名称
						corporateName: '',//所属公司
						projectStrartTime: '',//项目开始时间
						projectEndTime: ''//项目结束时间
					}],
					flag: '0',//表示创始人或合伙人字段(0:创始人, 1:合伙人)
				},
				partner: [{
					name: '',//合伙人姓名
					photo: '',//合伙人照片
					education: '',//合伙人学历
					educationStartTime: '',//合伙人学历开始时间
					educationEndTime: '',//合伙人学历结束时间
					educationGraduateInstitutions: '',//合伙人毕业院校
					employmentTime: '',//从业时间
					topJobBeforeStartingBusiness: '',//创业前最高职位
					topJobBeforeStartingBusinessStartTime: '',//创业前最高职位起始时间
					topJobBeforeStartingBusinessEndTime: '',//创业前最高职位结束时间
					preVentureCompany: '',//创业前所属公司
					employeeOptionPool: '0',//员工期权池(0:否  1:是)
					personalFpentrepreneurialExperienceList: [{
						project: '',//项目名称
						corporateName: '',//所属公司
						projectStrartTime: '',//项目开始时间
						projectEndTime: ''//项目结束时间
					}],
					flag: '1',//表示创始人或合伙人字段(0:创始人, 1:合伙人)
					isShow: 0
				}],
				teamStatus: '0',
				teamDefaultValue: '0',
			},
			//项目信息
			project: {
				lastRoundOfValuations: '',//上一轮估值
				flag1: 1,
				flag2: 1,
				flag3: 1,
				personalFppatentTechnologyList: [{
					patentTechnologyPatentYear: '',//专利年份
					patentName: '',//专利名称
				}],
				personalFinancingExperienceList: [{
					financingYear: '',//融资年份
					financingAmount: '',//融资金额
					investorName: '',//投资人姓名
					roundFinancing: '',//融资所在阶段
				}],
				personalBusinessEventAwardsList: [{
					eventYear: '',//年份
					eventAwards: '',//所获奖项
				}]
			},
			//财务数据
			financeData: {
				nperatingIncomeOfTheLastYear: '',//上年度营业收入
				netProfitForThePreviousYear: '',//上年净利润
				businessIncomeOfLastMonthAndMonth: '',//上月月营业收入
				monthlyNetProfit: '',//月净利润
				growthRateOfBusinessIncomeLastMarch: '',//近三月营业收入增长率
				netProfitGrowthRateInRecentMarch: '',//近三月净利润增长率
				grossProfitRate: '',//毛利率
				netInterestRate: '',//净利率
				registeredUsers: '',//注册用户量
				whetherToStartProfit: '',//是否开始盈利
				whetherTheProductIsOnlineOrNot: '',//产品是否上线
				numberSserviceEnterprises: '',//服务企业数量
				customerCost: '',//获客成本
				dailyLiving: '',//日活
				dailyBrowsing: '',//日浏览量
				repurchaseRate: '',//复购率
			},
			isFou: [{ key: '是', value: 1 }, { key: '否', value: 0 }],
			upIndex: null,
			loading: false,
		}
	},
	created () {
		this.$nextTick(() => {
			if (this.$refs.tabRef) {
				this.$refs.tabRef.$emit('changeTab', '0')
			}
		})
		this.team.teamStatus = '0';
		if (sessionStorage.getItem('jinRong') == '1') {
			if (this.$route.query.value) {
				this.loadingTab = true
				this.$htAjax.post(`${this.$config.back}/guoanmaker/providepersonalFinanceProject/findPersonalFinanceProjectPartTwo?projectId=` + this.$route.query.value, {}, {}).then(({ data }) => {
					if (data.status == 200) {
						//基本信息
						this.basic.financingTarget = data.data.financingTarget//项目融资目标
						this.basic.sellShares = data.data.sellShares//出让股份
						this.basic.financingValuation = data.data.financingValuation//融资估值
						this.basic.roundOfFinancing = data.data.roundOfFinancing//融资轮次
						this.basic.useOfFunds = data.data.useOfFunds//资金用途
						this.basic.investmentExitMode = data.data.investmentExitMode//投资退出方式
						//行业信息
						this.industry.industryField = data.data.industryField//行业领域
						this.industry.competitiveAdvantageInTheField = data.data.competitiveAdvantageInTheField//领域竞争优势
						this.industry.industryRankings = data.data.industryRankings//行业排名
						this.industry.marketShare = data.data.marketShare//市场占有率
						//财务数据
						this.financeData.nperatingIncomeOfTheLastYear = data.data.nperatingIncomeOfTheLastYear//上年度营业收入
						this.financeData.netProfitForThePreviousYear = data.data.netProfitForThePreviousYear//上年净利润
						this.financeData.businessIncomeOfLastMonthAndMonth = data.data.businessIncomeOfLastMonthAndMonth//上月月营业收入
						this.financeData.monthlyNetProfit = data.data.monthlyNetProfit//月净利润
						this.financeData.growthRateOfBusinessIncomeLastMarch = data.data.growthRateOfBusinessIncomeLastMarch//近三月营业收入增长率
						this.financeData.netProfitGrowthRateInRecentMarch = data.data.netProfitGrowthRateInRecentMarch//近三月净利润增长率
						this.financeData.grossProfitRate = data.data.grossProfitRate//毛利率
						this.financeData.netInterestRate = data.data.netInterestRate//净利率
						this.financeData.registeredUsers = data.data.registeredUsers//注册用户量
						this.financeData.whetherToStartProfit = data.data.whetherToStartProfit//是否开始盈利
						this.financeData.whetherTheProductIsOnlineOrNot = data.data.whetherTheProductIsOnlineOrNot//产品是否上线
						this.financeData.numberSserviceEnterprises = data.data.numberSserviceEnterprises//服务企业数量
						this.financeData.customerCost = data.data.customerCost//获客成本
						this.financeData.dailyLiving = data.data.dailyLiving//日活
						this.financeData.dailyBrowsing = data.data.dailyBrowsing//日浏览量
						this.financeData.repurchaseRate = data.data.repurchaseRate//复购率
						//项目信息
						this.project.lastRoundOfValuations = data.data.lastRoundOfValuations//上一轮估值
						this.project.personalFppatentTechnologyList = data.data.personalFppatentTechnologyList
						this.project.personalFinancingExperienceList = data.data.personalFinancingExperienceList
						this.project.personalBusinessEventAwardsList = data.data.personalBusinessEventAwardsList
						//团队信息
						//创始人
						this.team.partner = []
						data.data.personalFinanceProjectPartnerList.map(item => {
							if (item.flag == 1) {
								this.team.partner.push(item)
								if(item.personalFpentrepreneurialExperienceList.length > 0){
									item.isShow = 1
								}else{
									item.isShow = 0
								}
							}
							if (item.flag == 0) {
								this.team.founder = item
								if(item.personalFpentrepreneurialExperienceList.length > 0){
									this.flag4 = 1
								}else{
									this.flag4 = 0
								}
							}
						})
						if (this.team.partner.length == 0) {
							this.team.partner = [{
								name: '',//合伙人姓名
								photo: '',//合伙人照片
								education: '',//合伙人学历
								educationStartTime: '',//合伙人学历开始时间
								educationEndTime: '',//合伙人学历结束时间
								educationGraduateInstitutions: '',//合伙人毕业院校
								employmentTime: '',//从业时间
								topJobBeforeStartingBusiness: '',//创业前最高职位
								topJobBeforeStartingBusinessStartTime: '',//创业前最高职位起始时间
								topJobBeforeStartingBusinessEndTime: '',//创业前最高职位结束时间
								preVentureCompany: '',//创业前所属公司
								employeeOptionPool: '0',//员工期权池(0:否  1:是)
								personalFpentrepreneurialExperienceList: [{
									project: '',//项目名称
									corporateName: '',//所属公司
									projectStrartTime: '',//项目开始时间
									projectEndTime: ''//项目结束时间
								}],
								flag: '1',//表示创始人或合伙人字段(0:创始人, 1:合伙人)
							}]
						}
						//合伙人tab
						this.teamMessageType = [{
							title: '创始人信息页',
							type: '0'
						}]
						if (this.team.partner.length >= 1) {
							this.team.partner.map((item, index) => {
								this.teamMessageType.push({
									title: `合伙人${index + 1}信息页`,
									type: `${index + 1}`
								})
							})
						}
						if (this.project.personalFppatentTechnologyList.length == 0) {
							this.project.flag1 = 0;
							this.project.personalFppatentTechnologyList = [{
								patentTechnologyPatentYear: '',//专利年份
								patentName: '',//专利名称
							}]
						}
						if (this.project.personalFinancingExperienceList.length == 0) {
							this.project.flag2 = 0;
							this.project.personalFinancingExperienceList = [{
								financingYear: '',//融资年份
								financingAmount: '',//融资金额
								investorName: '',//投资人姓名
								roundFinancing: '',//融资所在阶段
							}]
						}
						if (this.project.personalBusinessEventAwardsList.length == 0) {
							this.project.flag3 = 0;
							this.project.personalBusinessEventAwardsList = [{
								eventYear: '',//年份
								eventAwards: '',//所获奖项
							}]
						}
						this.loadingTab = false
					} else {
						this.$message.error('请求失败')
						this.loadingTab = false
					}
				}).catch((err) => {
					this.$message.error('请求失败')
					this.loadingTab = false
				})
			}
		}
	},
	methods: {
		partnerFlag(val,index){
			this.$set(this.team.partner[index],'isShow',val)
			if (val == 0) {
				this.team.partner[index].personalFpentrepreneurialExperienceList = []
			} else {
				this.$set(this.team.partner[index],'personalFpentrepreneurialExperienceList',[{
					project: '',//项目名称
					corporateName: '',//所属公司
					projectStrartTime: '',//项目开始时间
					projectEndTime: ''//项目结束时间
				}])
				this.$forceUpdate()
				// this.team.partner[index].personalFpentrepreneurialExperienceList = [{
				// 	project: '',//项目名称
				// 	corporateName: '',//所属公司
				// 	projectStrartTime: '',//项目开始时间
				// 	projectEndTime: ''//项目结束时间
				// }]
			}
		},
		founderFlag(val) {
			if (val == 0) {
				this.team.founder.personalFpentrepreneurialExperienceList = []
			} else {
				this.team.founder.personalFpentrepreneurialExperienceList = [{
					project: '',//项目名称
					corporateName: '',//所属公司
					projectStrartTime: '',//项目开始时间
					projectEndTime: ''//项目结束时间
				}]
			}
		},
		flag1(val) {
			if (val == 0) {
				this.project.personalFppatentTechnologyList = [{
					patentTechnologyPatentYear: '',//专利年份
					patentName: '',//专利名称
				}]
			}
		},
		flag2(val) {
			if (val == 0) {
				this.project.personalFinancingExperienceList = [{
					financingYear: '',//融资年份
					financingAmount: '',//融资金额
					investorName: '',//投资人姓名
					roundFinancing: '',//融资所在阶段
				}]
			}
		},
		flag3(val) {
			if (val == 0) {
				this.project.personalBusinessEventAwardsList = [{
					eventYear: '',//年份
					eventAwards: '',//所获奖项
				}]
			}
		},
		//保存
		emit() {
			this.loading = true;
			this.team.partner.map(item=>{
				delete item.isShow
			})
			this.team.partner.unshift(this.team.founder)
			this.project.personalFppatentTechnologyList.map(item => {
				if (item.patentTechnologyPatentYear) {
					item.patentTechnologyPatentYear = new Date(item.patentTechnologyPatentYear).getFullYear().toString()
				}
			})
			this.project.personalFinancingExperienceList.map(item => {
				if (item.financingYear) {
					item.financingYear = new Date(item.financingYear).getFullYear().toString()
				}
			})
			this.project.personalBusinessEventAwardsList.map(item => {
				if (item.eventYear) {
					item.eventYear = new Date(item.eventYear).getFullYear().toString()
				}
			})
			let json = {
				id: this.$route.query.value,
				//基本信息
				financingTarget: this.basic.financingTarget,//项目融资目标
				sellShares: this.basic.sellShares,//出让股份
				financingValuation: this.basic.financingValuation,//融资估值
				roundOfFinancing: this.basic.roundOfFinancing,//融资轮次
				useOfFunds: this.basic.useOfFunds,//资金用途
				investmentExitMode: this.basic.investmentExitMode,//投资退出方式
				//行业信息
				industryField: this.industry.industryField,//行业领域
				competitiveAdvantageInTheField: this.industry.competitiveAdvantageInTheField,//领域竞争优势
				industryRankings: this.industry.industryRankings,//行业排名
				marketShare: this.industry.marketShare,//市场占有率
				//团队信息
				personalFinanceProjectPartnerList: this.team.partner,
				//项目信息
				lastRoundOfValuations: this.project.lastRoundOfValuations,//上一轮估值
				personalFppatentTechnologyList: this.project.personalFppatentTechnologyList,//专利技术
				personalFinancingExperienceList: this.project.personalFinancingExperienceList,//融资经历
				personalBusinessEventAwardsList: this.project.personalBusinessEventAwardsList,//创业赛事奖项
				//财务数据
				nperatingIncomeOfTheLastYear: this.financeData.nperatingIncomeOfTheLastYear,//上年度营业收入
				netProfitForThePreviousYear: this.financeData.netProfitForThePreviousYear,//上年净利润
				businessIncomeOfLastMonthAndMonth: this.financeData.businessIncomeOfLastMonthAndMonth,//上月月营业收入
				monthlyNetProfit: this.financeData.monthlyNetProfit,//月净利润
				growthRateOfBusinessIncomeLastMarch: this.financeData.growthRateOfBusinessIncomeLastMarch,//近三月营业收入增长率
				netProfitGrowthRateInRecentMarch: this.financeData.netProfitGrowthRateInRecentMarch,//近三月净利润增长率
				grossProfitRate: this.financeData.grossProfitRate,//毛利率
				netInterestRate: this.financeData.netInterestRate,//净利率
				registeredUsers: this.financeData.registeredUsers,//注册用户量
				whetherToStartProfit: this.financeData.whetherToStartProfit,//是否开始盈利
				whetherTheProductIsOnlineOrNot: this.financeData.whetherTheProductIsOnlineOrNot,//产品是否上线
				numberSserviceEnterprises: this.financeData.numberSserviceEnterprises,//服务企业数量
				customerCost: this.financeData.customerCost,//获客成本
				dailyLiving: this.financeData.dailyLiving,//日活
				dailyBrowsing: this.financeData.dailyBrowsing,//日浏览量
				repurchaseRate: this.financeData.repurchaseRate,//复购率
			}
			this.$htAjax.post(`${this.$config.back}/guoanmaker/providepersonalFinanceProject/updatePersonalFinanceProjectPartTwo?flag1=`
				+ this.project.flag1 + '&flag2=' + this.project.flag2 + '&flag3=' + this.project.flag3, json)
				.then(({ data }) => {
					if (data.data.key == 'success') {
						this.$router.push({ path: '/user/financial', query: { title: '金融服务' } })
						this.loading = false
						this.$message.success('保存成功')
					} else {
						this.loading = false
						this.$message.error('请求失败')
					}
				}).catch((err) => {
					this.loading = false
					this.$message.error('请求失败')
				})
		},
		//合伙人添加
		partnerAdd(index) {
			if (this.teamMessageType.length < 5) {
				this.teamMessageType.push({
					title: `合伙人${this.teamMessageType.length}信息页`,
					type: `${this.teamMessageType.length}`
				})
				this.team.partner.push({
					name: '',//合伙人姓名
					photo: '',//合伙人照片
					education: '',//合伙人学历
					educationStartTime: '',//合伙人学历开始时间
					educationEndTime: '',//合伙人学历结束时间
					educationGraduateInstitutions: '',//合伙人毕业院校
					employmentTime: '',//从业时间
					topJobBeforeStartingBusiness: '',//创业前最高职位
					topJobBeforeStartingBusinessStartTime: '',//创业前最高职位起始时间
					topJobBeforeStartingBusinessEndTime: '',//创业前最高职位结束时间
					preVentureCompany: '',//创业前所属公司
					employeeOptionPool: '0',//员工期权池(0:否  1:是)
					personalFpentrepreneurialExperienceList: [{
						project: '',//项目名称
						corporateName: '',//所属公司
						projectStrartTime: '',//项目开始时间
						projectEndTime: ''//项目结束时间
					}],
					flag: '1',//表示创始人或合伙人字段(0:创始人, 1:合伙人)
					isShow: 0
				})
				this.$nextTick(() => {
					if (this.$refs.tabRef) {
						this.$refs.tabRef.$emit('changeTab', (this.teamMessageType.length - 1).toString())
					}
				})
				this.team.teamStatus = (this.teamMessageType.length - 1).toString();
				this.$set(this.team, 'teamStatus', (this.teamMessageType.length - 1).toString())
			} else {
				this.$message.warning('最多添加4个合伙人')
			}
		},
		//合伙人删除
		partnerDel(index) {
			this.teamMessageType.splice(index + 1, 1)
			this.team.partner.splice(index, 1)
			this.$refs.tabRef.$emit('changeTab', '1')
			this.teamMessageType.map((item, index) => {
				if (item.type != '0') {
					item.title = `合伙人${index}信息页`
					item.type = `${index}`
				}
			})
			this.$set(this.team, 'teamDefaultValue', '1')
			this.$set(this.team, 'teamStatus', '1')
		},
		//校验
		timeChange(value) {
			if (this.team.founder.educationStartTime && this.team.founder.educationEndTime) {
				let compare = this.team.founder.educationStartTime > this.team.founder.educationEndTime;
				if (compare) {
					this.team.founder.educationStartTime = ''
					this.team.founder.educationEndTime = ''
					this.$message.warning('开始时间不能超过结束时间')
				}
			}
		},
		timeChange1(index) {
			if (this.team.partner[index].educationStartTime && this.team.partner[index].educationEndTime) {
				let compare = this.team.partner[index].educationStartTime > this.team.partner[index].educationEndTime;
				if (compare) {
					this.team.partner[index].educationStartTime = ''
					this.team.partner[index].educationEndTime = ''
					this.$message.warning('开始时间不能超过结束时间')
				}
			}
		},
		timeChange2(index) {
			if (this.team.partner[index].topJobBeforeStartingBusinessStartTime && this.team.partner[index].topJobBeforeStartingBusinessEndTime) {
				let compare = this.team.partner[index].topJobBeforeStartingBusinessStartTime > this.team.partner[index].topJobBeforeStartingBusinessEndTime;
				if (compare) {
					this.team.partner[index].topJobBeforeStartingBusinessStartTime = ''
					this.team.partner[index].topJobBeforeStartingBusinessEndTime = ''
					this.$message.warning('开始时间不能超过结束时间')
				}
			}
		},
		timeChange2_1() {
			if (this.team.founder.topJobBeforeStartingBusinessStartTime && this.team.founder.topJobBeforeStartingBusinessEndTime) {
				let compare = this.team.founder.topJobBeforeStartingBusinessStartTime > this.team.founder.topJobBeforeStartingBusinessEndTime;
				if (compare) {
					this.team.founder.topJobBeforeStartingBusinessStartTime = ''
					this.team.founder.topJobBeforeStartingBusinessEndTime = ''
					this.$message.warning('开始时间不能超过结束时间')
				}
			}
		},
		timeChange3_1(index) {
			if (this.team.founder.personalFpentrepreneurialExperienceList[index].projectStrartTime && this.team.founder.personalFpentrepreneurialExperienceList[index].projectEndTime) {
				let compare = this.team.founder.personalFpentrepreneurialExperienceList[index].projectStrartTime > this.team.founder.personalFpentrepreneurialExperienceList[index].projectEndTime;
				if (compare) {
					this.team.founder.personalFpentrepreneurialExperienceList[index].projectStrartTime = ''
					this.team.founder.personalFpentrepreneurialExperienceList[index].projectEndTime = ''
					this.$message.warning('开始时间不能超过结束时间')
				}
			}
		},
		timeChange3(index, i) {
			if (this.team.partner[index].personalFpentrepreneurialExperienceList[i].projectStrartTime && this.team.partner[index].personalFpentrepreneurialExperienceList[i].projectEndTime) {
				let compare = this.team.partner[index].personalFpentrepreneurialExperienceList[i].projectStrartTime > this.team.partner[index].personalFpentrepreneurialExperienceList[i].projectEndTime;
				if (compare) {
					this.team.partner[index].personalFpentrepreneurialExperienceList[i].projectStrartTime = ''
					this.team.partner[index].personalFpentrepreneurialExperienceList[i].projectEndTime = ''
					this.$message.warning('开始时间不能超过结束时间')
				}
			}
		},
		financingTargetChange() {
			if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(this.basic.financingTarget))) {
				this.basic.financingTarget = ''
				this.$message.warning('请输入合法融资目标')
			}
		},
		lastRoundOfValuationsChange() {
			if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(this.project.lastRoundOfValuations))) {
				this.project.lastRoundOfValuations = ''
				this.$message.warning('请输入合法上一轮估值')
			}
		},
		financingValuationChange() {
			if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(this.basic.financingValuation))) {
				this.basic.financingValuation = ''
				this.$message.warning('请输入合法融资估值')
			}
		},
		industryRankingsChange() {
			if (!(/^[1-9]\d*$/.test(this.industry.industryRankings))) {
				this.industry.industryRankings = ''
				this.$message.warning('请输入合法行业排名')
			}
		},
		marketShareChange() {
			if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(this.industry.marketShare))) {
				this.industry.marketShare = ''
				this.$message.warning('请输入合法市场占有率')
			}
		},
		nperatingIncomeOfTheLastYearChange() {
			if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(this.financeData.nperatingIncomeOfTheLastYear))) {
				this.financeData.nperatingIncomeOfTheLastYear = ''
				this.$message.warning('请输入合法上年度营业收入')
			}
		},
		netProfitForThePreviousYearChange() {
			if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(this.financeData.netProfitForThePreviousYear))) {
				this.financeData.netProfitForThePreviousYear = ''
				this.$message.warning('请输入合法上年净利润')
			}
		},
		financingAmountChange(index) {
			if (!(/^[1-9]\d*$/.test(this.project.personalFinancingExperienceList[index].financingAmount))) {
				this.project.personalFinancingExperienceList[index].financingAmount = ''
				this.$message.warning('请输入合法金融数量')
			}
		},
		businessIncomeOfLastMonthAndMonthChange() {
			if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(this.financeData.businessIncomeOfLastMonthAndMonth))) {
				this.financeData.businessIncomeOfLastMonthAndMonth = ''
				this.$message.warning('请输入合法上月月营业收入')
			}
		},
		monthlyNetProfitChange() {
			if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(this.financeData.monthlyNetProfit))) {
				this.financeData.monthlyNetProfit = ''
				this.$message.warning('请输入合法月净利润')
			}
		},
		growthRateOfBusinessIncomeLastMarchChange() {
			if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(this.financeData.growthRateOfBusinessIncomeLastMarch))) {
				this.financeData.growthRateOfBusinessIncomeLastMarch = ''
				this.$message.warning('请输入合法近三月营业收入增长率')
			}
		},
		netProfitGrowthRateInRecentMarchChange() {
			if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(this.financeData.netProfitGrowthRateInRecentMarch))) {
				this.financeData.netProfitGrowthRateInRecentMarch = ''
				this.$message.warning('请输入合法近三月净利润增长率')
			}
		},
		grossProfitRateChange() {
			if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(this.financeData.grossProfitRate))) {
				this.financeData.grossProfitRate = ''
				this.$message.warning('请输入合法毛利率')
			}
		},
		netInterestRateChange() {
			if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(this.financeData.netInterestRate))) {
				this.financeData.netInterestRate = ''
				this.$message.warning('请输入合法净利率')
			}
		},
		registeredUsersChange() {
			if (!(/^[1-9]\d*$/.test(this.financeData.registeredUsers))) {
				this.financeData.registeredUsers = ''
				this.$message.warning('请输入合法注册用户量')
			}
		},
		dailyBrowsingChange() {
			if (!(/^[1-9]\d*$/.test(this.financeData.dailyBrowsing))) {
				this.financeData.dailyBrowsing = ''
				this.$message.warning('请输入合法日浏览量')
			}
		},
		numberSserviceEnterprisesChange() {
			if (!(/^[1-9]\d*$/.test(this.financeData.numberSserviceEnterprises))) {
				this.financeData.numberSserviceEnterprises = ''
				this.$message.warning('请输入合法服务企业数量')
			}
		},
		customerCostChange() {
			if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(this.financeData.customerCost))) {
				this.financeData.customerCost = ''
				this.$message.warning('请输入合法获客成本')
			}
		},
		dailyLivingChange() {
			if (!(/^[1-9]\d*$/.test(this.financeData.dailyLiving))) {
				this.financeData.dailyLiving = ''
				this.$message.warning('请输入合法服务日活')
			}
		},
		repurchaseRateChange() {
			if (!(/^[0-9]+(.[0-9]{1,2})?$/.test(this.financeData.repurchaseRate))) {
				this.financeData.repurchaseRate = ''
				this.$message.warning('请输入合法复购率')
			}
		},
		//项目信息创业奖项添加
		entrepreneurshipAwardAdd(index) {
			this.project.personalBusinessEventAwardsList.push({
				eventYear: '',//年份
				eventAwards: '',//所获奖项
			})
		},
		//项目信息创业奖项删除
		entrepreneurshipAwardDel(index) {
			this.project.personalBusinessEventAwardsList.splice(index, 1)
		},
		//项目信息融资经历添加
		oidFinancingAdd(index) {
			this.project.personalFinancingExperienceList.push({
				financingYear: '',//融资年份
				financingAmount: '',//融资金额
				investorName: '',//投资人姓名
				roundFinancing: '',//融资所在阶段
			})
		},
		//项目信息融资经历删除
		oidFinancingDel(index) {
			this.project.personalFinancingExperienceList.splice(index, 1)
		},
		//项目信息专利添加
		patentAdd(index) {
			this.project.personalFppatentTechnologyList.push({
				patentTechnologyPatentYear: '',//专利年份
				patentName: '',//专利名称
			})
		},
		//项目信息专利删除
		patentDel(index) {
			this.project.personalFppatentTechnologyList.splice(index, 1)
		},
		//创始人经历删除
		teamDel(index) {
			this.team.founder.personalFpentrepreneurialExperienceList.splice(index, 1)
		},
		//创始人经历添加
		teamAdd(index) {
			this.team.founder.personalFpentrepreneurialExperienceList.push({
				project: '',//项目名称
				corporateName: '',//所属公司
				projectStrartTime: '',//项目开始时间
				projectEndTime: ''//项目结束时间
			})
		},
		// 合伙人
		teamAdd1(index, i) {
			this.team.partner[index].personalFpentrepreneurialExperienceList.push({
				project: '',//项目名称
				corporateName: '',//所属公司
				projectStrartTime: '',//项目开始时间
				projectEndTime: ''//项目结束时间
			})
		},
		teamDel1(index, i) {
			this.team.partner[index].personalFpentrepreneurialExperienceList.splice(i, 1)
		},
		//导航tab
		changeTab(opt) {
			this.team.teamStatus = 0
			this.status = opt
		},
		//团队tab
		teamTab(opt) {

			this.team.teamStatus = opt
		},
		//团队上传图片创始人
		founderHandleAvatarSuccess(res, file) {
			this.team.founder.photo = res.data.value
		},
		partnerHandleAvatarSuccess(res, file) {
			this.team.partner[this.upIndex].photo = res.data.value
		},
		upClick(index) {
			this.upIndex = index;
		},
		beforeAvatarUpload(file) {
			const isImg = file.type;
			var isJPG = false;
			if (isImg != 'image/jpeg' && isImg != 'image/png' && isImg != 'image/bmp' && isImg != 'image/gif') {
				this.$message.warning('上传图片只能是 JPG/PNG/BMP/GIF 格式!');
				isJPG = false;
			} else {
				isJPG = true;
			}
			const isLt2M = file.size / 1024 / 1024 < 4;
			if (!isLt2M) {
				this.$message.warning('上传图片大小不能超过 4MB!');
			}
			return isJPG && isLt2M;
		},
	},
	components: {
		tabHeader
	}
}
</script>
<style scoped>
.financing .last_box h2 {
	font-size: 18px;
	font-weight: bold;
	color: #ccc;
	margin-bottom: 20px;
}

.financing {
	position: relative;
}

.financing .submit {
	position: absolute;
	right: 100px;
	top: 80px;
}

.financing .title {
	background: #fff;
	padding: 15px 0 15px 24px;
	border-bottom: 1px solid #e0e0e0;
}

.financing .tip {
	width: 6px;
	height: 32px;
	background: #ff0000;
	vertical-align: middle;
	margin-right: 15px;
}

.financing .marLeft20 {
	margin-left: 20px;
}

.financing .teamHr {
	height: 1px;
	width: 90%;
	margin: 20px auto;
	border-top: 1px dashed #e8e8e8;
}
</style>
<style>
.financing .marLeft0 .el-form-item__content {
	margin-left: 0!important;
}

.financing .avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}

.financing .avatar-uploader .el-upload:hover {
	border-color: #409EFF;
}

.financing .avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	line-height: 178px;
	text-align: center;
}

.financing .avatar {
	width: 178px;
	height: 178px;
	display: block;
}

.financing .el-form-item {
	display: inline-block;
}
</style>

