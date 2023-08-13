import { ProductInterface } from '../products'

export interface ContextType {
  state: State
  dispatch: React.Dispatch<Action>
  ChangeFavoriteProducts: (product: ProductInterface) => void
}

export interface State {
  favoriteProducts: ProductInterface[]
}

export type Action = { type: 'FAVORITE_PRODUCT'; payload: ProductInterface[] }
