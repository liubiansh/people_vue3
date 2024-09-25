<template>
  <div class="personskill">
    <!-- 顶部复选框搜索栏 -->
    <div>
      <table class="table-nav">
        <tr>
          <th>技能類型</th>
          <th>設備類型</th>
          <th>設備型號</th>
          <th>技能等級</th>
          <th>必修否</th>
          <th>考核方式</th>
          <th>考核結果</th>
          <th>篩選</th>
        </tr>
        <tr>
          <td>
            <el-select class="top-select" v-model="skillType" placeholder="全部">
              <el-option
                v-for="item in skillTypeData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </td>
          <td>
            <el-select class="top-select" v-model="equipmentType" placeholder="全部">
              <el-option
                v-for="item in equipmentTypeData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </td>
          <td>
            <el-select class="top-select" v-model="equipmentModel" placeholder="全部">
              <el-option
                v-for="item in equipmentModelData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </td>
          <td>
            <el-select class="top-select" v-model="skillLevel" placeholder="全部">
              <el-option
                v-for="item in skillLevelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </td>
          <td>
            <el-select class="top-select" v-model="compulsory" placeholder="全部">
              <el-option
                v-for="item in compulsoryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </td>
          <td>
            <el-select class="top-select" v-model="evaluationMethod" placeholder="全部">
              <el-option
                v-for="item in evaluationMethodOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </td>
          <td>
            <el-select class="top-select" v-model="evaluationResult" placeholder="全部">
              <el-option
                v-for="item in evaluationResultOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </td>
          <td>
            <button @click="search">查詢</button>
          </td>
        </tr>
      </table>
    </div>
    <!-- 内容区 -->
    <div>
      <table v-if="mainSkillList && mainSkillList.length > 0"  class="main-table">
        <tr>
          <th v-for="(item,index) in mainListHeader" :key="index">{{ item }}</th>
        </tr>
        <tr v-for="(item,index) in mainSkillList" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.skillType }}</td>
          <td>{{ item.equipmentType }}</td>
          <td>{{ item.equipmentModel }}</td>
          <td>{{ item.skillLevel }}</td>
          <td>{{ item.skillDetail }}</td>
          <td>{{ item.compulsory }}</td>
          <td>{{ item.evaluationMethod }}</td>
          <td>{{ item.evaluationCount }}</td>
          <td>{{ item.evaluationResult }}</td>
          <td>{{ item.examiner }}</td>
          <td>
            <button @click="startStudy">開始學習</button>
          </td>
          <td>
            <button @click="startEvaluation">開始考核</button>
          </td>
        </tr>
      </table>
      <div v-else>
        <div class="err">未查詢到相關數據，請重試......</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="PersonSkillView">
  import { ref,onMounted } from 'vue'
  import { storeToRefs } from 'pinia';
  // 引入从后端获取技能类型等的数据
  import {usePSkillStore} from '@/store/PersonSkillStore'
  // 引入搜索 hooks
  import useSearch from "@/hooks/useSearch"

  // 使用搜索 hooks
  const {mainSkillList,getSearchList} = useSearch()

  // 定义下拉框绑定的数据
  const skillType = ref('')
  const equipmentType = ref('')
  const equipmentModel = ref('')
  const skillLevel = ref('') 
  const compulsory = ref('')
  const evaluationMethod = ref('')
  const evaluationResult = ref('')
  // 表头数据
  const mainListHeader = ["序號","技能類型","設備類型","設備型號","技能等級","技能明細","必修否","考核方式","考核次數","考核結果","考官姓名","學習","考核"]
  // 技能等级
  const skillLevelOptions = [
    {
      value:'',
      label:'全部'
    },
    {
      value: '初級',
      label: '初級',
    },
    {
      value: '中級',
      label: '中級',
    },
    {
      value: '高級',
      label: '高級',
    },
  ]
  // 必修否
  const compulsoryOptions = [
    {
      value:'',
      label:'全部'
    },
    {
      value: '必修',
      label: '必修',
    },
    {
      value: '非必修',
      label: '非必修',
    },
  ]
  // 考核方式
  const evaluationMethodOptions = [
    {
      value:'',
      label:'全部'
    },
    {
      value: '線上考核',
      label: '線上考核',
    },
    {
      value: '線下考核',
      label: '線下考核',
    },
  ]
  // 考核结果
  const evaluationResultOptions = [
    {
      value:'',
      label:'全部'
    },
    {
      value: '通過',
      label: '通過',
    },
    {
      value: '未通過',
      label: '未通過',
    },
  ]

  // 使用集中式状态管理器
  const pskillstore = usePSkillStore()
  // 把数据从状态管理器中拿出来并进行响应式设置
  const {
    skillTypeData,
    equipmentModelData,
    equipmentTypeData
  } = storeToRefs(pskillstore)
  // 定义用于实现调取数据的函数
  function getPSkillList(){
    pskillstore.getPSkillList()
  }

  // 在挂载后触发调取函数
  onMounted(() => {
    getPSkillList()
    search()
  })
  
  // 使用查询函数
  async function search(){
    const searchList = {
      skillType:skillType.value,
      equipmentType:equipmentType.value,
      equipmentModel:equipmentModel.value,
      skillLevel:skillLevel.value,
      compulsory:compulsory.value,
      evaluationMethod:evaluationMethod.value,
      evaluationResult:evaluationResult.value,
    }
    getSearchList(searchList)
    // console.log(111,searchList);
  }

  // 学习函数
  async function startStudy(){
    // 点击进行当前页面的跳转，把视频教材呈现
  }
  // 考核函数
  function startEvaluation(){
    // 点击跳转考核页面
  }
</script>

<style scoped>
.table-nav,
.main-table {
  width: 95%;
  min-width: 1000px;
  margin: 20px 0;
}
.table-nav th,
.main-table th{
  font-weight: 900;
  font-size: 18px;
  height: 30px;
}
.main-table td{
  text-align: center;
  height: 22px;
  font-size: 14px;
}
.main-table button,
.table-nav button{
  border-radius: 5px;
  width: 95%;
  min-width: 65px;
  height: 90%;
  background-color: #bfa;
  color: #666;
  cursor: pointer;
}
.table-nav button {
  height: 30px;
}
.err{
  font-size: 20px;
}
</style>