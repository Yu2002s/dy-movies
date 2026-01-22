<template>
  <el-header style="text-align: right; font-size: 12px">
    <div class="toolbar">
      <el-row align="middle">
        <el-icon size="20" style="margin-right: 10px" @click="changeStatus">
          <component :is="statusIcon"></component>
        </el-icon>
        <el-breadcrumb>
          <el-breadcrumb-item v-for="item in route.matched" :key="item.path" :to="item.path">
            <el-icon v-if="item.meta.icon" style="vertical-align: middle" size="18">
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span style="margin-left: 6px">{{ item.meta.title }}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-row>
        <el-button circle @click="layoutStore.isRefresh = !layoutStore.isRefresh">
          <template #icon>
            <EpRefresh />
          </template>
        </el-button>
        <el-button circle @click="fullscreen">
          <template #icon>
            <EpFullScreen />
          </template>
        </el-button>
        <el-dropdown>
          <span class="downdrop-link">
            <el-image fit="cover" class="user-avatar" :src="userStore.avatar"></el-image>
            {{ userStore.username }}
            <el-icon style="margin-right: 8px; margin-top: 1px">
              <EpArrowDown />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-row>
    </div>
    <div class="nav-list">
      <div class="nav-item" v-for="(item, index) in layoutStore.navList" :key="item.path">
        {{ item.name }}
      </div>
    </div>
  </el-header>
</template>

<script setup>
defineOptions({
  name: 'Toolbar'
})
import foldIcon from '~icons/ep/fold'
import expandIcon from '~icons/ep/expand'

const route = useRoute()
const router = useRouter()
import { useLayoutStore } from '@/stores/layout.js'
import { useUserStore } from '@/stores/user.js'

const layoutStore = useLayoutStore()
const userStore = useUserStore()

const statusIcon = computed(() => {
  return layoutStore.isExpand ? foldIcon : expandIcon
})

const changeStatus = () => {
  layoutStore.isExpand = !layoutStore.isExpand
}

const logout = () => {
  userStore.logout()
  router.push({
    path: '/login',
    query: { redirect: route.path }
  })
}

const fullscreen = () => {
  // dom对象的一个属性，可以用来判断当前是不是全屏的模式，如果是全屏会返回boolean真，不是则为false
  let full = document.fullscreenElement
  if (!full) {
    // 使用文档的根节点的requestFullscreen，实现全屏模式
    document.documentElement?.requestFullscreen()
  } else {
    // 退出全屏模式
    document.exitFullscreen()
  }
}
</script>

<style lang="less" scoped>
.el-header {
  --el-header-height: 120px;
}

.toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  width: 100%;
  right: 20px;
  border-bottom: 1px solid #eee;

  .downdrop-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
    margin-left: 10px;

    .user-avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}

.nav-list {
  width: 100%;
  overflow-x: auto;
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  color: #303030;
  border-radius: 5px;
}
</style>
