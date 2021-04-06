import React from 'react';

import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';

import { Definition, HskInfo, StyledCard as Card, WordTitle } from './style';

const formatDefinitions = (entries) => (
  <div>
    {entries.map((entry) => (
      <Definition>
        <b>[{entry.pinyin}]</b> {entry.definitions.join(', ')}
      </Definition>
    ))}
  </div>
);

const renderWordTitle = (word) => <WordTitle>{word}</WordTitle>;

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

const renderWord = (wordData, isSimplifiedMode) => {
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
  return renderWordTitle(displayedWord);
};

const renderHskInfo = (wordData) => (
  <HskInfo>
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
  const { isLoading, isSimplifiedMode, word, wordData } = props;

  if (isLoading || !wordData) {
    return (
      <Card>
        <CardContent>
          {word && renderWordTitle(word)}
          <div>...loading</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        {renderWord(wordData, isSimplifiedMode)}
        {formatDefinitions(wordData.definition_entries)}
        <br />
        {renderHskInfo(wordData)}
      </CardContent>
    </Card>
  );
}

WordCard.defaultProps = {
  isLoading: true,
  isSimplifiedMode: true,
  word: '',
  wordData: {},
};

WordCard.propTypes = {
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
