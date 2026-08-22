import type { IProduct } from '@/types/product'

export const useProducts = () => {
  const products = useState<IProduct[]>('products', () => [])

  //  State الخاصة بالديالوج والمنتج المحدد
  const isDeleteDialogOpen = ref(false)
  const productToDeleteId = ref<number | null>(null)

  //  دالة طلب الحذف (تفتح الديالوج وتحدد الـ ID)
  const confirmDelete = (id: number) => {
    productToDeleteId.value = id
    isDeleteDialogOpen.value = true
  }

  //  دالة الحذف الفعلية (تنفذ وتغلق)
  const executeDelete = () => {
    if (productToDeleteId.value !== null) {
      products.value = products.value.filter(p => p.id !== productToDeleteId.value)
      closeDeleteDialog()
    }
  }

  //  دالة إغلاق الديالوج وتصفير الـ ID
  const closeDeleteDialog = () => {
    isDeleteDialogOpen.value = false
    productToDeleteId.value = null
  }

  // دالة التعامل مع رفع الصور
  const handleImageUpload = (event: Event, targetForm: { image?: string }) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        targetForm.image = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  return {
    products,
    isDeleteDialogOpen,
    confirmDelete,
    executeDelete,
    closeDeleteDialog,
    handleImageUpload
  }
}
