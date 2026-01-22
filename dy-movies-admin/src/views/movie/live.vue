<script setup>
import { reqAddOrUpdateLiveSource, reqDeleteLiveSource, reqGetLiveSourceData } from '@/api/movie/live.js'
import { ElMessage } from 'element-plus'

const liveSourceData = ref([])
const loading = ref(false)
const currentLiveSource = ref({
  title: '',
  url: '',
  weight: ''
})
const showDialog = ref(false)

onMounted(() => {
  getSourceData()
})

const onStatusChanged = (source) => {
  source.status = source.status ? 0 : 1
  addOrUpdateLiveSource(source)
}

const getSourceData = async () => {
  loading.value = true
  try {
    const res = await reqGetLiveSourceData()
    if (res.code === 200) {
      console.log(res)
      liveSourceData.value = res.data
    }
  } finally {
    loading.value = false
  }
}

const addLiveSource = () => {
  currentLiveSource.value = {
    title: '',
    url: '',
    weight: ''
  }
  showDialog.value = true
}

const editLiveSource = (source) => {
  Object.assign(currentLiveSource.value, source)
  showDialog.value = true
}

const addOrUpdateLiveSource = async (source) => {
  const res = await reqAddOrUpdateLiveSource(source)
  if (res.code === 200) {
    ElMessage.success({
      message: res.msg
    })
    showDialog.value = false
    await getSourceData()
  } else {
    ElMessage.error({
      message: res.msg
    })
  }
}

const deleteLiveSource = async (id) => {
  const res = await reqDeleteLiveSource(id)
  if (res.code === 200) {
    ElMessage.success({
      message: res.msg
    })
    await getSourceData()
  } else {
    ElMessage.error({
      message: res.msg
    })
  }
}

</script>

<template>
  <div class="live-source-container">
    <el-card style="margin-top: 20px">
      <template #header>
        <el-button type="primary" @click="addLiveSource">添加源</el-button>
      </template>
      <el-table :data="liveSourceData">
        <el-table-column align="center" width="40" label="ID" prop="id"></el-table-column>
        <el-table-column align="center" width="140" label="名称" prop="title"></el-table-column>
        <el-table-column align="center" label="源地址" prop="url"></el-table-column>
        <el-table-column align="center" width="60" label="权重" prop="weight"></el-table-column>
        <el-table-column align="center" width="160" label="日期" prop="createAt"></el-table-column>
        <el-table-column align="center" width="100" label="状态">
          <template #default="{ row }">
            <el-switch :model-value="row.status === 1" @change="onStatusChanged(row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" @click="editLiveSource(row)">编辑</el-button>
            <el-popconfirm
              :title="`确认要删除${row.title}嘛`"
              confirm-button-text="删除"
              cancel-button-text="取消"
              @confirm="deleteLiveSource(row.id)"
            >
              <template #reference>
                <el-button type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="showDialog" width="600">
      <template #header>
        <h2>添加源</h2>
      </template>
      <el-form label-width="80" label-position="left">
        <el-form-item label="源名称">
          <el-input placeholder="请输入名称" v-model="currentLiveSource.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="源地址">
          <el-input placeholder="请输入地址" v-model="currentLiveSource.url" clearable></el-input>
        </el-form-item>
        <el-form-item label="权重">
          <el-input
            placeholder="请输入权重"
            v-model="currentLiveSource.weight"
            type="number"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showDialog = false">关闭</el-button>
        <el-button type="primary" @click="addOrUpdateLiveSource(currentLiveSource)">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
.live-source-container {
  padding: 0 20px;
}
</style>
