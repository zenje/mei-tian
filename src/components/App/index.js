import React, { useState } from "react";
import "./style.css";
import Word from "components/Word";
import WordGrid from "components/WordGrid";

export default function App() {
  const [showWord, setShowWord] = useState(true);
  const toggle = () => {
    setShowWord(!showWord);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={toggle}>toggle</button>
        {showWord && <Word />}
        {!showWord && <WordGrid />}
      </header>
    </div>
  );
}
