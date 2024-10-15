<template>
  <div class="logo">
    <!-- 通过一个文件来配置这些属性，可以做到不同属性的切换 -->
    <img :src="setting.logo">
    <!-- 使用仓库里的折叠状态 -->
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts" name="logo">
// logo相关的路径及信息
import setting from '@/setting';

</script>

<style scoped lang="scss">
.logo{
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
    // 处理文本中空白符的方式，nowrap表示不换行
    white-space: nowrap;
  }
}
</style>