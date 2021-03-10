import React, { useContext } from "react";
import { store } from "store";
import { StyledLink as Link, Word } from "./style";

export default function WordListView(props) {
  const { wordData } = props;

  const context = useContext(store);
  const { state } = context;
  const { isSimplifiedMode } = state;

  return (
    <div>
      {wordData.map((word) => (
        <Word>
          {renderWord(word, isSimplifiedMode)}
          {formatDefinitions(word.definition_entries)}
        </Word>
      ))}
    </div>
  );
}

const renderWord = (word, isSimplifiedMode) => {
  const displayedWord = isSimplifiedMode ? word.simp : word.trad;
  return (
    <div class="word">
      <Link to={`/word/${displayedWord}`}>{displayedWord}</Link>
    </div>
  );
};

const formatDefinitions = (entries) => {
  return (
    <div class="definition">
      {entries.map((entry) => (
        <div>
          <b>[{entry.pinyin}]</b> {entry.definitions.join(", ")}
        </div>
      ))}
    </div>
  );
};
