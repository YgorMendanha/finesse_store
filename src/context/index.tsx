'use client'

import { useCallback, useEffect, useReducer } from 'react'
import { createContext } from 'use-context-selector'
import Reducers from './reducer'
import { Notification } from '@/components/partials'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { User } from '@/server/user'
import { ContextType, ProductInterface, State, UserInterface } from '@/types'

const intialState: State = {
  favoriteProducts: [],
  user: {} as UserInterface,
  loading: { userLoading: false }
}

export const context = createContext({} as ContextType)

export function ContextProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = useReducer(Reducers, intialState)
  const [favoriteProductsStorage, setFavoriteProductsStorage] = useLocalStorage<ProductInterface[]>(
    'Y.M.Finesse-favoriteProducts',
    []
  )
  const [userStorage, setUserStorage] = useLocalStorage<UserInterface>(
    'Y.M.Finesse-User',
    {} as UserInterface
  )

  useEffect(() => {
    if (favoriteProductsStorage.length > 0) {
      dispatch({
        type: 'FAVORITE_PRODUCT',
        payload: favoriteProductsStorage
      })
    }
    if (userStorage.id) {
      dispatch({
        type: 'USER',
        payload: userStorage
      })
    } else if (window.sessionStorage.getItem('Y.M.Finesse-User')) {
      dispatch({
        type: 'USER',
        payload: JSON.parse(window.sessionStorage.getItem('Y.M.Finesse-User')!)
      })
    }
  }, [])

  // user
  const LoginUser = useCallback(
    async (props: { data: { email: string; password: string }; saveLogin: boolean }) => {
      LoadingChange('user', true)
      try {
        const response = await User.Login(props.data)

        if (!response?.data?.id) {
          if (response.code === '401') {
            Notification.user({ content: 'Informaçoes invalidas', type: 'error' })
          }
          return LoadingChange('user', false)
        }
        if (props.saveLogin) {
          setUserStorage(response.data)
          dispatch({
            type: 'USER',
            payload: response.data
          })
        } else {
          window.sessionStorage.setItem('Y.M.Finesse-User', JSON.stringify(response.data))
          dispatch({
            type: 'USER',
            payload: response.data
          })
        }
        Notification.user({ content: `Bem vindo ${response.data.name}`, type: 'success' })
      } catch (error) {
        console.log(error)
        Notification.user({ content: 'Não conseguimos realizar seu login :(', type: 'info' })
      }
      LoadingChange('user', false)
    },
    []
  )

  const LogoutUser = useCallback(async () => {
    LoadingChange('user', true)
    dispatch({
      type: 'USER',
      payload: {} as UserInterface
    })
    window.localStorage.removeItem('Y.M.Finesse-User')
    window.sessionStorage.removeItem('Y.M.Finesse-User')
    LoadingChange('user', false)
  }, [])

  const CreateUser = useCallback(
    async (props: {
      data: { name: string; email: string; password: string; cellphone: string }
      saveLogin: boolean
    }) => {
      LoadingChange('user', true)
      try {
        const response = await User.Create(props.data)
        if (response.code !== '201') {
          if (response.code === 'P2002' && Array.isArray(response.message)) {
            LoadingChange('user', false)
            return response.message.map((input) =>
              Notification.user({
                content: `Parece que já existe um ${input} cadastrado`,
                type: 'error'
              })
            )
          }
        }
        if (props.saveLogin) {
          setUserStorage(response.data)
          dispatch({
            type: 'USER',
            payload: response.data
          })
        } else {
          window.sessionStorage.setItem('Y.M.Finesse-User', JSON.stringify(response.data))
          dispatch({
            type: 'USER',
            payload: response.data
          })
        }
      } catch (error) {
        Notification.user({ content: 'Não conseguimos criar seu usuario :(', type: 'info' })
      }
      LoadingChange('user', false)
    },
    []
  )

  const EditUser = useCallback(
    async (
      id: number,
      props: {
        name: string
        email: string
        oldpassword: string
        newpassword: string
        cellphone: string
      }
    ) => {
      LoadingChange('user', true)
      try {
        const response = await User.Edit(id, {
          ...props,
          oldpassword: Buffer.from(props.oldpassword).toString('base64'),
          newpassword: Buffer.from(props.newpassword).toString('base64')
        })
        if (!response?.data?.id) {
          if (response.code === '401') {
            Notification.user({ content: 'Informações invalidas', type: 'error' })
          }
          return LoadingChange('user', false)
        }
        dispatch({
          type: 'USER',
          payload: response.data
        })
        Notification.user({ content: 'Informações atualizadas', type: 'success' })
      } catch (error) {
        Notification.user({ content: 'Não conseguimos realizar seu login :(', type: 'info' })
      }
      LoadingChange('user', false)
    },
    []
  )

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

  // loading
  const LoadingChange = useCallback(
    (loading: 'user', newState: boolean) => {
      switch (loading) {
        case 'user':
          dispatch({
            type: 'LOADING',
            payload: { ...state.loading, userLoading: newState }
          })
          return

        default:
          return
      }
    },
    [state.loading.userLoading]
  )

  return (
    <context.Provider
      value={{
        state,
        dispatch,
        ChangeFavoriteProducts,
        CreateUser,
        LoginUser,
        EditUser,
        LogoutUser
      }}
    >
      {children}
    </context.Provider>
  )
}
