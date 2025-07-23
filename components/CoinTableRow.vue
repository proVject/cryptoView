<template>
    <tr
        class="hover:bg-amber-50 dark:hover:bg-stone-700 cursor-pointer"
        @click="navigateTo($localePath({ name: 'coin-id', params: {id: row.shortName} }))"
    >
      <td class="pl-4 py-2 hidden sm:table-cell" @click.stop>
        <cv-favofite-button :name="row.shortName" />
      </td>
      <td class="px-4 py-2 flex items-center space-x-2">
        <img :src="row.image" :alt="row.name" class="w-6 h-6 rounded-full"/>
        <div>
          <div class="font-medium">{{ row.name }}</div>
          <div class="text-xs uppercase text-gray-500 dark:text-stone-400">{{ row.shortName }}</div>
        </div>
      </td>
      <td class="px-4 py-2">
        <div
            :class="priceClasses"
        >${{ price }}
        </div>
        <div class="text-xs uppercase text-gray-500 dark:text-stone-400">{{
            priceWithCurrency
          }}
        </div>
      </td>
      <td
          class="px-4 py-2"
          :class="percentsClasses"
      >
        {{ percents }}%
      </td>
    </tr>
</template>

<script setup>
import {useStorage} from "@vueuse/core";
import {useCurrencyStore} from "~/store/currency.js";

const currencyStore = useCurrencyStore()

const props = defineProps({
  row: {
    type: Object,
    required: true
  },
})

const currency = useStorage('cv-currency', 'UAH')

const percents = computed(() => {
  return Number(props.row.priceChangePercent).toFixed(2)
})

const percentsClasses = computed(() => {
  return {
    'text-green-600': Number(props.row.priceChangePercent) > 0,
    'text-red-500': Number(props.row.priceChangePercent) < 0
  }
})

const price = computed(() => {
  return Number(props.row.lastPrice)
})
const priceWithCurrency = computed(() => {
  const rate = currencyStore.currencies?.[currency.value]
  if (!rate) return formatCurrency(Number(props.row.lastPrice), 'USD')
  return formatCurrency(Number(props.row.lastPrice) * rate, currency.value)
})

const priceClasses = computed(() => {
  return {
    'text-green-600': props.row.priceChange === 'up',
    'text-red-500': props.row.priceChange === 'down',
  }
})
</script>