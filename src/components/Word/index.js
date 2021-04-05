import React, { useState, useEffect, useContext } from 'react';

import { useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { ADD_TO_HISTORY } from 'actions';
import Sentences from 'components/Sentences';
import WordCard from 'components/WordCard';
import { store } from 'store';

export default function Word(props) {
  const { word } = props;
  const [isLoading, setIsLoading] = useState(props.isLoading);
  const [wordData, setWordData] = useState(props.wordData);
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

  return (
    <>
      <WordCard
        accentColor={primary.main}
        hskColor={text.secondary}
        isLoading={isLoading}
        isSimplifiedMode={isSimplifiedMode}
        word={word}
        wordColor={primary.light}
        wordData={wordData}
      />
      <Sentences
        simplified={wordData.simp}
        traditional={wordData.trad}
        sentences={wordData.sentences}
        isSimplifiedMode={isSimplifiedMode}
        accentColor={secondary.light}
        chineseColor={primary.main}
        englishColor={text.secondary}
        pinyinColor={text.secondary}
      />
    </>
  );
}

Word.defaultProps = {
  isLoading: true,
  word: undefined,
  wordData: {},
};

Word.propTypes = {
  /**
   * `True` if word has not yet been loaded.
   */
  isLoading: PropTypes.bool,
  /**
   * String containing Chinese characters of word to fetch.
   * If not provided, `wordDataProp` should be passed in.
   */
  word: PropTypes.string,
  /**
   * Contains word data to display. If provided, this component
   * will display this word data; otherwise, word data will be
   * fetched from `word`.
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
