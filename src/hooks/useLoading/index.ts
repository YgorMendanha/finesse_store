import { useContextSelector } from 'use-context-selector'
import { context } from '@/context'

export function useLoading() {
  const userLoading = useContextSelector(context, (context) => context.state.loading.userLoading)
  const cartLoading = useContextSelector(context, (context) => context.state.loading.cartLoading)

  return {
    userLoading,
    cartLoading
  }
}
