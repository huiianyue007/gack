<template>
    <div class="meInvoice">
        <div class="crumbs">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>商家管理中心</el-breadcrumb-item>
                <el-breadcrumb-item>我的发票管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="meInvoice_box" v-loading="loadingTab">
            <div class="expend_list">
                <div class="meInvoice_tit">
                    我的账户
                    <el-button type="primary" size="small" style="float:right;margin:4px 0;" @click="successInvoice">我要开发票</el-button>
                </div>
                <el-table :data="tableData.list" border style="width: 100%">
                    <el-table-column prop="invoiceMoney" align='center' :formatter='formatterinvoiceMoney' label="发票累计金额">
                    </el-table-column>
                    <el-table-column prop="payableMoney" align='center' :formatter='formatterpayableMoney' label="待开发票金额">
                    </el-table-column>
                    <el-table-column prop="invoiced" align='center' :formatter='formatterinvoiced' label="已开发票金额">
                    </el-table-column>
                </el-table>
                <div class="meInvoice_tit" style="margin-top:10px">
                    已开发票信息记录
                </div>
                <el-table :data="payableTableData.list" border style="width: 100%">
                    <el-table-column prop="billingTime" align='center' :formatter='dateFormat' label="时间">
                    </el-table-column>
                    <el-table-column prop="amountOfMoney" align='center' :formatter='formatterMoney' label="金额">
                    </el-table-column>
                    <el-table-column prop="invoiceState" :formatter='invoiceStateFormat' align='center' label="发票状态">
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <el-dialog title="选择您所开发票信息" @close='editClose' :visible.sync="dialogInvoice" width="30%">
            <div class="dialogInvoiceBox">
                <el-form :model="invoiceForm" :rules="invoicerules" ref="invoiceForm" class="demo-ruleForm">
                    <el-form-item label="发票种类：" style="margin-bottom:0">
                        <el-radio-group v-model="invoiceForm.resource">
                            <el-radio label="1">增值税专用发票</el-radio>
                            <el-radio label="0">增值税普通发票</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="所开发票金额：" prop="money" style="margin-bottom:10px">
                        <el-input v-model="invoiceForm.money" style="width:100%;" :placeholder="placeholderMoney"></el-input>
                    </el-form-item>
                    <el-form-item label="发票邮寄地址：" prop="address">
                        <el-input v-model="invoiceForm.address" placeholder="请填写发票邮寄地址"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogInvoice = false">取 消</el-button>
                <el-button type="primary" @click="dialogInvoiceLogin" :loading="submitLoading">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'meInvoice',
    data() {
        return {
            loadingTab: false,
            dialogInvoice: false,
            submitLoading: false,
            placeholderMoney: '您目前待开发票金额为￥0元',
            invoiceForm: {
                resource: '0',
                money: '',
                address: ''
            },
            invoicerules: {
                money: [
                    {
                        required: true,
                        message: '请输入所开发票金额',
                        trigger: 'blur'
                    }, {
                        pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
                        message: '发票金额格式不正确',
                        trigger: 'blur'
                    }
                ],
                address: [
                    {
                        required: true,
                        message: '请输入发票寄存地址',
                        trigger: 'blur'
                    },
                    {
                        pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/,
                        message: '请输入正确的寄存地址',
                        trigger: 'blur'
                    }
                ]
            },
            tableData: {
                list: [
                    {
                        invoiceMoney: '0',
                        payableMoney: '0',
                        invoiced: '0'
                    }
                ]
            },
            payableTableData: {
                list: []
            },
            //服务商ID
            businessid: '',
            //发票ID
            invoiceid: '',
        }
    },
    created: function() {
        let businessid = this.$store.state.business;
        if (businessid) {
            this.businessid = businessid;
            this.list();
        }
    },
    methods: {
        //查询
        setId() {
            let item = {
                businessid: this.businessid  //服务商id
            }
            var that = this;
            this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/invoice/findProvideInvoice`, {}, { params: item })
                .then(({ data }) => {
                    that.loadingTab = false;
                    if (data.status == 200) {
                        if (data.data.id) {
                            that.invoiceid = data.data.id;
                        }
                    } else {
                        that.$message.warning(data.msg);
                    }
                }).catch(function(err) {
                    that.loadingTab = false;
                });
        },
        list() {
            let item = {
                businessid: this.businessid
            }
            var that = this;
            this.loadingTab = true;
            this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/invoice/findInvoiceInfos`, {}, { params: item })
                .then(({ data }) => {
                    if (data.status == 200) {
                        //发票累计金额
                        that.tableData.list[0].invoiceMoney = data.data.sumAll || '0';
                        //待开发票金额
                        that.tableData.list[0].payableMoney = data.data.sumNotInvoicing || '0';
                        //已开发票金额
                        that.tableData.list[0].invoiced = data.data.sumInvoicing || '0';

                        that.payableTableData.list = data.data.result;
                    } else {
                        that.$message.warning(data.msg);
                    }
                    that.setId();
                }).catch(function(err) {
                    that.loadingTab = false;
                });
        },
        //金钱格式 
        formatterinvoiceMoney(row, column) {
            return '￥' + row.invoiceMoney;
        },
        formatterpayableMoney(row, column) {
            return '￥' + row.payableMoney;
        },
        formatterinvoiced(row, column) {
            return '￥' + row.invoiced;
        },
        formatterMoney(row, column) {
            return '￥' + row.amountOfMoney;
        },
        invoiceStateFormat(row, column) {
            return row.invoiceState == 0 ? '已提交' : row.invoiceState == 1 ? '已开票' : '未知';
        },
        //时间格式化  
        dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        },
        successInvoice() {
            if (this.invoiceid) {
                this.dialogInvoice = true;
                let money = this.tableData.list[0].payableMoney;
                this.placeholderMoney = '您目前待开发票金额为￥' + money + '元';
            } else {
                this.$message.warning('请先填写发票信息');
            }
        },
        editClose() {
            this.$refs.invoiceForm.resetFields();
        },
        dialogInvoiceLogin() {
            this.$refs.invoiceForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    let item = {
                        invoiceid: this.invoiceid,
                        invoiceType: this.invoiceForm.resource, //发票类型  0为增值税普通发票    1为增值税专用发票
                        amountOfMoney: this.invoiceForm.money, //开票金额
                        mailingAddress: this.invoiceForm.address   //邮寄地址
                    }
                    var that = this;
                    this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/invoice/createProvideInvoiceInfo`, {}, { params: item })
                        .then(({ data }) => {
                            that.dialogInvoice = false;
                            if (data.status == 200) {
                                if (data.data.key == 'success') {
                                    that.$message.success(data.data.value);
                                    that.list();
                                } else {
                                    that.$message.warning(data.data.value);
                                }
                            } else {
                                that.$message.warning(data.msg);
                            }
                            that.submitLoading = false;
                        }).catch(({ data }) => {
                            that.$message.warning(data.data.value);
                            that.dialogInvoice = false;
                            that.submitLoading = false;
                        });
                }
            })


            // let money = this.tableData.list[0].payableMoney;
            // if (parseInt(money) < 555) {
            //     this.$message.warning('开取发票最低金额为￥555.00元，不可低于此金额');
            // }
        }
    },
    watch: {

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

.meInvoice_box {
    width: 100%;
    height: auto;
    overflow: hidden;
}

.meInvoice_tit {
    width: 100%;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    font-weight: 600;
    box-sizing: border-box;
    color: #4a4a4a;
}

.meInvoice_tit:before {
    content: '|';
    color: #c7000a;
    font-weight: bold;
    height: 36px;
    float: left;
    padding-right: 10px;
    line-height: 34px;
}

.expend_list {
    width: 100%;
    height: auto;
    overflow: hidden;
}

.expend_top {
    font-size: 16px;
    font-weight: 600;
    width: 100%;
    height: 20px;
    margin: 8px 0;
    color: #333;
    line-height: 20px;
}

.expend_center {
    width: 100%;
    height: auto;
    overflow: hidden;
}

.dialogInvoice {
    width: 100%;
}

.dialogInvoice {
    width: 100%;
    height: auto;
    overflow: hidden;
}
</style>

<style>
.meInvoice .el-dialog__body {
    padding: 20px;
    padding-bottom: 0;
}
</style>
