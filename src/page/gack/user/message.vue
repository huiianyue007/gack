<template>
  <div class="page_container">
    <tab-header :tabArr = 'messageType' @changeType = 'change'></tab-header>
    <el-card>
      <div class="text-center" v-if = '!messageList.length' ref = 'tabhead'>
        暂时没有消息
      </div>
      <el-row v-for = '(item, index) in messageList' v-if = 'messageList.length' :key = 'index' :class = '[item.sendStatus !== "2" ? "active" : "message-list"]'>
        <el-col :span = '4' class = 'text-center'>系统通知</el-col>
        <el-col :span = '6' class = 'text-center'>{{ item.mesTitle }}</el-col>
        <el-col :span = '8' class = 'text-center'>{{ item.sendTime | time('年-月-日 :') }}</el-col>
        <el-col :span = '6' class = 'text-center'>
          <el-button type = 'text' :class = '{active: item.sendStatus !== "2"}'>{{ item.sendStatus === '2' ? '已读' : '未读' }}</el-button>
          <el-button type = 'text' @click = 'selectMessage(item)'>查看</el-button>
          <el-button type = 'text' @click = 'deleteMessage(item, index)'>删除</el-button>
        </el-col>
      </el-row>
      <div class="text-right">
        <el-pagination @size-change="handleSizeChange" style="float:right;"  @current-change="handleCurrentChange" :page-size='pageSize' :current-page="currentPage" layout="prev, pager, next" :total="totalCount">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
  import tabHeader from 'components/tabHeader'
  import store from 'store'
  export default {
    name: 'message',
    data:() => ({
      messageType: [{
        title: '全部消息',
        type: 'all'
      }, {
        title: '已读消息',
        type: 2
      }, {
        title: '未读消息',
        type: 1
      }],
      pageSize: 10,
      currentPage: 1,
      totalCount: 0,
      status: null,
      messageList: []
    }),
    created () {
      this.init()
    },
    watch: {
      status () {
        this.currentPage = 1
        this.init()
      }
    },
    methods: {
      selectMessage (opt) {
        if (opt.mesType == '19' || opt.mesType == '站内信') {
          this.$router.push({
            path: `/user/selectMessage/${opt.id}`,
            query: {
              title: '我的消息',
              fromtitle: '我的消息'
            }
          })
        } else if (opt.mesType == '20' || opt.mesType == '21') {
          this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/message/getMesToCus`, {}, {
            params: {
              id: opt.id
            }
          }).then(() => {
            if (opt.mesType == '20' && opt.url) {
              let arr  = opt.url.substring(opt.url.indexOf('?') + 1).split('&')
              arr = arr.map(item => {
                item = item.split('=')
                return item
              })
              let activityid = new Map(arr).get('activityid')
              this.$router.push(`/eventdetails/${activityid}`)
            } else if (opt.mesType == '21') {
              this.$router.push(`/serde/${opt.commodityid}/1`)
            }
          }).catch(() => {})
        }
      },
      deleteMessage (opt, index) {
        this.$confirm('是否删除此信息', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '删除',
          type: 'warning'
        }).then(() => {
          this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/message/deleteMesToCus`, {}, {
            params: {
              id: opt.id
            }
          }).then(() => {
            this.messageList.splice(index, 1)
          }).catch(error => {
            console.log(error)
          })
        }).catch(() => {})
      },
      change (opt) {
        this.status = opt === 'all' ? null : opt
      },
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
      init () {
        this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/message/getAllOperatorOperatorSendMesToCusPc`, {}, {
          params: {
            page: this.currentPage -1,
            size: this.pageSize,
            phone: this.user.username,
            sendStatus: this.status
          }
        }).then(({ data }) => {
          this.totalCount = data.data.count
          this.messageList = data.data.allpcListBypage.content
        }).catch(error => {
          console.log(error)
        })
      }
    },
    components: {
      tabHeader
    }
  }
</script>
<style scoped>
  .message-list{
    color: #999;
  }
  .active{
    color: #c7000a;
  }
  .el-button--text{
    color: inherit;
  }
</style>
