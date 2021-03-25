import React, { useState, useEffect, useContext } from "react";
import CardContent from "@material-ui/core/CardContent";
import { useTheme } from "@material-ui/core/styles";
import { ADD_TO_HISTORY } from "actions";
import { store } from "store";

import { Definition, Sentence, WordCard, WordTitle } from "./style";

const getSentences = (
  sentences,
  simp,
  trad,
  isSimplifiedMode,
  accentColor,
  chineseColor,
  englishColor,
  pinyinColor
) => {
  const word = isSimplifiedMode ? simp : trad;
  if (!sentences || !sentences.length || !word) {
    return;
  }

  return (
    <div>
      {sentences.slice(0, 5).map((item, index) => (
        <Sentence
          accentColor={accentColor}
          chineseColor={chineseColor}
          englishColor={englishColor}
          pinyinColor={pinyinColor}
        >
          <span class="english">{item.english}</span>
          <br />
          {boldWordInSentence(
            isSimplifiedMode ? item.simplified : item.traditional,
            word
          )}
          <br />
          <small class="pinyin">{item.pinyin}</small>
        </Sentence>
      ))}
    </div>
  );
};

const boldWordInSentence = (sentence, word) => {
  const index = sentence.indexOf(word);
  if (index > -1) {
    return (
      <span class="chinese">
        {sentence.slice(0, index)}
        <b>{word}</b>
        {sentence.slice(index + word.length)}
      </span>
    );
  }
  return sentence;
};

const formatDefinitions = (entries, accentColor) => {
  return (
    <div>
      {entries.map((entry) => (
        <Definition accentColor={accentColor}>
          <b>[{entry.pinyin}]</b> {entry.definitions.join(", ")}
        </Definition>
      ))}
    </div>
  );
};

const renderWord = (wordData, isSimplifiedMode, color) => {
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
  return renderWordTitle(displayedWord, color);
};

const renderWordTitle = (word, color) => (
  <WordTitle color={color}>{word}</WordTitle>
);

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
  const theme = useTheme();
  const { primary, secondary, text } = theme.palette;

  const context = useContext(store);
  const { state, dispatch } = context;
  const { isSimplifiedMode } = state;

  const handleData = (data) => {
    console.log("data", data);
    const { word } = data;
    setWordData(word);
    setIsLoading(false);
    dispatch({ type: ADD_TO_HISTORY, word });
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
        <WordCard>
          <CardContent>
            {word && renderWordTitle(word, primary.light)}
            <div>...loading</div>
          </CardContent>
        </WordCard>
      </>
    );
  }

  return (
    <>
      <WordCard>
        <CardContent>
          {renderWord(wordData, isSimplifiedMode, primary.light)}
          {formatDefinitions(wordData.definition_entries, primary.main)}
          <br />
          {wordData.hsk2 && (
            <div>
              <small>HSK2 - [ Level {wordData.hsk2} ]</small>
            </div>
          )}
          {wordData.hsk3 && (
            <div>
              <small>HSK3 - [ {wordData.hsk3} ]</small>
            </div>
          )}
        </CardContent>
      </WordCard>
      {getSentences(
        wordData.sentences,
        wordData.simp,
        wordData.trad,
        isSimplifiedMode,
        secondary.light,
        primary.main,
        text.secondary,
        text.secondary
      )}
    </>
  );
}
