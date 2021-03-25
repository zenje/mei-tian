import React from "react";
import Navigation from "components/Navigation";
import Routes from "components/Routes";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Container, Main, ToolbarSpacing } from "./style";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import { StateProvider } from "store";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    text: {
      main: "#FFFFFF",
    },
  },
  /*overrides: {
    MuiPaper: {
      root: {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          color: 'rgba(255, 255, 255, 0.75)',
      },
    },
  }*/
});

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
