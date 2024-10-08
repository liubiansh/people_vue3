<template>
  <!-- 用插槽的形式展示内容 -->
  <RouterView v-slot="{ Component }">
    <!-- 外侧用动画标签包裹 -->
     <!-- 当主页面点击刷新按钮时，会改变仓库里这个变量的值，用:key的方式来监听，
          当监听的值发生改变时，会重新渲染页面 
     -->
    <transition name="fade" :key="useLayoutSettingStore().refsh">
      <component :is="Component"/>
    </transition>
  </RouterView>
</template>

<script setup lang="ts" name="layout-main">
import { useLayoutSettingStore } from '@/stores/modules/setting';

</script>

<style scoped>
.fade-enter-from{
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-leave-to {
  transform: translateX(20px);
  opacity: 1; 
}
</style>