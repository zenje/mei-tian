import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';

import Navigation from 'components/Navigation';
import Routes from 'components/Routes';
import { StateProvider } from 'store';
import { theme } from 'theme';

import { Container, Main, ToolbarSpacing } from './style';

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Container>
        <StateProvider>
          <Router>
            <CssBaseline />
            <Navigation content={<Content />} />
          </Router>
        </StateProvider>
      </Container>
    </MuiThemeProvider>
  );
}

const Content = () => (
  <Main>
    <ToolbarSpacing />
    <Routes />
  </Main>
);
