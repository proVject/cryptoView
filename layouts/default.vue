<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <header class="bg-amber-100 text-amber-900 dark:bg-stone-900 dark:text-stone-100 shadow-sm">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <NuxtLink to="/" class="text-xl font-bold">CryptoView</NuxtLink>
        <nav class="space-x-4">
          <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
          <NuxtLink to="/favorites" class="hover:underline">Favorites</NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Page content -->
    <main class="flex-grow container mx-auto px-4 py-6 flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-amber-50 dark:bg-stone-800 text-center text-sm py-4 text-amber-800 dark:text-stone-200">
      © 2025 CryptoView — Stay curious 🪙
    </footer>
  </div>
</template>