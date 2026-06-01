<script setup lang="ts">
import { ref, computed } from 'vue'

type FilterStatus = 'الكل' | 'مدفوعة' | 'غير مدفوعة';

interface Invoice {
    id: number;
    number: string;
    client: string;
    amount: number;
    status: 'مدفوعة' | 'غير مدفوعة';
}

const filterOptions: FilterStatus[] = ['الكل', 'مدفوعة', 'غير مدفوعة']
const currentFilter = ref<FilterStatus>('الكل')

const invoices = ref<Invoice[]>([
    { id: 1, number: 'INV-1001', client: 'شركة الأمل الدولية', amount: 1500, status: 'مدفوعة' },
    { id: 2, number: 'INV-1002', client: 'مؤسسة النجاح التجارية', amount: 2800, status: 'غير مدفوعة' },
    { id: 3, number: 'INV-1003', client: 'عيادة النور الطبية', amount: 450, status: 'مدفوعة' },
    { id: 4, number: 'INV-1004', client: 'مكتبة البيان', amount: 920, status: 'غير مدفوعة' }
])

const filteredInvoices = computed<Invoice[]>(() => {
    if (currentFilter.value === 'الكل') {
        return invoices.value
    }
    return invoices.value.filter(invoice => invoice.status === currentFilter.value)
})
</script>

<template>
    <div class="bg-slate-950 p-6 rounded-xl border border-slate-100 shadow-sm">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2" dir="rtl">
            <h3 class="text-base font-bold text-slate-100 text-right">آخر الفواتير الصادرة</h3>

            <div class="flex gap-1 bg-slate-100   p-1 rounded-lg">
                <button v-for="status in filterOptions" :key="status" @click="currentFilter = status"
                    :class="currentFilter === status ? 'bg-white text-slate-800 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-800'"
                    class="px-3 py-1 rounded-md text-xs transition-all duration-200">
                    {{ status }}
                </button>
            </div>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-right border-collapse" dir="rtl">
                <thead>
                    <tr class="border-b border-slate-100 text-slate-100 text-sm">
                        <th class="pb-3 font-medium text-right">رقم الفاتورة</th>
                        <th class="pb-3 font-medium text-right">العميل</th>
                        <th class="pb-3 font-medium text-right">المبلغ</th>
                        <th class="pb-3 font-medium text-text-slate-100right">حالة الدفع</th>
                    </tr>
                </thead>
                <tbody class="text-sm text-slate-600">
                    <tr v-for="invoice in filteredInvoices" :key="invoice.id"
                        class="border-b border-slate-50 last:border-0 hover:bg-slate-100/50 transition-colors">
                        <td class="py-3 font-mono text-slate-100">#{{ invoice.number }}</td>
                        <td class="py-3 text-slate-100">{{ invoice.client }}</td>
                        <td class="py-3 font-semibold text-slate-100">{{ invoice.amount.toLocaleString() }}ج.م</td>
                        <td class="py-3 text-slate-100">
                            <span
                                :class="invoice.status === 'مدفوعة' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'"
                                class="px-2 py-1 rounded-md text-xs font-medium inline-block">
                                {{ invoice.status }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
