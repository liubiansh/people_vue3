// 新增技能页面接口
import type { IskillDetail } from "@/api/user/type";
import type { IParams } from "@/types/indexTypes";
import request from "@/utils/useAxios";

enum API {
 // 添加所选技能为个人待学习技能
 ADD_SKILL_URL = '/worker/addskill',
  // 所有技能清单
  SKILL_INVENTORY_URL = '/worker/skillInventory',
  // 点击单个技能展示的数据
  SKILL_DETAIL_URL = '/worker/skilldetail',
}

// 添加所选技能为个人待学习技能
export const apiAddskill = (data: IParams[]) => request.put(API.ADD_SKILL_URL, data)
// 所有技能清单
export const apiSkillInventory = () => request.get(API.SKILL_INVENTORY_URL)
// 点击单个技能展示的数据
export const apiSkilldetail = (data: IskillDetail) => request.get(API.SKILL_DETAIL_URL, {params:data})