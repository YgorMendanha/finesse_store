import { BsBag, BsFillHeartFill, BsSearch } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'
import SearchImput from './partials/searchImput'

export default function Header() {
  return (
    <header className="w-full border-b-2  border-indigo-500">
      <div className="container h-20 flex justify-between items-center ">
        <section className="flex">
          <b className="text-4xl font-dos">FINESS</b>
          <nav className="flex mx-5 items-center">
            <p className="mx-4 cursor-pointer text-lg hover:border-b-2 hover:border-indigo-500">
              Loja
            </p>
            <p className="mx-4 cursor-pointer text-lg hover:border-b-2 hover:border-indigo-500">
              Contato
            </p>
          </nav>
        </section>
        <section className="flex text-xl items-center">
          <SearchImput />
          <BsFillHeartFill className="mx-4" />
          <BsBag className="mx-4" />
          <AiOutlineUser className="mx-4" />
        </section>
      </div>
    </header>
  )
}
