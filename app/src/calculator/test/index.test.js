import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import Calculator from '../index';
import { initialCarbonParameters } from '../../App';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const mockedParameters = {...initialCarbonParameters};
const mockedSetParameters = jest.fn();

test('Calculator Page should render everything as expected', () => {
  render(<Calculator parameters={mockedParameters} setParameters={mockedSetParameters} />);

  const pageContainer = screen.getByTestId('page-container');
  const cardContentContainer = screen.getByTestId('card-content-container');
  const cardActionsContainer = screen.getByTestId('card-actions-container');

  const pageTitleTypography = screen.getByTestId('page-title');
  const electricityForm = screen.getByTestId('electricity-form');

  const allTabs = screen.getAllByRole('tab');

  expect(pageContainer).toBeInTheDocument();
  expect(cardContentContainer).toBeInTheDocument();
  expect(cardActionsContainer).toBeInTheDocument();

  expect(pageTitleTypography).toBeInTheDocument()
  expect(pageTitleTypography).toHaveTextContent('Calculator');

  expect(electricityForm).toBeInTheDocument();

  expect(allTabs).toHaveLength(3);
});

test('Calculator Page should select correct form component when changing to Heating tab', () => {
  render(<Calculator parameters={mockedParameters} setParameters={mockedSetParameters} />);

  const heatingTab = screen.getByRole('tab', { name: 'Heating' });

  fireEvent.click(heatingTab);

  const heatingForm = screen.getByTestId('heating-form');
  expect(heatingForm).toBeInTheDocument();
});

test('Calculator Page should select correct form component when changing to Transportation tab', () => {
  render(<Calculator parameters={mockedParameters} setParameters={mockedSetParameters} />);

  const transportationTab = screen.getByRole('tab', { name: 'Transportation' });

  fireEvent.click(transportationTab);
  const transportationForm = screen.getByTestId('transportation-form');

  expect(transportationForm).toBeInTheDocument();
});

test('Calculator Page should navigate back properly when clicking Back button', () => {
  render(<Calculator parameters={mockedParameters} setParameters={mockedSetParameters} />);

  const goBackButton = screen.getByTestId('navigate-back');

  fireEvent.click(goBackButton);

  expect(mockedUsedNavigate).toHaveBeenCalledWith(-1);
});

test('Calculator should reset properly when clicking Reset button', () => {
  render(<Calculator parameters={mockedParameters} setParameters={mockedSetParameters} />);

  const resetButton = screen.getByTestId('reset');

  fireEvent.click(resetButton);

  expect(mockedSetParameters).toHaveBeenCalledWith({...initialCarbonParameters});
});


test('Calculator should go to Report page properly when clicking Generate Report button', () => {
  render(<Calculator parameters={mockedParameters} setParameters={mockedSetParameters} />);

  const generateReportButton = screen.getByTestId('generate-report');

  fireEvent.click(generateReportButton);

  expect(mockedUsedNavigate).toHaveBeenCalledWith('/report');
});
