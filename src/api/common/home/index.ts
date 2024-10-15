// 用户信息页面接口
import request from "@/utils/useAxios";

enum API {
  // 个人信息获取
  USER_INFO_URL = '/worker/info',
}

// 个人信息获取
export const apiUserInfo = () => request.get(API.USER_INFO_URL)