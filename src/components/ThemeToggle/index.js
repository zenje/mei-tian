import React, { useContext } from 'react';

import IconButton from '@material-ui/core/IconButton';
import MoonIcon from '@material-ui/icons/Brightness2Rounded';
import SunIcon from '@material-ui/icons/WbSunnyRounded';

import { TOGGLE_THEME } from 'actions';
import { store } from 'store';

import { Wrapper } from './style';

export default function ThemeToggle() {
  const context = useContext(store);
  const { state, dispatch } = context;
  const { isLightMode } = state;

  const icon = isLightMode ? <MoonIcon /> : <SunIcon />;
  const toggle = () => dispatch({ type: TOGGLE_THEME });
  return (
    <Wrapper>
      <IconButton color="inherit" onClick={toggle}>
        {icon}
      </IconButton>
    </Wrapper>
  );
}
