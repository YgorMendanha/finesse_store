export interface ContextType {
  state: State
  dispatch: React.Dispatch<Action>
  Login: (props: { user: string; password: string }) => void
}

export interface State {
  darkTheme: boolean
}

export type Action =
  | { type: 'darkTheme'; payload: boolean }
  | { type: 'LOADINGUSER'; payload: boolean }
