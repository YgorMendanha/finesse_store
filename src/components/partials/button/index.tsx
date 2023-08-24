'use client'

import { ReactNode } from 'react'
import { ImSpinner10 } from 'react-icons/im'

interface ButtonInterface extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
  loading?: string
  disabled?: boolean
}

export function ButtonComponent(props: ButtonInterface) {
  const { children, className, loading } = props
  return (
    <button
      {...props}
      className={`w-full bg-indigo-500 text-white rounded p-2 disabled:opacity-75 ${className}`}
    >
      {loading === 'true' ? <ImSpinner10 className="animate-spin text-2xl mx-auto" /> : children}
    </button>
  )
}
