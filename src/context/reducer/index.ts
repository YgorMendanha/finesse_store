import { type Action, type State } from '@/types'

const Reducers = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FAVORITE_PRODUCT':
      return {
        ...state,
        favoriteProducts: action.payload
      }

    default:
      return state
  }
}

export default Reducers
