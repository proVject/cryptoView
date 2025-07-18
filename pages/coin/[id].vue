<template>
  <div>
    <h1 class="text-2xl font-bold mb-4 text-amber-700 dark:text-amber-400">
      {{ coin?.symbol?.toUpperCase() }} — {{ coin?.name }}
    </h1>

    <div v-if="loading" class="text-gray-500">Loading data...</div>
    <div v-else-if="!coin">Coin not found</div>
    <div v-else>
      <div class="mb-4">
        <p class="text-lg font-medium text-amber-600 dark:text-amber-400">
          Current Price: ${{ coin.current_price.toFixed(2) }}
        </p>
        <p
            :class="coin.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'"
            class="text-sm"
        >
          24h Change: {{ coin.price_change_percentage_24h.toFixed(2) }}%
        </p>
      </div>

      <CoinChart :prices="history" />
    </div>
  </div>
</template>

<script setup>
import CoinChart from '~/components/CoinChart.vue'
import { useRoute } from 'vue-router'
import { useCoins } from '~/composables/useCoins'
import { useStorage } from '@vueuse/core'

const route = useRoute()
const symbol = route.params.id.toString().toUpperCase() + 'USDT'

const { fetchCoins, fetchCoinHistory } = useCoins()
const favorites = useStorage('crypto-favorites', [])

const coin = ref(null)
const history = ref([])
const loading = ref(true)

onMounted(async () => {
  loading.value = true
  const coins = await fetchCoins([symbol])
  coin.value = coins?.[0]
  history.value = await fetchCoinHistory(symbol)
  loading.value = false
})
</script>