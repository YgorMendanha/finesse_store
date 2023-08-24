import { useContextSelector } from 'use-context-selector'
import { context } from '@/context'

export function useCart() {
  const createCart = useContextSelector(context, (context) => context.CreateCart)
  const updateCart = useContextSelector(context, (context) => context.UpdateCart)
  const addToCart = useContextSelector(context, (context) => context.AddToCart)

  const cart = useContextSelector(context, (context) => context.state.cart)

  return {
    createCart,
    cart,
    updateCart,
    addToCart
  }
}
