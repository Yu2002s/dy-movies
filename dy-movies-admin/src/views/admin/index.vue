<script setup>
import { reqGetAdminUsers } from '@/api/admin/index.js'
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'Admin'
})

const userList = ref([])
const loading = ref(false)
const editDialogShow = ref(false)
const editParams = reactive({
  nickname: '',
  avatar: '',
  role: ''
})
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)

onMounted(() => {
  getAdminUsers()
})

const getAdminUsers = async () => {
  // 设置加载状态为true
  loading.value = true

  try {
    // 获取管理员用户
    const result = await reqGetAdminUsers({
      page: page.value,
      pageSize: pageSize.value
    })

    // 判断是否请求成功
    if (result.code === 200) {
      // 将用户列表赋值给userList
      userList.value = result.data.result
      total.value = result.data.total
    }
  } finally {
    // 设置加载状态为false
    loading.value = false
  }
}

const confirmDelete = async (userId) => {
  console.log(userId)
  ElMessage.success({
    message: '删除成功'
  })
}

const showEditDialog = (row) => {
  editDialogShow.value = true
  editParams.username = row.username
  editParams.avatar = row.avatar
  editParams.role = row.roleId
}

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 10, message: '用户名长度必须为2到10位', trigger: 'blur' }
  ]
})

const handleCurrentChange = () => {
  getAdminUsers()
}

const handleSizeChange = () => {
  getAdminUsers()
}
</script>

<template>
  <div>
    <el-card>
      <el-form inline>
        <el-form-item label="用户名:">
          <el-input placeholder="请输入用户名" v-model="editParams.nickname"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="admin-list">
      <el-button type="primary">添加用户</el-button>
      <el-button type="danger">批量删除</el-button>
      <el-table :data="userList" border style="margin-top: 10px">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="#" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="avatar" label="头像" align="center">
          <template #default="{ row }">
            <img :src="row.avatar" width="30px" alt="用户头像" />
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" align="center"></el-table-column>
        <el-table-column prop="roleName" label="角色" align="center">
          <template #default="{ row }">
            <el-tag>{{ row.roleName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createAt" label="创建时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" #default="{ row }">
          <el-button @click="showEditDialog(row)" size="small">
            <template #icon>
              <el-icon>
                <EpEdit />
              </el-icon>
            </template>
            编辑
          </el-button>
          <el-popconfirm title="你确定要删除嘛?" @confirm="confirmDelete(row.userId)">
            <template #reference>
              <el-button type="danger" size="small">
                <template #icon>
                  <el-icon>
                    <EpDelete />
                  </el-icon>
                </template>
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 10px"
        background
        layout="total, sizes, prev, pager, next, ->, jumper"
        v-model:page-size="pageSize"
        v-model:current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :total
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
      <el-dialog v-model="editDialogShow" title="编辑用户" width="600">
        <el-form :model="editParams" size="large" label-width="80" :rules>
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="editParams.username"
              autocomplete="off"
              placeholder="请输入用户名"
              clearable
            />
          </el-form-item>
          <el-form-item label="头像" prop="avatar">
            <el-upload
              class="avatar-uploader"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :show-file-list="false"
              accept="image/*"
            >
              <img v-if="editParams.avatar" :src="editParams.avatar" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <EpPlus />
              </el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-select v-model="editParams.role" clearable>
              <el-option label="超级管理员" :value="1" />
              <el-option label="普通管理员" :value="2" />
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="editDialogShow = false"> 取消</el-button>
            <el-button type="primary" @click="editDialogShow = false"> 保存</el-button>
          </div>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<style scoped lang="less">
.admin-list {
  margin-top: 10px;
}

::v-deep(.el-form-item) {
  margin-bottom: 0 !important;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
