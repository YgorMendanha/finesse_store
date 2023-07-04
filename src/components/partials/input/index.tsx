'use client'

import React, { useId } from 'react'
import { ImSpinner10 } from 'react-icons/im'

interface PropsComponent {
  label?: string
  icon?: React.ReactNode
  errorMessage?: string
  loading?: boolean
  className?: string
}

interface PropsInput extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
}

export default function InputComponent({
  propsComponent,
  propsInput
}: {
  propsComponent: PropsComponent
  propsInput: PropsInput
}) {
  const id = useId()
  const { label, icon, errorMessage, loading, className = '' } = propsComponent

  return (
    <div className="text-main_white dark:main_black my-3">
      {label && (
        <label className="text-main_white dark:text-light" htmlFor={id}>
          {label}
        </label>
      )}
      <section className="flex items-center">
        <span className="text-xl pl-2 absolute">
          {loading ? <ImSpinner10 className="animate-spin" /> : icon}
        </span>

        <input
          {...propsInput}
          id={id}
          className={`pl-8 flex w-full items-center justify-center rounded-xl bg-dark p-2 outline-none border-2 ${
            errorMessage ? 'border-[#fdacac]' : 'border-[#cacaca]'
          } ${className}`}
        />
      </section>

      {errorMessage && <small className="text-[#fdacac]">{errorMessage}</small>}
    </div>
  )
}
