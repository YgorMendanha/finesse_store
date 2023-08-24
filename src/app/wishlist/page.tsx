import { Suspense } from 'react'
import { ImSpinner10 } from 'react-icons/im'
import { Banner } from '@/components/partials'
import { ProductsGrid } from '@/components/partials/productsGrid'
import { Product } from '@/server/products'

export default async function Wishlist() {
  const products = await Product.GetAll()

  return (
    <>
      <Banner className="mb-3" title="Loja" />

      <section className="min-h-screen flex container">
        <Suspense fallback={<ImSpinner10 className="animate-spin text-2xl m-auto" />}>
          <ProductsGrid favoriteGrid products={products} />
        </Suspense>
      </section>
    </>
  )
}
