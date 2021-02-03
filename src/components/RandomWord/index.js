import React, { useState, useEffect } from "react";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useParams } from "react-router-dom";

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
          <br />
          {item.pinyin}
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

export default function Word() {
  const [isLoading, setIsLoading] = useState(true);
  const [wordData, setWordData] = useState(null);

  const handleData = (data) => {
    console.log("data", data);
    setWordData(data.word);
    setIsLoading(false);
  };

  const refreshHandler = () => {
    setIsLoading(true);
    fetch("/api/randomWord")
      .then((res) => res.json())
      .then(handleData);
  };

  useEffect(() => {
    fetch("/api/randomWord")
      .then((res) => res.json())
      .then(handleData);
  }, []);

  if (isLoading || !wordData) {
    return (
      <header className="App-header">
        <h2>a random word of the day:</h2>
        <div>...loading</div>
      </header>
    );
  }

  return (
    <>
      <h2>a random word of the day:</h2>
      <RefreshIcon
        onClick={() => refreshHandler()}
        fontSize="large"
        style={{ fill: "white" }}
      />
      <br />
      <div>{`${wordData.word.simp} | ${wordData.word.trad}`}</div>
      <div>{wordData.definitions}</div>
      <br />
      {wordData.category && <div>[ {wordData.category} ]</div>}
      <br />
      {getSentences(wordData.sentences, wordData.word.simp)}
    </>
  );
}
