<template>
  <!-- 刷新按钮 -->
  <el-button title="刷新" circle icon="Refresh" size="small" @click="flash"></el-button>
  <!-- 全屏按钮 -->
  <el-button title="全屏" circle icon="FullScreen" size="small" @click="fullScreen"></el-button>
  <!-- 设置按钮 -->
  <el-button title="设置" circle icon="Setting" size="small"></el-button>
  <!-- 这里是静态的头像 -->
  <img src="@/assets/icons/user.svg" style=" width: 24px;height: 24px;margin: 0 10px;">
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      <!-- 使用用户相关的仓库进行展示对应的名字 -->
      {{ useUserStore().username || username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="loginout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts" name="setting">
// 获取设置小仓库里的数据
import { useLayoutSettingStore } from '@/stores/modules/setting';
// 获取用户小仓库里的数据
import { useUserStore } from '@/stores/modules/user';
// 获取路由器对象
import router from '@/router/indexRoute';
// 获取路由对象
import { useRoute } from 'vue-router';

// 使用设置小仓库
let useStore = useLayoutSettingStore();
// 使用路由组件
let $route = useRoute();
let username = localStorage.getItem('username');

// 刷新按钮点击回调
const flash = () => {
  // 把仓库的数据修改下,用于实现当数据改变时进行页面的重新渲染
  useStore.refsh = !useStore.refsh
}
// 全屏按钮点击回调
const fullScreen = () => {
  // DOM的属性，用来判断当前是否为全屏状态，全屏：真，不是：null
  let full = document.fullscreenElement;
  // 切换为全屏模式
  if(!full){
    // 这个方法可以直接把页面变为全屏
    document.documentElement.requestFullscreen();
  }else{
    // 取消全屏
    document.exitFullscreen();
  }
}
// 退出按钮回调
const loginout = () =>{
  // 向服务器发请求，清除token
  // 仓库中关于用户的信息清空
  useUserStore().loginout()
  // 跳转登录页面 
  router.replace({
    path:'/login',
    // 在这里带的是跳转到login页面携带的参数，方便登录之后重新进入退出前的页面
    query:{redirect:$route.path}
  })
}
</script>

<style scoped lang="scss"></style>