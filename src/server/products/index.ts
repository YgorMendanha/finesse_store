import { featchApi } from '../api'
import { ProductInterface } from '@/types/products'

export class Product {
  static async Get() {
    const reponse: ProductInterface[] = await featchApi('/api/product', {
      method: 'GET'
    })

    return reponse
  }
}
