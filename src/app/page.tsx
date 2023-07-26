import HomePage from '@/components/views/home'
import { Product } from '@/server/products'
import ShuffleProducts from '@/utils/functions/ShuffleProducts'

async function getProducts() {
  try {
    const data: any = []

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

export default async function Home() {
  const product = await getProducts()

  const promotionProduct = ShuffleProducts(product)

  return <HomePage data={product} promotionProduct={promotionProduct} />
}
