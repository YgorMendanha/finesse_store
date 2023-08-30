import { AiFillInstagram } from 'react-icons/ai'
import { BsFacebook, BsYoutube } from 'react-icons/bs'
import { getDictionary } from '@/utils/functions/getDictionary'

export function Footer({ lang }: { lang: 'pt' | 'en' }) {
  const dict = getDictionary(lang)
  return (
    <footer className="w-full flex md:flex-row flex-col p-2 px-5 border-t-2 border-indigo-500">
      <small className="flex flex-1">
        <b className="font-dos text-xl m-auto">FINESSE</b>
      </small>
      <small className="flex flex-1">
        <div className="m-auto flex">
          <BsFacebook className="m-2 text-base " />
          <BsYoutube className="m-2 text-lg " />
          <AiFillInstagram className="m-2 text-lg " />
        </div>
      </small>
      <small className="flex flex-1">
        <b className="m-auto text-sm md:text-base md:text-right text-center">
          {dict.allRightsReserved}
        </b>
      </small>
    </footer>
  )
}
