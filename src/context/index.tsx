'use client'

import { useCallback, useEffect, useReducer } from 'react'
import { createContext } from 'use-context-selector'
import Reducers from './reducer'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Product } from '@/server/products'
import { ContextType, State } from '@/types'
import { ProductInterface } from '@/types/products'

const intialState: State = {
  favoriteProducts: []
}

export const context = createContext({} as ContextType)

export function ContextProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = useReducer(Reducers, intialState)
  const [favoriteProductsStorage, setFavoriteProductsStorage] = useLocalStorage<ProductInterface[]>(
    'Y.M.-favoriteProducts',
    []
  )

  useEffect(() => {
    if (favoriteProductsStorage) {
      dispatch({
        type: 'FAVORITE_PRODUCT',
        payload: favoriteProductsStorage
      })
    }
  }, [])

  // favorite products
  const ChangeFavoriteProducts = useCallback(
    async (product: ProductInterface) => {
      try {
        const favoriteProducts: ProductInterface[] = favoriteProductsStorage
        const removeFavoriteProducts = favoriteProductsStorage.find((f) => f.id === product.id)

        if (removeFavoriteProducts) {
          const newFavoriteProducts = favoriteProductsStorage.filter(
            (favProduct) => favProduct.id !== product.id
          )
          setFavoriteProductsStorage(newFavoriteProducts)
          dispatch({
            type: 'FAVORITE_PRODUCT',
            payload: newFavoriteProducts
          })
          return
        }
        setFavoriteProductsStorage([...favoriteProducts, product])
        dispatch({
          type: 'FAVORITE_PRODUCT',
          payload: [...favoriteProducts, product]
        })
        return
      } catch (e) {
        console.log(e)
      }
    },
    [favoriteProductsStorage]
  )

  return (
    <context.Provider
      value={{
        state,
        dispatch,
        ChangeFavoriteProducts
      }}
    >
      {children}
    </context.Provider>
  )
}
