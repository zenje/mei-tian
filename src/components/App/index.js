import React, { useState } from "react";
import "./style.css";
import Navigation from "components/Navigation";
import Routes from "components/Routes";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import styled from "styled-components";

export const Main = styled.div`
  flex-grow: 1;
  padding: 1rem;
`;
export const ToolbarSpacing = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 2rem;
`;

export default function App() {
  return (
    <div className="App">
      <Router>
        <CssBaseline />
        <Navigation />
        <header className="App-header">
          <Main>
            <ToolbarSpacing />
            <Routes />
          </Main>
        </header>
      </Router>
    </div>
  );
}
