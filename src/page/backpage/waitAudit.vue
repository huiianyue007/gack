<template>
    <div>
        <div class="search">
            <el-form :inline="true" :model="search" class="demo-form-inline">
                <el-form-item label="所属类别">
                    <el-select v-model="search.category" placeholder="请选择" style="width:180px;">
                        <el-option v-for="item in search.classOptions" :key="item.id" :label="item.serverName" :value="item.id" @change="init">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input v-model="search.name" style="width:180px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="init" icon="search">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="comJump" class="add">新增商品</el-button>
        </div>
        <div v-loading="loadingTab">
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="commodityCode" label="商品编号" width="120" align="center">
                </el-table-column>
                <el-table-column label="商品名称" header-align="center">
                    <template slot-scope="scope">

                        <img :src="scope.row.commodity_smallimage" width="60" height="60" class="sale_img">
                        <p class="sale_name">{{scope.row.commodityName}}</p>
                        <p class="sale_class">{{scope.row.serverName}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="价  格" align="center">
                    <template slot-scope="scope">
                        <p>{{scope.row.finalPrice | price}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="examine" label="审核" align="center">
                    <template slot-scope="scope">
                        <p>等待审核</p>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="small" type="primary" @click="yulan(scope.row.id)">预览商品</el-button>
                        <el-button size="small" type="primary" @click="contact">联系平台</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="other">
                <p style="float:right">等待审核的服务商品项目: {{waitAuditNum}} </p>
            </div>
            <div class="page">
                <el-pagination @size-change="handleSizeChange" style="float:right;" @current-change="handleCurrentChange" :page-size='pagesize' :current-page="currentPage" layout="prev, pager, next" :total="totalCount">
                </el-pagination>
            </div>
        </div>

        <!--商品预览-->
        <el-dialog :visible.sync="dialogTableVisible">
            <div class="cominfo">
                <div class="img">
                    <img :src="comm.commodity_bigimage" alt="" width="150" height="150">
                </div>
                <div class="info">
                    <ul>
                        <li>{{comm.commodityName}}</li>
                        <li>{{comm.synopsis}}</li>
                        <li v-if="comm.type!='2'">价格：
                            <span style="color:#c7000a;font-size:16px;">{{comm.finalPrice}}元</span>
                        </li>
                        <li v-if="comm.type=='2' && comm.isBargaining=='1'">价格：
                            <span style="color:#c7000a;font-size:16px;">{{comm.finalPrice}}元起</span>
                        </li>
                        <li class="yprice" v-if="comm.type=='2' && comm.isBargaining=='2' && comm.isTerritoryRestriction=='2'">
                            价格：
                            <span style="font-size:16px;color:#C7000A;">{{comm.finalPrice}}</span>元
                        </li>
                        <li class="yprice" v-if="comm.type=='2' && comm.isBargaining=='2' && comm.isTerritoryRestriction=='1'">
                            价格：{{yprice}}元
                        </li>
                        <li class="ypromotion" v-if="comm.type=='2' && comm.isBargaining=='2' && comm.isTerritoryRestriction=='1'">
                            促销价格：
                            <span style="font-size:16px;color:C7000A;">{{promotionPrice}}</span>元
                        </li>
                        <li v-if="comm.type=='2' && comm.isTerritoryRestriction=='1'">
                            <span style="color:#999;font-size:14px;">地区：</span>
                            <el-select v-model="districtVal" placeholder="请选择" size="mini" @change="changeArea(districtVal)">
                                <el-option v-for="item in districtOpation" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="comdetails" v-if="comm.type=='1'">
                <p class="title">商品详情介绍</p>
                <div>
                    <p>工位类型：</p>
                    <p v-html="comm.introduce"></p>
                </div>
                <div>
                    <p>支付方式：</p>
                    <p v-html="comm.description"></p>
                </div>
                <div>
                    <p>工位介绍：</p>
                    <p v-html="comm.commodityCase"></p>
                </div>
            </div>
            <div class="comdetails" v-if="comm.type=='2'">
                <p class="title">商品详情介绍</p>
                <div>
                    <p>商品介绍：</p>
                    <p v-html="comm.description"></p>
                </div>
                <div>
                    <p>服务承诺：</p>
                    <p v-html="comm.promise"></p>
                </div>
            </div>
            <div class="comdetails" v-if="comm.type=='3'">
                <p class="title">商品详情介绍</p>
                <div>
                    <p>商品介绍：</p>
                    <p v-html="comm.description"></p>
                </div>
                <div>
                    <p>服务承诺：</p>
                    <p v-html="comm.promise"></p>
                </div>
            </div>
            <div class="comdetails" v-if="comm.type=='4'">
                <p class="title">商品详情介绍</p>
                <div>
                    <p>服务详情：</p>
                    <p v-html="comm.introduce"></p>
                </div>
            </div>
            <div class="comdetails" v-if="comm.type=='5'">
                <p class="title">商品详情介绍</p>
                <div>
                    <p>服务详情：</p>
                    <p v-html="comm.introduce"></p>
                </div>
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
            businessid: '',
            loadingTab: false,
            tableData: [],
            // 等待审核商品量
            waitAuditNum: 0,
            //****分页组件***
            //默认每页数据量
            pagesize: 10,
            //当前页码
            currentPage: 1,
            //查询的页码
            start: 1,
            //默认数据总数
            totalCount: 0,
            dialogTableVisible: false,
            //预览商品
            comm: {},
            // 搜索
            search: {
                category: '',
                name: '',
                classOptions: [],
            },
            districtVal: '',
            districtOpation: [],
            priceArr: [],
            stateArr: [],
            promotionPriceArr: [],
            yprice: '',
            promotionPrice: '',
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

        initService() {
            var that = this;

            var reg = {
                serverLevel: 2
            }
            this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/serverClass/getServerClassByServiceLevel`, {}, {
                params: reg
            }).then(({ data }) => {
                if (data.status === 200) {
                    if (data.data.length > 0) {//如果有数据的话，组装数据
                        that.search.classOptions = data.data;
                    } else {

                    }
                }
            }).catch(function(error) {
                // that.$message.error('请求错误');
            });
        },

        // 搜索
        init() {
            this.loadingTab = true;
            var that = this;

            var reg = {
                page: this.currentPage - 1,
                size: this.pagesize,
                commodityState: 1,
                commodityName: this.search.name,
                service_type_id: this.search.category,
                businessID: this.businessid

            }
            this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/commodity/findCommdity`, {}, {
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
                    this.$emit('getNum', [num1, num2])
                    // ---------------------
                    if (data.data.commoditys.length > 0) {//如果有数据的话，组装数据
                        that.tableData = data.data.commoditys
                        that.totalCount = data.data.total;
                        that.waitAuditNum = data.data.total;
                    } else {
                        that.tableData = [];
                        that.totalCount = 0;
                        that.waitAuditNum = 0;
                    }
                    that.loadingTab = false;
                }
            }).catch(function(error) {
                that.loadingTab = false;
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
        // 联系平台
        contact() {
            this.$alert('客服电话 ：400-8518585 ', '联系平台', {
                confirmButtonText: '确定',
            });
        },
        // 预览
        yulan(comid) {
            this.districtOpation = [];
            this.priceArr = [];
            this.stateArr = [];
            this.districtVal = '0';
            this.yprice = '';
            this.promotionPrice = '';
            this.promotionPriceArr = [];
            this.dialogTableVisible = true
            var that = this;
            var reg = {
                id: comid
            }
            this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/commodity/getProvideCommodity`, {}, {
                params: reg
            }).then(({ data }) => {
                if (data.status === 200) {
                    that.comm = data.data
                    if (that.comm.serviceRange.length > 0) {
                        for (var i = 0; i < that.comm.serviceRange.length; i++) {
                            var element = that.comm.serviceRange[i];
                            var provinceName = '';
                            var cityName = '';
                            var areaName = '';
                            if (element.province == null) {
                                provinceName = ''
                            } else {
                                provinceName = element.province.name
                            }
                            if (element.city == null) {
                                cityName = ''
                            } else {
                                cityName = element.city.name
                            }
                            if (element.area == null) {
                                areaName = ''
                            } else {
                                areaName = element.area.name
                            }
                            var str = provinceName + ' ' + cityName + ' ' + areaName
                            var strs = { value: i, label: str }
                            that.districtOpation.push(strs)
                            that.priceArr.push(element.commodityPrice);
                            that.stateArr.push(element.isPromotion);
                            if (element.commodityPricePromotion == null) {
                                that.promotionPriceArr.push('')
                            } else {
                                that.promotionPriceArr.push(element.commodityPricePromotion);
                            }

                        }
                        that.districtVal = that.districtOpation[0].label
                        that.changeArea(0)
                    }
                } else {
                    that.$message.error(data.msg);
                }
            }).catch(function(error) {

            });

        },
        // 审核商品改变价格
        changeArea(index) {
            this.yprice = this.priceArr[index]
            this.promotionPrice = this.promotionPriceArr[index]
            if (this.stateArr[index] == '1') {
                setTimeout(function() {
                    $('.yprice').css({ 'text-decoration': 'line-through', 'color': '#999999', 'font-size': '14px' });
                    $('.ypromotion').show()
                }, 50)
            } else {
                this.promotionPrice = "";
                setTimeout(function() {
                    $('.yprice').css({ 'text-decoration': 'none', 'color': '#c7000a', 'font-size': '16px' });
                    $('.ypromotion').hide()
                }, 50)
            }
        },
        // 新增跳转
        comJump() {
            this.$router.push('/commodity');
            this.$store.state.adminleftnavnum = 'commodity';
        },
    },
    filters: {
        price(value) {
            if(value==0){
                return '面议'
            }else{
                return value
            }

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
    float: left;
    margin-left: 195px;
    color: #333;
    line-height: 36px;
    font-size: 14px;
    padding-right: 15px;
}

.page {
    margin: 10px;
}

.cominfo {
    margin-bottom: 30px;
    height: auto;
    overflow: hidden;
}

.cominfo .img {
    width: 150px;
    height: 150px;
    float: left;
    margin-right: 50px;
}

.cominfo .info {
    float: left;
}







/*弹窗*/

.cominfo .info ul li {
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    color: #999999;
}

.cominfo .info ul li:first-child {
    font-size: 16px;
    color: #4a4a4a;
    line-height: 32px;
}







/*.cominfo .info ul li span {
    color: #c7000a;
    font-size: 16px;
}*/

.comdetails p.title {
    font-size: 16px;
    line-height: 40px;
    color: #c7000a;
    border-bottom: 1px solid #c7000a;
}

.comdetails div p:first-child {
    font-size: 14px;
    height: 14px;
    line-height: 14px;
    border-left: 2px solid #c7000a;
    font-weight: 600;
    padding-left: 15px;
    margin: 10px 0;
}

.demo-form-inline {
    float: left;
}

.add {
    float: left;
}
</style>
<style>
.comdetails img {
    max-width: 100%;
    display: block;
    margin: 0 auto;
}
</style>


