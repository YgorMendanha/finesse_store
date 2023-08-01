import { BsBag, BsFillHeartFill, BsSearch } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'
import SearchImput from './partials/searchImput'
import Menu from './partials/menu'

export default function Header() {
  return (
    <header className="w-full border-b-2 bg-slate-50 sticky top-0 z-50 border-indigo-500">
      <div className="container h-20 flex justify-between items-center ">
        <section className="flex items-center">
          <Menu />
          <b className="text-4xl font-dos">FINESS</b>
          <nav className="mx-5 items-center hidden md:flex">
            <p className="mx-4 cursor-pointer text-lg hover:border-b-2 hover:border-indigo-500">
              Loja
            </p>
            <p className="mx-4 cursor-pointer text-lg hover:border-b-2 hover:border-indigo-500">
              Contato
            </p>
          </nav>
        </section>
        <section className="flex text-xl items-center">
          <SearchImput className="hidden md:inline-block" />
          <BsFillHeartFill className="mx-4 hidden md:inline-block" />
          <BsBag className="mx-4" />
          <AiOutlineUser className="mx-4" />
        </section>
      </div>
    </header>
  )
}
