<template>
  <div class="login_container">
    <!-- layout布局方式 -->
    <!-- 行 -->
    <el-row>
      <!-- 列 :span用来设置分栏，总数是24 后面的xs是控制大小参考文档 -->
      <el-col :span="12" :xs="0">
        <img src="@/assets/icons/foxconn.svg">
      </el-col>
      <el-col :span="12" :xs="24">
        <!-- 用 model属性绑定收集的对象，rules属性定义校验规则 -->
        <el-form class="login-form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <h2>人员信息管理系统欢迎您</h2>
          <!-- 表单项 -->
          <!-- 用 prop定义每个表单项校验的规则，传入的字段是总规则里面的其中一项 -->
          <el-form-item prop="userid">
            <el-input :placeholder="'请输入工号'" :prefix-icon="User" v-model="loginForm.userid"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :prefix-icon="Lock" type="password" v-model="loginForm.password" :show-password="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="login-btn" type="primary" size="default" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="login">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
// 引入用户相关的小仓库
import { useUserStore } from '@/stores/modules/user';
// 引入路由器函数
import router from '@/router/indexRoute';
// 引入路由函数
import { useRoute } from 'vue-router';
// 引入 element消息提示窗
import { ElNotification } from 'element-plus';
// 引入获取当前时间的封装函数
import { getTime } from '@/utils/time';

// 使用 pinia仓库
let useStore = useUserStore();
// 使用 route
let $route = useRoute();

// 获取表单组件
let loginForms = ref()

// 按钮状态
let loading = ref(false)
// 收集账号与密码的数据,使用 v-model进行绑定，里面的值是初始值
let loginForm = reactive({ userid: 'H6616040', password: '123456' })

// 登录按钮回调
// 点击后通知仓库发送登录请求
// 请求成功 -> 跳转到首页展示数据 
// 请求失败 -> 弹出登录失败信息
// 使用 try-catch方法来进行结果的处理
const login = async () => {
  // 保证全部的表单项校验全部通过才能发请求
  await  loginForms.value.validate()

  // 让按钮开始加载 
  loading.value = true
  try {
    // 可以用.then也可以用这个
    await useStore.useLogin(loginForm);
    // 获取用户信息
    await useStore.getUserInfo()
    // 存储到本地
    localStorage.setItem('username',useStore.username)
    // 如果请求成功就用编程式导航跳转到指定位置
    // 判断登录时，路由路径是否有query参数，有就去，没有就去首页
    let redirect = $route.query.redirect;
    router.push({ path: redirect as string || '/home' });
    // 登录成功的提示信息
    ElNotification({
      type:"success",
      message:'登录成功',
      // 显示当前时间段
      title:`hi,${getTime()}好 【${useStore.username}】`
    })
    loading.value = false
  } catch (error:any) {
    console.log(error.message);
    
    // 登录失败的提示信息
    ElNotification({
      type:'error',
      message:error.message
    }) 
    loading.value = false
  }
}

// 自定义校验规则函数,参考组件文档进行配置

// 定义校验配置对象
const rules = {
  /* 
    属性：
      require：确定该字段是否要校验
      message：提示信息
      trigger：触发时机：blur为失去焦点时，change为数据发生改变时
  */
  userid: [
    { required: true, min: 5, max: 10, message: '账号长度为5~10位', trigger: 'blur' }
  ],
  password: [
    { require: true, min: 6, max: 15, message: '密码长度为6~15位', trigger: 'blur' }
  ]
}


</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}
img{
    width: 30%;
    margin: 30px;
  }

.login-form {
  position: relative;
  width: 60%;
  top: 30vh;
  background: url("@/assets/images/login_form.png") no-repeat;
  background-size: cover;
  padding: 40px;
  height: 30%;

  
  h1 {
    color: white;
    font-size: 40px;
  }

  h2 {
    color: white;
    font-size: 20px;
    margin: 10px 0;
  }
}

.login-btn {
  width: 100%;
}
</style>