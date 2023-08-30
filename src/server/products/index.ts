import { featchApi } from '../api'
import { ProductInterface } from '@/types'

export class Product {
  static async GetAll() {
    const reponse: ProductInterface[] = await featchApi('/api/products', {
      method: 'GET',
      next: { revalidate: 3600 }
    })
    return reponse
  }
  static async GetById({ idProduct }: { idProduct: string }) {
    const reponse: ProductInterface = await featchApi(`/api/products/?id=${idProduct}`, {
      method: 'GET',
      next: { revalidate: 3600 }
    })

    return reponse
  }
  static async Search(search: string) {
    const reponse: ProductInterface[] = await featchApi(`/api/products/?search=${search}`, {
      method: 'GET',
      next: { revalidate: 3600 }
    })

    return reponse
  }
}
