<template>
  <div class="easyechats">
    <div id="main" ref="mainRef"></div>
  </div>
</template>

<script setup lang="ts" name="easyecharts">
  import { reactive, ref } from 'vue';
  import { axiosApi } from '@/api/indexApi';
  import * as echarts from 'echarts';
  import { onMounted } from 'vue';
  import type { skillListIterface } from '@/types/indexTypes';

  // 初始化DOM标签的值
  const mainRef = ref()
  // 定义 echart的值
  let myChart
  let skillData:skillListIterface[] = reactive([])

  onMounted(async () => {
    // 初始化 mainRef的值并赋值给 myChart
    myChart = echarts.init(mainRef.value);
    // 把收到的数据解构赋值
    const {data} =  await axiosApi.get("/skill/getskillnum")
    // 再赋值
    skillData = data.data
    console.log(skillData);
    // 定义 echats图的内容及格式
    const option = {
      textStyle:{
        color:'#000'
      },
      title:{
        text:'技能級別人數分佈',
        textStyle: {
          color: '#333'
        }
      },
      // x轴的数据
      xAxis: {
        data:skillData.map(item => item.skillLevel)
      },
      // y轴的类型
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'bar',
          data:skillData.map(item => item.num)
        }
      ]
    }
    // 前面为真才会执行后面
    option && myChart.setOption(option); 
  })
</script>

<style scoped>
span {
  font-size: 30px;
  color: black;
}
#main {
  margin-top: 20px;
  width: 300px;
  height: 300px;
}
</style>