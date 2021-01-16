import React, { useState, useEffect } from "react";
import "./App.css";

const getSentences = (sentences, word) => {
  if (!sentences || !sentences.length || !word) {
    return;
  }

  return (
    <div>
      {sentences.slice(0, 5).map((item, index) => (
        <p>
          {item.english}
          <br />
          {boldWordInSentence(item.chinese, word)}
        </p>
      ))}
    </div>
  );
};

const boldWordInSentence = (sentence, word) => {
  const index = sentence.indexOf(word);
  if (index > -1) {
    return (
      <>
        {sentence.slice(0, index)}
        <b>{word}</b>
        {sentence.slice(index + word.length)}
      </>
    );
  }
  return sentence;
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [wordData, setWordData] = useState(null);

  const handleData = (data) => {
    console.log("data", data);
    setWordData(data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetch("/api/randomWord")
      .then((res) => res.json())
      .then(handleData);
  }, []);

  if (isLoading || !wordData) {
    return (
      <div className="App">
        <header className="App-header">
          <h2>a random word of the day:</h2>
          <div>...loading</div>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>a random word of the day:</h2>
        <div>{`${wordData.word.simp} | ${wordData.word.trad}`}</div>
        <div>{wordData.definitions}</div>
        <br />
        {wordData.category && <div>[ {wordData.category} ]</div>}
        <br />
        {getSentences(wordData.sentences, wordData.word.simp)}
      </header>
    </div>
  );
}
