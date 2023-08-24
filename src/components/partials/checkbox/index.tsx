'use client'

import React, { useId, useEffect, useRef } from 'react'

export function CheckboxComponent({
  label,
  className = '',
  onClick,
  checked = false
}: {
  label?: string
  className?: string
  onClick?: (e: boolean) => void
  name?: string
  checked?: boolean
}) {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      if (checked) {
        inputRef.current.checked = checked
      } else {
        inputRef.current.checked = false
      }
    }
  }, [checked, inputRef.current])

  return (
    <div className={`flex flex-row ${className}`}>
      <input
        type="checkbox"
        id={id}
        ref={inputRef}
        onClick={() => onClick && onClick(inputRef.current?.checked || false)}
        className="
       appearance-none h-6 w-6 bg-gray-400 rounded-full 
       checked:bg-indigo-300 checked:scale-75
       transition-all duration-200 peer
   "
      />
      <div
        className="h-6 w-6 absolute rounded-full pointer-events-none
   peer-checked:border-indigo-300 peer-checked:border-2
   "
      />
      <label
        htmlFor={id}
        className="flex flex-col justify-center px-2 peer-checked:text-indigo-400  select-none"
      >
        {label}
      </label>
    </div>
  )
}
