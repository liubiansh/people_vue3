<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <Breakcrumb/>
    </div>
    <div class="tabbar_right">
      <Setting/>
    </div>
  </div>
</template>

<script setup lang="ts" name="tabbar">
import Breakcrumb from "./breakcrumb/index.vue";
import Setting from './setting/index.vue'
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);
  box-shadow: 2px 2px 4px rgba(0,0,0,.6);
  .tabbar_left {
    display: flex;
    // 纵轴居中
    align-items: center;
    margin-left: 20px;
  }
  .tabbar_right {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
}
</style>