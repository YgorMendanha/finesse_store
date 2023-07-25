import { AiFillInstagram } from 'react-icons/ai'
import { BsFacebook, BsYoutube } from 'react-icons/bs'

export function Footer() {
  return (
    <footer className="w-full p-2 flex border-t-2 border-indigo-500">
      <small className="text-indigo-500 flex flex-1">
        <b className="m-auto">Y.M. Desenvolvimento © 2023. Todos os direitos reservados.</b>
      </small>
      <small className="text-indigo-500 flex flex-1">
        <b className="font-dos text-xl m-auto">FINESS</b>
      </small>
      <small className="text-indigo-500 flex flex-1">
        <div className="m-auto flex">
          <BsFacebook className="m-2 text-lg " />
          <BsYoutube className="m-2 text-lg " />
          <AiFillInstagram className="m-2 text-lg " />
        </div>
      </small>
    </footer>
  )
}
