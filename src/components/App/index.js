import React from "react";
import Navigation from "components/Navigation";
import Routes from "components/Routes";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Container, Main, ToolbarSpacing } from "./style";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import { theme } from "theme";
import { StateProvider } from "store";

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

const Content = () => {
  return (
    <Main>
      <ToolbarSpacing />
      <Routes />
    </Main>
  );
};
