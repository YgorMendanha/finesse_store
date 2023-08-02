'use client'

import { ProductInterface } from '@/types/products'
import Carousel from 'react-multi-carousel'
import { CardProduct } from '@/components/partials/cardProduct'

export const ProductsSection = ({
  products,
  deviceType
}: {
  products: ProductInterface[]
  deviceType: string
}) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }

  return (
    <div className="w-full mb-10 flex flex-col container">
      <h2 className="my-7 mx-auto text-2xl md:text-4xl">Produtos Populares</h2>
      {products.length > 0 && (
        <Carousel className="w-full" ssr deviceType={deviceType} responsive={responsive}>
          {products.map((product) => {
            return <CardProduct product={product} key={product.id} />
          })}
        </Carousel>
      )}
    </div>
  )
}
