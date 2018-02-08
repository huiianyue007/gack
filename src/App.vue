<template>
  <div id="app">
    <transition name="el-fade-in" mode='out-in'>
      <keep-alive :include="['patentmark', 'trademark']">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style src = '@/common/style/public.css'>
</style>
