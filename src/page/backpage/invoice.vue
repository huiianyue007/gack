<template>
    <div class="invoice">
        <div class="crumbs">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>
                    商家管理中心</el-breadcrumb-item>
                <el-breadcrumb-item>雇主发票管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <ul class="tab_box">
            <li v-for="(item,index) in activeName" :key='index' :class="{active:isActive[index]}" @click="itemActive(item,index)">
                {{item.title}}
            </li>
        </ul>
        <div class="handle-box">
            <el-form :inline="true" :model="search" class="demo-form-inline">
                <el-form-item label="发票状态">
                    <el-select v-model="invoiceState" placeholder="活动区域" @change='orderInvoiceState(invoiceState)' style="width:120px">
                        <el-option v-for="(item,index) in activeName" :key='index' :label="item.title" :value="item.invoiceState"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发票金额">
                    <el-input v-model="search.startMoney" :maxlength="12" placeholder="金额" style="width:80px"></el-input>
                    <span>-</span>
                    <el-input v-model="search.endMoney" :maxlength="12" placeholder="金额" style="width:80px"></el-input>
                </el-form-item>
                <!-- <el-form-item label="订单编号">
                    <el-input v-model="search.number" :maxlength="12" placeholder="订单编号" style="width:120px"></el-input>
                </el-form-item> -->
                <el-form-item label="商品名称">
                    <el-input v-model="search.name" :maxlength="12" placeholder="商品名称" style="width:120px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" icon="search">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_box" v-loading="loadingTab">
            <el-table :data="tableData.list" border style="width: 100%">
                <el-table-column prop="orderNumber" label="订单编号" align='center'>
                </el-table-column>
                <el-table-column prop="placeOrderTime" label="下单时间" :formatter='dateFormat' min-width="100" align='center'>
                </el-table-column>
                <el-table-column prop="commodityName" label="商品名称" align='center'>
                </el-table-column>
                <el-table-column prop="realPrice" label="开票金额" :formatter='formatterMoney' min-width="60" align='center'>
                </el-table-column>
                <el-table-column prop="quantity" label="数量" min-width="60" align='center'>
                </el-table-column>
                <el-table-column prop="invoiceState" label="开票信息" :formatter='invoiceStateFormat' align='center'>
                </el-table-column>
                <el-table-column prop="invoiceMail" label="配送方式" :formatter='invoiceMailFormat' align='center'>
                </el-table-column>
                <el-table-column label="操作" width="220" align='center'>
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="seeInvoice(scope.$index,scope.row)">查看发票</el-button>
                        <!-- <el-button type="text" size="small" v-if="scope.row.invoiceState=='1'">已开发票</el-button> -->
                        <el-button type="primary" size="small" v-if="scope.row.invoiceState=='0'" @click="successInvoice(scope.$index,scope.row)">确认开票</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" style="float:right;margin:2px 0" @current-change="handleCurrentChange" :page-size='pagesize' :current-page="currentPage" layout="prev, pager, next" :total="totalCount">
                </el-pagination>
            </div>
        </div>
        <!--查看发票信息  -->
        <el-dialog title="发票详情" :visible.sync="dialogUse" width="30%">
            <div class="dialogUseBox">
                <div class="diag_tit">发票类型：</div>
                <div class="diag_list">{{invoices.invoiceType}}</div>
                <div class="diag_tit">发票信息：</div>
                <div class="diag_list">公司名称：{{invoices.invoiceName}}</div>
                <div class="diag_list">纳税人识别号：{{invoices.taxNumber}}</div>
                <div class="diag_list" v-if="invoiceType">注册地址：{{invoices.registeredaddress}}</div>
                <div class="diag_list" v-if="invoiceType">注册电话：{{invoices.registeredTelephone}}</div>
                <div class="diag_list" v-if="invoiceType">开户银行：{{invoices.bankName}}</div>
                <div class="diag_list" v-if="invoiceType">银行账户：{{invoices.bankNumber}}</div>
                <div class="diag_list" v-if="invoiceType">营业执照副本：<img :src='invoices.businessLicensePic'></div>
                <div class="diag_list" v-if="invoiceType">一般纳税人资格证明：<img :src='invoices.businessPic'></div>
            </div>

        </el-dialog>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    data() {
        return {
            loadingTab: false,
            activeName: [
                {
                    title: '所有发票',
                    invoiceState: ''
                },
                {
                    title: '待开发票',
                    invoiceState: '0'
                },
                {
                    title: '已开发票',
                    invoiceState: '1'
                }
            ],
            invoiceState: '',
            isActive: [true],
            search: {
                startMoney: '',
                endMoney: '',
                number: '',
                name: '',
            },
            tableData: {
                list: []
            },
            //确认信息弹框
            dialogUse: false,
            invoices: {},
            invoiceType: false,
            //默认每页数据量
            pagesize: 10,
            //当前页码
            currentPage: 1,
            //默认数据总数
            totalCount: 10,
            nums: 0,
            //服务商ID
            businessid: ''
        }
    },
    created() {
        let businessid = this.$store.state.business;
        if (businessid) {
            this.businessid = businessid;
            this.list();
        }
    },
    methods: {
        //订单列表
        list() {
            this.loadingTab = true;
            let item = {
                invoiceState: this.invoiceState,  //发票状态0待开 1已开
                priceBegin: this.search.startMoney, //最低价
                priceEnd: this.search.endMoney,   //最高价
                orderNumber: this.search.number,
                commodityName: this.search.name,  //商品名称
                pageNumber: this.currentPage - 1,  //分页页数 ,从0开始
                pageSize: this.pagesize,   //分页每业条数
                businessid: this.businessid  //服务商id
            }
            var that = this;
            this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/orderform/findInvoiceOrderForm`, {}, { params: item })
                .then(({ data }) => {
                    if (data.status == 200) {
                        that.tableData.list = data.data.result;
                        that.totalCount = data.data.totle;
                    } else {
                        that.$message.error(data.msg);
                    }
                    that.loadingTab = false;
                }).catch(() => {
                    that.loadingTab = false;
                });
        },
        //金钱格式
        formatterMoney(row, column) {
            return '￥' + row.realPrice;
        },
        //时间格式化
        dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        },
        invoiceMailFormat(row, column) {
            return row.invoiceMail == 1 ? '包邮' : row.invoiceMail == 2 ? '货到付款' : '未知';
        },
        invoiceStateFormat(row, column) {
            return row.invoiceState == 0 ? '待开发票' : row.invoiceState == 1 ? '已经开票' : '未知';
        },
        itemActive(item, index) {
            this.isActive = [];
            this.invoiceState = item.invoiceState;
            this.$set(this.isActive, index, true);
            this.list();
        },
        seeInvoice(index, row) {
            let item = {
                orderid: row.id
            }
            var that = this;
            this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/invoice/getOrderInvoice`, {}, { params: item })
                .then(({ data }) => {
                    if (data.status == 200) {
                        that.dialogUse = true;
                        if (data.data.invoiceType == '0') {
                            data.data.invoiceType = '增值税普通发票'
                            that.invoiceType = false;
                        } else {
                            data.data.invoiceType = '增值税专用发票'
                            that.invoiceType = true;
                        }
                        that.invoices = data.data
                    } else {
                        that.$message.error(data.msg);
                    }
                }).catch(() => {
                });
        },
        //去除空格
        trim(value) {
            return value.trim();
        },
        isNum(strValue) {
            var objRegExp = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
            return objRegExp.test(this.trim(strValue));
        },
        onSubmit() {
            //查询
            let isStartMoney = this.isNum(this.search.startMoney);
            let isEndMoney = this.isNum(this.search.endMoney);
            if (!isStartMoney && this.search.startMoney != '') {
                this.$message({
                    type: 'warning',
                    message: '开始订单金额只能为数字'
                });
                return false;
            }
            if (!isEndMoney && this.search.endMoney != '') {
                this.$message({
                    type: 'warning',
                    message: '结束订单金额只能为数字'
                });
                return false;
            }
            this.currentPage = 1;
            this.list();
        },
        orderInvoiceState(status) {
            let index = 0;
            if (status == '') {
                index = 0;
            } else {
                index = Number(status) + 1;
            }
            this.isActive = [];
            this.currentPage = 1;
            this.$set(this.isActive, index, true);
            this.list();
        },
        //确认开票
        successInvoice(index, row) {
            this.$confirm('是否确认开票？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                customClass: 'orderBox'
            }).then(() => {
                this.loadingTab = true;
                let item = {
                    orderid: row.id,  //订单ID
                }
                var that = this;
                this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/orderform/givePersonalInvoice`, {}, { params: item })
                    .then(({ data }) => {
                        if (data.status == 200) {
                            if (data.data.key == 'success') {
                                that.$message.success(data.data.value);
                                that.list();
                            } else {
                                that.$message.error(data.data.value);
                            }
                        } else {
                            that.$message.error(data.msg);
                        }
                    }).catch(function(err) {
                        that.$message.error('请求错误');
                    });

            }).catch(() => {

            });
        },
        //分页
        handleSizeChange(val) {
            this.currentPage = val;
            this.list();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.list();
        }
    }
}
</script>
<style scoped>
.crumbs {
    height: auto;
    margin-top: 15px;
    width: 100%;
}

.handle-box {
    margin-top: 10px;
}

.handle-del {
    border-color: #bfcbd9;
    color: #999;
}

.tab_box {
    width: 100%;
    height: 42px;
    box-sizing: border-box;
    border-bottom: 1px solid #D1DBE5;
    margin-bottom: 15px;
    font-size: 0;
}

.tab_box li {
    padding: 0 30px;
    height: 42px;
    box-sizing: border-box;
    line-height: 42px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    color: #8391a5;
    position: relative;
    -webkit-transition: all 1s ease;
    -moz-transition: all 1s ease;
    -o-transition: all 1s ease;
    transition: all 1s ease;
}

.tab_box li span {
    display: block;
    position: absolute;
    transform: scale(0.7);
    right: 0;
    top: 0;
    width: auto;
    min-width: 20px;
    box-sizing: border-box;
    padding: 0 5px;
    height: 20px;
    border-radius: 50%;
    background: #FF4949;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    color: #fff;
}

.tab_box li:nth-of-type(1) span {
    display: none!important;
}

.tab_box li:hover {
    color: #c7000a;
    cursor: pointer;
}

.tab_box .active {
    color: #c7000a;
}

.tab_box .active:after {
    content: '';
    width: 100%;
    height: 3px;
    background: #c7000a;
    position: absolute;
    left: 0;
    bottom: 0;
}

.table_box {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-bottom: 10px;
}

.pagination {
    margin: 10px 0;
    overflow: hidden;
}

.statusSpan {
    color: #666;
    text-decoration: underline;
    font-size: 14px;
    margin: 0 5px;
    cursor: pointer;
}

.dialogUseBox .diag_tit {
    color: #4a4a4a;
    box-sizing: border-box;
    padding: 0 10px;
    font-size: 15px;
    font-weight: bold;
    border-left: 3px solid #c7000a;
    line-height: 20px;
}

.dialogUseBox .diag_list {
    color: #4a4a4a;
    box-sizing: border-box;
    padding: 0 15px;
    font-size: 14px;
    line-height: 26px;
    margin: 5px 0;
}

.dialogUseBox .invoices img {
    width: 100px;
}

.merchandise_tab {
    width: 100%;
    height: auto;
    overflow: hidden;
}
</style>
<style>
.invoice .el-dialog__body {
    padding-top: 15px;
}
</style>


