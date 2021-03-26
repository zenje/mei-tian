import React from 'react';

import WordGrid from 'components/WordGrid';

import { HSK2_TITLE, HSK2_LEVELS } from '../../constants';

export default function HSK2Grid() {
  const endpoint = '/api/hsk2/';
  const selectedLevel = HSK2_LEVELS[0].value;

  return (
    <>
      <WordGrid
        endpoint={endpoint}
        levels={HSK2_LEVELS}
        selectedLevel={selectedLevel}
        title={HSK2_TITLE}
      />
    </>
  );
}
