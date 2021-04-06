import React, { useContext } from 'react';

import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';

import { store } from 'store';

import { StyledLink as Link, Word, WordCard } from './style';

const formatDefinitions = (entries) => (
  <div className="definition">
    {entries.map((entry) => (
      <div>
        <b>[{entry.pinyin}]</b> {entry.definitions.join(', ')}
      </div>
    ))}
  </div>
);

const renderWordCard = (word, isSimplifiedMode) => {
  const displayedWord = isSimplifiedMode ? word.simp : word.trad;
  return (
    <Link to={`/word/${displayedWord}`}>
      <WordCard>
        <CardContent>
          <Word>
            <div className="word">{displayedWord}</div>
            {formatDefinitions(word.definition_entries)}
          </Word>
        </CardContent>
      </WordCard>
    </Link>
  );
};

export default function WordListView(props) {
  const { wordData } = props;

  const context = useContext(store);
  const { state } = context;
  const { isSimplifiedMode } = state;

  return (
    <div>{wordData.map((word) => renderWordCard(word, isSimplifiedMode))}</div>
  );
}

WordListView.propTypes = {
  /**
   * Array of words to display.
   */
  wordData: PropTypes.arrayOf(
    PropTypes.shape({
      simp: PropTypes.string.isRequired,
      trad: PropTypes.string.isRequired,
      definition_entries: PropTypes.arrayOf(
        PropTypes.shape({
          pinyin: PropTypes.string.isRequired,
          definitions: PropTypes.arrayOf(PropTypes.string),
        })
      ).isRequired,
    })
  ).isRequired,
};
