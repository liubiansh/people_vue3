<template>
  <div class="app">
    <div class="navigate">
      <RouterLink active-class="active" to="/person">個人信息</RouterLink>
      <RouterLink active-class="active" to="/skill">技能列表</RouterLink>
      <RouterLink active-class="active" to="/personSkill">個人技能明細</RouterLink>
      <RouterLink active-class="active" to="/AddSkill">新增技能明細</RouterLink>
      <RouterLink active-class="" to="/skill">skill</RouterLink>
      <RouterLink active-class="" to="/skill">skill</RouterLink>
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

</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 50px;
  font-weight: bolder;
}
.navigate {
  width: 200px;
  height: 100vh;
  display: flex;
  left: 0;
  top: 0;
  flex-direction: column;
  position: fixed;
  border-radius: 10px;
  padding: 0 50px;
  margin-top: 60px;
}
.navigate a {
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  text-align: center;
  margin-top: 5px;
  text-decoration: none;
  display: block;
  text-decoration: none;
  color: #333;
  &:hover{
    background-color: #64967e3f;
    border-radius: 50px;
    transition: 0.5s;
  }
}
.navigate a.active{
  background-color: #64967E !important; 
  color: #ffc268;
  border-radius: 50px;
  text-shadow: 0 0 100px black;
}
.main-content {
  margin-left: 280px;
  border-bottom: 0;
  border-left: 0;
  overflow: hidden;
}
</style>
