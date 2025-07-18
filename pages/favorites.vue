<template>
  <div>
    <h1 class="text-2xl font-bold mb-4 text-amber-700 dark:text-amber-400">
      ⭐ Favorites
    </h1>

    <div v-if="!favorites.length" class="text-gray-500 dark:text-stone-400">
      You haven't added any favorites yet.
    </div>

    <CoinTable v-else :coins="favorites" />
  </div>
</template>

<script setup>
import CoinTable from '~/components/CoinTable.vue'
import { useStorage } from '@vueuse/core'

const favorites = useStorage('crypto-favorites', [])
</script>