<template>
    <div class="merchandetails" v-loading="merchandetails">
        <div class="crumbs">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>商家管理中心</el-breadcrumb-item>
                <el-breadcrumb-item to="merchandise">订单管理</el-breadcrumb-item>
                <el-breadcrumb-item>订单详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="space_box">
            <el-steps :active="orderActive" align-center center finish-status="success">
                <el-step :title="spaceTitle1" :description='comOrderTime1' v-if="spaceTitle1"></el-step>
                <el-step :title="spaceTitle2" :description='comOrderTime2' v-if="spaceTitle2"></el-step>
                <el-step :title="spaceTitle3" :description='comOrderTime3' v-if="spaceTitle3"></el-step>
                <el-step :title="spaceTitle4" :description='comOrderTime4' v-if="spaceTitle4"></el-step>
            </el-steps>
        </div>
        <el-tabs type="border-card">
            <el-tab-pane label="订单详情">
                <div class="card_box">
                    <div class="cb_top">
                        下单/支付
                    </div>
                    <div class="cb_lists">
                        <ul class="cb_list">
                            <li>
                                订单号：{{orderNumber}}
                            </li>
                            <li>
                                下单时间：{{placeOrderTime | formatDate}}
                            </li>
                        </ul>
                        <ul class="cb_list">
                            <li>
                                支付单号：{{defrayNumber}}
                            </li>
                            <li>
                                支付时间：{{defrayTime | formatDate}}
                            </li>
                        </ul>
                    </div>
                    <div class="cb_top">
                        购买方信息
                    </div>
                    <div class="cb_lists">
                        <ul class="cb_list">
                            <li>
                                用户昵称：{{nickname}}
                            </li>
                            <li>
                                联系方式：{{contactNumber}}
                            </li>
                        </ul>
                        <!-- <ul class="cb_list">
                                                                                                                                        <li>
                                                                                                                                            用户地址：北京市朝阳区四惠东地铁站华腾世纪园D座国安创客
                                                                                                                                        </li>
                                                                                                                                    </ul> -->
                        <ul class="cb_list">
                            <li>
                                用户邮箱：{{email}}
                            </li>
                            <li>
                                用户备注：{{remark}}
                            </li>
                        </ul>
                    </div>
                    <div class="cb_top">
                        服务商品信息
                    </div>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="name" label="商品名称" align='center'>
                        </el-table-column>
                        <el-table-column prop="money" label="单价" :formatter='formatterMoney' align='center'>
                        </el-table-column>
                        <el-table-column prop="number" label="数量" align='center'>
                        </el-table-column>
                        <el-table-column prop="amount" label="订单实际金额" :formatter='formatterAmount' align='center'>
                        </el-table-column>
                        <el-table-column prop="activity" label="优惠金额" :formatter='formatterActivity' align='center'>
                        </el-table-column>
                        <el-table-column prop="commission" label="收取佣金" :formatter='formatterCommission' align='center'>
                        </el-table-column>
                        <el-table-column prop="bond" label="保证金" :formatter='formatterBond' align='center'>
                        </el-table-column>
                        <el-table-column prop="service" label="企业网银手续费" :formatter='formatterService' align='center'>
                        </el-table-column>
                    </el-table>
                    <div class="total">
                        订单总金额：
                        <span>￥{{numMoney|money}}</span>
                        <div class='total_tit'>1.交易金额未对账，请以实时结算金额为主</div>
                    </div>
                    <div class="total" v-if="numMoneyTui">
                        退款金额：
                        <span>￥{{numMoneyTui|money}}</span>
                    </div>

                    <div class="cb_bottom">
                        <div class="cb_s">
                            <b>发票信息：</b>
                            <span>{{taxNumber}}</span>
                        </div>
                        <div class="cb_s" style="text-align:center">
                            <b>开票公司：</b>
                            <span>{{invoiceName}}</span>
                        </div>
                        <div class="cb_s" style="text-align:right">
                            <b>开票金额：</b>
                            <span>￥{{price|money}}</span>
                        </div>
                    </div>
                    <div class="cb_bottom_yy" v-if="refundsReason">
                        <b>退款原因</b>：{{refundsReason}}
                    </div>
                    <div class="cb_bottom_yy" v-if="closeType">
                        <b>关闭方式</b>：{{closeType | closeTypes}}
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import moment from 'moment'

export default {
    name: 'merchandetails',
    data() {
        return {
            merchandetails: false,
            //订单号
            orderNumber: '',
            //下单时间
            placeOrderTime: '',
            //支付单号
            defrayNumber: '',
            //支付时间
            defrayTime: '',
            //昵称
            nickname: '',
            //联系电话
            contactNumber: '',
            //地址

            //邮箱
            email: '',
            //备注
            remark: '',
            //提交
            spaceTitle1: '',
            spaceTitle2: '',
            spaceTitle3: '',
            spaceTitle4: '',
            orderTime1: '',
            orderTime2: '',
            orderTime3: '',
            orderTime4: '',
            tableData: [{
                name: '',
                money: '',
                number: '',
                amount: '',
                activity: '',
                commission: '',
                bond: '',
                service: ''
            }],
            orderActive: 0,
            numMoney: 0,
            numMoneyTui: 0,
            //发票
            taxNumber: '暂无',
            invoiceName: '暂无',
            price: '',
            orderid: '',
            //是否关闭
            isrefund: false,
            isClose: false,
            refundsReason: '',
            closeType: ''
        }
    },
    computed: {
        comOrderTime1() {
            var date = this.orderTime1;
            if (date == undefined || date == '') {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        },
        comOrderTime2() {
            var date = this.orderTime2;
            if (date == undefined || date == '') {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        },
        comOrderTime3() {
            var date = this.orderTime3;
            if (date == undefined || date == '') {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        },
        comOrderTime4() {
            var date = this.orderTime4;
            if (date == undefined || date == '') {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        }
    },
    filters: {
        formatDate(date) {
            if (date == undefined || date == '') {
                return "无";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        },
        closeTypes(date) {
            let types = '';
            if (date == '1') {
                types = '二十四小时未付款自动关闭';
            } else if (date == '2') {
                types = '二十四小时未接单自动关闭';
            } else if (date == '3') {
                types = '用户关闭';
            } else if (date == '4') {
                types = '运营商关闭';
            } else if (date == '5') {
                types = '服务商关闭';
            } else {
                types = '无';
            }
            return types;
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
    created() {
        let order = this.$store.state.orderid;
        if (order == '') {
            this.$router.push('/merchandise');
        }
        this.orderid = order;
        let item = {
            orderid: order
        }
        var that = this;
        this.merchandetails = true;
        this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/orderform/findOrderForm`, {}, { params: item })
            .then(({ data }) => {
                if (data.status == 200) {
                    that.merchandetails = false;
                    // if (data.data.isRead == '0') {
                    //     that.isRead();
                    // }
                    if (data.data.orderStatus == '5' || data.data.orderStatus == '8' || data.data.orderStatus == '9' || data.data.orderStatus == '10' || data.data.orderStatus == '11') {
                        //that.isrefund = true;
                        that.spaceTitle1 = '提交订单';
                        that.spaceTitle2 = '完成付款';
                        that.spaceTitle3 = '提交退款';
                        that.spaceTitle4 = '完成退款';
                        that.orderTime1 = data.data.placeOrderTime || '';
                        that.orderTime2 = data.data.defrayTime || '';
                        that.orderTime3 = data.data.applyforRefundsTime || '';
                        that.numMoney = data.data.realPrice || '0';
                        if (data.data.denyRefundsTime) {
                            that.orderTime4 = data.data.denyRefundsTime || '';
                            that.spaceTitle4 = '拒绝退款';
                        } else {
                            that.orderTime4 = data.data.confirmRefundsTime || '';
                            that.spaceTitle4 = '完成退款';
                        }
                    } else if (data.data.orderStatus == '7') {
                        //that.isClose = true;
                        that.spaceTitle1 = '提交订单';
                        that.spaceTitle2 = '已 关 闭';
                        that.orderTime1 = data.data.placeOrderTime || '';
                        that.orderTime2 = data.data.closeTime || '';
                        that.numMoney = data.data.realPrice || '0';
                    } else if (data.data.orderStatus == '12' || data.data.orderStatus == '15') {
                        //that.isClose = true;
                        that.isrefund = true;
                        if (data.data.applyforCompleteTime) {
                            that.spaceTitle1 = '提交订单';
                            that.spaceTitle2 = '完成付款';
                            that.spaceTitle3 = '已 关 闭';
                            that.orderTime1 = response.data.data.placeOrderTime || '';
                            that.orderTime2 = response.data.data.defrayTime || '';
                            that.orderTime3 = response.data.data.closeTime || '';
                        } else {
                            that.spaceTitle1 = '提交订单';
                            that.spaceTitle2 = '完成付款';
                            that.spaceTitle3 = '服 务 中';
                            that.spaceTitle4 = '已 关 闭';
                            that.orderTime1 = data.data.placeOrderTime || '';
                            that.orderTime2 = data.data.defrayTime || '';
                            that.orderTime3 = data.data.applyforCompleteTime || '';
                            that.orderTime4 = data.data.closeTime || '';
                        }
                        that.numMoney = data.data.realPrice || '0';
                        //that.numMoneyTui = data.data.refundsAmount || '0';
                    } else {
                        that.spaceTitle1 = '提交订单';
                        that.spaceTitle2 = '完成付款';
                        that.spaceTitle3 = '服 务 中';
                        that.spaceTitle4 = '已 完 成';
                        that.orderTime1 = data.data.placeOrderTime || '';
                        that.orderTime2 = data.data.defrayTime || '';
                        that.orderTime3 = data.data.applyforCompleteTime || '';
                        that.orderTime4 = data.data.confirmTime || '';
                        that.numMoney = data.data.realPrice || '0';
                    }
                    if (that.orderTime1 == '' && that.orderTime2 == '' && that.orderTime3 == '' && that.orderTime4 == '') {
                        that.orderActive = 0;
                    } else if (that.orderTime1 != '' && that.orderTime2 == '' && that.orderTime3 == '' && that.orderTime4 == '') {
                        that.orderActive = 1;
                    } else if (that.orderTime1 != '' && that.orderTime2 != '' && that.orderTime3 == '' && that.orderTime4 == '') {
                        that.orderActive = 2;
                    } else if (that.orderTime1 != '' && that.orderTime2 != '' && that.orderTime3 != '' && that.orderTime4 == '') {
                        that.orderActive = 3;
                    } else if (that.orderTime1 != '' && that.orderTime2 != '' && that.orderTime3 != '' && that.orderTime4 != '') {
                        that.orderActive = 4;
                    }
                    that.orderNumber = data.data.orderNumber || '无';
                    that.placeOrderTime = data.data.placeOrderTime || '';
                    that.defrayNumber = data.data.defrayNumber || '无';
                    that.defrayTime = data.data.defrayTime || '';
                    that.nickname = data.data.nickname || '无';
                    that.contactNumber = data.data.contactNumber || '无';
                    that.email = data.data.email || '无';
                    that.remark = data.data.remark || '无';
                    that.numMoneyTui = data.data.refundsAmount || '';
                    that.refundsReason = data.data.refundsReason || '';
                    that.closeType = data.data.closeType || '';
                    //服务商品信息
                    that.tableData[0].name = data.data.commodityName;
                    that.tableData[0].money = data.data.unitPrice || '0';
                    that.tableData[0].number = data.data.quantity || '0';
                    that.tableData[0].amount = data.data.realPrice || '0';
                    let preferentialMoney = data.data.preferentialMoney || 0;
                    let returnPreferentialMoney = data.data.returnPreferentialMoney || 0;
                    that.tableData[0].activity = preferentialMoney + returnPreferentialMoney;
                    that.tableData[0].commission = data.data.commission || '0';
                    that.tableData[0].bond = data.data.bail || '0';
                    that.tableData[0].service = data.data.fee || '0';
                    //发票
                    that.invoice();
                } else {
                    that.merchandetails = false;
                    that.$message.warning(data.msg);
                }
            }).catch(function(err) {
                that.merchandetails = false;
            });
    },
    methods: {
        invoice() {
            let item = {
                orderid: this.orderid
            }
            var that = this;
            this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/invoice/getOrderInvoice`, {}, { params: item })
                .then(({ data }) => {
                    if (data.status == 200) {
                        that.taxNumber = data.data.taxNumber || '暂无';
                        that.invoiceName = data.data.invoiceName || '暂无';
                        that.price = data.data.price || '0';
                    } else {
                        that.$message.warning(data.msg);
                    }
                }).catch(function(err) {
                });
        },
        isRead() {
            let item = {
                id: this.orderid
            }
            var that = this;
            this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/orderform/isRead`, {}, { params: item })
                .then(({ data }) => {
                    if (data.status == 200) {
                        //console.log(data.data.value)
                    } else {
                        that.$message.warning(data.msg);
                    }
                }).catch(function(err) {
                });
        },
        //金钱格式
        formatterMoney(row, column) {
            return this.moneys(row.money);
        },
        formatterAmount(row, column) {
            return this.moneys(row.amount);
        },
        formatterActivity(row, column) {
            return this.moneys(row.activity);
        },
        formatterCommission(row, column) {
            return this.moneys(row.commission);
        },
        formatterBond(row, column) {
            return this.moneys(row.bond);
        },
        formatterService(row, column) {
            return this.moneys(row.service);
        },
        moneys(val) {
            var val = val.toString().replace(/\$|\,/g, '');
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
            return '￥' + (((sign) ? '' : '-') + val + '.' + cents);
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

.space_box {
    margin: 30px 0;
    font-size: 14px;
}

.cb_top {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: 600;
}

.cb_lists {
    width: 100%;
    height: auto;
    overflow: hidden;
}

.cb_list {
    width: 98%;
    height: auto;
    margin: 0 auto;
    overflow: hidden;
    font-size: 14px;
    line-height: 30px;
    text-align: left;
}

.cb_list li {
    float: left;
    color: #666;
    width: 50%;
    line-height: 30px;
    overflow: hidden;
    box-sizing: border-box;
    padding-right: 20px;
}

.total {
    width: 100%;
    height: auto;
    text-align: right;
    line-height: 40px;
    font-size: 14px;
    border: 1px solid #eef1f6;
    border-top: 0;
    box-sizing: border-box;
    padding-right: 10px;
}

.total_tit {
    line-height: 20px;
    font-size: 12px;
    margin-bottom: 10px;
    color: red;
}

.total span {
    color: red;
    font-weight: 600;
}

.cb_bottom {
    width: 100%;
    height: 50px;
    font-size: 14px;
    line-height: 50px;
}

.cb_bottom_yy {
    width: 100%;
    height: auto;
    font-size: 14px;
    line-height: 30px;
}

.cb_bottom .cb_s {
    float: left;
    width: 33.3%;
    height: 50px;
    text-align: left;
}
</style>

