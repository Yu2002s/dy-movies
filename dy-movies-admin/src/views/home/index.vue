<script setup>
import * as echarts from 'echarts'

defineOptions({
  name: 'Home'
})

const BASE_URL = 'http://api.zaibiao.cn'
const profitData = ref({})
const profitList = ref([])
const adList = ref([])
const adTotal = ref(0)
let profitEcharts
const profitEchartsRef = ref()

onMounted(() => {
  profitEcharts = echarts.init(profitEchartsRef.value)
  getUserInfo()
})

const getUserInfo = async () => {
  const res = await fetch(`${BASE_URL}/admin/userinfo`, {
    method: 'GET',
    headers: {
      Sessiontoken: localStorage.getItem('ad_token')
    }
  }).then((res) => res.json())
  if (res.code === 0) {
    // 登录成功的
    await getHomeData()
    await getAdList()
    await getProfitList()
  } else {
    localStorage.removeItem('ad_token')
    await login()
  }
}

const login = async () => {
  const res = await fetch(`${BASE_URL}/admin/login`, {
    method: 'POST',
    headers: {
      Referer: 'http://admore.zaibiao.cn/',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: 'dyys',
      password: 'aPxt2M11'
    })
  }).then((res) => res.json())
  if (res.code === 0) {
    localStorage.setItem('ad_token', res.result)
  }
}

const getHomeData = async () => {
  const res = await fetch(`${BASE_URL}/`, {
    method: 'GET',
    headers: {
      Sessiontoken: localStorage.getItem('ad_token')
    }
  }).then((res) => res.json())

  if (res.code === 0) {
    profitData.value = res.result.profit_data
    const chartsData = res.result.charts
    const option = {
      title: {
        text: '广告统计'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['点击总数', '总点击率', '总预估收入', '展示总数']
      },
      grid: {
        left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
          boundaryGap: false,
          data: chartsData.labels
      },
      yAxis: {
        type: 'value'
      },
      series: [
        chartsData.datasets.click,
        chartsData.datasets.click_rate,
        chartsData.datasets.profit,
        chartsData.datasets.show
      ]
    }
    profitEcharts.setOption(option)
  }
}

const getDateStr = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

const getAdList = async () => {
  const nowDate = new Date()
  const beforeDate = new Date()
  beforeDate.setTime(nowDate.getTime() - 7 * 24 * 60 * 60 * 1000)
  const res = await fetch(`${BASE_URL}/admin/getadlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Sessiontoken: localStorage.getItem('ad_token')
    },
    body: JSON.stringify({
      page: 10,
      page_index: 0,
      system: '',
      start_date: getDateStr(beforeDate),
      end_date: getDateStr(nowDate),
      application_id: [],
      type: '',
      position: []
    })
  }).then(res => res.json())

  if (res.code === 0) {
    adList.value = res.result.list
    adTotal.value = res.result.count
  }
}

const getProfitList = async () => {
  const nowDate = new Date()
  const beforeDate = new Date()
  const res = await fetch(`${BASE_URL}/admin/getlicationdata`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Sessiontoken: localStorage.getItem('ad_token')
    },
    body: JSON.stringify({
      page: 10,
      page_index: 0,
      system: '',
      start_date: getDateStr(beforeDate),
      end_date: getDateStr(nowDate),
      application_id: [],
    })
  }).then(res => res.json())
  if (res.code === 0) {
    profitList.value = res.result.list
  }
}
</script>

<template>
  <div class="home-container">
    <el-card>
      <template #header>
        <h2>Admin下午好</h2>
      </template>
      <span>冬雨影视后台管理面板</span>
    </el-card>

    <el-card style="margin: 20px 0">
      <template #header>
        <h3 style="font-size: 18px; font-weight: 600">收益信息</h3>
      </template>
      <div class="profile-data">
        <div class="profile-item">
          <p class="profit-title">{{ profitData.profit_yesterday }}</p>
          <p>昨日收益</p>
        </div>
        <div class="profile-item">
          <p class="profit-title">{{ profitData.profit_seven_day }}</p>
          <p>过去7天收益</p>
        </div>
        <div class="profile-item">
          <p class="profit-title">{{ profitData.profit_month_start }}</p>
          <p>本月累计收益</p>
        </div>
        <div class="profile-item">
          <p class="profit-title">{{ profitData.profit_all }}</p>
          <p>总收益</p>
        </div>
      </div>
    </el-card>
    <el-card style="margin: 20px 0">
      <div ref="profitEchartsRef" style="height: 400px; width: 100%"></div>
    </el-card>

    <el-card>
      <template #header>
        <h3 style="font-size: 18px; font-weight: 600">广告数据</h3>
      </template>
      <el-table :data="adList">
        <el-table-column align="center" label="媒体ID" prop="appKey"></el-table-column>
        <el-table-column align="center" label="媒体" prop="advname"></el-table-column>
        <el-table-column align="center" label="广告位ID" prop="advId"></el-table-column>
        <el-table-column align="center" label="广告类型" prop="scene"></el-table-column>
        <el-table-column align="center" label="请求量" prop="request"></el-table-column>
        <el-table-column align="center" label="填充量" prop="response"></el-table-column>
        <el-table-column align="center" label="填充率" prop="request_rate"></el-table-column>
        <el-table-column align="center" label="展示量" prop="show"></el-table-column>
        <el-table-column align="center" label="展示率" prop="show_rate"></el-table-column>
        <el-table-column align="center" label="点击量" prop="click"></el-table-column>
        <el-table-column align="center" label="点击率" prop="click_rate"></el-table-column>
        <el-table-column align="center" label="ECPM" prop="cpm"></el-table-column>
        <el-table-column align="center" label="预估收益" prop="profit"></el-table-column>
        <el-table-column align="center" label="时间" prop="date"></el-table-column>
      </el-table>
    </el-card>

    <el-card style="margin-top: 20px">
      <template #header>
        <h3 style="font-size: 18px; font-weight: 600">收益列表</h3>
      </template>
      <el-table :data="adList">
        <el-table-column align="center" label="媒体名称" prop="name"></el-table-column>
        <el-table-column align="center" label="展示量" prop="show"></el-table-column>
        <el-table-column align="center" label="点击量" prop="click"></el-table-column>
        <el-table-column align="center" label="点击率" prop="click_rate"></el-table-column>
        <el-table-column align="center" label="预估收益" prop="profit"></el-table-column>
        <el-table-column align="center" label="时间" prop="date"></el-table-column>
      </el-table>
    </el-card>

    <div style="height: 20px"></div>
  </div>
</template>

<style scoped lang="less">
.home-container {
  padding: 0 20px;
  overflow: hidden;

  .ad-view {
    width: 100%;
    height: 100%;
    border: none;
  }

  .profile-data {
    display: flex;
    align-items: center;
    justify-content: space-around;

    .profile-item {
      text-align: center;

      .profit-title {
        font-size: 28px;
        font-weight: bold;
        color: black;
      }
    }
  }
}
</style>
