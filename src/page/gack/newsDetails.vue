<template>
  <div class="page">
    <div class="container">
      <el-breadcrumb separator=">" class = 'bread'>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>新闻列表</el-breadcrumb-item>
        <el-breadcrumb-item v-if="newsCon">{{ newsCon.newsTitle }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container news">
      <div class="news_con" v-if="newsCon">
        <h1 class="title">{{ newsCon.newsTitle }}</h1>
        <h2 class="subhead"><strong>{{ newsCon.newsCreater }}</strong>{{ newsCon.newsDate | time('年-月-日') }}</h2>
        <div class="news_views" v-html = 'newsCon.newsInstruction'></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      newsCon: null
    }),
    activated () {
      this.newsCon = null
      this.$htAjax.post('https://apitest.gack.citic:8083/guoanmaker/operator/newsList/getNewsListById',{}, {
        params: {
          id: this.$route.params.id
        }
      }).then(({ data }) => {
        this.newsCon = data.data
      }).catch(error => {
      })
    }
  }
</script>
<style scoped>
  .newsTitle{
    text-indent: 28px;
  }
  .page{
    background:#f3f3f3;
    box-sizing: border-box;
    padding-bottom: 90px;
  }
  .news{
    box-sizing: border-box;
    background:#fff;
    padding:45px 0 50px;
  }
  .news_con{
    width: 800px;
    margin: 0 auto;
  }
  .news_con .subhead strong{
    color: #666;
    margin-right: 15px;
  }
  .news_con .subhead{
    margin: 25px 0 22px;
  }
</style>
<style>

</style>
