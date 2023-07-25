import { ProductInterface } from '@/types/products'
import { Banner, PromotionProducts, ProductsSection } from './components'
import { BannerCategories } from './components/bannerCategories'

export default function HomePage({
  data,
  promotionProduct
}: {
  data: ProductInterface[]
  promotionProduct: ProductInterface[]
}) {
  return (
    <>
      <Banner />
      <PromotionProducts products={promotionProduct} />
      <BannerCategories />
      <ProductsSection products={data} />
    </>
  )
}
