<script setup lang="ts">
const { categories } = useCategories()
const form = ref({
  name: '',
  product: ''
})
const addcatogry = () => {
  categories.value.push({
    id: Date.now(),
    name: form.value.name,
    product: form.value.product,
    createdAt: new Date().toISOString()
  })

  navigateTo('/dash/categories')
}
</script>

<template>
  <form
    class="max-w-xl mx-auto my-10 p-6 sm:p-8 bg-white dark:bg-slate-900/70 backdrop-blur-2xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 transition-colors duration-300"
    @submit.prevent="addcatogry"
  >
    <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
      <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">
        إضافة تصنيف جديد
      </h2>
      <NuxtLink
        to="/dash/categories"
        class="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
      >
        إلغاء
      </NuxtLink>
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">اسم التصنيف</label>
      <input
        v-model="form.name"
        type="text"
        required
        placeholder="أدخل اسم التنصيف"
        class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
      >
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">المنتجات التابعه </label>
      <input
        v-model="form.product"
        type="text"
        required
        placeholder="مثال: هاتف ايفون "
        class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
      >
    </div>
    <button
      type="submit"
      class="w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 transition-all duration-200 mt-2"
    >
      إضافة تصنيف
    </button>
  </form>
</template>
