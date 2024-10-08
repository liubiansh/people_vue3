<template>
  <div class="peraddskill">
    <!-- 可以学习的列表 -->
    <div class="skill-box">
      <h2>{{ h2[0] }}</h2>
      <!-- <span>點擊添加按鈕將左邊選中的技能添加到右邊待加入區</span> -->
      <div class="skill-box-table">
        <table>
          <th v-for="(item, index) in tableHead" :key="index">{{ item }}</th>
          <tr @click="getSkill(item, index)" v-for="(item, index) in allTable" :key="index"
            :class="{ active: isRowActive(index) }">
            <td>{{ index + 1 }}</td>
            <td>{{ item.skillType }}</td>
            <td>{{ item.equipmentType }}</td>
            <td>{{ item.equipmentModel }}</td>
            <td @click.stop><el-button @click="remSkill(index)" size="small" type="primary" plain
                title="点击添加到右侧待添加区">>></el-button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 选中区 -->
    <div class="study-box">
      <h2>{{ h2[1] }}</h2>
      <div class="study-box-table">
        <table>
          <th v-for="(item, index) in tableHead" :key="index">{{ item }}</th>
          <tr v-for="(item, index) in studyTable" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.skillType }}</td>
            <td>{{ item.equipmentType }}</td>
            <td>{{ item.equipmentModel }}</td>
            <td v-if="item">
              <el-button @click="delSkill" title="删除所选技能" size="small" type="danger" :icon="Delete" />
            </td>
          </tr>
        </table>
        <el-button class="add" title="将所选技能添加为待学技能" type="primary" plain @click="commitSkill">確認添加</el-button>
      </div>
    </div>
    <!-- 选中区的详细信息展示 -->
    <div class="message-box">
      <h2>{{ h2[2] }}</h2>
      <div class="message-box-table">
        <table>
          <th v-for="(item, index) in messageHead" :key="index">{{ item }}</th>
          <tr v-for="(item, index) in skillTable" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.skillType }}</td>
            <td>{{ item.equipmentType }}</td>
            <td>{{ item.equipmentModel }}</td>
            <td>{{ item.skillLevel }}</td>
            <td>{{ item.skillDetail }}</td>
            <td>{{ item.evaluationMethod }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="peraddskill">
import { apiSkilldetail, apiAddskill } from "@/api/user/clickApi";
import { apiSkillInventory } from "@/api/user/initApi";
import type { IParams } from "@/types/indexTypes";
import { Delete } from "@element-plus/icons-vue"
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";

// 表格头
const h2 = ['所有技能清單：', '待添加的學習清單：', '技能明細預覽：']
const tableHead = ['序号', '技能类型', '设备类型', '设备型号', '操作']
const messageHead = ['序号', '技能类型', '设备类型', '设备型号', '技能等级', '技能明细', '考核方式']
// 所有技能列表
let allTable = ref<IParams[]>([]);
// 待添加列表
let studyTable = ref<IParams[]>([]);
// 明细列表
let skillTable = ref<IParams[]>([]);

// 被激活的行
const activeRow = ref();
// 初始化激活样式
const isRowActive = (index: number) => index === activeRow.value;
// 添加激活行样式
const setActiveRow = (index: number) => activeRow.value = index;

// 挂载时先调取下所有技能的清单
onMounted(() => {
  getAllList()
  allTable.value.shift()
  studyTable.value.shift()
  skillTable.value.shift()
})

// 定义初始内容
let getAllList = async function () {
  allTable.value = (await apiSkillInventory()).data.map((item: any) => item)
}

// 点击时展示明细
let getSkill = async function (res: any, index: number) {
  setActiveRow(index)
  let params = {
    skillType: res.skillType,
    equipmentType: res.equipmentType,
    equipmentModel: res.equipmentModel
  }
  skillTable.value = (await apiSkilldetail(params)).data.map((item: any) => item)
}

// 移除当前项并加入到待添加表格
function remSkill(index: any) {
  const rowToMove = allTable.value.splice(index, 1)[0];
  studyTable.value.push(rowToMove);
}

// 删除当前项并在加入到所有技能清单中
function delSkill(index: number) {
  const rowToMove = studyTable.value.splice(index, 1)[0];
  allTable.value.unshift(rowToMove);
}

// 把待添加区的数据提交给数据库
let commitSkill = async function () {
  // 判断数据长度
  if(studyTable.value.length !== 0){
    let data = await apiAddskill(studyTable.value)
    // 如果没有返回结果，即为添加失败，跳出
    if (data) {
      return
    }
    studyTable.value.length = 0
    getAllList()
  }else{
    return ElMessage({
      type: 'error',
      message: '请选择技能'
    })
  }
}
</script>

<style scoped>
.peraddskill {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  /* border: 1px #fff solid; */
  color: #000;
  background: #e3fdfd;
  box-shadow: 0 1px 6px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06);

}

h2 {
  font-size: 20px;
  font-weight: 900;
}

.skill-box,
.study-box,
.message-box {
  flex: 1;
  margin: 10px 5px;
  margin-bottom: 0;
}

.skill-box,
.study-box {
  max-width: 240px;
}

.skill-box-table,
.study-box-table,
.message-box-table {
  height: 80vh;
  border-left: #000 1px solid;
  border-right: #000 1px solid;
  border-top: #000 1px solid;
  margin: 10px 0;
}

table {
  width: 100%;
  text-align: center;
  background-color: #fdfdfd;
  color: #333;
}

.el-button {
  padding: 0 10px;
  border: 1px solid #4ea4ff83;
  height: 100%;
  margin-bottom: 1px;
}

th {
  font-size: 13px;
  font-weight: 600;
}
td {
  height: 20px;
  line-height: 20px;
  cursor: pointer;
  font-size: 13px;
}

.add {
  width: 60px;
  height: 35px;
  margin-top: 5px;
  cursor: pointer;
  border-radius: 12px;
  float: right;
}

tr.active {
  background-color: #acf0ff;
}
</style>