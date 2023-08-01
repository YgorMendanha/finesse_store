import { ProductInterface } from '@/types/products'
import Image from 'next/image'
import { useState } from 'react'

export function CardProduct({ product }: { product: ProductInterface }) {
  const [clicked, setClicked] = useState<boolean>(false)

  return (
    <section className="flex flex-col p-2 items-center">
      <div className="flex w-[180px] md:w-[240px] lg:w-[300px] flex-col p-2 pb-10 items-start">
        <div className="w-full bg-[#f5f5f5] pt-[100%] relative">
          <Image
            src={product.images[0]}
            fill
            sizes="(max-width: 640px) 180px, (max-width: 768px) 240px, 300px"
            alt={`image-${product.id}-${product.name}`}
            className="border-4 rounded-md border-indigo-500"
          />
        </div>

        <div className="flex w-full flex-col my-2 ">
          <small>{product.categorty}</small>
          <h3 className="text-indigo-500 lg:text-xl truncate">
            <b>{product.name}</b>
          </h3>
          <p>
            <b>{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</b>
          </p>
          <button
            onClick={() => setClicked(!clicked)}
            className={`my-2 bg-gradient-to-b w-full text-indigo-500 font-semibold from-indigo-50 to-indigo-100 px-10 py-3 rounded-2xl shadow-indigo-400 shadow-md border-b-4 hover  border-indigo-200  transition-all duration-75  ${
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
