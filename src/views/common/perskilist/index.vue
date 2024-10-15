<template>
  <div class="perskilist">

    <el-row>
      <el-col>
        <div id="main" ref="rRef"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div id="main" ref="nRef"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column v-for="(item, index) in mainListHeader" :key="index" :prop="item" :label="item" width="150" />
          <!-- <el-table-column fixed prop="name" label="Name" width="120" />
          <el-table-column prop="state" label="State" width="120" />
          <el-table-column prop="city" label="City" width="120" />
          <el-table-column prop="address" label="Address" width="300" />
          <el-table-column prop="address" label="Address" width="300" />
          <el-table-column prop="address" label="Address" width="300" />
          <el-table-column prop="zip" label="Zip" width="120" />
          <el-table-column prop="zip" label="Zip" width="120" />
          <el-table-column prop="zip" label="Zip" width="120" />
          <el-table-column prop="zip" label="Zip" width="120" />
          <el-table-column prop="zip" label="Zip" width="120" /> -->
          <!-- <el-table-column fixed="right" label="Operations" min-width="120"></el-table-column> -->
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="perskilist">

import { reactive, ref, onMounted, onBeforeUnmount } from 'vue';
import type { ISkillList } from '@/types/indexTypes';
import { useEcharts } from '@/hooks/useEcharts'
import { apiSkillRatio } from '@/api/common/perskilist';

const rRef = ref();
const nRef = ref()
let skillData: ISkillList[] = reactive([])
const { initSEcharts, setSimDataset, unmountChart } = useEcharts();

const mainListHeader = [
  "序號", "技能類型", "設備類型", "設備型號", "技能等級", "技能明細",
  "必修否", "考核方式", "考核次數", "考核結果", "考官姓名", "学习", "考核"
]
const tableData = [
  {
    序號: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    序號: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
]

onMounted(async () => {
  // 初始化 DOM标签
  const ratio = initSEcharts(rRef.value);
  const number = initSEcharts(nRef.value);
  // 请求数据
  skillData = Object.assign(skillData, (await apiSkillRatio()).data.map((item: ISkillList) => item))
  // 设备名称
  const eqData = skillData.map((item: ISkillList) => item.skillType + '\n' + item.equipmentType + '\n' + item.equipmentModel)
  // 各等级掌握数
  const tBData = skillData.map((item: ISkillList) => [item.learnBase, item.unlearnBase, item.totalBase])
  const tMData = skillData.map((item: ISkillList) => [item.learnMiddle, item.unlearnMiddle, item.totalMiddle])
  // 定义数据集每个柱子的名称
  const rArray = ['product', '初级掌握比例', '中级掌握比例', '高级掌握比例', '总掌握比例']
  const nArray = ['product', '初级掌握数', '中级掌握数', '高级掌握数', '已掌握总数']
  // 和设备名称及每个柱子的名称融合
  const ratDataArray = [rArray, ...eqData.map((value, index) => [value, ...tBData[index], '33'])];
  const numDataArray = [nArray,...eqData.map((value, index) => [value, ...tMData[index], '44'])];

  setSimDataset(ratio, ratDataArray, '个人掌握技能比例Top10', true, '%','掌握比例 = 已掌握技能数/技能总数\n总掌握比例 = 所有掌握比例之和')
  setSimDataset(number,numDataArray, '个人掌握技能数量Top10', true)
})

// 卸载 echarts图
onBeforeUnmount(() => {
  unmountChart()
})

</script>

<style scoped>
#main {
  width: 100%;
  margin-top: 3px;
  min-height: 200px;
  background-color: #d3d3d3;
  height: 50vh;
  min-height: 300px;
}

.el-table {
  margin-top: 10px;
}
</style>