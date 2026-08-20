<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { filteredProducts, filters, isLoading, deleteProduct } = useProducts()

const categories = [
  { label: 'الكل', value: '' },
  { label: 'إلكترونيات', value: 'electronics' },
  { label: 'ملابس', value: 'clothing' },
  { label: 'أثاث', value: 'furniture' }
]
</script>

<template>
  <div class="space-y-6 py-4">
    <!-- الهيدر وأزرار التوجيه -->
    <div class="flex items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
          إدارة المنتجات
        </h1>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          عرض وإدارة كافة المنتجات المتاحة في النظام.
        </p>
      </div>

      <UButton
        to="/dash/products/create"
        color="primary"
        icon="i-heroicons-plus"
      >
        إضافة منتج جديد
      </UButton>
    </div>

    <!-- شريط البحث والفلترة -->
    <div class="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm">
      <UInput
        v-model="filters.search"
        placeholder="البحث باسم المنتج..."
        icon="i-heroicons-magnifying-glass"
        class="w-full sm:w-72"
      />

      <USelect
        v-model="filters.category"
        :options="categories"
        placeholder="تصفية حسب القسم"
        class="w-full sm:w-48"
      />
    </div>

    <!-- شبكة الكروت (Cards Grid) -->
    <div
      v-if="filteredProducts.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="(product, index) in filteredProducts"
        :key="product.id"
        class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
      >
        <!-- الترقيم فوق الكارت -->
        <div class="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2 py-1 rounded-md">
          #{{ index + 1 }}
        </div>

        <div>
          <!-- صورة المنتج -->
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

            <!-- شارة التوفر -->
            <div class="absolute top-3 right-3">
              <UBadge
                :color="product.inStock ? 'success' : 'error'"
                variant="subtle"
                size="sm"
              >
                {{ product.inStock ? 'متوفر' : 'غير متوفر' }}
              </UBadge>
            </div>
          </div>

          <!-- تفاصيل المنتج -->
          <div class="p-4 space-y-2">
            <span class="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
              {{ product.category }}
            </span>

            <h3 class="text-base font-bold text-gray-900 dark:text-gray-100 line-clamp-1">
              {{ product.name }}
            </h3>

            <!-- السعر والخصم -->
            <div class="flex items-baseline gap-2 pt-1">
              <span class="text-lg font-bold text-gray-900 dark:text-gray-100">
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

        <!-- أزرار الإجراءات (تعديل وحذف) -->
        <div class="p-4 border-t border-gray-100 dark:border-zinc-800 flex items-center gap-2 bg-gray-50/50 dark:bg-zinc-800/30">
          <UButton
            :to="`/dash/products/edit/${product.id}`"
            color="neutral"
            variant="outline"
            icon="i-heroicons-pencil-square"
            block
            size="sm"
          >
            تعديل
          </UButton>

          <UButton
            color="error"
            variant="soft"
            icon="i-heroicons-trash"
            size="sm"
            @click="deleteProduct(product.id)"
          />
        </div>
      </div>
    </div>

    <!-- مظهر حالة عدم وجود منتجات -->
    <div
      v-else
      class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-3"
    >
      <UIcon
        name="i-heroicons-shopping-bag"
        class="w-14 h-14 text-gray-400 dark:text-gray-600"
      />
      <p class="text-lg font-semibold text-gray-700 dark:text-gray-300">
        لا يوجد منتجات لديك
      </p>
      <p class="text-xs text-gray-500 dark:text-gray-400 max-w-xs">
        قم بضغط زر "إضافة منتج جديد" للبدء في إضافة أول منتج لك في النظام.
      </p>
    </div>
  </div>
</template>
