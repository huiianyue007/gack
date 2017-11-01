<template>
  <div class="page">
    <div class="container">
      <el-breadcrumb separator=">" class = 'bread'>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{this.$route.params.id == '1'? "新闻列表" : "付费阅读"}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container news_content">
      <div class="cursor news_list" v-for = '(item, key) in newArr' @click = 'routeTo(item, key)' v-if = 'newArr.length'>
        <box-img class="fl img" :prop = '146/260'>
          <img :src="item.photoPath">
        </box-img>
        <div class="fl news_con">
          <h2 class = 'title'>{{ item.newsTitle }}</h2>
          <p class="desc subhead">{{ item.newsCreater }}</p>
          <p class="time subhead">{{ ($route.params.id == '1' ? item.updateDate : item.newsDate) | time('年-月-日') }}</p>
        </div>
      </div>
      <div class="no_data_lay" v-if = '!newArr.length'>
        <layout>
        </layout>
      </div>
      <el-pagination @size-change="handleSizeChange" style="float:right;"  @current-change="handleCurrentChange" :page-size='5' :current-page="currentPage" layout="prev, pager, next" :total="totalCount" v-if = '$route.params.id == "1" && totalCount'>
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import newType from 'assets/js/article'
  export default {
    data () {
      return {
        newArr: [],
        totalPage: 0,
        currentPage: 1,
        totalCount: 0
      }
    },
    activated () {
      this.init(0)
    },
    watch: {
      '$route.params' () {
        this.init(0)
      }
    },
    methods: {
      init () {
        this.newArr =  []
        if (this.$route.params.id == '1') {
          this.$htAjax.get('https://apitest.gack.citic:8083/guoanmaker/operator/newsList/getpcNewList', {
            params: {
              page: this.currentPage - 1,
              size: 5
            }
          }).then(({data}) => {
            this.totalCount = data.data.count
            this.newArr = data.data.newlists.content
          }).catch(error => {
          })
        } else if (this.$route.params.id == '2') {
          this.totalCount = 10
          this.newArr = newType
        }
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
      routeTo (opt, index) {
        if (this.$route.params.id == '1') {
          this.$router.push(`/newsdetail/${opt.id}`)
        } else {
          this.$router.push(`/paidreading/${index}`)
        }
      }
    }
  }
</script>
<style scoped>
  .page{
    background: #f3f3f3;
    padding-bottom: 90px;
  }
  .news_content{
    background:#fff;
    box-sizing: border-box;
    padding: 0 20px;
  }
  .news_list{
    padding:20px 0;
    overflow:hidden;
    border-bottom: 1px solid #efefef;
  }
  .news_list .img{
    width: 260px;
  }
  .news_con{
    margin-left: 25px;
    padding: 10px;
    width: calc(100% - 325px)
  }
  .news_con .desc{
    margin-top:30px;
  }
  .news_con .time{
    margin-top: 30px;
  }
  .el-pagination{
    text-align:right;
    padding: 20px 0;
  }
</style>
