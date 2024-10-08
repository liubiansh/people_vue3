<template>
  <div class="layout">
    <!-- 左侧菜单 -->
    <!-- 当菜单折叠时改变其宽度 -->
    <div class="layout_slider" :class="{ fold: useLayoutSettingStore().fold }">
      <!-- logo 组件-->
      <Logo></Logo>
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar" :class="{ fold: useLayoutSettingStore().fold }">
        <!-- 菜单 -->
        <!-- 默认激活的页面为路由的当前路径 -->
        <el-menu :collapse="useLayoutSettingStore().fold" :router="true" :default-active="$route.path"
          background-color="#303841" text-color="#fff">
          <!-- 把仓库里面的路由数组拿出来 -->
          <Menu :menuList="useUserStore().menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_tabbar" :class="{ fold: useLayoutSettingStore().fold }">
      <Tabbar></Tabbar>
    </div>
    <div class="layout_main" :class="{ fold: useLayoutSettingStore().fold }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts" name="layout">
// 引入 logo组件
import Logo from '@/layout/logo/index.vue'
// 引入导航栏组件
import Tabbar from './tabbar/index.vue'
// 引入 菜单组件
import Menu from './menu/index.vue'
// 引入路由切换组件
import Main from './main/index.vue'
// 引入用户相关的小仓库
import { useUserStore } from '@/stores/modules/user'
// 引入 layout小仓库
import { useLayoutSettingStore } from '@/stores/modules/setting'
import { onMounted } from 'vue'
// 监听窗口实现缩放
onMounted(() => {
  window.addEventListener('resize', () => {
    if (window.innerWidth < 1000) {
      useLayoutSettingStore().fold = true;
    } else {
      useLayoutSettingStore().fold = false;
    }
  });
});

</script>

<style scoped lang="scss">
.layout {
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all .3s;
    font-weight: bold;

    .scrollbar {
      height: calc(100vh - #{$base-menu-logo-height});

      .el-menu {
        border: none;
      }
    }

    &.fold {
      width: $base-menu-min-width;
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - #{$base-menu-width});
    height: $base-header-height;
    top: 0;
    left: $base-menu-width;
    transition: all .3s;

    &.fold {
      // 当添加次类名时，进行宽度的变化和定位的位置变化
      width: calc(100% - #{$base-menu-min-width});
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: fixed;
    width: calc(100% - #{$base-menu-width});
    height: calc(100vh - #{$base-header-height});
    top: $base-header-height;
    left: $base-menu-width;
    padding: 20px;
    padding-right: 5px;
    overflow: auto;
    transition: all .3s;

    &.fold {
      width: calc(100% - #{$base-menu-min-width});
      left: $base-menu-min-width;
    }
  }
}
</style>