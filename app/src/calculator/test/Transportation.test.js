import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';

import TransportationForm from '../TransportationForm';
import { initialCarbonParameters } from '../../App';

const mockedParameters = {...initialCarbonParameters};
const mockedVehicleYearOptions = { '2020': '2020', '2021': '2021', '2022': '2022' };
const mockedCombustionFuelOptions = { 'Option 1': 'OPTION_1', 'Option 2': 'OPTION_2' };
const mockedSetParameters = jest.fn();

test('TransportationForm should render everything as expected', () => {
  render(
    <TransportationForm
      parameters={mockedParameters}
      setParameters={mockedSetParameters}
      vehicleYearOptions={mockedVehicleYearOptions}
      combustionOptions={mockedCombustionFuelOptions}
    />
  );

  const transportationForm = screen.getByTestId('transportation-form');
  const milesInput = screen.getByTestId('miles-input');
  const gasMileageInput = screen.getByTestId('gas-mileage-input');
  const vehicleYearInput = screen.getByTestId('vehicle-year-select');
  const combustionInput = screen.getByTestId('combustion-fuel-select');

  expect(transportationForm).toBeInTheDocument();
  expect(milesInput).toBeInTheDocument();
  expect(gasMileageInput).toBeInTheDocument();
  expect(vehicleYearInput).toBeInTheDocument();
  expect(combustionInput).toBeInTheDocument();
});

test('TransportationForm miles input should update parameters', () => {
  render(
    <TransportationForm
      parameters={mockedParameters}
      setParameters={mockedSetParameters}
      vehicleYearOptions={mockedVehicleYearOptions}
      combustionOptions={mockedCombustionFuelOptions}
    />
  );

  const milesInput = screen.getByTestId('miles-input');
  fireEvent.change(milesInput, { target: { value: '999.23' } })

  expect(milesInput).toHaveValue('999.23');

  const expectedArgument = { ...mockedParameters, transportation: { ...mockedParameters.transportation, miles: 999.23 } };
  expect(mockedSetParameters).toHaveBeenCalledWith(expectedArgument)
});

test('TransportationForm gas mileage input should update parameters', () => {
  render(
    <TransportationForm
      parameters={mockedParameters}
      setParameters={mockedSetParameters}
      vehicleYearOptions={mockedVehicleYearOptions}
      combustionOptions={mockedCombustionFuelOptions}
    />
  );

  const gasMileageInput = screen.getByTestId('gas-mileage-input');
  fireEvent.change(gasMileageInput, { target: { value: '90.5' } })

  expect(gasMileageInput).toHaveValue('90.5');

  const expectedArgument = { ...mockedParameters, transportation: { ...mockedParameters.transportation, gasMileage: 90.5 } };
  expect(mockedSetParameters).toHaveBeenCalledWith(expectedArgument)
});

test('TransportationForm vehicle year option input should update parameters', () => {
  render(
    <TransportationForm
      parameters={mockedParameters}
      setParameters={mockedSetParameters}
      vehicleYearOptions={mockedVehicleYearOptions}
      combustionOptions={mockedCombustionFuelOptions}
    />
  );

  const selectedValue = mockedVehicleYearOptions['2020'];
  const vehicleYearInput = screen.getByTestId('vehicle-year-select');

  fireEvent.change(vehicleYearInput, { target: { value: selectedValue } });

  expect(vehicleYearInput).toHaveValue(selectedValue);

  const expectedArgument = { ...mockedParameters, transportation: { ...mockedParameters.transportation, vehicleYearOption: selectedValue } };
  expect(mockedSetParameters).toHaveBeenCalledWith(expectedArgument)
});

test('TransportationForm vehicle year option select should have correct length', async () => {
  render(
    <TransportationForm
      parameters={mockedParameters}
      setParameters={mockedSetParameters}
      vehicleYearOptions={mockedVehicleYearOptions}
      combustionOptions={mockedCombustionFuelOptions}
    />
  );

  fireEvent.mouseDown(screen.getAllByRole('button')[0]);

  const listbox = within(screen.getByRole('listbox'));
  const options = listbox.getAllByRole('option');

  const expectedLength = Object.entries(mockedVehicleYearOptions).length + 1; // options + empty state
  expect(options).toHaveLength(expectedLength);
});

test('TransportationForm combustion fuel option input should update parameters', () => {
  render(
    <TransportationForm
      parameters={mockedParameters}
      setParameters={mockedSetParameters}
      vehicleYearOptions={mockedVehicleYearOptions}
      combustionOptions={mockedCombustionFuelOptions}
    />
  );

  const selectedValue = mockedCombustionFuelOptions['Option 1'];
  const combustionInput = screen.getByTestId('combustion-fuel-select');

  fireEvent.change(combustionInput, { target: { value: selectedValue } });

  expect(combustionInput).toHaveValue(selectedValue);

  const expectedArgument = { ...mockedParameters, transportation: { ...mockedParameters.transportation, combustionOption: selectedValue } };
  expect(mockedSetParameters).toHaveBeenCalledWith(expectedArgument)
});

test('TransportationForm combustion fuel option select should have correct length', async () => {
  render(
    <TransportationForm
      parameters={mockedParameters}
      setParameters={mockedSetParameters}
      vehicleYearOptions={mockedVehicleYearOptions}
      combustionOptions={mockedCombustionFuelOptions}
    />
  );

  fireEvent.mouseDown(screen.getAllByRole('button')[1]);

  const listbox = within(screen.getByRole('listbox'));
  const options = listbox.getAllByRole('option');

  const expectedLength = Object.entries(mockedCombustionFuelOptions).length + 1; // options + empty state
  expect(options).toHaveLength(expectedLength);
});
