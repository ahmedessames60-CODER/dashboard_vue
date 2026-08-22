<script setup lang="ts">
//  استدعاء قائمة المنتجات من الـ Composable
const { products } = useProducts()

// دالة إضافة المنتج للسلة (مثال)
const addToCart = (productId: number) => {
  console.log('تمت إضافة المنتج للسلة:', productId)
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- هيدر الصفحة -->
    <div class="mb-10 text-center space-y-3">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
        المتجر الإلكتروني
      </h1>
      <p class="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
        استكشف أحدث منتجاتنا العصرية واحصل على أفضل العروض
      </p>
    </div>

    <!-- شبكة المنتجات للعملاء -->
    <div
      v-if="products.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
      >
        <!-- صورة المنتج -->
        <div class="relative w-full h-52 bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center">
          <img
            v-if="product.image"
            :src="product.image"
            :alt="product.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          >
          <span
            v-else
            class="text-4xl"
          >🛍️</span>

          <!-- Tag التصنيف -->
          <span class="absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold rounded-md bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 shadow-sm border border-slate-200 dark:border-slate-700">
            {{ product.category }}
          </span>
        </div>

        <!-- تفاصيل المنتج -->
        <div class="p-5 space-y-3 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="font-bold text-base text-slate-800 dark:text-slate-100 line-clamp-1 mb-1">
              {{ product.name }}
            </h3>
            <p class="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
              ${{ product.price }}
            </p>
          </div>

          <!-- زر إضافة للسلة -->
          <button
            :disabled="!product.inStock"
            class="w-full mt-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-medium text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            @click="addToCart(product.id)"
          >
            <span>{{ product.inStock ? 'إضافة للسلة' : 'غير متوفر حالياً' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- رسالة المتجر فارغ -->
    <div
      v-else
      class="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800"
    >
      <p class="text-slate-500 dark:text-slate-400 text-lg">
        لا توجد منتجات معروضة للبيع في الوقت الحالي.
      </p>
    </div>
  </div>
</template>
