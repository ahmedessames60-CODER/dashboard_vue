<script setup lang="ts">
import { ref, computed } from 'vue'


interface Notification {
  id: number;
  text: string;
  body?: string;
  time: string;
  isRead: boolean;
}

type FilterType = 'الكل' | 'غير مقروء' | 'مقروء';

const isModalOpen = ref<boolean>(false)
const currentFilter = ref<FilterType>('الكل')
const selectedNotification = ref<Notification | null>(null)

const notifications = ref<Notification[]>([
  {
    id: 1,
    text: 'هناك رسالة تواصل جديدة من عميل',
    body: 'مرحباً، أود الاستفسار عن أسعار باقات الدعم الفني السنوية المتاحة لشركتنا وهل يوجد خصم حالي؟ وشكراً لكم.',
    time: 'منذ 5 دقائق',
    isRead: false
  },
  {
    id: 2,
    text: 'تم تسجيل مستخدم جديد في المنصة',
    body: 'قام المستخدم "المهندس أحمد علوان" بإنشاء حساب جديد كمدير مشروع وتم تفعيل الحساب عبر البريد الإلكتروني بنجاح.',
    time: 'منذ ساعة',
    isRead: false
  },
  {
    id: 3,
    text: 'تم سداد الفاتورة رقم #1001 بنجاح',
    body: 'تم استلام مبلغ 1,500 ريال سعودي من شركة الأمل الدولية عبر البوابة الإلكترونية وتحديث حالة الحساب الحالية.',
    time: 'منذ يومين',
    isRead: true
  }
])

const hasUnread = computed<boolean>(() => {
  return notifications.value.some(notif => !notif.isRead)
})

const filteredNotifications = computed<Notification[]>(() => {
  if (currentFilter.value === 'غير مقروء') {
    return notifications.value.filter(notif => !notif.isRead)
  }
  if (currentFilter.value === 'مقروء') {
    return notifications.value.filter(notif => notif.isRead)
  }
  return notifications.value
})

const toggleModal = (): void => {
  // لو بنقفل المودال وكان في رسالة مفتوحة، نحولها لمقروءة قبل القفل
  if (isModalOpen.value && selectedNotification.value) {
    markAsRead(selectedNotification.value.id)
  }
  isModalOpen.value = !isModalOpen.value
  if (!isModalOpen.value) selectedNotification.value = null
}

const markAllAsRead = (): void => {
  notifications.value = notifications.value.map(notif => ({ ...notif, isRead: true }))
}

// العميل بيدخل يقرأ الرسالة بس بنسيب حالتها "غير مقروءة" مؤقتاً علشان متختفيش من القائمة في الخلفية
const viewNotification = (notif: Notification): void => {
  selectedNotification.value = notif
}

// زرار العودة للخلف: هنا السحر! أول ما يضغط عليه بنحول الرسالة السابقة لمقروءة ثم نرجعه للقائمة الفلترة نظيفة
const goBackToList = (): void => {
  if (selectedNotification.value) {
    markAsRead(selectedNotification.value.id)
  }
  selectedNotification.value = null
}

// دالة مساعدة لتغيير حالة رسالة معينة إلى مقروءة
const markAsRead = (id: number): void => {
  notifications.value = notifications.value.map(n =>
    n.id === id ? { ...n, isRead: true } : n
  )
}




const isMenuOpen = ref(false)

const menuItems = ref([
  { id: 'dashboard', name: 'الرئيسية', route: '/' },
  { id: 'users', name: 'المستخدمين', route: '/users' },
  { id: 'mangmentsystem', name: 'اداره البيانات', route: '/management' },
  { id: 'forms', name: 'النماذج', route: '/forms' },
  { id: 'setting', name: 'الإعدادات', route: '/settings' },
  { id: 'conect', name: 'تواصل', route: '/conect' },
  { id: 'accounting page', name: 'المحاسبه والفواتير', route: '/accounting-page' }
])
</script>

<template>
  <div
    class="grid grid-cols-1 lg:grid-cols-[260px_1fr] h-screen w-full bg-slate-100 text-slate-900 overflow-hidden relative">

    <div v-if="isMenuOpen" @click="isMenuOpen = false" class="fixed inset-0 bg-black/50 z-40 lg:hidden"></div>

    <aside :class="isMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'"
      class="fixed inset-y-0 right-0 w-[260px] bg-slate-950 text-white p-4 flex flex-col justify-between z-50 transition-transform lg:relative">
      <div>
        <div class="flex items-center justify-between p-2 border-b border-slate-800 mb-6">
          <span class="text-xl font-bold">لوحة التحكم</span>
          <button @click="isMenuOpen = false" class="lg:hidden p-1 rounded hover:bg-slate-800">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <nav>
          <ul class="space-y-2">
            <li v-for="item in menuItems" :key="item.id">
              <RouterLink :to="item.route" @click="isMenuOpen = false" active-class="bg-slate-800 text-emerald-400"
                class="w-full text-right block p-2 rounded transition-colors duration-200 font-medium text-slate-400 hover:bg-slate-900/50 hover:text-white">
                {{ item.name }}
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
    <div class="flex flex-col h-full overflow-y-auto">

      <header class="bg-slate-950 shadow p-4 flex justify-between items-center sticky top-0 z-30">
        <div class="relative">

          <button @click="toggleModal"
            class="relative p-2 text-slate-600 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>

            <span v-if="hasUnread" class="absolute top-1 right-1 flex h-2.5 w-2.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
          </button>

          <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-hidden">
            <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" @click="toggleModal"></div>

            <div class="fixed inset-y-0 left-0 flex max-w-full">
              <div
                class="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full text-right border-r border-slate-100"
                dir="rtl">

                <div v-if="selectedNotification" class="flex flex-col h-full">
                  <div class="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div class="flex items-center gap-2">
                      <button @click="goBackToList"
                        class="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5"
                          stroke="currentColor" class="w-4 h-4">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M13.5 4.5l6.75 6.75m0 0l-6.75 6.75m6.75-6.75H4.5" />
                        </svg>
                        رجوع للقائمة
                      </button>
                    </div>
                    <button @click="toggleModal"
                      class="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                      <svg xmlns="http://www.w3.org/2000/xl" fill="none" viewBox="0 0 24 24" stroke-width="2"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div class="p-6 space-y-4 flex-1 overflow-y-auto bg-slate-50/30">
                    <div class="space-y-1">
                      <span class="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">{{
                        selectedNotification.time }}</span>
                      <h3 class="text-base font-bold text-slate-900 pt-2 leading-snug">{{ selectedNotification.text }}
                      </h3>
                    </div>
                    <div
                      class="p-4 bg-white rounded-xl border border-slate-100 text-sm text-slate-600 leading-relaxed shadow-sm">
                      {{ selectedNotification.body || 'لا توجد تفاصيل إضافية.' }}
                    </div>
                  </div>
                </div>

                <div v-else class="flex flex-col h-full">
                  <div class="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div class="flex items-center gap-2">
                      <button @click="toggleModal"
                        class="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                          stroke="currentColor" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <h4 class="text-base font-bold text-slate-800">مركز الإشعارات</h4>
                    </div>
                    <button @click="markAllAsRead"
                      class="text-xs text-blue-600 hover:text-blue-800 transition-colors font-semibold">
                      تعيين الكل كمقروء
                    </button>
                  </div>

                  <div class="flex border-b border-slate-100 p-3 gap-1 bg-white">
                    <button v-for="filter in (['الكل', 'غير مقروء', 'مقروء'] as FilterType[])" :key="filter"
                      @click="currentFilter = filter"
                      :class="currentFilter === filter ? 'bg-slate-900 text-white shadow-md font-semibold' : 'text-slate-500 hover:bg-slate-50'"
                      class="flex-1 py-2 text-center rounded-lg text-xs font-medium transition-all duration-200">
                      {{ filter }}
                    </button>
                  </div>

                  <div class="flex-1 overflow-y-auto divide-y divide-slate-100 bg-white">
                    <div v-for="notif in filteredNotifications" :key="notif.id" @click="viewNotification(notif)"
                      :class="!notif.isRead ? 'bg-blue-50/40 hover:bg-blue-50/70' : 'bg-white hover:bg-slate-50'"
                      class="p-4 text-right cursor-pointer transition-colors flex gap-4 items-start justify-between">
                      <div class="space-y-1 flex-1">
                        <p :class="!notif.isRead ? 'font-bold text-slate-900' : 'text-slate-600'"
                          class="text-sm leading-relaxed">
                          {{ notif.text }}
                        </p>
                        <div class="flex items-center gap-2 pt-1">
                          <span class="text-xs text-slate-400">{{ notif.time }}</span>
                          <span class="text-[10px] text-blue-500 font-medium">اضغط للتفاصيل ←</span>
                        </div>
                      </div>
                      <span :class="!notif.isRead ? 'bg-blue-500' : 'bg-slate-200'"
                        class="w-2 h-2 rounded-full mt-2 flex-shrink-0"></span>
                    </div>

                    <div v-if="filteredNotifications.length === 0"
                      class="p-12 text-center text-sm text-slate-400 space-y-2">
                      <p>لا توجد إشعارات حالية هنا</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <button @click="isMenuOpen = true" class="lg:hidden p-2 rounded hover:bg-slate-100 text-slate-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <h2 class="text-lg font-semibold text-slate-100">لوحة إدارة البيانات</h2>
      </header>
      <main class="p-6 flex-1">
        <RouterView />
      </main>

    </div>
  </div>
</template>
