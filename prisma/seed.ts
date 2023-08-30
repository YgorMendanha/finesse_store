import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const ProductsDataBase = [
  {
    id: 1,
    name: {
      pt: 'Camisa Masculina Azul',
      en: "Blue Men's Shirt"
    },
    categorty: {
      pt: 'camisas',
      en: 'shirts'
    },
    color: { pt: 'azul', en: 'blue' },
    price: 25.9,
    ratings: 3.5,
    variants: [2],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 5,
    images: [
      `https://finess-store-bucket.s3.sa-east-1.amazonaws.com/images/products/product-1-1.jpg`
    ]
  },
  {
    id: 2,
    name: { pt: 'Camisa Masculina Verde', en: "Green Men's Shirt" },
    categorty: { pt: 'camisas', en: 'shirts' },
    color: { pt: 'verde', en: 'green' },
    price: 25.9,
    ratings: 4,
    variants: [1],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 7,
    images: [
      `https://finess-store-bucket.s3.sa-east-1.amazonaws.com/images/products/product-1-2.jpg`
    ]
  },
  {
    id: 3,
    name: { pt: 'Camisa Masculina Azul', en: "Men's Blue Shirt" },
    categorty: { pt: 'camisas', en: 'shirts' },
    color: { pt: 'azul', en: 'blue' },
    price: 30,
    ratings: 3.5,
    variants: [4],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 7,
    images: [
      `https://finess-store-bucket.s3.sa-east-1.amazonaws.com/images/products/product-2-1.jpg`
    ]
  },
  {
    id: 4,
    name: { pt: 'Camisa Masculina Vermelha', en: "Red Men's Shirt" },
    categorty: { pt: 'camisas', en: 'shirts' },
    color: { pt: 'vermelho', en: 'red' },
    price: 33,
    ratings: 4,
    variants: [3],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 3,
    images: [
      `https://finess-store-bucket.s3.sa-east-1.amazonaws.com/images/products/product-2-2.jpg`
    ]
  },
  {
    id: 5,
    name: { pt: 'Relógio Preto', en: 'Black Watch' },
    categorty: { pt: 'relógio', en: 'clock' },
    color: { pt: 'preto', en: 'black' },
    price: 90,
    ratings: 8,
    variants: [],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 4,
    images: [
      `https://finess-store-bucket.s3.sa-east-1.amazonaws.com/images/products/product-3-1.jpg`,
      `https://finess-store-bucket.s3.sa-east-1.amazonaws.com/images/products/product-3-2.jpg`
    ]
  },
  {
    id: 6,
    name: { pt: 'Relógio Marrom', en: 'Brown Watch' },
    categorty: { pt: 'relógio', en: 'clock' },
    color: { pt: 'marrom', en: 'brown' },
    price: 85,
    ratings: 6,
    variants: [],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 5,
    images: [
      `https://finess-store-bucket.s3.sa-east-1.amazonaws.com/images/products/product-4-1.jpg`,
      `https://finess-store-bucket.s3.sa-east-1.amazonaws.com/images/products/product-4-2.jpg`
    ]
  },
  {
    id: 7,
    name: { pt: 'Sapato Marrom', en: 'Brown Shoe' },
    categorty: { pt: 'sapato', en: 'shoe' },
    color: { pt: 'marrom', en: 'brown' },
    price: 70,
    ratings: 7,
    variants: [],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 3,
    images: [
      `https://finess-store-bucket.s3.sa-east-1.amazonaws.com/images/products/product-5-1.jpg`
    ]
  },
  {
    id: 8,
    name: { pt: 'Sapato Marrom', en: 'Brown Shoe' },
    categorty: { pt: 'sapato', en: 'shoe' },
    color: { pt: 'marrom', en: 'brown' },
    price: 65,
    ratings: 6,
    variants: [],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 9,
    images: [
      `https://finess-store-bucket.s3.sa-east-1.amazonaws.com/images/products/product-6-1.jpg`
    ]
  },
  {
    id: 9,
    name: { pt: 'Sapato Azul', en: 'Blue Shoe' },
    categorty: { pt: 'sapato', en: 'shoe' },
    color: { pt: 'azul', en: 'blue' },
    price: 75,
    ratings: 8,
    variants: [],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 4,
    images: [
      `https://finess-store-bucket.s3.sa-east-1.amazonaws.com/images/products/product-7-1.jpg`,
      `https://finess-store-bucket.s3.sa-east-1.amazonaws.com/images/products/product-7-2.jpg`
    ]
  },
  {
    id: 10,
    name: { pt: 'Bolsa Azul', en: 'Blue Bag' },
    categorty: { pt: 'bolsa', en: 'handbag' },
    color: { pt: 'azul', en: 'blue' },
    price: 90,
    ratings: 8,
    variants: [],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 6,
    images: [
      `https://finess-store-bucket.s3.sa-east-1.amazonaws.com/images/products/product-8-1.jpg`
    ]
  },
  {
    id: 11,
    name: { pt: 'Bolsa Marrom', en: 'Brown Purse' },
    categorty: { pt: 'bolsa', en: 'bag' },
    color: { pt: 'marrom', en: 'brown ' },
    price: 80,
    ratings: 6,
    variants: [],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 8,
    images: [
      `https://finess-store-bucket.s3.sa-east-1.amazonaws.com/images/products/product-9-1.jpg`
    ]
  },
  {
    id: 12,
    name: { pt: 'Bolsa Azul', en: 'Blue Bag' },
    categorty: { pt: 'bolsa', en: 'bag' },
    color: { pt: 'azul', en: 'blue' },
    price: 99.9,
    ratings: 8,
    variants: [],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 9,
    images: [
      `https://finess-store-bucket.s3.sa-east-1.amazonaws.com/images/products/product-10-1.jpg`,
      `https://finess-store-bucket.s3.sa-east-1.amazonaws.com/images/products/product-10-2.jpg`
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
        namePT: product.name.pt,
        categortyPT: product.categorty.pt,
        colorPT: product.color.pt,
        nameEN: product.name.en,
        categortyEN: product.categorty.en,
        colorEN: product.color.en,
        price: product.price,
        ratings: product.ratings,
        variants: product.variants,
        description: product.description,
        stock: product.stock,
        images: product.images
      },
      create: {
        id: product.id,
        namePT: product.name.pt,
        categortyPT: product.categorty.pt,
        colorPT: product.color.pt,
        nameEN: product.name.en,
        categortyEN: product.categorty.en,
        colorEN: product.color.en,
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

  // console.log(response)
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
