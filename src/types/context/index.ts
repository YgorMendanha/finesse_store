import { ProductInterface } from '../products'
import { UserInterface } from '../user'

export interface ContextType {
  state: State
  dispatch: React.Dispatch<Action>
  ChangeFavoriteProducts: (product: ProductInterface) => void
  CreateUser: (props: {
    data: { name: string; email: string; password: string; cellphone: string }
    saveLogin: boolean
  }) => void
  LoginUser: (props: { data: { email: string; password: string }; saveLogin: boolean }) => void
  LogoutUser: () => void
  EditUser: (
    id: number,
    props: {
      name: string
      email: string
      oldpassword: string
      newpassword: string
      cellphone: string
    }
  ) => void
}

export interface State {
  favoriteProducts: ProductInterface[]
  user: UserInterface
  loading: { userLoading: boolean }
}

export type Action =
  | { type: 'FAVORITE_PRODUCT'; payload: ProductInterface[] }
  | { type: 'USER'; payload: UserInterface }
  | { type: 'LOADING'; payload: { userLoading: boolean } }
