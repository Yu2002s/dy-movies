<template>
  <div class="user-list">
    <el-card style="margin-top: 20px">
      <el-form inline class="form" @submit.prevent="getUserList">
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="queryParams.nickname" placeholder="请输入昵称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="!queryParams.nickname.trim()" @click="getUserList"
            >搜索
          </el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-top: 20px">
      <el-table
        v-loading="loading"
        :data="userList"
        empty-text="没有数据"
        border
        fit
        highlight-current-row
      >
        <el-table-column label="ID" width="100" align="center" prop="id"></el-table-column>
        <el-table-column label="用户名" align="center" prop="nickname"></el-table-column>
        <el-table-column label="邮箱" align="center" prop="email"></el-table-column>
        <el-table-column label="IP地址" align="center" prop="lastIp"></el-table-column>
        <el-table-column label="注册时间" align="center" prop="createAt"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right">
          <el-button>修改</el-button>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px"
        v-model:current-page="queryParams.pageNo"
        v-model:page-size="queryParams.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        background
        layout="->, total, sizes, prev, pager, next, jumper"
        :total
        @current-change="onCurrentChange"
        @size-change="onSizeChange"
      />
    </el-card>
  </div>
</template>

<script setup>
import { reqGetUserList } from '@/api/user/index.js'

defineOptions({
  name: 'UserList'
})

const userList = ref([])
const loading = ref(false)
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  nickname: ''
})
const total = ref(0)

/* watch(
  () => queryParams.pageNo,
  () => {
    getUserList()
  }
) */

onMounted(() => {
  getUserList()
})

const getUserList = async () => {
  try {
    loading.value = true
    const result = await reqGetUserList(queryParams)
    if (result.code === 200) {
      userList.value = result.data.result
      total.value = result.data.total
    }
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

const onSizeChange = () => {
  console.log('onSizeChanged')
  getUserList()
}

const onCurrentChange = () => {
  console.log('onCurrentChanged')
  getUserList()
}

const reset = () => {
  queryParams.nickname = ''
  getUserList()
}
</script>

<style lang="less" scoped>
.user-list {
  padding: 0 20px;
  height: 100%;

  ::v-deep(.el-form-item) {
    margin-bottom: 0;
  }
}
</style>
