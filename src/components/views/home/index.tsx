import { ProductInterface } from '@/types/products'
import { Banner, BestProducts } from './components'

export default async function HomePage({ data }: { data: ProductInterface[] }) {
  return (
    <>
      <Banner />
      <BestProducts products={data} />
    </>
  )
}
