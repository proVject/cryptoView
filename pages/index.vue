<template>
  <div>
    <h1 class="text-2xl font-bold mb-4 text-amber-700 dark:text-amber-400">
      Market
    </h1>

    <div v-if="marketStore.marketListLoading" class="text-center text-gray-500 dark:text-stone-400">
      Loading crypto data...
    </div>

    <div v-else-if="marketStore.marketListError" class="text-center text-red-500">
      {{ marketStore.marketListError }}
    </div>

    <CoinTable v-else :coins="marketStore.marketList" />
  </div>
</template>

<script setup>
import CoinTable from '~/components/CoinTable.vue'
import coins from '~/data/coinsObj.json';
import {useMarket} from "~/composables/useMarket.js";
import {useMarketStore} from "~/store/market.js";
const marketStore = useMarketStore();

useHead({
  title: 'Головна',
  meta: [
    { name: 'description', content: 'Головна сторінка CryptoView – переглянь основні тренди ринку криптовалют.' },
  ]
})

const symbolsList = computed(() => {
  return Object.keys(coins).map((key) => key + 'USDT')
})

useMarket(symbolsList)
</script>