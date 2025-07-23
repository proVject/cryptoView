<template>
  <div class="flex flex-col min-h-screen">
    <cv-header/>
    <!-- Page content -->
    <main class="flex-grow container mx-auto px-4 py-6 flex-1">
      <slot/>
    </main>
    <!-- Footer -->
    <cv-footer/>
  </div>
</template>
<script setup lang="ts">
</script>