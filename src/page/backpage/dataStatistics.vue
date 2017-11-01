<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>商家管理中心</el-breadcrumb-item>
                <el-breadcrumb-item>服务商品</el-breadcrumb-item>
                <el-breadcrumb-item>服务商品发布</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="data">
            <ul>
                <li>
                    <el-tooltip class="item" content="服务商家从昨天开始最近30天订单的总金额" placement="right" effect="light">
                        <span>?</span>
                    </el-tooltip>
                    近30天下单金额： {{data.nearlyThirtyDaysOrderAmount | orderAmount}} 元
                </li>
                <li>
                    <el-tooltip class="item" content="服务商家从昨天开始最近30天下单会员数" placement="right" effect="light">
                        <span>?</span>
                    </el-tooltip>
                    近30天下单会员数：{{data.nearlyThirtyDaysOrderMembership}}
                </li>
                <li>
                    <el-tooltip class="item" content="服务商家从昨天开始最近30天下单量" placement="right" effect="light">
                        <span>?</span>
                    </el-tooltip>
                    近30天下单量：{{data.nearlyThirtyDaysOrderQuantity}}
                </li>
                <li>
                    <el-tooltip class="item" content="平均客单价" placement="right" effect="light">
                        <span>?</span>
                    </el-tooltip>
                    平均客单价：{{data.averageUnitPrice}} 元
                </li>
                <li>
                    <el-tooltip class="item" content="商品收藏量" placement="right" effect="light">
                        <span>?</span>
                    </el-tooltip>
                    商品收藏量：{{data.commodityCollectionQuantity}}
                </li>
                <li>
                    <el-tooltip class="item" content="商品总数" placement="right" effect="light">
                        <span>?</span>
                    </el-tooltip>
                    商品总数：{{data.CollectionQuantity}}
                </li>
            </ul>
        </div>
        <div style="margin-bottom:20px;">
            <el-select v-model="value" placeholder="请选择" @change="getVal">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>

        <div id="myChart" :style="{width: '1000px', height: '400px'}"></div>
        <div id="myChart6" :style="{width: '1000px', height: '400px'}"></div>
    </div>
</template>
<script>

export default {

    data() {
        return {
            type: '1',
            data: {},
            options: [{
                value: '1',
                label: '近30天销量走势'
            }, {
                value: '2',
                label: '近15天销量走势'
            }, {
                value: '3',
                label: '近10天销量走势'
            }, {
                value: '4',
                label: '近5天销量走势'
            }],
            value: '',
            // 近30天
            title: '近30天销量走势',
            x1data: [],
            y1data: [],
            // 近1年
            x6data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '11月', '12月'],
            y6data: []
        }
    },
    mounted() {

    },
    created() {
        this.value = this.options[0].label;
        let businessid = this.$store.state.business;
        if (businessid) {
            this.businessid = businessid;
        }
        var item = {
            businessId: this.businessid,
        }
        var that = this;
        //获取基本数据
        this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/dataStatistics/routineData', {}, {
            params: item
        }).then(({ data }) => {
            if (data.status === 200) {
                that.data = data.data
            }
        }).catch(function(err) {

        });
        //获取近一年的销量走势
        this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/dataStatistics/salesTrendInThePastYear', {}, {
            params: item
        }).then(({ data }) => {
            if (data.status === 200) {
                that.y6data = data.data
                that.drawLine6()
            }
        }).catch(function(err) {

        });

        var item2 = {
            time: 30,
            businessId: this.businessid,
        }
        var that = this;
        //获取销量走势
        this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/dataStatistics/salesTrend', {}, {
            params: item2
        }).then(({ data }) => {
            if (data.status === 200) {
                for (var i = 0; i < data.data.length; i++) {
                    var element = data.data[i];
                    that.x1data.push(element.date)
                    that.y1data.push(element.count)
                }
                that.drawLine1()
            }
        }).catch(function(err) {

        });
    },
    methods: {
        getVal() {
            this.x1data=[]
            this.y1data=[]
            this.init()
        },
        init() {
            var er = 30;
            if (this.value == '1') {
                er = 30
                this.title = '近30天销量走势'
            } else if (this.value == '2') {
                er = 15
                this.title = '近15天销量走势'
            } else if (this.value == '3') {
                er = 10
                this.title = '近10天销量走势'
            } else if (this.value == '4') {
                er = 5
                this.title = '近5天销量走势'
            }
            var item = {
                time: er,
                businessId: this.businessid,
            }
            var that = this;
            this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/dataStatistics/salesTrend', {}, {
                params: item
            }).then(({ data }) => {
                if (data.status === 200) {
                    for (var i = 0; i < data.data.length; i++) {
                        var element = data.data[i];
                        that.x1data.push(element.date)
                        that.y1data.push(element.count)
                    }
                    that.drawLine1()
                }
            }).catch(function(err) {

            });
        },
        drawLine1() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
                title: {
                    text: this.title
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.x1data,
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} '
                    }
                },
                series: [
                    {
                        name: '下单量',
                        type: 'line',
                        data: this.y1data,
                    }
                ]
            });

        },
        drawLine6() {
            let myChart6 = this.$echarts.init(document.getElementById('myChart6'));
            myChart6.setOption({
                title: {
                    text: '近1年销量走势'
                },
                color: ['#C23531'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.x6data,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '下单量',
                        type: 'bar',
                        barWidth: '60%',
                        data: this.y6data
                    }
                ]
            })
        }
    },
    filters: {
        orderAmount(value) {
            if (value == null) {
                return value = 0
            } else {
                return value;
            }
        },
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

.data {
    margin: 15px;
    width: 100%;
    height: 60px;
    overflow: hidden;
}

.data ul li {
    width: 33%;
    float: left;
    line-height: 30px;
    font-size: 14px;
}

.data ul li span {
    display: inline-block;
    width: 15px;
    height: 15px;
    border: 1px solid #c7000a;
    border-radius: 50%;
    color: #c7000a;
    text-align: center;
    line-height: 15px;
    cursor: pointer;
}

#myChart,
#myChart2,
#myChart3,
#myChart4,
#myChart5,
#myChart6 {
    margin: 0 auto;
}
</style>
