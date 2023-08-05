import { Banner, FilterProductsComponent, InputComponent } from '@/components/partials'
import { ProductsGrid } from '@/components/partials/productsGrid'
import { ProductsDataBase } from '@/utils/database/products'
import { PrismaClient } from '@prisma/client'

import { FaFilter } from 'react-icons/fa'

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
      <section className="container w-full flex">
        
        <select className="ml-auto border-2 text-end appearance-none rounded outline-10 outline-indigo-500 cursor-pointer p-1">
          <option>Padrão</option>
          <option value="US">Maior para Menor Valor</option>
          <option value="CA">Menor para Maior Valor</option>
        </select>
      </section>

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
