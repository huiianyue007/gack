<template>
  <div class="financial">
    <div class="title">
      已发布的金融服务
    </div>
    <div v-loading="loadingTab">
      <el-table ref="singleTable" border :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="150" align="center">
        </el-table-column>
        <el-table-column label="审核通过日期" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0 || scope.row.status == 1">{{scope.row.toExamineTime | time}}</span>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column property="name" label="项目名称" align="center">
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status !=2">{{scope.row.status | status}}</span>
            <el-button type="text" v-else @click="open(scope.row.id)">{{scope.row.status | status}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button :disabled="scope.row.status == 0 || scope.row.status == 4" type="text" @click="dataChange(scope.row,'submit')">发布</el-button>
            <el-button :disabled="scope.row.status != 0" type="text" @click="dataChange(scope.row,'offLine')">下线</el-button>
            <el-button :disabled="scope.row.status == 4" type="text" @click="xiugai(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="float:right;margin-top:15px;" @current-change="handleCurrentChange" :page-size='size' layout="prev, pager, next" :total="total">
      </el-pagination>
    </div>
    <div align="center" style="margin-top: 60px">
      <router-link :to="{path: 'issueFinancial', query: {title: '金融服务'}}">
        <el-button type="primary">继续发布项目信息</el-button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'financial',
  data() {
    return {
      loadingTab: false,
      tableData: [],
      page: 1,
      size: 10,
      total: 0,
    }
  },
  created() {
    this.init()
  },
  methods: {
    open(id) {
      this.$htAjax.post(`${this.$config.back}/guoanmaker/providepersonalFinanceProject/findRefuseReason`, {}, {
        params: {
          projectId: id
        }
      }).then(({ data }) => {
        if (data.data.key == "success") {
          this.$alert(data.data.value, '拒绝原因', {
            confirmButtonText: '确定',
            callback: action => {
            }
          })
        }

      }).catch(error => {
        this.$message.error('请求错误')
      })

    },
    //修改
    xiugai(row) {
      this.$confirm('是否确认修改此条数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({ path: 'issueFinancial', query: { title: '金融服务', value: row.id } })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    //发布
    dataChange(row, operation) {
      let str = '';
      if (operation == 'submit') {
        str = '发布'
      } else if (operation == 'offLine') {
        str = '下线'
      }
      this.$confirm(`是否确认${str}此条数据吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$htAjax.post(`${this.$config.back}/guoanmaker/providepersonalFinanceProject/convertStatus`, {}, {
          params: {
            projectId: row.id,
            operation: operation
          }
        }).then(({ data }) => {
          if (data.data.key != "error") {
            if (data.data.key == "success0") {
              this.$message.warning(data.data.value)
            } else if (data.data.key == "success1") {
              this.$message.success(data.data.value)
              this.init()
            } else if (data.data.key == "success2") {
              this.$message.success(data.data.value)
              this.init()
            }
          } else {
            this.$message.error('请求错误')
          }
        }).catch(error => {
          this.$message.error('请求错误')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });

    },
    init() {
      this.loadingTab = true;
      this.$htAjax.post(`${this.$config.back}/guoanmaker/providepersonalFinanceProject/findPersonalFinanceProjectForPCPerson`, {}, {
        params: {
          userId: this.$store.state.userid.id,
          page: this.page - 1,    //当前页数，从0开始
          size: this.size       //每页可显示的数量
        }
      }).then(({ data }) => {
        if (data.status == 200) {
          this.tableData = data.data.list
          this.total = data.data.total
          this.loadingTab = false;
        } else {
          this.$message.error(data.msg)
          this.loadingTab = false;
        }
      }).catch(error => {
        this.$message.error('请求错误')
        this.loadingTab = false;
      })
    },
    handleCurrentChange(val) {
      this.page = val;
      this.init()
    }
  },
  filters: {
    status(val) {
      if (val == 0) {
        return '已通过'
      } else if (val == 1) {
        return '已下线'
      } else if (val == 2) {
        return '已拒绝'
      } else if (val == 3) {
        return '待发布'
      } else if (val == 4) {
        return '待审核'
      }
    },
    time(value) {
      if (value) {
        var Time = new Date(value)
        let m = Number(Time.getMonth()) + 1 < 10 ? '0' + (Number(Time.getMonth()) + 1) : Number(Time.getMonth()) + 1;
        let d = Time.getDate() < 10 ? '0' + Time.getDate() : Time.getDate();
        let h = Time.getHours() < 10 ? '0' + Time.getHours() : Time.getHours();
        let f = Time.getMinutes() < 10 ? '0' + Time.getMinutes() : Time.getMinutes();
        let s = Time.getSeconds() < 10 ? '0' + Time.getSeconds() : Time.getSeconds();
        return Time.getFullYear() + '-' + m + '-' + d + ' ' + h + ':' + f + ':' + s;
      } else {
        return '无'
      }
    }
  }
}
</script>
<style scoped>
.title {
  margin: 15px 0;
}
</style>


