'use client'

import { CheckboxComponent } from '../checkbox'
import { InputComponent } from '../input'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'

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
  const {
    handleSubmit,
    watch,
    register,
    setValue,
    reset,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(createFilterFormShema)
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`max-w-[250px]  ${className} `}>
      <p>Filtros</p>

      <section className="pl-3 min-w-[250px] w-[250px] ">
        <small>Min - Max</small>
        <div className="flex">
          <InputComponent
            propsInput={{
              ...register('minValue', { required: true }),
              onChange: (e) =>
                setValue(
                  'minValue',
                  `R$ ${e.target.value
                    ?.replace(/\D/g, '')
                    .replace(/(\d{1,2})$/, ',$1')
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`
                )
            }}
            propsComponent={{ className: 'mx-3' }}
          />
          <InputComponent
            propsInput={{
              ...register('maxValue', { required: true }),
              onChange: (e) =>
                setValue(
                  'maxValue',
                  `R$ ${e.target.value
                    ?.replace(/\D/g, '')
                    .replace(/(\d{1,2})$/, ',$1')
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`
                )
            }}
            propsComponent={{ className: 'mx-3' }}
          />
        </div>
      </section>

      <section className={`pl-3`}>
        <small>Cores: </small>
        {colors.map((color, idx) => (
          <CheckboxComponent className="pl-5 my-4" key={idx} label={color} />
        ))}
      </section>
      <section className={`pl-3`}>
        <small>Categorias: </small>
        {categorys.map((category, idx) => (
          <CheckboxComponent className="pl-5 my-4" key={idx} label={category} />
        ))}
      </section>
    </form>
  )
}
