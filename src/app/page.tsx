import ShuffleProducts from '@/utils/functions/ShuffleProducts'
import { PrismaClient } from '@prisma/client'
import { Banner, ProductsSection } from '@/components/home/components'
import { BannerCategories } from '@/components/home/components/bannerCategories'
import { ProductsDataBase } from '@/utils/database/products'

const prisma = new PrismaClient()

async function getProducts() {
  const data = await prisma.product.findMany()
  return data
}

export default async function Home() {
  const products = process.env.NODE_ENV === 'development' ? ProductsDataBase : await getProducts()

  const promotionProduct = ShuffleProducts(products)

  return (
    <>
      <Banner />
      <ProductsSection products={promotionProduct} />
      <BannerCategories />
      <ProductsSection products={products} />
    </>
  )
}
