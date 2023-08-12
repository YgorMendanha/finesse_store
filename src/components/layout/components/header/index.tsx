import { Suspense } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { BsBag, BsFillHeartFill } from 'react-icons/bs'
import { ImSpinner10 } from 'react-icons/im'
import Menu from './partials/menu'
import SearchImput from './partials/searchImput'
import { CustomLink } from '@/components/partials'

export default function Header() {
  return (
    <header className="w-full border-b-2 bg-slate-50 sticky top-0 z-50 border-indigo-500">
      <div className="container h-20 flex justify-between items-center ">
        <section className="flex items-center">
          <Suspense fallback={<ImSpinner10 className="animate-spin text-2xl m-auto" />}>
            <Menu />
          </Suspense>
          <CustomLink href={'/'}>
            <b className="text-4xl font-dos">FINESSE</b>
          </CustomLink>
          <nav className="mx-5 items-center hidden md:flex">
            <CustomLink href={'/loja'}>
              <p className="mx-4 text-lg hover:border-b-2 hover:border-indigo-500">Loja</p>
            </CustomLink>
            <CustomLink
              href={'/contato'}
              className="mx-4 cursor-pointer text-lg hover:border-b-2 hover:border-indigo-500"
            >
              Contato
            </CustomLink>
          </nav>
        </section>
        <section className="flex text-xl items-center">
          <Suspense fallback={<ImSpinner10 className="animate-spin text-2xl m-auto" />}>
            <SearchImput className="hidden md:inline-block" />
          </Suspense>
          <BsFillHeartFill className="mx-4 hidden md:inline-block" />
          <BsBag className="mx-4" />
          <AiOutlineUser className="mx-4" />
        </section>
      </div>
    </header>
  )
}
