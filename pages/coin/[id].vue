<template>
  <div>
    <h1 class="text-2xl font-bold mb-4 text-amber-700 dark:text-amber-400 flex items-center gap-5">
      <img :src="coinImage" :alt="coinName" class="w-8 h-8 rounded-full"/>
      <p>{{ coinName }}</p>
      <client-only>
        <cv-favofite-button :name="coinShortName" />
      </client-only>
    </h1>

    <div v-if="marketStore.marketListLoading" class="text-gray-500 dark:text-stone-400">{{ $t('common.loading') }}</div>
    <div v-else-if="!coin">{{ $t('coin_page.not_found') }}</div>
    <div v-else>
      <div class="mb-4 flex items-center gap-5">
        <p class="text-2xl md:text-3xl font-medium" :class="priceClasses">
          ${{ Number(coin.lastPrice) }}
        </p>
        <p
            :class="percentsClasses"
            class="text-sm md:text-me"
        >
          {{ coin.priceChangePercent }}%
        </p>
      </div>

      <div class="overflow-x-auto py-1 flex items-center bg-amber-100 dark:bg-stone-700 text-amber-900 dark:text-stone-100 px-3 gap-3 rounded-t-xl">
        <p class="font-light">{{ $t('coin_page.time') }}:</p>
        <div class="flex items-center">
          <button
              v-for="i of KLINES_TIME"
              :key="i.value"
              @click="onClickInterval(i)"
              :class="interval.value === i.value && 'bg-amber-50 dark:bg-stone-900'"
              class="px-2 py-1 text-nowrap"
          >
            {{$t(i.label)}}
          </button>
        </div>
      </div>
      <client-only>
        <CoinChart v-if="coinsStore.coinHistory" :prices="coinsStore.coinHistory" />
      </client-only>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import coins from '~/data/coinsObj.json'
import {useMarketStore} from "~/store/market.js";
import {useMarket} from "~/composables/useMarket.js";
import {KLINES_TIME} from "~/constants/intervals.js";
import {useCoinsStore} from "~/store/coins.js";
const marketStore = useMarketStore()
const coinsStore = useCoinsStore()

const route = useRoute()
const symbolsList = ref([route.params.id.toString().toUpperCase() + 'USDT'])

const interval = ref({ label: 'chart_periods.1_day', value: '1d', interval: '30m', limit: 48 },)
const history = ref(null)

const coinShortName = computed(() => {
  return route.params.id.toUpperCase()
})

const coinName = computed(() => {
  return coins[route.params.id.toString().toUpperCase()]?.name
})
const coinImage = computed(() => {
  return coins[route.params.id.toString().toUpperCase()]?.image
})

const percentsClasses = computed(() => {
  return {
    'text-green-600': Number(coin.value.priceChangePercent) > 0,
    'text-red-500': Number(coin.value.priceChangePercent) < 0
  }
})

const priceClasses = computed(() => {
  return {
    'text-green-600': coin.value.priceChange === 'up',
    'dark:text-green-600': coin.value.priceChange === 'up',
    'text-red-500': coin.value.priceChange === 'down',
    'dark:text-red-500': coin.value.priceChange === 'down',
  }
})

const coin = computed(() => {
  return marketStore.marketList[0]
})

useHead({
  title: `Монета ${coinName.value}`,
  meta: [
    { name: 'description', content: `Актуальна інформація про криптовалюту ${coinName.value}. Графіки, динаміка, обсяги.` },
    { property: 'og:title', content: `Монета ${coinName.value} – CryptoView` },
    { property: 'og:description', content: `Подробиці про ${coinName.value}: курс, зміни за день, історія.` },
    { name: 'twitter:title', content: `Монета ${coinName.value} – CryptoView` },
    { name: 'twitter:description', content: `Дізнайтесь більше про ${coinName.value}.` },
  ]
})

useMarket(symbolsList)

const onClickInterval = (i) => {
  // change chart
  interval.value = i
}

onMounted(async () => {
  history.value = await coinsStore.getCoinHistory(symbolsList.value[0], interval.value.interval, interval.value.limit)
})

watch([symbolsList, interval], async () => {
  history.value = await coinsStore.getCoinHistory(symbolsList.value[0], interval.value.interval, interval.value.limit)
})
</script>