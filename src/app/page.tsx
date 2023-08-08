import { PrismaClient } from '@prisma/client'
import { headers } from 'next/headers'
import UAParser from 'ua-parser-js'
import { ProductsSection } from '@/components/home'
import { BannerHome } from '@/components/home/banner'
import { BannerCategories } from '@/components/home/bannerCategories'
import { Product } from '@/server/products'
import { ProductsDataBase } from '@/utils/database/products'
import ShuffleProducts from '@/utils/functions/ShuffleProducts'

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

export default async function Home() {
  const products = await Product.GetAll()

  const promotionProduct = ShuffleProducts(products)

  const { deviceType } = getDeviceType()

  return (
    <>
      <BannerHome />
      <ProductsSection products={promotionProduct} deviceType={deviceType} />
      <BannerCategories />
      <ProductsSection products={products} deviceType={deviceType} />
    </>
  )
}
