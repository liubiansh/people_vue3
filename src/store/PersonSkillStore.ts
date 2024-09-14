import { ref } from 'vue'
import { defineStore } from 'pinia'
import {axiosApi} from '@/api/indexApi'
// import

export const usePersonSkillStore = defineStore('personskill', () => {
  // 数据（state）
  let skillTypeData = ref([
    {
      value:'',
      label:''
    }
  ])
  let equipmentTypeData = ref([
    {
      value:'',
      label:''
    }
  ])
  let equipmentModelData = ref([
    {
      value:'',
      label:''
    }
  ])

  const request1 = axiosApi.get('/worker/skillType/H6616040');
  const request2 = axiosApi.get('/worker/equipmentType/H6616040');
  const request3 = axiosApi.get('/worker/equipmentModel/H6616040');

  async function getPersonSkillList(){
    await Promise.all([request1, request2, request3])
    .then((responses) => {
      // 分别处理每个响应结果
      skillTypeData.value = responses[0].data.data.map((item:any) => ({
        value:item,
        label:item
      }));
      equipmentTypeData.value = responses[1].data.data.map((item:any) => ({
        value:item,
        label:item
      }));
      equipmentModelData.value = responses[2].data.data.map((item:any) => ({
        value:item,
        label:item
      }));
      // 定义一个对象并添加在最上面
      let all = {value:'全部',label:'全部'}
      skillTypeData.value.unshift(all)
      equipmentTypeData.value.unshift(all)
      equipmentModelData.value.unshift(all)
      console.log(responses[2]);
    }).catch((error) => {
      console.log('Error occurred:', error);
    });
  }

  return { getPersonSkillList,skillTypeData,equipmentTypeData,equipmentModelData }
})
