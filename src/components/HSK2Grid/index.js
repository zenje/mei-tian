import React from 'react';

import WordGrid from 'components/WordGrid';

import { HSK2 } from '../../constants';

export default function HSK2Grid() {
  const levels = HSK2.LEVELS;
  const selectedLevel = levels[0].value;

  return (
    <>
      <WordGrid
        endpoint={HSK2.ENDPOINT}
        levels={levels}
        selectedLevel={selectedLevel}
        title={HSK2.TITLE}
      />
    </>
  );
}
