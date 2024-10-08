import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入组件名设置插件
import VueName from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueName(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // scss全局变量的配置
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "./src/styles/variable.scss";',
        // 修复 scss报错
        // api: "modern-compiler" // or 'modern'
      }
    }
  },
  // server:{
  //   open:true,
  //   proxy:{
  //     // 匹配所有以 "/api"为开头的请求路径
  //     '^/api':{
  //       // 匹配上之后就会把这个请求转发到下面这个服务器
  //       target:'http://192.168.0.3:80', // 代理目标的基本路径
  //       changeOrigin:true,//开启代理
  //       // 重写路径，把 "/api"删除
  //       // rewrite:(path) => path.replace(/^\/api/,'')
  //     }
  //   }
  // }
})
