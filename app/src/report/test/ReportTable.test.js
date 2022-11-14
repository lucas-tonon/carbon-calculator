import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import ReportTable from '../ReportTable';
import { initialCarbonParameters } from '../../App';

const mockedParameters = {...initialCarbonParameters};

test('Report Table should render the correct number of columns and rows', () => {
  render(<ReportTable parameters={mockedParameters} />);

  const headColumns = screen.getAllByTestId('head-column');
  const categoryCells = screen.getAllByTestId('category-value');
  const yourEmissionCells = screen.getAllByTestId('your-emission-value');

  expect(headColumns).toHaveLength(2);
  expect(categoryCells).toHaveLength(4);
  expect(yourEmissionCells).toHaveLength(4);
});

test('Report Table should render your emissions with correct categories and values', () => {
  const mockedParametersWithCustomEmissions = {
    emissions: {
      electricity: Math.random() * 1000,
      heating: Math.random() * 1000,
      transportation: Math.random() * 1000,
    }
  };

  render(<ReportTable parameters={mockedParametersWithCustomEmissions} />);

  const categoryCells = screen.getAllByTestId('category-value');
  const yourEmissionCells = screen.getAllByTestId('your-emission-value');

  expect(categoryCells.at(0)).toHaveTextContent('electricity');
  expect(categoryCells.at(1)).toHaveTextContent('heating');
  expect(categoryCells.at(2)).toHaveTextContent('transportation');
  expect(categoryCells.at(3)).toHaveTextContent('total');

  const { electricity, heating, transportation } = mockedParametersWithCustomEmissions.emissions;
  expect(yourEmissionCells.at(0)).toHaveTextContent(electricity.toFixed(2));
  expect(yourEmissionCells.at(1)).toHaveTextContent(heating.toFixed(2));
  expect(yourEmissionCells.at(2)).toHaveTextContent(transportation.toFixed(2));
  expect(yourEmissionCells.at(3)).toHaveTextContent((electricity + heating + transportation).toFixed(2));
});
