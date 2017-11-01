<template>
    <div class="box">
        <div class="crumbs">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>商家管理中心</el-breadcrumb-item>
                <el-breadcrumb-item>资料设置</el-breadcrumb-item>
                <el-breadcrumb-item>修改服务范围</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="currentServiceItem">
            <p class="title">您当前的服务项目</p>
            <p class="editBtn">
                <el-button type="primary" @click="redact()">编辑服务项目</el-button>
            </p>
            <div class="one" v-for="(item,index) in firstData" :key="index">
                <div class="one_left">
                    <p>{{item.serverName}}</p>
                </div>
                <div class="one_right">
                    <ul>
                        <li v-for="(it,i) in item.serverClasss" :key="i">
                            <p>{{it.serverName}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="edit" v-if="type==1">
            <p class="title">编辑您的服务项目</p>
            <div class="edit_con">
                <ul class="pt_list">
                    <li>
                        <div class="list_sell">
                            <div class="sell_ul">
                                <div class="sell_li" v-for="(emit,index) in classification1" :class="{'active':classItem1[index]}" @click="fication1(emit,index)" :key="index">{{emit.serverName}}</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="list_sell">
                            <div class="sell_ul">
                                <div class="sell_li" v-for="(emit,index) in ification2" :class="{'active':classItem2[index]}" @click="fication2(emit,index)" :key="index">{{emit.serverName}}</div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="list_sell list_box">
                            <div class="sell_selected">
                                <div class="sell_ul">
                                    <div class="select_top">
                                        你已选择类目：
                                    </div>
                                    <ul class="set_list">
                                        <li v-for="(emit,index) in chosenArr" :key="index">{{emit.serverName}}
                                            <b @click='delChosen(emit,index)'></b>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="btn">
                <el-button @click="type=0">取消</el-button>
                <el-button type="primary" @click="submit()">提交审核</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'

export default {
    data() {
        return {
            businessid: '',
            type: 0,
            // 服务项目列表
            classification1: [],
            classification2: [],
            //初始化
            ification2: [],
            //选中的数据
            chosenId: [],
            chosen: [],
            //切换状态
            classItem1: [true],
            classItem2: [],
            isdisabled: true,
            //一级
            firstData: [],


            delids: [],//删除的id
            surpluids: [],//剩下的id
            newsId: [],//新增ID
            chosens: [],//初始化值
            initId: [],//初始化ID
            chosenArr: [],
        }
    },
    created: function() {
        let businessid = this.$store.state.business;
        if (businessid) {
            this.businessid = businessid;
            this.initList();
        }
    },
    methods: {
        // 初始化
        init() {
            var that = this;
            var reg = {
                businessId: this.businessid
            }
            this.$htAjax.post("https://apitest.gack.citic:8082/guoanmaker/provide/serverClass/selectBusinessService", {}, { params: reg })
                .then(({ data }) => {
                    if (data.status == 200) {
                        that.chosens = data.data.twoPss
                        for (var i = 0; i < that.chosens.length; i++) {
                            var aa = {
                                id: that.chosens[i].id,
                                serverName: that.chosens[i].serverName
                            }
                            that.chosenArr.push(aa)
                            that.chosen.push(that.chosens[i].serverName)
                            that.chosenId.push(that.chosens[i].id)
                            that.newsId.push(that.chosens[i].id)
                            that.initId.push(that.chosens[i].id)
                            that.surpluids.push(that.chosens[i].id)
                        }
                    } else {
                        that.$message.error(data.msg);
                    }
                }).catch(function(err) {
                });
        },
        initList() {
            var that = this;
            var reg = {
                businessId: this.businessid
            }
            this.$htAjax.post("https://apitest.gack.citic:8082/guoanmaker/provide/serverClass/selectBusinessService", {}, { params: reg })
                .then(({ data }) => {
                    if (data.status == 200) {
                        that.firstData = data.data.onePss
                    } else {
                        that.$message.error(data.msg);
                    }
                })
        },
        // 选择项目
        fication1(emit, index) {
            this.classItem1 = [];
            this.classItem2 = [];
            this.ification2 = this.classification2;
            this.$set(this.classItem1, index, true);
            this.ification2 = this.ification2.filter((o) => {
                return o.parentServerId == emit.id;
            })
        },
        fication2(emit, index) {
            this.classItem2 = [];
            this.$set(this.classItem2, index, true);
            var bool = false;
            this.chosenArr.forEach((element) => {
                if (element.serverName == emit.serverName) {
                    bool = true;
                    this.$message({
                        message: '该项已选择！',
                        type: 'warning'
                    });
                }
            });
            if (bool) {
                return;
            }
            this.chosenId.push(emit.id);
            this.chosenId = this.chosenId.unique();
            this.newsId.push(emit.id);
            this.newsId = this.chosenId.unique();
            this.chosen.push(emit.serverName);
            this.chosen = this.chosen.unique();
            var aa = {
                id: emit.id,
                serverName: emit.serverName
            }
            this.chosenArr.push(aa)
            var num = this.delids.indexOf(emit.id)
            if (num > -1) {
                this.delids.splice(num, 1);
            }
        },
        delChosen(item, index) {
            this.chosen.splice(index, 1);
            this.chosenId.splice(index, 1);
            this.newsId.splice(index, 1);
            this.chosenArr.splice(index, 1);
            this.delids.push(item.id)
        },
        //编辑
        redact() {

            this.chosenArr = [];
            this.init();
            this.type = 1;
            var that = this;
            this.$htAjax.post("https://apitest.gack.citic:8082/guoanmaker/provide/serverClass/getServerClassByListForlevid")
                .then(({ data }) => {
                    if (data.status == 200) {
                        that.classification1 = data.data.pss;
                        that.classification2 = data.data.pssTwo;
                        that.ification2 = that.classification2.filter((o) => {
                            return o.parentServerId == data.data.pss[0].id;
                        })

                        that.dics = data.data.pds;
                    } else {
                        that.$message.error(data.msg);
                    }
                })

                
            // setTimeout(function() {
            //     var topVal = $('.edit').offset().top;
            //     console.log(topVal)
            //     $(".box").animate({ scrollTop: 800 }, 500);
            // }, 50)

        },
        //空间列表
        roomServers() {
            let user = this.$store.state.userid;
            if (user) {
                var item = {
                    userid: user.id
                }
                var that = this;
                this.$htAjax.post('https://apitest.gack.citic:8082/selectBusByUserid', {}, { params: item })
                    .then(({ data }) => {
                        if (data.status == 200) {
                            that.$store.commit('isRoomServer', data.data.isRoomServer);
                        }
                    })
            }
        },
        //提交审核
        submit() {
            for (var i = 0; i < this.delids.length; i++) {
                var num2 = this.surpluids.indexOf(this.delids[i])
                if (num2 > -1) {
                    this.surpluids.splice(num2, 1);
                }
            }
            for (var i = 0; i < this.surpluids.length; i++) {
                var num3 = this.newsId.indexOf(this.surpluids[i])
                if (num3 > -1) {
                    this.newsId.splice(num3, 1);
                }
            }
            let str1 = this.initId.join(',');
            let str2 = this.delids.join(',');
            let str3 = this.chosenId.join(',');
            let str4 = this.surpluids.join(',');
            let str5 = this.newsId.join(',');
            var reg = {
                old_commoditys: str1.toString(),
                del_commoditys: str2.toString(),
                ins_commoditys: str5.toString(),
                new_commoditys: str3.toString(),
                spare_commoditys: str4.toString(),
                business: {
                    id: this.businessid
                }
            }
            var that = this;
            this.$htAjax.post('https://apitest.gack.citic:8082/updateBusinessCommoditys', reg)
                .then(({ data }) => {
                    if (data.status === 200) {
                        that.$message.success('提交成功');
                        that.type = 2;
                        that.initId = [];
                        that.delids = [];
                        that.chosenId = [];
                        that.surpluids = [];
                        that.newsId = [];
                        that.initList();
                        that.roomServers();
                    }
                })
        }

    },
    watch: {
        'chosenArr': function(newVal, oldVal) {
            if (newVal != oldVal) {
                this.isdisabled = false;
            }
        }
    }

}

Array.prototype.unique = function() {
    var res = [];
    var json = {};
    for (var i = 0; i < this.length; i++) {
        if (!json[this[i]]) {
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
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
    font-size: 16px;
    padding-left: 15px;
    border-left: 3px solid #c7000a;
    margin: 15px 0;
    font-weight: 600;
    color: #333;
}

.currentServiceItem {
    position: relative;
}

.editBtn {
    position: absolute;
    right: 0;
    top: -10px;
}

.currentServiceItem .one {
    height: 110px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    padding: 15px;
    box-sizing: border-box;
    margin-bottom: 20px;
}

.currentServiceItem .one .one_left {
    width: 15%;
    height: 100%;
    float: left;
}

.currentServiceItem .one .one_left p {
    height: 100%;
    border-right: 1px solid #e5e5e5;
    text-align: center;
    line-height: 80px;
}

.currentServiceItem .one .one_right {
    width: 85%;
    height: 100%;
    float: left;
    overflow: hidden;
}

.currentServiceItem .one .one_right ul {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.currentServiceItem .one .one_right ul li {
    padding: 0 15px;
    box-sizing: border-box;
    width: 20%;
    float: left;
}

.currentServiceItem .one .one_right ul li p {
    max-width: 100%;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #c7000a;
    border: 1px solid #c7000a;
    border-radius: 3px;
    margin: 4px auto;
    font-size: 14px;
}

.edit_con {
    width: 80%;
    height: 400px;
    margin: 0 auto;
}

.pt_list {
    width: 90%;
    height: 400px;
    margin: 30px auto;
}

.pt_list li {
    float: left;
    width: 33.3%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding: 10px;
}

.pt_list li .list_sell {
    width: 100%;
    height: 100%;
    overflow: auto;
    border: 1px solid #e5e5e5;
}

.list_sell .sell_ul {
    width: 100%;
    height: auto;
}

.sell_li {
    width: 100%;
    height: 26px;
    line-height: 26px;
    overflow: hidden;
    color: #4a4a4a;
    font-size: 14px;
    box-sizing: border-box;
    padding: 0 10px;
    cursor: pointer;
    box-sizing: border-box;
}

.sell_li:hover {
    background: #c7000a;
    color: #fff;
}

.list_sell .active {
    background: #c7000a;
    color: #fff;
}

.edit .btn {
    width: 80%;
    margin: 0 auto;
    text-align: center;
}

.sell_selected {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    overflow: auto;
    font-size: 14px;
}

.list_box .set_list {
    overflow: hidden;
}

.list_box .set_list li {
    background: #fff;
    border-radius: 3px;
    border: 1px solid #c7000a;
    width: auto;
    height: 34px;
    line-height: 32px;
    text-align: center;
    position: relative;
    float: left;
    color: #c7000a;
    font-size: 14px;
    padding: 0 20px!important;
    position: relative;
    overflow: visible;
    cursor: pointer;
    margin: 10px 0;
    margin-right: 10px;
}

.list_box .set_list li b {
    display: block;
    width: 16px;
    height: 16px;
    cursor: pointer;
    background: url(../../assets/backImg/delate.png) 0 0 no-repeat;
    background-size: 16px 16px;
    position: absolute;
    right: -9px;
    top: -9px;
    opacity: 0.9;
}

.list_box .set_list li:hover b {
    display: block;
    width: 16px;
    height: 16px;
    cursor: pointer;
    background: url(../../assets/backImg/nopass.png) 0 0 no-repeat;
    background-size: 16px 16px;
    position: absolute;
    right: -9px;
    top: -9px;
}

.select_top {
    width: 100%;
    height: 40px;
    line-height: 40px;
}

.set_list {
    width: 100%;
    height: auto;
    overflow: hidden;
}

.set_list li {
    width: 100%;
    height: 26px;
    padding: 0!important;
    line-height: 26px;
    color: #666;
    font-size: 12px;
    display: block;
}

.sell_btn {
    text-align: center;
    padding-top: 10px;
    padding-bottom: 30px;
}
</style>

