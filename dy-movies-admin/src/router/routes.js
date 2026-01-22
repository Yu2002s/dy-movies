import HomeView from '../views/home/index.vue'

import HomeIcon from '~icons/ep/home-filled'
import BoxIcon from '~icons/ep/box'
import UserIcon from '~icons/ep/user-filled'
import LockIcon from '~icons/ep/lock'
import SetUpIcon from '~icons/ep/set-up'
import UploadFilledIcon from '~icons/ep/upload-filled'
import TrendChartsIcon from '~icons/ep/trend-charts'
import VideoCameraFilledIcon from '~icons/ep/video-camera-filled'
import VideoPlayIcon from '~icons/ep/video-play'

export default [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: '主页',
      icon: HomeIcon
    }
  },
  {
    path: '/dev',
    name: 'Dev',
    meta: {
      title: '开发管理',
      icon: LockIcon
    },
    children: [
      {
        path: '/dev/list',
        name: 'DevList',
        component: () => import('@/views/admin/index.vue'),
        meta: {
          title: '开发者列表'
        }
      },
      {
        path: '/dev/role',
        name: 'DevRole',
        component: () => import('@/views/admin/role.vue'),
        meta: {
          title: '角色管理'
        }
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      title: '用户管理',
      icon: UserIcon
    },
    redirect: '/user/list',
    children: [
      {
        path: '/user/list',
        component: () => import('@/views/user/index.vue'),
        meta: {
          title: '用户列表',
          icon: UserIcon
        }
      }
    ]
  },
  {
    path: '/movie',
    name: 'Movie',
    redirect: '/movie/list',
    children: [
      {
        path: '/movie/list',
        name: 'MovieList',
        component: () => import('@/views/movie/index.vue'),
        meta: {
          title: '影视列表',
          icon: BoxIcon
        }
      },
      {
        path: '/movie/live',
        name: 'LiveSource',
        component: () => import('@/views/movie/live.vue'),
        meta: {
          title: '直播源列表',
          icon: VideoPlayIcon
        }
      }
    ],
    meta: {
      title: '影视管理',
      icon: VideoCameraFilledIcon
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/user/login.vue'),
    meta: {
      title: '登录',
      hidden: true
    }
  },
  {
    path: '/app',
    name: 'App',
    redirect: '/app/update',
    meta: {
      title: 'App配置',
      icon: SetUpIcon
    },
    children: [
      {
        path: '/app/update',
        name: 'AppUpdate',
        component: () => import('@/views/app/index.vue'),
        meta: {
          title: '更新管理',
          icon: UploadFilledIcon
        }
      }
    ]
  },
  {
    path: '/ad',
    name: 'AD',
    component: () => import('@/views/ad/index.vue'),
    meta: {
      title: '广告面板',
      icon: TrendChartsIcon
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/test/index.vue'),
    meta: {
      title: 'Test'
    }
  }
]
