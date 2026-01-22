<template>
  <div class="list">
    <div class="item" v-for="(item, index) in data" :key="index">{{ item }}</div>
  </div>
</template>

<script setup>
const data = ref([])

const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        data.value.push('Item: ' + i)
      }
      resolve()
    }, 2000)
  })
}

await getData()
</script>

<style lang="less" scoped>
.list .item {
  padding: 10px;
  border: 1px solid #eee;
}
</style>
