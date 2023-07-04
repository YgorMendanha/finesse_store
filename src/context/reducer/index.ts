import { type Action, type State } from "@/types";

const Reducers = (state: State, action: Action): State => {
  switch (action.type) {
    case "darkTheme":
      return {
        ...state,
        darkTheme: !state.darkTheme 
      };

    default:
      return state;
  }
};

export default Reducers;
