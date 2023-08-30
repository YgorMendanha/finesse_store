import { Metadata } from 'next'
import { headers } from 'next/headers'
import UAParser from 'ua-parser-js'
import { ProductsSection } from '@/components/home'
import { BannerHome } from '@/components/home/banner'
import { BannerCategories } from '@/components/home/bannerCategories'
import { Product } from '@/server/products'
import ShuffleProducts from '@/utils/functions/ShuffleProducts'
import { getDictionary } from '@/utils/functions/getDictionary'

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

export const metadata: Metadata = {
  title: 'Home'
}
export const revalidate = 3600
export default async function Home({ params: { lang } }: { params: { lang: 'pt' | 'en' } }) {
  const products = await Product.GetAll()
  const dict = getDictionary(lang)
  const promotionProduct = ShuffleProducts(products)

  const { deviceType } = getDeviceType()

  return (
    <>
      <BannerHome />
      <ProductsSection
        title={dict.popularProducts}
        products={promotionProduct}
        deviceType={deviceType}
      />
      <BannerCategories lang={lang} />
      <ProductsSection title={dict.ourProducts} products={products} deviceType={deviceType} />
    </>
  )
}
