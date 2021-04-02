import React from 'react';

import WordGrid from 'components/WordGrid';

import { HSK3 } from '../../constants';

export default function HSK3Grid() {
  const levels = HSK3.LEVELS;
  const selectedLevel = levels[0].value;

  return (
    <>
      <WordGrid
        endpoint={HSK3.ENDPOINT}
        levels={levels}
        selectedLevel={selectedLevel}
        title={HSK3.TITLE}
      />
    </>
  );
}
