import React, { useContext } from 'react';

import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/ClearRounded';

import { CLEAR_HISTORY } from 'actions';
import WordListView from 'components/WordListView';
import { store } from 'store';

import { StyledSearchIcon as SearchIcon } from './style';

const showHistory = (history, clearHistory) =>
  !history || !history.length ? (
    <div>
      <SearchIcon /> <span>No history available. Search for some words!</span>
    </div>
  ) : (
    <div>
      <WordListView wordData={history} />
      <div>
        <Button
          onClick={clearHistory}
          variant="outlined"
          color="secondary"
          startIcon={<ClearIcon />}
        >
          clear history
        </Button>
      </div>
    </div>
  );

export default function History() {
  const context = useContext(store);
  const { state, dispatch } = context;
  const { history } = state;

  const clearHistory = () => dispatch({ type: CLEAR_HISTORY });

  return (
    <>
      <h2>History</h2>
      {showHistory(history, clearHistory)}
    </>
  );
}
