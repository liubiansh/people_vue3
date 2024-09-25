<template>
  <div class="addskill">
    <!-- 可以学习的列表 -->
    <div class="skill-box">
      <h2>{{ h2[0] }}</h2>
      <!-- <span>點擊添加按鈕將左邊選中的技能添加到右邊待加入區</span> -->
      <div class="skill-box-table">
        <table>
          <th v-for="(item, index) in tableHead" :key="index">{{ item }}</th>
          <tr @click="getSkill(item, index)" v-for="(item, index) in table1Data" :key="index"
            :class="{ active: isRowActive(index) }">
            <td>{{ index + 1 }}</td>
            <td>{{ item.skillType }}</td>
            <td>{{ item.equipmentType }}</td>
            <td>{{ item.equipmentModel }}</td>
            <td @click.stop><el-button @click="remSkill(index)" size="small" type="primary" plain title="点击添加到右侧待添加区">>></el-button>
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
          <tr v-for="(item, index) in table2Data" :key="index">
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
          <tr v-for="(item, index) in table3Data" :key="index">
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

<script setup lang="ts" name="AddSkillView">
import { axiosApi } from "@/api/indexApi";
import { Delete } from "@element-plus/icons-vue"
import { onMounted, ref } from "vue";

// 表格头
const h2 = ['所有技能清單：', '待添加的學習清單：', '技能明細預覽：']
const tableHead = ['序号', '技能类型', '设备类型', '设备型号', '操作']
const messageHead = ['序号', '技能类型', '设备类型', '设备型号', '技能等级', '技能明细', '考核方式']
// 所有技能列表
let table1Data = ref([{
  skillType: '',
  equipmentModel: '',
  equipmentType: '',
}]);
// 待添加列表
let table2Data = ref([{
  skillType: '',
  equipmentModel: '',
  equipmentType: '',
}]);
// 明细列表
let table3Data = ref([{
  skillType: '',
  equipmentModel: '',
  equipmentType: '',
  skillLevel: '',
  skillDetail: '',
  evaluationMethod: '',
}])

// 被激活的行
const activeRowId = ref();
// 初始化激活样式
const isRowActive = (index: number) => index === activeRowId.value;
// 添加激活行样式
const setActiveRow = (index: number) => activeRowId.value = index;

// 挂载时先调取下所有技能的清单
onMounted(() => {
  getAllList()
  table1Data.value.shift()
  table2Data.value.shift()
  table3Data.value.shift()
})

// 定义初始内容
let getAllList = async function () {
  axiosApi({
    method: 'get',
    url: '/worker/skillInventory'
  }).then(res => table1Data.value = res.data.data.map((item: any) => item))
    .catch(err => console.log('初始内容获取失败', err))
}

// 点击时展示明细
function getSkill(res: any, index: number) {
  setActiveRow(index)
  axiosApi({
    method: 'get',
    url: '/worker/skilldetail',
    params: {
      skillType: res.skillType,
      equipmentType: res.equipmentType,
      equipmentModel: res.equipmentModel
    }
  }).then(res =>  table3Data.value = res.data.data.map((item: any) => item))
    .catch(err => console.log('请求明细错误', err))
}

// 移除当前项并加入到待添加表格
function remSkill(index: any) {
  console.log(index);
  const rowToMove = table1Data.value.splice(index, 1)[0];
  table2Data.value.push(rowToMove);
}

// 删除当前项并在加入到所有技能清单中
function delSkill(index: number) {
  const rowToMove = table2Data.value.splice(index, 1)[0];
  table1Data.value.unshift(rowToMove);
}

// 把待添加区的数据提交给数据库
function commitSkill() {
  axiosApi({
    method: 'put',
    url: '/worker/addskill/H6616040',
    data: table2Data.value
  }).then(res => console.log("添加成功", res))
    .catch(err => console.log('添加错误', err))
  table2Data.value.length = 0
  getAllList()
}
</script>

<style scoped>
.addskill {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  border: 1px #fff solid;
  color: #000;
  background-image: linear-gradient(135deg, #f5f7fa69 0%, #c3cfe254 100%);
}

h2 {
  font-size: 22px;
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
  min-height: 600px;
  border-left: #000 1px solid;
  border-right: #000 1px solid;
  border-top: #000 1px solid;
  margin: 10px 0;
}

table {
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: #fff;
  color: #000;
}

.el-button {
  padding: 0 10px;
  border: 1px solid #00000000;
  height: 98%;
  margin-bottom: 1px;
}

td {
  height: 20px;
  line-height: 20px;
  cursor: pointer;
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
  background-color: rgb(135, 207, 235);
}
</style>