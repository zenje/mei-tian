import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [randomWord, setRandomWord] = useState("...loading");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetch("/api/randomWord")
      .then((res) => res.json())
      .then((data) => {
        setRandomWord(data.word);
        setCategory(data.category);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>a random word of the day:</h2>
        <div>{randomWord}</div>
        <br />
        {category && <div>[ {category} ]</div>}
      </header>
    </div>
  );
}

export default App;
