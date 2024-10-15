<template>
  <!-- 用插槽的形式展示内容 -->
  <RouterView v-slot="{ Component }">
    <!-- 外侧用动画标签包裹 -->
    <transition name="fade" :key="key">
      <component :is="Component"/>
    </transition>
  </RouterView>
</template>

<script setup lang="ts" name="layout-main">
import { useLayoutSettingStore } from '@/stores/modules/setting';
import { computed } from 'vue';

// 定义一个计算属性，监听仓库里refsh的值，当值改变时，key的值也会改变，进而重新渲染页面
let key = computed(() => JSON.stringify(useLayoutSettingStore().refresh));
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