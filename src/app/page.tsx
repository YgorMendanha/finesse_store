import ShuffleProducts from '@/utils/functions/ShuffleProducts'
import { PrismaClient } from '@prisma/client'
import { Banner, ProductsSection } from '@/components/home/components'
import { BannerCategories } from '@/components/home/components/bannerCategories'
import { ProductsDataBase } from '@/utils/database/products'
import { headers } from 'next/headers'
import UAParser from 'ua-parser-js'

const prisma = new PrismaClient()

function getDeviceType() {
  let userAgent
  const userAgentTemp = headers().get('user-agent')
  if (userAgentTemp) {
    userAgent = userAgentTemp
  } else {
    userAgent = navigator.userAgent
  }

  const parser = new UAParser()
  parser.setUA(userAgent)
  const result = parser.getResult()
  const deviceType = (result.device && result.device.type) || 'desktop'

  return { deviceType }
}

async function getProducts() {
  const data = await prisma.product.findMany()
  return data
}

export default async function Home() {
  const products = process.env.NODE_ENV === 'development' ? ProductsDataBase : await getProducts()

  const promotionProduct = ShuffleProducts(products)

  const { deviceType } = getDeviceType()

  return (
    <>
      <Banner />
      <ProductsSection products={promotionProduct} deviceType={deviceType} />
      <BannerCategories />
      <ProductsSection products={products} deviceType={deviceType} />
    </>
  )
}
