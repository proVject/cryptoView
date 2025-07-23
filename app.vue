<template>
  <VitePwaManifest />
  <div :class="{ dark: isDark }" class="min-h-screen bg-amber-50 text-gray-900 dark:bg-stone-900 dark:text-white transition-colors">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useDark } from '@vueuse/core'
import {useAppMeta} from "~/composables/useAppMeta.js";
useAppMeta()

const isDark = useDark()
// const toggleDark = useToggle(isDark)
</script>