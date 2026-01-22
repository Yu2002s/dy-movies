import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { loadEnv } from 'vite'
import process from 'node:process'

// https://vitejs.dev/config/
export default defineConfig(function ({ mode }) {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      VueDevTools(),
      AutoImport({
        resolvers: [
          ElementPlusResolver() // 自动注册图标组件
        ],
        // 自动导入的文件名
        imports: ['vue', 'vue-router'],
        // 指定生成.d.ts的位置
        dts: 'src/auto-imports.d.ts',
        // 需要自动导入的文件
        include: [/\.[tj]sx?$/, /\.vue$/]
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            prefix: '', // 默认前缀是i
            enabledCollections: ['ep'] // 选择图标库集合 ep
          })
        ],
        // 需要自动导入组件的目录
        dirs: ['src/components', 'src/views', 'src/layout'],
        // 文件后缀
        extensions: ['vue'],
        // 指定.d.ts生成的位置
        dts: 'src/components.d.ts',
        // 深度扫描
        deep: true,
        // 需要自动导入的文件
        include: [/.vue$/, /.vue?vue/]
      }),
      Icons({
        autoInstall: true // 自动安装
      })
      /* viteMockServe({
        mockPath: 'mock',
        enable: command === 'serve'
      }) */
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      // outDir: "D:\\java-project\\Movies\\src\\main\\resources\\static",
    },
    server: {
      proxy: {
        [env.VITE_HTTP_BASE_URL]: {
          target: env.VITE_PROXY_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp('^' + env.VITE_HTTP_BASE_URL), '')
        }
      }
    }
  }
})
