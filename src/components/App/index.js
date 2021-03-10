import React from "react";
import Navigation from "components/Navigation";
import Routes from "components/Routes";
import { Container, Main, ToolbarSpacing } from "./style";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import { StateProvider } from "store";

export default function App() {
  return (
    <Container>
      <StateProvider>
        <Router>
          <CssBaseline />
          <Navigation content={<Content />} />
        </Router>
      </StateProvider>
    </Container>
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
