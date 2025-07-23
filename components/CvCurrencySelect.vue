<script setup>
import {CURRENCIES} from "~/constants/currency.js";
import { useStorage } from "@vueuse/core"
import {useCurrencyStore} from "~/store/currency.js";

const currencyStore = useCurrencyStore()

const currency = useStorage('cv-currency', 'UAH')

const onChangeCurrency = async (c) => {
  currency.value = c
}

onMounted(() => {
  currencyStore.getCurrencies()
})
</script>

<template>
  <select name="locale" :value="currency" @change="onChangeCurrency($event.target.value)">
    <option v-for="c of CURRENCIES" :key="c.value" :value="c.value">{{ c.label }}</option>
  </select>
</template>

<style scoped>

</style>