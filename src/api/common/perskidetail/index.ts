// 个人技能明细页面接口
import type { IParams } from "@/types/indexTypes";
import request from "@/utils/useAxios";

enum API {
  // 个人掌握技能明细
  SKILLLIST_DETAIL_URL = '/worker/getskilldetail',
  // 下拉框数据获取
  SKILL_TYPE_URL = '/worker/skillType',
  EQUIPMENT_TYPE_URL = '/worker/equipmentType',
  EQUIPMENT_MODEL_URL = '/worker/equipmentModel',
}

// 个人掌握技能明细
export const apiSkillList = (data: IParams) => request.get(API.SKILLLIST_DETAIL_URL, {params:data})
// 下拉框数据获取
export const apiSkillType = () => request.get(API.SKILL_TYPE_URL)
export const apiEquipmentType = () => request.get(API.EQUIPMENT_TYPE_URL)
export const apiEquipmentModel = () => request.get(API.EQUIPMENT_MODEL_URL)
