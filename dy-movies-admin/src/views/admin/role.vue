<script setup>
import { reqGetRoles } from '@/api/admin/index.js'

const loading = ref(false)
const roles = ref([])
const total = ref(0)
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10
})

const getRoles = async () => {
  loading.value = true
  const result = await reqGetRoles(queryParams)
  if (result.code === 200) {
    roles.value = result.data.result
    total.value = result.data.total
  }
  loading.value = false
}

onMounted(() => {
  getRoles()
})

const handleCurrentChange = () => {
  getRoles()
}

const handleSizeChange = () => {
  getRoles()
}
</script>

<template>
  <el-card>
    <el-table :data="roles" v-loading="loading">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column label="ID" prop="id" align="center" :width="100"></el-table-column>
      <el-table-column label="角色" prop="name" align="center"></el-table-column>
      <el-table-column label="创建时间" prop="createAt" align="center"></el-table-column>
      <el-table-column label="更新时间" prop="updateAt" align="center"></el-table-column>
      <el-table-column label="操作" align="center" #default="{ row }">
        <el-button type="primary" size="small">分配权限</el-button>
        <el-button size="small" @click="showEditDialog(row)">编辑</el-button>
        <el-popconfirm title="你确定要删除嘛?" @confirm="confirmDelete(row.userId)">
          <template #reference>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 10px"
      background
      layout="total, sizes, prev, pager, next, ->, jumper"
      v-model:page-size="queryParams.pageSize"
      v-model:current-page="queryParams.pageNo"
      :page-sizes="[10, 20, 30, 40]"
      :total
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<style scoped lang="less"></style>
