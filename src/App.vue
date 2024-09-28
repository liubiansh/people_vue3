<template>
  <div class="app">
    <div class="navigate" ref="navigate">
      <Navbar>
        <template v-slot="isCollapse">

        </template>
      </Navbar>
    </div>
    <!-- <div class="top-nav">
      <ul>
        <li>登录</li>
        <li>消息</li>
        <li>退出登录</li>
        <li></li>
      </ul>
    </div> -->
    <h1>人員管理系統歡迎您</h1>
    <div class="main-content">
      <RouterView/>
    </div>
  </div>
  
</template>

<script lang="ts" setup>
  import { RouterView } from 'vue-router';
  import Navbar from './components/Navbar.vue';
import { onMounted } from 'vue';
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
  display: block;
  width: 500px;
  font-size: 50px;
  font-weight: bolder;
  margin-left: 38%;
}
.main-content {
  padding-left: calc(var(--nav-width) + 30px);
  min-width: 710px;
  margin-bottom: 10px;
  margin-right: 20px;
}
</style>
