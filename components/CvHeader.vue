<script setup>
import CvLocaleSelect from "~/components/CvLocaleSelect.vue";
</script>

<template>
  <header class="bg-amber-100 text-amber-900 dark:bg-stone-700 dark:text-stone-100 shadow-sm">
    <div class="container mx-auto px-4 h-16 flex justify-between items-center">
      <div class="flex items-center gap-6 h-full">
        <NuxtLink to="/" class="text-xl font-bold flex items-center gap-2">
          <img src="/favicon.png" alt="logo" class="h-8 w-8" />
          <div>CryptoView</div>
        </NuxtLink>
        <nav class="hidden md:flex space-x-2 flex items-center h-full">
          <NuxtLink to="/" exact-active-class="text-amber-950 border-amber-950 dark:text-amber-300 dark:border-amber-300" class="border-b-2 border-amber-50/0 h-full flex px-2 items-center outline-0">
            {{ $t('header.home') }}</NuxtLink>
          <NuxtLink to="/favorites" exact-active-class="text-amber-950 border-amber-950 dark:text-amber-300 dark:border-amber-300" class="border-b-2 border-amber-50/0 h-full flex px-2 items-center outline-0">
            {{ $t('header.favorites') }}</NuxtLink>
        </nav>
      </div>
      <div class="hidden md:flex items-center gap-2">
        <client-only>
          <cv-theme-toggle />
          <cv-currency-select />
          <cv-locale-select />
          <cv-search />
        </client-only>
      </div>
      <div class="flex md:hidden items-center gap-2">
        <client-only>
          <cv-search-mob />
          <cv-drawer-mob />
        </client-only>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>