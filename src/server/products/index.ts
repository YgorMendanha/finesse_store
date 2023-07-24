import { ProductInterface } from '@/types/products'
import { featchApi } from '../api'

export class Product {
  static async Get() {
    const reponse: ProductInterface[] = await featchApi('/api/product', {
      method: 'GET'
    })

    return reponse
  }
}
