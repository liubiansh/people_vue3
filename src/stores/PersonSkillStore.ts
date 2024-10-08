import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiSkillType,apiEquipmentType,apiEquipmentModel } from '@/api/user/initApi'
// import

// defineStore方法那个执行会返回一个函数，作用就是让组件可以获取到仓库的数据
export const usePSkillStore = defineStore('personskill', () => {
  // 数据（state）
  let skillTypeData = ref([
    {
      value: '',
      label: ''
    }
  ])
  let equipmentTypeData = ref([
    {
      value: '',
      label: ''
    }
  ])
  let equipmentModelData = ref([
    {
      value: '',
      label: ''
    }
  ])

  // actions动作方法
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

  return { getPSkillList, skillTypeData, equipmentTypeData, equipmentModelData }
})
