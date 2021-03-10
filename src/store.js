import React, { createContext, useReducer } from "react";

import { TOGGLE_SIMPLIFIED_MODE } from "actions";

const initialState = {
  isSimplifiedMode: true,
};
const store = createContext(initialState);
const { Provider } = store;

const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_SIMPLIFIED_MODE:
      const newState = {
        isSimplifiedMode: !state.isSimplifiedMode,
      };
      return newState;
    default:
      throw new Error();
  }
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // Provider's value to be passed to consuming components that are descendants of this Provider
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
