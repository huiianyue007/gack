<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>商家管理中心</el-breadcrumb-item>
                <el-breadcrumb-item>评价管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="commentMan">
            <p class="title">评论管理</p>
            <ul>
                <li>累计推荐数： {{recommend}}</li>
                <li>累计不推荐数： {{norecommend}}</li>
                <li>雇主净推荐值： {{recommendValue}}</li>
            </ul>
        </div>
        <div class="comprehensiveScore">
            <p class="title">服务商综合评分</p>
            <ul>
                <li>沟通良好平均分：{{communicationAverage}} 分</li>
                <li>服务效率平均分：{{serveAverage}} 分</li>
                <li>完成质量平均分：{{completeAverage}} 分</li>
            </ul>
        </div>
        <div class="zevaluate">
            <p class="title">累计评价</p>
            <table>
                <tr>
                    <td></td>
                    <td>最近1周</td>
                    <td>最近1个月</td>
                    <td>最近6个月</td>
                    <td>6个月前</td>
                    <td>总计</td>
                </tr>
                <tr>
                    <td>好评</td>
                    <td>{{weekGood}}</td>
                    <td>{{monthGood}}</td>
                    <td>{{sixMonthGood}}</td>
                    <td>{{otherGood}}</td>
                    <td>{{goodTotal}}</td>
                </tr>
                <tr>
                    <td>中评</td>
                    <td>{{weekMiddle}}</td>
                    <td>{{monthMiddle}}</td>
                    <td>{{sixMonthBad}}</td>
                    <td>{{otherMiddle}}</td>
                    <td>{{middleTotal}}</td>
                </tr>
                <tr>
                    <td>差评</td>
                    <td>{{weekBad}}</td>
                    <td>{{monthBad}}</td>
                    <td>{{sixMonthBad}}</td>
                    <td>{{otherBad}}</td>
                    <td>{{badTotal}}</td>
                </tr>
                <tr>
                    <td>总计</td>
                    <td>{{weekTotal}}</td>
                    <td>{{monthTotal}}</td>
                    <td>{{sixMonthTotal}}</td>
                    <td>{{otherTotal}}</td>
                    <td>{{total}}</td>
                </tr>
            </table>
        </div>
        <div class="employer">
            <p class="title">雇主的评论</p>
            <div class="info" v-for="(comment,index) in comments" :key="comment">
                <ul>
                    <li>商品名称：{{comment.commodityName}}</li>
                    <li>
                        <span style="float:left;padding-right:10px;">完成评价</span>
                      <el-rate v-model="comment.averageValue" disabled show-text text-color="#C7000A" :colors="[ '#C7000A', '#C7000A','#C7000A','#C7000A','#C7000A']"  :low-threshold="2" :high-threshold="4" :texts="['差评','差评','中评','中评','好评']">
                      </el-rate>
                    </li>
                    <li>评价人: {{comment.username}}&nbsp;&nbsp;&nbsp;&nbsp;{{comment.appraiseTime | formatDate}}</li>
                    <li v-show="comment.reply==null">
                        <el-button type="primary" size="mini" @click="reply(index)">回复</el-button>
                    </li>
                </ul>
                <p class="pl">
                    <span>买家评论：</span>
                    {{comment.appraise}}
                </p>
                <p class="pl" v-if="comment.reply!=null">
                    <span>卖家回复：</span>
                    {{comment.reply}}
                </p>
                <div class="pl" v-if="replyType==index+1 && replyType!=''">
                    <span>卖家回复：</span>
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
                    </el-input>
                    <p style="float:right;margin: 15px;">
                        <el-button type="primary" size="mini" @click="replyType =''">取消</el-button>
                        <el-button type="primary" size="mini" @click="confirm(comment.id)">确认</el-button>
                    </p>
                </div>
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
            replyType: '',
            textarea: '',
            businessid: '',
            // 好中差评数据
            weekGood: 0,
            weekMiddle: 0,
            weekBad: 0,
            monthGood: 0,
            monthMiddle: 0,
            monthBad: 0,
            sixMonthGood: 0,
            sixMonthMiddle: 0,
            sixMonthBad: 0,
            otherGood: 0,
            otherMiddle: 0,
            otherBad: 0,
            weekTotal: 0,
            monthTotal: 0,
            sixMonthTotal: 0,
            otherTotal: 0,
            goodTotal: 0,
            middleTotal: 0,
            badTotal: 0,
            total: 0,
            // 雇主的评论数据
            comments: [
            ],
            //评论管理
            recommend: 0,
            norecommend: 0,
            recommendValue: '0%',
            //服务商综合评分
            communicationAverage: 0,
            serveAverage: 0,
            completeAverage: 0,

            //默认每页数据量
            pagesize: 5,
            //当前页码
            currentPage: 1,
            //默认数据总数
            totalCount: 0,
        }
    },
    created: function() {
        let businessid = this.$store.state.business;
        if (businessid) {
            this.businessid = businessid;
            this.init();
            this.init2();
        }
    },
    filters: {
        formatDate(date) {
            if (date == undefined || date == '') {
                return "无";
            }
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        },
    },
    methods: {
        init() {
            var item = {
                businessid: this.businessid,
            }
            var that = this;
            this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/orderform/getBusinessAppraise`, {}, {
                // this.$htAjax.post('http://172.16.32.143:8082/guoanmaker/provide/orderform/getBusinessAppraise', {}, {
                params: item
            }).then(({ data }) => {
                if (data.status === 200) {
                    that.recommend = data.data.recommend || 0;
                    that.norecommend = data.data.norecommend || 0;
                    that.recommendValue = data.data.recommendValue || '0%';

                    that.communicationAverage = data.data.communicationAverage || 0;
                    that.serveAverage = data.data.serveAverage || 0;
                    that.completeAverage = data.data.completeAverage || 0;

                    //好评
                    that.weekGood = data.data.appraiseNumbers[0].weekNum;
                    that.monthGood = data.data.appraiseNumbers[0].monthNum;
                    that.sixMonthGood = data.data.appraiseNumbers[0].sixMonthNum;
                    that.otherGood = data.data.appraiseNumbers[0].sixMonthAgoNum;
                    that.goodTotal = data.data.appraiseNumbers[0].allNum;
                    //中评
                    that.weekMiddle = data.data.appraiseNumbers[1].weekNum;
                    that.monthMiddle = data.data.appraiseNumbers[1].monthNum;
                    that.sixMonthBad = data.data.appraiseNumbers[1].sixMonthNum;
                    that.otherMiddle = data.data.appraiseNumbers[1].sixMonthAgoNum;
                    that.middleTotal = data.data.appraiseNumbers[1].allNum;
                    //差评
                    that.weekBad = data.data.appraiseNumbers[2].weekNum;
                    that.monthBad = data.data.appraiseNumbers[2].monthNum;
                    that.sixMonthBad = data.data.appraiseNumbers[2].sixMonthNum;
                    that.otherBad = data.data.appraiseNumbers[2].sixMonthAgoNum;
                    that.badTotal = data.data.appraiseNumbers[2].allNum;
                    //总计
                    that.weekTotal = data.data.appraiseNumbers[3].weekNum;
                    that.monthTotal = data.data.appraiseNumbers[3].monthNum;
                    that.sixMonthTotal = data.data.appraiseNumbers[3].sixMonthNum;
                    that.otherTotal = data.data.appraiseNumbers[3].sixMonthAgoNum;
                    that.total = data.data.appraiseNumbers[3].allNum;
                    //评论

                } else {
                    that.$message.warning(data.msg);
                }
            }).catch(function(err) {

            });
        },
        init2() {
            var item = {
                businessid: this.businessid,
                pageNumber: this.currentPage - 1,
                pageSize: this.pagesize
            }
            this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/orderform/getBusinessAppraise`, {}, {
            //this.$htAjax.post('http://172.16.32.143:8082/guoanmaker/provide/orderform/getAppraise', {}, {
                params: item
            }).then(({ data }) => {
                if (data.status === 200) {
                    this.comments = data.data.appraises;
                    this.totalCount = data.data.totle
                } else {
                    this.$message.warning(data.msg);
                }
            }).catch(function(err) {

            });
        },
        // 分页方法
        handleSizeChange(val) {
            this.pagesize = val;
            this.init2();
            this.replyType='';
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.init2();
            this.replyType='';
        },
        reply(index) {
            this.replyType = index+1;
            this.textarea = '';
        },
        confirm(id) {
            if (this.textarea == '' || this.textarea == null) {
                this.$message.warning('请填写回复内容');
                return false;
            }
            var item = {
                orderId: id,
                reply: this.textarea
            }
            var that = this;
            this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/appraise/insertReply`, {}, {
                // this.$htAjax.post('http://:8083/guoanmaker/personal/appraise/insertReply', {}, {
                params: item
            }).then(({ data }) => {
                if (data.status === 200) {
                    this.replyType = '';
                    this.$message.success(data.msg);
                    this.init2()
                } else {
                    this.$message.warning(data.msg);
                }
            }).catch(function(err) {

            });
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

p.title {
    height: 16px;
    line-height: 16px;
    font-size: 14px;
    padding-left: 15px;
    border-left: 3px solid #c7000a;
    margin: 10px 0;
    font-weight: 600;
    color: #333;
}

.commentMan ul,
.comprehensiveScore ul {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding: 15px 0 15px 25px;
}

.commentMan ul li,
.comprehensiveScore ul li {
    float: left;
    width: 33%;
    font-size: 14px;
}

.commentMan ul li:nth-of-type(1) {
    padding-left: 30px;
    box-sizing: border-box;
    background: url(../../assets/images/information/pl1.png) no-repeat left center;
    background-size: contain;
}

.commentMan ul li:nth-of-type(2) {
    padding-left: 30px;
    box-sizing: border-box;
    background: url(../../assets/images/information/pl2.png) no-repeat left center;
    background-size: contain;
}

.commentMan ul li:nth-of-type(3) {
    padding-left: 30px;
    box-sizing: border-box;
    background: url(../../assets/images/information/pl3.png) no-repeat left center;
    background-size: contain;
}

.zevaluate table {
    width: 100%;
    border: 1px solid #e5e5e5;
    margin: 20px 0;
    border-collapse: collapse;
    border-spacing: 0;
    text-align: center;
    font-size: 14px;
    color: #4a4a4a;
}

.zevaluate table tr td {
    height: 35px;
    border-bottom: 1px solid #e5e5e5;
}

.zevaluate table tr:nth-child(2) td:first-child {
    background: url(../../assets/images/information/pl4.png) no-repeat 8px;
    background-size: 25px 25px;
}

.zevaluate table tr:nth-child(3) td:first-child {
    background: url(../../assets/images/information/pl5.png) no-repeat 8px;
    background-size: 25px 25px;
}

.zevaluate table tr:nth-child(4) td:first-child {
    background: url(../../assets/images/information/pl6.png) no-repeat 8px;
    background-size: 25px 25px;
}

.zevaluate table tr:nth-child(5) td:first-child {
    background: url(../../assets/images/information/pl7.png) no-repeat 8px;
    background-size: 25px 25px;
}

.employer .info {
    width: 100%;
    height: auto;
    overflow: hidden;
    border: 1px solid #F2E5E5;
}

.employer .info ul {
    width: 100%;
    background: #F2E5E5;
    height: 40px;
    line-height: 40px;
    display: table;
    color: #4a4a4a;
}

.employer .info ul li {
    box-sizing: border-box;
    float: left;
    font-size: 14px;
    height: 40px;
    padding-left: 15px;
}

.employer .info ul li:nth-of-type(1) {
    box-sizing: border-box;
    width: 25%;
    float: left;
    font-size: 14px;
    height: 40px;
    padding-left: 15px;
}

.employer .info ul li:nth-of-type(2) {
    box-sizing: border-box;
    width: 30%;
    float: left;
    font-size: 14px;
    height: 40px;
    padding-left: 15px;
}

.employer .info ul li:nth-of-type(3) {
    box-sizing: border-box;
    width: 35%;
    float: left;
    font-size: 14px;
    height: 40px;
    padding-left: 15px;
}

.employer .info ul li:last-child {
    box-sizing: border-box;
    width: 10%;
    float: left;
    font-size: 14px;
    height: 40px;
    padding-left: 15px;
}

.employer .info .pl {
    box-sizing: border-box;
    min-height: 80px;
    height: auto;
    padding: 15px;
    color: #A3A3A3;
    font-size: 14px;
    line-height: 25px;
}

.employer .info .pl span {
    color: #4a4a4a;
}

.el-rate__icon {
    color: #c7000a!important;
}

.el-rate {
    margin-top: 10px;
    float: left;
}
</style>
