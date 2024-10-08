<template>
  <div class="perskilist">
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

<script setup lang="ts" name="perskilist">
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue';
import { apiSkillRatio } from '@/api/user/initApi';
import type { ISkillList } from '@/types/indexTypes';
import { useEcharts } from '@/hooks/useEcharts'

// 初始化DOM标签的值
const rBRef = ref()
const rMRef = ref()
const rHRef = ref()
const tBRef = ref()
const tMRef = ref()
const tHRef = ref()

let skillData:ISkillList[] = reactive([])
const { initSEcharts, setBasicBar, setSimDataset, unmountChart } = useEcharts();

onMounted(async () => {
  // 初始化 mainRef的值并赋值给 myChart
  const rB = initSEcharts(rBRef.value);
  const rM = initSEcharts(rMRef.value);
  const rH = initSEcharts(rHRef.value);
  const tB = initSEcharts(tBRef.value);
  const tM = initSEcharts(tMRef.value);
  const tH = initSEcharts(tHRef.value);
  // 请求数据
  skillData = Object.assign(skillData,(await apiSkillRatio()).data.map((item: ISkillList) => item))
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
  // 定义数据集每个柱子的名称
  const datasetArry = ['已掌握数', '未掌握数', '技能总数']

  setBasicBar(rB, rBArry, '初级技能_个人掌握比例', '已掌握数/技能总数')
  setBasicBar(rM, rMArry, '中级技能_个人掌握比例', '已掌握数/技能总数')
  setBasicBar(rH, rHArry, '高级技能_个人掌握比例', '已掌握数/技能总数')
  setSimDataset(tB, tBArry,datasetArry, '初级技能_个人掌握数量')
  setSimDataset(tM, tMArry,datasetArry, '中级技能_个人掌握数量')
  setSimDataset(tH, tHArry,datasetArry, '高级技能_个人掌握数量')
})

// 卸载 echarts图
onBeforeUnmount(() => {
  unmountChart()
})
</script>

<style scoped>
.perskilist {
  display: flex;
  justify-content: space-evenly;
}

.left,
.right {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  width: 50%;
  margin-right: 5px;
  height: 100%;
  min-width: 500px;
}

#main {
  width: 100%;
  margin-top: 3px;
  min-height: 200px;
  background-color: #c9d6df;
}
</style>