import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // 路由标题
    title: string
    // 是否隐藏
    hidden?: boolean
    // 图标
    icon?: string
  }
}