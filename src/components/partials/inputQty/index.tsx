'use client'

import { useRef } from 'react'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
import { InputComponent } from '@/components/partials'

export function InputQty({
  className,
  value
}: {
  className?: string
  value?: (e: string | undefined) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const returnValue = (valueOnChange?: string) => {
    if (valueOnChange && value) {
      value(valueOnChange)
      return
    }
    value && value(inputRef.current?.value)
  }

  const plusQty = () => {
    if (inputRef.current && Number(inputRef.current.value) >= 0) {
      inputRef.current.value = String(Number(inputRef.current.value) + 1)
      returnValue()
    }
  }

  const minusQty = () => {
    if (inputRef.current && Number(inputRef.current.value) > 0) {
      inputRef.current.value = String(Number(inputRef.current.value) - 1)
      returnValue()
    }
  }

  return (
    <div className={`flex items-center w-20 ${className}`}>
      <InputComponent
        propsInput={{
          defaultValue: 1,
          min: 1,
          ref: inputRef,
          onChange: (e) => returnValue(e.target.value)
        }}
        propsComponent={{ className: 'rounded-l-lg rounded-r-none border-indigo-500 border-r-0' }}
      />
      <div className="flex flex-col h-fill border-2 border-l-0 border-indigo-500 rounded-r-lg">
        <button onClick={plusQty} className="mb-2">
          <AiOutlineArrowUp />
        </button>
        <button onClick={minusQty}>
          <AiOutlineArrowDown />
        </button>
      </div>
    </div>
  )
}
