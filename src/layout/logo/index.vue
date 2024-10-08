<template>
  <div class="logo">
    <!-- 通过一个文件来配置这些属性，可以做到不同属性的切换 -->
    <img :src="setting.logo">
    <!-- 使用仓库里的折叠状态 -->
    <transition >
      <p v-show="!useLayoutSettingStore().fold">{{ setting.title }}</p>
    </transition>
  </div>
</template>

<script setup lang="ts" name="logo">
// logo相关的路径及信息
import setting from '@/setting';
// 引入用户相关仓库
import { useLayoutSettingStore } from '@/stores/modules/setting';

</script>

<style scoped lang="scss">
.logo{
  // background-color: #333;
  color: #fff;
  font-weight: 600;
  height: $base-menu-logo-height;
  display: flex;
  align-items: center;
  padding: 13px;
  img{
    min-width: 35px;
    height: 35px;
    margin-right: 5px;
  }
  p{
    font-size: 20px;
    margin-left: 10px;
  }
}
</style>