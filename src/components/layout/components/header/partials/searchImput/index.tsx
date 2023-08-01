'use client'

import InputComponent from '@/components/partials/input'
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'

export default function SearchImput({ className = '' }: { className?: string }) {
  const [style, setStyle] = useState('hide')

  function changeStyle() {
    if (style === 'hide') {
      setStyle('show')
    } else {
      setStyle('hide')
    }
  }

  return (
    <div
      className={`transition-all duration-700 ${style === 'show' ? `max-w-[500px]` : `max-w-[35px]`}
      ${className}
      `}
    >
      <InputComponent
        propsInput={{ id: 'searh' }}
        propsComponent={{
          icon: <BsSearch onClick={changeStyle} className="cursor-pointer" />,
          className: `transition-all duration-700 ${
            style === 'show' ? `border-indigo-500` : `border-[transparent] bg-slate-50`
          }`
        }}
      />
    </div>
  )
}
