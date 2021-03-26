import React, { useContext } from "react";
import { store } from "store";
import { CLEAR_HISTORY } from "actions";
import Button from "@material-ui/core/Button";
import WordListView from "components/WordListView";
import ClearIcon from "@material-ui/icons/ClearRounded";
//import SearchIcon from '@material-ui/icons/Search';
import { StyledSearchIcon as SearchIcon } from "./style";

export default function History(props) {
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

const showHistory = (history, clearHistory) => {
  return !history || !history.length ? (
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
};
