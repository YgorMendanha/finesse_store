'use client'

import { useState } from 'react'
import { ButtonComponent, InputQty } from '@/components/partials'
import { useCart } from '@/hooks/useCart'
import { ProductInterface } from '@/types'
import { formatPrice } from '@/utils/functions/foramatPrice'

export function DetailsProducts({ product }: { product: ProductInterface }) {
  const [qty, setQty] = useState<number>(1)
  const { addToCart } = useCart()

  return (
    <div className="w-auto my-5 lg:m-0 lg:w-6/12 lg:mx-5 h-full">
      <section className="w-full flex flex-col items-start justify-center">
        <h1 className="text-xl text-indigo-500 font-bold sm:text-3xl w-5/6 sm:w-auto truncate">
          {product.name}
        </h1>
        <p className="mb-5">
          {product.categorty} - #{product.id}
        </p>
        <div className="flex">
          <InputQty getValue={(e) => setQty(Number(e))} />

          <b className="ml-5 text-3xl flex flex-wrap text-indigo-500">
            <small className="mr-2">{qty > 1 && `${qty} x`}</small>
            {formatPrice({ currency: 'BRL', language: 'pt-BR', value: product.price * qty })}
          </b>
        </div>
        <ButtonComponent
          onClick={() => addToCart({ ...product, qty })}
          className="text-xl my-5 shadow-lg"
        >
          Adicionar ao Carrinho
        </ButtonComponent>
        <p>{product.description}</p>
      </section>
    </div>
  )
}
