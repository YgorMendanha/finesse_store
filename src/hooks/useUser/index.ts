import { useContextSelector } from 'use-context-selector'
import { context } from '@/context'

export function useUser() {
  const login = useContextSelector(context, (context) => context.Login)

  return {
    login
  }
}
