import React from "react";
import WordGrid from "components/WordGrid";

export default function HSK2Grid(props) {
  const endpoint = "/api/hsk2/";
  const levels = [1, 2, 3, 4, 5, 6];
  const selectedLevel = 1;
  const title = "HSK 2.0";

  return (
    <>
      <WordGrid
        endpoint={endpoint}
        levels={levels}
        selectedLevel={selectedLevel}
        title={title}
      />
    </>
  );
}
