'use client'

import InputComponent from '@/components/partials/input'
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'

export default function SearchImput() {
  const [style, setStyle] = useState('hide')

  function changeStyle() {
    if (style === 'hide') {
      setStyle('show')
    } else {
      setStyle('hide')
    }
  }

  return (
    <div className={`transition-all duration-700 ${style === 'show' ? `w-[500px]` : `w-[35px]`}`}>
      <InputComponent
        propsInput={{ id: 'searh' }}
        propsComponent={{
          icon: <BsSearch onClick={changeStyle} className="cursor-pointer" />,
          className: `transition-all duration-700 ${
            style === 'show' ? `` : `border-[transparent]`
          }`
        }}
      />
    </div>
  )
}
