import React, { useState } from 'react';

import Button from '@material-ui/core/Button';

import DropdownMenu from 'components/DropdownMenu';

import {
  FLASHCARD_NUMBER_OPTIONS,
  HSK2,
  HSK3,
  HSK_OPTIONS,
} from '../../constants';

const getLevelDropdown = (
  hskType,
  levels,
  setLevels,
  errorMessage,
  setErrorMessage
) => {
  if (!hskType) {
    return null;
  }

  const onChange = () => {
    setErrorMessage({
      ...errorMessage,
      levels: undefined,
    });
  };

  const hsk = hskType === HSK2.VALUE ? HSK2 : HSK3;
  return (
    <DropdownMenu
      id="levels"
      allowMultipleSelect
      label={hsk.OPTIONS_LABEL}
      selected={levels}
      setSelected={setLevels}
      options={hsk.LEVELS}
      onChange={onChange}
      error={!!errorMessage.levels}
      errorMessage={errorMessage.levels}
    />
  );
};

const getControlledHskDropdowns = (
  hskType,
  setHskType,
  levels,
  setLevels,
  errorMessage,
  setErrorMessage
) => {
  const handleHskTypeChange = (newValue, oldValue) => {
    // clear values before setting hsk type
    setLevels([]);
    setHskType(newValue);
    setErrorMessage({
      ...errorMessage,
      hskType: undefined,
      levels: undefined,
    });
  };

  return (
    <>
      <DropdownMenu
        id="hskType"
        label="HSK Type"
        onChange={handleHskTypeChange}
        selected={hskType}
        setSelected={setHskType}
        options={HSK_OPTIONS}
        error={!!errorMessage.hskType}
        errorMessage={errorMessage.hskType}
      />
      {getLevelDropdown(
        hskType,
        levels,
        setLevels,
        errorMessage,
        setErrorMessage
      )}
    </>
  );
};

const getNumberDropdown = (
  number,
  setNumber,
  errorMessage,
  setErrorMessage
) => {
  const onChange = () => {
    setErrorMessage({
      ...errorMessage,
      number: undefined,
    });
  };
  return (
    <DropdownMenu
      id="numberOfCards"
      label="Number of Cards"
      options={FLASHCARD_NUMBER_OPTIONS}
      selected={number}
      setSelected={setNumber}
      error={!!errorMessage.number}
      errorMessage={errorMessage.number}
      onChange={onChange}
    />
  );
};

export default function FlashcardsForm() {
  const [hskType, setHskType] = useState('');
  const [levels, setLevels] = useState([]);
  const [number, setNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState({});

  const handleData = (data) => {
    console.log('DATA', data);
  };
  const fetchFlashcards = () => {
    let endpoint = `/api/flashcards?hsk=${hskType}&number=${number}`;
    levels.forEach((level) => {
      endpoint += `&level=${level}`;
    });
    fetch(endpoint)
      .then((res) => res.json())
      .then(handleData);
  };

  const validate = () => {
    let hasError = false;
    const newErrorMessage = {};
    if (!hskType) {
      hasError = true;
      newErrorMessage.hskType = 'Please choose an HSK type.';
    }
    if (!levels.length) {
      hasError = true;
      newErrorMessage.levels = 'Please select levels.';
    }
    if (!number) {
      hasError = true;
      newErrorMessage.number = 'Please select a number.';
    }
    setErrorMessage(newErrorMessage);
    return hasError;
  };

  const onSubmit = (event) => {
    event.preventDefault(); // prevent page refresh
    if (!validate()) {
      fetchFlashcards();
    }
  };

  return (
    <>
      <h2>Flashcards</h2>
      <form onSubmit={onSubmit}>
        {getControlledHskDropdowns(
          hskType,
          setHskType,
          levels,
          setLevels,
          errorMessage,
          setErrorMessage
        )}
        {getNumberDropdown(number, setNumber, errorMessage, setErrorMessage)}
        <br />
        <Button type="submit" variant="contained">
          Begin Test
        </Button>
      </form>
    </>
  );
}
