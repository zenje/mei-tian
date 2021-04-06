import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';

const CustomSelect = (props) => {
  const {
    allowMultipleSelect,
    children,
    handleDelete,
    handleSelect,
    id,
    options,
    selected,
  } = props;
  if (!allowMultipleSelect) {
    return (
      <Select id={id} value={selected} onChange={handleSelect}>
        {children}
      </Select>
    );
  }

  // necessary to click delete icon within Select
  // Select component intercepts onMouseDown
  const onMouseDown = (event) => {
    event.stopPropagation();
  };

  const getChips = (selectedValues) => (
    <div>
      {selectedValues.map((value) => (
        <Chip
          key={value}
          size="small"
          label={options.find((option) => option.value === value).label}
          onDelete={() => handleDelete(value)}
          onMouseDown={onMouseDown}
        />
      ))}
    </div>
  );

  return (
    <Select
      id={id}
      multiple
      onChange={handleSelect}
      input={<Input />}
      renderValue={getChips}
      value={selected}
    >
      {children}
    </Select>
  );
};

CustomSelect.defaultProps = {
  allowMultipleSelect: false,
  handleDelete: () => {},
  handleSelect: () => {},
};

CustomSelect.propTypes = {
  allowMultipleSelect: PropTypes.bool,
  children: PropTypes.element.isRequired,
  handleDelete: PropTypes.func,
  handleSelect: PropTypes.func,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  selected: PropTypes.string.isRequired,
};

const renderEmptyOption = () => (
  <MenuItem value="">
    <em>None</em>
  </MenuItem>
);

const renderErrorMessage = (error, errorMessage) =>
  error && errorMessage && <FormHelperText>{errorMessage}</FormHelperText>;

export default function DropdownMenu(props) {
  const {
    allowMultipleSelect,
    error,
    errorMessage,
    label,
    id,
    onChange,
    options,
    selected,
    setSelected,
  } = props;

  const handleSelect = (event) => {
    const previousValue = selected;
    const newValue = event.target.value;
    setSelected(newValue);
    onChange(newValue, previousValue);
  };

  // for multi-select, handle removing an item
  const handleDelete = (value) => {
    if (!Array.isArray(selected)) {
      return;
    }
    const newValue = selected.slice(); // copy array before splicing
    const index = newValue.indexOf(value);
    if (index !== -1) {
      newValue.splice(index, 1);
      setSelected(newValue);
    }
  };

  return (
    <div>
      <FormControl error={error}>
        <InputLabel>{label}</InputLabel>
        <CustomSelect
          allowMultipleSelect={allowMultipleSelect}
          handleDelete={handleDelete}
          handleSelect={handleSelect}
          id={id}
          options={options}
          selected={selected}
        >
          {!allowMultipleSelect && renderEmptyOption()}
          {options.map((option) => (
            <MenuItem value={option.value} onClick={handleSelect}>
              {allowMultipleSelect && (
                <Checkbox checked={selected.includes(option.value)} />
              )}{' '}
              {option.label}
            </MenuItem>
          ))}
        </CustomSelect>
        {renderErrorMessage(error, errorMessage)}
      </FormControl>
    </div>
  );
}

DropdownMenu.defaultProps = {
  allowMultipleSelect: false,
  error: false,
  errorMessage: '',
  onChange: () => {},
};

DropdownMenu.propTypes = {
  /**
   * If `true`, dropdown will allow for multiple selections.
   */
  allowMultipleSelect: PropTypes.bool,
  /**
   * If `true`, display dropdown in an error state.
   */
  error: PropTypes.bool,
  /**
   * Error message to display if `error` is `true`.
   */
  errorMessage: PropTypes.string,
  id: PropTypes.string.isRequired,
  /**
   * The displayed label of the dropdown.
   */
  label: PropTypes.string.isRequired,
  /**
   * An optional function to call on changing the selected value(s).
   */
  onChange: PropTypes.func,
  /**
   * An array of label-value options for selection.
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  /**
   * The currently selected value(s), passed in from parent component.
   * If `allowMultipleSelect` is `true`, `selectedValue` should be
   * an array.
   */
  selected: PropTypes.string.isRequired,
  /**
   * Function that sets `selected`, passed in from parent component.
   */
  setSelected: PropTypes.func.isRequired,
};
