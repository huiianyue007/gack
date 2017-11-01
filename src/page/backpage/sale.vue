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
                <el-table-column prop="salesVolume" label="销 量" width="100" align="center">
                </el-table-column>
                <el-table-column label="商品库存" width="100" align="center">
                    <template slot-scope="scope">
                        {{scope.row.stock}}
                    </template>
                </el-table-column>
                <el-table-column prop="releaseTime" label="发布时间" width="120" :formatter='dateFormat' align="center">
                </el-table-column>
                <el-table-column label="操作" width="170" align="center">
                    <template slot-scope="scope">
                        <el-button size="small" @click='dialogBlocklock(scope.$index,scope.row,scope.row.stock,scope.row.id)'>修改库存</el-button>
                        <el-button size="small" @click='shelf(scope.$index,scope.row,scope.row.id)' type="primary">下架</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="other">
                <el-button type="primary" style="float:left" @click="batchShelf" :disabled="isbatchShelf">批量下架</el-button>
                <p style="float:right;">出售中的服务商品项目: {{saleNum}} </p>
            </div>
            <div class="page">
                <el-pagination @size-change="handleSizeChange" style="float:right;" @current-change="handleCurrentChange" :page-size='pagesize' :current-page="currentPage" layout="prev, pager, next" :total="totalCount">
                </el-pagination>
            </div>
        </div>

        <!--修改库存-->
        <el-dialog title="修改库存" :visible.sync="editFormStock" size="tiny" top='25%' @close='delClose' :close-on-click-modal="false">
            <el-form :model="editForm" :rules="editRules" ref="editForm">
                <el-form-item label="服务商品库存量：">
                    <span>{{editForm.oldStock}}</span>
                </el-form-item>
                <el-form-item label="商品修改库存量：" prop="newStock" style="margin-bottom:0">
                    <el-input v-model="editForm.newStock"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormStock = false">取 消</el-button>
                <el-button type="primary" @click="modifyInventory">确 定</el-button>
            </div>
        </el-dialog>
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
            // 修改库存
            editFormStock: false,
            editForm: {
                oldStock: 0,
                newStock: 0,
                id: null
            },
            editRules: {
                newStock: [
                    {
                        required: true,
                        message: '请输入修改库存量',
                        trigger: 'blur'
                    }, {
                        pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
                        message: '库存量格式不正确',
                        trigger: 'blur'
                    }
                ]
            },
            // 出售中项目数
            saleNum: 0,
            // 批量下架状态
            isbatchShelf: true,
            shelfId: [],
            //****分页组件***
            //默认每页数据量
            pagesize: 10,
            //当前页码
            currentPage: 1,
            //查询的页码
            start: 1,
            //默认数据总数
            totalCount: 0,
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
                commodityState: 2,
                businessID: this.businessid
            }
            this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/commodity/findCommdity', {}, {
                params: reg
            }).then(({ data }) => {
                if (data.status === 200) {
                    //获取未读数据
                    var num1='';
                    var num2='';

                    var readList=data.data.readList
                    for (var i = 0; i < readList.length; i++) {
                        var element = readList[i];
                        if(element.commodityState==3){
                            num1=element.readNumber
                        }
                        if(element.commodityState==5){
                            num2=element.readNumber
                        }
                    }
                    this.$emit('getNum', [num1,num2])
                    // ---------------------

                    if (data.data.commoditys.length > 0) {//如果有数据的话，组装数据
                        that.tableData = data.data.commoditys
                        for (var i = 0; i < that.tableData.length; i++) {
                            if (that.tableData[i].stock == null || that.tableData[i].stock == ' ') {
                                that.tableData[i].stock = 0
                            }
                        }
                        that.totalCount = data.data.total;
                        that.saleNum = data.data.total;
                    } else {
                        that.tableData = [];
                        that.totalCount = 0;
                        that.saleNum = 0;
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
        delClose(){
            this.$refs.editForm.resetFields();
        },
        // 搜索
        onSubmit() {
            this.loadingTab = true;
            var that = this;
            var reg = {
                page: that.currentPage - 1,
                size: that.pagesize,
                commodityState: 2,
                service_type_id: that.search.category,
                commodityName: that.search.name,
                businessID: this.businessid
            }
            this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/commodity/findCommdity', {}, {
                params: reg
            }).then(({ data }) => {
                if (data.status === 200) {
                    if (data.data.commoditys.length > 0) {//如果有数据的话，组装数据
                        that.tableData = data.data.commoditys
                        that.totalCount = data.data.total;
                        that.saleNum = data.data.total;
                    } else {
                        that.tableData = [];
                        that.totalCount = 0;
                        that.saleNum = 0;
                    }
                    that.loadingTab = false;
                }
            }).catch(function(error) {
                that.loadingTab = false;
            });
        },
        // 是否下架
        shelf(index, row, id) {
            this.$confirm('是否确认下架选中的商品？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var reg = {
                    ids: id,
                    state: 4, //商品状态 1:待审核 2:审核通过 3:审核失败 4:下架 5:冻结
                }

                var that = this;
                this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/commodity/updateCommditysState', {}, {
                    params: reg
                }).then(({ data }) => {
                    if (data.status == 200) {
                        that.$message({
                            type: 'success',
                            message: '下架成功!'
                        });
                        that.init();
                    }
                }).catch(function(err) {

                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消下架'
                });
            });
        },

        // 修改库存
        dialogBlocklock(index, row, stock, id) {
            this.editForm.oldStock = stock;
            this.editForm.id = id;
            this.editFormStock = true;
        },
        modifyInventory() {
            this.$refs.editForm.validate((valid) => {
                if (valid) {

                    var reg = {
                        id: this.editForm.id,
                        stock: this.editForm.newStock,
                    }

                    var that = this;
                    this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/commodity/updateCommditysStock', {}, {
                        params: reg
                    }).then(({ data }) => {
                        that.editForm.newStock = 0;
                        if (data.status == 200) {
                            that.$message.success('修改成功！');
                            that.init();
                        }
                    }).catch(function(err) {

                    });
                    this.editFormStock = false;
                } else {
                    this.$message({
                        message: '请仔细填写信息！',
                        type: 'warning'
                    });
                }
            })
        },
        // 新增跳转
        comJump() {
            this.$router.push('/commodity');
            this.$store.state.adminleftnavnum='commodity';
        },
        // 全选
        selectBox(selection, row) {
            //遍历id拼接成字符串
            //es6 map循环
            let ids = selection.map(item => item.id).toString();

            if (ids != '') {
                this.isbatchShelf = false
            } else {
                this.isbatchShelf = true
            }
            this.shelfId = ids;
        },
        batchShelf() {
            //需要下架的id
            this.$confirm('是否确认下架选中商品？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var reg = {
                    ids: this.shelfId,
                    state: 4, //商品状态 1:待审核 2:审核通过 3:审核失败 4:下架 5:冻结
                }
                var that = this;
                this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/commodity/updateCommditysState', {}, {
                    params: reg
                }).then(({ data }) => {
                    that.editForm.newStock = 0;
                    if (data.status == 200) {
                        that.$message({
                            type: 'success',
                            message: '下架成功!'
                        });
                        that.init();
                    }
                }).catch(function(err) {

                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消下架'
                });
            });
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
        dateFormat(row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
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
    border: 1px solid #c7000a;
    border-radius: 5px;
    padding: 0 5px;
    color: #c7000a;
}

.other {
    margin-top: 20px;
    overflow: hidden;
}

.other p {
    float: left;
    margin-left: 25px;
    color: #333;
    line-height: 36px;
    font-size: 14px;
    padding-right: 20px;
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

