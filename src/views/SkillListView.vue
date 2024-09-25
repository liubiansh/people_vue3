<template>
  <div class="echarts">
    <div class="left">
      <div id="main" ref="mainRef"></div>
      <div id="main" ref=""></div>
      <div id="main" ref=""></div>
    </div>
    <div class="right">
      <div id="main" ref=""></div>
      <div id="main" ref=""></div>
      <div id="main" ref=""></div>
    </div>
  </div>
</template>

<script setup lang="ts" name="echarts">
import { reactive,ref,onMounted,onBeforeUnmount } from 'vue';
import { axiosApi } from '@/api/indexApi';
import type { ISkillList } from '@/types/indexTypes';
import { useEcharts } from '@/hooks/useEcharts'

  // 初始化DOM标签的值
  const mainRef = ref()
  let skillData:ISkillList[] = reactive([])
  const { initEcharts, setOptions,unmountChart } = useEcharts();

  onMounted(async () => {
    // 初始化 mainRef的值并赋值给 myChart
    initEcharts(mainRef.value);
    await axiosApi({
      method:'get',
      url:"/worker/skillratio/H6616040"
    }).then(res => {

    }).catch(err => console.log('请求失败',err))
    console.log(skillData);
    // 定义 echats图的内容及格式
    // const options = {
    //   textStyle:{
    //     color:'#000'
    //   },
    //   title:{
    //     text:'技能級別人數分佈',
    //     textStyle: {
    //       color: '#333',
    //       fontSize:'18px'
    //     }
    //   },
    //   // x轴的数据
    //   xAxis: {
    //     data:skillData.map(item => item.skillLevel)
    //   },
    //   // y轴的类型
    //   yAxis: {
    //     type: 'value',
    //     splitNumber: 3, // 根据实际情况调整分割段数
    //     axisLabel: {
    //       interval: 'auto', // 根据数据自动调整标签显示间隔，也可以设置具体的数值
    //     },
    //   },
    //   series: [
    //     {
    //       type: 'bar',
    //       data:skillData.map(item => item.num),
    //       color:'#666',
    //     },
    //   ]
    // }
    // // 检测 option是否为空
    // setOptions(options); 
  })
  
  // 写在 echarts图
  onBeforeUnmount(() => {
    unmountChart()
  })
</script>

<style scoped>
.echarts {
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
  width: 100%;
  height: 85vh;
}
.left,
.right {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  width: 49%;
  min-width: 200px;
  min-height: 100px;
}
#main {
  margin-top: 3px;
  min-width: 200px;
  min-height: 190px;
  background-color: aliceblue;
}
</style>