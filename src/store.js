import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import { ADD_TO_HISTORY, CLEAR_HISTORY, TOGGLE_SIMPLIFIED_MODE } from 'actions';

const initialState = {
  isSimplifiedMode: true,
  history: [],
};
const store = createContext(initialState);
const { Provider } = store;

const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_SIMPLIFIED_MODE:
      return {
        ...state,
        isSimplifiedMode: !state.isSimplifiedMode,
      };
    case ADD_TO_HISTORY:
      return {
        ...state,
        history: [...state.history, action.word],
      };
    case CLEAR_HISTORY:
      return {
        ...state,
        history: [],
      };
    default:
      throw new Error();
  }
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // Provider's value to be passed to consuming components that are descendants of this Provider
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

StateProvider.propTypes = {
  /**
   * Child elements to be wrapped by the StateProvider that will receive access to `state`, `dispatch`.
   */
  children: PropTypes.element.isRequired,
};

export { store, StateProvider };
