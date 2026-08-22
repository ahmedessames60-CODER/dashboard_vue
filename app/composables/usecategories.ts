import type { ICategory } from '@/types/category'

export const useCategories = () => {
  const categories = useState<ICategory[]>('categories', () => [])

  //  State الخاصة بالديالوج والمنتج المحدد
  const isDeleteDialogOpen = ref(false)
  const CategoryToDeleteId = ref<number | null>(null)

  //  دالة طلب الحذف (تفتح الديالوج وتحدد الـ ID)
  const confirmDelete = (id: number) => {
    CategoryToDeleteId.value = id
    isDeleteDialogOpen.value = true
  }

  //  دالة الحذف الفعلية (تنفذ وتغلق)
  const executeDelete = () => {
    if (CategoryToDeleteId.value !== null) {
      categories.value = categories.value.filter(categories => categories.id !== CategoryToDeleteId.value)
      closeDeleteDialog()
    }
  }

  //  دالة إغلاق الديالوج وتصفير الـ ID
  const closeDeleteDialog = () => {
    isDeleteDialogOpen.value = false
    CategoryToDeleteId.value = null
  }

  return {
    categories,
    isDeleteDialogOpen,
    confirmDelete,
    executeDelete,
    closeDeleteDialog

  }
}
