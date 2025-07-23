<script setup>
import { useDark } from '@vueuse/core'

const isDark = useDark()

const themeIcon = computed(() => {
  return isDark.value ? 'tabler:sun-filled' : 'solar:moon-bold'
})

const toggleMode = () => {
  isDark.value = !isDark.value
}
</script>

<template>
  <icon @click="toggleMode" size="24" :name="themeIcon" class="text-amber-500 cursor-pointer" />
</template>

<style scoped>

</style>