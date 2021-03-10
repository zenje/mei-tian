import React, { useState, useEffect, useContext } from "react";

import { store } from "store";

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
        <div>
          <b>[{entry.pinyin}]</b> {entry.definitions.join(", ")}
        </div>
      ))}
    </ul>
  );
};

const renderWord = (wordData, isSimplifiedMode) => {
  const { simp, trad } = wordData;
  let displayedWord;
  if (simp === trad) {
    displayedWord = simp;
  } else if (isSimplifiedMode) {
    let charDifference = getCharDifference(trad, simp);
    displayedWord = `${simp} [ ${charDifference} ]`;
  } else {
    let charDifference = getCharDifference(simp, trad);
    displayedWord = `${trad} [ ${charDifference} ]`;
  }
  return <h2>{displayedWord}</h2>;
};

// compares characters of `word1` and `word2`, displaying `word1` characters
// if different; otherwise, displays a '-' for characters that are the same
const getCharDifference = (word1, word2) => {
  let result = "";
  for (let i = 0; i < word1.length; i++) {
    if (word1[i] === word2[i]) {
      result += "—";
    } else {
      result += word1[i];
    }
  }
  return result;
};

export default function Word(props) {
  const { word, wordDataProp } = props;
  const [isLoading, setIsLoading] = useState(props.isLoading);
  const [wordData, setWordData] = useState(wordDataProp);

  const context = useContext(store);
  const { state } = context;
  const { isSimplifiedMode } = state;

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
      {renderWord(wordData, isSimplifiedMode)}
      <div>{formatDefinitions(wordData.definition_entries)}</div>
      {wordData.hsk2 && <div>HSK2 - [ Level {wordData.hsk2} ]</div>}
      {wordData.hsk3 && <div>HSK3 - [ {wordData.hsk3} ]</div>}
      <div>-</div>
      {getSentences(wordData.sentences, wordData.simp)}
    </>
  );
}
