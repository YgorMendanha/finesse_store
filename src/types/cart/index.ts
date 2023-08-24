import { ProductInterface } from '../products'

export interface CartInterface {
  id: number
  products: ProductInterface[]
  userId: number | null
}
