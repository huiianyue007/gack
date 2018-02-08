<template>
  <div class="page">
    <div class="container">
      <el-breadcrumb separator=">" class = 'bread'>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>关于我们</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container about">
      <h1 class="title">国安创客公司简介</h1>
      <p>国安创客（北京）科技有限公司（简称“国安创客”） 在中信集团、国安集团双品牌背书支持下成立，致力于服务创新型的中小微企业。在国家“大众创业，万众创新”的大背景下，国安创客整合集团的优势产业资源，聚集社会资源，形成全要素、立体化的企业服务平台。为满足大众创业者最为迫切的资金、场地、市场、扶持与成长等需求，国安创客为中小微企业提供包括金融服务、空间租赁、营销服务、工商服务、知识产权服务、网络服务、培训服务等全方位支持，全面满足企业发展生命周期所需。</p>
      <img src="../../assets/images/gack/xgsjs.png" alt="">
      <div class="p_title">大众创业，万众创新</div>
      <p>国安创客自成立起，从京津冀协同发展的整体战略布局出发，分别在北京、天津与河北三地设立了完善配套的智能化办公空间，目前三地空间入驻企业近百家，创客空间更获批成为“国家级众创空间”。同时，国安创客自有完善的服务体系，包含近百家供应商及百余位签约导师。更通过举办首都青年创业创新大赛，出品品牌创业类真人秀节目等方式营造创新创业活力，支持创业企业发展。</p>
      <p>国安创客未来将致力于成为办公体系的建设者和领导者，借助空间创新服务、金融服务和办公服务产品，提供高效领先的企业发展解决方案。</p>
      <p>联系我们：北京市朝阳区四惠东华腾世纪总部公园D座。</p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'about'
  }
</script>
<style scoped>
  .page{
    background: #f3f3f3;
    padding-bottom: 90px;
  }
  .page .about{
    background: #fff;
    text-align:center;
    box-sizing: border-box;
    padding: 45px 40px 50px;
  }
  .page .about .title{
    font-size:22px;
    text-align:center;
  }
  .page .about p{
    color: #5D5D5D;
    line-height: 26px;
    text-align: justify;
    font-size:14px;
    text-indent:2em;
    text-justify: inter-ideograph;
    margin: 15px 0 10px;
  }
  .page .about p:nth-of-type(1){
    padding-top:25px;
  }
  .p_title{
    color: #bba083;
    margin:15px 0 10px;
    font-size: 22px;
    text-align:left;
  }
</style>
