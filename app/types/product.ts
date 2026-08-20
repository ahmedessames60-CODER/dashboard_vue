export interface IProduct {
  id: number
  name: string
  category: string
  price: number
  discountPrice?: number | null
  inStock: boolean
  createdAt: string
  image?: string
}

export interface IProductFilters {
  search: string
  category: string
}
