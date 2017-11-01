<template>
    <div class="sidebar">
        <div class="noLogin" v-if="prop">
            <el-menu :default-active="navselected" :active="navselected" unique-opened router @select="selectItems" 　@open="openItems">
                <template v-for="(item,indexs) in items">
                    <template v-if="item.subs">
                        <el-submenu :index="item.index">
                            <template slot="title">
                                {{ item.title }}
                            </template>
                            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                            </el-menu-item>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.index" :class="{temActive:isTemActive[indexs]}">
                            {{ item.title }}
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>
        </div>
        <div class="noLogin" v-else>
            <div class="noUse">未开店用户</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isTemActive: [],
            titles: '首页',
            items: [
                {
                    index: 'backHome',
                    title: '首页'
                },
                {
                    index: '2',
                    title: '服务商品',
                    subs: [
                        {
                            index: 'commodity',
                            title: '发布商品'
                        },
                        {
                            index: 'manage',
                            title: '商品管理'
                        }
                    ]
                },
                {
                    index: '3',
                    title: '我的订单',
                    subs: [
                        {
                            index: 'merchandise',
                            title: '商品订单'
                        },
                        {
                            index: 'invoice',
                            title: '雇主发票管理'
                        }
                    ]
                },
                {
                    index: 'reviewShow',
                    title: '我的评价'
                },
                {
                    index: '5',
                    title: '账号资金',
                    subs: [
                        {
                            index: 'expenditure',
                            title: '收支明细'
                        },
                        {
                            index: 'invoiceInformation',
                            title: '发票信息管理'
                        },
                        {
                            index: 'meInvoice',
                            title: '我的发票管理'
                        }
                    ]
                },
                {
                    index: 'dataStatistics',
                    title: '数据统计'
                },
                {
                    index: '7',
                    title: '资料设置',
                    subs: [
                        {
                            index: 'changePassword',
                            title: '修改密码'
                        },
                        {
                            index: 'changeServiceArea',
                            title: '修改服务范围'
                        }
                    ]
                }
            ],
            navtype: "backHome",
            navselected: "backHome",
        }
    },
    props: ['prop'],
    created() {
        let leftNav = this.$route.path.replace('/', '');
        if (leftNav == 'backHome') {
            this.navselected = 'backHome';
            this.$set(this.isTemActive, 0, true);
        } else if (leftNav == 'merchandise') {
            this.navselected = 'merchandise'
        } else if (leftNav == 'merchandetails') {
            this.navselected = 'merchandise'
        } else if (leftNav == 'invoice') {
            this.navselected = 'invoice'
        } else if (leftNav == 'expenditure') {
            this.navselected = 'expenditure'
        } else if (leftNav == 'invoiceInformation') {
            this.navselected = 'invoiceInformation'
        } else if (leftNav == 'invoiceInformation') {
            this.navselected = 'invoiceInformation'
        } else if (leftNav == 'meInvoice') {
            this.navselected = 'meInvoice'
        } else if (leftNav == 'manage') {
            this.navselected = 'manage'
        } else if (leftNav == 'commodity') {
            this.navselected = 'commodity'
        } else if (leftNav == 'edit') {
            this.navselected = 'manage'
        } else if (leftNav == 'reviewShow') {
            this.navselected = "reviewShow";
            this.$set(this.isTemActive, 3, true);
        } else if (leftNav == 'dataStatistics') {
            this.navselected = "dataStatistics";
            this.$set(this.isTemActive, 5, true);
        } else if (leftNav == 'SpaceBooking') {
            this.navselected = "SpaceBooking";
        } else if (leftNav == 'spatialPublishing') {
            this.navselected = "spatialPublishing";
            sessionStorage.removeItem('roomServer')
        } else if (leftNav == 'spaceHome') {
            this.navselected = "spaceHome";
        }
        this.isRoomServer();
    },
    methods: {
        isRoomServer() {
            //空间权限
            let isRoomServers = this.$store.state.roomServer;
            if (isRoomServers == 1) {
                if (this.items.length <= 7) {
                    let json = {
                        index: '8',
                        title: '空间设置',
                        subs: [
                            {
                                index: 'SpaceBooking',
                                title: '空间预约'
                            },
                            {
                                index: 'spatialPublishing',
                                title: '空间发布'
                            },
                            {
                                index: 'spaceHome',
                                title: '空间管理'
                            }
                        ]
                    }
                    this.items.push(json);
                }
            } else {
                this.items.splice(7, 8);
            }
        },
        getNavType() {
            if (this.$store.state.adminleftnavnum == 'merchandise' || this.$store.state.adminleftnavnum == 'manage' || this.$store.state.adminleftnavnum == 'spaceHome' || this.$store.state.adminleftnavnum == 'reviewShow' || this.$store.state.adminleftnavnum == 'invoice') {
                this.$set(this.isTemActive, 0, false);
            }
            this.navselected = this.$store.state.adminleftnavnum;
            //store.state.adminleftnavnum里值变化的时候，设置navselected
        },
        selectItems(index) {
            var num = 0;
            this.isTemActive = [];
            if (index == 'backHome') {
                num = 0;
                setTimeout(function() {
                    $('li.el-submenu').removeClass('is-opened');
                },180)
                this.$set(this.isTemActive, num, true);
            } else if (index == 'reviewShow') {
                num = 3;
                setTimeout(function() {
                    $('li.el-submenu').removeClass('is-opened');
                },180)
                this.$set(this.isTemActive, num, true);
            } else if (index == 'dataStatistics') {
                num = 5;
                setTimeout(function() {
                    $('li.el-submenu').removeClass('is-opened');
                },180)
                this.$set(this.isTemActive, num, true);
            }
            this.$store.state.adminleftnavnum = index;
            this.$store.commit('orderState', '');
            if (index == 'manage') {
                this.$store.state.stateId2 = '';
            }
            if (index == 'spatialPublishing') {
                this.$store.state.compile = '';
                sessionStorage.removeItem('roomServer')
            }
        },
        openItems(index) {
          this.isTemActive = [];
        }
    },
    watch: {
        '$store.state.adminleftnavnum': 'getNavType',
        '$store.state.roomServer': 'isRoomServer'
    }
}
</script>

<style scoped>
.noUse {
    width: 100%;
    height: 80px;
    line-height: 80px;
    margin-top: 20px;
    font-size: 16px;
    text-align: center;
    color: #333;
}

.noLogin .temActive {
    background: #c7000a!important;
    color: #fff;
}

.sidebar {
    display: block;
    position: absolute;
    width: 220px;
    left: 0;
    top: 90px;
    bottom: 0;
    overflow: auto;
    background: rgb(246, 239, 238);
}

.noLogin {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 40px;
    overflow: auto;
}

.sidebar>ul {
    height: 100%;
}
</style>
<style>
.sidebar .el-menu-item,
.sidebar .el-submenu__title {
    height: 40px;
    line-height: 40px;
}

.sidebar .el-submenu .el-menu-item {
    height: 40px;
    line-height: 40px;
}

.sidebar .is-opened .el-submenu__title {
    background: #c7000a;
    color: #fff;
}
</style>

