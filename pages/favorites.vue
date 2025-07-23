<template>
  <div>
    <h1 class="text-2xl font-bold mb-4 text-amber-700 dark:text-amber-400">
      Favorites
    </h1>

    <div v-if="marketStore.marketListLoading" class="text-gray-500 dark:text-stone-400">
      Loading crypto data...
    </div>

    <div v-else-if="marketStore.marketListError" class="text-red-500">
      {{ marketStore.marketListError }}
    </div>

    <div v-else-if="!favoriteNow.length" class="text-gray-500 dark:text-stone-400">
      You haven't added any favorites yet.
    </div>

    <CoinTable v-else :coins="favoriteNow" />
  </div>
</template>

<script setup>
import CoinTable from '~/components/CoinTable.vue'
import { useStorage } from '@vueuse/core'
import {useMarket} from "~/composables/useMarket.js";
import {useMarketStore} from "~/store/market.js";
const marketStore = useMarketStore();

useHead({
  title: 'Обрані монети',
  meta: [
    { name: 'description', content: 'Ваші обрані криптомонети у зручному списку з оновленням цін у реальному часі.' },
  ]
})

const favorites = useStorage('cv-favorite', [])

const symbolsList = computed(() => {
  return favorites.value.map((key) => key + 'USDT')
})

if (favorites.value.length) useMarket(symbolsList)

const favoriteNow = computed(() => {
  return marketStore.marketList.filter((item) => {
    return favorites.value.includes(item.shortName)
  })
})
</script>