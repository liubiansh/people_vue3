import request from "@/utils/useAxios";
import type { IParams } from "@/types/indexTypes";
import type { IskillDetail,loginI,loginResDataI } from "./type";

// 把所有路径定义为一个枚举对象
enum API {
  // 个人掌握技能明细
  SKILLLIST_DETAIL_URL = '/worker/getskilldetail',
  // 点击单个技能展示的数据
  SKILL_DETAIL_URL = '/worker/skilldetail',
  // 添加所选技能为个人待学习技能
  ADD_SKILL_URL = '/worker/addskill',
  // 登录接口
  LOGIN_URL = '/user/login',
}

// 暴露请求方法
// 个人掌握技能明细
export const apiSkillList = (data: IParams) => request.get(API.SKILLLIST_DETAIL_URL, {params:data})
// 点击单个技能展示的数据
export const apiSkilldetail = (data: IskillDetail) => request.get(API.SKILL_DETAIL_URL, {params:data})
// 添加所选技能为个人待学习技能
export const apiAddskill = (data: IParams[]) => request.put(API.ADD_SKILL_URL, data)
// 登录接口方法
export const reqLogin = (data: loginI) => request.post<any, loginResDataI>(API.LOGIN_URL, data);