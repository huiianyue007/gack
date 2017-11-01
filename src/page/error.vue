<template>
    <p class="page-container">{{msg}}</p>
    
</template>
<script>

export default {
  name: 'error',
  data() {
    return {
        msg:'404 page not found'
    }
  }
}
</script>
<style  scoped>
    .page-container {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        position: absolute;
        top:50%;
        left:0;
        margin-top:-50px;
        text-align: center;
        color: rgb(192, 204, 218);
        background: #fff;
    }
</style>