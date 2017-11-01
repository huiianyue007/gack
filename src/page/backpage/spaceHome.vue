<template>
    <div class="spaceHome">
        <div class="crumbs">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>商家管理中心</el-breadcrumb-item>
                <el-breadcrumb-item>空间设置</el-breadcrumb-item>
                <el-breadcrumb-item>空间管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <ul class="tab_box">
            <li v-for="(item,index) in order" :key="index" :class="{'active': i === index}" @click="Order(index)">
                <el-badge :value="item.num" class="item">
                    {{item.title}}
                </el-badge>
            </li>
        </ul>
        <div class="handle-box">
            <el-form :inline="true" :model="search" class="demo-form-inline">
                <el-form-item label="空间名称">
                    <el-input v-model="search.name" :maxlength="12" placeholder="请输入空间名称" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" icon="search">查询</el-button>
                </el-form-item>
                <el-form-item style="margin-left:50px">
                    <el-button type="primary" @click="submit()">发布空间</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="spaceHome-table">
            <el-table :data="tableData" style="width: 100%" border v-loading="loadingTab">
                <el-table-column label="空间编号" align="center" width="100px">
                    <template slot-scope="scope">
                        <span>{{ scope.row.roomCodes }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="roomName" label="空间名称" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.roomName }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="time" label="发布时间" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.roomTime | time }}</span>
                    </template>
                </el-table-column>
                <el-table-column v-if="states == -1" label="空间状态" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.roomState | state}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="空间地址" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.address }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="审核未通过原因" v-if="states == 3" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.auditOpinion }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="违规原因" v-if="states == 5" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.violationReasons }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" v-if="states == 4" @click="open4(scope.$index, tableData)">提交</el-button>
                        <el-button type="primary" size="small" v-if="states == -1 & scope.row.roomState !== 1" @click="open1(scope.$index, tableData)">关闭</el-button>
                        <el-button type="primary" size="small" v-if="states !== -1" @click="open3(scope.$index, tableData)">编辑</el-button>
                        <el-button type="primary" size="small" v-if="states != -1" @click="open2(scope.$index, tableData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination layout="prev, pager, next" :total="count" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            businessid: '',
            //url需要的参数
            states: -1,
            //当前页
            page: 0,
            //显示条数
            size: 5,
            //总页数
            count: 0,
            order: [{ title: '发布空间', num: 0 }, { title: '审核未通过', num: 0 },
            { title: '关闭空间', num: 0 }, { title: '违规空间', num: 0 }],
            i: 0,
            search: {
                name: ''
            },
            tableData: [],
            issue: true,
            dialogVisible1: false,
            loadingTab: false,
        }
    },
    methods: {
        Order(index) {
            this.loadingTab = true;
            this.i = index;
            if (index == 0) {
                this.issue = true;
                this.states = -1;
            } else if (index == 1) {
                this.issue = false;
                this.states = 3;
            } else if (index == 2) {
                this.states = 4;
            } else if (index == 3) {
                this.states = 5;
            }
            this.search.name = '';
            var json = {
                businessId: this.businessid,
                roomState: this.states,
                page: this.page,
                size: this.size
            }
            this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/room/selectRoomKeyNameBusinessIdStauts', {}, {
                params: json
            }).then(({ data }) => {
                if (data.status == 200) {
                    this.tableData = data.data.list;
                    this.count = data.data.count * 10 / this.size;
                    if (data.data.roomUnread.length == 1) {
                        if (data.data.roomUnread[0].roomState == 3) {
                            this.order[1].num = data.data.roomUnread[0].count
                        }
                        if (data.data.roomUnread[0].roomState == 5) {

                            this.order[3].num = data.data.roomUnread[0].count
                        }
                    } else if (data.data.roomUnread.length == 2) {
                        if (data.data.roomUnread[0].roomState == 3) {
                            this.order[1].num = data.data.roomUnread[0].count
                        }
                        if (data.data.roomUnread[1].roomState == 5) {
                            this.order[3].num = data.data.roomUnread[1].count
                        }
                        if (data.data.roomUnread[0].roomState == 5) {
                            this.order[3].num = data.data.roomUnread[0].count
                        }
                        if (data.data.roomUnread[1].roomState == 3) {
                            this.order[1].num = data.data.roomUnread[1].count
                        }
                    }
                    if (index == 1) {
                        this.order[1].num = 0;
                    }
                    if (index == 3) {
                        this.order[3].num = 0;

                    }
                    this.loadingTab = false;
                } else if (data.status == 250) {
                    this.loadingTab = false;
                    this.tableData = data.data.list;
                    this.count = data.data.count * 10 / this.size;
                    this.$message.error('请求错误')
                }
            }).catch(error => {
            });


        },

        open1(index, row, n, isok, ok) {

            var json = {
                id: row[index].id,
                roomState: n || 4
            }
            var that = this;
            this.$confirm(isok || '你确定关闭该空间？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                customClass: 'orderBox'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: ok || '关闭成功！',

                });
                this.$htAjax.post("https://apitest.gack.citic:8082/guoanmaker/provide/room/closeOpenRoom", {}, {
                    params: json
                }).then(({ data }) => {
                    if (data.status == 200 && data.data == '操作成功') {
                        that.Order(that.i);
                    }
                }).catch(function(error) {
                });
            }).catch(() => {
            });
        },
        open2(index, row) {
            //删除
            this.open1(index, row, 6, '你确定删除该空间？', '删除成功！');
        },
        open3(index, row) {
            //编辑 let id = qs.stringify(res.data.data);
            let id = row[index].id;
            this.$store.state.adminleftnavnum = 'spatialPublishing';
            this.$router.push({ path: 'spatialPublishing' });
            this.$store.commit('activitycompile', id);//vuex空间编辑
        },
        submit() {
            this.$store.state.adminleftnavnum = 'spatialPublishing';
            this.$router.push({ path: 'spatialPublishing' });
        },
        open4(index, row) {
            //提交
            this.open1(index, row, 1, '你确定提交该空间？', '提交成功！');
        },
        handleCurrentChange(val) {
            //页数
            this.page = val - 1;
            this.Order(this.i);
        },
        //搜索
        onSubmit() {
            var json = {
                keyName: this.search.name,
                businessId: this.businessid,
                roomState: this.states,
                page: this.page,
                size: this.size
            }
            var that = this;
            this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/room/selectRoomKeyNameBusinessIdStauts', {}, {
                params: json
            }).then(({ data }) => {
                if (data.status == 200) {
                    that.tableData = data.data.list;
                }
            }).catch(function(error) {
            });
        }

    },
    filters: {
        time(value) {
            var Time = new Date(value)
            let m = Number(Time.getMonth()) + 1 < 10 ? '0' + (Number(Time.getMonth()) + 1) : Number(Time.getMonth()) + 1;
            let d = Time.getDate() < 10 ? '0' + Time.getDate() : Time.getDate();
            let h = Time.getHours() < 10 ? '0' + Time.getHours() : Time.getHours();
            let f = Time.getMinutes() < 10 ? '0' + Time.getMinutes() : Time.getMinutes();
            let s = Time.getSeconds() < 10 ? '0' + Time.getSeconds() : Time.getSeconds();
            return Time.getFullYear() + '-' + m + '-' + d + ' ' + h + ':' + f + ':' + s;
        },
        state(num) {
            if (num == 1) {
                return '已提交'
            } else {
                return '已发布'
            }
        }
    },
    created: function() {
        let businessid = this.$store.state.business;
        if (businessid) {
            this.businessid = businessid;
            this.Order(0);
        } else {
            this.$router.push('/');
        }
    }
}
</script>
<style scoped>
.crumbs {
    height: auto;
    margin: 15px 0;
    margin-top: 15px;
    width: 100%;
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

.block {
    margin-top: 50px;
    float: right;
}
</style>

