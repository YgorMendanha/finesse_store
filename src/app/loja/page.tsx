import { PrismaClient } from '@prisma/client'
import { Banner, FilterProductsComponent } from '@/components/partials'
import { ProductsGrid } from '@/components/partials/productsGrid'
import { Product } from '@/server/products'

export default async function Shop() {
  const products = await Product.GetAll()

  const categorys = products.map((product) => product.categorty)
  const categoryFormat = [...new Set(categorys)]

  const colors = products.map((product) => product.color)
  const colorsFormat = [...new Set(colors)]

  return (
    <>
      <Banner className="mb-3" title="Loja" />

      <section className="min-h-screen flex container">
        <FilterProductsComponent
          className="xl:block hidden"
          categorys={categoryFormat}
          colors={colorsFormat}
        />
        <ProductsGrid products={products} />
      </section>
    </>
  )
}
