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
import { useLoading } from "@/hooks/useLoading";
import { useUser } from "@/hooks/useUser";
import { getDictionary } from "@/utils/functions/getDictionary";

const editUserFormShema = z.object({
  name: z.string().nonempty("digite seu nome"),
  email: z
    .string()
    .email("digite um e-mail valido")
    .nonempty("digite um e-mail"),
  oldpassword: z.string(),
  newpassword: z.string(),
  cellphone: z.string(),
});

type InputsEdit = z.infer<typeof editUserFormShema>;

export function EditForm({ closeModal }: { closeModal: () => void }) {
  const { user, updateUser, logoutUser } = useUser();
  const { userLoading } = useLoading();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfPassword, setShowConfPassword] = useState<boolean>(false);

  const [dict, setDict] = useState(
    {} as {
      myAccount: string;
      inputName: string;
      inputEmail: string;
      oldPassword: string;
      newPassword: string;
      telephone: string;
      toSave: string;
      toGoOut: string;
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
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<InputsEdit>({
    resolver: zodResolver(editUserFormShema),
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "cellphone") {
      const value = e.target.value
        ?.replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d)(\d{4})$/, "$1-$2");

      setValue("cellphone", value);
    }
  };

  useEffect(() => {
    if (user?.id) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("cellphone", user.cellphone);
    }
  }, [user?.id]);

  useEffect(() => {
    function keydown(e: any) {
      if (e.keyCode === 13) {
        onSubmit(getValues());
      }
    }
    window.addEventListener("keydown", keydown);

    return () => {
      window.removeEventListener("keydown", keydown);
    };
  }, []);

  const onSubmit: SubmitHandler<InputsEdit> = (data) => {
    try {
      updateUser(user.id, data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="modal"
      className="m-auto bg-slate-100 flex flex-col p-5 rounded-lg w-[500px] max-w-[90vw] "
    >
      <button type="button" className="ml-auto" onClick={() => closeModal()}>
        <IoMdClose />
      </button>
      <b className="mx-auto text-3xl">{dict.myAccount}</b>
      <InputComponent
        className="my-2 w-fill"
        propsInput={{
          ...register("name"),
        }}
        propsComponent={{
          label: dict.inputName,
          icon: <FaUserAlt />,
          errorMessage: errors.name?.message,
        }}
      />
      <InputComponent
        className="my-2 w-fill"
        propsInput={{
          ...register("email"),
        }}
        propsComponent={{
          label: dict.inputEmail,
          icon: <MdEmail />,
          errorMessage: errors.email?.message,
        }}
      />
      <div className="flex flex-col sm:flex-row justify-between">
        <InputComponent
          className="my-2 sm:w-[48%]"
          propsInput={{
            type: showPassword ? "text" : "password",
            ...register("oldpassword"),
          }}
          propsComponent={{
            label: dict.oldPassword,
            icon: showPassword ? (
              <AiFillEye onClick={() => setShowPassword(false)} />
            ) : (
              <AiFillEyeInvisible onClick={() => setShowPassword(true)} />
            ),
            errorMessage: errors.oldpassword?.message,
          }}
        />
        <InputComponent
          className="my-2 sm:w-[48%]"
          propsInput={{
            type: showConfPassword ? "text" : "password",
            ...register("newpassword"),
          }}
          propsComponent={{
            label: dict.newPassword,
            icon: showConfPassword ? (
              <AiFillEye onClick={() => setShowConfPassword(false)} />
            ) : (
              <AiFillEyeInvisible onClick={() => setShowConfPassword(true)} />
            ),
            errorMessage: errors.newpassword?.message,
          }}
        />
      </div>
      <InputComponent
        className="my-2 w-fill"
        propsInput={{
          ...register("cellphone"),
          onChange: (e) => onChange(e),
        }}
        propsComponent={{
          label: dict.telephone,
          icon: <BsFillTelephoneFill />,
          errorMessage: errors.cellphone?.message,
        }}
      />
      <ButtonComponent
        type="submit"
        loading={String(userLoading)}
        className="mt-2"
      >
        {dict.toSave}
      </ButtonComponent>
      <button
        onClick={() => {
          logoutUser();
          closeModal();
        }}
        type="button"
        className={`w-full bg-indigo-500 rounded p-2 mt-2 bg-transparent border text-stone-950 border-black hover:bg-red-500 hover:text-white hover:border-red-500`}
      >
        {dict.toGoOut}
      </button>
    </form>
  );
}
