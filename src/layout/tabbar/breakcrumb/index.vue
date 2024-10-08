<template>
  <!-- 顶部左侧图标 -->
  <el-icon title="点击缩放菜单" @click="changeIcon">
    <!-- 使用动态效果进行切换 -->
    <component :is="LayoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 面包屑，后面的属性是中间的分隔符 -->
  <el-breadcrumb separator-icon="ArrowRightBold">
    <!-- 面包屑动态展示名字与标题  -->
    <!-- 通过遍历 matched里面的路径信息，会分别把各级路由放在数组中 -->
    <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.name !== 'layout'"
      :to="item.path">
      <!-- 图标 -->
      <el-icon style="vertical-align: top;">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!-- 文字 -->
      <span style="margin: 0 4px;">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts" name="breakcrumb">
import { useLayoutSettingStore } from '@/stores/modules/setting'


let LayoutSettingStore = useLayoutSettingStore()
// 定义响应式数据控制图标的切换

function changeIcon() {
  // 点击时候切换图标
  LayoutSettingStore.fold = !LayoutSettingStore.fold
}

</script>

<style scoped>
.el-icon {
  cursor: pointer;
  margin-right: 10px;
  &:hover{
    color: #409eff;
  }
}
</style>