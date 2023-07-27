import { ProductsDataBase } from '@/utils/database/Products'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const data = ProductsDataBase
  const response: Array<any> = []
  data.map(async (product) => {
    const result = await prisma.product.upsert({
      where: { id: product.id },
      update: {
        id: product.id,
        name: product.name,
        categorty: product.categorty,
        color: product.color,
        price: product.price,
        ratings: product.ratings,
        variants: product.variants,
        description: product.description,
        stock: product.stock,
        images: product.images
      },
      create: {
        id: product.id,
        name: product.name,
        categorty: product.categorty,
        color: product.color,
        price: product.price,
        ratings: product.ratings,
        variants: product.variants,
        description: product.description,
        stock: product.stock,
        images: product.images
      }
    })
    response.push(result)
  })
  console.log(response)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
