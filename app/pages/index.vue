<script setup lang="ts">
const steps = [
  {
    step: '01',
    title: 'إدارة البيانات من الداشبورد',
    description: 'انتقل إلى صفحات الإدارة (المنتجات، التصنيفات، الطلبات) لإضافة أو تعديل البيانات وتجربة التحكم الكامل.',
    icon: 'i-heroicons-squares-2x2',
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-950/40'
  },
  {
    step: '02',
    title: 'الانتقال إلى واجهة الويب (المتجر)',
    description: 'اضغط على زر "الويب" من السايدبار للتنقل الفوري لصفحات المتجر الخاصة بالعميل مع تغيير قائمة السايدبار تلقائيًا.',
    icon: 'i-heroicons-globe-alt',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/40'
  },
  {
    step: '03',
    title: 'معاينة انعكاس البيانات الحية',
    description: 'أي منتج تقوم بإضافته أو تعديله في لوحة التحكم سينعكس فوراً في واجهة الويب بفضل مشاركة الحالة (State Management).',
    icon: 'i-heroicons-arrow-path',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-950/40'
  }
]
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-8 py-4">
    <!-- الهيدر والترحيب -->
    <div class="bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-transparent p-6 rounded-3xl border border-green-500/20 space-y-2">
      <UBadge
        color="success"
        variant="subtle"
        size="sm"
      >
        دليل الاستخدام السريع
      </UBadge>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
        أهلاً بك في نظام لوحة التحكم والمتجر المدمج 👋
      </h1>
      <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
        هذا التطبيق مخصص للتجربة التفاعلية المزدوجة؛ حيث يمكنك إدارة البيانات كمدير للنظام وفي نفس الوقت تجربة الواجهة كعميل يتصفح المتجر.
      </p>
    </div>

    <!-- خطوات التعامل مع التطبيق -->
    <div class="space-y-4">
      <h2 class="text-base font-bold text-gray-800 dark:text-gray-200 px-1">
        كيف تبدأ تجربة المشروع؟
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="item in steps"
          :key="item.step"
          class="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-200 dark:border-zinc-800 space-y-4 flex flex-col justify-between shadow-sm"
        >
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-bold text-gray-400 dark:text-gray-500">
                STEP {{ item.step }}
              </span>
              <div :class="[item.bgColor, 'p-2.5 rounded-xl']">
                <UIcon
                  :name="item.icon"
                  class="w-5 h-5"
                  :class="item.color"
                />
              </div>
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
    </div>

    <!-- تنبيه بسيط في الأسفل -->
    <div class="p-4 bg-gray-100 dark:bg-zinc-900/60 rounded-2xl border border-gray-200 dark:border-zinc-800 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-3">
      <UIcon
        name="i-heroicons-information-circle"
        class="w-5 h-5 text-green-500 shrink-0"
      />
      <span>يمكنك التنقل بحرية بين وضع الداشبورد ووضع الويب في أي وقت من خلال أزرار التبديل الموجودة بأعلى السايدبار.</span>
    </div>
  </div>
</template>
