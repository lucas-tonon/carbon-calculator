import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';

import ElectricityForm from '../ElectricityForm';
import { initialCarbonParameters } from '../../App';

const mockedParameters = {...initialCarbonParameters};
const mockedGridOptions = {'Option 1': 'OPTION_1', 'Option 2': 'OPTION_2'};
const mockedSetParameters = jest.fn();

test('ElectricityForm should render everything as expected', () => {
  render(<ElectricityForm parameters={mockedParameters} setParameters={mockedSetParameters} gridOptions={mockedGridOptions} />);

  const electricityForm = screen.getByTestId('electricity-form');
  const consumptionInput = screen.getByTestId('consumption-input');
  const gridLocationInput = screen.getByTestId('grid-location-select');

  expect(electricityForm).toBeInTheDocument();
  expect(consumptionInput).toBeInTheDocument();
  expect(gridLocationInput).toBeInTheDocument();
});

test('ElectricityForm consumption input should update parameters', () => {
  render(<ElectricityForm parameters={mockedParameters} setParameters={mockedSetParameters} gridOptions={mockedGridOptions} />);

  const consumptionInput = screen.getByTestId('consumption-input');
  fireEvent.change(consumptionInput, { target: { value: '100.5' } })

  expect(consumptionInput).toHaveValue('100.5');

  const expectedArgument = { ...mockedParameters, electricity: { ...mockedParameters.electricity, consumption: 100.5 } };
  expect(mockedSetParameters).toHaveBeenCalledWith(expectedArgument)
});

test('ElectricityForm grid option input should update parameters', () => {
  render(<ElectricityForm parameters={mockedParameters} setParameters={mockedSetParameters} gridOptions={mockedGridOptions} />);

  const selectedValue = mockedGridOptions['Option 1'];
  const gridLocationInput = screen.getByTestId('grid-location-select');

  fireEvent.change(gridLocationInput, { target: { value: selectedValue } });

  expect(gridLocationInput).toHaveValue(selectedValue);

  const expectedArgument = { ...mockedParameters, electricity: { ...mockedParameters.electricity, gridOption: selectedValue } };
  expect(mockedSetParameters).toHaveBeenCalledWith(expectedArgument)
});

test('ElectricityForm grid option select should have correct length', async () => {
  render(<ElectricityForm parameters={mockedParameters} setParameters={mockedSetParameters} gridOptions={mockedGridOptions} />);

  fireEvent.mouseDown(screen.getByRole('button'));

  const listbox = within(screen.getByRole('listbox'));
  const options = listbox.getAllByRole('option');

  const expectedLength = Object.entries(mockedGridOptions).length + 1; // options + empty state
  expect(options).toHaveLength(expectedLength);
});
