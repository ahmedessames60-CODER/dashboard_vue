<script setup lang="ts">
import { ref , computed, useId } from 'vue'
type FilterStatus = 'الكل' | 'نشط' | 'غير نشط';

interface User {
    id: number;
    name: string;
    joinDate: string;
    status: 'نشط' | 'غير نشط';
}
const filterOptions: FilterStatus[] = ['الكل', 'نشط', 'غير نشط']
const currentFilter = ref<FilterStatus>('الكل')

const latestUsers = ref<User[]>([
    { id: 3, name: 'محمود حسن', joinDate: '2026/05/29', status: 'غير نشط' },
    { id: 1, name: 'أحمد محمد', joinDate: '2026/06/01', status: 'نشط' },
    { id: 2, name: 'سارة علي', joinDate: '2026/05/30', status: 'نشط' },
])
const filteredusers = computed<User[]>(() => {
    if (currentFilter.value === 'الكل') {
        return latestUsers.value
    }
    return latestUsers.value.filter(UsersPages => UsersPages.status === currentFilter.value)
})
</script>

<template>
    <div class="bg-slate-950 p-6 rounded-xl border border-slate-100 shadow-sm">
       <div class="flex  justify-end w-fit  gap-1 bg-slate-100  p-1 rounded-lg  mb-4 gap-2 ">
            <button v-for="status in filterOptions" :key="status" @click="currentFilter = status"
                :class="currentFilter === status ? 'bg-white text-slate-800 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-800'"
                class="px-3 py-1 rounded-md text-xs transition-all duration-200">
                {{ status }}
            </button>
        </div>
        <h3 class="text-base font-bold text-slate-100 mb-4 text-right">آخر المستخدمين المسجلين</h3>
        <div class="overflow-x-auto">
            <table class="w-full text-right border-collapse" dir="rtl">
                <thead>
                    <tr class="border-b border-slate-100 text-slate-400 text-sm">
                        <th class="pb-3 font-medium text-right">اسم المستخدم</th>
                        <th class="pb-3 font-medium text-right">تاريخ التسجيل</th>
                        <th class="pb-3 font-medium text-right">الحالة</th>
                    </tr>
                </thead>
                <tbody class="text-sm text-white-600">
                    <tr v-for="user in filteredusers" :key="user.id"
                        class="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                        <td class="py-3 font-medium text-mist-50 text-right">{{ user.name }}</td>
                        <td class="py-3 text-right text-mist-50">{{ user.joinDate }}</td>
                        <td class="py-3 font-semibold text-slate-100">{{ user.status.toLocaleString() }}</td>

                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
