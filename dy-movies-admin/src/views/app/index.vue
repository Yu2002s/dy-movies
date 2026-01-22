<script setup>
import { reqAddOrUpdate, reqDeleteUpdate, reqGetUpdateList } from '@/api/update/index.js'
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'AppUpdate'
})

const loading = ref(false)
const updateList = ref([])
const total = ref(0)
const pageNo = ref(1)
const pageSize = ref(10)
const currentUpdate = ref({})
const isAddUpdate = computed(() => {
  return !currentUpdate.value.id
})
const showDialog = ref(false)

onMounted(() => {
  getUpdateList()
})

const getUpdateList = async () => {
  loading.value = true
  try {
    const res = await reqGetUpdateList({
      pageNo: pageNo.value,
      pageSize: pageSize.value
    })
    if (res.code === 200) {
      total.value = res.data.total
      updateList.value = res.data.result
    }
  } finally {
    loading.value = false
  }
}

const addOrUpdate = async (update) => {
  const res = await reqAddOrUpdate(update)
  if (res.code === 200) {
    ElMessage.success({
      message: res.msg
    })
    showDialog.value = false
    await getUpdateList()
  } else {
    ElMessage.error({
      message: res.msg
    })
  }
}

const onStatusChanged = (update) => {
  update.status = update.status ? 0 : 1
  addOrUpdate(update)
}

const addUpdate = () => {
  currentUpdate.value = {}
  showDialog.value = true
}

const editUpdate = (update) => {
  Object.assign(currentUpdate.value, update)
  showDialog.value = true
}

const deleteUpdate = async (id) => {
  const res = await reqDeleteUpdate(id)
  if (res.code === 200) {
    ElMessage.success({
      message: res.msg
    })
    await getUpdateList()
  } else {
    ElMessage.error({
      message: res.msg
    })
  }
}
</script>

<template>
  <div class="app-update-container">
    <el-card style="margin-top: 20px">
      <template #header>
        <el-button type="primary" v-loading="loading" @click="addUpdate">添加版本</el-button>
      </template>
      <el-table :data="updateList" v-loading="loading">
        <el-table-column width="60" align="center" label="ID" prop="id"></el-table-column>
        <el-table-column
          width="120"
          show-overflow-tooltip
          align="center"
          label="VersionName"
          prop="versionName"
        ></el-table-column>
        <el-table-column
          width="120"
          show-overflow-tooltip
          align="center"
          label="VersionCode"
          prop="versionCode"
        ></el-table-column>
        <el-table-column align="center" label="地址" prop="url"></el-table-column>
        <el-table-column align="center" label="更新内容" prop="content"></el-table-column>
        <el-table-column align="center" label="状态" width="100">
          <template #default="{ row }">
            <el-switch :model-value="row.status === 1" @change="onStatusChanged(row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column width="160" align="center" label="日期" prop="updateAt"></el-table-column>
        <el-table-column width="150" label="操作" align="center">
          <template #default="{ row }">
            <el-button size="small" @click="editUpdate(row)">编辑</el-button>
            <el-popconfirm
              :title="`确认要删除${row.versionName}嘛`"
              confirm-button-text="删除"
              cancel-button-text="取消"
              @confirm="deleteUpdate(row.id)"
            >
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px"
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        background
        layout="->, total, sizes, prev, pager, next, jumper"
        :total
        @current-change="getUpdateList"
        @size-change="getUpdateList"
      />
    </el-card>

    <el-dialog v-model="showDialog" width="600">
      <template #header>
        <h2>{{ isAddUpdate ? '添加更新' : '编辑更新' }}</h2>
      </template>
      <el-form label-width="80" label-position="left">
        <el-form-item label="版本名">
          <el-input
            placeholder="请输入版本名"
            clearable
            v-model="currentUpdate.versionName"
          ></el-input>
        </el-form-item>
        <el-form-item label="版本代码">
          <el-input
            placeholder="请输入版本代码"
            type="number"
            v-model="currentUpdate.versionCode"
          ></el-input>
        </el-form-item>
        <el-form-item label="更新地址">
          <el-input placeholder="请输入更新地址" clearable v-model="currentUpdate.url"></el-input>
        </el-form-item>
        <el-form-item label="更新内容">
          <el-input
            type="textarea"
            :rows="8"
            placeholder="请输入更新内容"
            clearable
            v-model="currentUpdate.content"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showDialog = false" size="large">关闭</el-button>
        <el-button type="primary" size="large" @click="addOrUpdate(currentUpdate)">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
.app-update-container {
  overflow: hidden;
  padding: 0 20px;
  min-height: 100%;
}
</style>
