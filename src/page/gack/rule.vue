<template>
  <div class="page">
    <div class="container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>规则中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="oh container">
      <div class="fl view view_list">
        <div class="title view_title">国安创客规则</div>
        <div class="text-hidden view_li" :class = '{"active": activeType == item.type}' v-for = '(item, key) in viewList' @click = 'activeType = item.type'>{{ item.title }}</div>
      </div>
      <div class="fr view view_con" v-html = 'html'>

      </div>
    </div>
  </div>
</template>
<script>
  import docHtml from 'assets/js/docHtml'
  import docHtml1 from 'assets/js/docHtml1'
  import docHtml2 from 'assets/js/docHtml2'
  export default{
    name: 'rule',
    data: () => ({
      activeType: '1',
      viewList: [{
        title: '国安创客企业服务平台处罚规则',
        type: '1'
      }, {
        title: '国安创客企业服务平台服务商行为管理规范',
        type: '2'
      }, {
        title: '商品详情页图片及内容描述要求',
        type: '3'
      }],
      docHtml,
      docHtml1,
      docHtml2
    }),
    computed: {
      html () {
        if (this.activeType == '1') {
          return this.docHtml
        } else if (this.activeType == '2') {
          return this.docHtml1
        } else if (this.activeType == '3') {
          return this.docHtml2
        }
      }
    }
  }
</script>
<style scoped>
  .page{
    background: #eee;
    padding-bottom: 24px;
  }
  .page .view{
    background: #fff;
    padding: 15px;
    box-sizing: border-box;
  }
  .page .view_list {
    width: 20%;
  }
  .page .view_list .view_title{
    margin-bottom: 20px;
  }
  .page .view_list .view_li{
    line-height: 36px;
    cursor: pointer;
    padding: 10px 0;
    color: #333;
    transition: color linear .2s;
  }
  .page .view_list .view_li.active{
    color: #C55A5A;
  }
  .page .view_list .view_li:hover{
    color: #C55A5A;
    transition: color linear .2s;
  }
  .page .view_con{
    width: calc(80% - 15px);
  }
  .page .view_con >>> p{
    text-indent: 2em;
  }
  .page .view_con >>> p.no_indent{
    text-indent: 0em;
  }
</style>
