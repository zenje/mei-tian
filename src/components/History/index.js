import React, { useContext } from "react";
import { store } from "store";
import { CLEAR_HISTORY } from "actions";
import WordListView from "components/WordListView";
import { StyledClearIcon as ClearIcon } from "./style";

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
    <div>history is empty!</div>
  ) : (
    <div>
      <WordListView wordData={history} />
      <div>
        <a onClick={clearHistory}>
          [<ClearIcon /> clear history ]
        </a>
      </div>
    </div>
  );
};
