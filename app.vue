<template>
  <VitePwaManifest />
  <div :class="{ dark: isDark }" class="min-h-screen bg-amber-50 text-gray-900 dark:bg-stone-900 dark:text-white transition-colors">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

console.log(isDark.value)
// isDark.value = false
</script>