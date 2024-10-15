<template>
  <div class="app">
    <RouterView/>
  </div>
  
</template>

<script lang="ts" setup>
  import { RouterView } from 'vue-router';

</script>

<style>
#nprogress .bar {
  background-image: linear-gradient(to right, #a8edea 0%, #fed6e3 100%)!important
}
</style>
