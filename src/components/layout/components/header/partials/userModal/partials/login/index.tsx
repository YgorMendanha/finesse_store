import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'
import { z } from 'zod'
import { ButtonComponent, InputComponent } from '@/components/partials'
import { CheckboxComponent } from '@/components/partials/checkbox'
import { useLoading } from '@/hooks/useLoading'
import { useUser } from '@/hooks/useUser'

const loginFilterFormShema = z.object({
  email: z.string().email('digite um e-mail valido').nonempty('digite um e-mail'),
  password: z.string().nonempty('digite uma senha')
})

type InputsLogin = z.infer<typeof loginFilterFormShema>

export function LoginForm({
  changeForm,
  closeModal
}: {
  changeForm: () => void
  closeModal: () => void
}) {
  const { loginUser } = useUser()
  const { userLoading } = useLoading()

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [saveLogin, setSaveLogin] = useState<boolean>(false)

  const {
    register: registerLogin,
    reset: resetLogin,
    handleSubmit: handleSubmitLogin,
    getValues: getValuesLogin,
    formState: { errors: errorsLogin }
  } = useForm<InputsLogin>({
    resolver: zodResolver(loginFilterFormShema)
  })

  useEffect(() => {
    function keydown(e: any) {
      if (e.keyCode === 13) {
        onSubmitLogin(getValuesLogin())
      }
    }
    window.addEventListener('keydown', keydown)
    return () => {
      window.removeEventListener('keydown', keydown)
    }
  }, [])

  const onSubmitLogin: SubmitHandler<InputsLogin> = (data) => {
    try {
      loginUser({
        data: {
          email: data.email,
          password: Buffer.from(data.password).toString('base64')
        },
        saveLogin
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmitLogin(onSubmitLogin)}
      id="modal"
      className="m-auto bg-slate-100 flex flex-col p-5 rounded-lg w-[500px] max-w-[90vw] "
    >
      <button type="button" className="ml-auto" onClick={() => closeModal()}>
        <IoMdClose />
      </button>

      <b className="mx-auto text-3xl">Entrar</b>
      <InputComponent
        className="my-2 w-fill"
        propsInput={{
          ...registerLogin('email')
        }}
        propsComponent={{
          label: 'Email',
          icon: <MdEmail />,
          errorMessage: errorsLogin.email?.message
        }}
      />
      <InputComponent
        className="my-2 w-fill"
        propsInput={{
          type: showPassword ? 'text' : 'password',
          ...registerLogin('password')
        }}
        propsComponent={{
          label: 'Senha',
          icon: showPassword ? (
            <AiFillEye onClick={() => setShowPassword(false)} />
          ) : (
            <AiFillEyeInvisible onClick={() => setShowPassword(true)} />
          ),
          errorMessage: errorsLogin.password?.message
        }}
      />
      <div className="flex text-sm justify-between items-center">
        <CheckboxComponent onClick={(e) => setSaveLogin(e)} label="Lembrar meu Login" />
        <button
          type="button"
          onClick={() => {
            setShowPassword(false)
            resetLogin()
          }}
        >
          Esqueci minha senha
        </button>
      </div>
      <ButtonComponent loading={String(userLoading)} type="submit" className="mt-5">
        Login
      </ButtonComponent>
      <span onClick={() => changeForm()} className="cursor-pointer text-sm mx-auto mt-4">
        Ainda não possui conta? Registre-se
      </span>
    </form>
  )
}
