<template>
	<div class="con">
		<div class="crumbs">
			<el-breadcrumb separator=">">
				<el-breadcrumb-item>商家管理中心</el-breadcrumb-item>
				<el-breadcrumb-item>首页</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<!--登陆者信息-->
		<div class="info">
			<div class="user_img">
				<img :src="userInfo.companyLogo" width="60" height="60">
			</div>
			<p class="user_name">{{userInfo.businessName}}</p>
			<div class="other">
				<span> {{userInfo.username}} </span>
				<span>（用户名：{{userInfo.username}}）</span>
				<br>
				<p>最后登陆：{{userInfo.lastLandTime | dateFormat}}</p>
			</div>
		</div>
		<!--发布商品数量-->
		<div class="box">
			<p class="bt">商品数量：{{Goodscount }}</p>
			<ul>
				<li v-for="lis in List" @click="commodityUrl(lis.num)">
					<p>{{lis.category}}
						<i class="el-icon-arrow-right"></i>
					</p>
					<p>{{lis.matterNum | isNull}}</p>
				</li>
			</ul>
		</div>
		<!--交易订单-->
		<div class="box">
			<p class="bt">交易订单：{{Ordercount}}</p>
			<ul>
				<li v-for="lis in list" @click="orderUrl(lis.state)">
					<p>{{lis.category}}
						<i class="el-icon-arrow-right"></i>
					</p>
					<p>{{lis.matterNum | isNull}}</p>
				</li>
			</ul>
		</div>
		<!--销售情况统计-->
		<div class="box">
			<p class="bt">销售情况统计</p>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column label="项目" align="center">
					<template slot-scope="scope">
						<span>{{scope.row.project}}</span>
					</template>
				</el-table-column>
				<el-table-column label="订单量" align="center">
					<template slot-scope="scope">
						<span>{{scope.row.num | isNull}}</span>
					</template>
				</el-table-column>
				<el-table-column label="订单金额" align="center">
					<template slot-scope="scope">
						<span>{{scope.row.total | isNull}}</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!--平台联系方式-->
		<div class="box">
			<p class="bt">平台联系方式</p>
			<p>
				客服电话 ：400-8518585
				<br> 邮箱：gackservice@gakj.citic.com
			</p>
		</div>

	</div>
</template>
<script>
import moment from 'moment'
export default {
	data() {
		return {
			businessid: '',
			tableData: [{
				project: '昨日销量',
				num: '--',
				total: '--'
			}, {
				project: '累计当月销量',
				num: '--',
				total: '--'
			}],
			//商品数量
			Goodscount: 0,
			//   登陆者信息
			userInfo: {},
			//   发布商品
			releaserGoods: {},
			//   交易订单
			tradingOrder: {},
			Ordercount: 0,
			list: [
				{ category: '待支付订单', matterNum: 0, state: 1 },
				{ category: '待沟通订单', matterNum: 0, state: 14 },
				{ category: '待接单订单', matterNum: 0, state: 2 },
				{ category: '服务中订单', matterNum: 0, state: 3 },
				{ category: '待确认订单', matterNum: 0, state: 4 },
				{ category: '待退款订单', matterNum: 0, state: 5 }
			],
			List: [
				{ category: '发布待审核', matterNum: '', state: 1, num: '3' },
				{ category: '发布中商品', matterNum: '', state: 2, num: '1' },
				{ category: '平台审核失败', matterNum: '', state: 3, num: '4' },
				{ category: '下架商品', matterNum: '', state: 4, num: '5' },
				{ category: '违规商品', matterNum: '', state: 5, num: '2' }
			]
		}
	},
	created() {
		let user = this.$store.state.userid;
		if (user) {
			let item = {
				userid: user.id
			}
			let that = this;
			 this.$htAjax.post(`${this.$config.back}/selectBusByUserid`, {}, {
				params: item
			}).then(({ data }) => {
				 if (data.status == 200) {
					this.businessid = data.data.id;
				  	this.init();//初始化数据
				 }
			}).catch(function(err) {
				that.$message.error('请稍后重试');
			});
		}
	},
	methods: {
		init() {
			var that = this;
			var reg = {
				businessId: this.businessid
			}
			this.$htAjax.post(`${this.$config.back}/selectBusinessById`, {}, {
				params: reg
			}).then(({ data }) => {
				if (data.status === 200) {
					that.userInfo = data.data.businessItem[0];
					data.data.commodityCount.map(item => {
						if(item.commodityState==1){
							that.List[0].matterNum = item.orderStatusCount;
						}else if(item.commodityState==2){
							that.List[1].matterNum = item.orderStatusCount;
						}else if(item.commodityState==3){
							that.List[2].matterNum = item.orderStatusCount;
						}else if(item.commodityState==4 || item.commodityState==7){
							that.List[3].matterNum += item.orderStatusCount;
						}else if(item.commodityState==5){
							that.List[4].matterNum += item.orderStatusCount;
						}
					})
					data.data.orderFormCount.map(item => {
						if (item.orderStatus == "1") {
							that.list[0].matterNum = item.orderStatusCount;
						} else if (item.orderStatus == "14") {
							that.list[1].matterNum = item.orderStatusCount;
						} else if (item.orderStatus == "2") {
							that.list[2].matterNum = item.orderStatusCount;
						} else if (item.orderStatus == "3") {
							that.list[3].matterNum = item.orderStatusCount;
						} else if (item.orderStatus == "4") {
							that.list[4].matterNum = item.orderStatusCount;
						} else if (item.orderStatus == "5" || item.orderStatus == "9" || item.orderStatus == "10") {
							that.list[5].matterNum += item.orderStatusCount;
						}
					})
					that.List.forEach(it => {
						if (it.matterNum != "") {
							that.Goodscount += parseInt(it.matterNum);
						}
					})
					that.list.forEach(it => {
						that.Ordercount += it.matterNum
					})
					// that.list[6].state
					that.tableData[0].num = data.data.OrderYesterday[0].orderStatusCount;
					that.tableData[0].total = data.data.OrderYesterday[0].orderStatusAmount;
					that.tableData[1].num = data.data.OrderForTheMonth[0].orderStatusCount;
					that.tableData[1].total = data.data.OrderForTheMonth[0].orderStatusAmount;
				} else {
					that.$message.error(data.msg);
				}
			}).catch(function(err) {
				that.$message.error('请稍后重试');
			});
		},
		commodityUrl(state) {

			this.$store.state.stateId2 = state

			this.$router.push('/manage');
		},
		orderUrl(state) {
			this.$store.commit('orderState', state);
			this.$router.push('/merchandise');
		}
	},
	filters: {
		isNull(val) {
			if (val == null) {
				return 0
			} else if (val == '') {
				return 0
			} else {
				return val
			}
		},
		dateFormat(val) {
			var date = val;
			if (date == undefined) {
				return "";
			}
			return moment(date).format("YYYY-MM-DD HH:mm:ss");
		},

	}
}
</script>
<style scoped>
.con {
	overflow: hidden;
}

.crumbs {
	height: auto;
	margin: 15px 0;
	margin-top: 15px;
	width: 100%;
}

.info {
	height: auto;
	overflow: hidden;
	margin-top: 35px;
}

.info .user_img {
	width: 60px;
	height: 60px;
	border-radius: 50%;
	float: left;
	overflow: hidden;
	margin-right: 25px;
}

.info .user_name {
	font-size: 16px;
	color: #666;
	float: left;
	line-height: 45px;
	margin-right: 25px;
}

.other {
	color: #666;
	line-height: 30px;
}

.other span:first-child {
	font-size: 16px;
	font-weight: bold;
}

.other span:nth-of-type(2) {
	color: #949494;
	font-size: 14px;
}

.other p {
	font-size: 14px;
}

.bt {
	height: 25px;
	font-size: 14px;
	line-height: 25px;
	padding-left: 15px;
	border-left: 3px solid #c7000a;
	color: #4a4a4a!important;
	margin-bottom: 10px;
}

.box {
	height: auto;
	overflow: hidden;
	margin-top: 25px;
}

.box p {
	font-size: 14px;
	line-height: 30px;
	color: #333;
	padding-left: 15px;
}

.box p i {
	font-size: 12px;
	padding-left: 10px;
}

.box ul {
	overflow: hidden;
	padding-left: 15px;
}

.box ul li {
	float: left;
	margin-right: 35px;
	height: auto;
	overflow: hidden;
	padding-top: 20px;
	cursor: pointer;
}

.box ul li p {
	text-align: center;
}

.box ul li p:nth-of-type(2) {
	color: #c7000a;
	font-size: 20px;
}
</style>

