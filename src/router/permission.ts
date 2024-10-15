// 路由鉴权文件，路由能不能被访问的权限设置
// 在入口文件引入
import router from "./indexRoute";
// 引入进度条插件
import nprogress from "nprogress";
// 引入进度条样式,在根目录下可以修改样式
import 'nprogress/nprogress.css'
// 获取用户相关的小仓库内部 token数据，判断用户是否登录
import { useUserStore } from '@/stores/modules/user'
import { ElMessage } from 'element-plus';
import setting from "@/setting";


// 全局守卫：项目当中任意路由切换都会触发的钩子
// 全局前置守卫
// to: 去哪 from: 从哪 next: 放行函数 
router.beforeEach(async (to, from, next) => {
  // 在函数外部执行时会先于 pinia仓库创建执行，所以放在函数内部
  let userStore = useUserStore()

  // 访问某一个路由之前的守卫
  // 访问前开启进度条
  nprogress.start()
  // 获取 token判断用户登录状态
  // let token = userStore.token
  // if (token) {
  //   // 已登录
  //   if (to.path == '/login') {
  //     // 不能访问登录页，指向首页
  //     next({ path: '/' })
  //   } else {
  //     // 如果没有用户信息，在守卫这里发送请求获取到了用户信息再放行
  //     // 也可以在登录成功之后把数据直接存储到本地
  //     try {
  //       await userStore.getUserInfo();
  //       next()
  //     } catch (error) {
  //       // token过期：获取不到用户信息
  //       // 修改 token
  //       userStore.logout()
  //       next({path: '/login', query: { redirect: to.path }})
  //     }
  //   }
  // } else {
  //   // 未登录
  //   // 如果去登录页，直接放行
  //   if (to.path == '/login') {
  //     next()
  //   } else {
  //     // 否则指向登录页
  //     next({ path: '/login', query: { redirect: to.path } })
  //     ElMessage({
  //       message: '请先登录',
  //       type: 'warning'
  //     })
  //   }
  // }
  next()
})


// 全局后置守卫
router.afterEach((to) => {
  // 访问后结束进度条
  nprogress.done()
  // 展示在网页标题
  document.title = `${setting.title} - ${to.meta.title}`
})

// 全部路由组件：登录|404|任意|首页|个人管理（三个子路由）|人员管理（三个子路由）|系统维护（四个子路由）

// 用户未登录：可以访问 login，其余的路由直接重定向为 login
// 登录后：不可以访问 login[指向首页]，其余的可以访问