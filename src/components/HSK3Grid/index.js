import React from "react";
import WordGrid from "components/WordGrid";

export default function HSK3Grid(props) {
  const endpoint = "/api/hsk3/";
  const levels = ["Entry", "Intermediate", "Advanced", "Supplemental"];
  const selectedLevel = "Entry";
  const title = "HSK 3.0";

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
