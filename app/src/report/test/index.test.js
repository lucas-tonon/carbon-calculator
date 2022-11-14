import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import Report from '../index';
import { initialCarbonParameters } from '../../App';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const mockedParameters = {...initialCarbonParameters};
const mockedSetParameters = jest.fn();

test('Report Page should render everything as expected', () => {
  render(<Report parameters={mockedParameters} setParameters={mockedSetParameters} />);

  const pageContainer = screen.getByTestId('page-container');
  const cardContentContainer = screen.getByTestId('card-content-container');
  const cardActionsContainer = screen.getByTestId('card-actions-container');

  const pageTitleTypography = screen.getByTestId('page-title');
  const reportTable = screen.getByTestId('report-table');

  expect(pageContainer).toBeInTheDocument();
  expect(cardContentContainer).toBeInTheDocument();
  expect(cardActionsContainer).toBeInTheDocument();

  expect(pageTitleTypography).toBeInTheDocument()
  expect(pageTitleTypography).toHaveTextContent('Report');

  expect(reportTable).toBeInTheDocument();
});

test('Report Page should navigate properly to the Calculator Page on Back Click', () => {
  render(<Report parameters={mockedParameters} setParameters={mockedSetParameters} />);

  const goBackButton = screen.getByTestId('navigate-back');

  fireEvent.click(goBackButton);

  expect(mockedUsedNavigate).toHaveBeenCalledWith(-1);
});

test('Report Page should reset properly Start Over Click', () => {
  render(<Report parameters={mockedParameters} setParameters={mockedSetParameters} />);

  const startOverButton = screen.getByTestId('start-over');

  fireEvent.click(startOverButton);

  expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
  expect(mockedSetParameters).toHaveBeenCalledWith({...initialCarbonParameters});
});
