<template>
  <div id="app">
    <transition name="fade" mode='out-in'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {

    }
  }
}
</script>

<style>
@import './common/style/public.css';
#app,body,html{
  width: 100%;
  height: 100%;
}
</style>
