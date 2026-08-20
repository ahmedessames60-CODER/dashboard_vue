<script setup lang="ts">
const features = [
  {
    title: 'تصفح المنتجات',
    description: 'استكشف كافة المنتجات المتاحة في المتجر مع إمكانية الفلترة والبحث المتقدم.',
    icon: 'i-heroicons-squares-plus',
    badge: 'المنتجات'
  },
  {
    title: 'التصنيفات المختلفة',
    description: 'تنقل بين الأقسام والتصنيفات للوصول السريع لما تبحث عنه بسهولة.',
    icon: 'i-heroicons-rectangle-group',
    badge: 'التصنيفات'
  },
  {
    title: 'العروض والخصومات',
    description: 'تابِع أحدث التخفيضات والصفقات الحصرية المتاحة حالياً على المنتجات.',
    icon: 'i-heroicons-tag',
    badge: 'العروض'
  },
  {
    title: 'متابعة الطلبات والسلة',
    description: 'أضف المنتجات لسلتك واكتمل عملية الشراء مع إمكانية تتبع حالة طلبك.',
    icon: 'i-heroicons-shopping-bag',
    badge: 'السلة والطلبات'
  }
]
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-8 py-4">
    <!-- الهيدر الترحيبي -->
    <div class="bg-gradient-to-r from-blue-600/10 via-sky-500/5 to-transparent p-6 rounded-3xl border border-blue-500/20 space-y-2">
      <UBadge
        color="info"
        variant="subtle"
        size="sm"
      >
        دليل المتجر الإلكتروني
      </UBadge>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
        أهلاً بك في واجهة الويب للمتجر 🛍️
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
        هذه الواجهة مخصصة لتجربة العميل؛ يمكنك التنقل بين الأقسام المختلفة المتاحة في السايدبار لاستكشاف المنتجات، العروض، وإدارة طلباتك.
      </p>
    </div>

    <!-- شبكة الإرشادات للأقسام -->
    <div class="space-y-4">
      <h2 class="text-base font-bold text-gray-800 dark:text-gray-200 px-1">
        ما الذي يمكنك استكشافه في المتجر؟
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="item in features"
          :key="item.title"
          class="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-200 dark:border-zinc-800 space-y-3 shadow-sm hover:border-blue-500/40 transition-colors"
        >
          <div class="flex items-center justify-between">
            <div class="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-blue-500">
              <UIcon
                :name="item.icon"
                class="w-5 h-5"
              />
            </div>
            <UBadge
              color="neutral"
              variant="subtle"
              size="xs"
            >
              {{ item.badge }}
            </UBadge>
          </div>

          <h3 class="font-bold text-sm text-gray-900 dark:text-gray-100">
            {{ item.title }}
          </h3>

          <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- شريط تنبيه في الأسفل -->
    <div class="p-4 bg-gray-100 dark:bg-zinc-900/60 rounded-2xl border border-gray-200 dark:border-zinc-800 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-3">
      <UIcon
        name="i-heroicons-information-circle"
        class="w-5 h-5 text-blue-500 shrink-0"
      />
      <span>استخدم القائمة الجانبية (السايدبار) للانتقال المباشر لأي قسم من أقسام المتجر الموضحة أعلاه.</span>
    </div>
  </div>
</template>
