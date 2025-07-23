<script setup>
import { useStorage } from '@vueuse/core'
const favorite = useStorage('cv-favorite', [])
// import icon from '@nuxt/icon'

const props = defineProps({
  name: { type: String, required: true },
})

const isFavorite = computed(() => favorite.value.find((f) => f === props.name))
const favoriteIcon = computed(() => isFavorite.value ? 'tabler:star-filled' : 'tabler:star')

const toggleFavorite = () => {
  if (isFavorite.value) {
    const idx = favorite.value.findIndex((f) => f === props.name)
    favorite.value.splice(idx, 1)
  } else {
    favorite.value.push(props.name)
  }
}
</script>

<template>
  <div @click="toggleFavorite" class="flex">
    <slot>
        <icon :name="favoriteIcon" size="22" style="color: var(--color-amber-400)" />
    </slot>
  </div>
</template>

<style scoped>

</style>