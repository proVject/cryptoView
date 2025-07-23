<script setup lang="ts">

</script>

<template>
  <footer class="bg-amber-50 dark:bg-stone-800 text-center text-sm py-4 text-amber-800 dark:text-stone-200">
    <p>
      {{ $t('footer.made_with') }}
      <a
          href="https://github.com/proVject"
          target="_blank"
          rel="noopener"
          class="text-amber-700 dark:text-amber-400 hover:underline"
      >
        Volodymyr Melnyk
      </a>
      • 2025 •
      <a
          href="mailto:vovazb1232@gmail.com"
          class="text-amber-700 dark:text-amber-400 hover:underline"
      >
        {{ $t('footer.contact_me') }}
      </a>
    </p>
  </footer>
</template>

<style scoped>

</style>