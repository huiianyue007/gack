<template>
    <div class="expenditure">
        <div class="crumbs">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>商家管理中心</el-breadcrumb-item>
                <el-breadcrumb-item>收支明细</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="expenditure_box">
            <div class="expend_list">
                <div class="expend_top">
                    收入
                </div>
                <div class="expend_center">
                    <div class="ec_list">
                        <img src="../../assets/images/information/srze.png" />
                        <span>收入总额：￥ {{incomeAmount | money}}元</span>
                        <el-tooltip content="包含订单收入和全额退款时手续费收入" placement="right" effect="dark">
                            <img class="iconItem" src="../../assets/images/information/information.png" alt="">
                        </el-tooltip>
                    </div>
                </div>
            </div>
            <div class="expend_list">
                <div class="expend_top">
                    结算
                </div>
                <div class="expend_center">
                    <div class="ec_list">
                        <img src="../../assets/images/information/srze.png" />
                        <span>结算总额：￥ {{clearAmount | money}}元</span>
                        <el-tooltip content="已经结算订单的结算总额" placement="right" effect="dark">
                            <img class="iconItem" src="../../assets/images/information/information.png" alt="">
                        </el-tooltip>
                    </div>
                </div>
            </div>
            <div class="expend_list">
                <div class="expend_top">
                    支出
                </div>
                <div class="expend_center" style="margin-top:0">
                    <div class="ec_list">
                        <img src="../../assets/images/information/zcze.png" />
                        <span>支出总额：￥ {{costAmount | money}}元</span>
                        <el-tooltip content="包含订单手续费支出，保证金支出，退款订单支出，佣金支出金额" placement="right" effect="dark">
                            <img class="iconItem" src="../../assets/images/information/information.png" alt="">
                        </el-tooltip>
                    </div>
                    <div class="ec_list">
                        <img src="../../assets/images/information/yjzzc.png" />
                        <span>实际佣金支出：￥{{divideAmount | money}}元</span>
                        <el-tooltip content="已经结算订单的佣金金额" placement="right" effect="dark">
                            <img class="iconItem" src="../../assets/images/information/information.png" alt="">
                        </el-tooltip>
                    </div>
                    <div class="ec_list" style="margin:0">
                        <img src="../../assets/images/information/qywy.png" />
                        <span>实际支付渠道手续费：￥ {{feeAmount | money}}元</span>
                        <el-tooltip content="所有成交订单的手续费总额包含退款订单的手续费支出" placement="right" effect="dark">
                            <img class="iconItem" src="../../assets/images/information/information.png" alt="">
                        </el-tooltip>
                    </div>
                </div>

            </div>
            <div class="expend_list">
                <div class="expend_top">
                    退款
                </div>
                <div class="expend_center">
                    <div class="ec_list" style="margin:0">
                        <img src="../../assets/images/information/zhydz.png" />
                        <span>总退款金额：￥ {{refundAmount | money}}元</span>
                        <el-tooltip content="所有退款订单的总金额" placement="right" effect="dark">
                            <img class="iconItem" src="../../assets/images/information/information.png" alt="">
                        </el-tooltip>
                    </div>
                </div>
            </div>
            <div class="expend_list">
                <div class="expend_top">
                    未到账
                </div>
                <div class="expend_center">
                    <div class="ec_list">
                        <img src="../../assets/images/information/zhwdz.png" />
                        <span>账户未到账总额：￥ {{noClear | money}}元</span>
                        <el-tooltip content="所有未结算的订单的总额" placement="right" effect="dark">
                            <img class="iconItem" src="../../assets/images/information/information.png" alt="">
                        </el-tooltip>
                    </div>
                    <div class="ec_list" style="margin:0">
                        <img src="../../assets/images/information/yizzc.png" />
                        <span>实际保证金总额：￥ {{depositPaid | money}}元</span>
                        <el-tooltip content="当前账户已收的保证金的总额" placement="right" effect="dark">
                            <img class="iconItem" src="../../assets/images/information/information.png" alt="">
                        </el-tooltip>
                    </div>
                </div>
            </div>
        </div>
        <div class="handle-box">
            <el-form :inline="true" :model="search" class="demo-form-inline">
                <el-form-item label="订单时间" style="margin-right:30px">
                    <el-date-picker v-model="search.stratTime" :editable='false' type="date" placeholder="日期时间" style="width:160px">
                    </el-date-picker>
                    <span>-</span>
                    <el-date-picker v-model="search.endTime" :editable='false' type="date" placeholder="日期时间" style="width:160px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="资金流向" style="margin-right:30px">
                    <el-select v-model="search.flow" placeholder="资金流向" @change="flowChange" style="width:100px">
                        <el-option label="全部" value="0"></el-option>
                        <el-option label="结算" value="1"></el-option>
                        <el-option label="支出" value="2"></el-option>
                        <el-option label="收入" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付流水号">
                    <el-input v-model="search.number" :maxlength="50" placeholder="支付流水号" style="width:150px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" icon="search">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_box">
            <el-table :data="tableData.list" border style="width: 100%">
                <el-table-column prop="createTime" label="时间" :formatter='dateFormat' width="180px" align='center'>
                </el-table-column>
                <el-table-column prop="orderId" label="订单编号" align='center'>
                </el-table-column>
                <el-table-column prop="amount" label="金额(元)" :formatter='formatterAmount' width="120px" align='center'>
                </el-table-column>
                <el-table-column prop="type" label="资金流向" :formatter='formatterLiu' align='center'>
                </el-table-column>
                <el-table-column prop="type" label="资金类目" :formatter='formatterType' align='center'>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" style="float:right;margin:2px 0" @current-change="handleCurrentChange" :page-size='pagesize' :current-page="currentPage" layout="prev, pager, next" :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'

export default {
    name: 'expenditure',
    data() {
        return {
            search: {
                stratTime: '',
                endTime: '',
                flow: '0',
                number: ''
            },
            stratTime: '',
            endTime: '',
            incomeAmount: '0',
            costAmount: '0',
            divideAmount: '0',
            divideAmountOdd: '0',
            feeAmount: '0',
            feeAmountOdd: '0',
            clearAmount: '0',
            noClear: '0',
            refundAmount: '0',
            depositPaid: '0',
            depositPaidOdd: '0',
            tableData: {
                list: []
            },
            //默认每页数据量
            pagesize: 10,
            //当前页码
            currentPage: 1,
            //默认数据总数
            totalCount: 10,
            businessid: ''
        }
    },
    created: function() {
        let businessid = this.$store.state.business;
        if (businessid) {
            this.businessid = businessid;
            this.init();
        }
    },
    filters: {
        formatDate(date) {
            if (date == undefined || date == '') {
                return "无";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        },
        money(val) {
            val = val.toString().replace(/\$|\,/g, '');
            if (isNaN(val)) {
                val = "0";
            }
            let sign = (val == (val = Math.abs(val)));
            val = Math.floor(val * 100 + 0.50000000001);
            let cents = val % 100;
            val = Math.floor(val / 100).toString();
            if (cents < 10) {
                cents = "0" + cents
            }
            for (var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
                val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3));
            }

            return (((sign) ? '' : '-') + val + '.' + cents);
        }
    },
    methods: {
        //预计
        seeInit() {
            let item = {
                businessid: this.businessid
            }
            var that = this;
            this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/orderform/getStatistics`, {}, { params: item })
                .then(({ data }) => {
                    if (data.status == 200) {
                        //sumCommission：佣金总额
                        //sumFee：手续费总额
                        //sumBail：保证金总额
                        that.divideAmountOdd = data.data.sumCommission;
                        that.feeAmountOdd = data.data.sumFee;
                        that.depositPaidOdd = data.data.sumBail;
                    }
                }).catch(() => {
                });
        },
        init() {
            var that = this;
            this.$tkAjax.post(`${this.$config.pay}/getAccountLog.php?systemCode=10&originalId=` + this.businessid + '&startTime=' + this.stratTime + '&endTime=' + this.endTime + '&type=' + this.search.flow + '&id=' + this.search.number + '&page=' + this.currentPage + '&pageSize=' + this.pagesize)
                .then(({ data }) => {
                    console.log(data)
                    that.tableData.list = data.data.list;
                    that.totalCount = Number(data.data.totalCount);
                    that.incomeAmount = data.data.incomeAmount / 100 || '0';
                    that.costAmount = data.data.costAmount / 100 || '0';
                    that.divideAmount = data.data.divideAmount / 100 || '0';
                    that.feeAmount = data.data.feeAmount / 100 || '0';
                    that.clearAmount = data.data.clearAmount / 100 || '0';
                    that.refundAmount = data.data.refundAmount / 100 || '0';
                    that.noClear = data.data.noClear / 100 || '0';
                    that.depositPaid = data.data.depositPaid / 100 || '0';
                }).catch(() => {

                });
        },
        //金钱格式
        formatterAmount(row, column) {
            return '￥' + row.amount / 100;
        },
        formatterTotalCost(row, column) {
            return '￥' + row.totalCost / 100;
        },
        formatterTotalIncome(row, column) {
            return '￥' + row.totalIncome / 100;
        },
        formatterType(row, column) {
            return row.type == 1 ? '结算' : row.type == 2 ? '佣金' : row.type == 3 ? '保证金' : row.type == 4 ? '手续费' : row.type == 5 ? '退款' : row.type == 6 ? '订单收入 ' : row.type == 7 ? '全额退款手续费收入 ' : '未知';
        },
        formatterLiu(row, column) {
            return row.type == 1 ? '结算' : row.type == 2 ? '支出' : row.type == 3 ? '支出' : row.type == 4 ? '支出' : row.type == 5 ? '支出' : row.type == 6 ? '收入 ' : row.type == 7 ? '收入 ' : '未知';
        },
        //时间格式化
        dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(Number(date) * 1000).format("YYYY-MM-DD");
        },
        onSubmit() {
            let stat = this.search.stratTime;
            let end = this.search.endTime;
            let timestamp = Date.parse(stat) || '';
            let timeend = Date.parse(end) || '';
            this.stratTime = timestamp / 1000;
            this.endTime = timeend / 1000;
            this.init();
        },
        flowChange() {
            this.init();
        },
        //分页
        handleSizeChange(val) {
            //pagesize改变时候触发
            this.pagesize = val;
            this.init();
        },
        handleCurrentChange(val) {
            //当前页改变时候触发
            this.currentPage = val;
            this.init();
        }
    }
}
</script>
<style  scoped>
.crumbs {
    height: auto;
    margin: 15px 0;
    margin-top: 15px;
    width: 100%;
}

.expenditure_box {
    width: 100%;
    height: auto;
    overflow: hidden;
}

.expend_list {
    width: 100%;
    height: auto;
    overflow: hidden;
}

.expend_top {
    font-size: 14px;
    font-weight: 600;
    width: 100%;
    height: 20px;
    margin: 4px 0;
    color: #333;
    line-height: 20px;
}

.expend_top:before {
    content: '|';
    color: #c7000a;
    font-weight: bold;
    height: 20px;
    float: left;
    padding-right: 10px;
    line-height: 18px;
}

.expend_center {
    width: 100%;
    height: auto;
    margin: 10px 0;
    overflow: hidden;
}

.ec_list {
    float: left;
    width: auto;
    height: 36px;
    overflow: hidden;
    line-height: 36px;
    margin-right: 38px;
}

.ec_list img {
    height: 20px;
    width: auto;
    margin: 8px;
    float: left;
}

.ec_list span {
    float: left;
    font-size: 14px;
    color: #888;
}

.handle-box {
    border-top: 1px solid #999;
    padding-top: 20px;
    margin-top: 20px;
}

.pagination {
    margin: 10px 0;
    overflow: hidden;
}

.iconItem {
    width: 15px!important;
    height: 15px!important;
    margin-left: 10px;
    position: relative;
    top: 3px;
}
</style>
