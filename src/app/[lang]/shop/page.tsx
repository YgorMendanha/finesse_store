import { Metadata } from 'next'
import { Suspense } from 'react'
import { ImSpinner10 } from 'react-icons/im'
import { Banner, FilterProductsComponent } from '@/components/partials'
import { ProductsGrid } from '@/components/partials/productsGrid'
import { Product } from '@/server/products'

export const metadata: Metadata = {
  title: 'Loja'
}

export default async function Shop({ params: { lang } }: { params: { lang: 'pt' | 'en' } }) {
  const products = await Product.GetAll()

  const categorys = products.map((product) =>
    lang === 'en' ? product.categortyEN : product.categortyPT
  )
  const categoryFormat = [...new Set(categorys)]

  const colors = products.map((product) => (lang === 'en' ? product.colorEN : product.colorPT))
  const colorsFormat = [...new Set(colors)]

  return (
    <>
      <Banner className="mb-3" title={lang === 'en' ? 'Shop' : 'Loja'} />

      <section className="min-h-screen flex container">
        <Suspense fallback={<ImSpinner10 className="animate-spin text-2xl m-auto" />}>
          <FilterProductsComponent
            className="xl:block hidden"
            categorys={categoryFormat}
            colors={colorsFormat}
          />
          <ProductsGrid products={products} />
        </Suspense>
      </section>
    </>
  )
}
