'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ButtonComponent, Notification } from '@/components/partials'
import { CheckboxComponent } from '@/components/partials/checkbox'
import { useCart } from '@/hooks/useCart'
import { getDictionary } from '@/utils/functions/getDictionary'

export function FormChekout() {
  const { cart } = useCart()

  const [payment, setPayment] = useState<'boleto' | 'cart'>('cart')
  const [loading, setLoading] = useState<boolean>(false)

  const [dict, setDict] = useState(
    {} as {
      value: string
      discount: string
      finalValue: string
      formOfPayment: string
      creditCard: string
      ticket: string
      finalize: string
      purchaseDone: string
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

  function fakePurchase() {
    setLoading(true)
    setTimeout(() => {
      Notification.user({ type: 'success', content: dict.purchaseDone })
      setLoading(false)
    }, 900)
  }

  return (
    <div className="w-1/3 flex flex-col px-10">
      <h3 className="mx-auto mb-5 border-b-2 border-black">
        <b>Checkout</b>
      </h3>
      <div className="w-full flex items-center justify-between">
        <p className="">
          <b>{dict.value}</b>
        </p>
        <p className="">
          <b>
            {lang === 'en'
              ? cart?.products
                  ?.reduce((acc, product) => acc + product.price, 0)
                  .toLocaleString('en-US', { style: 'currency', currency: 'USD' })
              : cart?.products
                  ?.reduce((acc, product) => acc + product.price, 0)
                  .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </b>
        </p>
      </div>
      <div className="w-full h-[1px] bg-black my-2" />
      <div className="w-full mt-5 flex items-center justify-between">
        <p className="">
          <b>{dict.discount}</b>
        </p>
        <p className="">
          <b>
            {lang === 'en'
              ? (0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
              : (0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </b>
        </p>
      </div>
      <div className="w-full h-[1px] bg-black my-2" />
      <div className="w-full mt-5 flex items-center justify-between">
        <p className="">
          <b>{dict.finalValue}</b>
        </p>
        <p className="">
          <b>
            {lang === 'en'
              ? cart?.products
                  ?.reduce((acc, product) => acc + product.price, 0)
                  .toLocaleString('en-US', { style: 'currency', currency: 'USD' })
              : cart?.products
                  ?.reduce((acc, product) => acc + product.price, 0)
                  .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </b>
        </p>
      </div>
      <div className="w-full h-[1px] bg-black my-2" />
      <div className="mt-5 ">
        <p className="mb-5">
          <b>{dict.formOfPayment}</b>
        </p>
        <CheckboxComponent
          className="my-2"
          label={dict.creditCard}
          checked={payment === 'cart'}
          onClick={(e) => (e ? setPayment('cart') : setPayment('boleto'))}
        />
        <CheckboxComponent
          className="my-2"
          label={dict.ticket}
          checked={payment === 'boleto'}
          onClick={(e) => (e ? setPayment('boleto') : setPayment('cart'))}
        />
      </div>
      <ButtonComponent
        disabled={cart?.products?.length === 0}
        onClick={() => fakePurchase()}
        loading={String(loading)}
        className="mt-5"
      >
        {dict.finalize}
      </ButtonComponent>
    </div>
  )
}
