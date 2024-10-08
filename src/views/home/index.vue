<template>
  <div class="home">
    <div class="top">
      <img src="@/assets/images/吴彦祖.jpg" alt="照片" class="photo">
      <div class="wordlist">
        <ul>  
          <!-- 每次遍历的时候添加上对应的数据 -->
          <li v-for="(value,key) in data[0]" :key="key">
            <span>{{ value }}</span>
            <span class="listNumber">{{ messageList[key] }}</span>
          </li>
        </ul>
      </div>
      <div class="wordlist">
        <ul>
          <li v-for="(value,key,index) in data[1]" :key="key">
            <!-- 通过遍历动态添加类名 -->
            <span :class="{'n2': index < 2}">{{ value }}</span>
            <span class="listNumber" >{{ messageList[key] }}</span>
          </li>
        </ul>
      </div>
      <div class="fight">
        <h2>戰力值：</h2>
        <div class="fight-number">{{ messageList.zhanScore }}</div>
      </div>
    </div>
    <div class="container">
      <div class="table-name">獎懲記錄:</div>
      <table class="punish">
        <tr>
          <th v-for="(item) in data[2]">{{item}}</th>
        </tr>
        <tr>
          <td>H1234567</td>
          <td>劉亦菲</td>
          <td>EE2</td>
          <td>AOI</td>
          <td>獎勵</td>
          <td>2024/2/1</td>
          <td>扶老奶奶過馬路</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
    <div class="container">
      <div class="table-name">工作履歷</div>
      <table class="history">
        <tr>
          <th v-for="(item) in data[3]">{{item}}</th>
        </tr>
        <tbody>
          <tr>
            <td>H1234567</td>
            <td>劉亦菲</td>
            <td>EE2</td>
            <td>AOI</td>
            <td>2024/2/1</td>
            <td>負責工作人員的每日調度</td>
            <td>負責工作人員的每日調度</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts" name="home">
  import { apiUserInfo } from '@/api/user/initApi';
  import type { IPerson } from '@/types/indexTypes';
  import { onMounted, reactive } from 'vue';
  const data = [
    // 左边的列表
    {
      userid:'工號：',
      username:'姓名：',
      sex:'性別：',
      ziwei:'資位：',
      zhiwei:'職位：',
      louceng:'樓層：',
      address:'籍貫：',
      nianzi:'年資：'
    },
    // 右边的列表
    {
      chu: "事業處：",
      bu: "事業部：",
      group1: "團隊一級：",
      group2: "團隊二級：",
      group3: "團隊三級：",
      workdate: "入廠日期：",
      birthday: "出生日期：",
      phone: "聯繫方式：",
    },
    // 奖惩表格
    {
      userid:'工號',
      username:'姓名',
      group1: "團隊一級",
      group2: "團隊二級",
      group3: "團隊三級",
      date:'日期',
      rewards:'奖惩',
      rewardsdata:'奖惩原因',
      rewardsresult:'奖惩结果',
      note:'备注',
    },
    // 工作履历
    {
      userid:'工號',
      username:'姓名',
      group1: "團隊一級",
      group2: "團隊二級",
      group3: "團隊三級",
      date:'日期',
      message:'详细信息'
    }
  ]
  let messageList:IPerson = reactive({})
  

  // 在页面开始挂载时触发
  onMounted(async ()=>{
    messageList = Object.assign(messageList,(await apiUserInfo()).data)
 })
</script>

<style scoped>
/* 上半部分设置 */
.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}
.photo {
  width: 200px;
  height: 100%;
  margin: 30px;
  border: 2px solid black;
}
.wordlist {
  min-width: 190px;
  font-size: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  line-height: 25px;
  padding: auto 0;
  & ul{
    padding-top: 40px;
    & li{
      padding: 2px 0;
    }
  }
}
.fight {
  margin: auto 0;
  border-radius: 20px;
  width: 130px;
  text-align: center;
  position: relative;
  margin-right: 30px;
  &::before,
  &::after{
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: inherit;
    background-image: linear-gradient(-20deg, #616161 0%, #9bc5c3 100%);
    padding: 2px;
    top: -2px;
    left: -2px;
    z-index: -1;
  }
  &::after{
    filter: blur(30px);
  }
}
.fight-number {
  font-size: 50px;
  background-color: #6666;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
.listNumber,
td{
  margin-left: 5px;
  color: #666;
}
.n2{
  margin-left: 16px;
}
/* 下半部分设置 */
.container{
  margin-top: 20px;
}
.table-name {
  font-weight: bold;
  font-size: 30px;
}
table {
  text-align: center;
  vertical-align: middle;
  font-size: 15px;
  background-color:#313131;
  width: 100%;
  min-width: 800px;
}
th{
  font-size: 20px;
}
td,
th {
  height: 35px;
  color: #fff;
  border-bottom: 1px #fff solid;
}
</style>