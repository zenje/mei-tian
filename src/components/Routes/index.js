import React from "react";
import { Switch, Route } from "react-router-dom";
import HSK2Grid from "components/HSK2Grid";
import HSK3Grid from "components/HSK3Grid";
import RandomWord from "components/RandomWord";
import Word from "components/Word";
import { useParams } from "react-router-dom";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <RandomWord />
      </Route>
      <Route path="/hsk2">
        <HSK2Grid />
      </Route>
      <Route path="/hsk3">
        <HSK3Grid />
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
