'use client'

import { ProductInterface } from '@/types/products'
import { useState, useMemo } from 'react'
import { Splide, SplideSlide, type Options } from '@splidejs/react-splide'
import { CardProduct } from '@/components/partials/cardProduct'
import { useWindowSize } from '@/hooks/useWindowSize'

export const ProductsSection = ({ products }: { products: ProductInterface[] }) => {
  const { width } = useWindowSize()
  const [option, setOption] = useState<Options>({
    perPage: 4,
    gap: '1rem'
  })

  useMemo(() => {
    if (!width) return
    switch (true) {
      case width < 375:
        {
          setOption({
            perPage: 1,
            gap: '1rem'
          })
        }

        return
      case width < 640:
        {
          setOption({
            perPage: 2,
            gap: '1rem'
          })
        }

        return

      case width < 1280:
        {
          setOption({
            perPage: 3,
            gap: '1rem'
          })
        }

        return

      default:
        {
          setOption({
            perPage: 4,
            gap: '1rem'
          })
        }
        return
    }
  }, [width])

  return (
    <div className="w-full mb-10 flex flex-col container">
      <h2 className="my-7 mx-auto text-2xl md:text-4xl">Produtos Populares</h2>
      <Splide options={option} aria-label="My Favorite Images">
        {products.map((product) => {
          return (
            <SplideSlide key={product.id}>
              <CardProduct product={product} />
            </SplideSlide>
          )
        })}
      </Splide>
    </div>
  )
}
