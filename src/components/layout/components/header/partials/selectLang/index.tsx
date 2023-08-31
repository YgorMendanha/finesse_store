'use client'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'

export function SelectLang() {
  const { lang }: { lang?: 'pt' | 'en' } = useParams()
  const router = useRouter()

  const pathname = usePathname()

  return (
    <select
      onChange={(e) => {
        if (e.target.value === 'pt-BR') {
          if (pathname.split('/')[1] === 'en') {
            const newUrl = pathname.split('/').slice(2).join('/')
            return router.push(`/${newUrl}`)
          }
        }
        return router.push(`/en/${pathname}`)
      }}
      value={lang === 'en' ? 'en-US' : 'pt-BR'}
      className="text-xs border-2 text-end appearance-none rounded outline-10 outline-indigo-500 cursor-pointer p-1"
    >
      <option value="pt-BR">pt-BR</option>
      <option value="en-US">en-US</option>
    </select>
  )
}
