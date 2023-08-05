'use client'

import { type } from 'os'
import React, { useId } from 'react'
import { ImSpinner10 } from 'react-icons/im'

interface PropsComponent {
  label?: string
  icon?: React.ReactNode
  errorMessage?: string
  loading?: boolean
  className?: string
}

export function InputComponent({
  propsComponent,
  propsInput
}: {
  propsComponent: PropsComponent
  propsInput?: React.InputHTMLAttributes<HTMLInputElement>
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
        {(loading || icon) && (
          <span className="text-xl pl-2 absolute">
            {loading ? <ImSpinner10 className="animate-spin" /> : icon}
          </span>
        )}

        <input
          {...propsInput}
          id={id}
          className={` ${
            (loading || icon) && 'pl-8'
          }  flex w-full items-center justify-center rounded-xl bg-dark p-2 outline-none border-2 ${
            errorMessage ? 'border-[#fdacac]' : 'border-[#cacaca]'
          } ${className}`}
        />
      </section>

      {errorMessage && <small className="text-[#fdacac]">{errorMessage}</small>}
    </div>
  )
}
