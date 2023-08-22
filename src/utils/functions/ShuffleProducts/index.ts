import { ProductInterface } from '@/types'

export default function ShuffleProducts(products: ProductInterface[]) {
  const promotionProductTemp: ProductInterface[] = []

  do {
    const idx = Math.floor(Math.random() * products.length)
    const product = products[idx]

    const rept = promotionProductTemp.find((oldProduct) => oldProduct.id === product.id)
    if (!rept) {
      promotionProductTemp.push(product)
    }
  } while (promotionProductTemp.length < 7)

  return promotionProductTemp as ProductInterface[]
}
