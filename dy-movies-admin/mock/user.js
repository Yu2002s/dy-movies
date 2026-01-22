import Mock from 'mockjs'

function createAdminUserList() {
  return [
    {
      userId: 1,
      avatar:
        'https://ts2.cn.mm.bing.net/th?id=OIP-C.54qlbLNAZ64K94c_DCT-qAAAAA&w=166&h=166&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
      username: 'jdy2002',
      password: 'jdy200255',
      role: '超级管理员',
      roleId: 1,
      token: 'Bearer AdminToken',
      createAt: Date.now() + Math.floor(Math.random() * 1000)
    }
  ]
}

const userList = Mock.mock({
  "data|46": [
    {
      "id|+1": 1,
      username: "@cname",
      password: /.{6,10}/,
      avatar: "@image('100x100', '#000', '#fff', 'hello')",
      email: "jiangdongyu54@gmail.com",
      createAt: Mock.mock('@datetime'),
      ip: "127.0.0.1",
    }
  ]
})

export default [
  {
    url: '/api/users/login',
    method: 'POST',
    response: ({ body }) => {
      const { username, password } = body

      const user = createAdminUserList().find(
        (item) => item.username === username && item.password === password
      )

      if (!user) {
        return { code: 201, message: '用户名或密码错误' }
      }

      return {
        code: 200,
        message: '登录成功',
        data: {
          token: user.token
        }
      }
    }
  },
  {
    url: '/api/users',
    method: 'GET',
    response: (request) => {
      const token = request.headers.authorization
      if (token) {
        const user = createAdminUserList().find((item) => item.token === token)
        if (user) {
          return {
            code: 200,
            message: '获取用户信息成功',
            data: user
          }
        }
      }
      return {
        code: 201,
        message: '用户未登录'
      }
    }
  },
  {
    url: `/api/users/list`,
    method: 'GET',
    response: ({ query }) => {
      const page = +query.page
      const limit = +query.limit
      const list = userList.data
      const start = (page - 1) * limit
      let data = list.slice(start, start + limit)

      if (query.username) {
        data = data.filter((item) => item.username === query.username)
      }

      return {
        code: 200,
        message: '获取数据成功',
        data: {
          data,
          total: list.length,
        }
      }
    }
  },
  {
    url: '/api/users/admin',
    method: "GET",
    response: () => {
      return {
        code: 200,
        message: '获取成功',
        data: createAdminUserList()
      }
    }
  },
  {
    url: '/api/users/roles',
    method: 'GET',
    response: () => {
      return {
        code: 200,
        message: '获取成功',
        data: [
          {
            id: 1,
            name: '超级管理员'
          },
          {
            id: 2,
            name: '普通管理员'
          }
        ]
      }
    }
  }
]
