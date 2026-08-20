<template>
  <div class="h-screen flex overflow-hidden bg-gray-50 dark:bg-zinc-950">
    <!-- السايدبار -->
    <AppSidebar />

    <!-- المنطقة الرئيسية اللي بتعرض صفحات مجلد pages -->
    <main class="flex-1 overflow-y-auto p-6">
      <NuxtPage />
    </main>
  </div>
</template>
