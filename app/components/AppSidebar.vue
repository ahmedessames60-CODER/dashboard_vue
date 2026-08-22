<script setup lang="ts">
import { ref } from 'vue'
import { useNavigation } from '~/composables/useNavigation'

const { isStoreRoute, currentLinks } = useNavigation()

// حالة فتح وإغلاق القائمة على الموبايل
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <div>
    <!-- زر القائمة (همبرجر) للموبايل فقط -->
    <button
      type="button"
      class="lg:hidden fixed top-4 right-4 z-50 p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-gray-200 shadow-md focus:outline-none"
      aria-label="Toggle Menu"
      @click="toggleMenu"
    >
      <UIcon
        :name="isMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
        class="w-6 h-6"
      />
    </button>

    <!-- خلفية معتمة (Overlay) عند فتح القائمة على الموبايل -->
    <div
      v-if="isMenuOpen"
      class="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
      @click="closeMenu"
    />

    <!-- القائمة الجانبية (Sidebar / Drawer) -->
    <aside
      class="fixed lg:static top-0 right-0 z-40 w-64 h-screen bg-white dark:bg-zinc-900 border-l lg:border-l-0 lg:border-r border-gray-200 dark:border-zinc-800 flex flex-col justify-between p-4 shrink-0 transition-transform duration-300 ease-in-out"
      :class="isMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'"
    >
      <div class="space-y-6">
        <!-- العنوان -->
        <div class="flex items-center justify-between px-2">
          <div class="flex items-center gap-2">
            <UIcon
              :name="isStoreRoute ? 'i-heroicons-building-storefront' : 'i-heroicons-squares-2x2'"
              class="w-6 h-6 text-green-500 transition-all"
            />
            <h1 class="font-bold text-lg text-gray-800 dark:text-gray-100">
              {{ isStoreRoute ? 'المتجر الإلكتروني' : 'لوحة التحكم' }}
            </h1>
          </div>
        </div>

        <!-- أزرار التنقل بين النمطين -->
        <div class="grid grid-cols-2 gap-1 p-1 bg-gray-100 dark:bg-zinc-800 rounded-xl">
          <NuxtLink
            to="/"
            class="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-colors"
            :class="!isStoreRoute
              ? 'bg-white dark:bg-zinc-900 text-green-600 dark:text-green-400 shadow-sm'
              : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'"
            @click="closeMenu"
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
            @click="closeMenu"
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
            @click="closeMenu"
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
  </div>
</template>
