import React, { useContext } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Navigation from 'components/Navigation';
import Routes from 'components/Routes';
import { StateProvider, store } from 'store';
import { getTheme } from 'theme';

import { Container, Main, ToolbarSpacing } from './style';

export default function App() {
  return (
    <StateProvider>
      <WrappedApp />
    </StateProvider>
  );
}

const WrappedApp = () => {
  // wrap app within StateProvider to access context
  const context = useContext(store);
  const { state } = context;
  const { isLightMode } = state;
  const theme = getTheme(isLightMode);

  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <Container>
            <Router>
              <CssBaseline />
              <Navigation content={<Content />} />
            </Router>
          </Container>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
};

const Content = () => (
  <Main>
    <ToolbarSpacing />
    <Routes />
  </Main>
);
