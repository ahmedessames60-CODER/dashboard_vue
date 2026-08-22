<script setup lang="ts">
const {
  categories,
  isDeleteDialogOpen,
  confirmDelete,
  executeDelete,
  closeDeleteDialog
} = useCategories()
</script>

<template>
  <div class="max-w-6xl mx-auto my-10 p-6 sm:p-8 bg-white dark:bg-slate-900/70 backdrop-blur-2xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-8 transition-colors duration-300">
    <!-- الهيدر والزرار -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          قائمة التصنيفات
        </h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          إدارة التصنيفات وتتبع الحالات بسهولة
        </p>
      </div>

      <NuxtLink
        to="/dash/categories/create"
        class="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 transition-all duration-200 group"
      >
        <span class="text-lg leading-none group-hover:rotate-90 transition-transform duration-300">+</span>
        إضافة تصنيف جديد
      </NuxtLink>
    </div>

    <!-- الكود المعدل -->
    <div
      v-if="categories.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <CategoryRow
        v-for="category in categories"
        :key="category.id"
        :category="category"
        @delete="confirmDelete"
      />
    </div>

    <!-- رسالة عدم وجود منتجات -->
    <div
      v-else
      class="text-center py-16 bg-slate-50 dark:bg-slate-800/20 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 space-y-3"
    >
      <div class="text-4xl">
        🛍️
      </div>
      <p class="text-slate-500 dark:text-slate-400 font-medium text-sm">
        لا توجد منتجات مضافة حتى الآن.
      </p>
    </div>

    <!-- ديالوج تأكيد الحذف -->
    <Teleport to="body">
      <div
        v-if="isDeleteDialogOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-sm"
        @click.self="closeDeleteDialog"
      >
        <div class="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl transition-colors">
          <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100">
              تأكيد الحذف
            </h3>
            <button
              class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              @click="closeDeleteDialog"
            >
              ✕
            </button>
          </div>

          <p class="text-sm text-slate-600 dark:text-slate-300">
            هل أنت متأكد من رغبتك في حذف هذا التنصيف لا يمكنك التراجع عن هذا الإجراء لاحقاً.
          </p>

          <div class="flex justify-end gap-3 pt-2">
            <button
              class="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
              @click="closeDeleteDialog"
            >
              إلغاء
            </button>
            <button
              class="px-4 py-2 text-sm font-semibold bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white rounded-xl shadow-lg shadow-rose-600/20 transition-all"
              @click="executeDelete"
            >
              حذف
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
