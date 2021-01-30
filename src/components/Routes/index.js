import React from "react";
import { Switch, Route } from "react-router-dom";
import Word from "components/Word";
import WordGrid from "components/WordGrid";

export default function Routes() {
  return (
    <Switch>
      <Route path="/hsk2">
        <WordGrid />
      </Route>
      <Route path="/hsk3">
        <h2>HSK3</h2>
      </Route>
      <Route path="/">
        <Word />
      </Route>
    </Switch>
  );
}
