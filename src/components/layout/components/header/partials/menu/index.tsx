'use client'

import InputComponent from '@/components/partials/input'
import { useWindowSize } from '@/hooks/useWindowSize'
import { useMemo, useState } from 'react'
import { BsSearch } from 'react-icons/bs'

export default function Menu() {
  const [open, setOpen] = useState(false)
  const [showBtn, setShowBtn] = useState(false)

  const { width } = useWindowSize()

  useMemo(() => {
    if (!width) return
    if (width > 768) {
      setShowBtn(false)
      setOpen(false)
    } else {
      setShowBtn(true)
    }
  }, [width])

  return (
    <>
      {showBtn && (
        <button
          onClick={() => setOpen((state) => !state)}
          className={`group mx-2 flex h-10 w-10 z-40 cursor-pointer items-center justify-center rounded-3xl bg-slate-50 p-2 hover:bg-slate-200
        transition-all duration-1000
        ${open ? 'bg-neutral-900' : ''}
        `}
        >
          <div className="space-y-2">
            <span
              className={`block h-1 w-8 origin-center rounded-full bg-slate-500 transition-transform ease-in-out ${
                open ? 'translate-y-1.5 rotate-45' : ''
              }`}
            />
            <span
              className={`block h-1  origin-center rounded-full bg-indigo-500 transition-transform ease-in-out ${
                open ? '-rotate-45 -translate-y-1.5 w-8' : 'w-5'
              }`}
            />
          </div>
        </button>
      )}

      <div
        className={`w-full h-full left-0 fixed top-0 transition-all duration-1000 ${
          open ? 'z-20 bg-[#000000bd] ' : 'invisible'
        } `}
      />

      <div
        className={`max-w-[500px] w-full h-full fixed top-0 ransition-all duration-1000  ${
          open ? 'z-30 bg-neutral-900 left-0 ' : '-left-20 invisible'
        } `}
      >
        <section
          className={`m-auto mt-2 w-[95%] p-5 pt-[70px] rounded-xl ransition-all duration-700  ${
            open ? 'z-400 bg-indigo-500 left-0' : '-left-20'
          }`}
        >
          <p className={`transition-all duration-1000 ${open ? 'text-white' : 'text-transparent'}`}>
            shear
          </p>
          <p className={`transition-all duration-1000 ${open ? 'text-white' : 'text-transparent'}`}>
            Loja
          </p>
          <p className={`transition-all duration-1000 ${open ? 'text-white' : 'text-transparent'}`}>
            Favoritos
          </p>
          <p className={`transition-all duration-1000 ${open ? 'text-white' : 'text-transparent'}`}>
            Minha conta
          </p>
        </section>
      </div>
    </>
  )
}
