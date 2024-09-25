<template>
  <div class="app">
    <div class="navigate" ref="navigate">
      <Navbar/>
    </div>
    <!-- <div class="top-nav">
      <ul>
        <li>登录</li>
        <li>消息</li>
        <li>退出登录</li>
        <li></li>
      </ul>
    </div> -->
    <h1 class="mb-2">人員管理系統歡迎您</h1>
    <div class="main-content">
      <RouterView/>
    </div>
  </div>
  
</template>

<script lang="ts" setup>
  import { RouterLink,RouterView } from 'vue-router';
  import Navbar from './components/Navbar.vue';
import { onMounted, onUpdated, ref } from 'vue';
onMounted(() => {
  window.addEventListener('resize', () => {
    if(window.innerWidth < 1000){
      document.documentElement.style.setProperty('--nav-width', '64px');
    } else {
      document.documentElement.style.setProperty('--nav-width', '200px');
    }
  });
});

</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 50px;
  font-weight: bolder;
}
.main-content {
  padding-left: calc(var(--nav-width) + 30px);
  border-bottom: 0;
  border-left: 0;
  min-width: 710px;
  overflow: hidden;
}
</style>
