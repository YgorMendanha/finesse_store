import { useContextSelector } from 'use-context-selector'
import { context } from '@/context'

export function useLoading() {
  const userLoading = useContextSelector(context, (context) => context.state.loading.userLoading)

  return {
    userLoading
  }
}
