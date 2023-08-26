'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsSearch } from 'react-icons/bs'
import { z } from 'zod'
import { InputComponent } from '@/components/partials'

type Inputs = z.infer<typeof createFilterFormShema>

const createFilterFormShema = z.object({
  search: z.string()
})

export default function SearchImput({
  className = '',
  initial = 'hide',
  btnDisabled = false,
  duration = '700'
}: {
  className?: string
  initial?: 'show' | 'hide'
  btnDisabled?: boolean
  duration?: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [style, setStyle] = useState(initial)
  const { register, watch, handleSubmit } = useForm<Inputs>({
    resolver: zodResolver(createFilterFormShema)
  })

  const onSubmit = (data: Inputs) =>
    router.push('/shop?' + createQueryString('search', data.search))

  const createQueryString = useCallback(
    (name: string, value: string) => {
      // @ts-ignore Url Error
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  function changeStyle() {
    if (btnDisabled) return
    if (style === 'hide') {
      setStyle('show')
    } else {
      setStyle('hide')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`transition-all duration-${duration} ${
        style === 'show' ? `max-w-[500px]` : `max-w-[35px]`
      }
      ${className}
      `}
    >
      <InputComponent
        propsInput={{
          id: 'searh',
          'aria-label': 'Search',
          ...register('search')
        }}
        propsComponent={{
          icon: <BsSearch onClick={changeStyle} className="cursor-pointer" />,
          className: `transition-all duration-${duration} ${
            style === 'show' ? `border-indigo-500` : `border-[transparent] bg-slate-50`
          }`
        }}
      />
    </form>
  )
}
