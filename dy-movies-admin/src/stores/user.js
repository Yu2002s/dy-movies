import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user/index.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    avatar: '',
    token: localStorage.getItem('token')
  }),
  getters: {
    isLogin() {
      return Boolean(this.token)
    }
  },
  actions: {
    async login(user) {
      const result = await reqLogin(user)

      if (result.code === 200) {
        const token = result.data
        this.token = token
        localStorage.setItem('token', token)
        return 'ok'
      }

      return Promise.reject(new Error(result.message))
    },
    async userInfo() {
      const result = await reqUserInfo()
      if (result.code === 200) {
        const user = result.data
        this.username = user.username
        this.avatar = user.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    logout() {
      localStorage.removeItem('token')
      this.$reset()
    }
  }
})
