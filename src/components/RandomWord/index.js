import React, { useState, useEffect } from 'react';

import Word from 'components/Word';

import { StyledRefreshIcon as RefreshIcon } from './style';

export default function RandomWord() {
  const [isLoading, setIsLoading] = useState(true);
  const [wordData, setWordData] = useState(null);

  const handleData = (data) => {
    setWordData(data.word);
    setIsLoading(false);
  };

  const fetchRandomWord = () => {
    setIsLoading(true);
    fetch('/api/randomWord')
      .then((res) => res.json())
      .then(handleData);
  };

  const refreshHandler = () => {
    fetchRandomWord();
  };

  useEffect(() => {
    fetchRandomWord();
  }, []);

  if (isLoading || !wordData) {
    return (
      <>
        <h2>a random word of the day:</h2>
        <div>...loading</div>
      </>
    );
  }

  return (
    <>
      <h2>
        a random word of the day:{' '}
        <RefreshIcon
          onClick={() => refreshHandler()}
          fontSize="large"
          color="text"
        />
      </h2>
      <Word wordData={wordData} isLoading={isLoading} />
    </>
  );
}
