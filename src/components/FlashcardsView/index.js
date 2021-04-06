import React, { useState } from 'react';

import Button from '@material-ui/core/Button';

import FlashcardsForm from 'components/FlashcardsForm';

export default function FlashcardsView() {
  const handleData = (data) => {
    console.log('GET_FLASHCARDS DATA', data);
  };
  const fetchFlashcards = () => {
    const endpoint = '/api/get_flashcards';
    fetch(endpoint)
      .then((res) => res.json())
      .then(handleData);
  };

  return (
    <>
      <FlashcardsForm />
      <Button onClick={fetchFlashcards}>Get Flashcards!</Button>
    </>
  );
}
