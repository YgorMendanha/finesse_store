import HomePage from '@/components/views/home'
import ShuffleProducts from '@/utils/functions/ShuffleProducts'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getProducts() {
  const data = await prisma.product.findMany()
  return data
}

export default async function Home() {
  const product = await getProducts()

  console.log(product)

  // const promotionProduct = ShuffleProducts(product)

  return <HomePage data={product} promotionProduct={product} />
}
