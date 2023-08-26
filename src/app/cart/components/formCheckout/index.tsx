'use client'

import { useState } from 'react'
import { ButtonComponent, Notification } from '@/components/partials'
import { CheckboxComponent } from '@/components/partials/checkbox'
import { useCart } from '@/hooks/useCart'

export function FormChekout() {
  const { cart } = useCart()

  const [payment, setPayment] = useState<'boleto' | 'cart'>('cart')
  const [loading, setLoading] = useState<boolean>(false)

  function fakePurchase() {
    setLoading(true)
    setTimeout(() => {
      Notification.user({ type: 'success', content: 'Compra Realizada :)' })
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
          <b>Valor</b>
        </p>
        <p className="">
          <b>
            {cart?.products
              ?.reduce((acc, product) => acc + product.price, 0)
              .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </b>
        </p>
      </div>
      <div className="w-full h-[1px] bg-black my-2" />
      <div className="w-full mt-5 flex items-center justify-between">
        <p className="">
          <b>Desconto</b>
        </p>
        <p className="">
          <b>{(0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</b>
        </p>
      </div>
      <div className="w-full h-[1px] bg-black my-2" />
      <div className="w-full mt-5 flex items-center justify-between">
        <p className="">
          <b>Valor Final</b>
        </p>
        <p className="">
          <b>
            {cart?.products
              ?.reduce((acc, product) => acc + product.price, 0)
              .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </b>
        </p>
      </div>
      <div className="w-full h-[1px] bg-black my-2" />
      <div className="mt-5 ">
        <p className="mb-5">
          <b>Forma de Pagamento</b>
        </p>
        <CheckboxComponent
          className="my-2"
          label="Cartão de Credito"
          checked={payment === 'cart'}
          onClick={(e) => (e ? setPayment('cart') : setPayment('boleto'))}
        />
        <CheckboxComponent
          className="my-2"
          label="Boleto"
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
        Finalizar
      </ButtonComponent>
    </div>
  )
}
