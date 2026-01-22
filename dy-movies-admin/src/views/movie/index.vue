<template>
  <div class="movie-container">
    <el-card style="margin-top: 20px">
      <el-form inline @submit.prevent="onSubmit">
        <el-form-item label="名称">
          <el-input
            placeholder="请输入影视名称"
            v-model.trim="queryParams.name"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryParams.status" placeholder="请选择状态" style="min-width: 200px">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="解析ID">
          <el-input
            type="number"
            v-model="queryParams.parseId"
            clearable
            placeholder="请输入解析id"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="resetSearch">重置</el-button>
          <el-button type="primary" native-type="submit">搜索</el-button>
          <el-button type="primary" @click="addMovie">新增</el-button>
          <el-button type="warning" @click="addMovieFast">一键添加</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 20px">
      <el-table :data="moviesList" v-loading="loading" highlight-current-row>
        <el-table-column :width="70" align="center" label="ID" prop="id"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template #default="{ row }">
            <el-switch :model-value="row.status === 1" @change="onStatusChanged(row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column :width="70" align="center" label="名称" prop="name"></el-table-column>
        <el-table-column
          :width="180"
          show-overflow-tooltip
          align="center"
          label="Host"
          prop="host"
        ></el-table-column>
        <el-table-column
          :width="220"
          show-overflow-tooltip
          align="center"
          label="搜索地址"
          prop="searchUrl"
        ></el-table-column>
        <el-table-column
          :width="220"
          show-overflow-tooltip
          align="center"
          label="分类地址"
          prop="classifyUrl"
        ></el-table-column>
        <el-table-column
          :width="220"
          show-overflow-tooltip
          align="center"
          label="详情地址"
          prop="detailUrl"
        ></el-table-column>
        <el-table-column
          :width="220"
          show-overflow-tooltip
          align="center"
          label="播放地址"
          prop="videoUrl"
        ></el-table-column>
        <el-table-column
          :width="220"
          show-overflow-tooltip
          label="验证地址"
          prop="verifyUrl"
        ></el-table-column>
        <el-table-column width="120" align="center" label="描述" prop="desc"></el-table-column>
        <el-table-column align="center" label="解析ID" prop="parseId"></el-table-column>
        <el-table-column align="center" label="排序" prop="cateOrder"></el-table-column>
        <el-table-column align="center" fixed="right" :min-width="200" label="操作">
          <template #default="{ row }">
            <el-button type="info" size="small" @click="editMovie(row)">编辑</el-button>
            <el-popconfirm
              :title="`确认要删除${row.name}嘛`"
              confirm-button-text="删除"
              cancel-button-text="取消"
              @confirm="deleteMovie(row.id)"
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
        v-model:current-page="queryParams.pageNo"
        v-model:page-size="queryParams.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        background
        layout="->, total, sizes, prev, pager, next, jumper"
        :total
        @current-change="getMovieList"
        @size-change="getMovieList"
      />
    </el-card>
    <div style="height: 20px"></div>
    <el-dialog v-model="showDialog" width="600">
      <template #header>
        <h2>{{ isAddMovie ? '添加影视' : '更新影视' }}</h2>
      </template>
      <el-form :model="currentMovie" label-width="90" label-position="left">
        <el-form-item label="名称" prop="name">
          <el-input placeholder="请输入名称" v-model="currentMovie.name"></el-input>
        </el-form-item>
        <el-form-item label="Host">
          <el-input placeholder="请输入Host" v-model="currentMovie.host"></el-input>
        </el-form-item>
        <el-form-item label="分类地址">
          <el-input placeholder="请输入分类地址" v-model="currentMovie.classifyUrl"></el-input>
        </el-form-item>
        <el-form-item label="搜索地址">
          <el-input placeholder="请输入搜索地址" v-model="currentMovie.searchUrl"></el-input>
        </el-form-item>
        <el-form-item label="详情地址">
          <el-input placeholder="请输入详情地址" v-model="currentMovie.detailUrl"></el-input>
        </el-form-item>
        <el-form-item label="播放地址">
          <el-input placeholder="请输入播放地址" v-model="currentMovie.videoUrl"></el-input>
        </el-form-item>
        <el-form-item label="验证地址">
          <el-input placeholder="请输入验证地址" v-model="currentMovie.verifyUrl"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input placeholder="请输入描述" v-model="currentMovie.desc"></el-input>
        </el-form-item>
        <el-form-item label="配置">
          <span style="margin-right: 20px">解析ID</span>
          <el-input
            type="number"
            style="width: 120px"
            placeholder="请输入解析id"
            v-model="currentMovie.parseId"
          ></el-input>
          <span style="margin: 0 20px">排序</span>
          <el-input
            style="width: 120px"
            type="number"
            placeholder="请输入排序"
            v-model="currentMovie.cateOrder"
          ></el-input>
          <span style="margin: 0 20px">状态</span>
          <el-switch
            :model-value="currentMovie.status === 1"
            @change="(val: boolean | string | number) => (currentMovie.status = val ? 1 : 0)"
          ></el-switch>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="addOrUpdateMovie(currentMovie)">保存</el-button>
        <el-button v-show="!isAddMovie" type="warning" @click="cloneMovie">克隆</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reqDeleteMovie, reqGetMoviesList, reqUpdateMovie } from '@/api/movie/index.js'
import { ElMessage } from 'element-plus'
import { Movie, QueryParams } from '@/api/movie/type'

defineOptions({
  name: 'MovieList'
})

const queryParams = reactive<QueryParams>({
  pageNo: 1,
  pageSize: 10,
  name: '',
  status: '',
  parseId: ''
})
const total = ref(0)

const loading = ref(false)
const moviesList = ref<Movie[]>([])
const currentMovie = ref<Movie>({
  id: undefined,
  name: '',
  status: 0,
  host: '',
  classifyUrl: '',
  searchUrl: '',
  detailUrl: '',
  videoUrl: '',
  verifyUrl: '',
  desc: '',
  parseId: 0,
  cateOrder: 0
})
const isAddMovie = computed(() => {
  return !currentMovie.value.id
})
const statusOptions = reactive([
  { value: '', label: '全部' },
  { value: '1', label: '已启用' },
  { value: '0', label: '未开启' }
])
const showDialog = ref(false)

onMounted(() => {
  getMovieList()
})

const getMovieList = async () => {
  loading.value = true
  try {
    const result = await reqGetMoviesList(queryParams)
    moviesList.value = result.data.result
    total.value = result.data.total
  } finally {
    loading.value = false
  }
}

const onSubmit = () => {
  getMovieList()
}

const resetSearch = () => {
  Object.assign(queryParams, {
    pageNo: 1,
    pageSize: 15,
    name: '',
    status: '',
    parseId: ''
  })
  onSubmit()
}

const onStatusChanged = (movie: Movie) => {
  movie.status = movie.status === 1 ? 0 : 1
  addOrUpdateMovie(movie)
}

const addOrUpdateMovie = async (movie: Movie) => {
  const res = await reqUpdateMovie(movie)
  if (res.code === 200) {
    ElMessage.success({
      message: res.msg
    })
    showDialog.value = false
    await getMovieList()
  } else {
    ElMessage.error({
      message: res.msg
    })
  }
}

const addMovie = () => {
  currentMovie.value = {
    id: undefined,
    name: '',
    status: 0,
    host: '',
    classifyUrl: '',
    searchUrl: '',
    detailUrl: '',
    videoUrl: '',
    verifyUrl: '',
    desc: '',
    parseId: 0,
    cateOrder: 0
  }
  showDialog.value = true
}

const cloneMovie = () => {
  currentMovie.value.id = undefined
  addOrUpdateMovie(currentMovie.value)
}

const addMovieFast = () => {
  currentMovie.value = {
    id: undefined,
    name: '',
    status: 0,
    host: '',
    classifyUrl:
      '/vod/show.html?id={cateId}&class={type}&area={area}&lang={language}&year={year}&letter={letter}&by={sort}',
    searchUrl: '/vod/search.html?wd={name}&page={page}',
    detailUrl: '/vod/detail/id/{detailId}.html',
    videoUrl: '/vod/play/id/{detailId}/sid/{sourceId}/nid/{selectionId}.html',
    verifyUrl: '',
    desc: '',
    parseId: 0,
    cateOrder: 0
  }
  showDialog.value = true
}

const editMovie = (movie: Movie) => {
  Object.assign(currentMovie.value, movie)
  showDialog.value = true
}

const deleteMovie = async (id: number) => {
  const res = await reqDeleteMovie(id)
  if (res.code === 200) {
    ElMessage.success({
      message: res.msg
    })
    await getMovieList()
  } else {
    ElMessage.error({
      message: res.msg
    })
  }
}
</script>

<style lang="less" scoped>
.movie-container {
  padding: 0 20px;
  overflow: hidden;

  .el-card ::v-deep(.el-form-item) {
    margin-bottom: 0;
  }

  :deep(.el-table-fixed-column--right.is-first-column::before) {
    bottom: 0;
  }
}
</style>
