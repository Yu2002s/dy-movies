import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({ isExpand: true, isRefresh: false, navList: [] }),
  actions: {
    addNav(path, name) {
      if (this.navList.some((item) => item.path === path)) {
        return
      }
      this.navList.push({
        name,
        path
      })
    }
  }
})
