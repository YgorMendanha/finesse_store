import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const ProductsDataBase = [
  {
    id: 1,
    name: 'Bermuda Masculina Azul',
    categortyFather: 'masculino',
    categortyChild: 'bermuda',
    color: 'azul',
    price: 25,
    ratings: 3.5,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 7,
    images: `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=bermuda.png`
  },
  {
    id: 2,
    name: 'Bermuda Masculina Branca',
    categortyFather: 'masculino',
    categortyChild: 'bermuda',
    color: 'branco',
    price: 30,
    ratings: 2,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 6,
    images: `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=bermuda2.png`
  },
  {
    id: 3,
    name: 'Bolsa Feminina Preta',
    categortyFather: 'feminina',
    categortyChild: 'bolsa',
    color: 'preto',
    price: 40,
    ratings: 6,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 0,
    images: `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=bolsa1.png`
  },
  {
    id: 4,
    name: 'Bolsa Feminina Azul',
    categortyFather: 'feminina',
    categortyChild: 'bolsa',
    color: 'azul',
    price: 40,
    ratings: 3,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 3,
    images: `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=bolsa2.png`
  },
  {
    id: 5,
    name: 'Calça Feminina Preta',
    categortyFather: 'feminina',
    categortyChild: 'calca',
    color: 'preto',
    price: 60,
    ratings: 5,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 7,
    images: `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=calcaF1.png`
  },
  {
    id: 6,
    name: 'Calça Feminina Vermelha',
    categortyFather: 'feminina',
    categortyChild: 'calca',
    color: 'vermelho',
    price: 90,
    ratings: 8,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 0,
    images: `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=calcaF2.png`
  },
  {
    id: 7,
    name: 'Calça Masculina Marron',
    categortyFather: 'masculino',
    categortyChild: 'calca',
    color: 'marron',
    price: 60,
    ratings: 4,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 3,
    images: `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=calcaM1.png`
  },
  {
    id: 8,
    name: 'Calça Masculina Cinza',
    categortyFather: 'masculino',
    categortyChild: 'calca',
    color: 'cinza',
    price: 80,
    ratings: 5,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 11,
    images: `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=calcaM2.png`
  },
  {
    id: 9,
    name: 'Calça Masculina Cinza',
    categortyFather: 'masculino',
    categortyChild: 'calca',
    color: 'cinza',
    price: 80,
    ratings: 5,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 5,
    images: `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=calcaM2.png`
  },
  {
    id: 10,
    name: 'Camisa Masculina Laranja',
    categortyFather: 'masculino',
    categortyChild: 'calca',
    color: 'laranja',
    price: 30,
    ratings: 7,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 10,
    images: `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=camisa1.png`
  },
  {
    id: 11,
    name: 'Camisa Masculina Laranja',
    categortyFather: 'masculino',
    categortyChild: 'camisa',
    color: 'laranja',
    price: 30,
    ratings: 7,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 10,
    images: `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=camisa1.png`
  },
  {
    id: 12,
    name: 'Camisa Feminina Florida',
    categortyFather: 'feminina',
    categortyChild: 'camisa',
    color: 'azul',
    price: 35,
    ratings: 4,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 14,
    images: `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=camisaF1.png`
  },
  {
    id: 13,
    name: 'Camisa Feminina Social',
    categortyFather: 'feminina',
    categortyChild: 'camisa',
    color: 'azul',
    price: 20,
    ratings: 9,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 5,
    images: `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=camisaF2.png`
  },
  {
    id: 14,
    name: 'Camisa Feminina Amarela',
    categortyFather: 'feminina',
    categortyChild: 'camisa',
    color: 'amarelo',
    price: 40,
    ratings: 8,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 3,
    images: `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=camisaF3.png`
  },
  {
    id: 15,
    name: 'Camisa Masculina Preta',
    categortyFather: 'masculino',
    categortyChild: 'camisa',
    color: 'preto',
    price: 43,
    ratings: 8,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 8,
    images: `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=camisaM1.png`
  },
  {
    id: 16,
    name: 'Relogio Masculino Marron',
    categortyFather: 'masculino',
    categortyChild: 'relogio',
    color: 'marron',
    price: 100,
    ratings: 9,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 4,
    images: `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=relogio1.png`
  },
  {
    id: 17,
    name: 'Relogio Masculino Prata',
    categortyFather: 'masculino',
    categortyChild: 'relogio',
    color: 'cinza',
    price: 120,
    ratings: 8,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 5,
    images: `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=relogio2.png`
  },
  {
    id: 18,
    name: 'Sapato Feminino Preto',
    categortyFather: 'feminio',
    categortyChild: 'sapato',
    color: 'preto',
    price: 80,
    ratings: 4,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 20,
    images: `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=sapatoF1.png`
  },
  {
    id: 19,
    name: 'Sapato Masculino Cinza',
    categortyFather: 'masculino',
    categortyChild: 'sapato',
    color: 'cinza',
    price: 90,
    ratings: 7,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 14,
    images: `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=sapatoM1.png`
  },
  {
    id: 20,
    name: 'Sapato Masculino Azul',
    categortyFather: 'masculino',
    categortyChild: 'sapato',
    color: 'azul',
    price: 120,
    ratings: 5,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 14,
    images: `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=sapatoM2.png`
  },
  {
    id: 21,
    name: 'Vestido Feminino Preto',
    categortyFather: 'feminino',
    categortyChild: 'vestido',
    color: 'preto',
    price: 120,
    ratings: 6,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 13,
    images: `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=vestido1.png`
  },
  {
    id: 22,
    name: 'Vestido Feminino Florido',
    categortyFather: 'feminino',
    categortyChild: 'vestido',
    color: 'branco',
    price: 150,
    ratings: 9,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis risus vel nisl maximus ultrices. Nulla facilisi. In nunc est, volutpat quis congue vitae, volutpat sit amet ipsum. Nulla id nibh pretium, tempor risus tincidunt, tincidunt diam. Etiam at elementum sapien, elementum cursus urna. Aenean tempus a magna eu eleifend. Nunc placerat libero vestibulum enim commodo rhoncus. Vestibulum mollis sem sed aliquet volutpat. Quisque aliquet urna et tempor ornare. Fusce tincidunt vitae nisi vitae vehicula. Fusce sem ipsum, posuere et ullamcorper eget, dictum ut quam. Pellentesque vel turpis orci.',
    stock: 7,
    images: `${process.env.NEXT_PUBLIC_SITE_URL}/api/assets?image=vestido2.png`
  }
]

async function main() {
  const data = ProductsDataBase
  const response: Array<any> = []
  data.map(async (product) => {
    const result = await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: {
        name: product.name,
        description: product.description,
        price: product.price,
        ratings: product.ratings,
        stock: product.stock,
        categortyChild: product.categortyChild,
        categortyFather: product.categortyFather,
        imagens: product.images
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
