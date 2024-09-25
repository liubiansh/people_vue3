import { ref } from "vue";
import {axiosApi} from '@/api/indexApi'
import type {IParams} from '@/types/indexTypes'


export default function(){
  // 定义一个响应式数组用于放置收到的数据 
  let mainSkillList = ref([{
    compulsory:'',
    equipmentModel:'',
    equipmentType:'',
    evaluationCount:'',
    evaluationMethod:'',
    evaluationResult:'',
    examiner:'',
    id:'',
    skillDetail:'',
    skillLevel:'',
    skillType:'',
  }])
  // 请求函数
  async function getSearchList(params:IParams) {
    const filterparams = Object.fromEntries( //fromEntries把括号内的值变成对象
      // entries会返回一个给定对象自身可枚举属性的键值对数组
      Object.entries(params)
      // filter过滤满足条件的键值对，因为不关心 键 ，所以用下划线代替
      .filter(([_,value]) => value !== null && value !== '' && value !== undefined)
    )
    // console.log('filtersearchList',filtersearchList);
    await axiosApi({
      method:"get",
      url:"/worker/getskilldetail1/H6616040", 
      params:filterparams,
    }).then(res => {
      mainSkillList.value = res.data.data
    }).catch(err => console.log("搜索请求错误",err))
  }
  return {mainSkillList,getSearchList}
}
