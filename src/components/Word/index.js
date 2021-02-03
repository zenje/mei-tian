import React, { useState, useEffect } from "react";
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

const formatDefinitions = (entries) => {
  return (
    <ul>
      {entries.map((entry) => (
        <li>
          [{entry.pinyin}] {entry.definitions.join(", ")}
        </li>
      ))}
    </ul>
  );
};

export default function Word(props) {
  const { word, wordDataProp } = props;
  const [isLoading, setIsLoading] = useState(props.isLoading);
  const [wordData, setWordData] = useState(wordDataProp);

  const handleData = (data) => {
    console.log("data", data);
    setWordData(data.word);
    setIsLoading(false);
  };

  useEffect(() => {
    if (word) {
      setIsLoading(true);
      fetch("/api/word/" + word)
        .then((res) => res.json())
        .then((data) => {
          console.log("word " + word, data);
          handleData(data);
        });
    }
  }, [word]);

  if (isLoading || !wordData) {
    return (
      <>
        {word && <h2>{word}</h2>}
        <div>...loading</div>
      </>
    );
  }

  return (
    <>
      <h2>
        {wordData.simp} | {wordData.trad}
      </h2>
      <div>{formatDefinitions(wordData.definition_entries)}</div>
      {wordData.hsk2 && <div>HSK2 - [ Level {wordData.hsk2} ]</div>}
      {wordData.hsk3 && <div>HSK3 - [ {wordData.hsk3} ]</div>}
      <div>-</div>
      {getSentences(wordData.sentences, wordData.simp)}
    </>
  );
}
