<template>
  <div class="per-ski-detail">
    <el-card>
      <el-table header-align="center"  empty-text="暂无数据" :data="data">
        <el-table-column align="center" v-for="(selectConfig, index) in selectConfigs" :key="index" :label="selectConfig.label">
          <template #default>
            <el-select v-model="selectedValues[index]" :placeholder="selectConfig.placeholder">
              <el-option v-for="option in selectConfig.options" :key="option.value" :label="option.label"
                :value="option.value" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="篩選">
          <template #default>
            <el-button plain type="primary" @click="search">查询</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card>
      <el-table id="table2" empty-text="暂无数据" border stripe :data="mainSkillList" size="small">
        <!-- 用type属性控制显示的内容 -->
        <el-table-column fixed label="序号" min-width="40" type="index"></el-table-column>
        <el-table-column prop="skillType" label="技能类型" min-width="80"></el-table-column>
        <el-table-column prop="equipmentType" label="设备类型" min-width="80"></el-table-column>
        <el-table-column prop="equipmentModel" label="设备型号" min-width="80"></el-table-column>
        <el-table-column prop="skillLevel" label="技能等级" min-width="70"></el-table-column>
        <el-table-column prop="skillDetail" label="技能详情" min-width="140"></el-table-column>
        <el-table-column prop="compulsory" label="是否必修" min-width="80"></el-table-column>
        <el-table-column prop="evaluationMethod" label="考核方式" min-width="80"></el-table-column>
        <el-table-column prop="evaluationCount" label="考核次数" min-width="80"></el-table-column>
        <el-table-column prop="evaluationResult" label="考核结果" min-width="80"></el-table-column>
        <el-table-column prop="examiner" label="考核人" min-width="70"></el-table-column>
        <el-table-column label="学习">
          <template #default>
            <el-button plain type="primary" size="small" @click="startStudy">开始学习</el-button>
          </template>
        </el-table-column>
        <el-table-column label="考核">
          <template #default>
            <el-button plain type="primary" size="small" @click="startEvaluation">开始考核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="perskidetail">
import { ref, onMounted } from 'vue'
// 引入搜索 hooks
import useSearch from "@/hooks/useSearch"
import { apiEquipmentModel, apiEquipmentType, apiSkillType } from '@/api/common/perskidetail';
// 使用搜索 hooks
const { mainSkillList, getSearchList } = useSearch()
// 定义下拉框数据
let skillTypeData = ref()
let equipmentTypeData = ref()
let equipmentModelData = ref()
// 定义表格数据，数组里有个几个内容表示有几行数据
const data = ['1']
// 下拉框配置项
let selectConfigs = ref([
  // 技能类型
  {
    label: '技能類型',
    placeholder: '全部',
    options: skillTypeData
  },
  // 设备类型
  {
    label: '設備類型',
    placeholder: '全部',
    options: equipmentTypeData
  },
  // 设备型号
  {
    label: '設備型號',
    placeholder: '全部',
    options: equipmentModelData
  },
  // 技能等级
  {
    label: '技能等級',
    placeholder: '全部',
    options: [
      { value: '', label: '全部' },
      { value: '初級', label: '初級' },
      { value: '中級', label: '中級' },
      { value: '高級', label: '高級' },
    ]
  },
  // 必修否
  {
    label: '必修否',
    placeholder: '全部',
    options: [
      { value: '', label: '全部' },
      { value: '必修', label: '必修' },
      { value: '非必修', label: '非必修' },
    ]
  },
  // 考核方式
  {
    label: '考核方式',
    placeholder: '全部',
    options: [
      { value: '', label: '全部' },
      { value: '線上考試', label: '線上考試' },
      { value: '線下實操', label: '線下實操' },
    ]
  },
  // 考核结果
  {
    label: '考核結果',
    placeholder: '全部',
    options: [
      { value: '', label: '全部' },
      { value: '通過', label: '通過' },
      { value: '未通過', label: '未通過' },
    ]
  },
]);
// 存储下拉框选中的值
const selectedValues = ref(new Array(selectConfigs.value.length).fill(null));
// 使用查询函数
function search() {
  let searchList: any = {
    skillType: '',
    equipmentType: '',
    equipmentModel: '',
    skillLevel: '',
    compulsory: '',
    evaluationMethod: '',
    evaluationResult: '',
  };
  // 把下拉框选中的值遍历添加到对应的属性中
  Object.keys(searchList).forEach((key, index) => {
    if (index < selectedValues.value.length) {
      searchList[key] = selectedValues.value[index];
    }
  });
  getSearchList(searchList)
}
// 获取下拉框数据
async function getPSkillList() {
  skillTypeData.value = (await apiSkillType()).data.map((item: any) => ({
    value: item,
    label: item
  }))
  equipmentTypeData.value = (await apiEquipmentType()).data.map((item: any) => ({
    value: item,
    label: item
  }))
  equipmentModelData.value = (await apiEquipmentModel()).data.map((item: any) => ({
    value: item,
    label: item
  }))
  // 定义一个对象并添加在最上面
  let all = { value: '', label: '全部' }
  skillTypeData.value.unshift(all)
  equipmentTypeData.value.unshift(all)
  equipmentModelData.value.unshift(all)
}
// 在挂载后拉取页面数据
onMounted(() => {
  getPSkillList()
  search()
})
// 学习函数
async function startStudy() {
  // 点击进行当前页面的跳转，把视频教材呈现
}
// 考核函数
function startEvaluation() {
  // 点击跳转考核页面
}
</script>

<style scoped>
.el-card {
  margin-top: 20px;
}

.el-table {
  width: 100%;

  & .el-button {
    width: 100%;
  }
}

#table2 {
  height: 70vh;
}
</style>