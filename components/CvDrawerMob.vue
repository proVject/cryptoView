<script setup>
import {useWindowSize} from "@vueuse/core";
import CvLocaleSelect from "~/components/CvLocaleSelect.vue";

const { width } = useWindowSize()
const isOpen = ref(false);

watchEffect(() => {
  if (width.value > 768) isOpen.value = false
})
</script>

<template>
  <div>
    <div @click="isOpen = true" class="cursor-pointer flex h-8 w-8 justify-center items-center" >
      <icon name="iconamoon:menu-burger-horizontal-bold" size="20"/>
    </div>
    <el-drawer class="min-w-[320px] !bg-amber-50 dark:!bg-stone-900" header-class="!text-gray-900 dark:!text-white" direction="rtl" v-model="isOpen">
      <template #header>
        <NuxtLink @click="isOpen = false" to="/" class="text-xl font-bold flex items-center gap-2">
          <img src="/favicon.png" alt="logo" class="h-8 w-8" />
          <div>CryptoView</div>
        </NuxtLink>
      </template>
      <template #default>
        <div class="flex flex-col gap-4 mb-6">
          <nav class="space-x-2 flex flex-col gap-4">
            <NuxtLink @click="isOpen = false" to="/" exact-active-class="text-amber-950 dark:text-amber-300" class="h-full flex px-2 items-center outline-0">Home</NuxtLink>
            <NuxtLink @click="isOpen = false" to="/favorites" exact-active-class="text-amber-950 dark:text-amber-300" class="h-full flex px-2 items-center outline-0">Favorites</NuxtLink>
          </nav>
          <div class="flex flex-col gap-1">
            <p class="text-gray-500 dark:text-stone-400 text-sm">Language:</p>
            <cv-locale-select />
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-gray-500 dark:text-stone-400 text-sm">Currency:</p>
            <cv-currency-select />
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-gray-500 dark:text-stone-400 text-sm">Dark mode:</p>
            <cv-theme-toggle />
          </div>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped>
</style>