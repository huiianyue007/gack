<template>
    <div>
        <div class="search">
            <el-form :inline="true" :model="search" class="demo-form-inline">
                <el-form-item label="所属类别">
                    <el-select v-model="search.category" placeholder="请选择" style="wodth:180px;">
                        <el-option v-for="item in search.classOptions" :key="item.id" :label="item.serverName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input v-model="search.name" style="width:180px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" icon="search">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="comJump" class="add">新增商品</el-button>
        </div>
        <div v-loading="loadingTab">
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @select-all='selectBox' @select='selectBox'>
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="commodityCode" label="商品编号" width="120" align="center">
                </el-table-column>
                <el-table-column label="商品名称" align="center">
                    <template slot-scope="scope">
                        <img :src="scope.row.commodity_smallimage" width="60" height="60" class="sale_img">
                        <p class="sale_name">{{scope.row.commodityName}}</p>
                        <p class="sale_class">{{scope.row.serverName}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="finalPrice" label="价  格" width="100" align="center">
                </el-table-column>
                <el-table-column prop="auditOpinion" label="违规原因" align="center">
                </el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <!--<el-button size="small" @click='handleEdit(scope.$index,scope.row)'>编辑</el-button>-->
                        <el-button size="small" @click='editRouter(scope.row.id)'>编辑</el-button>
                        <el-button size="small" type="primary" @click="handleDel(scope.$index,scope.row,scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="other">
                <el-button type="primary" style="float:left" @click="batchRemove" :disabled="isbatchRemove">批量删除</el-button>
                <p style="float:right;">违规的服务商品项目: {{offendNum}} </p>
            </div>
            <div class="page">
                <el-pagination @size-change="handleSizeChange" style="float:right;" @current-change="handleCurrentChange" :page-size='pagesize' :current-page="currentPage" layout="prev, pager, next" :total="totalCount">
                </el-pagination>
            </div>
        </div>

    </div>
</template>
<script>
import moment from 'moment'

export default {

    data() {
        return {
            businessid: '',
            loadingTab: false,
            tableData: [],
            // 违规项目数
            offendNum: 0,
            // 批量删除状态
            isbatchRemove: true,
            delID: [],
            //****分页组件***
            //默认每页数据量
            pagesize: 10,
            //默认高亮行数据id
            //highlightId: -1,
            //当前页码
            currentPage: 1,
            //查询的页码
            start: 1,
            //默认数据总数
            totalCount: 0,

            editLoading: false,
            // 搜索
            search: {
                category: '',
                name: '',
                classOptions: [],
            }

        }
    },
    created() {
        let businessid = this.$store.state.business;
        if (businessid) {
            this.businessid = businessid;
            this.init();//初始化数据
            this.initService();
        }
    },
    methods: {
        init() {
            this.loadingTab = true;
            var that = this;

            var reg = {
                page: that.currentPage - 1,
                size: that.pagesize,
                commodityState: 5,
                businessID: this.businessid

            }
            this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/commodity/findCommdity', {}, {
                params: reg
            }).then(({ data }) => {

                if (data.status === 200) {
                    //获取未读数据
                    var num1 = '';
                    var num2 = '';

                    var readList = data.data.readList
                    for (var i = 0; i < readList.length; i++) {
                        var element = readList[i];
                        if (element.commodityState == 3) {
                            num1 = element.readNumber
                        }
                        if (element.commodityState == 5) {
                            num2 = element.readNumber
                        }
                    }
                    this.$emit('getNum', [num1,num2])
                    // ---------------------
                    if (data.data.commoditys.length > 0) {//如果有数据的话，组装数据
                        that.tableData = data.data.commoditys
                        that.totalCount = data.data.total;
                        that.offendNum = data.data.total;

                    } else {
                        that.tableData = [];
                        that.totalCount = 0;
                        that.offendNum = 0;
                    }
                    that.loadingTab = false;
                }
            }).catch(function(error) {
                that.loadingTab = false;
            });

        },

        initService() {
            this.loadingTab = true;
            var that = this;
            var reg = {
                serverLevel: 2
            }
            this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/serverClass/getServerClassByServiceLevel', {}, {
                params: reg
            }).then(({ data }) => {
                if (data.status === 200) {
                    if (data.data.length > 0) {//如果有数据的话，组装数据
                        that.search.classOptions = data.data;
                    } else {

                    }
                    that.loadingTab = false;
                }
            }).catch(function(error) {
                that.loadingTab = false;
            });
        },

        // 搜索
        onSubmit() {
            var that = this;
            that.loadingTab = true;
            var reg = {
                page: that.currentPage - 1,
                size: that.pagesize,
                commodityState: 5,
                commodityName: that.search.name,
                service_type_id: that.search.category,
                businessID: this.businessid

            }
            this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/commodity/findCommdity', {}, {
                params: reg
            }).then(({ data }) => {
                if (data.status === 200) {
                    if (data.data.commoditys.length > 0) {//如果有数据的话，组装数据
                        that.tableData = data.data.commoditys
                        that.totalCount = data.data.total;
                        that.offendNum = data.data.total;
                    } else {
                        that.tableData = [];
                        that.totalCount = 0;
                        that.offendNum = 0;
                    }
                    that.loadingTab = false;
                }
            }).catch(function(error) {
                that.loadingTab = false;
            });
        },

        // 新增跳转
        comJump() {
            this.$router.push('/commodity');
            this.$store.state.adminleftnavnum='commodity';
        },
        // 分页方法
        handleSizeChange(val) {
            //pagesize改变时候触发
            this.pagesize = val;
            this.init();
        },
        handleCurrentChange(val) {
            //当前页改变时候触发
            this.currentPage = val;
            //参数1  查询条件 当前页码  当前页显示条数
            this.init();
        },
        // 删除
        handleDel(index, row, id) {
            var that = this;
            that.$confirm('确认删除吗？', '提示', {}).then(() => {
                var reg = {
                    id: id
                }
                this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/commodity/delete', {}, {
                    params: reg
                }).then(({ data }) => {
                    if (data.status === 200) {
                        that.init();

                    } else {
                        that.$message.error('删除失败！');
                    }
                }).catch(function(error) {

                });
            }).catch(() => {
                this.editLoading = false;
            })
        },
        selectBox(selection, row) {
            //遍历id拼接成字符串
            //es6 map循环
            let ids = selection.map(item => item.id).toString();

            if (ids != '') {
                this.isbatchRemove = false
            } else {
                this.isbatchRemove = true
            }
            this.delID = ids;
            console.log(this.delID)
        },
        batchRemove() {
            //需要删除的id
            var that = this;
            that.$confirm('确认删除吗？', '提示', {}).then(() => {
                var reg = {
                    ids: that.delID
                }
                this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/commodity/deleteIds', {}, {
                    params: reg
                }).then(({ data }) => {
                    if (data.status === 200) {
                        that.init();//初始化数据
                    } else {
                        that.$message.error('删除失败！');
                    }
                }).catch(function(error) {

                });
            }).catch(() => {
                this.editLoading = false;
            })
        },
        // 编辑跳转
        editRouter(comId) {
            this.$router.push('/edit');
            this.$store.state.comId = comId;

            this.$store.state.stateId = '2';
        },
    }


}
</script>
<style scoped>
.sale_img {
    float: left;
    margin: 10px 30px 10px 10px;
}

.sale_name {
    margin-top: 15px;
    line-height: 30px;
    text-align: left;
}

.sale_class {
    height: 20px;
    line-height: 20px;
    float: left;
    border-radius: 5px;
    padding: 0 5px;
    color: #c7000a;
    border: 1px solid #c7000a;
}

.other {
    margin-top: 20px;
    overflow: hidden;
}

.other p {
    float: right;
    color: #333;
    line-height: 36px;
    font-size: 14px;
    padding-right: 15px;
}

.page {
    margin: 10px;
}

.demo-form-inline {
    float: left;
}

.add {
    float: left;
}
</style>

