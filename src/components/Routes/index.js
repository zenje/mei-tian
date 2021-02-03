import React from "react";
import { Switch, Route } from "react-router-dom";
import RandomWord from "components/RandomWord";
import Word from "components/Word";
import WordGrid from "components/WordGrid";
import { useParams } from "react-router-dom";

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
        <WordWithParams />
      </Route>
    </Switch>
  );
}

const WordWithParams = () => {
  const { word } = useParams();
  return <Word word={word} isLoading={true} />;
};
