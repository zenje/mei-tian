import React from 'react';

import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';

import { Definition, HskInfo, StyledCard as Card, WordTitle } from './style';

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

export default function WordCard(props) {
  const {
    accentColor,
    hskColor,
    isLoading,
    isSimplifiedMode,
    word,
    wordColor,
    wordData,
  } = props;

  if (isLoading || !wordData) {
    return (
      <Card>
        <CardContent>
          {word && renderWordTitle(word, wordColor)}
          <div>...loading</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        {renderWord(wordData, isSimplifiedMode, wordColor)}
        {formatDefinitions(wordData.definition_entries, accentColor)}
        <br />
        {renderHskInfo(wordData, hskColor)}
      </CardContent>
    </Card>
  );
}

WordCard.defaultProps = {
  accentColor: '',
  hskColor: '',
  isLoading: true,
  isSimplifiedMode: true,
  word: '',
  wordColor: '',
  wordData: {},
};

WordCard.propTypes = {
  /**
   * Font color of pinyin in definitions.
   */
  accentColor: PropTypes.string,
  /**
   * Font color of HSK tags.
   */
  hskColor: PropTypes.string,
  /**
   * `True` if word has not yet been loaded.
   */
  isLoading: PropTypes.bool,
  /**
   * `True` if app is in simplified Chinese text mode.
   */
  isSimplifiedMode: PropTypes.bool,
  /**
   * Title word to display.
   */
  word: PropTypes.string,
  /**
   * Font color of title word.
   */
  wordColor: PropTypes.string,
  /**
   * Contains word data of word to display.
   */
  wordData: PropTypes.shape({
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
