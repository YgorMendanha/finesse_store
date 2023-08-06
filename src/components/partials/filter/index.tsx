'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { BsTrash2Fill } from 'react-icons/bs'
import { z } from 'zod'
import { CheckboxComponent } from '../checkbox'
import { InputComponent } from '../input'

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
  useEffect(() => {
    if (minValue) {
      setValue(
        'minValue',
        `R$ ${minValue
          .replace(/\D/g, '')
          .replace(/(\d{1,2})$/, ',$1')
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`
      )
    } else {
      setValue('minValue', `R$ `)
    }
    if (maxValue) {
      setValue(
        'maxValue',
        `R$ ${maxValue
          .replace(/\D/g, '')
          .replace(/(\d{1,2})$/, ',$1')
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`
      )
    } else {
      setValue('maxValue', `R$ `)
    }
  }, [minValue, maxValue])

  const { register, setValue } = useForm<Inputs>({
    resolver: zodResolver(createFilterFormShema)
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'minValue') {
      const value = e.target.value
        ?.replace(/\D/g, '')
        .replace(/(\d{1,2})$/, ',$1')
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      if (value.length > 3) {
        router.push('?' + createQueryString('minValue', value.replace(/\D/g, '')))
      }
      setValue('minValue', `R$ ${value}`)
    }
    if (e.target.name === 'maxValue') {
      const value = e.target.value
        ?.replace(/\D/g, '')
        .replace(/(\d{1,2})$/, ',$1')
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      if (value.length > 3) {
        router.push('?' + createQueryString('maxValue', value.replace(/\D/g, '')))
      }
      setValue('maxValue', `R$ ${value}`)
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
        <h3 className="text-xl">Filtros</h3>
        <BsTrash2Fill
          onClick={() => router.push('/loja')}
          className="text-indigo-500 text-xl cursor-pointer "
        />
      </div>

      <section className="pl-3 min-w-[250px] w-[250px] ">
        <div className="flex">
          <InputComponent
            propsInput={{
              ...register('minValue', { required: true }),
              onChange: (e) => onChange(e)
            }}
            propsComponent={{ className: 'mx-3', label: 'Min' }}
          />
          <InputComponent
            propsInput={{
              ...register('maxValue', { required: true }),
              onChange: (e) => onChange(e)
            }}
            propsComponent={{ className: 'mx-3', label: 'Max' }}
          />
        </div>
      </section>

      <section className={`pl-3`}>
        <p>Cores: </p>
        {colors.map((color, idx) => (
          <CheckboxComponent
            onClick={(e) => queryString(e, 'color', color)}
            className="pl-5 my-4"
            key={idx}
            name="color"
            label={color}
          />
        ))}
      </section>
      <section className={`pl-3`}>
        <p>Categorias: </p>
        {categorys.map((category, idx) => (
          <CheckboxComponent
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
