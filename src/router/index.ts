import { createRouter, createWebHistory } from 'vue-router'
import DashboardHome from '../views/DashboardHome.vue'
import UsersPage from '../views/UsersPage.vue'
import ConectPage from '../views/ConectPage.vue'
import AccountingPage from '../views/AccountingPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: DashboardHome },
    { path: '/users', component: UsersPage },
    { path: '/conect', component: ConectPage },
    { path: '/accounting-page', component: AccountingPage },
  ],
})

export default router
