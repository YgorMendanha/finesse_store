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
interface PropsInput extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: any
}

export function InputComponent({
  propsComponent,
  propsInput
}: {
  propsComponent?: PropsComponent
  propsInput?: PropsInput
}) {
  const id = useId()

  return (
    <div className="text-main_white dark:main_black">
      {propsComponent?.label && (
        <label className="text-main_white dark:text-light" htmlFor={id}>
          {propsComponent?.label}
        </label>
      )}
      <section className="flex items-center">
        {(propsComponent?.loading || propsComponent?.icon) && (
          <span className="text-xl pl-2 absolute">
            {propsComponent?.loading ? (
              <ImSpinner10 className="animate-spin" />
            ) : (
              propsComponent?.icon
            )}
          </span>
        )}

        <input
          {...propsInput}
          id={id}
          className={` ${
            (propsComponent?.loading || propsComponent?.icon) && 'pl-8'
          }  flex w-full items-center justify-center rounded-xl bg-dark p-2 outline-none border-2 ${
            propsComponent?.errorMessage ? 'border-[#fdacac]' : 'border-[#cacaca]'
          } ${propsComponent?.className}`}
        />
      </section>

      {propsComponent?.errorMessage && (
        <small className="text-[#fdacac]">{propsComponent?.errorMessage}</small>
      )}
    </div>
  )
}
