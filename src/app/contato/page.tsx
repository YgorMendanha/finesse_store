'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { ButtonComponent, InputComponent, Notification } from '@/components/partials'

type Inputs = z.infer<typeof createMessageFormShema>

const createMessageFormShema = z.object({
  contact: z.string().nonempty('Digite uma forma de Contato'),
  name: z.string().nonempty('Digite seu nome'),
  message: z.string().nonempty('Digite sua Mensagem')
})

export default function ContactPage() {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(createMessageFormShema)
  })

  const onSubmit: SubmitHandler<Inputs> = () => {
    setLoading(true)
    setTimeout(() => {
      Notification.user({ content: 'Logo Entraremos em Contato', type: 'success' })
      setLoading(false)
    }, 5000)
  }

  return (
    <section className="min-h-[calc(100vh-150px)] py-5 w-full flex flex-col container ">
      <b className="text-7xl font-dos mx-auto mt-5">FINESSE</b>
      <div className="flex my-auto justify-center">
        <p className="w-1/2 text-justify mx-5 flex items-center">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque, architecto reiciendis
          maiores fuga assumenda atque! Consequatur, nihil amet. Quisquam architecto, voluptatibus
          quod impedit voluptates quasi ad nihil odit adipisci eveniet. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quaerat odit perferendis harum pariatur voluptates vel
          suscipit itaque impedit perspiciatis voluptatem nesciunt corporis nobis, reiciendis
          voluptas, quo exercitationem architecto voluptatum earum?
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 mx-5">
          <div className="flex w-full justify-center">
            <h3 className="text-xl">Entre em Contato</h3>
          </div>
          <InputComponent
            className="my-5"
            propsInput={{
              type: 'text',
              ...register('name', { required: true })
            }}
            propsComponent={{
              label: 'Nome',
              errorMessage: errors.name?.message
            }}
          />
          <InputComponent
            className="my-5"
            propsInput={{ type: 'text', ...register('contact', { required: true }) }}
            propsComponent={{
              label: 'Numero/Email de contato',
              errorMessage: errors.contact?.message
            }}
          />
          <InputComponent
            className="my-5"
            propsInput={{ type: 'text', ...register('message', { required: true }) }}
            propsComponent={{
              label: 'Mensagem',
              type: 'textarea',
              errorMessage: errors.message?.message
            }}
          />
          <ButtonComponent loading={loading.toString()}>Enviar</ButtonComponent>
        </form>
      </div>
    </section>
  )
}
