import React from "react";
import { Switch, Route } from "react-router-dom";
import RandomWord from "components/RandomWord";
import Word from "components/Word";
import WordGrid from "components/WordGrid";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <RandomWord />
      </Route>
      <Route path="/hsk2">
        <WordGrid />
      </Route>
      <Route path="/hsk3">
        <h2>HSK3</h2>
      </Route>
      <Route path="/word/:word">
        <Word />
      </Route>
    </Switch>
  );
}
