'use client'

import InputComponent from '@/components/partials/input'
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'

export default function SearchImput({
  className = '',
  initial = 'hide',
  btnDisabled = false,
  duration = '700'
}: {
  className?: string
  initial?: 'show' | 'hide'
  btnDisabled?: boolean
  duration?: string
}) {
  const [style, setStyle] = useState(initial)

  function changeStyle() {
    if (btnDisabled) return
    if (style === 'hide') {
      setStyle('show')
    } else {
      setStyle('hide')
    }
  }

  return (
    <div
      className={`transition-all duration-${duration} ${
        style === 'show' ? `max-w-[500px]` : `max-w-[35px]`
      }
      ${className}
      `}
    >
      <InputComponent
        propsInput={{ id: 'searh' }}
        propsComponent={{
          icon: <BsSearch onClick={changeStyle} className="cursor-pointer" />,
          className: `transition-all duration-${duration} ${
            style === 'show' ? `border-indigo-500` : `border-[transparent] bg-slate-50`
          }`
        }}
      />
    </div>
  )
}
