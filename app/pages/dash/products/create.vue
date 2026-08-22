<script setup lang="ts">
const { products, handleImageUpload } = useProducts()

const form = ref({
  name: '',
  category: '',
  image: '',
  price: '',
  status: 'متوفر'
})

// دالة تفريغ حقل الصورة
const clearImage = () => {
  form.value.image = ''
}

const addProduct = () => {
  products.value.push({
    id: Date.now(),
    name: form.value.name,
    category: form.value.category,
    image: form.value.image,
    price: Number(form.value.price),
    inStock: form.value.status === 'متوفر',
    createdAt: new Date().toISOString()
  })

  navigateTo('/dash/products')
}
</script>

<template>
  <form
    class="max-w-xl mx-auto my-10 p-6 sm:p-8 bg-white dark:bg-slate-900/70 backdrop-blur-2xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 transition-colors duration-300"
    @submit.prevent="addProduct"
  >
    <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
      <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">
        إضافة منتج جديد
      </h2>
      <NuxtLink
        to="/dash/products"
        class="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
      >
        إلغاء
      </NuxtLink>
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">اسم المنتج</label>
      <input
        v-model="form.name"
        type="text"
        required
        placeholder="أدخل اسم المنتج"
        class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
      >
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">التصنيف</label>
      <input
        v-model="form.category"
        type="text"
        required
        placeholder="مثال: إلكترونيات، ملابس"
        class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
      >
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">السعر</label>
      <input
        v-model="form.price"
        type="number"
        required
        placeholder="0.00"
        class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
      >
    </div>

    <!-- حقل اختيار المعاينة وحذف الصورة -->
    <div>
      <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">صورة المنتج</label>
      <div class="space-y-3">
        <!-- مربع المعاينة -->
        <div
          v-if="form.image"
          class="relative w-32 h-32 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-100 dark:bg-slate-800/60 overflow-hidden group shadow-lg"
        >
          <img
            :src="form.image"
            alt="Preview"
            class="w-full h-full object-cover"
          >
          <!-- زر مسح الصورة -->
          <button
            type="button"
            class="absolute top-2 right-2 bg-rose-500/80 hover:bg-rose-600 text-white p-1.5 rounded-lg backdrop-blur-md transition-colors"
            title="حذف الصورة"
            @click="clearImage"
          >
            ✕
          </button>
        </div>

        <!-- زر اختيار الصورة المنسق -->
        <label class="block cursor-pointer">
          <div class="w-full px-4 py-3.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/80 hover:border-slate-400 dark:hover:border-slate-600 rounded-xl text-slate-500 dark:text-slate-400 text-sm flex items-center justify-between transition-colors">
            <span>{{ form.image ? 'تغيير الصورة المختارة...' : 'اختر صورة من الجهاز...' }}</span>
            <span class="text-xs bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-500/30 font-medium">Browse</span>
          </div>
          <input
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleImageUpload($event, form)"
          >
        </label>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">الحالة</label>
      <select
        v-model="form.status"
        class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/80 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
      >
        <option
          value="متوفر"
          class="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
        >
          متوفر
        </option>
        <option
          value="غير متوفر"
          class="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
        >
          غير متوفر
        </option>
      </select>
    </div>

    <button
      type="submit"
      class="w-full py-3.5 px-6 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 transition-all duration-200 mt-2"
    >
      إضافة المنتج
    </button>
  </form>
</template>
