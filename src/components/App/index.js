import React, { useState } from "react";
import "./style.css";
import Navigation from "components/Navigation";
import Routes from "components/Routes";
import { BrowserRouter as Router } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

export default function App() {
  return (
    <div className="App">
      <Router>
        <CssBaseline />
        <Navigation />
        <header className="App-header">
          <div>
            <Routes />
          </div>
        </header>
      </Router>
    </div>
  );
}
