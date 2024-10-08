// 封装本地存储数据与读取数据的方法
export const SET_TOKEN = (token: string) => {
  return localStorage.setItem('TOKEN', token)
}
// 获取 token
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}
export const REMOVE_TOKEN = () => {
  return localStorage.removeItem('TOKEN')
}