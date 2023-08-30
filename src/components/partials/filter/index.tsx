'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsTrash2Fill } from 'react-icons/bs'
import { z } from 'zod'
import { CheckboxComponent } from '../checkbox'
import { InputComponent } from '../input'
import { getDictionary } from '@/utils/functions/getDictionary'

const createFilterFormShema = z.object({
  minValue: z.string(),
  maxValue: z.string()
})

type Inputs = z.infer<typeof createFilterFormShema>

export function FilterProductsComponent({
  categorys,
  colors,
  className = ''
}: {
  categorys: Array<string>
  colors: Array<string>
  className?: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const minValue = searchParams.get('minValue')
  const maxValue = searchParams.get('maxValue')
  const colorsQuery = searchParams.get('color') || '[]'
  const categoryQuery = searchParams.get('category') || '[]'

  const [dict, setDict] = useState(
    {} as {
      filters: string
      colors: string
      categories: string
    }
  )

  const { lang }: { lang?: 'pt' | 'en' } = useParams()

  useEffect(() => {
    selectLang(lang)
  }, [lang])

  async function selectLang(params?: 'pt' | 'en') {
    if (params) {
      const dict = getDictionary(params)
      setDict(dict)
    }
  }

  useEffect(() => {
    if (minValue) {
      setValue(
        'minValue',
        `${lang === 'en' ? '$' : 'R$'} ${minValue
          .replace(/\D/g, '')
          .replace(/(\d{1,2})$/, ',$1')
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`
      )
    } else {
      setValue('minValue', `${lang === 'en' ? '$' : 'R$'} `)
    }
    if (maxValue) {
      setValue(
        'maxValue',
        `${lang === 'en' ? '$' : 'R$'} ${maxValue
          .replace(/\D/g, '')
          .replace(/(\d{1,2})$/, ',$1')
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`
      )
    } else {
      setValue('maxValue', `${lang === 'en' ? '$' : 'R$'} `)
    }
  }, [minValue, maxValue])

  const { register, setValue } = useForm<Inputs>({
    resolver: zodResolver(createFilterFormShema)
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === 'minValue') {
      const value = e.target.value
        ?.replace(/\D/g, '')
        .replace(/(\d{1,2})$/, ',$1')
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      if (value.length > 3) {
        router.push('?' + createQueryString('minValue', value.replace(/\D/g, '')))
      }
      setValue('minValue', `${lang === 'en' ? '$' : 'R$'} ${value}`)
    }
    if (e.target.name === 'maxValue') {
      const value = e.target.value
        ?.replace(/\D/g, '')
        .replace(/(\d{1,2})$/, ',$1')
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      if (value.length > 3) {
        router.push('?' + createQueryString('maxValue', value.replace(/\D/g, '')))
      }
      setValue('maxValue', `${lang === 'en' ? '$' : 'R$'} ${value}`)
    }
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      // @ts-ignore Url Error
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const queryString = (state: boolean, name: string, value: string) => {
    const query = searchParams.get(name)

    if (state) {
      if (query) {
        const newQuery: String[] = JSON.parse(query)
        newQuery.push(value)
        router.push('?' + createQueryString(name, JSON.stringify(newQuery)))
      } else {
        router.push('?' + createQueryString(name, JSON.stringify([value])))
      }
    } else {
      if (query) {
        const oldQuery: String[] = JSON.parse(query)
        if (oldQuery.length === 1) {
          router.push('?' + createQueryString(name, ''))
          return
        }
        const newQuery: String[] = []
        oldQuery.map((oldQuery) => {
          if (oldQuery !== value) {
            return newQuery.push(oldQuery)
          }
        })
        router.push('?' + createQueryString(name, JSON.stringify([...new Set(newQuery)])))
      }
    }
    return
  }

  return (
    <form className={`max-w-[250px]  ${className} `}>
      <div className="flex justify-between">
        <h3 className="text-xl">{dict.filters}</h3>
        <BsTrash2Fill
          onClick={() => router.push(`${lang === 'en' ? '/en/' : '/'}shop`)}
          className="text-indigo-500 text-xl cursor-pointer "
        />
      </div>

      <section className="pl-3 min-w-[250px] w-[250px] ">
        <div className="flex">
          <InputComponent
            propsInput={{
              ...register('minValue'),
              onChange: (e) => onChange(e)
            }}
            propsComponent={{ className: 'mx-3', label: 'Min' }}
          />
          <InputComponent
            propsInput={{
              ...register('maxValue'),
              onChange: (e) => onChange(e)
            }}
            propsComponent={{ className: 'mx-3', label: 'Max' }}
          />
        </div>
      </section>

      <section className={`pl-3`}>
        <p>{dict.colors}: </p>
        {colors.map((color, idx) => (
          <CheckboxComponent
            checked={JSON.parse(colorsQuery).find((c: string) => c === color)}
            onClick={(e) => queryString(e, 'color', color)}
            className="pl-5 my-4"
            key={idx}
            name="color"
            label={color}
          />
        ))}
      </section>
      <section className={`pl-3`}>
        <p>{dict.categories}: </p>
        {categorys.map((category, idx) => (
          <CheckboxComponent
            checked={JSON.parse(categoryQuery).find((c: string) => c === category)}
            onClick={(e) => queryString(e, 'category', category)}
            className="pl-5 my-4"
            key={idx}
            name="category"
            label={category}
          />
        ))}
      </section>
    </form>
  )
}
