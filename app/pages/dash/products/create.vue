<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'

const router = useRouter()
const { addProduct, isLoading } = useProducts()

const form = reactive({
  name: '',
  category: 'electronics',
  price: 0,
  discountPrice: null as number | null,
  inStock: true,
  image: ''
})

const categories = [
  { label: 'إلكترونيات', value: 'electronics' },
  { label: 'ملابس', value: 'clothing' },
  { label: 'أثاث', value: 'furniture' }
]

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    form.image = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

const removeImage = () => {
  form.image = ''
}

const handleSubmit = async () => {
  if (!form.name.trim() || form.price <= 0) return

  await addProduct({
    name: form.name,
    category: form.category,
    price: Number(form.price),
    discountPrice: form.discountPrice ? Number(form.discountPrice) : null,
    inStock: form.inStock,
    image: form.image
  })

  router.push('/dash/products')
}
</script>

<template>
  <div class="max-w-2xl mx-auto py-6 space-y-6">
    <!-- هيدر الصفحة وزر العودة -->
    <div class="flex items-center justify-between border-b border-gray-200 dark:border-zinc-800 pb-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
          إضافة منتج جديد
        </h1>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          أدخل بيانات المنتج الجديد لإضافته إلى قائمة البيانات.
        </p>
      </div>

      <UButton
        to="/dash/products"
        color="neutral"
        variant="ghost"
        icon="i-heroicons-arrow-right"
      >
        رجوع للجدول
      </UButton>
    </div>

    <!-- نموذج إضافة المنتج -->
    <form
      class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-5"
      @submit.prevent="handleSubmit"
    >
      <!-- رفع صورة المنتج -->
      <UFormField label="صورة المنتج">
        <div class="space-y-3">
          <div
            v-if="!form.image"
            class="border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-xl p-6 text-center hover:border-primary-500 transition-colors cursor-pointer relative"
          >
            <input
              type="file"
              accept="image/*"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              @change="handleImageUpload"
            >
            <UIcon
              name="i-heroicons-photo"
              class="w-10 h-10 mx-auto text-gray-400 dark:text-gray-500 mb-2"
            />
            <p class="text-xs text-gray-600 dark:text-gray-400 font-medium">
              اضغط هنا لرفع صورة المنتج أو اسحب الصورة إلى هنا
            </p>
            <p class="text-[10px] text-gray-400 mt-1">
              PNG, JPG, WEBP حتى 5MB
            </p>
          </div>

          <div
            v-else
            class="relative w-32 h-32 rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-700 group"
          >
            <img
              :src="form.image"
              alt="معاينة المنتج"
              class="w-full h-full object-cover"
            >
            <button
              type="button"
              class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-90 hover:opacity-100 transition-opacity"
              @click="removeImage"
            >
              <UIcon
                name="i-heroicons-x-mark"
                class="w-4 h-4"
              />
            </button>
          </div>
        </div>
      </UFormField>

      <!-- اسم المنتج -->
      <UFormField
        label="اسم المنتج"
        required
      >
        <UInput
          v-model="form.name"
          placeholder="أدخل اسم المنتج..."
          class="w-full"
        />
      </UFormField>

      <!-- القسم -->
      <UFormField
        label="التصنيف"
        required
      >
        <USelect
          v-model="form.category"
          :options="categories"
          class="w-full"
        />
      </UFormField>

      <!-- السعر وسعر الخصم -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <UFormField
          label="السعر الأساسي ($)"
          required
        >
          <UInput
            v-model.number="form.price"
            type="number"
            min="0"
            placeholder="0.00"
            class="w-full"
          />
        </UFormField>

        <UFormField label="السعر بعد الخصم ($)">
          <UInput
            v-model.number="form.discountPrice"
            type="number"
            min="0"
            placeholder="اختياري"
            class="w-full"
          />
        </UFormField>
      </div>

      <!-- حالة التوفر -->
      <div class="flex items-center justify-between pt-2">
        <div>
          <p class="text-sm font-medium text-gray-900 dark:text-gray-200">
            حالة التوفر
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            تحديد ما إذا كان المنتج متاحاً للبيع حالياً
          </p>
        </div>
        <USwitch v-model="form.inStock" />
      </div>

      <!-- أزرار الإجراءات -->
      <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-zinc-800">
        <UButton
          to="/dash/products"
          color="neutral"
          variant="outline"
        >
          إلغاء
        </UButton>

        <UButton
          type="submit"
          color="primary"
          :loading="isLoading"
          icon="i-heroicons-check"
        >
          حفظ المنتج
        </UButton>
      </div>
    </form>
  </div>
</template>
