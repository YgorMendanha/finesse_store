import { useContextSelector } from 'use-context-selector'
import { context } from '@/context'

export function useUser() {
  const createUser = useContextSelector(context, (context) => context.CreateUser)
  const loginUser = useContextSelector(context, (context) => context.LoginUser)
  const logoutUser = useContextSelector(context, (context) => context.LogoutUser)
  const updateUser = useContextSelector(context, (context) => context.EditUser)

  const user = useContextSelector(context, (context) => context.state.user)

  return {
    createUser,
    loginUser,
    user,
    updateUser,
    logoutUser
  }
}
