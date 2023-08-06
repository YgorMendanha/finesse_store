'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineShopping } from 'react-icons/ai'
import { z } from 'zod'
import { CardProduct } from '../cardProduct'
import { ProductInterface } from '@/types/products'

const createFilterFormShema = z.object({
  sort: z.string()
})

type Inputs = z.infer<typeof createFilterFormShema>

export function ProductsGrid({ products }: { products: ProductInterface[] }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [productsFormated, setProductsFormated] = useState<ProductInterface[]>([])
  const colorsQuery = searchParams.get('color')
  const categoryQuery = searchParams.get('category')
  const minValueQuery = searchParams.get('minValue')
  const maxValueQuery = searchParams.get('maxValue')
  const sortQuery = searchParams.get('sort')

  const { register, setValue } = useForm<Inputs>({
    resolver: zodResolver(createFilterFormShema)
  })

  const createQueryString = (name: string, value: string) => {
    // @ts-ignore Url Error
    const params = new URLSearchParams(searchParams)
    params.set(name, value)

    return params.toString()
  }

  useEffect(() => {
    const sort = searchParams.get('sort')
    if (sort) {
      setValue('sort', sort)
    }
  }, [])

  // Filter Products
  useMemo(() => {
    let productsFormatedTemp: ProductInterface[] = []

    if (colorsQuery) {
      products.map((product) => {
        JSON.parse(colorsQuery).map((color: string) => {
          if (color === product.color) {
            productsFormatedTemp.push(product)
          }
        })
      })
    }

    if (categoryQuery) {
      if (productsFormatedTemp.length > 0) {
        const filterProductsFormated: ProductInterface[] = []
        productsFormatedTemp.map((product) => {
          JSON.parse(categoryQuery).map((category: string) => {
            if (category === product.categorty) {
              filterProductsFormated.push(product)
            }
          })
        })
        productsFormatedTemp = filterProductsFormated
      } else {
        products.map((product) => {
          JSON.parse(categoryQuery).map((category: string) => {
            if (category === product.categorty) {
              productsFormatedTemp.push(product)
            }
          })
        })
      }
    }

    if (minValueQuery || maxValueQuery) {
      if (productsFormatedTemp.length > 0) {
        const filterProductsFormated = productsFormatedTemp.filter(
          (p) =>
            parseFloat(minValueQuery?.replace(/(\d{1,2})$/, '.$1') || '0') <= p.price &&
            p.price <= parseFloat(maxValueQuery?.replace(/(\d{1,2})$/, '.$1') || '99999')
        )
        productsFormatedTemp = filterProductsFormated
      } else {
        const filterProductsFormated = products.filter(
          (p) =>
            parseFloat(minValueQuery?.replace(/(\d{1,2})$/, '.$1') || '0') <= p.price &&
            p.price <= parseFloat(maxValueQuery?.replace(/(\d{1,2})$/, '.$1') || '99999')
        )
        productsFormatedTemp = filterProductsFormated
      }
    }

    if (sortQuery) {
      if (productsFormatedTemp.length > 0) {
        const filterProductsFormated =
          sortQuery === 'asc'
            ? productsFormatedTemp.sort((a, b) => a.price - b.price)
            : productsFormatedTemp.sort((a, b) => b.price - a.price)

        productsFormatedTemp = filterProductsFormated
      } else {
        const filterProductsFormated =
          sortQuery === 'asc'
            ? products.sort((a, b) => a.price - b.price)
            : products.sort((a, b) => b.price - a.price)

        productsFormatedTemp = filterProductsFormated
      }
    }

    if (!colorsQuery && !categoryQuery && !minValueQuery && !maxValueQuery) {
      setProductsFormated(products)
    } else {
      setProductsFormated([...new Set(productsFormatedTemp)])
    }
  }, [colorsQuery, categoryQuery, minValueQuery, maxValueQuery, sortQuery])

  return (
    <div className="w-full flex flex-col ">
      <select
        {...register('sort')}
        onChange={(e) => router.push('?' + createQueryString('sort', e.target.value))}
        className="ml-auto border-2 text-end appearance-none rounded outline-10 outline-indigo-500 cursor-pointer p-1"
      >
        <option value="">Padrão</option>
        <option value="desc">Maior para Menor Valor</option>
        <option value="asc">Menor para Maior Valor</option>
      </select>
      {productsFormated.length > 0 ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-3">
          {productsFormated.map((product) => {
            return <CardProduct className="mx-auto" product={product} key={product.id} />
          })}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center flex-col">
          <h3 className="text-xl">Sem Produtos </h3>
          <AiOutlineShopping className="text-9xl text-gray-400 " />
        </div>
      )}
    </div>
  )
}
