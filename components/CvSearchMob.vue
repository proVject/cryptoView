<script setup>
import {useWindowSize} from "@vueuse/core";
import coins from '~/data/coinsObj.json'

const localePath = useLocalePath()
const { width } = useWindowSize()
const isOpen = ref(false);
const searchInput = ref('')

const createFilter = (queryString) => {
  return (coin) => {
    return (
        coin.symbol.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}

const coinsFiltered = computed(() => {
  return searchInput.value
      ? Object.values(coins).filter(createFilter(searchInput.value))
      : Object.values(coins)


  return Object.values(coins)
})

const onClickCoin = (item) => {
  navigateTo(localePath({name: 'coin-id', params: { id: item.symbol.toUpperCase() }}))
  isOpen.value = false
}

watchEffect(() => {
  if (width.value > 768) isOpen.value = false
})
</script>

<template>
  <div @click="isOpen = true" class="cursor-pointer flex h-8 w-8 justify-center items-center" >
    <icon name="mdi:search" size="20"/>
  </div>
  <el-drawer class="no-transition min-w-full !bg-amber-50 dark:!bg-stone-900" header-class="!mb-0 !gap-4 !bg-amber-100 text-amber-900 dark:!bg-stone-700 h-16 !py-0 !text-gray-900 dark:!text-white" body-class="!px-0" direction="rtl" v-model="isOpen">
    <template #header>
      <el-input :placeholder="$t('header.search_placeholder')" v-model="searchInput">
        <template #prefix>
          <icon size="20" name="mdi:search" />
        </template>
      </el-input>
    </template>
    <template #default>
      <div v-if="!coinsFiltered.length" class="text-center text-gray-500 dark:text-stone-400">{{ $t('header.search_empty') }}</div>
      <div v-show="coinsFiltered.length" v-for="item of coinsFiltered" :key="item.name" @click="onClickCoin(item)" class="cursor-pointer hover:bg-white dark:hover:bg-stone-700 px-4 flex items-center gap-2 py-2">
        <img :src="item.image" :alt="item.name" class="h-6 w-6" />
        <div>
          <p class="text-base/4">{{ item.name }}</p>
          <p class="text-xs text-gray-500 dark:text-stone-400">{{ item.symbol }}</p>
        </div>
        <div @click.stop class="ml-auto">
          <cv-favofite-button :name="item.symbol.toUpperCase()" />
        </div>
      </div>
    </template>
  </el-drawer>
</template>

<style>
.no-transition {
  transition: none !important;
}
.no-transition .el-drawer__container {
  animation: none !important;
  transition: none !important;
}
</style>