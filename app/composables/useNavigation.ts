export const useNavigation = () => {
  const route = useRoute()

  const isStoreRoute = computed(() => route.path.startsWith('/web') || route.path.startsWith('/store'))

  const dashboardLinks = [
    { label: 'الرئيسية', icon: 'i-heroicons-home', to: '/' },
    { label: 'منتجات ', icon: 'i-heroicons-shopping-bag', to: '/dash/products' },
    { label: 'التصنيفات', icon: 'i-heroicons-rectangle-group', to: '/categories' },
    { label: 'العروض والخصومات', icon: 'i-heroicons-tag', to: '/offers' },
    { label: 'الطلبات', icon: 'i-heroicons-shopping-cart', to: '/orders' },
    { label: 'رسائل التواصل', icon: 'i-heroicons-chat-bubble-left-right', to: '/contact' }
  ]

  const webLinks = [
    { label: 'الرئيسية', icon: 'i-heroicons-building-storefront', to: '/store' },
    { label: 'منتجات ', icon: 'i-heroicons-squares-plus', to: '/web/products' },
    { label: 'التصنيفات', icon: 'i-heroicons-rectangle-group', to: '/store/categories' },
    { label: 'العروض والخصومات', icon: 'i-heroicons-tag', to: '/store/offers' },
    { label: 'الطلبات', icon: 'i-heroicons-clock', to: '/store/orders' },
    { label: 'سلة الشراء', icon: 'i-heroicons-shopping-bag', to: '/store/cart' },
    { label: 'التواصل', icon: 'i-heroicons-chat-bubble-left-right', to: '/store/contact' }
  ]

  const currentLinks = computed(() => isStoreRoute.value ? webLinks : dashboardLinks)

  return {
    isStoreRoute,
    dashboardLinks,
    webLinks,
    currentLinks
  }
}
