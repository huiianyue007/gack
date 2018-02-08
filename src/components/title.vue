<template>
  <div class="desc_title"><span class = 'inline-block tip'></span><slot></slot><div class="fr"><slot name="right"></slot></div></div>
</template>
<style scoped>
  .desc_title {
    font-size: 20px;
    font-weight: normal;
    padding: 28px 0 15px;
    border-bottom: 1px solid #efefef;
  }
  .desc_title .tip{
    width: 6px;
    height: 30px;
    border-radius: 2px;
    vertical-align: middle;
    margin: 0 19px 4px 0;
    background: #C7000A;
  }
</style>
