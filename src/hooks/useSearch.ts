import { ref } from "vue";
import { apiSkillList } from '@/api/user/clickApi'
import type { IParams } from '@/types/indexTypes'


export default function () {
  // 定义一个响应式数组用于放置收到的数据 
  let mainSkillList = ref<IParams[]>()
  // 请求函数
  async function getSearchList(params: IParams) {
    const filterParams = Object.fromEntries( //fromEntries把括号内的值变成对象
      // entries会返回一个给定对象自身可枚举属性的键值对数组
      Object.entries(params)
        // filter过滤满足条件的键值对，因为不关心 键 ，所以用下划线代替
        .filter(([_, value]) => value !== null && value !== '' && value !== undefined)
    )
    mainSkillList.value = (await apiSkillList(filterParams)).data
  }
  return { mainSkillList, getSearchList }
}
