import React from 'react';

import PropTypes from 'prop-types';

import Sentence from './style';

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

export default function Sentences(props) {
  const {
    accentColor,
    chineseColor,
    englishColor,
    isSimplifiedMode,
    pinyinColor,
    simplified,
    traditional,
    sentences,
  } = props;
  if (!sentences || !sentences.length) {
    return null;
  }

  const word = isSimplifiedMode ? simplified : traditional;

  return (
    <div>
      {sentences.slice(0, 5).map((sentence) => (
        <Sentence
          accentColor={accentColor}
          chineseColor={chineseColor}
          englishColor={englishColor}
          pinyinColor={pinyinColor}
        >
          <span className="english">{sentence.english}</span>
          <br />
          {boldWordInSentence(
            isSimplifiedMode ? sentence.simplified : sentence.traditional,
            word
          )}
          <br />
          <small className="pinyin">{sentence.pinyin}</small>
        </Sentence>
      ))}
    </div>
  );
}

Sentences.defaultProps = {
  accentColor: '',
  chineseColor: '',
  englishColor: '',
  isSimplifiedMode: true,
  pinyinColor: '',
  sentences: [],
  simplified: '',
  traditional: '',
};

Sentences.propTypes = {
  /**
   * Font color of word bolded in sentence.
   */
  accentColor: PropTypes.string,
  /**
   * Font color of sentence in Chinese. (Not currently used.)
   */
  chineseColor: PropTypes.string,
  /**
   * Font color of sentence in English.
   */
  englishColor: PropTypes.string,
  /**
   * `True` if app is in simplified Chinese text mode.
   */
  isSimplifiedMode: PropTypes.bool,
  /**
   * Font color of pinyin sentence.
   */
  pinyinColor: PropTypes.string,
  /**
   * An array of sample sentences to display.
   */
  sentences: PropTypes.arrayOf(
    PropTypes.shape({
      simplified: PropTypes.string,
      traditional: PropTypes.string,
    })
  ),
  /**
   * The character in simplified form.
   */
  simplified: PropTypes.string,
  /**
   * The character in traditional form.
   */
  traditional: PropTypes.string,
};
