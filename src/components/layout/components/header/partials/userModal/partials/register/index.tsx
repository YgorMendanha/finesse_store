import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { z } from "zod";
import { ButtonComponent, InputComponent } from "@/components/partials";
import { CheckboxComponent } from "@/components/partials/checkbox";
import { useLoading } from "@/hooks/useLoading";
import { useUser } from "@/hooks/useUser";
import { getDictionary } from "@/utils/functions/getDictionary";

const createFilterFormShema = z
  .object({
    name: z.string().nonempty("digite seu nome"),
    email: z
      .string()
      .email("digite um e-mail valido")
      .nonempty("digite um e-mail"),
    password: z.string().nonempty("digite uma senha"),
    confpassword: z.string().nonempty("confirme a senha"),
    cellphone: z.string(),
  })
  .refine((data) => data.password === data.confpassword, {
    message: "senhas são diferentes",
    path: ["confpassword"],
  });

type InputsCreate = z.infer<typeof createFilterFormShema>;

export function RegisterForm({
  changeForm,
  closeModal,
}: {
  changeForm: () => void;
  closeModal: () => void;
}) {
  const { createUser } = useUser();
  const { userLoading } = useLoading();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfPassword, setShowConfPassword] = useState<boolean>(false);
  const [saveLogin, setSaveLogin] = useState<boolean>(false);

  const [dict, setDict] = useState(
    {} as {
      record: string;
      inputName: string;
      inputEmail: string;
      password: string;
      confirmPassword: string;
      telephone: string;
      rememberMyLogin: string;
      iForgotMyPassword: string;
      register: string;
      alreadyHaveAnAccount: string;
    }
  );

  const { lang }: { lang?: "pt" | "en" } = useParams();

  useEffect(() => {
    selectLang(lang);
  }, [lang]);

  async function selectLang(params?: "pt" | "en") {
    if (params) {
      const dict = getDictionary(params);
      setDict(dict);
    }
  }

  const {
    register: registerCreate,
    setValue: setValueCreate,
    reset: resetCreate,
    handleSubmit: handleSubmitCreate,
    getValues: getValuesCreate,
    formState: { errors: errorsCreate },
  } = useForm<InputsCreate>({
    resolver: zodResolver(createFilterFormShema),
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "cellphone") {
      const value = e.target.value
        ?.replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d)(\d{4})$/, "$1-$2");

      setValueCreate("cellphone", value);
    }
  };

  useEffect(() => {
    function keydown(e: any) {
      if (e.keyCode === 13) {
        onSubmitCreate(getValuesCreate());
      }
    }
    window.addEventListener("keydown", keydown);

    return () => {
      window.removeEventListener("keydown", keydown);
    };
  }, []);

  const onSubmitCreate: SubmitHandler<InputsCreate> = (data) => {
    try {
      createUser({
        data: {
          cellphone: data.cellphone,
          email: data.email,
          name: data.name,
          password: Buffer.from(data.password).toString("base64"),
        },
        saveLogin,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmitCreate(onSubmitCreate)}
      id="modal"
      className="m-auto bg-slate-100 flex flex-col p-5 rounded-lg w-[500px] max-w-[90vw] "
    >
      <button type="button" className="ml-auto" onClick={() => closeModal()}>
        <IoMdClose />
      </button>
      <b className="mx-auto text-3xl">{dict.record}</b>
      <InputComponent
        className="my-2 w-fill"
        propsInput={{
          ...registerCreate("name"),
        }}
        propsComponent={{
          label: dict.inputName,
          icon: <FaUserAlt />,
          errorMessage: errorsCreate.name?.message,
        }}
      />
      <InputComponent
        className="my-2 w-fill"
        propsInput={{
          ...registerCreate("email"),
        }}
        propsComponent={{
          label: dict.inputEmail,
          icon: <MdEmail />,
          errorMessage: errorsCreate.email?.message,
        }}
      />
      <div className="flex flex-col sm:flex-row justify-between">
        <InputComponent
          className="my-2 sm:w-[48%]"
          propsInput={{
            type: showPassword ? "text" : "password",
            ...registerCreate("password"),
          }}
          propsComponent={{
            label: dict.password,
            icon: showPassword ? (
              <AiFillEye onClick={() => setShowPassword(false)} />
            ) : (
              <AiFillEyeInvisible onClick={() => setShowPassword(true)} />
            ),
            errorMessage: errorsCreate.password?.message,
          }}
        />
        <InputComponent
          className="my-2 sm:w-[48%]"
          propsInput={{
            type: showConfPassword ? "text" : "password",
            ...registerCreate("confpassword"),
          }}
          propsComponent={{
            label: dict.confirmPassword,
            icon: showConfPassword ? (
              <AiFillEye onClick={() => setShowConfPassword(false)} />
            ) : (
              <AiFillEyeInvisible onClick={() => setShowConfPassword(true)} />
            ),
            errorMessage: errorsCreate.confpassword?.message,
          }}
        />
      </div>
      <InputComponent
        className="my-2 w-fill"
        propsInput={{
          ...registerCreate("cellphone"),
          onChange: (e) => onChange(e),
        }}
        propsComponent={{
          label: dict.telephone,
          icon: <BsFillTelephoneFill />,
          errorMessage: errorsCreate.cellphone?.message,
        }}
      />

      <div className="flex text-sm my-2 justify-between items-center">
        <CheckboxComponent
          onClick={(e) => setSaveLogin(e)}
          label={dict.rememberMyLogin}
        />
        <button
          type="button"
          onClick={() => {
            setShowConfPassword(false);
            setShowPassword(false);
            resetCreate();
          }}
        >
          {dict.iForgotMyPassword}
        </button>
      </div>
      <ButtonComponent loading={String(userLoading)} className="mt-2">
        {dict.register}
      </ButtonComponent>
      <span
        onClick={() => changeForm()}
        className="cursor-pointer text-sm mx-auto mt-4"
      >
        {dict.alreadyHaveAnAccount}
      </span>
    </form>
  );
}
