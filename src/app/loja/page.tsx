import { PrismaClient } from '@prisma/client'
import { Banner, FilterProductsComponent, InputComponent } from '@/components/partials'
import { ProductsGrid } from '@/components/partials/productsGrid'
import { ProductsDataBase } from '@/utils/database/products'

const prisma = new PrismaClient()

async function getProducts() {
  const data = await prisma.product.findMany()
  return data
}

export default async function Shop() {
  const products = process.env.NODE_ENV === 'development' ? ProductsDataBase : await getProducts()

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
