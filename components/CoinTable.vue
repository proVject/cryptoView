<template>
  <div class="overflow-x-auto bg-white dark:bg-stone-800 rounded-xl shadow">
    <table class="min-w-full table-auto text-sm text-left">
      <thead class="bg-amber-100 dark:bg-stone-700 text-amber-900 dark:text-stone-100">
      <tr>
        <th class="pl-4 py-3 w-[1px] hidden sm:table-cell"></th>
        <th class="px-4 py-3">Coin</th>
        <th class="px-4 py-3">Price</th>
        <th class="px-4 py-3">24h Change</th>
      </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 dark:divide-stone-700">
      <coin-table-row :row="coin" v-for="coin in coins" :key="coin.shortName"/>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import CoinTableRow from "~/components/CoinTableRow.vue";

defineProps({
  coins: {
    type: Array,
    required: true
  }
})
</script>