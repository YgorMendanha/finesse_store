import { ProductInterface } from '@/types/products'
import Image from 'next/image'
import { useState } from 'react'

export function CardProduct({ product }: { product: ProductInterface }) {
  const [clicked, setClicked] = useState<boolean>(false)

  console.log(product.images[0])

  return (
    <section className="flex flex-col p-2 items-center">
      <div className="flex w-[300px] flex-col p-2 pb-10 items-start">
        <Image src={product.images[0]} width={300} height={300} alt="Image 2" />
        <div className="flex w-full flex-col my-2 ">
          <small>{product.categortyChild}</small>
          <h3>
            <b>{product.name}</b>
          </h3>
          <p>{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
          <button
            onClick={() => setClicked(!clicked)}
            className={`my-2 bg-gradient-to-b w-max mx-auto text-indigo-500 font-semibold from-indigo-50 to-indigo-100 px-10 py-3 rounded-2xl shadow-indigo-400 shadow-md border-b-4 hover  border-indigo-200  transition-all duration-75  ${
              clicked ? 'shadow-sm' : ''
            } `}
          >
            Adicionar
          </button>
        </div>
      </div>
    </section>
  )
}
