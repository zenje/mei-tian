import React, { useState } from "react";
import Navigation from "components/Navigation";
import Routes from "components/Routes";
import { Container, Main, ToolbarSpacing } from "./style";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

export default function App() {
  return (
    <Container>
      <Router>
        <CssBaseline />
        <Navigation content={<Content />} />
      </Router>
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
