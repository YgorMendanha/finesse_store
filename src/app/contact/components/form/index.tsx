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

export default function Form() {
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
  )
}
