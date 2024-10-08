// 进行 axios的二次封装：使用请求与响应拦截器
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { GET_TOKEN } from './token';

// 第一步：利用 axios对象的 create方法创建 axios基础实例
let request = axios.create({
  // 基础请求路径(在.env文件里，会根据环境进行自动设置)
  baseURL: import.meta.env.VITE_SERVE + import.meta.env.VITE_APP_BASE_API,
  timeout: 2000,
  headers: {
    'Access-Control-Allow-Origin': 'hly-yyp',
  },
});


// 第二步：request实例添加请求拦截器
request.interceptors.request.use((config) => {
  // headers属性为请求头，向服务器提供公共参数
  // 设置请求头直接用 . 方法添加属性就行
  config.headers.token = GET_TOKEN()

  // 返回配置对象 config
  // 可以在这里添加一个进度条，在请求回来之后消失
  return config
});

// 第三步：响应拦截器
request.interceptors.response.use((response) => {
  // console.log(response);
  
  // 成功回调，进行简化数据
  if (response.status === 200) {
    return response.data
  } else if (response.status === 208) {
    ElMessage({
      type: 'error',
      message: response.data.message
    })
    return ElMessage
  } else {
    return {
      '状态码：': response.status,
      '错误信息：': response.data.message
    }
  }

}, (error) => {
  // 失败的回调：处理 http网络错误
  // 定义一个变量：存储网络错误信息
  
  let message = '';
  // http状态码
  let status = error.response.status;
  switch (status) {
    case 401:
      message = 'TOKEN过期'
      break;
    case 403:
      message = '无权访问'
      break;
    case 404:
      message = '请求地址错误'
      break
    case 500:
      message = '服务器出现问题'
      break;
    default:
      message = '网络出现问题'
      break;
  }
  // 显示错误信息
  ElMessage({
    type: 'error',
    message
  });
  return Promise.reject(error)
})

// 对外暴露
export default request;