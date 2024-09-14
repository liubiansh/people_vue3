<template>
  <div class="addskill">
    <!-- 可以学习的列表 -->
    <div class="box1">
      <h2>所有技能清單：</h2>
      <div class="box1-table">
        <table>
          <tr class="table1-head">
            <th>序號</th>
            <th>技能類型</th>
            <th>設備類型</th>
            <th>設備型號</th>
          </tr>
          <tr>
            <td>1</td>
            <td>設備類</td>
            <td>SPI</td>
            <td>TRI</td>
          </tr>
          <tr>
            <td>1</td>
            <td>設備類</td>
            <td>SPI</td>
            <td>TRI</td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 按钮区 -->
    <div class="box2">
      <div class="box2-table">
        <button @click="addSkill">選中</button>
        <button @click="delSkill">刪除</button>
        <button @click="confSkill">確認添加</button>
      </div>
    </div>
    <!-- 选中区 -->
    <div class="box3">
      <h2>待添加的學習清單：</h2>
      <div class="box3-table">
        <table>
          <tr>
            <th>序號</th>
            <th>技能類型</th>
            <th>設備類型</th>
            <th>設備型號</th>
          </tr>
          <tr>
            <td>1</td>
            <td>設備類</td>
            <td>SPI</td>
            <td>TRI</td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 选中区的详细信息展示 -->
    <div class="box4">
      <h2>技能明細預覽：</h2>
      <div class="box4-table">
        <table>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="AddSkillView">
  function addSkill(){
    // 将左边列表里的项复制到右边列表里
  }
  function delSkill(){
    // 将右边列表里面选中的项删除
  }
  function confSkill(){
    // 把右边列表里面的数据提交给数据库
  }
</script>

<style scoped>
.addskill {
  display: flex;
  justify-content: space-between; 
  align-items: flex-start; 
  /* border: 1px #fff solid; */
  color: #000;
  /* background-image: linear-gradient(135deg, #f5f7fa9f 0%, #c3cfe2ab 100%); */
}
h2 {
  font-size: 22px;
  font-weight: 900;
}
.box1,
.box3,
.box4{
  flex: 1;
  margin: 10px 15px;
  margin-bottom: 0;
}
.box1,
.box3{
  max-width: 200px;
}
.box2-table {
  max-width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  min-height: 500px;
}
.box1-table,
.box3-table,
.box4-table {
  min-height: 500px;
  border-left: #000 1px solid;
  border-right: #000 1px solid;
  border-top: #000 1px solid;
  margin: 10px 0;
}
.box1-table table,
.box3-table table,
.box4-table table{
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: #fff;
  color: #000;
}
.box2 button {
  width: 60px;
  height: 35px;
  margin: 10px 20px;
  cursor: pointer;
  border-radius: 12px;
  &:hover {
    background-color: antiquewhite;
    box-shadow: 0 0 10px #1d1e1fbe;
    transition-duration: 0.5s;
  }
}
.box1 tr:not(.table1-head){
  cursor: pointer;
  &:hover{
    background-color: #CCC;
  }
  &:active{
    background-color: #888;
    transform: 1s;
  }
}
</style>