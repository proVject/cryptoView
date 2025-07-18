<template>
  <div class="overflow-x-auto bg-white dark:bg-stone-800 rounded-xl shadow">
    <table class="min-w-full table-auto text-sm text-left">
      <thead class="bg-amber-100 dark:bg-stone-700 text-amber-900 dark:text-stone-100">
      <tr>
        <th class="px-4 py-3">#</th>
        <th class="px-4 py-3">Coin</th>
        <th class="px-4 py-3">Price</th>
        <th class="px-4 py-3">24h Change</th>
        <th class="px-4 py-3 text-right">Action</th>
      </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 dark:divide-stone-700">
      <tr v-for="(coin, index) in coins" :key="coin.id" class="hover:bg-amber-50 dark:hover:bg-stone-700">
        <td class="px-4 py-2">{{ index + 1 }}</td>
        <td class="px-4 py-2 flex items-center space-x-2">
          <img :src="coin.image" :alt="coin.name" class="w-6 h-6 rounded-full" />
          <div>
            <div class="font-medium">{{ coin.name }}</div>
            <div class="text-xs uppercase text-gray-500 dark:text-stone-400">{{ coin.symbol }}</div>
          </div>
        </td>
        <td class="px-4 py-2">${{ coin.current_price.toFixed(2) }}</td>
        <td
            class="px-4 py-2"
            :class="coin.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'"
        >
          {{ coin.price_change_percentage_24h.toFixed(2) }}%
        </td>
        <td class="px-4 py-2 text-right">
          <NuxtLink
              :to="`/coin/${coin.id}`"
              class="text-amber-600 dark:text-amber-400 hover:underline text-sm"
          >
            Details →
          </NuxtLink>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  coins: {
    type: Array,
    required: true
  }
})
</script>