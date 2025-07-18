<template>
  <div class="flex items-center justify-between p-4 rounded-xl shadow-sm hover:shadow-md transition bg-white dark:bg-stone-800">
    <div class="flex items-center space-x-4">
      <img :src="coin.image" :alt="coin.name" class="w-8 h-8 rounded-full" />
      <div>
        <h3 class="font-semibold text-lg">{{ coin.name }}</h3>
        <p class="text-sm text-gray-500 dark:text-stone-400 uppercase">{{ coin.symbol }}</p>
      </div>
    </div>
    <div class="text-right space-y-1">
      <p class="font-semibold text-amber-600 dark:text-amber-400">${{ coin.current_price.toFixed(2) }}</p>
      <p
          :class="{
          'text-green-600': coin.price_change_percentage_24h > 0,
          'text-red-600': coin.price_change_percentage_24h < 0
        }"
          class="text-sm"
      >
        {{ coin.price_change_percentage_24h.toFixed(2) }}%
      </p>
      <button
          @click="toggleFavorite"
          class="text-xs mt-1 text-amber-700 dark:text-amber-400 hover:underline"
      >
        {{ isFavorite ? '★ Remove Favorite' : '☆ Add to Favorites' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useStorage } from '@vueuse/core'

const props = defineProps({
  coin: {
    type: Object,
    required: true
  }
})

const favorites = useStorage('crypto-favorites', [])

const isFavorite = computed(() =>
    favorites.value.some((fav) => fav.symbol === props.coin.symbol)
)

const toggleFavorite = () => {
  if (isFavorite.value) {
    favorites.value = favorites.value.filter((c) => c.symbol !== props.coin.symbol)
  } else {
    favorites.value.push(props.coin)
  }
}
</script>