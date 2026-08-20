import type { IProduct, IProductFilters } from '~/types/product'

export const useProducts = () => {
  const isLoading = ref(false)

  const products = useState<IProduct[]>('products-list', () => [])

  const filters = reactive<IProductFilters>({
    search: '',
    category: ''
  })

  const filteredProducts = computed(() => {
    return products.value.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase())
      const matchesCategory = !filters.category || product.category === filters.category
      return matchesSearch && matchesCategory
    })
  })

  const addProduct = async (productData: Omit<IProduct, 'id' | 'createdAt'>) => {
    isLoading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 500))

      const today = new Date().toISOString().split('T')[0] ?? ''

      const newProduct: IProduct = {
        ...productData,
        id: Date.now(),
        createdAt: today
      }
      products.value.unshift(newProduct)
    } finally {
      isLoading.value = false
    }
  }

  const deleteProduct = async (id: number) => {
    isLoading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      products.value = products.value.filter(p => p.id !== id)
    } finally {
      isLoading.value = false
    }
  }

  return {
    products,
    filteredProducts,
    filters,
    isLoading,
    addProduct,
    deleteProduct
  }
}
