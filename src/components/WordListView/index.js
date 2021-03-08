import React from "react";

import { StyledLink as Link, Word } from "./style";

export default function WordListView(props) {
  const { isSimplifiedMode, wordData } = props;

  return (
    <div>
      {wordData.map((word) => (
        <Word>
          {renderWord(isSimplifiedMode, word)}
          {formatDefinitions(word.definition_entries)}
        </Word>
      ))}
    </div>
  );
}

const renderWord = (isSimplifiedMode, word) => {
  const wordChars = isSimplifiedMode ? word.simp : word.trad;
  return (
    <div class="word">
      <Link to={`/word/${word.simp}`}>{wordChars}</Link>
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
