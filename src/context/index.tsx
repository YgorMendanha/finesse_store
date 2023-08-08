'use client'

import { useCallback, useReducer } from 'react'
import { createContext } from 'use-context-selector'
import Reducers from './reducer'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { ContextType, State } from '@/types'

const intialState: State = {
  darkTheme: false
}

export const context = createContext({} as ContextType)

export function ContextProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = useReducer(Reducers, intialState)
  const [darkThemeStorage, setDarkThemeStorage] = useLocalStorage<boolean>('Y.M.-darkTheme', false)

  // User
  const Login = useCallback(async (loginProps: { user: string; password: string }) => {
    try {
      // const user = await User.login(loginProps)
    } catch (e) {
      console.log(e)
    }
  }, [])

  return (
    <context.Provider
      value={{
        state,
        dispatch,
        Login
      }}
    >
      {children}
    </context.Provider>
  )
}
