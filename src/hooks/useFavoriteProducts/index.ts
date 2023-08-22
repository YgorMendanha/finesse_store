import { useContextSelector } from 'use-context-selector'
import { context } from '@/context'

export function useFavoriteProducts() {
  const changeFavoriteProducts = useContextSelector(
    context,
    (context) => context.ChangeFavoriteProducts
  )
  const favoriteProducts = useContextSelector(context, (context) => context.state.favoriteProducts)

  return {
    changeFavoriteProducts,
    favoriteProducts
  }
}
