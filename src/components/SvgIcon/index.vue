/**
* 这个文件是用来封装svg图标的
*/
<template>
  <svg :width="width" :height="height" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <use xlink:href="foxconn.svg"></use>
  </svg>
</template>

<script setup lang="ts" name="">
// 接收父组件传递过来的参数
defineProps({
  // href属性值的前缀
  // prefix: {
  //   type: String,
  //   default: '#icon-'
  // },
  // 图标名字
  name: String,
  // 颜色
  color: {
    type: String,
    default: ''
  },
  // 图标大小
  width: {
    type: String,
    default: '16px'
  },
  height: {
    type: String,
    default: '16px'
  }
})
</script>

<style scoped></style>