<template>
  <div class="page">
    <div class="container">
      <div class="back" @click = '$router.go(-1)'>
        < 返回上一步
      </div>
      <div class="view">
        <div class = 'service'>
          <img :src="service.imgSrc" alt="">
          <span class="title">{{ service.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      service: {
        title: '服务商名称',
        imgSrc: '~assets/gack/tp_a.png'
      }
    })
  }
</script>
<style scoped>
  .back{
    color: #ff0000;
    line-height:50px;
    font-size:14px;
  }
  .view{
    background: #fff;
    padding: 15px 20px;
  }
  .service {
    margin: 10px 0;
  }
  .service .title{
    margin-left: 15px;
  }
</style>
