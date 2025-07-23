<script setup>
import coins from '~/data/coinsObj.json'

const localePath = useLocalePath()

const search = ref('')

const coinsItems = ref([])

const handleSelect = (item) => {
  navigateTo(localePath({name: 'coin-id', params: { id: item.symbol.toUpperCase() }}))
  search.value = ''
}

const querySearch = (queryString, cb) => {
  const results = queryString
      ? Object.values(coins).filter(createFilter(queryString))
      : Object.values(coins)
  // call callback function to return suggestions
  cb(results)
}

const createFilter = (queryString) => {
  return (coin) => {
    return (
        coin.symbol.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}

onMounted(() => {
  coinsItems.value = Object.values(coins)
})

// const coinsFiltered = computed(() => {
//   return
// })
</script>

<template>
  <el-autocomplete
      v-model="search"
      class="inline-input w-50"
      placeholder="Search..."
      @select="handleSelect"
      :fetch-suggestions="querySearch"
  >
    <template #prefix>
      <icon size="20" name="mdi:search" />
    </template>
    <template #default="{ item }">
      <div class="flex items-center gap-2 py-2">
        <img :src="item.image" :alt="item.name" class="h-6 w-6" />
        <div>
          <p class="text-base/4">{{ item.name }}</p>
          <p class="text-xs text-gray-500 dark:text-stone-400">{{ item.symbol }}</p>
        </div>
      </div>
    </template>
  </el-autocomplete>
</template>

<style scoped>
</style>