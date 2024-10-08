import { createApp } from 'vue'
// 引入 pinia仓库
import pinia from './stores'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入模版的全局样式
import '@/styles/index.scss'
import App from './App.vue'
import router from './router/indexRoute'


const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)

app.use(router)
app.use(pinia)
app.mount('#app')
