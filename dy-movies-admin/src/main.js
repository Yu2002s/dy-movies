import './assets/main.css'
// 引入样式文件
import 'element-plus/dist/index.css'
// 国际化
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引入element-plus插件
import ElementPlus from 'element-plus'
import pinia from '@/stores'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)
// 安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn // ment-plus国际化配置
})

app.use(pinia)
app.use(router)

app.mount('#app')
