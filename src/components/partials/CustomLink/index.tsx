'use client'
import Link, { LinkProps } from 'next/link'
import { useParams } from 'next/navigation'
import { ReactNode } from 'react'

interface customProps extends LinkProps {
  children: ReactNode
  className?: string
}

export function CustomLink(props: customProps) {
  const { children, className } = props
  const params = useParams()

  return (
    <Link
      {...props}
      className={className || ''}
      href={params.lang === 'en' ? `/${params.lang}${props.href}` : `${props.href}`}
    >
      {children}
    </Link>
  )
}
