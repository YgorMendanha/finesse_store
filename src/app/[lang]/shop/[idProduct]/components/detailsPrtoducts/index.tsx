'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ButtonComponent, InputQty } from '@/components/partials'
import { useCart } from '@/hooks/useCart'
import { useLoading } from '@/hooks/useLoading'
import { ProductInterface } from '@/types'
import { formatPrice } from '@/utils/functions/foramatPrice'
import { getDictionary } from '@/utils/functions/getDictionary'

export function DetailsProducts({ product }: { product: ProductInterface }) {
  const [qty, setQty] = useState<number>(1)
  const [inCart, setInCart] = useState<boolean>(false)
  const { addToCart, cart } = useCart()
  const { cartLoading } = useLoading()

  const router = useRouter()

  useEffect(() => {
    if (cart.products) {
      cart.products.find((cartProduct) => {
        if (cartProduct.id === product.id) {
          setInCart(true)
          setQty(cartProduct.qty ?? 1)
        }
      })
    } else {
      setInCart(false)
    }
  }, [cart?.products])

  const [dict, setDict] = useState(
    {} as {
      addToCart: string
      viewCart: string
    }
  )

  const { lang }: { lang?: 'pt' | 'en' } = useParams()

  useEffect(() => {
    selectLang(lang)
  }, [lang])

  function selectLang(params?: 'pt' | 'en') {
    if (params) {
      const dict = getDictionary(params)
      setDict(dict)
    }
  }

  function goCart() {
    lang === 'en' ? router.push('/en/cart') : router.push('/cart')
  }

  return (
    <div className="w-auto my-5 lg:m-0 lg:w-6/12 lg:mx-5 h-full">
      <section className="w-full flex flex-col items-start justify-center">
        <h1 className="text-xl text-indigo-500 font-bold sm:text-3xl w-5/6 sm:w-auto truncate">
          {lang === 'en' ? product.nameEN : product.namePT}
        </h1>
        <p className="mb-5">
          {lang === 'en' ? product.categortyEN : product.categortyPT} - #{product.id}
        </p>
        <div className="flex">
          <InputQty disabled={inCart} value={qty} getValue={(e) => setQty(Number(e))} />

          <b className="ml-5 text-3xl flex flex-wrap text-indigo-500">
            <small className="mr-2">{qty > 1 && `${qty} x`}</small>
            {lang === 'en'
              ? formatPrice({ currency: 'USD', language: 'en-US', value: product.price * qty })
              : formatPrice({ currency: 'BRL', language: 'pt-BR', value: product.price * qty })}
          </b>
        </div>
        <ButtonComponent
          loading={String(cartLoading)}
          onClick={() => (inCart ? goCart() : addToCart({ ...product, qty }))}
          className="text-xl my-5 shadow-lg"
        >
          {inCart ? dict.viewCart : dict.addToCart}
        </ButtonComponent>
        <p>{product.description}</p>
      </section>
    </div>
  )
}
