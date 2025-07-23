<script setup>
const { setLocale, locale, locales } = useI18n()
const a = useI18n()

const onChangeLocale = async (newLocale) => {
  setLocale(newLocale)
}
</script>

<template>
  <select name="locale" :value="locale" @change="onChangeLocale($event.target.value)">
    <option v-for="l of locales" :key="l.code" :value="l.code">{{ l.name }}</option>
  </select>
</template>

<style scoped>

</style>