// 用户相关的接口
import request from "@/utils/useAxios";
import type { ILogin, ILoginRes } from "./type";

enum API {
  // 登录接口
  LOGIN_URL = '/user/login',
  // 登出接口
  LOGINOUT_URL = '/user/loginout',
}

// 登录接口方法
export const apiLogin = (data: ILogin) => request.post<any, ILoginRes>(API.LOGIN_URL, data);
// 登出接口
export const apiLogout = () => request.post<any,ILoginRes>(API.LOGINOUT_URL)
