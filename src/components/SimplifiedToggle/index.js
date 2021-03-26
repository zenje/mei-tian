import React, { useContext } from 'react';

import Button from '@material-ui/core/Button';

import { TOGGLE_SIMPLIFIED_MODE } from 'actions';
import { store } from 'store';

import { Wrapper } from './style';

export default function SimplifiedToggle() {
  const context = useContext(store);
  const { state, dispatch } = context;
  const { isSimplifiedMode } = state;

  const char = isSimplifiedMode ? '繁' : '简';
  const toggle = () => dispatch({ type: TOGGLE_SIMPLIFIED_MODE });
  return (
    <Wrapper>
      <Button color="inherit" size="large" onClick={toggle}>
        {char}
      </Button>
    </Wrapper>
  );
}
