<script setup lang="ts">
import { useNavigation } from '~/composables/useNavigation'

const { isStoreRoute, currentLinks } = useNavigation()
</script>

<template>
  <aside class="w-64 h-screen bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 flex flex-col justify-between p-4 shrink-0">
    <div class="space-y-6">
      <!-- العنوان -->
      <div class="flex items-center gap-2 px-2">
        <UIcon
          :name="isStoreRoute ? 'i-heroicons-building-storefront' : 'i-heroicons-squares-2x2'"
          class="w-6 h-6 text-green-500 transition-all"
        />
        <h1 class="font-bold text-lg text-gray-800 dark:text-gray-100">
          {{ isStoreRoute ? 'المتجر الإلكتروني' : 'لوحة التحكم' }}
        </h1>
      </div>

      <!-- أزرار التنقل بين النمطين -->
      <div class="grid grid-cols-2 gap-1 p-1 bg-gray-100 dark:bg-zinc-800 rounded-xl">
        <NuxtLink
          to="/"
          class="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-colors"
          :class="!isStoreRoute
            ? 'bg-white dark:bg-zinc-900 text-green-600 dark:text-green-400 shadow-sm'
            : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'"
        >
          <UIcon
            name="i-heroicons-squares-2x2"
            class="w-4 h-4"
          />
          <span>داشبورد</span>
        </NuxtLink>

        <NuxtLink
          to="/store"
          class="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-colors"
          :class="isStoreRoute
            ? 'bg-white dark:bg-zinc-900 text-green-600 dark:text-green-400 shadow-sm'
            : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'"
        >
          <UIcon
            name="i-heroicons-globe-alt"
            class="w-4 h-4"
          />
          <span>الويب</span>
        </NuxtLink>
      </div>

      <!-- قائمة الروابط الديناميكية -->
      <nav class="space-y-1">
        <NuxtLink
          v-for="item in currentLinks"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          active-class="bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 font-medium"
        >
          <UIcon
            :name="item.icon"
            class="w-5 h-5"
          />
          <span>{{ item.label }}</span>
        </NuxtLink>
      </nav>
    </div>

    <!-- أسفل السايدبار -->
    <div class="pt-4 border-t border-gray-200 dark:border-zinc-800 flex items-center justify-between px-2">
      <span class="text-xs text-gray-500 dark:text-gray-400">المظهر</span>
      <ClientOnly>
        <UColorModeButton />
      </ClientOnly>
    </div>
  </aside>
</template>
