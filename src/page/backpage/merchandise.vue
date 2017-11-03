<template>
    <div class="merchandise">
        <div class="crumbs">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>
                    商家管理中心</el-breadcrumb-item>
                <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <ul class="tab_box">
            <li v-for="(item,index) in activeName" :class="{active:isActive[index]}" @click="itemActive(item,index)">
                {{item.title}}
                <span>{{item.num}}</span>
            </li>
        </ul>
        <div class="handle-box">
            <el-form :inline="true" :model="search" class="demo-form-inline">
                <el-form-item label="交易状态">
                    <el-select v-model="orderStatus" placeholder="活动区域" style="width:120px" @change='orderStatusChange(orderStatus)'>
                        <el-option v-for="(item,index) in activeName" :key='index' :label="item.title" :value="item.orderStatus"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="下单时间">
                    <el-date-picker v-model="search.stratTime" :editable='false' type="date" placeholder="日期时间" style="width:120px">
                    </el-date-picker>
                    <span>-</span>
                    <el-date-picker v-model="search.endTime" :editable='false' type="date" placeholder="日期时间" style="width:120px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="订单金额">
                    <el-input v-model="search.startMoney" :maxlength="12" placeholder="金额" style="width:60px"></el-input>
                    <span>-</span>
                    <el-input v-model="search.endMoney" :maxlength="12" placeholder="金额" style="width:60px"></el-input>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input v-model="search.name" :maxlength="12" placeholder="商品名称" style="width:100px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" icon="search">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_box" v-loading="loadingTab">
            <el-table :data="tableData.list" border style="width: 100%" @cell-click='handleStatus'>
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="订单备注：" style="margin-bottom:0">
                                <span>{{ props.row.requirementDescription }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column prop="orderNumber" label="订单编号" min-width="120" align='center'>
                    <!-- <template slot-scope="scope">
                                                                                        <p v-if="scope.row.isRead==0">
                                                                                            <span style="color:#c7000a"> * </span>{{scope.row.orderNumber}}</p>
                                                                                        <p v-else>{{scope.row.orderNumber}}</p>
                                                                                    </template> -->
                </el-table-column>
                <el-table-column prop="placeOrderTime" label="下单时间" width="160" :formatter='dateFormat' align='center'>
                </el-table-column>
                <el-table-column prop="commodityName" label="商品名称" show-overflow-tooltip align='center'>
                </el-table-column>
                <el-table-column prop="unitPrice" label="单价" min-width="60" :formatter='formatterUnitPrice' align='center'>
                </el-table-column>
                <el-table-column prop="quantity" label="数量" min-width="60" align='center'>
                </el-table-column>
                <el-table-column prop="username" align="center" label="雇主">
                    <template slot-scope="scope">
                        <p @click='handleEmployer(scope.$index,scope.row)' style="font-size:14px;text-decoration:underline;cursor:pointer;">{{scope.row.username}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="realPrice" label="订单实际金额" width="120" :formatter='formatterRealPrice' align='center'>
                </el-table-column>
                <el-table-column prop="orderStatus" label="交易状态" align='center' :formatter='formatStatus' class-name="statusTab">
                </el-table-column>
                <el-table-column label="订单操作" min-width="160px" align='center'>
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" v-if="scope.row.orderStatus=='14'" @click="editOrder(scope.$index,scope.row)">修改价格</el-button>
                        <el-button size="small" v-if="scope.row.orderStatus=='14'" @click="delOrder(scope.$index,scope.row)">关闭订单</el-button>
                        <el-button type="primary" size="small" v-if="scope.row.orderStatus=='2'" @click="successOrder(scope.$index,scope.row)">确认接单</el-button>
                        <el-button type="primary" size="small" v-if="scope.row.orderStatus=='3'" @click="completeService(scope.$index,scope.row)">完成服务</el-button>
                        <el-button type="text" size="small" v-if="scope.row.orderStatus=='4'">等待雇主确认</el-button>
                        <el-button type="primary" size="small" v-if="scope.row.orderStatus=='5'" @click="confirmRefund(scope.$index,scope.row)">确认退款</el-button>
                        <el-button size="small" v-if="scope.row.orderStatus=='5'" @click="refuseRefund(scope.$index,scope.row)">拒绝退款</el-button>
                        <el-button type="text" size="small" v-if="scope.row.orderStatus=='9' || scope.row.orderStatus=='10'">退款处理中</el-button>
                        <el-button type="text" size="small" v-if="scope.row.orderStatus=='1'">待支付</el-button>
                        <el-button type="text" size="small" v-if="scope.row.orderStatus=='6' || scope.row.orderStatus=='13'">已完成</el-button>
                        <el-button type="text" size="small" v-if="scope.row.orderStatus=='8'">已完成退款</el-button>
                        <el-button type="text" size="small" v-if="scope.row.orderStatus=='7' || scope.row.orderStatus=='11' || scope.row.orderStatus=='12' || scope.row.orderStatus=='15'">已关闭</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" style="float:right;margin:2px 0" @current-change="handleCurrentChange" :page-size='pagesize' :current-page="currentPage" layout="prev, pager, next" :total="totalCount">
                </el-pagination>
            </div>
        </div>

        <el-dialog title="用户信息" :visible.sync="dialogUse" size="tiny">
            <div class="dialogUseBox">
                <p>用户昵称：{{use.name}}</p>
                <p>联系方式：{{use.phone}}</p>
                <p>用户邮箱：{{use.mail}}</p>
                <!-- <p>用户地址：{{use.address}}</p> -->
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogUse = false">取 消</el-button>
                <el-button type="primary" @click="dialogUse = false">确 定</el-button>
            </span>
        </el-dialog>
        <!--修改价格-->
        <el-dialog title="修改价格" v-model="editFormMoney" size="tiny" @close='editClose' top='25%' :close-on-click-modal="false">
            <el-form :model="editForm" label-width="130px" :rules="editRules" ref="editForm" style="padding:0 20px">
                <el-form-item label="服务商品单价：">
                    <span>{{editForm.oddMoney}}</span>
                </el-form-item>
                <el-form-item label="商品修改价格：" :show-message='showEditForm' prop="newMoney" style="margin-bottom:0">
                    <el-input v-model="editForm.newMoney"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDel">取消</el-button>
                <el-button type="primary" @click='submitEdit'>确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import moment from 'moment'
import $ from 'jquery'

export default {
    data() {
        return {
            activeName: [
                {
                    title: '所有订单',
                    num: '',
                    orderStatus: ''
                },
                {
                    title: '待沟通',
                    num: '',
                    orderStatus: '14'
                },
                {
                    title: '待支付',
                    num: '',
                    orderStatus: '1'
                },
                {
                    title: '待接单',
                    num: '',
                    orderStatus: '2'
                },
                {
                    title: '服务中',
                    num: '',
                    orderStatus: '3'
                },
                {
                    title: '待确认',
                    num: '',
                    orderStatus: '4'
                },
                {
                    title: '退款处理中',
                    num: '',
                    orderStatus: '5'
                },
                {
                    title: '已完成',
                    num: '',
                    orderStatus: '6'
                },
                {
                    title: '已关闭',
                    num: '',
                    orderStatus: '7'
                }
            ],
            isActive: [true],
            search: {
                transaction: '',
                stratTime: '',
                endTime: '',
                startMoney: '',
                endMoney: '',
                name: ''
            },
            use: {
                name: '',
                phone: '',
                mail: '',
                address: ''
            },
            tableData: {
                list: []
            },
            //修改价格
            editFormMoney: false,
            showEditForm: true,
            editForm: {
                id: '',
                oddMoney: '',
                newMoney: ''
            },
            editRules: {
                newMoney: [
                    {
                        required: true,
                        message: '请输入修改商品价格',
                        trigger: 'blur'
                    }, {
                        pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
                        message: '商品价格格式不正确',
                        trigger: 'blur'
                    }
                ]
            },
            //用户信息弹框
            dialogUse: false,
            //默认每页数据量
            pagesize: 10,
            //当前页码
            currentPage: 1,
            //默认数据总数
            totalCount: 10,
            loadingTab: false,
            orderStatus: '',
            //服务商ID
            businessid: '',
        }
    },
    created() {
        //this.businessid = '';
        this.businessid = this.$store.state.business;
        let stateOrder = this.$store.state.stateOrder;
        if (stateOrder != '') {
            this.orderStatus = stateOrder.toString();
            this.$store.state.adminleftnavnum = 'merchandise';
            this.orderStatusChange(stateOrder);
        }
        this.orderlist();
    },
    methods: {
        //金钱格式
        formatterUnitPrice(row, column) {
            if (row.unitPrice != null) {
                if (row.orderType == '2') {
                    return '￥' + row.unitPrice + '起';
                }
                return '￥' + row.unitPrice;
            }
        },
        //金钱格式
        formatterRealPrice(row, column) {
            if (row.realPrice != null) {
                return '￥' + row.realPrice;
            }
        },
        //时间格式化
        dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        },
        //订单状态显示转换
        formatStatus(row, column) {
            //订单状态1待支付  2待接单  3服务中  4待确认   5退款处理中(用户发起退款)   6已完成   7已关闭  8退款完成  9退款处理中(商家已拒绝退款)  10退款处理中(服务商接受退款并向财务发起退款,等待财务平台处理) 11已关闭(服务商发起关闭订单,等待财务平台退款) 12已关闭(未接单发生退款并且完成了退款)  13已完成（已评价）  14议价商品待沟通
            return row.orderStatus == 1 ? '待支付' : row.orderStatus == 2 ? '待接单' : row.orderStatus == 3 ? '服务中' : row.orderStatus == 4 ? '待确认' : row.orderStatus == 5 ? '退款处理中' : row.orderStatus == 6 ? '已完成' : row.orderStatus == 7 ? '已关闭' : row.orderStatus == 8 ? '已关闭' : row.orderStatus == 9 ? '退款处理中' : row.orderStatus == 10 ? '退款处理中' : row.orderStatus == 11 ? '已关闭' : row.orderStatus == 12 ? '已关闭' : row.orderStatus == 13 ? '已完成' : row.orderStatus == 14 ? '待沟通' : row.orderStatus == 15 ? '已关闭' : '未知';
        },
        itemActive(item, index) {
            this.isActive = [];
            this.currentPage = 1;
            this.orderStatus = item.orderStatus;
            this.$set(this.isActive, index, true);
            this.unreadDis();
        },
        orderStatusChange(status) {
            let index = 0;
            if (status == '') {
                index = 0;
            } else if (status == '14') {
                index = 1;
            } else {
                index = Number(status) + 1;
            }
            this.isActive = [];
            this.currentPage = 1;
            this.$set(this.isActive, index, true);
            this.orderlist();
        },
        //顶部未读数据
        unreadData() {
            let item = {
                businessid: this.businessid  //服务商id
            }
            var that = this;
            this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/orderform/findUnread', {}, {
                params: item
            }).then(({ data }) => {
                if (data.status == 200) {
                    that.activeName[2].num = data.data.toBePaid == 0 ? '' : data.data.toBePaid;
                    that.activeName[1].num = data.data.toBeInterflow == 0 ? '' : data.data.toBeInterflow;
                    that.activeName[3].num = data.data.toBeOrders == 0 ? '' : data.data.toBeOrders;
                    that.activeName[5].num = data.data.toBeConfirmed == 0 ? '' : data.data.toBeConfirmed;
                    that.activeName[6].num = data.data.refunding == 0 ? '' : data.data.refunding;
                    that.activeName[7].num = data.data.completed == 0 ? '' : data.data.completed;
                    that.activeName[8].num = data.data.closed == 0 ? '' : data.data.closed;
                } else {
                    that.$message.warning(data.msg);
                }
            }).catch(() => {
            })
        },
        //切换变已读
        unreadDis() {
            if (this.orderStatus == '') {
                return false;
            }
            let item = {
                businessid: this.businessid,  //服务商id
                state: this.orderStatus
            }
            var that = this;
            this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/orderform/isReadAll', {}, {
                params: item
            }).then(({ data }) => {
                if (data.status == 200) {
                    that.unreadData();
                } else {
                    that.$message.warning(data.msg);
                }
            }).catch(() => {
            })
        },
        //订单列表
        orderlist() {
            this.loadingTab = true;
            let item = {
                orderStatus: this.orderStatus,  //订单状态1待支付  2待接单  3服务中  4待确认   5退款处理中   6已完成   7已关闭
                placeOrderTimeBegin: this.search.stratTime,  //最早下单时间
                placeOrderTimeEnd: this.search.endTime,  //最晚下单时间
                priceBegin: this.search.startMoney, //最低价
                priceEnd: this.search.endMoney,   //最高价
                commodityNameOrUserPhone: this.search.name,  //商品名称或者用户手机号(当输入商品名称时模糊查询,手机号精确查询)
                pageNumber: this.currentPage - 1,  //分页页数 ,从0开始
                pageSize: this.pagesize,   //分页每业条数
                businessid: this.businessid  //服务商id
            }
            var that = this;
            this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/orderform/findByProperties', {}, {
                params: item
            }).then(({ data }) => {
                if (data.status == 200) {
                    that.unreadData();
                    that.tableData.list = data.data.result;
                    that.totalCount = data.data.totle;
                } else {
                    that.$message.warning(data.msg);
                }
                that.loadingTab = false;
            }).catch((a) => {
                that.loadingTab = false;
            })
        },
        //去除空格
        trim(value) {
            return value.trim();
        },
        isNum(strValue) {
            var objRegExp = /[^\d]/g;
            return objRegExp.test(this.trim(strValue));
        },
        onSubmit() {
            //验证是否为数字
            let isStartMoney = this.isNum(this.search.startMoney);
            let isEndMoney = this.isNum(this.search.endMoney);
            if (!isStartMoney && !isEndMoney) {
                this.currentPage = 1;
                this.orderlist();
            } else {
                this.$message({
                    type: 'warning',
                    message: '订单金额只能为数字'
                });
            }
        },
        //雇主信息  172.16.32.103
        handleEmployer(index, row) {
            this.loadingTab = true;
            let item = {
                orderid: row.id
            }
            var that = this;
            this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/orderform/findOrderForm', {}, {
                params: item
            }).then(({ data }) => {
                if (data.status == 200) {
                    that.dialogUse = true;
                    that.use.name = data.data.nickname || '无';
                    that.use.phone = data.data.username || '无';
                    that.use.mail = data.data.email || '无';
                    //that.use.address=data.data.address;
                } else {
                    that.$message.warning(data.msg);
                }
                that.loadingTab = false;
            }).catch(() => {
            })
        },
        //订单详情
        handleStatus(row, column, cell, event) {
            this.$store.state.orderid = row.id;
            if (column.className == 'statusTab') {
                this.$router.push('/merchandetails');
            }
        },
        //确认订单
        successOrder(index, row) {
            this.$confirm('是否确认接单？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                customClass: 'orderBox'
            }).then(() => {
                let item = {
                    id: row.id
                }
                var that = this;
                this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/orderform/acceptOrder', {}, {
                    params: item
                }).then(({ data }) => {
                    if (data.status == 200) {
                        that.$message({
                            type: 'success',
                            message: '接单成功!'
                        });
                        that.orderlist();
                    } else {
                        that.$message.warning(data.msg);
                    }
                })
            }).catch(function(data) {
                if (data.data.data.key == 'error') {
                    that.$message.warning(data.data.data.value);
                }
            })
        },
        //关闭订单/放弃订单
        delOrder(index, row) {
            this.$confirm('是否关闭/放弃订单？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                customClass: 'orderBox',
                type: 'warning'
            }).then(() => {
                let item = {
                    id: row.id,
                    closeType: '5'
                }
                var that = this;
                this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/orderform/closeOrder', {}, {
                    params: item
                }).then(({ data }) => {
                    if (data.status == 200) {
                        that.$message.success(data.msg);
                        that.orderlist();
                    } else {
                        that.$message.warning(data.msg);
                    }
                })
            }).catch(function(data) {
                if (data.data.data.key == 'error') {
                    that.$message.warning(data.data.data.value);
                }
            })
        },
        //完成服务
        completeService(index, row) {
            this.$confirm('是否完成服务？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                customClass: 'orderBox',
                type: 'warning'
            }).then(() => {
                let item = {
                    id: row.id
                }
                var that = this;
                this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/orderform/completeServe', {}, {
                    params: item
                }).then(({ data }) => {
                    if (data.status == 200) {
                        that.$message.success(data.msg);
                        that.orderlist();
                    } else {
                        that.$message.warning(data.msg);
                    }
                }).catch(function(data) {
                    if (data.data.data.key == 'error') {
                        that.$message.warning(data.data.data.value);
                    }
                })
            })
        },
        //确认退款
        confirmRefund(index, row) {
            this.$confirm('是否确认退款？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                customClass: 'orderBox',
                type: 'warning'
            }).then(() => {
                let item = {
                    id: row.id
                }
                var that = this;
                this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/orderform/confirmRefunds', {}, {
                    params: item
                }).then(({ data }) => {
                    if (data.status == 200) {
                        that.$message.success(data.data.value);
                        that.orderlist();
                    } else {
                        that.$message.warning(data.msg);
                    }
                }).catch(function(data) {
                    if (data.data.data.key == 'error') {
                        that.$message.warning(data.data.data.value);
                    }
                })
            }).catch(e => {
            })
        },
        //拒绝退款
        refuseRefund(index, row) {
            this.$confirm('是否拒绝退款？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                customClass: 'orderBox',
                type: 'warning'
            }).then(() => {
                let item = {
                    id: row.id
                }
                var that = this;
                this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/orderform/denyRefunds', {}, {
                    params: item
                }).then(({ data }) => {
                    if (data.status == 200) {
                        that.$message.success(data.data.value);
                        that.orderlist();
                    } else {
                        that.$message.warning(data.msg);
                    }
                }).catch(() => {
                })
            })
        },
        editOrder(index, row) {
            this.editFormMoney = true;
            //this.showEditForm = false;
            this.editForm.id = row.id;
            this.editForm.oddMoney = row.unitPrice || '无';
            this.editForm.newMoney = row.realPrice;
        },
        //修改价格
        editDel() {
            this.$refs.editForm.resetFields();
            this.editFormMoney = false;
        },
        //弹框关闭回调
        editClose() {
            this.$refs.editForm.resetFields();
            //this.editFormMoney = false;
        },
        submitEdit() {
            //this.showEditForm = true;
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    let item = {
                        id: this.editForm.id,
                        price: this.editForm.newMoney
                    }
                    var that = this;
                    this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/orderform/modifyPrice', {}, {
                        params: item
                    }).then(({ data }) => {
                        if (data.status == 200) {
                            that.editFormMoney = false;
                            if (data.data.key == 'error') {
                                that.$message({
                                    message: data.data.value,
                                    type: 'warning'
                                });
                            } else {
                                that.orderlist();
                                that.$message.success(data.data.value);
                            }
                        } else {
                            that.editFormMoney = false;
                            that.$message.warning(data.msg);
                        }
                    }).catch(() => {
                    })
                }
            })
        },
        //分页
        handleSizeChange(val) {
            this.currentPage = val;
            this.orderlist();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.orderlist();
        }
    }
}


</script>
<style scoped>
p {
    font-size: 14px;
}

.crumbs {
    height: auto;
    margin: 15px 0;
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
    height: auto;
    box-sizing: border-box;
    border-bottom: 1px solid #D1DBE5;
    margin-bottom: 15px;
    font-size: 0;
}

.tab_box li {
    padding: 0 16px;
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
    transform: scale(0.8);
    right: 0;
    top: 0;
    width: auto;
    min-width: 20px;
    box-sizing: border-box;
    padding: 0;
    height: auto;
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

.dialogUseBox {
    color: #4a4a4a;
    box-sizing: border-box;
    padding: 0 10px;
    font-size: 14px;
}

.dialogUseBox p {
    line-height: 30px;
}

.merchandise_tab {
    width: 100%;
    height: auto;
    overflow: hidden;
}

.merchandise .el-button--text {
    color: #999;
}
</style>

<style>
.merchandise .el-table .cell {
    padding: 0 6px;
}

.merchandise .statusTab {
    cursor: pointer;
}

.merchandise .statusTab:after {
    content: '订单详情';
    text-decoration: underline;
    color: #999;
    font-size: 12px;
}
</style>

