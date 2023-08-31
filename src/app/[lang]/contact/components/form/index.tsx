'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { ButtonComponent, InputComponent, Notification } from '@/components/partials'
import { getDictionary } from '@/utils/functions/getDictionary'

type Inputs = z.infer<typeof createMessageFormShema>

const createMessageFormShema = z.object({
  contact: z.string().nonempty('Digite uma forma de Contato'),
  name: z.string().nonempty('Digite seu nome'),
  message: z.string().nonempty('Digite sua Mensagem')
})

export default function Form() {
  const [loading, setLoading] = useState(false)

  const [dict, setDict] = useState(
    {} as {
      enterContact: string
      inputName: string
      contactNumberEmail: string
      message: string
      toSend: string
      wellBeITouchSoon: string
    }
  )

  const { lang }: { lang?: 'pt' | 'en' } = useParams()

  useEffect(() => {
    selectLang(lang)
  }, [lang])

  function selectLang(params?: 'pt' | 'en') {
    if (params) {
      const dict = getDictionary(params)
      setDict(dict)
    }
  }

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
      Notification.user({ content: dict.wellBeITouchSoon, type: 'success' })
      setLoading(false)
    }, 5000)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="lg:w-1/2 mx-5">
      <div className="flex w-full justify-center">
        <h3 className="text-xl">{dict.enterContact}</h3>
      </div>
      <InputComponent
        className="my-5"
        propsInput={{
          type: 'text',
          ...register('name', { required: true })
        }}
        propsComponent={{
          label: dict.inputName,
          errorMessage: errors.name?.message
        }}
      />
      <InputComponent
        className="my-5"
        propsInput={{ type: 'text', ...register('contact', { required: true }) }}
        propsComponent={{
          label: dict.contactNumberEmail,
          errorMessage: errors.contact?.message
        }}
      />
      <InputComponent
        className="my-5"
        propsInput={{ type: 'text', ...register('message', { required: true }) }}
        propsComponent={{
          label: dict.message,
          type: 'textarea',
          errorMessage: errors.message?.message
        }}
      />
      <ButtonComponent loading={loading.toString()}>{dict.toSend}</ButtonComponent>
    </form>
  )
}
