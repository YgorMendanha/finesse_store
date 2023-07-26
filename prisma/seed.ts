import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const ProductsDataBase = [
  {
    id: 1,
    name: 'Camisa Masculina Azul',
    categorty: 'camisas',
    color: 'azul',
    price: 25.9,
    ratings: 3.5,
    variants: [2],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 5,
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=product-1-1.jpg`]
  },
  {
    id: 2,
    name: 'Camisa Masculina Verde',
    categorty: 'camisas',
    color: 'verde',
    price: 25.9,
    ratings: 4,
    variants: [1],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 7,
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=product-1-2.jpg`]
  },
  {
    id: 3,
    name: 'Camisa Masculina Azul',
    categorty: 'camisas',
    color: 'azul',
    price: 30,
    ratings: 3.5,
    variants: [4],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 7,
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=product-2-1.jpg`]
  },
  {
    id: 4,
    name: 'Camisa Masculina Vermelha',
    categorty: 'camisas',
    color: 'vermelho',
    price: 33,
    ratings: 4,
    variants: [3],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 3,
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=product-2-2.jpg`]
  },
  {
    id: 5,
    name: 'Relógio Preto',
    categorty: 'relógio',
    color: 'preto',
    price: 90,
    ratings: 8,
    variants: [],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 4,
    images: [
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=product-3-1.jpg`,
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=product-3-2.jpg`
    ]
  },
  {
    id: 6,
    name: 'Relógio Marron',
    categorty: 'relógio',
    color: 'marron',
    price: 85,
    ratings: 6,
    variants: [],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 5,
    images: [
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=product-4-1.jpg`,
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=product-4-2.jpg`
    ]
  },
  {
    id: 7,
    name: 'Sapato Marron',
    categorty: 'sapato',
    color: 'marron',
    price: 70,
    ratings: 7,
    variants: [],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 3,
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=product-5-1.jpg`]
  },
  {
    id: 8,
    name: 'Sapato Marron',
    categorty: 'sapato',
    color: 'marron',
    price: 65,
    ratings: 6,
    variants: [],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 9,
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=product-6-1.jpg`]
  },
  {
    id: 9,
    name: 'Sapato Azul',
    categorty: 'sapato',
    color: 'azul',
    price: 75,
    ratings: 8,
    variants: [],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 4,
    images: [
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=product-7-1.jpg`,
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=product-7-2.jpg`
    ]
  },
  {
    id: 10,
    name: 'Bolsa Azul',
    categorty: 'bolsa',
    color: 'azul',
    price: 90,
    ratings: 8,
    variants: [],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 6,
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=product-8-1.jpg`]
  },
  {
    id: 11,
    name: 'Bolsa Marron',
    categorty: 'bolsa',
    color: 'marron',
    price: 80,
    ratings: 6,
    variants: [],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 8,
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=product-9-1.jpg`]
  },
  {
    id: 12,
    name: 'Bolsa Azul',
    categorty: 'bolsa',
    color: 'azul',
    price: 99.9,
    ratings: 8,
    variants: [],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 9,
    images: [
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=product-10-1.jpg`,
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=product-10-2.jpg`
    ]
  }
]

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
