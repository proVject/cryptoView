<template>
  <div>
    <h1 class="text-2xl font-bold mb-4 text-amber-700 dark:text-amber-400">
      📈 Market Overview
    </h1>

    <div v-if="loading" class="text-center text-gray-500 dark:text-stone-400">
      Loading crypto data...
    </div>

    <div v-else-if="error" class="text-center text-red-500">
      {{ error }}
    </div>

    <CoinTable v-else :coins="coins" />
  </div>
</template>

<script setup>
import CoinTable from '~/components/CoinTable.vue'
import { useCoins } from '~/composables/useCoins'

const { coins, loading, error, fetchCoins } = useCoins()

onMounted(() => {
  fetchCoins(['BTCUSDT', 'ETHUSDT', 'BNBUSDT'])
})
</script>