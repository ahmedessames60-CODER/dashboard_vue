<script setup lang="ts">
import { ref, computed } from 'vue'
import UsersTable from './UsersTable.vue'
import InvoicesTable from './InvoicesTable.vue'
import { Line, Doughnut } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, ArcElement)

interface RawCardItem {
    id: number;
    title: string;
    currentValue: number;
    previousValue: number;
    route: string;
    hoverColor: string;
}

const rawCardsData = ref<RawCardItem[]>([
    {
        id: 1,
        title: 'رسائل التواصل',
        currentValue: 5,
        previousValue: 3,
        route: '/messages',
        hoverColor: 'hover:border-emerald-500'
    },
    {
        id: 2,
        title: 'المستخدمين',
        currentValue: 1245,
        previousValue: 1100,
        route: '/users',
        hoverColor: 'hover:border-blue-500'
    },
    {
        id: 3,
        title: 'الحسابات والفواتير',
        currentValue: 3,
        previousValue: 3,
        route: '/accounting',
        hoverColor: 'hover:border-rose-500'
    }
])

const dynamicCards = computed(() => {
    return rawCardsData.value.map(item => {
        const diff = item.currentValue - item.previousValue

        const percentCalc = item.previousValue > 0
            ? (diff / item.previousValue) * 100
            : 0

        let status: 'up' | 'down' | 'equal' = 'equal'
        if (diff > 0) status = 'up'
        if (diff < 0) status = 'down'

        let displayValue = `${item.currentValue.toLocaleString()}`
        if (item.id === 1) displayValue = `${item.currentValue} جديدة`
        if (item.id === 2) displayValue = `${item.currentValue.toLocaleString()} مستخدم`
        if (item.id === 3) displayValue = `${item.currentValue} معلقة`

        return {
            id: item.id,
            title: item.title,
            route: item.route,
            hoverColor: item.hoverColor,
            status: status,
            percentage: status !== 'equal' ? `${Math.abs(Math.round(percentCalc))}%` : '',
            displayValue: displayValue
        }
    })
})

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top' as const,
            labels: {
                font: {
                    family: 'Cairo, sans-serif',
                    size: 12
                }
            }
        }
    }
})

const lineChartData = ref({
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [
        {
            label: 'الأرباح',
            backgroundColor: '#10b981',
            borderColor: '#10b981',
            data: [40, 39, 50, 40, 60, 80],
            tension: 0.3
        },
        {
            label: 'الفواتير الصادرة',
            backgroundColor: '#3b82f6',
            borderColor: '#3b82f6',
            data: [20, 30, 45, 35, 45, 60],
            tension: 0.3
        }
    ]
})

const doughnutChartData = ref({
    labels: ['نشطين', 'غير نشطين', 'مشرفين'],
    datasets: [
        {
            backgroundColor: ['#10b981', '#f43f5e', '#64748b'],
            data: [70, 20, 10]
        }
    ]
})
</script>

<template>
    <div class="space-y-6 text-right" dir="rtl">

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <RouterLink v-for="card in dynamicCards" :key="card.id" :to="card.route"
                :class="['bg-slate-950 p-4 rounded-xl border border-slate-100 block transition-all shadow-sm', card.hoverColor]">
                <div class="flex justify-between items-center mb-2">
                    <p class="text-xs text-slate-500 font-medium">{{ card.title }}</p>
                    <div class="text-xs font-bold">
                        <span v-if="card.status === 'up'" class="text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">▲
                            {{ card.percentage }}</span>
                        <span v-if="card.status === 'down'" class="text-rose-600 bg-emerald-100 px-1.5 py-0.5 rounded">▼ {{
                            card.percentage }}</span>
                        <span v-if="card.status === 'equal'" class="text-slate-500 bg-emerald-100 px-1.5 py-0.5 rounded">●
                            0%</span>
                    </div>
                </div>
                <h3 class="text-xl font-bold text-slate-100">{{ card.displayValue }}</h3>
            </RouterLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-2 bg-slate-950 p-6 rounded-xl border border-slate-100 shadow-sm">
                <h3 class="text-base font-bold text-slate-100 mb-4 text-right">حركة الفواتير والأرباح (مدار الشهور)</h3>
                <div class="h-64">
                    <Line :data="lineChartData" :options="chartOptions" />
                </div>
            </div>
            <div class="bg-slate-950 p-6 rounded-xl border border-slate-100 shadow-sm">
                <h3 class="text-base font-bold text-slate-100 mb-4 text-right">نسب المستخدمين</h3>
                <div class="h-64 flex justify-center">
                    <Doughnut :data="doughnutChartData" :options="chartOptions" />
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UsersTable />
            <InvoicesTable />
        </div>

    </div>
</template>
