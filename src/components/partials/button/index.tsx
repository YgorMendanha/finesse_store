'use client'

import { ReactNode } from 'react'

interface ButtonInterface extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

export function ButtonComponent(props: ButtonInterface) {
  const { children, className } = props
  return (
    <button {...props} className={`w-full bg-indigo-500 text-white rounded p-2 ${className}`}>
      {children}
    </button>
  )
}
