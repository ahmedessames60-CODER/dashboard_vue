<script setup lang="ts">
// تعريف الشروط والبيانات المطلوبة للكارت
defineProps<{
  product: {
    id: number
    name: string
    category: string
    price: number
    image?: string
    inStock: boolean
  }
}>()

// تعريف الأحداث التي يرسلها الكارت للأب
const emit = defineEmits<{
  (e: 'delete', id: number): void
}>()
</script>

<template>
  <div class="bg-white dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-md hover:shadow-xl">
    <div>
      <!-- صورة المنتج -->
      <div class="relative w-full h-48 bg-slate-100 dark:bg-slate-950/50 overflow-hidden flex items-center justify-center border-b border-slate-200 dark:border-slate-800/80">
        <img
          v-if="product.image"
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        >
        <div
          v-else
          class="text-slate-400 dark:text-slate-600 flex flex-col items-center gap-2 text-xs"
        >
          <span class="text-2xl">📦</span>
          <span>لا توجد صورة</span>
        </div>

        <span class="absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50 shadow-sm">
          {{ product.category }}
        </span>
      </div>

      <!-- تفاصيل المنتج -->
      <div class="p-5 space-y-3">
        <div class="flex items-start justify-between gap-2">
          <h2 class="font-bold text-lg text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
            {{ product.name }}
          </h2>
          <span class="font-bold text-lg text-slate-900 dark:text-slate-100 font-mono">
            ${{ product.price }}
          </span>
        </div>

        <div>
          <span
            :class="[
              'px-3 py-1 text-xs font-semibold rounded-full border inline-flex items-center gap-1.5',
              product.inStock
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
            ]"
          >
            <span
              :class="[
                'w-1.5 h-1.5 rounded-full',
                product.inStock ? 'bg-emerald-500 dark:bg-emerald-400 animate-pulse' : 'bg-rose-500 dark:bg-rose-400'
              ]"
            />
            {{ product.inStock ? 'متوفر' : 'غير متوفر' }}
          </span>
        </div>
      </div>
    </div>

    <!-- أزرار الإجراءات -->
    <div class="p-5 pt-0 mt-auto flex items-center justify-end border-t border-slate-100 dark:border-slate-800/40">
      <NuxtLink
        :to="`/dash/products/edit?id=${product.id}`"
        class="px-3.5 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-lg transition-colors"
      >
        تعديل
      </NuxtLink>
      <button
        class="px-3.5 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition-colors"
        @click="emit('delete', product.id)"
      >
        حذف المنتج
      </button>
    </div>
  </div>
</template>
