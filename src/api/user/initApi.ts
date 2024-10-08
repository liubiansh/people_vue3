import request from "@/utils/useAxios"

enum API {
  // 个人信息获取
  USER_INFO_URL = '/worker/info',
  // 技能列表图例
  SKILL_RATIO_URL = '/worker/skillratio',
  // 下拉框数据获取
  SKILL_TYPE_URL = '/worker/skillType',
  EQUIPMENT_TYPE_URL = '/worker/equipmentType',
  EQUIPMENT_MODEL_URL = '/worker/equipmentModel',
  // 所有技能清单(添加技能页面)
  SKILL_INVENTORY_URL = '/worker/skillInventory',
}

// 个人信息展示
export const apiUserInfo = () => request.get(API.USER_INFO_URL)
// 技能列表图例
export const apiSkillRatio = () => request.get(API.SKILL_RATIO_URL)
// 下拉框数据获取
export const apiSkillType = () => request.get(API.SKILL_TYPE_URL)
export const apiEquipmentType = () => request.get(API.EQUIPMENT_TYPE_URL)
export const apiEquipmentModel = () => request.get(API.EQUIPMENT_MODEL_URL)
// 所有技能清单(添加技能页面)
export const apiSkillInventory = () => request.get(API.SKILL_INVENTORY_URL)