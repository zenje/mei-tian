import React from 'react';

import WordGrid from 'components/WordGrid';

import { HSK3_TITLE, HSK3_LEVELS } from '../../constants';

export default function HSK3Grid() {
  const endpoint = '/api/hsk3/';
  const selectedLevel = HSK3_LEVELS[0].value;

  return (
    <>
      <WordGrid
        endpoint={endpoint}
        levels={HSK3_LEVELS}
        selectedLevel={selectedLevel}
        title={HSK3_TITLE}
      />
    </>
  );
}
