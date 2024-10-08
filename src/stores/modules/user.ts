// 创建用户相关的小仓库
import { defineStore } from "pinia";
// 引入接口
import { reqLogin } from "@/api/user/clickApi";
import { apiUserInfo } from "@/api/user/initApi";
// 引入数据类型
import type { loginI, loginResDataI } from "@/api/user/type";
import { ref } from "vue";
// 引入本地存储方法
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from "@/utils/token";
// 引入常量路由
import { constantRoutes } from "@/router/routes";

// 创建用户小仓库并暴露
export const useUserStore = defineStore('User', () => {
  // 存储数据
  // 获取用户的唯一标识 token
  let token = ref(GET_TOKEN())
  // 存储生成菜单需要的数组(路由)，目的是为了动态生成路由时，进行异步操作
  let menuRoutes = ref(constantRoutes)
  let username = ref('')

  // 异步|逻辑处理
  // 用户登录的方法
  async function useLogin(data: loginI) {
    let result: loginResDataI = await reqLogin(data)

    // 成功200 -> 获取到 token
    // 失败201 -> 返回错误信息
    if (result.code === 0) {
      // pinia仓库存储下 token
      token.value = (result.data.token as string)
      // 本地存储,调用存储方法
      SET_TOKEN(token.value)
      // 能保证当前函数返回的是一个成功的 promise对象
      return 'ok'
    } else {
      // 返回失败的 promise对象
      return Promise.reject(result)
    }
  }
  // 获取用户信息的方法
  async function getUserInfo() {
    // 获取用户信息
    let result: any = await apiUserInfo()
    console.log(result);

    //  如果获取成功，存储下用户信息
    if (result.code === 0) {
      username.value = result.data.username
    }

  }
  // 退出登录
  function loginout() {
    // 通知服务器 token失效
    // 删除本地存储的token和用户名
    token.value = ''
    username.value = ''
    REMOVE_TOKEN()
    localStorage.removeItem('username')
  }
  // 计算属性
  getters: {

  }
  return { token, useLogin, menuRoutes, getUserInfo, username, loginout }
})
