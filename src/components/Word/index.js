import React, { useState, useEffect, useContext } from 'react';

import CardContent from '@material-ui/core/CardContent';
import { useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { ADD_TO_HISTORY } from 'actions';
import { store } from 'store';

import { Definition, HskInfo, Sentence, WordCard, WordTitle } from './style';

const boldWordInSentence = (sentence, word) => {
  const index = sentence.indexOf(word);
  if (index > -1) {
    return (
      <span className="chinese">
        {sentence.slice(0, index)}
        <b>{word}</b>
        {sentence.slice(index + word.length)}
      </span>
    );
  }
  return sentence;
};

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
    return null;
  }

  return (
    <div>
      {sentences.slice(0, 5).map((item) => (
        <Sentence
          accentColor={accentColor}
          chineseColor={chineseColor}
          englishColor={englishColor}
          pinyinColor={pinyinColor}
        >
          <span className="english">{item.english}</span>
          <br />
          {boldWordInSentence(
            isSimplifiedMode ? item.simplified : item.traditional,
            word
          )}
          <br />
          <small className="pinyin">{item.pinyin}</small>
        </Sentence>
      ))}
    </div>
  );
};

const formatDefinitions = (entries, accentColor) => (
  <div>
    {entries.map((entry) => (
      <Definition accentColor={accentColor}>
        <b>[{entry.pinyin}]</b> {entry.definitions.join(', ')}
      </Definition>
    ))}
  </div>
);

const renderWordTitle = (word, color) => (
  <WordTitle color={color}>{word}</WordTitle>
);

// compares characters of `word1` and `word2`, displaying `word1` characters
// if different; otherwise, displays a '-' for characters that are the same
const getCharDifference = (word1, word2) => {
  let result = '';
  for (let i = 0; i < word1.length; i += 1) {
    if (word1[i] === word2[i]) {
      result += '—';
    } else {
      result += word1[i];
    }
  }
  return result;
};

const renderWord = (wordData, isSimplifiedMode, color) => {
  const { simp, trad } = wordData;
  let displayedWord;
  if (simp === trad) {
    displayedWord = simp;
  } else if (isSimplifiedMode) {
    const charDifference = getCharDifference(trad, simp);
    displayedWord = `${simp} [ ${charDifference} ]`;
  } else {
    const charDifference = getCharDifference(simp, trad);
    displayedWord = `${trad} [ ${charDifference} ]`;
  }
  return renderWordTitle(displayedWord, color);
};

const renderHskInfo = (wordData, color) => (
  <HskInfo color={color}>
    {wordData.hsk2 && (
      <div>
        <small>
          <b>HSK2</b> - [ Level
          {wordData.hsk2} ]
        </small>
      </div>
    )}
    {wordData.hsk3 && (
      <div>
        <small>
          <b>HSK3</b> - [{wordData.hsk3} ]
        </small>
      </div>
    )}
  </HskInfo>
);

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
    console.log('data', data);
    setWordData(data.word);
    setIsLoading(false);
    dispatch({ type: ADD_TO_HISTORY, word: data.word });
  };

  useEffect(() => {
    if (word) {
      setIsLoading(true);
      fetch(`/api/word/${word}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(`word ${word}`, data);
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
          {renderHskInfo(wordData, text.secondary)}
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

Word.defaultProps = {
  isLoading: true,
  word: undefined,
  wordDataProp: {},
};

Word.propTypes = {
  /**
   * True if word has not yet been loaded.
   */
  isLoading: PropTypes.bool,
  /**
   * String containing Chinese characters of word to fetch.
   * If not provided, `wordData` should be passed in.
   */
  word: PropTypes.string,
  /**
   * Contains word data to display. If provided, this component
   * will display this word data; otherwise, word data will be
   * fetched from `word`.
   */
  wordDataProp: PropTypes.shape({
    simp: PropTypes.string.isRequired,
    trad: PropTypes.string.isRequired,
    definition_entries: PropTypes.arrayOf(
      PropTypes.shape({
        pinyin: PropTypes.string.isRequired,
        definitions: PropTypes.arrayOf(PropTypes.string),
      })
    ),
  }),
};
