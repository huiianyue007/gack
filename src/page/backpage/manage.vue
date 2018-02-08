<template>
    <div class="con manage">
        <div class="crumbs">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>商家管理中心</el-breadcrumb-item>
                <el-breadcrumb-item v-if="activeIndex === '1'">出售中的服务商品</el-breadcrumb-item>
                <el-breadcrumb-item v-if="activeIndex === '2'">违规商品</el-breadcrumb-item>
                <el-breadcrumb-item v-if="activeIndex === '3'">等待审核商品</el-breadcrumb-item>
                <el-breadcrumb-item v-if="activeIndex === '4'">审核未通过商品</el-breadcrumb-item>
                <el-breadcrumb-item v-if="activeIndex === '5'">下架商品</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="nav">
            <ul>
                <li v-for="(item,index) in itemMenu" :key="index" :class="{active:isActive[index]}" @click="itemActive(index)">
                    {{item.title}}

                    <span v-if="item.num!='' && item.num!=0">{{item.num}}</span>
                </li>
            </ul>
        </div>
        <div>
            <v-sale v-if="activeIndex == '1'" v-on:getNum="changeNum"></v-sale>
            <v-offend v-if="activeIndex == '2'" v-on:getNum="changeNum"></v-offend>
            <v-waitAudit v-if="activeIndex == '3'" v-on:getNum="changeNum"></v-waitAudit>
            <v-auditFailed v-if="activeIndex == '4'" v-on:getNum="changeNum"></v-auditFailed>
            <v-shelf v-if="activeIndex == '5'" v-on:getNum="changeNum"></v-shelf>
        </div>
    </div>
</template>
<script>
import vSale from './sale';      // 出售中服务商品组件
import vOffend from './offend';      //违规商品组件
import vWaitAudit from './waitAudit';//等待审核
import vAuditFailed from './auditFailed';  //审核未通过
import vShelf from './shelf'; //下架服务商品库


export default {
    data() {
        return {
            comState: '',
            // 导航点击 
            activeIndex: '1',
            itemMenu: [{
                title: '出售中的服务商品项目',
                num: '0'
            }, {
                title: '违规商品',
                num: ''
            }, {
                title: '等待审核商品',
                num: ''
            }, {
                title: '审核未通过商品',
                num: ''
            }, {
                title: '下架商品',
                num: ''
            }],
            isActive: [true],
        };
    },
    components: {
        vSale, vOffend, vAuditFailed, vShelf, vWaitAudit
    },
    created: function() {
        let order = this.$store.state.stateId2 || '';
        if (order == "" || order == undefined || order == null) {
            this.activeIndex = '1'
        } else {

            this.activeIndex = order;
            this.$store.state.adminleftnavnum = 'manage';
            this.isActive = [false]
            this.$set(this.isActive, order - 1, true);
        }

        this.changeNum()

    },
    methods: {
        // 导航
        itemActive(index) {
            this.isActive = [];
            this.$set(this.isActive, index, true);
            this.activeIndex = (index + 1).toString();
        },
        changeNum(data) {
            if (data) {
                this.itemMenu[1].num = data[1]
                this.itemMenu[3].num = data[0]
            }

        }
    }

}
</script>
<style scoped>
.con {
    overflow: hidden;
}

.crumbs {
    height: auto;
    margin-top: 15px;
    width: 100%;
}


.nav ul {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    border-bottom: 1px solid #D1DBE5;
    margin-bottom: 15px;
    font-size: 0;
}

.nav ul li {
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
    position: relative;
}

.nav ul li span {
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #FF4949;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    color: #fff;
    position: absolute;
    top: 0;
    right: 0;
}

.nav ul li:hover {
    color: #c7000a;
    cursor: pointer;
}

.nav ul .active {
    color: #c7000a;
}

.nav ul .active:after {
    content: '';
    width: 100%;
    height: 3px;
    background: #c7000a;
    position: absolute;
    left: 0;
    bottom: 0;
}

.demo-form-inline {
    float: left;
}

.add {
    float: left;
}
</style>
<style>
.manage .el-menu {
    background: transparent!important;
}

.manage .el-menu-item:hover {
    background: transparent!important;
}
</style>


