import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'

interface customProps extends LinkProps {
  children: ReactNode
  className?: string
}

export function CustomLink(props: customProps) {
  const { children, className } = props
  return (
    <Link className={className || ''} {...props}>
      {children}
    </Link>
  )
}
