'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { CustomLink } from '../CustomLink'
import { useFavoriteProducts } from '@/hooks/useUser'
import { ProductInterface } from '@/types/products'

export function CardProduct({
  product,
  className = ''
}: {
  product: ProductInterface
  className?: string
}) {
  const [clicked, setClicked] = useState<boolean>(false)
  const [inFavoriteProducts, setInFavoriteProducts] = useState<boolean>(false)

  const router = useRouter()

  const { favoriteProducts, changeFavoriteProducts } = useFavoriteProducts()

  useMemo(() => {
    favoriteProducts.find((favoriteProduct) => favoriteProduct.id === product.id)
      ? setInFavoriteProducts(true)
      : setInFavoriteProducts(false)
  }, [favoriteProducts])

  return (
    <section className={`flex flex-col p-2 items-center ${className}`}>
      <div className="flex w-[180px] md:w-[240px] lg:w-[300px] flex-col p-2 pb-10 items-start">
        <div className="w-full bg-[#f5f5f5] pt-[100%] relative">
          {inFavoriteProducts ? (
            <AiFillHeart
              onClick={() => changeFavoriteProducts(product)}
              className="text-3xl z-50 absolute cursor-pointer top-3 text-indigo-500 ml-2"
            />
          ) : (
            <AiOutlineHeart
              onClick={() => changeFavoriteProducts(product)}
              className="text-3xl z-50 absolute cursor-pointer top-3 text-indigo-500 ml-2"
            />
          )}
          <Image
            src={product.images[0]}
            fill
            onClick={() => router.push(`/loja/${product.id}`)}
            sizes="(max-width: 640px) 180px, (max-width: 768px) 240px, 300px"
            alt={`image-${product.id}-${product.name}`}
            className="border-4 rounded-md cursor-pointer border-indigo-500"
          />
        </div>

        <div className="flex w-full flex-col my-2 ">
          <small>{product.categorty}</small>
          <CustomLink href={`/loja/${product.id}`}>
            <h3 className="text-indigo-500 lg:text-xl truncate">
              <b>{product.name}</b>
            </h3>
          </CustomLink>
          <p>
            <b>{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</b>
          </p>
          <button
            onClick={() => setClicked(!clicked)}
            className={`my-2 bg-gradient-to-b w-full text-indigo-500 font-semibold from-indigo-50 to-indigo-100 px-10 py-3 rounded-2xl shadow-indigo-400 border-b-4 border-indigo-200 transition-[box-shadow] duration-75  ${
              clicked ? 'shadow-sm' : 'shadow-md'
            } `}
          >
            Adicionar
          </button>
        </div>
      </div>
    </section>
  )
}
