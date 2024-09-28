<template>
  <div class="echarts">
    <div class="left">
      <div id="main" ref="rBRef"></div>
      <div id="main" ref="rMRef"></div>
      <div id="main" ref="rHRef"></div>
    </div>
    <div class="right">
      <div id="main" ref="tBRef"></div>
      <div id="main" ref="tMRef"></div>
      <div id="main" ref="tHRef"></div>
    </div>
  </div>
</template>

<script setup lang="ts" name="echarts">
import { reactive, ref, onMounted, onBeforeUnmount, toRefs } from 'vue';
import { axiosApi } from '@/api/indexApi';
import type { ISkillList } from '@/types/indexTypes';
import { useEcharts } from '@/hooks/useEcharts'

// 初始化DOM标签的值
const rBRef = ref()
const rMRef = ref()
const rHRef = ref()
const tBRef = ref()
const tMRef = ref()
const tHRef = ref()

let skillData: ISkillList[]
const { initEcharts, unmountChart } = useEcharts();

onMounted(async () => {
  // 初始化 mainRef的值并赋值给 myChart
  const rB = initEcharts(rBRef.value);
  const rM = initEcharts(rMRef.value);
  const rH = initEcharts(rHRef.value);
  const tB = initEcharts(tBRef.value);
  const tM = initEcharts(tMRef.value);
  const tH = initEcharts(tHRef.value);
  await axiosApi({
    method: 'get',
    url: "/worker/skillratio/H6616040"
  }).then(res => {
    skillData = reactive(res.data.data.map((item: ISkillList) => item))
    console.log(skillData);

  }).catch(err => console.log('请求失败', err))

  // 设备名称
  const eqData = skillData.map((item: ISkillList) => item.skillType + '\n' + item.equipmentType + '\n' + item.equipmentModel)
  // 掌握百分比
  const rBData = skillData.map((item: ISkillList) => item.ratioBase)
  const rMData = skillData.map((item: ISkillList) => item.ratioMiddle)
  const rHData = skillData.map((item: ISkillList) => item.ratioHigh)
  // 各等级掌握数
  const tBData = skillData.map((item: ISkillList) => [item.learnBase, item.unlearnBase, item.totalBase])
  const tMData = skillData.map((item: ISkillList) => [item.learnMiddle, item.unlearnMiddle, item.totalMiddle])
  const tHData = skillData.map((item: ISkillList) => [item.learnHigh, item.unlearnHigh, item.totalHigh])
  // 和设备融合
  const rBArry = eqData.map((value, index) => [value, rBData[index]]);
  const rMArry = eqData.map((value, index) => [value, rMData[index]]);
  const rHArry = eqData.map((value, index) => [value, rHData[index]]);
  const tBArry = eqData.map((value, index) => [value, ...tBData[index]]);
  const tMArry = eqData.map((value, index) => [value, ...tMData[index]]);
  const tHArry = eqData.map((value, index) => [value, ...tHData[index]]);
  // 定义图表数据
  const rBOption = {
    textStyle: {
      color: '#333'
    },
    title: {
      text: '初级技能_个人掌握比例',
      subtext: '已掌握数/技能总数',
      subtextStyle: {
        align: 'right'
      },
      left: 'center'
    },
    grid: {
      top: '28%',
      left: '9%'
    },
    width: 480,
    height: 100,
    dataset: [
      {
        dimensions: ['name', 'score',],
        source: rBArry
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'score', order: 'desc' }
        }
      }
    ],
    xAxis: {
      type: 'category',
      axisLabel: { interval: 0 }
    },
    yAxis: {
      axisLabel: {
        formatter: function (value: number) {
          return value + '%';
        }
      }
    },
    series: {
      type: 'bar',
      encode: { x: 'name', y: 'score' },
      datasetIndex: 1,
      label: {
        show: true,
        position: 'top',
        color: '#666',
        formatter: function (value: any) {
          return value.data[1] + '%';
        }
      }
    }
  };
  const rMOption = {
    textStyle: {
      color: '#333'
    },
    title: {
      text: '中级技能_个人掌握比例',
      subtext: '已掌握数/技能总数',
      subtextStyle: {
        align: 'right'
      },
      left: 'center'
    },
    grid: {
      top: '28%',
      left: '9%'
    },
    width: 480,
    height: 100,
    dataset: [
      {
        dimensions: ['name', 'score',],
        source: rMArry
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'score', order: 'desc' }
        }
      }
    ],
    xAxis: {
      type: 'category',
      axisLabel: { interval: 0 }
    },
    yAxis: {
      axisLabel: {
        formatter: function (value: number) {
          return value + '%';
        }
      }
    },
    series: {
      type: 'bar',
      encode: { x: 'name', y: 'score' },
      datasetIndex: 1,
      label: {
        show: true,
        position: 'top',
        color: '#666',
        formatter: function (value: any) {
          return value.data[1] + '%';
        }
      }
    }
  };
  const rHOption = {
    textStyle: {
      color: '#333'
    },
    title: {
      text: '高级技能_个人掌握比例',
      subtext: '已掌握数/技能总数',
      subtextStyle: {
        align: 'right'
      },
      left: 'center'
    },
    grid: {
      top: '28%',
      left: '9%'
    },
    width: 480,
    height: 100,
    dataset: [
      {
        dimensions: ['name', 'score',],
        source: rHArry
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'score', order: 'desc' }
        }
      }
    ],
    xAxis: {
      type: 'category',
      axisLabel: { interval: 0 }
    },
    yAxis: {
      axisLabel: {
        formatter: function (value: number) {
          return value + '%';
        }
      }
    },
    series: {
      type: 'bar',
      encode: { x: 'name', y: 'score' },
      datasetIndex: 1,
      label: {
        show: true,
        position: 'top',
        color: '#666',
        formatter: function (value: any) {
          return value.data[1] + '%';
        }
      }
    }
  };
  const tBOption = {
    textStyle: {
      color: '#333'
    },
    title: {
      text: '初级技能_个人掌握数量',
      left: 'center'
    },
    grid: {
      top: '28%',
      left: '5%'
    },
    width: 500,
    height: 100,
    legend: {
      right: 0, // 放在右侧
      orient: 'vertical' // 垂直布局
    },
    tooltip: {},
    dataset: {
      dimensions: ['product', '已掌握数', '未掌握数', '技能总数'],
      source: tBArry
    },
    xAxis: { type: 'category', axisLabel: { interval: 0 } },
    yAxis: {},
    series: [
      {
        type: 'bar',
        label: {
          show: true,
          position: 'top', // 可以设置为'top'、'bottom'、'left'、'right'、'center'等，表示标签的位置
          color: "#666",
          fontSize: 9
        }
      },
      {
        type: 'bar',
        label: {
          show: true,
          position: 'top', // 可以设置为'top'、'bottom'、'left'、'right'、'center'等，表示标签的位置
          color: "#666",
          fontSize: 9
        }
      },
      {
        type: 'bar',
        label: {
          show: true,
          position: 'top', // 可以设置为'top'、'bottom'、'left'、'right'、'center'等，表示标签的位置
          color: "#666",
          fontSize: 9
        }
      },
    ]
  };
  const tMOption = {
    textStyle: {
      color: '#333'
    },
    title: {
      text: '中级技能_个人掌握数量',
      left: 'center'
    },
    grid: {
      top: '28%',
      left: '5%'
    },
    width: 480,
    height: 100,
    legend: {
      right: 0, // 放在右侧
      orient: 'vertical' // 垂直布局
    },
    tooltip: {},
    dataset: {
      dimensions: ['product', '已掌握数', '未掌握数', '技能总数'],
      source: tMArry
    },
    xAxis: { type: 'category', axisLabel: { interval: 0 } },
    yAxis: {},
    series: [
      {
        type: 'bar',
        label: {
          show: true,
          position: 'top', // 可以设置为'top'、'bottom'、'left'、'right'、'center'等，表示标签的位置
          color: "#666",
          fontSize: 9
        }
      },
      {
        type: 'bar',
        label: {
          show: true,
          position: 'top', // 可以设置为'top'、'bottom'、'left'、'right'、'center'等，表示标签的位置
          color: "#666",
          fontSize: 9
        }
      },
      {
        type: 'bar',
        label: {
          show: true,
          position: 'top', // 可以设置为'top'、'bottom'、'left'、'right'、'center'等，表示标签的位置
          color: "#666",
          fontSize: 9
        }
      },
    ]
  };
  const tHOption = {
    textStyle: {
      color: '#333'
    },
    title: {
      text: '高级技能_个人掌握数量',
      left: 'center'
    },
    grid: {
      top: '28%',
      left: '5%'
    },
    width: 480,
    height: 100,
    legend: {
      right: 0, // 放在右侧
      orient: 'vertical' // 垂直布局
    },
    tooltip: {},
    dataset: {
      dimensions: ['product', '已掌握数', '未掌握数', '技能总数'],
      source: tHArry
    },
    xAxis: { type: 'category', axisLabel: { interval: 0 } },
    yAxis: {},
    series: [
      {
        type: 'bar',
        label: {
          show: true,
          position: 'top', // 可以设置为'top'、'bottom'、'left'、'right'、'center'等，表示标签的位置
          color: "#666",
          fontSize: 9
        }
      },
      {
        type: 'bar',
        label: {
          show: true,
          position: 'top', // 可以设置为'top'、'bottom'、'left'、'right'、'center'等，表示标签的位置
          color: "#666",
          fontSize: 9
        }
      },
      {
        type: 'bar',
        label: {
          show: true,
          position: 'top', // 可以设置为'top'、'bottom'、'left'、'right'、'center'等，表示标签的位置
          color: "#666",
          fontSize: 9
        }
      },
    ]
  };
  // 创建图表
  rB.setOption(rBOption)
  rM.setOption(rMOption)
  rH.setOption(rHOption)
  tB.setOption(tBOption)
  tM.setOption(tMOption)
  tH.setOption(tHOption)
})

// 卸载 echarts图
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
}

.left,
.right {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  margin-right: 2px;
  width: 49%;
  height: 100%;
  min-width: 550px;
}

#main {
  margin-top: 3px;
  width: auto;
  height: 220px;
  background-color: aliceblue;
}
</style>