<template>
    <div class="innovations">
        <div class="crumbs">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>商家管理中心</el-breadcrumb-item>
                <el-breadcrumb-item to="merchandise">企业创新需求管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <ul class="tab_box">
            <li v-for="(item,index) in activeName" :class="{active:isActive[index]}" @click="itemActive(item,index)">
                {{item.title}}
                <span v-if="item.num">{{item.num}}</span>
            </li>
        </ul>
        <div class="handle-box">
            <el-form :inline="true" :model="search" class="demo-form-inline">
                <el-form-item label="下单时间">
                    <el-date-picker v-model="search.stratTime" :editable='false' type="date" placeholder="日期时间" style="width:180px">
                    </el-date-picker>
                    <span>-</span>
                    <el-date-picker v-model="search.endTime" :editable='false' type="date" placeholder="日期时间" style="width:180px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item >
                    <el-input v-model="search.likeStr"  placeholder="关键字搜索" ></el-input>
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
                <el-table-column prop="enterpriseName" label="企业名称" align='center'>
                </el-table-column>
                <el-table-column prop="contactPerson" label="联系人" align='center'>
                </el-table-column>
                <el-table-column prop="position" label="职务" align='center'>
                </el-table-column>
                <el-table-column prop="contactNumber" label="联系方式" align='center'>
                </el-table-column>
                <el-table-column prop="projectIntroduction" label="项目简介" align='center'>
                </el-table-column>
                <el-table-column label="操作" width="180" align='center'>
                    <template slot-scope="scope">
                        <el-button type="primary" v-if="scope.row.states=='1'" @click="refuseQrens(scope.$index,scope.row)" size="small">确定</el-button>
                        <el-button type="text" v-if="scope.row.states=='2'" size="small">已确认</el-button>
                    </template>
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
    name: 'innovations',
    data() {
        return {
            loadingTab: false,
            search: {
                likeStr:'',
                stratTime: '',
                endTime: ''
            },
            tableData: {
                list: []
            },
            activeName: [
                {
                    title: '全部订单',
                    num: '',
                    state: ''
                },
                {
                    title: '待确认',
                    num: '',
                    state: '1'
                },
                {
                    title: '已确认',
                    num: '',
                    state: '2'
                }
            ],
            state: '',
            isActive: [true],
            //默认每页数据量
            pagesize: 10,
            //当前页码
            currentPage: 1,
            //默认数据总数
            totalCount: 10,
            businessid: ''
        }
    },
    created() {
        this.businessid = this.$store.state.business;
        // this.businessid = '';
        this.init();
    },
    methods: {
        itemActive(item, index) {
            this.isActive = [];
            this.$set(this.isActive, index, true);
            this.state = item.state;
            this.init();
        },
        init() {
            this.loadingTab = true;
            let stratTime = '';
            let endTime = '';
            if (this.search.stratTime) {
                stratTime = moment(this.search.stratTime).format("YYYY-MM-DD HH:mm:ss");
            }
            if (this.search.endTime) {
                endTime = moment(this.search.endTime).format("YYYY-MM-DD HH:mm:ss");
            }
            let item = {
                state: this.state,  //订单状态1待支付  2待接单  3服务中  4待确认   5退款处理中   6已完成   7已关闭
                beginTime: stratTime,  //最早下单时间
                endTime: endTime,  //最晚下单时间
                userid: '',
                likeStr: this.search.likeStr,
                businessid: this.businessid,  //服务商id
                pageNumber: this.currentPage - 1,  //分页页数 ,从0开始
                pageSize: this.pagesize,   //分页每业条数
            }
            var that = this;
            this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/demandDocking/findByProperties`, {}, {
                params: item
            }).then(({ data }) => {
                if (data.status == 200) {
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
        refuseQrens(index, row) {
            this.$confirm('是否确认？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                customClass: 'orderBox',
                type: 'warning'
            }).then(() => {
                let item = {
                    id: row.id
                }
                var that = this;
                this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/demandDocking/confirmDemandDocking`, {}, {
                    params: item
                }).then(({ data }) => {
                    if (data.status == 200) {
                        that.init();
                        that.$message.success('确认成功');
                    } else {
                        that.$message.warning(data.msg);
                    }
                }).catch(() => {
                })
            })
        },
        onSubmit() {
            this.init();
        },
        handleSizeChange(val) {
            this.currentPage = val;
            this.init();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.init();
        }
    }
}

</script>
<style  scoped>
.crumbs {
    height: auto;
    margin-top: 15px;
    width: 100%;
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
</style>

