'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { BsTrash } from 'react-icons/bs'
import { ButtonComponent, CustomLink, InputQty } from '@/components/partials'
import { useCart } from '@/hooks/useCart'
import { ProductInterface } from '@/types'

export function TableCheckout() {
  const { cart, updateCart } = useCart()
  const router = useRouter()

  async function changeQty(id: number, qty: number) {
    const newCart = Array.isArray(cart.products)
      ? cart.products.map((product) => {
          if (product.id === id) {
            return { ...product, qty }
          }
          return product
        })
      : []

    updateCart(cart.id, { products: newCart })
  }

  async function deleteProduct(id: number) {
    const newCart: ProductInterface[] = []
    cart.products.length > 0 &&
      cart.products.map((product) => {
        if (product.id !== id) {
          newCart.push(product)
        }
        return
      })

    updateCart(cart.id, { products: newCart })
  }

  return (
    <div className="w-2/3">
      {cart?.products?.length > 0 ? (
        <>
          <div className="flex">
            <div className="mx-3 w-28 min-w-[112px]"></div>
            <div className="mx-5 w-full grid grid-cols-4 items-center">
              <p>
                <b className="border-b-2 border-black">Nome</b>
              </p>
              <p>
                <b className="border-b-2 border-black">Valor Uni.</b>
              </p>
              <p>
                <b className="border-b-2 border-black">Valor Total</b>
              </p>
            </div>
          </div>
          {cart.products.map((product) => (
            <div key={product.id} className="flex m-5 ">
              <picture className="w-28 h-28 min-w-[112px] bg-[#f5f5f5] relative">
                <Image
                  src={product.images[0]}
                  fill
                  onClick={() => router.push(`/shop/${product.id}`)}
                  sizes="(max-width: 640px) 180px, (max-width: 768px) 240px, 300px"
                  alt={`image-${product.id}-${product.name}`}
                  className="border-4 rounded-md cursor-pointer border-indigo-500"
                />
              </picture>

              <div className="mx-5  w-full grid grid-cols-4 items-center">
                <p className="flex flex-col">
                  <b className="text-lg">{product.name}</b>
                  <small>{product.categorty}</small>
                </p>
                <p className="flex items-center">
                  <InputQty
                    value={product.qty}
                    getValue={(e) => changeQty(product.id, Number(e))}
                  />
                  <b className="ml-2">
                    {product.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </b>
                </p>

                <p className="">
                  <b>
                    {(product.price * (product.qty || 1)).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </b>
                </p>

                <button onClick={() => deleteProduct(product.id)} className="w-10 text-2xl">
                  <BsTrash />
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="w-full mt-40  flex flex-col">
          <h2 className="m-auto my-5 text-2xl">Você não possui Produtos no Carrinho </h2>
          <CustomLink href={'/shop'}>
            <ButtonComponent className="mx-auto w-[90%]">Visitar Loja</ButtonComponent>
          </CustomLink>
        </div>
      )}
    </div>
  )
}
