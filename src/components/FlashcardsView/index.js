import React, { useState } from 'react';

import Button from '@material-ui/core/Button';

import DropdownMenu from 'components/DropdownMenu';

import {
  FLASHCARD_NUMBER_OPTIONS,
  HSK2,
  HSK3,
  HSK_OPTIONS,
} from '../../constants';

const getLevelDropdown = (hskType, levels, setLevels) => {
  if (!hskType) {
    return null;
  }
  const hsk = hskType === HSK2.VALUE ? HSK2 : HSK3;
  return (
    <DropdownMenu
      id="levels"
      allowMultipleSelect
      label={hsk.OPTIONS_LABEL}
      selected={levels}
      setSelected={setLevels}
      options={hsk.LEVELS}
    />
  );
};

const getControlledHskDropdowns = (hskType, setHskType, levels, setLevels) => {
  const handleHskTypeChange = (newValue, oldValue) => {
    setLevels([]); // clear values before setting hsk type
    setHskType(newValue);
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
      />
      {getLevelDropdown(hskType, levels, setLevels)}
    </>
  );
};

export default function FlashcardsView() {
  const [hskType, setHskType] = useState('');
  const [levels, setLevels] = useState([]);
  const [number, setNumber] = useState('');

  const onSubmit = (event) => {
    event.preventDefault(); // prevent page refresh
  };

  return (
    <>
      <h2>Flashcards</h2>
      <form onSubmit={onSubmit}>
        {getControlledHskDropdowns(hskType, setHskType, levels, setLevels)}
        <DropdownMenu
          id="numberOfCards"
          label="Number of Cards"
          options={FLASHCARD_NUMBER_OPTIONS}
          selected={number}
          setSelected={setNumber}
        />
        <br />
        <Button type="submit" variant="contained">
          Begin Test
        </Button>
      </form>
    </>
  );
}
