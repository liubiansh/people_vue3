<template>
  <el-row class="navigate">
    <el-col>
      <el-menu
        :default-active="activeMenuItem || initActive || 'person'"
        class="el-menu-vertical-demo"
        :router="true"
        :collapse="isCollapse"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>个人管理</span>
          </template>
          <el-menu-item index="person" @click="defaultActive('person')">个人信息</el-menu-item>
          <el-menu-item index="skill" @click="defaultActive('skill')">技能列表</el-menu-item>
          <el-menu-item index="personSkill" @click="defaultActive('personSkill')">个人技能明细</el-menu-item>
          <el-menu-item index="addSkill" @click="defaultActive('addSkill')">添加技能</el-menu-item>
          <!-- 可以里面嵌套使用，形成三级菜单 -->
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><Menu /></el-icon>
          <span>人员管理</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><location /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
  <!-- 可以用下面的方式分组，相当于三级菜单 -->
  <!-- <el-menu-item-group title="Group One">
    <el-menu-item index="/person">item one</el-menu-item>
    <el-menu-item index="/skill">item two</el-menu-item>
  </el-menu-item-group> -->
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const isCollapse = ref(false)
let activeMenuItem = sessionStorage.getItem('activeMenuItem')
const initActive = localStorage.getItem('activeMenuItem')

// let isShow = defineProps(['send'])
// isShow.send(isCollapse)

 
// 监听窗口实现导航栏的缩放
onMounted(() => {
  window.addEventListener('resize', () => {
    if(window.innerWidth < 1000){
      isCollapse.value = true;
    } else {
      isCollapse.value = false;
    }
  });
});

onBeforeUnmount(() => {
  localStorage.setItem('activeMenuItem','person')
})

// 将点击的路径存到本地
function defaultActive(value:string){
  sessionStorage.setItem('activeMenuItem', value);
}

// const handleOpen = (key: string, keyPath: string[]) => {
//   localStorage.setItem('activeMenuItem', path.value);
//   console.log(path.value);

// }
// const handleClose = (key: string, keyPath: string[]) => {
//   localStorage.setItem('activeMenuItem', path.value);
//   console.log(key, keyPath)
//   console.log(path.value);
// }
</script>

<style>
.navigate {
  width: var(--nav-width);
  height: 110vh;
  display: flex;
  left: 0;
  top: 0;
  flex-direction: column;
  position: fixed;
  border-radius: 10px;
  /* padding-top: 70px;
  padding-left: 2vw; */
  z-index: 100;
}
.el-menu-vertical-demo {
  border-radius: 10px;
  overflow: auto;
  max-height: 88%;
}
</style>