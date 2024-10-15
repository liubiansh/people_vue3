// 个人技能明细页面接口
import request from "@/utils/useAxios";

enum API {
  // 技能列表图例
  SKILL_RATIO_URL = '/worker/skillratio',
}

// 技能列表图例
export const apiSkillRatio = () => request.get(API.SKILL_RATIO_URL)
