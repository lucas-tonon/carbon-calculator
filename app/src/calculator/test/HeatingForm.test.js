import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';

import HeatingForm from '../HeatingForm';
import { initialCarbonParameters } from '../../App';

const mockedParameters = {...initialCarbonParameters};
const mockedFuelOptions = {'Option 1': 'OPTION_1', 'Option 2': 'OPTION_2'};
const mockedSetParameters = jest.fn();

test('HeatingForm should render everything as expected', () => {
  render(<HeatingForm parameters={mockedParameters} setParameters={mockedSetParameters} fuelOptions={mockedFuelOptions} />);

  const heatingForm = screen.getByTestId('heating-form');
  const gallonsInput = screen.getByTestId('gallons-input');
  const fuelOptionInput = screen.getByTestId('fuel-option-select');

  expect(heatingForm).toBeInTheDocument();
  expect(gallonsInput).toBeInTheDocument();
  expect(fuelOptionInput).toBeInTheDocument();
});

test('HeatingForm gallons input should update parameters', () => {
  render(<HeatingForm parameters={mockedParameters} setParameters={mockedSetParameters} fuelOptions={mockedFuelOptions} />);

  const gallonsInput = screen.getByTestId('gallons-input');
  fireEvent.change(gallonsInput, { target: { value: '12.1' } })

  expect(gallonsInput).toHaveValue('12.1');

  const expectedArgument = { ...mockedParameters, heating: { ...mockedParameters.heating, gallons: 12.1 } };
  expect(mockedSetParameters).toHaveBeenCalledWith(expectedArgument)
});

test('HeatingForm fuel option input should update parameters', () => {
  render(<HeatingForm parameters={mockedParameters} setParameters={mockedSetParameters} fuelOptions={mockedFuelOptions} />);

  const selectedValue = mockedFuelOptions['Option 1'];
  const fuelOptionInput = screen.getByTestId('fuel-option-select');

  fireEvent.change(fuelOptionInput, { target: { value: selectedValue } });

  expect(fuelOptionInput).toHaveValue(selectedValue);

  const expectedArgument = { ...mockedParameters, heating: { ...mockedParameters.heating, fuelOption: selectedValue } };
  expect(mockedSetParameters).toHaveBeenCalledWith(expectedArgument)
});

test('HeatingForm fuel option select should have correct length', async () => {
  render(<HeatingForm parameters={mockedParameters} setParameters={mockedSetParameters} fuelOptions={mockedFuelOptions} />);

  fireEvent.mouseDown(screen.getByRole('button'));

  const listbox = within(screen.getByRole('listbox'));
  const options = listbox.getAllByRole('option');

  const expectedLength = Object.entries(mockedFuelOptions).length + 1; // options + empty state
  expect(options).toHaveLength(expectedLength);
});
