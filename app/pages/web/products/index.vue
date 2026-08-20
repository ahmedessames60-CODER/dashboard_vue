<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'

const { filteredProducts, filters } = useProducts()

const categories = [
  { label: 'الكل', value: '' },
  { label: 'إلكترونيات', value: 'electronics' },
  { label: 'ملابس', value: 'clothing' },
  { label: 'أثاث', value: 'furniture' }
]
</script>

<template>
  <div class="max-w-7xl mx-auto py-8 px-4 space-y-8">
    <!-- هيدر الصفحة والبحث -->
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-200 dark:border-zinc-800 pb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">
          معرض المنتجات
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          استكشف أحدث المنتجات المتاحة في متجرنا.
        </p>
      </div>

      <!-- أدوات الفلترة والبحث -->
      <div class="flex items-center gap-3 w-full md:w-auto">
        <UInput
          v-model="filters.search"
          placeholder="ابحث عن منتج..."
          icon="i-heroicons-magnifying-glass"
          class="w-full md:w-64"
        />

        <USelect
          v-model="filters.category"
          :options="categories"
          placeholder="جميع الاقسام"
          class="w-40"
        />
      </div>
    </div>

    <!-- شبكة عرض المنتجات (Products Grid) -->
    <div
      v-if="filteredProducts.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
      >
        <div>
          <!-- صورة المنتج مع شارات التوفر والتصنيف -->
          <div class="w-full h-48 bg-gray-100 dark:bg-zinc-800 relative overflow-hidden flex items-center justify-center">
            <img
              v-if="product.image"
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            >
            <div
              v-else
              class="flex flex-col items-center justify-center text-gray-400"
            >
              <UIcon
                name="i-heroicons-photo"
                class="w-12 h-12"
              />
              <span class="text-xs mt-1">لا توجد صورة</span>
            </div>

            <!-- شارة التصنيف -->
            <div class="absolute top-3 right-3">
              <UBadge
                variant="subtle"
                color="neutral"
                size="sm"
                class="backdrop-blur-md bg-white/80 dark:bg-zinc-900/80"
              >
                {{ product.category }}
              </UBadge>
            </div>

            <!-- شارة الحالة -->
            <div class="absolute top-3 left-3">
              <UBadge
                :color="product.inStock ? 'success' : 'error'"
                variant="subtle"
                size="sm"
                class="backdrop-blur-md bg-white/80 dark:bg-zinc-900/80"
              >
                {{ product.inStock ? 'متوفر' : 'غير متوفر' }}
              </UBadge>
            </div>
          </div>

          <!-- تفاصيل المنتج -->
          <div class="p-5 space-y-3">
            <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 line-clamp-1">
              {{ product.name }}
            </h3>

            <div class="flex items-baseline gap-2">
              <span class="text-xl font-extrabold text-primary-600 dark:text-primary-400">
                ${{ product.discountPrice ?? product.price }}
              </span>
              <span
                v-if="product.discountPrice"
                class="text-xs text-gray-400 line-through"
              >
                ${{ product.price }}
              </span>
            </div>
          </div>
        </div>

        <!-- زر الإضافة للسلة -->
        <div class="p-4 bg-gray-50 dark:bg-zinc-800/50 border-t border-gray-100 dark:border-zinc-800">
          <UButton
            block
            color="primary"
            icon="i-heroicons-shopping-cart"
            :disabled="!product.inStock"
          >
            إضافة للسلة
          </UButton>
        </div>
      </div>
    </div>

    <!-- حالة عدم وجود منتجات -->
    <div
      v-else
      class="flex flex-col items-center justify-center py-16 text-center space-y-4"
    >
      <UIcon
        name="i-heroicons-squares-plus"
        class="w-16 h-16 text-gray-300 dark:text-gray-600"
      />
      <h3 class="text-xl font-bold text-gray-700 dark:text-gray-300">
        لا توجد منتجات معروضة حالياً
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
        لم يتم إضافة أي منتجات من لوحة التحكم حتى الآن أو أن نتائج البحث لا تطابق أي عنصر.
      </p>
    </div>
  </div>
</template>
