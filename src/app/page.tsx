import HomePage from '@/components/views/home'
import { Product } from '@/server/products'

async function getProducts() {
  try {
    const data = await Product.Get()

    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

export default async function Home() {
  const product = await getProducts()
  return <HomePage data={product} />
}
