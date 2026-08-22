<script setup lang="ts">
// تعريف الشروط والبيانات المطلوبة للكارت
defineProps<{
  category: {
    id: number
    name: string
    product: string
  }
}>()

// تعريف الأحداث التي يرسلها الكارت للأب
const emit = defineEmits<{
  (e: 'delete', id: number): void
}>()
</script>

<template>
  <div class="bg-white dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-md hover:shadow-xl">
    <!-- تفاصيل التصنيف والمنتج -->
    <div class="p-5 space-y-3">
      <div class="flex items-start justify-between gap-2">
        <h2 class="font-bold text-lg text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
          {{ category.name }}
        </h2>
      </div>

      <!-- إظهار اسم المنتج التابع للتصنيف -->
      <div class="text-xs text-slate-500 dark:text-slate-400">
        <span class="font-medium text-slate-400 dark:text-slate-500">المنتج التابع:</span>
        <span class="mr-1 text-slate-700 dark:text-slate-300 font-semibold">{{ category.product }}</span>
      </div>
    </div>

    <!-- أزرار الإجراءات داخل الحاوية الرئيسية -->
    <div class="p-5 pt-3 mt-auto flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800/40">
      <NuxtLink
        :to="`/dash/categories/edit?id=${category.id}`"
        class="px-3.5 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-lg transition-colors"
      >
        تعديل
      </NuxtLink>
      <button
        class="px-3.5 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition-colors"
        @click="emit('delete', category.id)"
      >
        حذف التصنيف
      </button>
    </div>
  </div>
</template>
