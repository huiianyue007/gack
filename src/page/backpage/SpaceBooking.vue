<template>
    <div class="spaceBooking">
        <div class="dataStatistics">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>商家管理中心</el-breadcrumb-item>
                <el-breadcrumb-item>空间设置</el-breadcrumb-item>
                <el-breadcrumb-item>空间预约</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <ul class="tab_box">
            <li v-for="(item,index) in order" 
            :key="index" :class="i == index?'active':''" @click="Order(index)">
                {{item.title}}
            </li>
        </ul>
        <div class="handle-box">
            <el-form :inline="true" :model="search" class="demo-form-inline">
                <el-form-item label="时间筛选">
                    <el-date-picker v-model="search.beginTime" :editable='false' @change='compareTime' type="date" placeholder="日期时间" style="width:120px">
                    </el-date-picker>
                    <span>-</span>
                    <el-date-picker v-model="search.endTime" :editable='false' @change='compareTime' type="date" placeholder="日期时间" style="width:120px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="search.likeStr" :maxlength="12" placeholder="请输入预约空间、联系人、备注信息关键字" style="margin-left:120px;width:300px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" icon="search">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="spaceBooking-table">
            <el-table :data="tableData" style="width: 100%" border v-loading="loadingTab">
                <el-table-column prop="reserveTime" label="参观时间" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.reserveTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="roomName" label="预约空间" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.roomName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="contactPerson" label="联系人" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.contactPerson }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="contactNumber" label="电话" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.contactNumber }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="reserveAmount" label="参与人数" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.reserveAmount }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注信息" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.remark }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="isOk(scope.$index, scope.row)" v-if="scope.row.state == '0'">确认</el-button>
                        <el-button type="text" size="small" v-else>已确认</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination layout="prev, pager, next" :current-page="search.num" :total="total"
                 @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loadingTab: false,
            i: 0,
            order: [{ title: '全部预约' }, { title: '待预约' }, { title: '已预约' }],
            tableData: [],
            //总页数
            total: 0,
            //后台需要的参数搜索
            search: {
                beginTime: '',
                endTime: '',
                likeStr: '',
                businessid: '',
                num: 1,//当前页
                page: 5,//显示几挑
                userid: '',
            }
        }
    },
    methods: {
        //tab切换渲染数据
        Order(index) {
            this.loadingTab = true;
            if (index !== undefined) {
                this.i = index;
                //清空
                this.search.beginTime = '';
                this.search.endTime = '';
                this.search.likeStr = '';
            }
            var State;
            if (this.i == 0) {
                State = '';
            } else if (this.i == 1) {
                State = '0';
            } else if (this.i == 2) {
                State = '1';
            }
            //后台需要参数
            var json = {
                beginTime: this.search.beginTime,//参观起始时间
                endTime: this.search.endTime,//参观结束时间
                likeStr: this.search.likeStr,//关键字：模糊查询 联系人，空间名，备注信息
                state: State,//String类型,0为未预约  1为已预约
                businessid: this.search.businessid,//服务商id
                pageNumber: this.search.num -1,//int类型，页数，从0开始
                pageSize: this.search.page,//int类型，每页条数
                userid: ''//String类型，用户id
            }
            var that = this;
            this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/orderform/findSpaceReserve', {}, {
                params: json
            }).then(({ data }) => {
                
                if (data.status === 200) {
                    this.loadingTab = false;
                    that.tableData = data.data.result;
                    that.total = data.data.totle * 10 / that.search.page;
                } else {
                    this.loadingTab = false;
                    that.$message.warning(response.data.msg);
                }
            }).catch(function(err) {

            });
            

        },
        //查询
        onSubmit() {
            this.Order();
        },
        //页数
        handleCurrentChange(val) {
            this.search.num = val;
            this.Order();
        },
        //确认
        isOk(index, ok) {
            var that = this;
           this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/orderform/overReserve' + '?id=' + ok.id)
                .then(({ data }) => {
                    if (data.status === 200) {
                        that.Order();
                    } else {
                        that.$message.error(response.data.msg);
                    }
                }).catch(function(err) {
                });
        },
        compareTime() {
            if (this.search.beginTime && this.search.endTime) {
                let compare = this.search.beginTime > this.search.endTime
                if (compare) {
                    this.$message({
                        type: 'warning',
                        message: '起始时间不能晚于结束时间'
                    })
                }
            }
        }


    },
    created() {
        let businessid = this.$store.state.business;
        if (businessid) {
            this.search.businessid = businessid;
            this.Order(0);
        }

    }
}
</script>

<style scoped>
.dataStatistics {
    height: auto;
    margin: 15px 0;
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

.active {
    color: #c7000a!important;
}

.active:after {
    content: '';
    width: 100%;
    height: 3px;
    background: #c7000a;
    position: absolute;
    left: 0;
    bottom: 0;
}

.block {
    margin-top: 50px;
    float: right;
}
</style>
<style>

</style>